/*!
 * @copyright@
 */

jQuery.sap.declare("sap.apb.BadgeButtonRenderer");
jQuery.sap.require("sap.ui.core.Renderer");
jQuery.sap.require("sap.m.ButtonRenderer");

/**
 * @class BadgeButton renderer. 
 * @static
 */
sap.apb.BadgeButtonRenderer = sap.ui.core.Renderer.extend(sap.m.ButtonRenderer);

sap.apb.BadgeButtonRenderer.writeTextHtml = function(rm, oButton, bExtraContentDiv, sType) {
	sap.m.ButtonRenderer.writeTextHtml.apply(this, arguments);
	var badge = oButton.getBadge();
	if(badge && badge.length>0 ) {
		this.writeBadgeHtml(rm, oButton, badge);
	}
};

sap.apb.BadgeButtonRenderer.writeBadgeHtml = function(rm, oButton, sBadge) {
	var id = oButton.getId()+"-badge";
	rm.write("<span id=\""+id+"\" class=\"sapBtnBadgeSpan\">");
	rm.write(sBadge);
	rm.write("</span>");
};