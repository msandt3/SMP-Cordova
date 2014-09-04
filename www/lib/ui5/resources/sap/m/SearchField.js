/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.SearchField");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.SearchField",{metadata:{library:"sap.m",properties:{"value":{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},"width":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"maxLength":{type:"int",group:"Behavior",defaultValue:0},"placeholder":{type:"string",group:"Misc",defaultValue:null},"showMagnifier":{type:"boolean",group:"Misc",defaultValue:true}},events:{"search":{},"liveChange":{}}}});sap.m.SearchField.M_EVENTS={'search':'search','liveChange':'liveChange'};jQuery.sap.require("sap.ui.core.EnabledPropagator");sap.ui.core.EnabledPropagator.apply(sap.m.SearchField.prototype,[true]);jQuery.sap.require("sap.ui.core.IconPool");sap.ui.core.IconPool.insertFontFaceStyle();
sap.m.SearchField.prototype.init=function(){this._inputEvent=jQuery.browser.msie&&jQuery.browser.fVersion<10?"keyup":"input"};
sap.m.SearchField.prototype.getFocusDomRef=function(){return this._inputElement};
sap.m.SearchField.prototype._hasPlacehoder=(function(){return"placeholder"in document.createElement("input")}());
sap.m.SearchField.prototype.onBeforeRendering=function(){jQuery(this._inputElement).unbind();this._inputElement=null};
sap.m.SearchField.prototype.onAfterRendering=function(){this._inputElement=jQuery.sap.domById(this.getId()+"-I");this._resetElement=jQuery.sap.domById(this.getId()+"-reset");var $=jQuery(this._inputElement).bind(this._inputEvent,jQuery.proxy(this.onInput,this)).bind("search",jQuery.proxy(this.onSearch,this)).bind("change",jQuery.proxy(this.onChange,this)).bind("focus",jQuery.proxy(this.onFocus,this)).bind("blur",jQuery.proxy(this.onBlur,this));if(!("onsearch"in this._inputElement)){$.bind("keydown",jQuery.proxy(this.onKeyup,this))}};
sap.m.SearchField.prototype.clear=function(){if(!this._inputElement)return;var v="";this._inputElement.value=v;this.setProperty("value",v,true);this.$().toggleClass("sapMSFVal",false);this.fireLiveChange({newValue:v});this.fireSearch({query:v})};
sap.m.SearchField.prototype.ontouchstart=function(e){e.originalEvent._sapui_handledByControl=true;if(!this.getEnabled())return;var s=e.target;if(s.id==this.getId()+"-reset"){if(e.originalEvent.button===2)return;this.clear();e.preventDefault();e.stopPropagation();if(document.activeElement!==this._inputElement)this._inputElement.focus()}};
sap.m.SearchField.prototype.onclick=function(e){if(this.getEnabled()&&e.target.className=="sapMSFMG"){this._inputElement.focus();this.fireSearch({query:this.getValue()})}};
sap.m.SearchField.prototype.onSearch=function(e){var v=this._inputElement.value;this.setProperty("value",v,true);document.activeElement.blur();this.fireSearch({query:v})};
sap.m.SearchField.prototype.onChange=function(e){var v=this._inputElement.value;this.setProperty("value",v,true)};
sap.m.SearchField.prototype.onInput=function(e){var v=this._inputElement.value;this.$().toggleClass("sapMSFVal",!!v);this.setProperty("value",v,true);this.fireLiveChange({newValue:v})};
sap.m.SearchField.prototype.onKeyup=function(e){if(e.keyCode==13){this.onSearch(e)}else if(e.keyCode==27){this.clear();document.activeElement.blur()}};
sap.m.SearchField.prototype.onFocus=function(e){this.$().toggleClass("sapFocus",true)};
sap.m.SearchField.prototype.onBlur=function(e){this.$().toggleClass("sapFocus",false)};
