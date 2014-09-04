/*!
 * @copyright@
 */

jQuery.sap.declare("sap.apb.SuperListRenderer");

/**
 * @class SuperList renderer. 
 * @static
 */
sap.apb.SuperListRenderer = {
};


/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 * 
 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.apb.SuperListRenderer.render = function(rm, oControl){
	// write the HTML into the render manager
	var width = oControl.getWidth();
	var height = oControl.getHeight();
	rm.write("<div id=\""+oControl.getId()+"\"");
	rm.writeControlData(oControl);
	rm.addClass("sapSuperList");
	rm.writeClasses();
	// set user defined width/height
	var style = "";
	if (width) {
		style += "width:" + width + ";"
	}
	if (height) {
		style += "height:" + height + ";"
	}
	if( style.length>0 ) {
		rm.writeAttribute("style", style);
	}
	// close start div tag
	rm.write(">");
	rm.write("<div id=\"" + oControl.getId() + "_contents\" style=\"width:100%\">");
	rm.write("</div>");
	rm.write("</div>");
};