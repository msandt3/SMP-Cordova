/* -----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying
 * source files only (*.type, *.js) or they will be lost after the next generation.
 * ----------------------------------------------------------------------------------- */

/**
 * Initialization Code and shared classes of library sap.apb.makit (1.14.0)
 */
jQuery.sap.declare("sap.apb.makit.library");
jQuery.sap.require("sap.ui.core.Core");
/**
 * makit for AppBuilder
 *
 * @namespace
 * @name sap.apb.makit
 * @public
 */


// library dependencies
jQuery.sap.require("sap.ui.core.library");

// delegate further initialization of this library to the Core
sap.ui.getCore().initLibrary({
  name : "sap.apb.makit",
  dependencies : ["sap.ui.core"],
  types: [
    "sap.apb.makit.ChartType",
    "sap.apb.makit.LegendPosition",
    "sap.apb.makit.SortOrder"
  ],
  interfaces: [],
  controls: [
    "sap.apb.makit.Chart"
  ],
  elements: [],
  version: "1.14.0"});

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.type, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides enumeration sap.apb.makit.ChartType.
jQuery.sap.declare("sap.apb.makit.ChartType");

/**
 * @class Enumeration for chart type
 *
 * @version 1.14.0
 * @static
 * @public
 * @since 1.12
 */
sap.apb.makit.ChartType = {
  
    /**
     * Column chart 
     * @public
     */
    Column : "Column",

    /**
     * Line chart 
     * @public
     */
    Line : "Line",

    /**
     * Bubble chart 
     * @public
     */
    Bubble : "Bubble",

    /**
     * Horizontal table bar chart 
     * @public
     */
    Bar : "Bar",

    /**
     * Pie chart 
     * @public
     */
    Pie : "Pie"

  };
  
/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.type, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides enumeration sap.apb.makit.LegendPosition.
jQuery.sap.declare("sap.apb.makit.LegendPosition");

/**
 * @class Enumeration for legend position.
 *
 * @version 1.14.0
 * @static
 * @public
 */
sap.apb.makit.LegendPosition = {
  
    /**
     * Legend location is on the top of the chart 
     * @public
     */
    Top : "Top",

    /**
     * Legend location is on the left of the chart 
     * @public
     */
    Left : "Left",

    /**
     * Legend location is on the bottom of the chart 
     * @public
     */
    Bottom : "Bottom",

    /**
     * Legend location is on the right of the chart 
     * @public
     */
    Right : "Right",

    /**
     * Hide the legend 
     * @public
     */
    None : "None"

  };
  
/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.type, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides enumeration sap.apb.makit.SortOrder.
jQuery.sap.declare("sap.apb.makit.SortOrder");

/**
 * @class Enumeration for sort order.
 *
 * @version 1.14.0
 * @static
 * @public
 */
sap.apb.makit.SortOrder = {
  
    /**
     * Ascending sort 
     * @public
     */
    Ascending : "Ascending",

    /**
     * Descending sort 
     * @public
     */
    Descending : "Descending",

    /**
     * No sorting 
     * @public
     */
    None : "None"

  };
  
