/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.apb.makit.Chart.
jQuery.sap.declare("sap.apb.makit.Chart");
jQuery.sap.require("sap.apb.makit.library");
jQuery.sap.require("sap.ui.core.Control");

/**
 * Constructor for a new Chart.
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
 * <li>{@link #getType type} : sap.apb.makit.ChartType (default: sap.apb.makit.ChartType.Column)</li>
 * <li>{@link #getCategorySortOrder categorySortOrder} : sap.apb.makit.SortOrder (default: sap.apb.makit.SortOrder.None)</li>
 * <li>{@link #getDataSource dataSource} : string</li>
 * <li>{@link #getHeight height} : sap.ui.core.CSSSize (default: '100%')</li>
 * <li>{@link #getLegendPosition legendPosition} : sap.apb.makit.LegendPosition (default: sap.apb.makit.LegendPosition.None)</li>
 * <li>{@link #getLineThickness lineThickness} : float (default: 1)</li>
 * <li>{@link #getMaxSliceCount maxSliceCount} : int (default: 12)</li>
 * <li>{@link #getMetadataFile metadataFile} : sap.ui.core.URI</li>
 * <li>{@link #getShowRangeSelector showRangeSelector} : boolean (default: true)</li>
 * <li>{@link #getShowTableView showTableView} : boolean (default: false)</li>
 * <li>{@link #getShowTableValue showTableValue} : boolean (default: true)</li>
 * <li>{@link #getShowToolbar showToolbar} : boolean (default: true)</li>
 * <li>{@link #getWidth width} : sap.ui.core.CSSSize (default: '100%')</li></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.apb.makit.Chart#event:doubletap doubletap} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.apb.makit.Chart#event:tap tap} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * MAKit Chart
 * @extends sap.ui.core.Control
 *
 * @author SAP AG 
 * @version 1.14.0
 *
 * @constructor   
 * @public
 * @name sap.apb.makit.Chart
 */
sap.ui.core.Control.extend("sap.apb.makit.Chart", { metadata : {

	// ---- object ----
	publicMethods : [
		// methods
		"getSelectedCategory", "getSelectedSeries", "getNumberOfCategories", "refreshData"
	],

	// ---- control specific ----
	library : "sap.apb.makit",
	properties : {
		"type" : {type : "sap.apb.makit.ChartType", group : "Appearance", defaultValue : sap.apb.makit.ChartType.Column},
		"categorySortOrder" : {type : "sap.apb.makit.SortOrder", group : "Misc", defaultValue : sap.apb.makit.SortOrder.None},
		"dataSource" : {type : "string", group : "", defaultValue : null},
		"height" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : '100%'},
		"legendPosition" : {type : "sap.apb.makit.LegendPosition", group : "Appearance", defaultValue : sap.apb.makit.LegendPosition.None},
		"lineThickness" : {type : "float", group : "Appearance", defaultValue : 1},
		"maxSliceCount" : {type : "int", group : "Misc", defaultValue : 12},
		"metadataFile" : {type : "sap.ui.core.URI", group : "", defaultValue : null},
		"showRangeSelector" : {type : "boolean", group : "Appearance", defaultValue : true},
		"showTableView" : {type : "boolean", group : "Appearance", defaultValue : false},
		"showTableValue" : {type : "boolean", group : "Appearance", defaultValue : true},
		"showToolbar" : {type : "boolean", group : "Appearance", defaultValue : true},
		"width" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : '100%'}
	},
	events : {
		"doubletap" : {}, 
		"tap" : {}
	}
}});


/**
 * Creates a new subclass of class sap.apb.makit.Chart with name <code>sClassName</code> 
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
 * @name sap.apb.makit.Chart.extend
 * @function
 */

sap.apb.makit.Chart.M_EVENTS = {'doubletap':'doubletap','tap':'tap'};


/**
 * Getter for property <code>type</code>.
 * Chart type.
 *
 * Default value is <code>Column</code>
 *
 * @return {sap.apb.makit.ChartType} the value of property <code>type</code>
 * @public
 * @name sap.apb.makit.Chart#getType
 * @function
 */

/**
 * Setter for property <code>type</code>.
 *
 * Default value is <code>Column</code> 
 *
 * @param {sap.apb.makit.ChartType} oType  new value for property <code>type</code>
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.makit.Chart#setType
 * @function
 */


/**
 * Getter for property <code>categorySortOrder</code>.
 * Sort order for category. If None, the category's column is expected to be pre-sorted.
 *
 * Default value is <code>None</code>
 *
 * @return {sap.apb.makit.SortOrder} the value of property <code>categorySortOrder</code>
 * @public
 * @name sap.apb.makit.Chart#getCategorySortOrder
 * @function
 */

/**
 * Setter for property <code>categorySortOrder</code>.
 *
 * Default value is <code>None</code> 
 *
 * @param {sap.apb.makit.SortOrder} oCategorySortOrder  new value for property <code>categorySortOrder</code>
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.makit.Chart#setCategorySortOrder
 * @function
 */


/**
 * Getter for property <code>dataSource</code>.
 * dataSource name of the chart.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>dataSource</code>
 * @public
 * @name sap.apb.makit.Chart#getDataSource
 * @function
 */

/**
 * Setter for property <code>dataSource</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sDataSource  new value for property <code>dataSource</code>
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.makit.Chart#setDataSource
 * @function
 */


/**
 * Getter for property <code>height</code>.
 * The height of the Chart.
 *
 * Default value is <code>100%</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>height</code>
 * @public
 * @name sap.apb.makit.Chart#getHeight
 * @function
 */

/**
 * Setter for property <code>height</code>.
 *
 * Default value is <code>100%</code> 
 *
 * @param {sap.ui.core.CSSSize} sHeight  new value for property <code>height</code>
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.makit.Chart#setHeight
 * @function
 */


/**
 * Getter for property <code>legendPosition</code>.
 * Legend position all chart types except Bar chart. Bar chart only support Bottom position.
 *
 * Default value is <code>None</code>
 *
 * @return {sap.apb.makit.LegendPosition} the value of property <code>legendPosition</code>
 * @public
 * @name sap.apb.makit.Chart#getLegendPosition
 * @function
 */

/**
 * Setter for property <code>legendPosition</code>.
 *
 * Default value is <code>None</code> 
 *
 * @param {sap.apb.makit.LegendPosition} oLegendPosition  new value for property <code>legendPosition</code>
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.makit.Chart#setLegendPosition
 * @function
 */


/**
 * Getter for property <code>lineThickness</code>.
 * Specify the line thickness of the line graph. Only applies to Line chart type.
 *
 * Default value is <code>1</code>
 *
 * @return {float} the value of property <code>lineThickness</code>
 * @public
 * @name sap.apb.makit.Chart#getLineThickness
 * @function
 */

/**
 * Setter for property <code>lineThickness</code>.
 *
 * Default value is <code>1</code> 
 *
 * @param {float} fLineThickness  new value for property <code>lineThickness</code>
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.makit.Chart#setLineThickness
 * @function
 */


/**
 * Getter for property <code>maxSliceCount</code>.
 * Set the maximum number of slices in a Pie/Donut chart. If exceeding the specified value, the rest will be categorised into a single slice. Only applies to Pie/Donut.
 *
 * Default value is <code>12</code>
 *
 * @return {int} the value of property <code>maxSliceCount</code>
 * @public
 * @name sap.apb.makit.Chart#getMaxSliceCount
 * @function
 */

/**
 * Setter for property <code>maxSliceCount</code>.
 *
 * Default value is <code>12</code> 
 *
 * @param {int} iMaxSliceCount  new value for property <code>maxSliceCount</code>
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.makit.Chart#setMaxSliceCount
 * @function
 */


/**
 * Getter for property <code>metadataFile</code>.
 * Metadata file URI that is assigned to this chart. Metadata is mandatory for a chart to be rendered because it contains the chart's details.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.core.URI} the value of property <code>metadataFile</code>
 * @public
 * @name sap.apb.makit.Chart#getMetadataFile
 * @function
 */

/**
 * Setter for property <code>metadataFile</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.core.URI} sMetadataFile  new value for property <code>metadataFile</code>
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.makit.Chart#setMetadataFile
 * @function
 */


/**
 * Getter for property <code>showRangeSelector</code>.
 * Specify whether the range selector should be visible.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>showRangeSelector</code>
 * @public
 * @name sap.apb.makit.Chart#getShowRangeSelector
 * @function
 */

/**
 * Setter for property <code>showRangeSelector</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bShowRangeSelector  new value for property <code>showRangeSelector</code>
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.makit.Chart#setShowRangeSelector
 * @function
 */


/**
 * Getter for property <code>showTableView</code>.
 * Toggle to display table view.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>showTableView</code>
 * @public
 * @name sap.apb.makit.Chart#getShowTableView
 * @function
 */

/**
 * Setter for property <code>showTableView</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bShowTableView  new value for property <code>showTableView</code>
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.makit.Chart#setShowTableView
 * @function
 */


/**
 * Getter for property <code>showTableValue</code>.
 * Toggle to display the table value on a Bar chart. Only applies to Bar chart.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>showTableValue</code>
 * @public
 * @name sap.apb.makit.Chart#getShowTableValue
 * @function
 */

/**
 * Setter for property <code>showTableValue</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bShowTableValue  new value for property <code>showTableValue</code>
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.makit.Chart#setShowTableValue
 * @function
 */


/**
 * Getter for property <code>showToolbar</code>.
 * Show or hide the chart's toolbar.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>showToolbar</code>
 * @public
 * @name sap.apb.makit.Chart#getShowToolbar
 * @function
 */

/**
 * Setter for property <code>showToolbar</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bShowToolbar  new value for property <code>showToolbar</code>
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.makit.Chart#setShowToolbar
 * @function
 */


/**
 * Getter for property <code>width</code>.
 * The width of the Chart.
 *
 * Default value is <code>100%</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>width</code>
 * @public
 * @name sap.apb.makit.Chart#getWidth
 * @function
 */

/**
 * Setter for property <code>width</code>.
 *
 * Default value is <code>100%</code> 
 *
 * @param {sap.ui.core.CSSSize} sWidth  new value for property <code>width</code>
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.makit.Chart#setWidth
 * @function
 */


/**
 * Double tap event on chart. 
 *
 * @name sap.apb.makit.Chart#doubletap
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'doubletap' event of this <code>sap.apb.makit.Chart</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.apb.makit.Chart</code>.<br/> itself. 
 *  
 * Double tap event on chart. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.apb.makit.Chart</code>.<br/> itself.
 *
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.makit.Chart#attachDoubletap
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'doubletap' event of this <code>sap.apb.makit.Chart</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.makit.Chart#detachDoubletap
 * @function
 */

/**
 * Fire event doubletap to attached listeners.

 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @protected
 * @name sap.apb.makit.Chart#fireDoubletap
 * @function
 */


/**
 * Single tap event on the chart. 
 *
 * @name sap.apb.makit.Chart#tap
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'tap' event of this <code>sap.apb.makit.Chart</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.apb.makit.Chart</code>.<br/> itself. 
 *  
 * Single tap event on the chart. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.apb.makit.Chart</code>.<br/> itself.
 *
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.makit.Chart#attachTap
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'tap' event of this <code>sap.apb.makit.Chart</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.makit.Chart#detachTap
 * @function
 */

/**
 * Fire event tap to attached listeners.

 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.apb.makit.Chart} <code>this</code> to allow method chaining
 * @protected
 * @name sap.apb.makit.Chart#fireTap
 * @function
 */


/**
 * Get the value of the currently highlighted category.
 *
 * @name sap.apb.makit.Chart.prototype.getSelectedCategory
 * @function

 * @type string
 * @public
 */


/**
 * Get the value of the currently highlighted series.
 *
 * @name sap.apb.makit.Chart.prototype.getSelectedSeries
 * @function

 * @type string
 * @public
 */


/**
 * Get the number of distinct category values.
 *
 * @name sap.apb.makit.Chart.prototype.getNumberOfCategories
 * @function

 * @type int
 * @public
 */


/**
 * Re-retrieve data from the datasource and re-render chart.
 *
 * @name sap.apb.makit.Chart.prototype.refreshData
 * @function

 * @type void
 * @public
 */


// Start of sap\apb\makit\Chart.js
/*!
 * @copyright@
 */

sap.apb.makit.Chart.TypeMapping = {
	'column' : 'Column',
	'line' : 'Line',
	'pie' : 'Pie',
	'bar' : 'Bar',
	'bubble' : 'Bubble',
	'stackcolumn' : 'StackColumn',
	'hundredpercentstackcolumn' : 'HundredPercentStackColumn',
	'waterfallcolumn' : 'WaterfallColumn',
	'waterfallbar' : 'WaterfallBar'
};

sap.apb.makit.Chart.DummyMetadata = '' +
	'<Chart Name="makitChartDummy" ChartType="column">' +
		'<Category Column="DummyCategory"/>' +
		'<Values>' +
			'<Value Expression="DummyValues"/>' +
		'</Values>' +
	'</Chart>';

sap.apb.makit.Chart.getDummyJSONData = function(){
	var dataTable = new window.$MA.DataTable();
	dataTable.addColumn("DummyCategory", "string");
	dataTable.addColumn("DummyValues", "number");
	dataTable.addRow([ "", "" ]);
	return dataTable;
};

sap.apb.makit.Chart.checkSizeTimer = null;
sap.apb.makit.Chart.registeredElems = {};
sap.apb.makit.Chart.registeredHandlers = {};

sap.apb.makit.Chart.registerResizeHandler = function(elem, handler) {
	if (!sap.apb.makit.Chart.registeredElems[elem.id]) {
		sap.apb.makit.Chart.registeredElems[elem.id] = elem;
		sap.apb.makit.Chart.registeredHandlers[elem.id] = handler;
		//There is an issue with size, so we set them 0 now, and force at least 1 refresh.
		elem.currentOffsetHeight = 0;//elem.offsetHeight;
		elem.currentOffsetWidth = 0;//elem.offsetWidth;
	}
	if (!sap.apb.makit.Chart.checkSizeTimer ) {
		sap.apb.makit.Chart.checkSizeTimer = setTimeout(sap.apb.makit.Chart.checkSize, 200);
	}
};

sap.apb.makit.Chart.checkSize = function() {
	for (var elemId in sap.apb.makit.Chart.registeredElems) {
		var elem = sap.apb.makit.Chart.registeredElems[elemId];
		if (elem && (elem.currentOffsetHeight != elem.offsetHeight || elem.currentOffsetWidth != elem.offsetWidth)){
			elem.currentOffsetHeight = elem.offsetHeight;
			elem.currentOffsetWidth = elem.offsetWidth;
			sap.apb.makit.Chart.registeredHandlers[elem.id]();
		}
	}
	
	sap.apb.makit.Chart.checkSizeTimer = setTimeout(sap.apb.makit.Chart.checkSize, 200);
};
/**
 * @override
 */
sap.apb.makit.Chart.prototype.init = function() {
	//Private variable
	this._initialized = false;
	this._makitType = "simple"; //simple, drilldowngroup, zooming
	this._hasZoomingLevel = false;
	this._makitChart = null;
	this._parentCurrentHeight = 0;
	this._selectedCatIdx = 0;
	this._chartTypeDefined = false;
	this._legendPosDefined = false;
	this._metadataString = null;
	this._metadataXmlDoc = null;
	
	this._chartList = {"Content":[]}; //collection of chart objects
	
	this._customisedProps = {};
	this._metadataValues = {};
	
	this._styleClasses = []; //workaround for custom classes

	//this.setPrimaryColorPalette(null);
	this.attachEvent("_change", this._onPropertyChanged);
	sap.ui.getCore().attachThemeChanged(this._applyCSS, this);
};

/**
 * Attempt to preserve the chart's DOM reference before re-rendering it
 * @override
 */
sap.apb.makit.Chart.prototype.onBeforeRendering = function(oEvent) {
	this.fireEvent("_beforeRendering", this);
	if(this.getDomRef() && !sap.ui.core.RenderManager.isPreservedContent(this.getDomRef())){
		sap.ui.core.RenderManager.preserveContent(this.getDomRef(), /* bPreserveRoot */ true, /* bPreserveNodesWithId */ false);
	}
};

/**
 * Once the place holder is rendered, we will create the MAKit chart object or 
 * retrieve the preserved chart DOM reference if exists.
 * @override
 */
sap.apb.makit.Chart.prototype.onAfterRendering = function(oEvent) {
	this.fireEvent("_afterRendering", this);
	var $placeholder = jQuery(jQuery.sap.domById("sap-ui-dummy-" + this.getId()));
	var $oldContent = sap.ui.core.RenderManager.findPreservedContent(this.getId());
	var $newContent = null;
	
	if ($oldContent.size() == 0) {
		this.fireEvent("_createMAKitObject", this);
		$newContent = new jQuery(this.getDomRef());
		$placeholder.replaceWith($newContent);
		this._createChartObject();
		var elem = this.getDomRef();
		sap.apb.makit.Chart.registerResizeHandler(elem, jQuery.proxy(this._onResize, this));
	} else if ( $oldContent.size() > 0 ) {
		this.fireEvent("_restoreMAKitObject", this);
		$placeholder.replaceWith($oldContent);
		var elem = this.getDomRef();
		if (elem != null){
			elem.style.width = this.getWidth();
			elem.style.height = this.getHeight();
		}
	} else {
		$placeholder.remove();
	}
};

/** 
 * WORKAROUND: MAKit chart current behavior overwrite the div's css class when it's created
 *				So we need to intercept addition of custom style classes before
 *				this._makitChart is created.
 * @override
 */
sap.apb.makit.Chart.prototype.addStyleClass = function(sStyleClass, bSuppressRerendering) {
	 //If it's already in the control, then it is in the _styleClasses array
	if (this._styleClasses.indexOf(sStyleClass) === -1) {
		this._styleClasses.push(sStyleClass);
	}

	if(this._makitChart) {
		sap.ui.core.Control.prototype.addStyleClass.call(this, sStyleClass, bSuppressRerendering);
	}
	return this;
};

/**
 * @override
 */
sap.apb.makit.Chart.prototype.removeStyleClass = function(sStyleClass, bSuppressRerendering) {
	var idx = this._styleClasses.indexOf(sStyleClass);
	if (idx > -1) {
		this._styleClasses.splice(idx, 1);
	}

	if(this._makitChart) {
		sap.ui.core.Control.prototype.removeStyleClass.call(this, sStyleClass, bSuppressRerendering);
	}
	return this;
};

/**
 * @override
 */
sap.apb.makit.Chart.prototype.setProperty = function(oType, oValue) {
	this._customisedProps[oType] = true;
	sap.ui.core.Control.prototype.setProperty.call(this, oType, oValue);
};

/**
 * @override
 */
/*sap.apb.makit.Chart.prototype.setPrimaryColorPalette = function(oColorPalette) {
	if (oColorPalette == "" || (oColorPalette instanceof Array && oColorPalette.length > 0)) {
		var val = oColorPalette == "" ? null : oColorPalette;
		sap.ui.core.Element.prototype.setProperty.call(this, "primaryColorPalette", oColorPalette, false);
		if (this._makitChart) {
			this._makitChart.setPalette(val);
		}
	}
	else {
		throw new Error("primaryColorPalette property must be an array");
	}
	return this;
};*/

/**
 * @override
 */
sap.apb.makit.Chart.prototype.setDataSource = function(oValue) {
	sap.ui.core.Control.prototype.setProperty.call(this, "dataSource", unescape(oValue));
};


/*=================================================================================
 *== PRIVATE METHODS
 *=================================================================================
 **/

sap.apb.makit.Chart.prototype._getXMLParser = function(xmlStr) {
	var xmlDoc;
	if (window.DOMParser) {
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(xmlStr,"text/xml");
	}
	else { // Internet Explorer
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async=false;
		xmlDoc.loadXML(xmlStr); 
	}
	return xmlDoc;
};

sap.apb.makit.Chart.prototype._loadAndParseMetadataUrl = function (){
	var metaUrl = this.getMetadataFile();
	if(metaUrl != null && metaUrl.trim() !== "") {
		window.SAP.Util.loadFileByProject(metaUrl, this._parseMetadata, this._onLoadMetadataError, this);
	}
	else {
		this._makitChart = null;
		this._metadataXmlDoc = null;
		this._metadataValues = {};
		this._dsSet = false;
		var elem = this.getDomRef();
		if(elem) {
			while (elem.hasChildNodes()) {
				elem.removeChild(elem.lastChild);
			}
		}
		this._createChartObject();
	}
};

sap.apb.makit.Chart.prototype._parseMetadata = function (metadata){
	this._metadataXmlDoc = this._getXMLParser(metadata);
	this._metadataValues = {}; //We are parsing a new metadata, so need to reset _metadataValues
	this._dsSet = false;
	this._makitChart = null;
	//TODO: Add back for makitDS support
	//this._metadataValues["dataSource"] = {"Content":[]};
	this._metadataValues["dataSource"] = null;
	this._parseXMLNode(this._metadataXmlDoc.documentElement);
	//TODO: Add back for makitDS support
	/*if (this._customisedProps["dataSource"] === undefined){
		this.setDataSource(JSON.stringify(this._metadataValues["dataSource"]));
	}*/
	//Now check to see if we need to set the dataSource property with default value from metadata
	if (this._customisedProps["dataSource"] === undefined){
		this._metadataValues["dataSource"] = this._metadataValues["dataSource"] === null? "" : this._metadataValues["dataSource"];
		this.setDataSource(this._metadataValues["dataSource"]);
	}
	this._initialized = true;
	this._createChartObject();
};


sap.apb.makit.Chart.prototype._parseXMLNode = function (currentNode){
	this._makitType = "simple";
	var i, j;
	var childNodes = currentNode.childNodes;
	var len = childNodes.length;
	for (i = 0; i < len; i++) {
		var childNode = childNodes[i];
		if (childNode.nodeType === 1) {
			this._parseXMLNode(childNode);
		}
	}
	
	var nodeName = currentNode.nodeName.toLowerCase();
	
	var attribs = currentNode.attributes;
	var attrLen = attribs.length;
	var chartName = "";
	
	// Looks for chart's name first
	for (j = 0; j < attrLen; j++) {
		var attr = attribs[j];
		var attrName = attr.nodeName.toLowerCase();
		var attrVal = attr.nodeValue;
		if (attrName === "name" && nodeName == "chart") {
			chartName = attrVal;
			break
		}
	}
	
	var dsCurrentIdx = 0;
	if (nodeName == "drilldowngroup") {
		this._makitType = "drilldowngroup";
	}
	else if (nodeName == "zoominglevel") {
		this._hasZoomingLevel = true;
	}
	else if (nodeName == "chart") {
		//TODO: Add back for makitDS support
		/*this._metadataValues["dataSource"].Content.push({"Name": chartName, "Query" : []});
		dsCurrentIdx = this._metadataValues["dataSource"].Content.length-1;*/
	}
	
	// Now parse the rest of the attributes
	for (j = 0; j < attrLen; j++) {
		var attr = attribs[j];
		var attrName = attr.nodeName.toLowerCase();
		var attrVal = attr.nodeValue;
		if (attrName === "charttype" && nodeName == "chart") {
			this._metadataValues["type"] = sap.apb.makit.Chart.TypeMapping[attrVal];
			if (this._initialized || this._customisedProps["type"] === undefined) {
				this.setType(sap.apb.makit.Chart.TypeMapping[attrVal]);
				this._customisedProps["type"] = undefined;
			}
		}
		else if (attrName === "query" && (nodeName == "chart" || nodeName == "zoominglevel")) {
			//TODO: Add back for makitDS support
			//this._metadataValues["dataSource"].Content[dsCurrentIdx].Query.push(attrVal);
			this._metadataValues["dataSource"] = this._metadataValues["dataSource"] === null ? unescape(attrVal) : this._metadataValues["dataSource"];
			if (this._initialized || this._customisedProps["dataSource"] === undefined) {
				var newQStr = this._formatQueryString(unescape(attrVal));
				attr.nodeValue = newQStr;
				this._customisedProps["dataSource"] = undefined;
			}
		}
		else if (attrName === "sortorder" && nodeName == "category") {
			this._metadataValues["categorySortOrder"] = sap.apb.makit.Chart.TypeMapping[attrVal];
			if (this._initialized || this._customisedProps["categorySortOrder"] === undefined) {
				this.setCategorySortOrder(attrVal);
				this._customisedProps["categorySortOrder"] = undefined;
			}
		}
	}
};


sap.apb.makit.Chart.prototype._onLoadMetadataError = function (err){
	this._makitChart = null;
	var elem = this.getDomRef();
	if(elem) {
		while (elem.hasChildNodes()) {
			elem.removeChild(elem.lastChild);
		}
	}
	throw new Error(err);
};

/**
 * Create and initialize the MAKit $MA.Chart object
 * 
 * @private
 * 
 * */
sap.apb.makit.Chart.prototype._createChartObject = function (){
	var elem = this.getDomRef();
	if (elem == null){
		return;
	}
	elem.style.width = this.getWidth();
	elem.style.height = this.getHeight();
	var metadata = null;
	
	var metaUrl = this.getMetadataFile();
	if ((metaUrl == null || metaUrl.trim() === "") && this._metadataXmlDoc === null){
		metadata = sap.apb.makit.Chart.DummyMetadata;
		this.usingDummyData = true;
	}
	else if (this._metadataXmlDoc != null){
		this.usingDummyData = false;
		metadata = this._metadataXmlDoc.xml ? this._metadataXmlDoc.xml : (new XMLSerializer()).serializeToString(this._metadataXmlDoc);
	}
	else {
		return;
	}
	
	try {
		if(this._makitType === "drilldowngroup") {
			this._makitChart = new window.$MA.DrillDownGroup(this.getId(), true);
		}
		else { 
			this._makitChart = new window.$MA.Chart(this.getId(), true);
		}
		var that = this;
		
		this._makitChart.bind("initialized", function() {
			that._setMakitChartProperties();
		});
		
		this._makitChart.bind("renderend", function() {
			that._setMakitChartProperties();
		});
		
		this._makitChart.bind("beforerender", function() {
			that.fireEvent("_makitBeforeRender", that);
		});
		
		this._makitChart.bind("renderstart", function() {
			that.fireEvent("_makitRenderStart", that);
		});
		
		this._makitChart.bind("renderend", function() {
			that.fireEvent("_makitRenderEnd", that);
		});
		
		this._makitChart.bind("animationend", function() {
			that.fireEvent("_makitAnimationEnd", that);
		});

		this._makitChart.create(metadata);

		this._makitChart.bind("tap", function() {
			that._selectedCatIdx = that._makitChart.getSelectedCategoryIndex();
			that.fireTap({/* no parameters */});
		});
		this._makitChart.bind("doubletap", function() {
			that.fireEvent("doubletap", that);
		});
		this._makitChart.bind("longpress", function() {
			that._selectedCatIdx = that._makitChart.getSelectedCategoryIndex();
			that.fireEvent("longpress", that);
		});
	}
	catch (e) {
		jQuery.sap.log.getLogger("sap.apb.makit.Chart").error("failed to create the chart", this.getId(), "sap.apb.makit.Chart");
		this._makitChart = null;
	}

	//workaround for overwritten classes
	//var len = this._styleClasses.length;
	//for (var i = 0; i < len; i++ ){
	//	this.addStyleClass(this._styleClasses[i]);
	//}
};

/**
 * This function is used to apply the Makit properties that will be reset when changing chart type. 
 * 
 * @private
 * 
 * */
sap.apb.makit.Chart.prototype._setMakitChartProperties = function() {
	if (!this._makitChart) {
		return;
	}
	var makitChart = this._makitChart;
	if(this._makitType === "drilldowngroup"){
		makitChart = this._makitChart.getCurrentChart();
	}
	makitChart.setProperty("category.sortorder", this.getCategorySortOrder().toLowerCase());
	makitChart.showToolBar(this.getShowToolbar());
	makitChart.showTableView(this.getShowTableView());
	makitChart.showRangeSelectorView(this.getShowRangeSelector());
	makitChart.setGraphLineWidth(this.getLineThickness());
	makitChart.showTableValue(this.getShowTableValue());
	makitChart.setMaxPies(this.getMaxSliceCount());
	makitChart.setLegend(this.getLegendPosition());
	//makitChart.setPalette(this.getPrimaryColorPalette());
	//makitChart.setProperty("ShowTotal", this.getShowTotalValue());

	if (this.usingDummyData){
		this._makitChart.setDataTable(sap.apb.makit.Chart.getDummyJSONData());
		this._makitChart.showValueBubble(false);
	}
	else {
		var ds = this.getDataSource();
		this._setChartQuery(ds);
	}
	
	var that = this;
	this._makitChart.bind("renderend", function() {
		var curType = makitChart.getProperty("ChartType");
		var type = that.getType();
		
		if (type) {
			curType = curType ? curType.toLowerCase() : curType;
			type = type.toLowerCase();
			if (curType !== type){
				makitChart.setProperty("ChartType", type);
			}
		}
	});

	/*var valueBubble = this.getValueBubble();
	if (valueBubble) {
		var valueBubbleObj = valueBubble.toObject();
		this._makitChart.setValueBubbleStyle(valueBubbleObj);
		if (this._makitChart.isValueBubbleVisible() != valueBubbleObj.visible) {
			this._makitChart.showValueBubble(valueBubbleObj.visible);
		}
	}*/
};

/** 
 * Read and parse the css classes in the document and apply those style to the MAKit Chart 
 * 
 * @private
 */
sap.apb.makit.Chart.prototype._applyCSS = function(oEvent) {
	if (this._makitChart){
		this._makitChart.applyCSS();
	}
};


/*===================================================================================
 *=	PRIVATE EVENT HANDLERS
 *===================================================================================
 **/

/**
 * Handler for onresize event. 
 * 
 * @private
 * 
 * */
sap.apb.makit.Chart.prototype._onResize = function(oEvent) {
	var elem = this.getDomRef();
	
	/*if (this._parentCurrentHeight != parentDomCurHeight && parentDomCurHeight > 0 ) {
		this._setRealHeight(this.getHeight());
		this._parentCurrentHeight = parentDom.offsetHeight;
	}*/
	if(this._makitChart != null && elem && elem.offsetHeight > 0 && elem.offsetWidth > 0) {
		this._makitChart.refresh();
	}
};

/**
 * Handler for Chart's direct properties change. 
 * 
 * @private
 * 
 * */
sap.apb.makit.Chart.prototype._onPropertyChanged = function(oEvent){
	var name = oEvent.mParameters["name"];
	var newVal = oEvent.mParameters["newValue"];
	if(name === "metadataFile") {
		this._loadAndParseMetadataUrl();
	}
	else if(this._makitChart){
		var makitChart = this._makitChart;
		if(this._makitType === "drilldowngroup"){
			makitChart = this._makitChart.getCurrentChart();
		}
		if (name === "type") {
			var type = newVal.toLowerCase();
			//var pieStyle = null;
			makitChart.setProperty("ChartType", type);
			/*if (type === "donut" || type === "pie"){
				pieStyle = type; // it's the pieStyle that can be pie or donut
				type = "pie"; // in MAKit the chart's type is always pie for Pie/Donut chart
				this._makitChart.setProperty("PieStyle", pieStyle);
			}*/
		} else if (name === "showRangeSelector") {
			makitChart.showRangeSelectorView(newVal);
		}
		else if (name === "showToolbar") {
			makitChart.showToolBar(newVal);
		}
		else if (name === "showTableView") {
			makitChart.showTableView(newVal);
		}
		else if (name === "legendPosition") {
			makitChart.setLegend(newVal.toLowerCase());
		}
		else if(name === "width") {
			this.getDomRef().style.width = newVal;
		}
		else if(name === "height") {
			this.getDomRef().style.height = newVal;
		}
		else if(name === "lineThickness") {
			makitChart.setGraphLineWidth(newVal);
		}
		else if(name === "maxSliceCount") {
			makitChart.setMaxPies(newVal);
		}
		else if(name === "showTableValue") {
			makitChart.showTableValue(newVal);
		}
		/*else if(name === "primaryColorPalette") {
			makitChart.setPalette(newVal);
		}*/
		/*else if(name === "showTotalValue") {
			makitChart.setProperty("ShowTotal", newVal);
		}*/
		else if(name === "categorySortOrder") {
			makitChart.setProperty("category.sortorder", newVal.toLowerCase());
		}
		else if(name === "dataSource") {
			if(newVal.trim() === "" ){
				if (typeof this._metadataValues["dataSource"] == "string" 
					&& this._metadataValues["dataSource"].trim() !== "") {
					this._customisedProps["dataSource"] = undefined;
					this.setDataSource(this._metadataValues["dataSource"]);
				}
			}
			else {
				this.usingDummyData = false;
				this._makitChart.showValueBubble(true);
				this._setChartQuery(newVal);
			}
		}
		makitChart.setSelectedCategoryIndex(this._selectedCatIdx);
		this._makitChart.refresh();
	}
};

/**
 * Handler for Category, Value and Series data region property change 
 * 
 * @private
 * 
 * */
/*sap.apb.makit.Chart.prototype._onDataRegionPropChanged = function(oEvent, oData){
	jQuery.sap.assert(oData, "oData is expected to be set in _onDataRegionPropChanged");
	if (!this._makitChart) {
		return;
	}
	var oParams = oEvent.mParameters;
	if (oData["type"] == "values") {
		var valObj = oEvent.oSource;
		var idx = this.indexOfValue(valObj);
		if(idx > -1){
			this._makitChart.setProperty(oData["type"] + "["+idx+"]." + oParams["name"], oParams["newValue"]);
		}
	}
	else if (oData["type"] == "categories") {
		var catObj = oEvent.oSource;
		var idx = this.indexOfCategoryRegion(catObj);
		var propName = oParams["name"];
		if(idx > -1){
			if(propName == "displayName") {
				var cats = this.getCategoryRegions();
				var i, value = "", len = cats.length;
				for(i = 0; i < len; i ++){
					value += cats[i].getDisplayName();
					if (i != len -1) {
						value +=  " | ";
					}
				}
				this._makitChart.setProperty("category." + propName, oParams["newValue"]);
			}
			else {
				this._makitChart.setProperty(oData["type"] + "["+idx+"]." + propName, oParams["newValue"]);
			}
		}
	} else {
		this._makitChart.setProperty(oData["type"] + "." + oParams["name"], oParams["newValue"]);
	}
};*/

/**
 * Handler for CategoryAxis and ValueAxis change 
 * 
 * @private
 * 
 * */
/*sap.apb.makit.Chart.prototype._onAxisPropChanged = function(oEvent, oData){
	jQuery.sap.assert(oData, "oData is expected to be set in _onAxisPropChanged");
	if (!this._makitChart) {
		return;
	}
	var oParams = oEvent.mParameters;
	var sName =  oParams["name"].toLowerCase();
	var value =  oParams["newValue"];
	// Sortorder in makit only accepts lowercase value
	var axis = oData["axis"];
	if (sName === "sortorder") {
		value = value.toLowerCase();
	}
	else if (sName === "displayall") {
		axis = "categories";
		sName = "display";
		if(!value){
			value = "";
		}
	}
	
	this._makitChart.setProperty(axis + "." + sName, value);
	if (sName === "sortorder") {
		this._setDataTable();
	}
	
};*/

/**
 * Handler for ValueBubble properties change 
 * 
 * @private
 * 
 * */
/*sap.apb.makit.Chart.prototype._onValueBubbleChanged = function (oEvent){
	if (!this._makitChart) {
		return;
	}
	var valueBubbleObj = this.getValueBubble().toObject();
	this._makitChart.setValueBubbleStyle(valueBubbleObj);
	if (this._makitChart.isValueBubbleVisible() != valueBubbleObj.visible) {
		this._makitChart.showValueBubble(valueBubbleObj.visible);
	}
	this._makitChart.refresh();
};*/

sap.apb.makit.Chart.prototype.getMetadataValue = function (propName){
	return this._metadataValues[propName];
};

/*=================================================================================
 *== PUBLIC METHODS
 *=================================================================================
 **/

/**
 * See the generated JSDoc for the documentation of this public function
 * 
 * @public
 * */
sap.apb.makit.Chart.prototype.getSelectedCategory = function() {
	var selectedCategory = undefined;
	if (this._makitChart){
		selectedCategory = this._makitChart.getSelectedCategory();
	}
	return selectedCategory;
};

/**
 * See the generated JSDoc for the documentation of this public function
 * 
 * @public
 * */
sap.apb.makit.Chart.prototype.getSelectedSeries = function() {
	var selectedSeries = undefined;
	if (this._makitChart){
		selectedSeries = this._makitChart.getSelectedSeries();
	}
	return selectedSeries;
};

/**
 * See the generated JSDoc for the documentation of this public function
 * 
 * @public
 * */
sap.apb.makit.Chart.prototype.getNumberOfCategories = function() {
	var numOfCat = undefined;
	if (this._makitChart){
		numOfCat = this._makitChart.getNumberOfCategories();
	}
	return numOfCat;
};

/**
 * See the generated JSDoc for the documentation of this public function
 * 
 * @public
 * */
/*sap.apb.makit.Chart.prototype.getSelectedCategoryGroup = function() {
	var selectedCategoryGroup = undefined;
	if (this._makitChart){
		selectedCategoryGroup = this._makitChart.getSelectedCategoryGroup();
	}
	return selectedCategoryGroup;
};*/

sap.apb.makit.Chart.prototype._setChartQuery = function(dsStr, paramsStr) {
	if (!this._makitChart ) {
		return;
	}
	
	var prefix = this._hasZoomingLevel ? "zoominglevels[0].": "";
	var newQStr = this._formatQueryString(dsStr, paramsStr);
	
	var makitChart = this._makitChart;
	if(this._makitType === "drilldowngroup") {
		makitChart = this._makitChart.getChartAtIndex(0);
	}
		
	makitChart.setProperty(prefix + "query", newQStr);
	//TODO: Add back for makitDS support
	/*var dsObj = JSON.parse(dsStr);
	if (dsObj.Content && dsObj.Content.length > 0 ) {
		if(this._makitType === "drilldowngroup") {
			var i, j;
			var clen = dsObj.Content.length;
			
			for(i = 0; i < clen; i++) {
				var makitChart = this._makitChart.getChartAtIndex(i);
				if (dsObj.Content[i].Query) {
					var query = dsObj.Content[i].Query;
					var qlen = query.length;
					for(j = 0; j < len; j++) {
						var prefix = this._hasZoomingLevel ? "zoominglevels[" + j + "].": "";
						var newQStr = this._formatQueryString(query[j]);
						makitChart.setProperty(prefix + "query", newQStr);
					}
				}
			}
		}
		else {
			if(dsObj.Content[0].Query) {
				var query = dsObj.Content[0].Query;
				var i, len = query.length;
				
				for(i = 0; i < len; i++) {
					
					var prefix = this._hasZoomingLevel ? "zoominglevels[" + i + "].": "";
					var newQStr = this._formatQueryString(query[i]);
					this._makitChart.setProperty(prefix + "query", newQStr);
				}
			}
		}
	}*/
};

sap.apb.makit.Chart.prototype._formatQueryString = function(qStr, paramsStr) {
	if (qStr.indexOf("datasource|") < 0 ){
		qStr = "datasource|" +  qStr;
	}
	if (paramsStr) {
		qStr += "|" + paramsStr;
	}
	return qStr;
};

sap.apb.makit.Chart.prototype.refreshData = function() {
	if (!this._makitChart ) {
		return;
	}
	
	var prefix = this._hasZoomingLevel ? "zoominglevels[0].": "";
	var makitChart = this._makitChart;
	if(this._makitType === "drilldowngroup") {
		makitChart = this._makitChart.getChartAtIndex(0);
	}
	var qryStr = makitChart.getProperty(prefix + "query");	
	makitChart.setProperty(prefix + "query", qryStr);
};
