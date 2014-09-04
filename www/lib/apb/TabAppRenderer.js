/*!
 * @copyright@
 */

jQuery.sap.declare("sap.apb.TabAppRenderer");
jQuery.sap.require("sap.ui.core.Renderer");
jQuery.sap.require("sap.m.AppRenderer");

/**
 * @class TabApp renderer. 
 * @static
 */
sap.apb.TabAppRenderer = sap.ui.core.Renderer.extend(sap.m.AppRenderer);


/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 * 
 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.apb.TabAppRenderer.render = function(rm, oControl) {
	sap.m.AppRenderer.render.apply(this, arguments);
	//render the TabBar
	var id = oControl.getId()+"-tabBar";
	var ele = document.getElementById(id);
	if(ele) {
		jQuery("#"+id).remove();
	}
	var tabBar = oControl.getAggregation("tabBar");
	if(tabBar) {
		rm.write("<div id=\""+id+"\" class=\"sapTabBar\">");
		rm.renderControl(tabBar);
		rm.write("</div>");
	}
	//inject helper APIs
	tabBar = (tabBar._oflexBox)? tabBar._oflexBox : tabBar;
	if(!tabBar._injected) {
		var app = oControl;
		tabBar.insertAggregation = function(sAggregationName, oObject, iIndex, bSuppressInvalidate) {
			sap.m.Bar.prototype.insertAggregation.apply(this, arguments);
			if(iIndex>0){
				//find out the correct index to insert at, bypass normal pages
				var btn = this.getAggregation(sAggregationName)[iIndex-1];
				var page = btn._aPage;
				if(page) {
					var iIndex = app.getAggregation("pages").indexOf(page) + 1;
				}
			}
			
			//app.insertPage(oObject._aPage, iIndex);
			//can not use insert page, because of NavContainer's bug
			oObject._aPage.addStyleClass("sapMNavItem");
			app.insertAggregation("pages", oObject._aPage, iIndex, true);
		}
		tabBar.removeAggregation = function(sAggregationName, oObject, bSuppressInvalidate) {
			sap.m.Bar.prototype.removeAggregation.apply(this, arguments);
			//app.removePage(oObject._aPage);
			app.removeAggregation("pages", oObject._aPage, true);
		}
		tabBar._injected = true;
	}
};