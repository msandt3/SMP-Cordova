var varTypeofnamespace = typeof SAP;
if (varTypeofnamespace === 'undefined') {
	SAP = {};
}

var varTypeofnamespace = typeof $SL;
if (varTypeofnamespace === 'undefined') {
	$SL = {};
}

varTypeofnamespace = typeof $SL.Data;
if (varTypeofnamespace === 'undefined') {
	$SL.Data = {};
}

varTypeofnamespace = typeof $SL.Data.Util;
if (varTypeofnamespace === 'undefined') {
	$SL.Data.Util = {};
}

$SL.Data.Util.isArray = function(o) {
	return Object.prototype.toString.call(o) === "[object Array]";
};
	
$SL.Data.Util.isDate = function (o) {
       return Object.prototype.toString.call(o) === "[object Date]";
};
	
$SL.Data.Util.isString = function (o) {
	return typeof o === "string";
};
	
$SL.Data.Util.isNumber = function (o) {
	return typeof o === "number";
};

$SL.Data.Util.isBoolean = function (o) {
	return typeof o === "boolean";
};


$SL.Data.Util.isFunction = function (o) {
	return Object.prototype.toString.call(o) === "[object Function]";
};

$SL.Data.Util.parseJsonDate = function(sDate) {
	var dDate;
	if(sDate.indexOf("/Date") === -1) {
		dDate = new Date(sDate); 
	}
	else {
		var ss = sDate.replace(/\/Date\((-?\d+)\)\//gi, "$1");
		var dd = parseInt(ss, 10);
		dDate = new Date(dd);
	}
	
	return dDate;
};

$SL.Data.Util.parseFloat = function(svalue) {
	var ret = parseFloat(svalue);
	return isNaN(ret) ? undefined : ret;
};

$SL.Data.Util.parseBool = function(svalue) {
	if (svalue != undefined && (svalue.toLowerCase() === "true" || svalue === "1")) {
		return true;
	}
	return false;
};

$SL.Data.ColumnType = {
	NUMBER : 0,
	STRING : 1,
	DATETIME : 2,
	BINARY : 3,
	BOOLEAN : 4
};

$SL.Data.SourceType = {
	ODATA : 0,
	WEBSERVICE : 1,
	FILE : 2,
	MEMORY : 3
};

$SL.Data.FileType = {
	JSON : 0,
	XML : 1,
	CSV : 2
};

$SL.Data.Write = {
	CREATE: 1,
	UPDATE : 2,
	DELETE : 3
};

/**
 * @param ODataUrl string 
 *			url string for odata service
 * @param proxyUrl string
 *			ODataUrl is mapped to the proxyUrl
 */
$SL.Data.ProxyMatch = function(ODataUrl, proxyUrl){
	this.odataUrl = ODataUrl;
	this.proxyUrl = proxyUrl;
};

/**
 * @param user string 
 *			user name for data source connection
 * @param password string
 *			password for data source connction with user
 * @param enableJsonpCallback boolean
 *			for odata service. Whether enable JSONP when reading data from the odata service
 * @param parameters array
 *			data source url parameters if needed
 * @param url string
 *			data source url
 * @param type string
 *			data source type
 * @param fileType string
 *			file type
 */
$SL.Data.SoruceInfo = function(user, password, enableJsonpCallback, proxyMatch, parameters, url, type, fileType) {
	this.setSourceType = function(sourceType) {
		var stype = sourceType.toUpperCase();
		switch (stype) {
			case "ODATA":
				this.type = $SL.Data.SourceType.ODATA;
				this.limitedRows = true;
				break;
			case "FILE":
				this.type = $SL.Data.SourceType.FILE;
				break;
			default:
				this.type = $SL.Data.SourceType.MEMORY;
				break;
		}
	};
	
	this.setFileType = function(fileType) {
		var ftype = fileType.toUpperCase();
		switch (ftype) {
			case "JSON":
				this.fileType = $SL.Data.FileType.JSON;
				break;
			case "XML":
				this.fileType = $SL.Data.FileType.XML;
				break;
			case "CSV":
				this.fileType = $SL.Data.FileType.CSV;
				break;
			default:
				break;
		}
	};
	
	this.type = $SL.Data.SourceType.MEMORY;
	if(user) {
		this.user = user;
		if(password) {
			this.password = password;
		}
	}
	
	if(parameters) {
		this.parameters = parameters;
	}
	else {
		this.parameters = [];
	}
	
	if(enableJsonpCallback !== undefined) {
		this.enableJsonpCallback = enableJsonpCallback;
	}
	else {
		this.enableJsonpCallback = false;
	}
	
	if(proxyMatch){
		this.proxyMatch = proxyMatch;
	}
	
	if(url) {
		this.url = url;
	}
	
	if(type) {
		this.setSourceType(type);
	}
	
	if(fileType) {
		this.setFileType(fileType);
	}
};

/**
 * column object
 * @param name string 
 *			The column name, required
 * @param columnType $SL.Data.ColumnType
 *			The column type
 * @param path string
 *			column path in data source like "/node1/node2/leaf"
 */
$SL.Data.Column = function(name, columnType, path) {
	this.name = name;
	
	if(columnType != undefined) {
		this.type= columnType;
	}
	else {
		this.type = $SL.Data.ColumnType.STRING;
	}
	
	if(path && path.length > 0) {
		this.path = path;
	}
	else {
		this.path = name;
	}
};

/**
 * model object
 * @param columns array of $SL.Data.Column
 *
  */
$SL.Data.Model = function(columns) {
	function setPathInfo(column, pathInfo){
		var info = {};
		if(pathInfo.length === 0){
			info.root = column.qualName;
			info.columns = [];
			info.columns.push(column.name);
			pathInfo.push(info);
		}
		else{
			var i;
			for(i = 0; i < pathInfo.length; i++){
				if(pathInfo[i].root === column.qualName){
					pathInfo[i].columns.push(column.name);
					break;
				}
			}
			if(i === pathInfo.length){
				info.root = column.qualName;
				info.columns = [];
				info.columns.push(column.name);
				pathInfo.push(info);
			}
		}
	}
	
	this.columns = columns;
	this.pathInfo = [];
	this.updatable = false;
	
	this.setDataInfo = function(){
		var i;
		for(i = 0; i < this.columns.length; i++){
			var qualName = null;
			var propName = null;
			
			var colName = this.columns[i].path.split("/");
			var j;
			for(j = 0; j < colName.length; j++) {
				var sName = colName[j].replace(/^\s+|\s+$/g,'');
				if( j === colName.length - 1) {
					if(sName.length > 0) {
						propName = sName;
					}
					else {
						propName = this.columns[i].name;
					}
				}
				else if(sName.length > 0) {
					if(qualName) {
						qualName += ("." + sName);
					}
					else {
						qualName = sName;
					}
				}
			}
			this.columns[i].propName = propName;
			this.columns[i].qualName = qualName;
			setPathInfo(this.columns[i], this.pathInfo);
		}
	};
};

$SL.Data.getColumnData = function(data, dataSource, bFormat) {
	var model = dataSource.model;
	function getDataWithPath(rdata, path) {
		var props = path.split(".");
		var i;
		for(i = 0; i < props.length; i++) {
			rdata = rdata[props[i]];
		}
		return rdata;
	}
	
	function formatData(cData, dtype, txtFormat){
		if(dtype === $SL.Data.ColumnType.DATETIME && $SL.Data.Util.isString(cData)) {
			cData = $SL.Data.Util.parseJsonDate(cData);
		}
		else if(txtFormat) {
			if(dtype === $SL.Data.ColumnType.NUMBER) {
				cData = $SL.Data.Util.parseFloat(cData);
			}
			else if(dtype === $SL.Data.ColumnType.BOOLEAN) {
				cData = $SL.Data.Util.parseBool(cData);
			}
		}
		return cData;
	}
	
	function getEntityURL(url){
		var entityURL;
		var pos = url.indexOf("(");
		var pos1 = url.indexOf("(", pos+1);
		var pos2 = url.indexOf("\"", pos+1);
		while(pos1 >= 0 && pos2 > pos1){
			pos = pos1;
			pos1 = url.indexOf("(", pos1+1);
			pos2 = url.indexOf("\"", pos1+1);
		}
		entityURL = url.substring(0, pos);
		return entityURL;
	}
	
	if(dataSource.sourceInfo.rootPath) {
		data = getDataWithPath(data, dataSource.sourceInfo.rootPath);
	}
	
	var colLength = model.columns.length;
	model.data = [];
	
	var row;
	if(model.pathInfo.length === 1){
		if(model.pathInfo[0].root && model.pathInfo[0].root.length > 0){
			data = getDataWithPath(data, model.pathInfo[0].root);
		}
		var n, m;
		if($SL.Data.Util.isArray(data)) {
			for(n = 0; n < data.length; n++){
				row = [];
				for(m = 0; m < colLength; m++){
					row.push(formatData(data[n][model.columns[m].propName], model.columns[m].type, bFormat));
				}
				if(model.updatable && data[n].__metadata && data[n].__metadata.uri){
					row[-1] = data[n].__metadata.uri;
					if(!dataSource.entityURL){
						dataSource.entityURL = getEntityURL(data[n].__metadata.uri);
						dataSource.rootURL = dataSource.entityURL.substring(0, dataSource.entityURL.lastIndexOf("/"));
					}
				}
				model.data.push(row);
			}
		}
		else {
			row = [];
			for(m = 0; m < colLength; m++){
				row.push(formatData(data[model.columns[m].propName], model.columns[m].type, bFormat));
			}
			if(model.updatable && data.__metadata && data.__metadata.uri){
				row[-1] = data.__metadata.uri;
				if(!dataSource.entityURL){
					dataSource.entityURL = getEntityURL(data.__metadata.uri);
					dataSource.rootURL = dataSource.entityURL.substring(0, dataSource.entityURL.lastIndexOf("/"));
				}
				model.data.push(row);
			}
		}
	}
	else {
		var colDatas = [colLength];
		var rowLength = 0;
		
		var i;
		for(i = 0; i < colLength; i++) {
			var qualName = model.columns[i].qualName;
			var propName = model.columns[i].propName;
			//store column based data
			colDatas[i] = [];
			
			var colRoot;
			if(qualName) {
				colRoot = getDataWithPath(data, qualName);
			}
			else {
				colRoot = data;
			}
			
			if($SL.Data.Util.isArray(colRoot)) {
				var k;
				for(k = 0; k < colRoot.length; k++) {
					colDatas[i].push(formatData(colRoot[k][propName], model.columns[i].type, bFormat));
				}
			}
			else {
				colDatas[i].push(formatData(colRoot[propName], model.columns[i].type, bFormat));
			}
			
			//get maximum row length
			if(colDatas[i].length > rowLength) {
				rowLength = colDatas[i].length;
			}
		}
		
		var ii;
		for(ii = 0; ii < rowLength; ii++) {
			row = [];
			var jj;
			for(jj = 0; jj < colLength; jj++) {
				if(colDatas[jj].length <= ii) {
					row.push(null);
				}
				else {
					row.push(colDatas[jj][ii]);
				}
			}
			model.data.push(row);
		}
	}
};

/**
 * data source object
 * @param sourceInfo $SL.Data.SoruceInfo 
 *			data source information
 */
$SL.Data.DataSource = function(sourceInfo) {
	function newData(model, item){
		var j;
		var ndata = {};
		for(j = 0; j < model.columns.length; j++){
			ndata[model.columns[j].propName] = item[j];
		}
		return ndata;
	}
	
	function formatString(args) {
		return args[0].replace(/\{(\d+)\}/g, function(match, number) { 
			return args[parseInt(number, 10) + 1] != 'undefined' ? args[parseInt(number, 10) + 1]: match;
		});
	}
	
	function formatArgument(arg) {
		var farg;
		if(arg) {
			if($SL.Data.Util.isNumber(arg) || $SL.Data.Util.isBoolean(arg)) {
				farg = arg;
			}
			else if($SL.Data.Util.isDate(arg)) {
				farg = "datetime'" + arg.toISOString() + "'" ;
			}
			else {
				//string type
				farg = arg.toString();
				farg = farg.replace(/'/g, "''");
				farg = "'" + farg + "'";
			}	
		}
		else {
			farg = 'null';
		}
		return farg;
	}
	
	function formatRows(rows, skip) {
		var args = [];
		if(skip > 0) {
			args.push("&$skip={0}&$top={1}");
			args.push(skip);
			args.push(rows);
		}
		else {
			args.push("&$top={0}");
			args.push(rows);
		}
		return formatString(args);
	}
	
	function formatURLWithParameters(url, parameters) {
		parameters.unshift(url);
		return formatString(parameters);
	}
	
	function xmlToJson(xmlNode) {
		var	jsData = {};
		function AddJsonData(name, value) {
			if (jsData[name]) {
				if (!$SL.Data.Util.isArray(jsData[name])) {
					jsData[name] = [jsData[name]];
				}
				jsData[name].push(value);
			}
			else {
				jsData[name] = value;
			}
		}
		
		if(xmlNode.hasChildNodes()) {
			var i;
			for (i = 0; i < xmlNode.childNodes.length; i++) {
				var node = xmlNode.childNodes[i];
				if(node.nodeType === 1) {
					if (node.childNodes.length === 1 && node.firstChild.nodeType === 3) {
						AddJsonData(node.nodeName, node.firstChild.nodeValue);
					}
					else {
						AddJsonData(node.nodeName, xmlToJson(node));
					}
				}
			}
		}
		return jsData;
	}
	
	if(sourceInfo) {
		this.sourceInfo = sourceInfo;
	}
	else {
		this.sourceInfo = new $SL.Data.SoruceInfo();
	}
	
	//set initial formatted url
	this.formattedURL = this.sourceInfo.url;
	this.odata = null;
	this.model = null;

	this.setSourceInfo = function(sourceInfo) {
		this.sourceInfo = sourceInfo;
		
		//initialize
		this.formattedURL = this.sourceInfo.url;
		this.odata = null;
		this.model = null;
	};
	
	this.getPrxoy = function(){
		if(this.entityURL){
			var localHost = this.sourceInfo.url.match(/:\/\/(.[^/]+)/)[1];
			var odataHost = this.entityURL.match(/:\/\/(.[^/]+)/)[1];
			if(localHost.toLowerCase() != odataHost.toLowerCase()){
				var pos = this.sourceInfo.url.toLowerCase().indexOf(odataHost.toLowerCase());
				this.proxy = this.sourceInfo.url.substring(0,pos);
				this.odataHost = odataHost;
			}
		}
	};
	
	this.urlWithProxy = function(odataURL) {
		if(this.sourceInfo.proxyMatch){
			//return this.proxy + odataURL.substring(odataURL.indexOf(this.odataHost));
			var re = new RegExp(this.sourceInfo.proxyMatch.odataUrl, "i");
			return odataURL.replace(re, this.sourceInfo.proxyMatch.proxyUrl);
		}
		return odataURL;
	};
	
	this.createBatchDatas = function(items) {
		var i, j;
		var changeRequests = [];
		for(i = 0; i < items.length; i++){
			var item = items[i];
			var rowFormat = item[-1];
			if(rowFormat && rowFormat.mflag){
				var request = {};
				if(rowFormat.mflag === $SL.Data.Write.CREATE){
					//create a new row
					request.header = {"Content-Type": "application/json"};
					request.requestUri = this.urlWithProxy(this.entityURL);
					request.method = "POST";
					request.data = newData(this.model, item);
					changeRequests.push(request);
				}else if(rowFormat.rowid && rowFormat.mflag === $SL.Data.Write.UPDATE){
					request.header = {"Content-Type": "application/json"};
					request.requestUri = this.urlWithProxy(rowFormat.rowid);
					request.method = "MERGE";
					request.data = newData(this.model, item);
					changeRequests.push(request);
				}
				else if(rowFormat.rowid && rowFormat.mflag === $SL.Data.Write.DELETE){
					request.requestUri = this.urlWithProxy(rowFormat.rowid);
					request.method = "DELETE";
					changeRequests.push(request);
				}
			}
		}
		
		var changes = {};
		changes.__changeRequests = changeRequests;
		
		var batchDatas = {};
		batchDatas.__batchRequests = [];
		batchDatas.__batchRequests.push(changes);
		
		return batchDatas;
	};
	/*
	this.parseCSV = function(text) {
		function getRowData(line){
			//trim space
			var linePos = 0;
			var index, item;
			line = line.replace(/^\s+|\s+$/g,'');
			while(linePos < line.length){
				if (line.charAt(linePos) == "\"") {
					//quote value
					index = line.indexOf("\"", linePos + 1);
					if (index === -1) {
						//wrong format, anyway use it
						item = line.substring(linePos, line.length);
					} else {
						item = line.substring(linePos + 1, index);
					}
					linePos = index + 2;
				}
				else {
				
				}
			}
		}
		
		text = text.replace(/\r\n/g,'\n')
		var rows = text.split("\n");
		var i;
		for (i = 0; i < rows.length; i++){
			var row = rows[i];
			if(this.sourceInfo.headerRow && i === 0){
				
			}
			
		}
	};
	*/
	this.createXHR = function() {
		var xmlHttp;
		// Create xmlHttp Object
		try {
			// Firefox, Opera 8.0+, Safari
			xmlHttp = new XMLHttpRequest();
		} catch (e) {
			try {
				// Internet Explorer
				xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e2) {
				return undefined;
			}
		}

		return xmlHttp;
	};
	
	this.parseData = function(text) {
		if(this.sourceInfo.fileType === $SL.Data.FileType.JSON) {
			return JSON["parse"](text);
		}
		
		if(this.sourceInfo.fileType === $SL.Data.FileType.XML) {
			var parser = new DOMParser();
			var xmlNode = parser.parseFromString(text, "text/xml");
			if(xmlNode.nodeType === 9) {
				//get root node
				xmlNode = xmlNode.firstChild;
			}	
			return xmlToJson(xmlNode);
		}
	};
	
	this.writable = function(){
		return this.model.updatable;
	};
	
	this.read = function(context, parameters, success, error, start, rows) {
		if(!this.sourceInfo.url) {
			return;
		}
		
		if(!this.formattedURL) {
			this.formattedURL = this.sourceInfo.url;
		}
		
		if(this.model.pathInfo.length === 0){
			this.model.setDataInfo();
		}
		if(parameters && parameters.length > 0) {
			var fParameters = [];
			
			var i;
			for(i = 0; i < parameters.length; i++) {
				fParameters.push(formatArgument(parameters[i]));
			}
			this.formattedURL = formatURLWithParameters(this.sourceInfo.url, fParameters);
		}
		
		var thisObj = this;
		if(this.sourceInfo.type === $SL.Data.SourceType.ODATA) {
			//check source result set number
			if(!this.model.updatable && this.model.pathInfo.length === 1){
				this.model.updatable = true;
			}
			
			var urlWithRows = this.formattedURL;
			if(this.sourceInfo.limitedRows) {
				//for retrieve as needed
				this.moreData = true;
				//default setting for reading data
				this.start = 1;
				this.rows = 50;
				
				if(start && start > 1) {
					this.start = start;
				}
				
				if(rows && rows > 0) {
					this.rows = rows;
				}
				
				var skip = 0;
				if(this.start > 1) {
					skip = this.start - 1;
				}
				if (this.formattedURL.indexOf("?") === -1) {
					this.formattedURL += "?";
				} 
				urlWithRows = this.formattedURL + formatRows(this.rows,skip);
			}
			
			if(!this.odata) {
				this.odata = new SAP.DataSources.Odata(this.sourceInfo.enableJsonpCallback, this.sourceInfo.user, this.sourceInfo.password);
			}
			
			this.odata.read(urlWithRows, 
					function(data) {
						$SL.Data.getColumnData(data, thisObj);
						if(thisObj.sourceInfo.limitedRows) {
							if(thisObj.model.data.length < thisObj.rows) {
								thisObj.moreData = false;
							}
						}
						if(success) {
							success(thisObj.model.data, context);
						}
					},
					function(err) {
						if(error) {
							error(err.message, context);
						}
					});
		}
		else if(this.sourceInfo.type === $SL.Data.SourceType.FILE) {
			var xhr = this.createXHR();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {// 4: The Request is complete
					if (xhr.status == 200 || xhr.status == 304 || xhr.status == 0) {
						$SL.Data.getColumnData(thisObj.parseData(xhr.responseText), thisObj, true);
						if(success) {
							success(thisObj.model.data, context);
						}
					} else {
						error("Failed to load " + thisObj.formattedURL, context);
					}
				}
			};
			// Request
			xhr.open("GET", this.formattedURL, true);
			xhr.send(null);
		}
	};
	
	this.next = function(context, success, error, start, rows) {
		if(this.sourceInfo.type === $SL.Data.SourceType.ODATA) {
			if(rows && rows > 0) {
				this.rows = rows;
			}
			
			if(start && start > 1) {
				this.start = start;
			}
			else {
				this.start = this.start + this.rows;
			}
			
			var skip = 0;
			if(this.start > 1) {
				skip = this.start - 1;
			}
			
			var urlWithRows = this.formattedURL;
			if(this.sourceInfo.limitedRows) {
				urlWithRows = this.formattedURL + formatRows(this.rows,skip);
			}
			
			var thisObj = this;
			this.odata.read(urlWithRows, 
				function(data) {
					$SL.Data.getColumnData(data, thisObj);
					
					if(thisObj.sourceInfo.limitedRows) {
						if(thisObj.model.data.length < thisObj.rows) {
							thisObj.moreData = false;
						}
					}
			
					if(success) {
						success(thisObj.model.data, context);
					}
				},
				function(err) {
					if(error) {
						error(err.message, context);
					}
				});
		}
	};
	
	this.readIDEFileData = function(context, success, error) {
		var thisObj = this;
		SAP["DataSources"]["getData3"](this.sourceInfo.url, 
				function(data) {
					$SL.Data.getColumnData(data, thisObj);
					if(success) {
						success(thisObj.model.data, context);
					}
				}, 
				function(err) {
					if(error) {
						error(err.message, context);
					}
				});
	};
	
	this.update = function(context, datas, success, error) {
		this.odata.update(this.urlWithProxy(this.rootURL)+"/$batch", this.createBatchDatas(datas),
					function(data){
						if(success) {
							success(context);
						}
					},
					function(err){
						if(error) {
							error(err.message, context);
						}
					}
		);
	};
};
