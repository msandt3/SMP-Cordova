/* -----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying
 * source files only (*.type, *.js) or they will be lost after the next generation.
 * ----------------------------------------------------------------------------------- */

/**
 * Initialization Code and shared classes of library sap.apb (1.14.0)
 */
jQuery.sap.declare("sap.apb.library");
jQuery.sap.require("sap.ui.core.Core");
/**
 * UI5 Wrapper for AppBuilder
 *
 * @namespace
 * @name sap.apb
 * @public
 */


// library dependencies
jQuery.sap.require("sap.ui.core.library");

// delegate further initialization of this library to the Core
sap.ui.getCore().initLibrary({
  name : "sap.apb",
  dependencies : ["sap.ui.core"],
  types: [
    "sap.apb.TransitionType"
  ],
  interfaces: [],
  controls: [
    "sap.apb.BadgeButton",
    "sap.apb.SuperList",
    "sap.apb.TabApp",
    "sap.apb.TabPage"
  ],
  elements: [],
  version: "1.14.0"});

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.type, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides enumeration sap.apb.TransitionType.
jQuery.sap.declare("sap.apb.TransitionType");

/**
 * @class Enumeration for TransitionType
 *
 * @version 1.14.0
 * @static
 * @public
 * @since 1.12
 */
sap.apb.TransitionType = {
  
    /**
     * door 
     * @public
     */
    door : "door",

    /**
     * fade 
     * @public
     */
    fade : "fade",

    /**
     * flip 
     * @public
     */
    flip : "flip",

    /**
     * show 
     * @public
     */
    show : "show",

    /**
     * slide 
     * @public
     */
    slide : "slide"

  };
  
