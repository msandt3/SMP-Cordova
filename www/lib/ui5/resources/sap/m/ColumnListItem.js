/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.ColumnListItem");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.m.ListItemBase");sap.m.ListItemBase.extend("sap.m.ColumnListItem",{metadata:{library:"sap.m",defaultAggregation:"cells",aggregations:{"_clonedHeaders":{type:"sap.ui.core.Control",multiple:true,singularName:"_clonedHeader",visibility:"hidden"},"cells":{type:"sap.ui.core.Control",multiple:true,singularName:"cell",bindable:"bindable"}}}});sap.m.ColumnListItem.prototype._popinId=false;
sap.m.ColumnListItem.prototype.removePopin=function(){if(this._popinId){jQuery.sap.byId(this._popinId).remove();delete this._popinId}return this};
sap.m.ColumnListItem.prototype.exit=function(){if(sap.m.ListItemBase.prototype.exit){sap.m.ListItemBase.prototype.exit.call(this)}this.destroyAggregation("_clonedHeaders",true);return this.removePopin()};
sap.m.ColumnListItem.prototype._activeHandlingInheritor=function(){this._toggleActiveClass(true)};
sap.m.ColumnListItem.prototype._inactiveHandlingInheritor=function(){this._toggleActiveClass(false)};
sap.m.ColumnListItem.prototype._toggleActiveClass=function(b){if(this._popinId){jQuery.sap.byId(this._popinId).toggleClass("sapMLIBActive",b)}};
sap.m.ColumnListItem.handleEvents=function(e,E,c){var $=jQuery(e.target).closest(".sapMListTblSubRow",c);if($.length){var C=sap.ui.getCore().byId($.prev().attr("id"));if(C){e.srcControl=sap.ui.getCore().byId(e.target.id)||C;if(C["on"+E]){C["on"+E](e)}}}};
sap.m.ColumnListItem.removePopin=function(l){return l.removePopin()};
sap.m.ColumnListItem.toggleClass=function(l,c,s){jQuery.sap.byId(l.getId()+"-sub").toggleClass(c,s)};
