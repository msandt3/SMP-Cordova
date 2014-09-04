/*!
 * @copyright@
 */

jQuery.sap.declare("sap.apb.makit.ChartRenderer");

/**
 * @class Chart renderer. 
 * @static
 */
sap.apb.makit.ChartRenderer = {
};


/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 * 
 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.apb.makit.ChartRenderer.render = function(oRm, oControl){
	 // write the HTML into the render manager
	 oRm.write("<div id=\"sap-ui-dummy-" + oControl.getId() + "\" style=\"display:none\">");
	 oRm.write("<div");
	 oRm.writeControlData(oControl);
	 oRm.writeAttribute("data-sap-ui-preserve", oControl.getId());
	 oRm.addClass("sapMakitChart");
	 oRm.writeClasses();
	 oRm.write(">"); // div element
	 oRm.write("</div>");
	 oRm.write("</div>");
};