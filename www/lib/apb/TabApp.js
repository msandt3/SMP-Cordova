/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.apb.TabApp.
jQuery.sap.declare("sap.apb.TabApp");
jQuery.sap.require("sap.apb.library");
jQuery.sap.require("sap.m.App");

/**
 * Constructor for a new TabApp.
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
 * <li>{@link #getTransition transition} : sap.apb.TransitionType (default: sap.apb.TransitionType.door)</li></ul>
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
 * In addition, all settings applicable to the base type {@link sap.m.App#constructor sap.m.App}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * TabApp control
 * @extends sap.m.App
 *
 * @author  
 * @version 1.14.0
 *
 * @constructor   
 * @public
 * @name sap.apb.TabApp
 */
sap.m.App.extend("sap.apb.TabApp", { metadata : {

	// ---- object ----

	// ---- control specific ----
	library : "sap.apb",
	properties : {
		"transition" : {type : "sap.apb.TransitionType", group : "", defaultValue : sap.apb.TransitionType.door}
	},
	aggregations : {
    	"tabBar" : {type : "sap.m.Bar", multiple : false, visibility : "hidden"}
	}
}});


/**
 * Creates a new subclass of class sap.apb.TabApp with name <code>sClassName</code> 
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
 * @name sap.apb.TabApp.extend
 * @function
 */


/**
 * Getter for property <code>transition</code>.
 * transition
 *
 * Default value is <code>door</code>
 *
 * @return {sap.apb.TransitionType} the value of property <code>transition</code>
 * @public
 * @name sap.apb.TabApp#getTransition
 * @function
 */

/**
 * Setter for property <code>transition</code>.
 *
 * Default value is <code>door</code> 
 *
 * @param {sap.apb.TransitionType} oTransition  new value for property <code>transition</code>
 * @return {sap.apb.TabApp} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.TabApp#setTransition
 * @function
 */


// Start of sap\apb\TabApp.js
/*!
 * @copyright@
 */

sap.apb.TabApp.prototype.init = function() {
	sap.m.App.prototype.init.apply(this, arguments);
	var tabApp = this;
	var tabBar = new sap.m.Bar({ 
		enableFlexBox: true
	});	
	this.setAggregation("tabBar", tabBar);
	this.attachNavigate(function(oNavInfo){
		var toPage = oNavInfo.mParameters.to;
		this._selectPageButton(toPage);
	});
};

sap.apb.TabApp.prototype.addPage = function(oPage) {
	sap.m.NavContainer.prototype.addPage.apply(this, arguments);
	var page = (oPage instanceof sap.ui.core.mvc.View) ? oPage.getContent()[0] : oPage;
	this._addPageButton(oPage);
	this._selectPageButton();

	//remove tabBar from the page
	if(page._tabBar) {
		page._tabBar.destroy(true);
		page._tabBar = null;	
	}
	
	return this;
};

sap.apb.TabApp.prototype._selectPageButton = function(page) {
	if(!page) {
		page = this.getCurrentPage();
	}
	page = (page instanceof sap.ui.core.mvc.View) ? page.getContent()[0] : page;
	var id = this.getId() + "-tabBar";
	if(page instanceof sap.apb.TabPage){
		jQuery("#" + id).fadeIn();		//show tab bar
		var button = page._tabButton;
		if(this._selectedBtn) {
			this._selectedBtn.removeStyleClass("sapMBtnActive");
		}
		this._selectedBtn = button;
		button.addStyleClass("sapMBtnActive");
	}
	else {
		jQuery("#" + id).fadeOut();	//hide tab bar
	}
};
//add the tabButton of oPage into the tabBar
sap.apb.TabApp.prototype._addPageButton = function(oPage) {
	var tabApp = this;
	var page = (oPage instanceof sap.ui.core.mvc.View) ? oPage.getContent()[0] : oPage;
	if(page instanceof sap.apb.TabPage) {
		var tabBar = this.getAggregation("tabBar");
		var button = page._tabButton;
		if(tabBar && button) {
			button.attachTap(function(){
				var trans = tabApp.getTransition();
				tabApp.to(oPage, trans);
				tabApp._selectPageButton();
			});
			button._aPage = oPage;
			tabBar.addContentMiddle(button);
		}
	}
};
