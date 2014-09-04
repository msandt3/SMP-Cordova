/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.apb.SuperList.
jQuery.sap.declare("sap.apb.SuperList");
jQuery.sap.require("sap.apb.library");
jQuery.sap.require("sap.ui.core.Control");

/**
 * Constructor for a new SuperList.
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
 * <li>{@link #getDataSource dataSource} : string</li>
 * <li>{@link #getHeight height} : sap.ui.core.CSSSize (default: '100%')</li>
 * <li>{@link #getMetadataFile metadataFile} : sap.ui.core.URI</li>
 * <li>{@link #getWidth width} : sap.ui.core.CSSSize (default: '100%')</li>
 * <li>{@link #getReadRows readRows} : string (default: '200')</li></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.apb.SuperList#event:dataTableQuery dataTableQuery} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.apb.SuperList#event:rowFocusChanged rowFocusChanged} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.apb.SuperList#event:itemChanged itemChanged} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.apb.SuperList#event:buttonClicked buttonClicked} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * SuperList control
 * @extends sap.ui.core.Control
 *
 * @author  
 * @version 1.14.0
 *
 * @constructor   
 * @public
 * @name sap.apb.SuperList
 */
sap.ui.core.Control.extend("sap.apb.SuperList", { metadata : {

	// ---- object ----
	publicMethods : [
		// methods
		"getSelectedCategory", "getSelectedSeries", "getNumberOfCategories", "getSelectedCategoryGroup", "refreshData"
	],

	// ---- control specific ----
	library : "sap.apb",
	properties : {
		"dataSource" : {type : "string", group : "General", defaultValue : null},
		"height" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : '100%'},
		"metadataFile" : {type : "sap.ui.core.URI", group : "General", defaultValue : null},
		"width" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : '100%'},
		"readRows" : {type : "string", group : "General", defaultValue : '200'}
	},
	events : {
		"dataTableQuery" : {}, 
		"rowFocusChanged" : {}, 
		"itemChanged" : {}, 
		"buttonClicked" : {},
		"updateEnd" : {}, 
		"error" : {}
	}
}});


/**
 * Creates a new subclass of class sap.apb.SuperList with name <code>sClassName</code> 
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
 * @name sap.apb.SuperList.extend
 * @function
 */

sap.apb.SuperList.M_EVENTS = {'dataTableQuery':'dataTableQuery','rowFocusChanged':'rowFocusChanged','itemChanged':'itemChanged','buttonClicked':'buttonClicked'};


/**
 * Getter for property <code>dataSource</code>.
 * dataSource name of the SuperList
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>dataSource</code>
 * @public
 * @name sap.apb.SuperList#getDataSource
 * @function
 */

/**
 * Setter for property <code>dataSource</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sDataSource  new value for property <code>dataSource</code>
 * @return {sap.apb.SuperList} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.SuperList#setDataSource
 * @function
 */


/**
 * Getter for property <code>height</code>.
 * The height of the SuperList
 *
 * Default value is <code>100%</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>height</code>
 * @public
 * @name sap.apb.SuperList#getHeight
 * @function
 */

/**
 * Setter for property <code>height</code>.
 *
 * Default value is <code>100%</code> 
 *
 * @param {sap.ui.core.CSSSize} sHeight  new value for property <code>height</code>
 * @return {sap.apb.SuperList} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.SuperList#setHeight
 * @function
 */


/**
 * Getter for property <code>metadataFile</code>.
 * metadata file
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.core.URI} the value of property <code>metadataFile</code>
 * @public
 * @name sap.apb.SuperList#getMetadataFile
 * @function
 */

/**
 * Setter for property <code>metadataFile</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.core.URI} sMetadataFile  new value for property <code>metadataFile</code>
 * @return {sap.apb.SuperList} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.SuperList#setMetadataFile
 * @function
 */


/**
 * Getter for property <code>width</code>.
 * The width of the SuperList
 *
 * Default value is <code>100%</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>width</code>
 * @public
 * @name sap.apb.SuperList#getWidth
 * @function
 */

/**
 * Setter for property <code>width</code>.
 *
 * Default value is <code>100%</code> 
 *
 * @param {sap.ui.core.CSSSize} sWidth  new value for property <code>width</code>
 * @return {sap.apb.SuperList} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.SuperList#setWidth
 * @function
 */


/**
 * Getter for property <code>readRows</code>.
 * readRows
 *
 * Default value is <code>200</code>
 *
 * @return {string} the value of property <code>readRows</code>
 * @public
 * @name sap.apb.SuperList#getReadRows
 * @function
 */

/**
 * Setter for property <code>readRows</code>.
 *
 * Default value is <code>200</code> 
 *
 * @param {string} sReadRows  new value for property <code>readRows</code>
 * @return {sap.apb.SuperList} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.SuperList#setReadRows
 * @function
 */


/**
 * dataTableQuery 
 *
 * @name sap.apb.SuperList#dataTableQuery
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'dataTableQuery' event of this <code>sap.apb.SuperList</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.apb.SuperList</code>.<br/> itself. 
 *  
 * dataTableQuery 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.apb.SuperList</code>.<br/> itself.
 *
 * @return {sap.apb.SuperList} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.SuperList#attachDataTableQuery
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'dataTableQuery' event of this <code>sap.apb.SuperList</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.apb.SuperList} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.SuperList#detachDataTableQuery
 * @function
 */

/**
 * Fire event dataTableQuery to attached listeners.

 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.apb.SuperList} <code>this</code> to allow method chaining
 * @protected
 * @name sap.apb.SuperList#fireDataTableQuery
 * @function
 */


/**
 * rowFocusChanged 
 *
 * @name sap.apb.SuperList#rowFocusChanged
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'rowFocusChanged' event of this <code>sap.apb.SuperList</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.apb.SuperList</code>.<br/> itself. 
 *  
 * rowFocusChanged 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.apb.SuperList</code>.<br/> itself.
 *
 * @return {sap.apb.SuperList} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.SuperList#attachRowFocusChanged
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'rowFocusChanged' event of this <code>sap.apb.SuperList</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.apb.SuperList} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.SuperList#detachRowFocusChanged
 * @function
 */

/**
 * Fire event rowFocusChanged to attached listeners.

 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.apb.SuperList} <code>this</code> to allow method chaining
 * @protected
 * @name sap.apb.SuperList#fireRowFocusChanged
 * @function
 */


/**
 * itemChanged 
 *
 * @name sap.apb.SuperList#itemChanged
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'itemChanged' event of this <code>sap.apb.SuperList</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.apb.SuperList</code>.<br/> itself. 
 *  
 * itemChanged 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.apb.SuperList</code>.<br/> itself.
 *
 * @return {sap.apb.SuperList} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.SuperList#attachItemChanged
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'itemChanged' event of this <code>sap.apb.SuperList</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.apb.SuperList} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.SuperList#detachItemChanged
 * @function
 */

/**
 * Fire event itemChanged to attached listeners.

 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.apb.SuperList} <code>this</code> to allow method chaining
 * @protected
 * @name sap.apb.SuperList#fireItemChanged
 * @function
 */


/**
 * buttonClicked 
 *
 * @name sap.apb.SuperList#buttonClicked
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'buttonClicked' event of this <code>sap.apb.SuperList</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.apb.SuperList</code>.<br/> itself. 
 *  
 * buttonClicked 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener=this] Context object to call the event handler with. Defaults to this <code>sap.apb.SuperList</code>.<br/> itself.
 *
 * @return {sap.apb.SuperList} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.SuperList#attachButtonClicked
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'buttonClicked' event of this <code>sap.apb.SuperList</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.apb.SuperList} <code>this</code> to allow method chaining
 * @public
 * @name sap.apb.SuperList#detachButtonClicked
 * @function
 */

/**
 * Fire event buttonClicked to attached listeners.

 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.apb.SuperList} <code>this</code> to allow method chaining
 * @protected
 * @name sap.apb.SuperList#fireButtonClicked
 * @function
 */


/**
 * Get the value of the currently highlighted category
 *
 * @name sap.apb.SuperList.prototype.getSelectedCategory
 * @function

 * @type string
 * @public
 */


/**
 * Get the value of the currently highlighted series
 *
 * @name sap.apb.SuperList.prototype.getSelectedSeries
 * @function

 * @type string
 * @public
 */


/**
 * Get the number of distinct category values
 *
 * @name sap.apb.SuperList.prototype.getNumberOfCategories
 * @function

 * @type int
 * @public
 */


/**
 * Return an array of categories value that is currently selected.
 *
 * @name sap.apb.SuperList.prototype.getSelectedCategoryGroup
 * @function

 * @type object
 * @public
 */


/**
 * re-retrieve data from the datasource and re-render chart
 *
 * @name sap.apb.SuperList.prototype.refreshData
 * @function

 * @type void
 * @public
 */


// Start of sap\apb\SuperList.js
/*!
 * @copyright@
 */

sap.apb.SuperList.prototype.init = function() { 
	this.metaDataSource = "";
};

sap.apb.SuperList.prototype.onAfterRendering = function() {
	var self = this;
	if(!this._superlist) {
		this._superlist = new window.$SL.SuperList(this.getId() + "_contents");
		this._superlist.bind("datatablequery", function(args){
			self.fireDataTableQuery(args);
		});
		this._superlist.bind("rowfocuschanged", function(args){
			var reg = self.mEventRegistry;
			var binding = false;
			for(var n in reg) {
				if (n == "rowFocusChanged") {
					binding = true;
					break;
				}
			}
			if (binding) {
				self.fireRowFocusChanged(args);
			}
			else {
				self.drillDown(args.row);
			}
		});
		this._superlist.bind("itemchanged", function(args){
			var reg = self.mEventRegistry;
			var binding = false;
			for(var n in reg) {
				if (n == "itemChanged") {
					binding = true;
					break;
				}
			}
			if (binding) {
				self.fireItemChanged(args);
			}
			else {
				self.setItem(args.row,args.column,args.value);
			}
		});
		this._superlist.bind("buttonclicked", function(args){
			self.fireButtonClicked(args);
		});
		this._superlist.bind("beforecreate", function(args){
			args.syntax = self.beforeCreate(args.syntax);
		});
		this._superlist.bind("error", function(args){
			self.fireError(args);
		});
		this._superlist.bind("updateend", function(args){
			self.fireUpdateEnd(args);
		});		
	}
	//start rendering
	var metadatafile = this.getMetadataFile();
//	var dataSource = this.getDataSource();
	if( metadatafile ) {
		var _this = this;
		window.SAP.Util.loadFileByProject(metadatafile, function(data) {
				_this.loadFromMetaString(data);
			}, function(err) {
				//enyo.log("Load failed", err);
			}
		);
	}
};

sap.apb.SuperList.prototype.setMetadataFile = function(oValue) {
	sap.ui.core.Control.prototype.setProperty.call(this, "metadataFile", oValue);
	this.metaDataSource = "";
	if(this._superlist) {
		this.setDataSource("");
//		this.setParameters("");
	}
};

sap.apb.SuperList.prototype.setDataSource = function(oValue) {
	sap.ui.core.Control.prototype.setProperty.call(this, "dataSource", oValue);
};

sap.apb.SuperList.prototype.getDataSource = function() {
	var dataSource = sap.ui.core.Control.prototype.getProperty.call(this, "dataSource");
	if (dataSource != "") {
		return dataSource;
	}
	else {
		return this.metaDataSource;
	}	
};

sap.apb.SuperList.prototype.getMetaDataSource = function() {
	return this.metaDataSource;
};

sap.apb.SuperList.prototype.initParams = function() {
	var result = [];
/*	var params = this.getParameters();
	if (!window.SAP.Util.isStringNullOrEmpty(params)) {
		var items = params.split(";");
		for (var i = 0; i < items.length; i++) {
			var pair = items[i].split(":");
			if (pair.length == 2) {
				result.push({ name: pair[0], value: pair[1] });
			}
		}
	}*/
	
	return result;
};

sap.apb.SuperList.prototype.getRootPath = function(url) {
	var childObj = url.split(".");
	var rootPath = "";
	var start = childObj[0] == "odataservice" ? 3 : 2;
	for (var i = start; i<childObj.length; i++) {
		rootPath += childObj[i];
		if (i != childObj.length -1) {
			rootPath += ".";
		}
	}
	return rootPath;
};

sap.apb.SuperList.prototype.beforeCreate = function(syntax) {
	var jsonDoc = syntax;
	for (var j = 0; j < jsonDoc.Content.length; j++) {
		var sourceType = jsonDoc.Content[j].DataTable.SourceType.toLowerCase();
		if (sourceType != "memory") {
			var Url = jsonDoc.Content[j].DataTable.Url;
			if (Url != "") {
				var rootPath = this.getRootPath(Url);
				var dataSourceMeta = window.SAP.DataSources.getDataSourceMeta(Url);
				if (sourceType != "file") {
					if (this.firstDataSourceMeta == null) {
						this.firstDataSourceMeta = dataSourceMeta;
						var proxyMatch = null;
						if (this.firstDataSourceMeta.proxy) {
							proxyMatch = new window.$SL.Data.ProxyMatch(null, null, true);
						}
						var params = [];
						var parameters = this.initParams();
						if (parameters.length > 0) {
							for (var i = 0; i < parameters.length; i++) {
								params.push(parameters[i].value);
							}
						}
						else {
							if (this.firstDataSourceMeta.params != undefined) {
								for (var i = 0; i < this.firstDataSourceMeta.params.length; i++) {
									params.push(this.firstDataSourceMeta.params[i].defaultValue);
								}
							}
						}
						var slconnection = new window.$SL.Data.DataConnection(this.firstDataSourceMeta.userName, this.firstDataSourceMeta.password, params, this.getReadRows());
						if(this.firstDataSourceMeta.server){
							slconnection.setSMPConnectInfo(this.firstDataSourceMeta.server, this.firstDataSourceMeta.appid, 
								this.firstDataSourceMeta.apptag, this.firstDataSourceMeta.connid, this.firstDataSourceMeta.deviceType, this.firstDataSourceMeta.bAnonymous);
						}else{
							slconnection.setConnectInfo(this.firstDataSourceMeta.jsonp, proxyMatch);
						}
						this._superlist.setDataSourceInfo(slconnection);
					}
					jsonDoc.Content[j].DataTable.Url = dataSourceMeta.rootURL;
					if (dataSourceMeta.entityUrl) {
						jsonDoc.Content[j].DataTable.entityUrl = dataSourceMeta.entityUrl;
					}
				}
				else {
					var uri = window.SAP.Util.getProjectPathUrl("");
					jsonDoc.Content[j].DataTable.Url = uri + dataSourceMeta.rootURL;	
				}
				jsonDoc.Content[j].DataTable.rootpath = rootPath;
			}
		}
	}
	return jsonDoc;
};

sap.apb.SuperList.prototype.setSouceDatatypes = function(columns, sourceColumns) {
	function setColumnSourceType(column, sColumns) {
		for (var j = 0; j < sColumns.length; j++){
			var sColumn = sColumns[j];
			if (column.Name.localeCompare(sColumn.name) == 0) {
				column.SourceDatatype = sColumn.originalType;
				break;
			}
		}
	}
	
	for (var i = 0; i < columns.length; i++) {
		var column = columns[i];
		setColumnSourceType(column, sourceColumns);
	}
};

sap.apb.SuperList.prototype.loadFromMetaString = function(metadata) {
	var jsonDoc;
	if (typeof metadata != "object") {
		try{
			jsonDoc = JSON.parse(metadata);
		} catch(e) {
			this._superlist.create(metadata);
			return;
		}
	}
	else {
		jsonDoc = metadata;
	}
	this.firstDataSourceMeta = null;
	var uri = window.SAP.Util.getProjectPathUrl("");
	var config = sap.ui.getCore().getConfiguration();
	var theme = config.getTheme();
	window.$SL.applyCSS({theme: theme});
	var dS = null;
	var dataSource = sap.ui.core.Control.prototype.getProperty.call(this, "dataSource");
	if (dataSource != "") {
		dS = JSON.parse(dataSource);
		for (var j = 0; j < dS.Content.length; j++) {
			var sourceType = dS.Content[j].DataTable.SourceType.toLowerCase();
			jsonDoc.Content[j].DataTable = dS.Content[j].DataTable;
			if (sourceType != "memory") {
				var Url = dS.Content[j].DataTable.Url;
				if (Url != "") {
					var rootPath = this.getRootPath(Url);
					var dataSourceMeta = window.SAP.DataSources.getDataSourceMeta(Url);
					if (this.firstDataSourceMeta == null) {
						this.firstDataSourceMeta = dataSourceMeta;
					}
					jsonDoc.Content[j].DataTable.Url = dataSourceMeta.rootURL;
					if (dataSourceMeta.entityUrl) {
						jsonDoc.Content[j].DataTable.entityUrl = dataSourceMeta.entityUrl;
					}					
					jsonDoc.Content[j].DataTable.rootpath = rootPath;
				}
			}	
		}		
	}
	else {
		dS = {};
		dS.Content = [];
		for (var j = 0; j < jsonDoc.Content.length; j++) {
			dS.Content.push(new Object());
			dS.Content[j].ID = jsonDoc.Content[j].ID;
			dS.Content[j].DataTable = new Object;
			dS.Content[j].DataTable.Url = jsonDoc.Content[j].DataTable.Url;
			dS.Content[j].DataTable.SourceType = jsonDoc.Content[j].DataTable.SourceType;
			dS.Content[j].DataTable.navigationParameters = jsonDoc.Content[j].DataTable.navigationParameters;
			dS.Content[j].DataTable.Content = jsonDoc.Content[j].DataTable.Content;
			var sourceType = jsonDoc.Content[j].DataTable.SourceType.toLowerCase();
			if (sourceType != "memory") {
				var Url = jsonDoc.Content[j].DataTable.Url;
				if (Url != "") {
					var rootPath = this.getRootPath(Url);
					var dataSourceMeta = window.SAP.DataSources.getDataSourceMeta(Url);
					if (sourceType.toLowerCase() != "file") {
						if (this.firstDataSourceMeta == null) {
							this.firstDataSourceMeta = dataSourceMeta;
						}
						jsonDoc.Content[j].DataTable.Url = dataSourceMeta.rootURL;
						if (dataSourceMeta.entityUrl) {
							jsonDoc.Content[j].DataTable.entityUrl = dataSourceMeta.entityUrl;
						}
					}
					else {
						jsonDoc.Content[j].DataTable.Url = uri + dataSourceMeta.rootURL;
					}
					jsonDoc.Content[j].DataTable.rootpath = rootPath;
					
					//set column type
					this.setSouceDatatypes(dS.Content[j].DataTable.Content, dataSourceMeta.columns);
				}
			}
		}
		this.metaDataSource = JSON.stringify(dS, null, "\t");
	}
	if (this.firstDataSourceMeta) {
		var proxyMatch = null;
		if (this.firstDataSourceMeta.proxy) {
			proxyMatch = new window.$SL.Data.ProxyMatch(null, null, true);
		}
		var params = [];
		var parameters = this.initParams();
		if (parameters.length > 0) {
			for (var i = 0; i < parameters.length; i++) {
				params.push(parameters[i].value);
			}
		}
		else {
			if (this.firstDataSourceMeta.params != undefined) {
				for (var i = 0; i < this.firstDataSourceMeta.params.length; i++) {
					params.push(this.firstDataSourceMeta.params[i].defaultValue);
				}
			}	
		}
		var slconnection = new window.$SL.Data.DataConnection(this.firstDataSourceMeta.userName, this.firstDataSourceMeta.password, params, this.getReadRows());
		if(this.firstDataSourceMeta.server){
			slconnection.setSMPConnectInfo(this.firstDataSourceMeta.server, this.firstDataSourceMeta.appid, 
				this.firstDataSourceMeta.apptag, this.firstDataSourceMeta.connid, this.firstDataSourceMeta.deviceType, this.firstDataSourceMeta.bAnonymous);
		}else{
			slconnection.setConnectInfo(this.firstDataSourceMeta.jsonp, proxyMatch);
		}
		this._superlist.setDataSourceInfo(slconnection);
	}
	window.$SL.setProjectFolder(uri);
	this._superlist.create(jsonDoc);
};

sap.apb.SuperList.prototype.create = function(syntax) {
	this.firstDataSourceMeta = null;
	syntax = this.beforeCreate(syntax);
	var uri = window.SAP.Util.getProjectPathUrl("");
	window.$SL.setProjectFolder(uri);
	return this._superlist.create(syntax);
};

sap.apb.SuperList.prototype.deleteRow = function(row) {
	return this._superlist.deleteRow(row);
};

sap.apb.SuperList.prototype.drillBack = function() {
	return this._superlist.drillBack();
};

sap.apb.SuperList.prototype.filter = function(expr) {
	return this._superlist.filter(expr);
};

sap.apb.SuperList.prototype.getCurrentLevel = function() {
	return this._superlist.getCurrentLevel();
};

sap.apb.SuperList.prototype.getItem = function(row, col) {
	return this._superlist.getItem(row, col);
};

sap.apb.SuperList.prototype.getNumberOfRows = function() {
	return this._superlist.getNumberOfRows();
};

sap.apb.SuperList.prototype.getRow = function(row) {
	return this._superlist.getRow(row);
};

sap.apb.SuperList.prototype.insertRow = function(row) {
	return this._superlist.insertRow(row);
};

sap.apb.SuperList.prototype.refreshData = function() {
	this.rerender();
	return true;
};

sap.apb.SuperList.prototype.load = function(url) {
	if (url) {
		this.setMetadataFile(url);
		this.rerender();
		return true;
	}
	return false;
};

sap.apb.SuperList.prototype.reset = function() {
	return this._superlist.reset();
};

sap.apb.SuperList.prototype.retrieve = function(args) {
	return this._superlist.retrieve(args);
};

sap.apb.SuperList.prototype.sort = function(value) {
	return this._superlist.sort(value);
};

sap.apb.SuperList.prototype.setItem = function(row, col, value) {
	return this._superlist.setItem(row, col, value);
};

sap.apb.SuperList.prototype.update = function() {
	return this._superlist.update();
};

sap.apb.SuperList.prototype.getObjectProperty = function(name) {
	return this._superlist.getProperty(name);
};

sap.apb.SuperList.prototype.setObjectProperty = function(name, value) {
	return this._superlist.setProperty(name, value);
};

sap.apb.SuperList.prototype.setData = function(value, id) {
	return this._superlist.setData(value, id);
};

sap.apb.SuperList.prototype.drillDown = function(row) {
	return this._superlist.drillDown(row);
};