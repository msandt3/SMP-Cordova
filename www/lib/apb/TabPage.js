/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.apb.TabPage.
jQuery.sap.declare("sap.apb.TabPage");
jQuery.sap.require("sap.apb.library");
jQuery.sap.require("sap.m.Page");

/**
 * Constructor for a new TabPage.
 * 
 * Accepts an object literal <code>mSettings</code> that defines initial 
 * property values, aggregated and associated objects as well as event handlers. 
 * 
 * If the name of a setting is ambiguous (e.g. a property has the same name as an event), 
 * then the framework assumes property, aggregation, association, event in that order. 
 * To override this automatic resolution, one of the prefixes "aggregation:", "association:" 
 * or "event:" can be added to the name of the setting (such a prefixed name must be
 * enclosed in single or double quotes).
 *
 * The supported settings are:
 * <ul>
 * <li>Properties
 * <ul>
 * <li>{@link #getTabText tabText} : string</li>
 * <li>{@link #getTabIcon tabIcon} : sap.ui.core.URI</li>
 * <li>{@link #getTabBadge tabBadge} : string</li></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul></ul>
 * </li>
 * </ul> 
 *
 * 
 * In addition, all settings applicable to the base type {@link sap.m.Page#constructor sap.m.Page}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * TabPage control
 * @extends sap.m.Page
 *
 * @author  
 * @version 1.14.0
 *
 * @constructor   
 * @public
 * @name sap.apb.TabPage
 */
sap.m.Page.extend("sap.apb.TabPage", { metadata : {

	// ---- object ----

	// ---- control specific ----
	library : "sap.apb",
	properties : {
		"tabText" : {type : "string", group : "Misc", defaultValue : null},
		"tabIcon" : {type : "sap.ui.core.URI", group : "Misc", defaultValue : null},
		"tabBadge" : {type : "string", group : "Misc", defaultValue : null}
	}
}});


/**
 * Creates a new subclass of class sap.apb.TabPage with name <code>sClassName</code> 
 * and enriches it with the information contained in <code>oClassInfo</code>.
 * 
 * <code>oClassInfo</code> might contain the same kind of informations as described in {@link sap.ui.core.Element.extend Element.extend}.
 *   
 * @param {string} sClassName name of the class to be created
 * @param {object} [oClassInfo] object literal with informations about the class  
 * @param {function} [FNMetaImpl] constructor function for the metadata object. If not given, it defaults to sap.ui.core.ElementMetadata.
 * @return {function} the created class / constructor function
 * @public
 * @static
 * @name sap.apb.TabPage.extend
 * @function
 */


/**
 * Getter for property <code>tabText</code>.
 * tabText
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>tabText</code>
 * @public
 * @name sap.apb.TabPage#getTabText
 * @function
 */

/**
 * Setter for property <code>tabText</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sTabText  new value for property <code>tabText</code>
 * @return {sap.apb.TabPage} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.TabPage#setTabText
 * @function
 */


/**
 * Getter for property <code>tabIcon</code>.
 * tabIcon
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.core.URI} the value of property <code>tabIcon</code>
 * @public
 * @name sap.apb.TabPage#getTabIcon
 * @function
 */

/**
 * Setter for property <code>tabIcon</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.core.URI} sTabIcon  new value for property <code>tabIcon</code>
 * @return {sap.apb.TabPage} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.TabPage#setTabIcon
 * @function
 */


/**
 * Getter for property <code>tabBadge</code>.
 * tabBadge
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>tabBadge</code>
 * @public
 * @name sap.apb.TabPage#getTabBadge
 * @function
 */

/**
 * Setter for property <code>tabBadge</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sTabBadge  new value for property <code>tabBadge</code>
 * @return {sap.apb.TabPage} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.TabPage#setTabBadge
 * @function
 */


// Start of sap\apb\TabPage.js
/*!
 * @copyright@
 */

sap.apb.TabPage.prototype.init = function() {
	sap.m.Page.prototype.init.apply(this, arguments);
	this._tabButton = new sap.apb.BadgeButton(this.getId() + '-tabBtn', {
		type: sap.m.ButtonType.Default,
		width: "100%",
		enabled: true,
		layoutData: new sap.m.FlexItemData({growFactor: 1})
	});
	var bar = new sap.m.Bar(this.getId() + '-tabBar', {
		enableFlexBox: true,
		contentMiddle: [this._tabButton]
	}).setParent(this, null, true);;
	this._tabBar = bar;
};
sap.apb.TabPage.prototype.onAfterRendering = function() {
	var dom = this.getDomRef();
	if (dom) {
		var css = dom.className || "";
		if (-1 == css.indexOf("sapMPageWithFooter")) {
			dom.className = css + " sapMPageWithFooter";
		}
	}
};
sap.apb.TabPage.prototype.setTabText = function(sText) {
	this._tabButton.setText(sText);
	this.setProperty("tabText", sText, true);
};
sap.apb.TabPage.prototype.setTabIcon = function(sIcon) {
	this._tabButton.setIcon(sIcon);
	this.setProperty("tabIcon", sIcon, true);
};
sap.apb.TabPage.prototype.setTabBadge = function(sBadge) {
	this._tabButton.setBadge(sBadge);
	this.setProperty("tabBadge", sBadge, true);
};
