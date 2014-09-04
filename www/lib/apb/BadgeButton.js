/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.apb.BadgeButton.
jQuery.sap.declare("sap.apb.BadgeButton");
jQuery.sap.require("sap.apb.library");
jQuery.sap.require("sap.m.Button");

/**
 * Constructor for a new BadgeButton.
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
 * <li>{@link #getBadge badge} : string</li></ul>
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
 * In addition, all settings applicable to the base type {@link sap.m.Button#constructor sap.m.Button}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * BadgeButton control
 * @extends sap.m.Button
 *
 * @author  
 * @version 1.14.0
 *
 * @constructor   
 * @public
 * @name sap.apb.BadgeButton
 */
sap.m.Button.extend("sap.apb.BadgeButton", { metadata : {

	// ---- object ----

	// ---- control specific ----
	library : "sap.apb",
	properties : {
		"badge" : {type : "string", group : "Misc", defaultValue : null}
	}
}});


/**
 * Creates a new subclass of class sap.apb.BadgeButton with name <code>sClassName</code> 
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
 * @name sap.apb.BadgeButton.extend
 * @function
 */


/**
 * Getter for property <code>badge</code>.
 * badge
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>badge</code>
 * @public
 * @name sap.apb.BadgeButton#getBadge
 * @function
 */

/**
 * Setter for property <code>badge</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sBadge  new value for property <code>badge</code>
 * @return {sap.apb.BadgeButton} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.BadgeButton#setBadge
 * @function
 */


// Start of sap\apb\BadgeButton.js
/*!
 * @copyright@
 */
 sap.apb.BadgeButton.prototype.init = function() { 
	sap.m.Button.prototype.init.apply(this, arguments);
	this._isPlatformDependent = true;
};