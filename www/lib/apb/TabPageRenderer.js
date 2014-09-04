/*!
 * @copyright@
 */

jQuery.sap.declare("sap.apb.TabPageRenderer");
jQuery.sap.require("sap.ui.core.Renderer");
jQuery.sap.require("sap.m.PageRenderer");

/**
 * @class TabPage renderer. 
 * @static
 */
sap.apb.TabPageRenderer = sap.ui.core.Renderer.extend(sap.m.PageRenderer);

/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 * 
 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.apb.TabPageRenderer.render = function(rm, oControl) {
	sap.m.PageRenderer.render.apply(this, arguments);
	var id = oControl.getId()+"-tabBar";
	var ele = document.getElementById(id);
	if(ele) {
		jQuery("#"+id).remove();
	}
	var tabBar = oControl._tabBar;
	if(tabBar) {
		rm.write("<div id=\""+id+"\" class=\"sapTabBar\">");
		rm.renderControl(tabBar);
		rm.write("</div>");
	}
};