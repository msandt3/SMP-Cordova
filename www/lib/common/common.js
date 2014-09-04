Product_Key = "AppBuilder";

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

if (typeof(SAP) == 'undefined') SAP = {};

SAP.DataSourceAPI={
	setLogonApplicationContext: function (smpLogonApplicationContext) {
		SAP.SMP.smpApplicationContext = smpLogonApplicationContext;
		var url = SAP.SMP.smpApplicationContext.applicationEndpointURL;
		if(url.endsWith("/")){
			url = url.substring(0, url.length - 1);
			SAP.SMP.smpApplicationContext.applicationEndpointURL = url;
		}

		SAP.SMP.smpUseLogonManager = true;
		SAP.SMP.getSMPProfileFromLogonMan();		
	},	
	setDataSourceInfo:function(dataSourceName,user,password,url){
	    var meta=SAP.DataSources.getDataSourceMeta(dataSourceName);
	    if(meta)
	    {
	        if(user!=undefined)meta.userName=user;
	        if(password!=undefined)meta.password=password;
	        if(url!=undefined)
	        {
	            if(meta.entityUrl && meta.entityUrl.indexOf(meta.rootURL)==0)
	                meta.entityUrl=url+meta.entityUrl.substring(meta.rootURL.length,meta.entityUrl.length);
	            else if(meta.entityUrl)
	            {
	                meta.entityUrl=null;
	            }
	            meta.rootURL=url;
	        }
	    }
	    else{
	        throw { message: "Can't find the specified datasource!" };
	    }
	},
	setSMPServerProfile: function(SMPServer,SMPApplicationID,SMPApplicationTag,allowAnonymous,user,password, connectionID) {
	    var serverInfo = SAP.SMP.getSMPServerProfile();
	    if (!serverInfo)
	    {
			console.log("SMP setting is wrong.");
	        //throw { message: "There isn't SMP server setting!"};
	    }
		if (user != undefined) {
			serverInfo.UserName=user;
		}
		if (password != undefined) {
			serverInfo.Password=password;
		}
	
		//smp connection info
	    var changed = false;
	    var oldServer = serverInfo.SMPServer;
		var oldAppId = serverInfo.SMPApplicationID;
		if (SMPServer != undefined) {
	        changed=true;
	        serverInfo.SMPServer=SMPServer;
	    }
		if (SMPApplicationID != undefined) {
	        changed=true;
	        serverInfo.SMPApplicationID=SMPApplicationID;
	    }
		if (SMPApplicationTag!=undefined) {
			 serverInfo.SMPApplicationTag=SMPApplicationTag;
		}
		if (allowAnonymous!=undefined) {
			serverInfo.AllowAnonymous=allowAnonymous;
		}
	    if (changed && SAP.SMP.ds && SAP.SMP.ds.SMPOData) {
	        var oldPrefix=oldServer+"/"+oldAppId;
	        var newPrefix=serverInfo.SMPServer+"/"+serverInfo.SMPApplicationID;
			for (var i = 0; i < SAP.SMP.ds.SMPOData.length; i++) {
			 
	            var ind=SAP.SMP.ds.SMPOData[i].rootURL.indexOf(oldPrefix);
				if(ind===0) {
	                SAP.SMP.ds.SMPOData[i].rootURL=newPrefix+SAP.SMP.ds.SMPOData[i].rootURL.substring(oldPrefix.length,SAP.SMP.ds.SMPOData[i].rootURL.length);
				}
			
				if(SAP.SMP.ds.SMPOData[i].entityUrl) {
	                ind=SAP.SMP.ds.SMPOData[i].entityUrl.indexOf(oldPrefix);
	                if(ind===0) {
	                    SAP.SMP.ds.SMPOData[i].entityUrl=newPrefix+SAP.SMP.ds.SMPOData[i].entityUrl.substring(oldPrefix.length,SAP.SMP.ds.SMPOData[i].entityUrl.length);
					}
				}
			}

		}
		//clean appconnection id
		if (connectionID) {
			SAP.SMP.ds.AppCid = connectionID;
		}
		else {
			SAP.SMP.ds.AppCid = "";
		}
	},
	encryptPassword:function(password){
	    return sjcl.encrypt(Product_Key, password);	
	},
	decryptPassword:function(password){
	    return sjcl.decrypt(Product_Key, password);	
	}
};

SAP.SMP = {
	smpApplicationContext: null,
	smpUseLogonManager: false,
	
	//use logonMan if logon manager app context was set
	isUsingLogonMan: function() {
		if ( ( SAP.SMP.smpApplicationContext != undefined ) && ( SAP.SMP.smpApplicationContext != null ) ) {
            return true;
		}
		return SAP.SMP.smpUseLogonManager;
	},
	useSMPDataSource: function() {
		//check the SMP url 
		var smpURL = SAP.SMP.ds.ServerProfile["SMPServer"] || undefined;
		if ((smpURL == undefined) || (smp == "")) {
			return false
		}
		else {
			return true; 
		}
	},
	getSMPProfileFromLogonMan: function() {
		if (SAP.SMP.smpApplicationContext ) { 
			var server = "";
			var id = "";			
			var  allowAnonymous= false;
			
			if (SAP.SMP.smpApplicationContext.registrationContext.user == undefined || (SAP.SMP.smpApplicationContext.registrationContext.user == null)|| (SAP.SMP.smpApplicationContext.registrationContext.user == "") ) {
				allowAnonymous = true;
			}
			
			//get Server and AppID from the URL 
			var url = SAP.SMP.smpApplicationContext.applicationEndpointURL;
			var index = url.lastIndexOf("/");
			if (index == url.length - 1) { // Remove the trailing '/' at the end if there's one
				url = url.substring(0, index - 1);
				index = url.lastIndexOf("/");
			}
			if (index != -1) {
				server = url.substring(0, index);
				id = url.substring(index+1);
			}
			else {
				server = url;
				id = undefined;
			}
			
			SAP.DataSourceAPI.setSMPServerProfile(server, 
										id, 
										"",
										allowAnonymous,
										SAP.SMP.smpApplicationContext.registrationContext.user,
										SAP.SMP.smpApplicationContext.registrationContext.password,
										SAP.SMP.smpApplicationContext.applicationConnectionId
										);
			if(typeof(Storage) !== "undefined"){
				localStorage[id + url] = SAP.SMP.smpApplicationContext.applicationConnectionId;
			}
		}
		else {
			SAP.DataSourceAPI.setSMPServerProfile("", 
										SAP.SMP.ds.ServerProfile["SMPApplicationID"], 
										"",
										true,
										"",
										"",
										""
										);
		}
	},
	onBoarding: function(rootURL, appID, appTag, allowAnonymous, username, password, deviceType, sucess_callback, error_callback) {
		var auth = "Basic "+btoa(username + ":" + password);
		var onBoardURL = rootURL + "/odata/applications/latest/" + appID + "/Connections";
		var sendData;
		
		if(deviceType){
			sendData = deviceType;
		}else{
			sendData = {DeviceType:'iPhone'};
		}
		//OnBoarding request
		//"NewFlightSC"
		var myHeader = {"X-SUP-SC":appTag, "Authorization":auth};
		if (allowAnonymous) {
			myHeader = {"X-SUP-SC":appTag};
		}
		
		var request = {
				headers:myHeader,
				requestUri:onBoardURL,
				method:"POST",
				data:sendData
			};
	  //OnBoarding request send to SMP Cloud
	  var sdo = new SAP.DataSources.Odata();
	  sdo.request(request,
	       /* OnBoarding Success handler */
	       function(data){
				var appCid = data.ApplicationConnectionId;
				if(typeof(Storage) !== "undefined"){
					localStorage[appID + rootURL] = appCid;
				}
				if (sucess_callback) {
					sucess_callback(appCid);
				}
			},
			/* OnBoarding Failue handler */
			function(err){
				var txt = JSON.stringify(err);
				if (error_callback) {
					error_callback(txt);
				}
			});
	},
	
	getServiceDocument: function(rootURL, appID, appTag, allowAnonymous, username, password, appCid, success_callback, error_callback) {
			
			/*URL for Service Document */
			var SDUrl = rootURL + "/" + appID;
			var auth = "Basic " + btoa(username + ":" + password);
			
			/* SD Request Format */
			//"NewFlightSC"
			var myHeader = {"X-SUP-SC":appTag,
				         "Authorization":auth,
				         "X-SUP-APPCID":appCid};
			if (allowAnonymous) {
				myHeader = {"X-SUP-SC":appTag,
				         "X-SUP-APPCID":appCid};
			}
			
			var request = {
				headers:myHeader,
				requestUri:SDUrl,
				method:"GET"
				
			};
	
	  /* SD Request fired to SMP Cloud */
	  var sdo = new SAP.DataSources.Odata();
	  sdo.request(request,
	        /* SD Response Success Handler */
	        function(data){
				//alert("Service Document success");
				if (success_callback) {
					success_callback(data);
				}
				
			},
			/* SD Response Failure handler */
			function(err){
				var txt = JSON.stringify(err);
				if (error_callback) {
					error_callback(txt);
				}
				
			});
	},
	
	getCollectionData: function(rootURL, appID, appTag, allowAnonymous, username, password, appCid, collectionName, url, params, success_callback, error_callback) {
			
			/*URL for collection data */
			var dataUrl = rootURL + "/" + appID + "/" + collectionName;
			if ((url != undefined) && (url != "") ) {
				dataUrl = url;
			}
			
			dataUrl = SAP.DataSources.makeUrl(dataUrl, params, true);
			
			
			var auth = "Basic " + btoa(username + ":" + password);
			
			/* SD Request Format */
			//"NewFlightSC"
			var myHeader = {"X-SUP-SC":appTag,
							"Authorization":auth,
							"X-SUP-APPCID":appCid};
			if (allowAnonymous) {
				myHeader = {"X-SUP-SC":appTag,
							"X-SUP-APPCID":appCid};
			}
			
			//harcode
			if (appID == "MAKitTest") {
				myHeader = {"X-SUP-SC":"MAKitSC",
				         "Authorization":auth,
				         "X-SUP-APPCID":appCid};
			}
			//end
			
			var request = {
				headers:myHeader,
				requestUri:dataUrl,
				method:"GET"
				
			};

	var sdo = new SAP.DataSources.Odata();
	var handler = undefined;
	if (appID == "MAKitTest") {
		handler = sdo.myHandler;
	}
	
	  /* data Request fired to SMP Cloud */
	  sdo.request(request,
			function(data){
				if (success_callback) {
					success_callback(data);
				}
			},
			function(err){
				var txt = JSON.stringify(err);
				if (error_callback) {
					error_callback(txt);
				}
			},
			handler);
	},
	//
	getSMPMeta: function(dsName) {
		if (SAP.SMP.ds) {
			for (var i = 0; i < SAP.SMP.ds.SMPOData.length; i++) {
				if (SAP.SMP.ds.SMPOData[i].name === dsName) {
					return SAP.SMP.ds.SMPOData[i];
				}
			}
			var name = dsName.split("."); 
			for (var i = 0; i < SAP.SMP.ds.SMPOData.length; i++) {
				if (SAP.SMP.ds.SMPOData[i].name === name[0]) {
					return SAP.SMP.ds.SMPOData[i];
				}
			}
		}
		
		return null;
	},	
	getSMPServerProfile: function() {
		if (SAP.SMP.ds) {
			return SAP.SMP.ds.ServerProfile;
		}
		return null;
	},		
	
	getSMPAppCid: function(appid, server){
		if (!SAP.SMP.ds.AppCid || SAP.SMP.ds.AppCid == ""){
			if(typeof(Storage)!=="undefined"){
				if(localStorage[appid+server]){
					SAP.SMP.ds.AppCid = localStorage[appid+server];
				}
			}
		}else{
			if(typeof(Storage)!=="undefined"){
				if(!localStorage[appid+server]){
					localStorage[appid+server] = SAP.SMP.ds.AppCid;
				}else if(localStorage[appid+server] != SAP.SMP.ds.AppCid){
					localStorage[appid+server] = SAP.SMP.ds.AppCid;
				}
			}
		}
	},
	
	getSMPAppCidAndRead: function(rootURL, connection, success, error) {
		var serviceURL;
		var appID;
		var appTag;
		var allowAnonymous;
		var username;
		var password;
		var deviceType;
		
		if(connection){
			allowAnonymous = connection["getAnonymous"]();
			deviceType = connection["getDeviceType"]();
			username = connection["getUser"]();
			password = connection["getPwd"]();
			serviceURL = connection["getServer"]();
			appID = connection["getAppid"]();
			appTag = connection["getApptag"]();
		}else{
			serviceURL = SAP.SMP.ds.ServerProfile["SMPServer"];
			appID = SAP.SMP.ds.ServerProfile["SMPApplicationID"];
			appTag = SAP.SMP.ds.ServerProfile["SMPApplicationTag"];
			allowAnonymous = SAP.SMP.ds.ServerProfile["AllowAnonymous"];
			username = SAP.SMP.ds.ServerProfile["UserName"];
			password = SAP.SMP.ds.ServerProfile["Password"];
		}
		if (SAP.SMP.isUsingLogonMan() == true) {
			SAP.SMP.getSMPProfileFromLogonMan();
			
			//using logon manager will not use any connection info from users at runtime.
			//now read data
			SAP.SMP.getSMPData(rootURL, null,
				function(data, response) {
					if (success) {
						success(data, response);
					}
				},
				function(err) {
					if (error) {
						error(err);
					}
				});
		}
		else {
		  SAP.SMP.onBoarding(serviceURL, appID, appTag, allowAnonymous, username, password, deviceType,
			function(appCid) {
				SAP.SMP.ds.AppCid = appCid;
				//now read data
				SAP.SMP.getSMPData(rootURL, connection,
					function(data, response) {
						if (success) {
							success(data, response);
						}
					},
					function(err) {
						if (error) {
							error(err);
						}
					});
			},
			function (msg) {
				if (error) {
					error(msg);
				}
			}
		  );
		}
	},		
    getSMPDataByDSName:function(dsName,paramValues,connection,okCallback,errorCallback){
        var dataSourceMeta=SAP.DataSources.getDataSourceMeta(dsName);
        if (dataSourceMeta) {

			var url = SAP.DataSources.makeUrl(dataSourceMeta.rootURL, paramValues,undefined,
                        SAP.DataSources.isODataDataSource(dsName)?start:undefined,SAP.DataSources.isODataDataSource(dsName)?rows:undefined);
			var that=this;
			SAP.SMP.getSMPData(url, undefined,
				function(data, response) {
					if (okCallback) {
                        var nodes=SAP.DataSources.getColumnsPartFromDataSource(dsName);
						var result = data;
						if (nodes.length > 0) {
							result = eval("data." + nodes.join("."));
						}
                        SAP.DataSources.TransformResultSet(dataSourceMeta,nodes,result);
						okCallback(result);
					}
				}, errorCallback);
		}
        else{
            var error={};
            error.message="Can not find datasource metadata";
            if(errorCallback)
                errorCallback(error);
        }
    },
	getSMPData: function(dataUrl, connection, success, error) {
		var username;
		var password;
		var smpServerUrl;
		var smpApplicationID;
		var smpApplicationTag;
		
		if(connection){
			username = connection["getUser"]();
			password = connection["getPwd"]();
			smpServerUrl = connection["getServer"]();
			smpApplicationID = connection["getAppid"]();
			smpApplicationTag = connection["getApptag"]();
		}else{
			username = SAP.SMP.ds.ServerProfile["UserName"];
			password = SAP.SMP.ds.ServerProfile["Password"];
			smpServerUrl = SAP.SMP.ds.ServerProfile["SMPServer"];
			smpApplicationID = SAP.SMP.ds.ServerProfile["SMPApplicationID"];
			smpApplicationTag = SAP.SMP.ds.ServerProfile["SMPApplicationTag"];
		}
		
		var unCredentials = SAP.SMP.ds.ServerProfile["NONXHRCredentials"];
		
		if (SAP.SMP.isUsingLogonMan() == true) {
			SAP.SMP.getSMPProfileFromLogonMan();
			username = SAP.SMP.ds.ServerProfile["UserName"];
			password = SAP.SMP.ds.ServerProfile["Password"];
			smpServerUrl = SAP.SMP.ds.ServerProfile["SMPServer"];
			smpApplicationID = SAP.SMP.ds.ServerProfile["SMPApplicationID"];
			smpApplicationTag = SAP.SMP.ds.ServerProfile["SMPApplicationTag"];
		}
		var appCId = SAP.SMP.ds.AppCid;
		var auth = "Basic " + btoa(username + ":" + password);
		var request = {
			headers:{"Authorization":auth,
			         "X-SUP-SC":smpApplicationTag,
			         "X-SUP-APPCID":appCId,
					 "X-CSRF-TOKEN": "Fetch"},
			requestUri:dataUrl,
			method:"GET"
				
		};
		
		var sdo = new SAP.DataSources.Odata();
		var myClient;
		if(!unCredentials){
			myClient = sdo.myClient;
		}
		sdo.request(request,function(data, response){		
				success(data, response);
			},
			function(err){
				error(err);
			}, undefined, myClient);

	},
connecton: null,	
fetchToknAndUpdateSMPData: function(dataUrl, connection, action, adata, success, error) {
		var username;
		var password;
		var smpServerUrl;
		var smpApplicationID;
		var smpApplicationTag;
		
		if(connection){
			this.connection = connection;
			username = connection["getUser"]();
			password = connection["getPwd"]();
			smpServerUrl = connection["getServer"]();
			smpApplicationID = connection["getAppid"]();
			smpApplicationTag = connection["getApptag"]();
		}else{
			this.connection = {};
			
			username = SAP.SMP.ds.ServerProfile["UserName"];
			this.conenction.username = username;
			
			password = SAP.SMP.ds.ServerProfile["Password"];
			this.conenction.password = password;
			
			smpServerUrl = SAP.SMP.ds.ServerProfile["SMPServer"];
			this.conenction.smpServerUrl = smpServerUrl;
			
			smpApplicationID = SAP.SMP.ds.ServerProfile["SMPApplicationID"];
			this.conenction.smpApplicationID = smpApplicationID;
			
			smpApplicationTag = SAP.SMP.ds.ServerProfile["SMPApplicationTag"];
			this.conenction.smpApplicationTag = smpApplicationTag;
			
		}
		//fetch the token
		var appCId = SAP.SMP.ds.AppCid;
		var auth = "Basic " + btoa(username + ":" + password);
		var request = {
			headers:{"Authorization":auth,
			         "X-SUP-SC":smpApplicationTag,
			         "X-SUP-APPCID":appCId,
					 "Content-Type": "application/json"},
			requestUri:dataUrl,
			method:action,
			data: adata
		};
		var sdo = new SAP.DataSources.Odata();
		sdo.request(request,
			function(data, response){
				//got the token
				var token = response.headers[0].x-xsrf-token;
				
				var auth = "Basic " + btoa(this.conenction.username + ":" + this.conenction.password);
				var request = {
					headers:{"Authorization":auth,
					         "X-SUP-SC":this.conenction.smpApplicationTag,
					         "X-SUP-APPCID":SAP.SMP.ds.AppCid,
							 "Content-Type": "application/json",
						 	 "X-CSRF-TOKEN":token },
					requestUri:dataUrl,
					method:action,
					data: adata
				};
				var sdo = new SAP.DataSources.Odata();
				sdo.request(request,
					function(data){
						if (success) {		
							success(data);
						}
					},
					function(err){
						if (error) {
							error(err);
						}
					}
				);
			
				//
				//if (success){
				//	success(data);
				//}
			},
			function(err){
				//failed to ge the token, try update without token
				
				var auth = "Basic " + btoa(this.conenction.username + ":" + this.conenction.password);
				var request = {
					headers:{"Authorization":auth,
					         "X-SUP-SC":this.conenction.smpApplicationTag,
					         "X-SUP-APPCID":SAP.SMP.ds.AppCid,
							 "Content-Type": "application/json"
						 		},
					requestUri:dataUrl,
					method:action,
					data: adata
				};
				var sdo = new SAP.DataSources.Odata();
				sdo.request(request,
					function(data){	
						if (success) {	
							success(data);
						}
					},
					function(err){
						if (error) {
							error(err);
						}
					}
				);
			
				//
				//if (success){
				//	success(data);
				//}
				
			}
		);

	},
	updateSMPData: function(dataUrl, connection, action, adata, token, success, error){
		var username;
		var password;
		var smpServerUrl;
		var smpApplicationID;
		var smpApplicationTag;
		
		if(connection){
			username = connection["getUser"]();
			password = connection["getPwd"]();
			smpServerUrl = connection["getServer"]();
			smpApplicationID = connection["getAppid"]();
			smpApplicationTag = connection["getApptag"]();
		}else{
			username = SAP.SMP.ds.ServerProfile["UserName"];
			password = SAP.SMP.ds.ServerProfile["Password"];
			smpServerUrl = SAP.SMP.ds.ServerProfile["SMPServer"];
			smpApplicationID = SAP.SMP.ds.ServerProfile["SMPApplicationID"];
			smpApplicationTag = SAP.SMP.ds.ServerProfile["SMPApplicationTag"];
		}
		
		var unCredentials = SAP.SMP.ds.ServerProfile["NONXHRCredentials"];
		
		//this.fetchToknAndUpdateSMPData(dataUrl, connection, action, adata, success, error);
		var appCId = SAP.SMP.ds.AppCid;
		var auth = "Basic " + btoa(username + ":" + password);
		var request = {
			headers:{"Authorization":auth,
			         "X-SUP-SC":smpApplicationTag,
			         "X-SUP-APPCID":appCId,
					 "Content-Type": "application/json",
					 "X-CSRF-TOKEN": token},
			requestUri:dataUrl,
			method:action,
			data: adata
		};
		var sdo = new SAP.DataSources.Odata();
		var myClient;
		if(!unCredentials){
			myClient = sdo.myClient;
		}
		sdo.updateRequest(request,function(data){		
				success(data);
			},
			function(err){
				error(err);
			}, myClient);
	}
};

//utils
SAP.Util = {

	/**
	* Determine whether the file loaded from PhoneGap or not
	*/
	isPhoneGap: function() {
        var isphone=/^file:\/{3}[^\/]/i.test(window.location.href) && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
        if(isphone)
        {
            return true;
        }
        else{
            return false;
        }
	},
	/**
	* Determine if the app is running in AppBuier IDE
	*/
	isRunningInIDE: function() {
		return false;
	},
	
	isRelativePath: function (s) {
		s = SAP.Util.trimString(s);
		
		return s.charAt(0) != "#"
		 && s.charAt(0) != "/"
		 && (s.indexOf("//") == -1
			 || (s.indexOf("#") != -1 && s.indexOf("//") > s.indexOf("#"))
			 || (s.indexOf("?") != -1 && s.indexOf("//") > s.indexOf("?")));
	},
	getPathByProject: function (path) {
		if (window.projectInfo) {
			if (path.indexOf(window.projectInfo.name + "/") == 0) {
				return path.replace(window.projectInfo.name + "/", "");
			}
		}

		return path;
	},
	loadFileByProject: function(path, okCallback, errorCallback, proxy) {
		var file = SAP.Util.getRealPathByProject(path, window.fileService);
		if (window.fileService) { //design time
			if (file == path) { //already full url in design time 
				window.fileService.getFileByUrl(file)		
					.response(this, function(inEvent, inData) {
						if (inData.content) {
							inData = inData.content;
						} else if (typeof(inData) != "string") {
							// no data? Empty file
							inData = "";
						}
						
						if (proxy) {
							okCallback.call(proxy, inData);
						}
						else {
							okCallback(inData);
						}
					})
					.error(this, function(inEvent, inData) {
						if (errorCallback) {
							if (proxy) {
								errorCallback.call(proxy, inData);
							}
							else {
								errorCallback(inData);
							}
						}
					});
			} else {
				window.fileService.getFile(file)
					.response(this, function(inEvent, inData) {
						if (inData.content) {
							inData = inData.content;
						} else if (typeof(inData) != "string") {
							// no data? Empty file
							inData = "";
						}
						
						if (proxy) {
							okCallback.call(proxy, inData);
						}
						else {
							okCallback(inData);
						}
					})
					.error(this, function(inEvent, inData) {
						if (errorCallback) {
							if (proxy) {
								errorCallback.call(proxy, inData);
							}
							else {
								errorCallback(inData);
							}
						}
					});
			}
		} else { //runtime
			var inData = SAP.Util.loadFromURL(file);
			if (okCallback) {
				if (proxy) {
					okCallback.call(proxy, inData);
				}
				else {
					okCallback(inData);
				}
			}
		}
	},
	getRealPathByProject: function(path, designTime) {
		if (designTime && window.projectInfo) { //design time
			if (path.toLowerCase().indexOf("http://") === 0 || path.toLowerCase().indexOf("https://") === 0) {
				return path;
			} else {
				return window.projectInfo.name + "/src/" + path;
			}
		} else { //runtime
			return path;
		}
	},
	getProjectPathUrl: function(path) {
		var url = SAP.Util.getRealPathByProject(path, window.fileService);

		//design time
		if (window.fileService) {
			url = window.fileService.makeUrl("getbin", url);
		}
		
		return url;
	},
	trimString: function(str) {
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	},
	isStringNullOrEmpty: function (str) {
		if (str) {
			return SAP.Util.trimString(str) === "";
		} else {
			return true;
		}
	},
	formatString: function() {
		var args = arguments;
		return args[0].replace(/{(\d+)}/g, function(match, number) { 
			return typeof args[parseInt(number) + 1] != 'undefined' ? args[parseInt(number) + 1]: match;
		});
	},
	replaceArgs: function() { // replace all args like {?}
		var args = arguments;
		var i = 1;

		return args[0].replace(/\x7b\x3f\x7d/g, function(match) { 
			var result = typeof args[i] != 'undefined' ? args[i]: match;
			i++;
			return result;
		});
	},
	createXHR: function () {
		var xmlHttp;
		// Create xmlHttp Object
		try {
			// Firefox, Opera 8.0+, Safari
			xmlHttp = new XMLHttpRequest();
		} catch (e) {
			try {
				// Internet Explorer
				xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				return null;
			}
		}
		
		return xmlHttp;
	},
	loadFromURL: function (url) {
		var xhr = SAP.Util.createXHR();
		if (!xhr) {
			return "";
		}

		xhr.open("GET", url, false);
		xhr.send(null);

		if (xhr.status == 200 || xhr.status == 304 || xhr.status == 0) {
			return xhr.responseText;
		} else {
			console.log("Failed to load " + url);
			return "";
		}
	},
	loadXMLFromString: function(metaXML) {
		var xmlDoc = null;

		if (window.ActiveXObject) { //code for IE
			var parser = new ActiveXObject("Microsoft.XMLDOM"); 
			parser.async = false;
			xmlDoc = parser.loadXML(metaXML);
		} else if (window.DOMParser) { //code for Chrome, Safari, Firefox, Opera, etc.
			var parser = new DOMParser();
			xmlDoc = parser.parseFromString(metaXML, "text/xml");
		}
		
		return xmlDoc;
	},
	XMLToString: function (xmlNode) {
		if (window.ActiveXObject) {
			return xmlNode.xml;
		} else {
			return (new XMLSerializer()).serializeToString(xmlNode);
		}
	},
	getOrigin: function () {
		return document.location.origin ? document.location.origin :
						document.location.protocol + "//" + document.location.host;
	},
	isArray: function (o) {  
		return Object.prototype.toString.call(o) === "[object Array]";
	},
    isSimpleArray:function(o){
        if(SAP.Util.isArray(o))
        {
            if( o.length>0 )
            {
                var baseType=SAP.Util.getTypeName(o[0]);
                if(baseType!=="object" &&  baseType!=="[]" )
                {// it is a simple array
                    return true;
                }
            }
        }
        return false;
    },
    getBaseType:function(o){
        if(SAP.Util.isArray(o))
        {
            if( o.length>0 )
            {
                return SAP.Util.getTypeName(o[0]);
            }
        }
        return "";
    },
	isDate: function (o) {
        return Object.prototype.toString.call(o) === "[object Date]";
    },
	isString: function(o) {
		return Object.prototype.toString.call(o) === "[object String]";  
	},
    isStringDateFormat:function(jsonDate){
        var isDate = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.test(jsonDate);
        if(isDate)
            return true;
        isDate= /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.test(jsonDate);
        if(isDate)
            return true;
        isDate= /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)/.test(jsonDate);
        if(isDate)
            return true;
        else 
            return false;
    },
    getCanonicalTimezone:function (timezone) {
        /// <summary>Gets the canonical timezone representation.</summary>
        /// <param name="timezone" type="String">Timezone representation.</param>
        /// <returns type="String">An 'Z' string if the timezone is absent or 0; the timezone otherwise.</returns>

        return (!timezone || timezone === "Z" || timezone === "+00:00" || timezone === "-00:00") ? "Z" : timezone;
    },
    parseInt10:function (value) {
        /// <summary>Parses a value in base 10.</summary>
        /// <param name="value" type="String">String value to parse.</param>
        /// <returns type="Number">The parsed value, NaN if not a valid value.</returns>

        return parseInt(value, 10);
    },
    parseDateTimeRE: /^(-?\d{4,})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?(?:\.(\d+))?(.*)$/,
    parseTimezone:function (timezone) {
        /// <summary>Parses a timezone description in (+|-)nn:nn format.</summary>
        /// <param name="timezone" type="String">Timezone offset.</param>
        /// <returns type="Object">
        /// An object with a (d)irection property of 1 for + and -1 for -,
        /// offset (h)ours and offset (m)inutes.
        /// </returns>

        var direction = timezone.substring(0, 1);
        direction = (direction === "+") ? 1 : -1;

        var offsetHours = SAP.Util.parseInt10(timezone.substring(1));
        var offsetMinutes = SAP.Util.parseInt10(timezone.substring(timezone.indexOf(":") + 1));
        return { d: direction, h: offsetHours, m: offsetMinutes };
    },
    parseDateTime: function (value) {
        /// <summary>Parses a string into a DateTime value.</summary>
        /// <param name="value" type="String">Value to parse.</param>
        /// <param name="withOffset" type="Boolean">Whether offset is expected.</param>
        /// <returns type="Date">The parsed value.</returns>

        // We cannot parse this in cases of failure to match or if offset information is specified.
        var parts = SAP.Util.parseDateTimeRE.exec(value);
        var offset = (parts) ? SAP.Util.getCanonicalTimezone(parts[8]) : null;
        var isOffset=true;
        if(!parts[8])isOffset=false;
        if (!parts ) {
            
                return null;

        }

        // Pre-parse years, account for year '0' being invalid in dateTime.
        var year = SAP.Util.parseInt10(parts[1]);
        if (year <= 0) {
            year++;
        }

        // Pre-parse optional milliseconds, fill in default. Fail if value is too precise.
        var ms = parts[7];
        var ns = 0;
        if (!ms) {
            ms = 0;
        } else {
            if (ms.length > 7) {
                    return null;

            }

            ns = SAP.Util.formatNumberWidth(ms.substring(3), 4, true);
            ms = SAP.Util.formatNumberWidth(ms.substring(0, 3), 3, true);

            ms = SAP.Util.parseInt10(ms);
            ns = SAP.Util.parseInt10(ns);
        }

        // Pre-parse other time components and offset them if necessary.
        var hours = SAP.Util.parseInt10(parts[4]);
        var minutes = SAP.Util.parseInt10(parts[5]);
    	// ##### BEGIN: MODIFIED BY SAP
        var seconds = SAP.Util.parseInt10(parts[6]) || 0;
    	// ##### END: MODIFIED BY SAP
        if (offset !== "Z") {
            // The offset is reversed to get back the UTC date, which is
            // what the API will eventually have.
            var timezone = SAP.Util.parseTimezone(offset);
            var direction = -(timezone.d);
            hours += timezone.h * direction;
            minutes += timezone.m * direction;
        }

        // Set the date and time separately with setFullYear, so years 0-99 aren't biased like in Date.UTC.
        var result = new Date();
        result.setUTCFullYear(
            year,                       // Year.
            SAP.Util.parseInt10(parts[2]) - 1,   // Month (zero-based for Date.UTC and setFullYear).
            SAP.Util.parseInt10(parts[3])        // Date.
            );
        result.setUTCHours(hours, minutes, seconds, ms);

        if (isNaN(result.valueOf())) {
                return null;

        }

        if (isOffset) {
            result.__edmType = "Edm.DateTimeOffset";
            result.__offset = offset;
        }

        if (ns) {
            result.__ns = ns;
        }

        return result;
    },
    getDateFromString:function(strData,isOData){
        var a;
        if (typeof strData === 'string') {

            if (SAP.Util.parseDateTimeRE.test(strData)) {
                  return SAP.Util.parseDateTime(strData);
            }
            if (/\/Date\((-?\d+)([+-]\d{4})?(\d{2})?.*/.test(strData)) {
                var parts= /\/Date\((-?\d+)([+-]\d{4})?(\d{2})?.*/.exec(strData);
                var result =new Date(parseInt(strData.replace('/Date(', '')));
                if (parts[2] && parts[2].length===5) { 
                    var hours=result.getUTCHours();
                    var minutes=result.getUTCMinutes();
                    var seconds=result.getUTCSeconds();
                    var ms=result.getUTCMilliseconds();
                    var offset=parts[2];                
                    var direction;
                    var sign=offset[0];
                    if(sign==='+')direction=-1;
                    else direction=1;
                    var hourOff;
                    var minutesOff;
                    if(isOData)
                    {
                        var tMinutes=parseInt(offset.substring(1,offset.length));
                        hourOff=Math.floor(tMinutes/60);
                        minutesOff=tMinutes-hourOff*60;  
                    }
                    else{
                        hourOff=parseInt(offset.substring(1,3));
                        minutesOff=parseInt(offset.substring(3,5));
                    }                
                    hours += hourOff * direction;
                    minutes += minutesOff * direction;
                    result.setUTCHours(hours, minutes, seconds,ms);  
                    result.__edmType = "Edm.DateTimeOffset";
                    result.__offset = sign+SAP.Util.formatNumberWidth(hourOff, 2)+":"+SAP.Util.formatNumberWidth(minutesOff, 2);                  
                }
                return result;
            }
            if(SAP.Util.isEdmDurationValue(strData)){
                return SAP.Util.parseDuration(strData);
            }
        }
        return strData;        
    },
	getTypeName: function(o) {
		if (SAP.Util.isArray(o)) {
			return "[]";
		} else {
            if(SAP.Util.isDate(o))return "datetime";
            else if(SAP.Util.isString(o))
            {
                if(SAP.Util.isStringDateFormat(o))
                    return "datetime";
                else if(SAP.Util.isEdmDurationValue(o))
                    return "datetime";
                else
                    return "string";
            }
			else return typeof(o);
		}
	},
	isMAKitType: function(typeName) {
		return typeName !== "[]" && typeName !== "object" && typeName !== "boolean";
	},
	executeMAQuery: function(chartObj, name, args) {
		var query;
		var zoomingLevels = chartObj.getNumberOfZoomingLevels();
		var chart = chartObj.getParent();
		if (name.toLowerCase().indexOf("datasource|") == 0) {
			query = name;
		} else if (chart.useMetaFile) {
			var makitChart = chart.parent;
			query = makitChart.makeQuery(name);
		} else {
			var chartElem = document.getElementById(chart.id);
			if (chartElem) {
				var elem = chartElem.parentNode;
				var drillDownGroup = $MA.DrillDownGroup.getDrillDownGroup(elem);
				if (drillDownGroup && drillDownGroup.useMetaFile) {
					query = drillDownGroup.parent.makeQuery(name);
				}
			}
		}
		
		if (query) {
			SAP.DataSources.executeDSQuery(query, args, zoomingLevels,
				function(data, dataSource) {
					SAP.Util.setMADataTable(chartObj, data, dataSource);
				},
				function(error) {
					console.log("executeDSQuery error: " + error.message);
				});
			return true;
		}

		return false;
	},
	getMAColumns: function(columns, colNamePrefix, keys){
		var colens = columns.length;
		for (var i = 0; i < colens; i++) {
			var colName = colNamePrefix == null ? columns[i].name : colNamePrefix + "." + columns[i].name;
			var colType = columns[i].type;
			if (SAP.Util.isMAKitType(colType)) {
				dataTable.addColumn(colName, colType);
				keys.push(columns[i].name);
			} else if (colType == "object" && columns[i].columns && columns[i].columns.length) {
				var newKeys = { columnName: columns[i].name, columnKeys : []};
				keys.push(newKeys);
				SAP.Util.getMAColumns(columns[i].columns, colName, newKeys.columnKeys);
			}
		}
	},
	
	getMAData: function(data, keys, rowData){
		for (var j = 0; j < keys.length; j++) {
			if (typeof keys[j] == "object") {
				SAP.Util.getMAData(data[keys[j].columnName], keys[j].columnKeys, rowData);
			}
			else {
				rowData.push(data[keys[j]]);
			}
		}
	},
	setMADataTable: function(chartObj, data, dataSource) {
	
		if (data && !SAP.Util.isArray(data) && typeof data == "object") {
			//convert it to an array
			var dataObj = data;
			data = [];
			data.push(dataObj);
		}
		
		if (data && SAP.Util.isArray(data) && data.length > 0) {
			dataTable = new $MA.DataTable();
			
			var keys = [];
			var columns = [];
			var meta = SAP.DataSources.getDataSourceMeta(dataSource);//SAP.DataSources.getDataSourceColumns4MAKit(dataSource);
			if (meta) {
                var columnpath = SAP.DataSources.getColumnsPartFromDataSource(dataSource);
                if (columnpath) {
                    meta = SAP.DataSources.getDataSourceColumnsMeta(meta, columnpath);
                }
                columns = meta.columns;
            }
			SAP.Util.getMAColumns(columns, null, keys);
			
			for (var i = 0; i < data.length; i++) {
				var rowData = [];
				SAP.Util.getMAData(data[i], keys, rowData);
				dataTable.addRow(rowData);
			}

			dataTable.refresh();
			chartObj.setDataTable(dataTable);
			chartObj.refresh();
		}
	},
	/*
	kind: 	target page's kind value;
	param:	parameter passed to the new page;
	return value:	if kind is null, undefined or "", or no ctor of kind, return undefined;
					else, return the target page object;
	(1)	Find the constructor based on kind value;
	(2) Create the target page object by invoking its constructor, and pass parameter to it;
	(3) Render the new page to document.body
	*/
	navigateTo: function(kind, param) {
		if(kind == null || kind == undefined || kind == "")
			return;

		var ctor = enyo.constructorForKind(kind);
		if(ctor == null || ctor == undefined)
			return;

		var target = new ctor(param).renderInto(document.body);
		return target;
	},
	styleTextToHash: function(style) {
		var hash = {};
		if(typeof style === "string") {
			var rules = style.replace(/; /g, ";").split(";");
			for (var i=0, s, n, v, rule; rule=rules[i]; i++) {
				s = rule.split(":");
				n = s.shift();
				v = s.join(':');
				hash[n] = v;
			}
		}
		return hash;
	},
	hashToStyleText: function(hash) {
		var n, v, style = '';
		for (n in hash) {
			v = hash[n];
			if ((v !== null) && (v !== undefined) && (v !== "")) {
				style +=  n + ':' + v + ';';
			}
		}
		return style;
	},
	traverse: function(view, callback, level) {
		var m = view.getMetadata();
		var aggs = m.getAllAggregations();
		if(level == undefined)
			level = 0;
		var finished = callback(view, level);
		level++;
		if( finished ) return true;
		for (var aggName in aggs) {
			//ignore internalHeader of page
			if( aggName == "customData" || aggName == "layoutData" || aggName == "tooltip")
				continue;
			if(aggs[aggName].visibility == "hidden")
				continue;
			var children = aggName=="headerContent" ? view.getHeaderContent() : view.getAggregation(aggName);
			if ( children instanceof Array) {
				for(cc in children) {
					var child = children[cc];
					if ( child instanceof sap.ui.core.Control ) {
						finished = this.traverse(child, callback, level);
						if( finished ) return true;
					}
					else continue;
				}
			}
			else if ( children instanceof sap.ui.core.Control ) {
				var child = children;
				var finished = this.traverse(child, callback, level);
				if( finished ) return true;
			}
			else continue;
		}
		return false;
	},
	
	getGetMethod: function(name) {
		return "get" + name.charAt(0).toUpperCase() + name.slice(1);
	},
	
	getSetMethod: function(name) {
		return "set" + name.charAt(0).toUpperCase() + name.slice(1);
	},
	toRunTimeURI: function(uri) {
		var proj = SAP.Util.getRealPathByProject("", window.fileService);
		var base = window.fileService.makeUrl("getbin", proj);
		if(uri && uri.length>0 && uri.indexOf(base) == 0 ){
			return uri.substr(base.length);
		}
		return uri;
	},
	toDesignTimeURI: function(uri) {
		if(!uri || uri.trim().length==0)
			return "";
		if (uri.indexOf("http://") == 0 || uri.indexOf("htts://") == 0) {
			//absolute url
			return uri;
		}
		var proj = SAP.Util.getRealPathByProject("", window.fileService);
		var base = window.fileService.makeUrl("getbin", proj);
		return base + uri;
	},
	
	htmlUnescape: function(str) {
		if(typeof str!="string") {
			return str;
		}
		return String(str).replace(/&quot;/g, "\"");
	},

	/*
	 * 1. add event delegate to all controls
	 * 2. set "controlName" customedata for each control with the value of its ID
	 * 3. generate and return the name list, by control type
	 */
	decorateView: function(view) {
		var controlList = {
			all: {},
			add: function(control) {
				var name = control.data("controlName");
				var type = control.getMetadata().getName();
				this.all[name] = control;
				if(this[type])
					this[type].push(control);
				else
					this[type] = [control];
			},
			remove: function(control) {
				var name = control.data("controlName");
				var type = control.getMetadata().getName();
				if(this[type]){
					var idx = this[type].indexOf(control);
					this[type].splice(idx, 1);
					delete this.all[name];
				}
			}
		};

		if (view instanceof sap.ui.core.mvc.View) {
			view = view.getContent()[0];
			if (view instanceof sap.m.App) {
				SAP.Util.applyTheme(view);
			}
		}
		var _this = this;
		SAP.Util.traverse(view, function(c,n) {
			c.addEventDelegate(_this);
			var id = c.getId();
			var name = id.indexOf("--") >=0 ? id.substr(id.indexOf("--") + 2) : id;
			var type = c.getMetadata ? c.getMetadata().getName() : "unknown";
			c.data("controlName", c.data("controlName") || name);
			controlList.add(c);
			var pp = c.getMetadata().getProperties();
			for (var p in pp) {
				var v = c[_this.getGetMethod(p)]();
				if (p == "dataSource") {
					c[_this.getSetMethod(p)](_this.htmlUnescape(unescape(v)));
				}
				if (window.fileService && pp[p].type == "sap.ui.core.URI" && p != "metadataFile") {
					v = _this.toDesignTimeURI(v);
					c[_this.getSetMethod(p)](v);
				}
			}
		});
		return controlList;
	},
	//runtime helper api
	setStyle: function(control, style) {
		if (control instanceof sap.ui.core.Control) {
			control.data("style", style);
			var h = SAP.Util.styleTextToHash(style);
			if (h.width && typeof control.setWidth == "function") {
				control.setWidth(h.width);
			}
			if (h.height && typeof control.setHeight == "function") {
				control.setHeight(h.height);
			}
		}
	},
	onBeforeRendering: function(oEvent) {
		var c = oEvent.srcControl;
		SAP.Util.applyCssFiles(c);
		SAP.Util.applyStyle(c);
		//SAP.Util.applyTheme(c);	
	},
	onAfterRendering: function(oEvent) {
		var c = oEvent.srcControl;
		var domRef = c.getDomRef();
		var h = SAP.Util.styleTextToHash(c._style);
		var controlType = c.getMetadata().getName();
		var parent = c.getParent();
		var parentType = parent.getMetadata().getName();
		var parentBox = parentType == "sap.m.FlexBox" ||
				parentType == "sap.m.VBox" ||
				parentType == "sap.m.HBox";
		var controlBox = controlType == "sap.m.FlexBox" ||
				controlType == "sap.m.VBox" ||
				controlType == "sap.m.HBox";				
		if (parentBox && !controlBox) {
			var horizontal = false;
			if (parent.getDirection() != "Column" && 
				parent.getDirection() != "ColumnReverse") {
				horizontal = true;
			}
			if (horizontal) {
				if(h.width) {
					domRef.parentNode.style.width= h.width;
					h.width = "100%";
				}
				else {
					domRef.parentNode.style.width= "";
				}
				if(h.height) {
					domRef.parentNode.style.height= h.height;
					h.height = "100%";
				}				 
			}
			else {
				if(h.height) {
					domRef.parentNode.style.height= h.height;
					h.height = "100%";
				}
				if (parent.getAlignItems() != "Stretch") {
 					if(h.width) {
 						domRef.parentNode.style.width= h.width;
 						h.width = "100%";
 					}				
 				}				
			}
			c._style = SAP.Util.hashToStyleText(h);
		}		
		if (domRef){
			domRef.style.cssText += c._style;
		}
		if (c instanceof sap.m.SegmentedButton) {
			//apply styles for SegmentedButton
			var aItems = c.getButtons(),
			aItemsLength = aItems.length;
			for (var i = 0; i < aItemsLength; i++) {
				var oItem = aItems[i];
				var oEvent = { "srcControl" : oItem };
				this.onBeforeRendering(oEvent);
				this.onAfterRendering(oEvent);
			}
		}
		var classes = c.data("classes");
		if(classes)
			c.addStyleClass(classes);
			
		//adjust control position, for design time only.
		if( c instanceof sap.m.Page || c instanceof sap.m.ScrollContainer ) {
			var id = c.getId() + "-scroll";
			var ele = document.getElementById(id);
			//var s = control.getScrollDelegate();
			if (ele) {
				if(!ele.style.position) {
					ele.style.position = "relative";
				}
				
				if (c instanceof sap.m.ScrollContainer){	
					if ((domRef.offsetWidth!=0)||(domRef.offsetHeight!=0)){
						if ((!ele.style.width) && (!ele.style.height)) {						
							var childSize=this.getChildrenSize(ele);			
							var childWidth=childSize.width;
							var childHeight=childSize.height;						
							
							childHeight=childHeight+8;//scrollbar adjustment
							childWidth=childWidth+8;//scrollbar adjustment
							
							var sWidth=Math.max(childWidth, domRef.offsetWidth);
							if (sWidth>8)
								ele.style.width = sWidth +"px";				
							
							var sHeight=Math.max(childHeight, domRef.offsetHeight);
							if (sHeight>8)
								ele.style.height =sHeight +"px";							
						}
					}
				} else if (c instanceof sap.m.Page){
					if ((domRef.offsetWidth!=0)||(domRef.offsetHeight!=0)){
						if ((!ele.style.width) && (!ele.style.height)) {						
							var childSize=this.getChildrenSize(ele);			
							var childWidth=childSize.width;
							var childHeight=childSize.height;						
							
							childHeight=childHeight+50;//titlebar adjustment
							
							var pWidth=Math.max(childWidth, domRef.offsetWidth);
							if (pWidth>0)
								ele.style.width =pWidth  +"px";				
							
							var pHeight=Math.max(childHeight, domRef.offsetHeight);
							if (pHeight>50)
								ele.style.height =pHeight +"px";	
					
						}			
					}
				}		
			}			
		}
	
	},
	
	getChildrenSize: function(parent){
		var w=0, h=0, left=0,top=0,right=0,bottom=0;
		var marginAdjustment=8; //width of scrollbar
		
		if (parent && parent.children){
			for (var i=0; i<parent.children.length; i++) {					
				var ele=parent.children[i];				
				if (ele.offsetLeft<left)
					left=ele.offsetLeft;
				if (ele.offsetTop<top)
					top=ele.offsetTop;
				if ((ele.offsetWidth+ele.offsetLeft)>right)
					right=ele.offsetWidth+ele.offsetLeft;
				if ((ele.offsetHeight+ele.offsetTop)>bottom)
					bottom=ele.offsetHeight+ele.offsetTop;	
			}
		}
		
		w=right-left;
		if (left>0)  w=w+left;
		
		h=bottom-top;
		if (top>0) h=h+top;
		
		return {width:w, height:h};
	},
	//generate the device type name based on jQuery.device.is
	getDevice: function(level) {
		var dev = "";
		jQuery.each(jQuery.device.is, function(key, val){
			if (val) {
				if(key=="standalone" || key=="desktop")
					return;
				if (level >= 1 && (key.indexOf("android")==0 || key.indexOf("ip")==0))
					return;
				if (level >= 2 && (key=="phone" || key=="tablet"))
					return;
				if (dev.length == 0) {
					dev = key;
				} else {
					dev += "_" + key;
				}
			}
		});
		return dev;
	},
	//choose a applicable style for current device/orientation
	getApplicableStyle: function(styles) {
		var dev = SAP.Util.getDevice();
		var dev1 = SAP.Util.getDevice(1);
		var dev2 = SAP.Util.getDevice(2);
		if (styles instanceof Object) {
			var style = "";
			var devs = Object.keys(styles);
			if (styles[dev]) {
				style = styles[dev];
			} else if(styles[dev1]) {
				style = styles[dev1];
			}  else if(styles[dev2]) {
				style = styles[dev2];
			} else if (devs.length > 0) {
				style = styles[devs[0]];
			}
			return style;
		}
		return "";
	},
	//apply "style" custom property to the actual DOM style
	applyStyle: function(control) {
		var styles = control.data("style");
		if (typeof styles == "string") {
			try{
				var obj = JSON.parse(unescape(styles));
				styles = obj;
			}
			catch(e) {
				var dev = SAP.Util.getDevice();
				var obj = {};
				obj[dev] = styles;
				styles = obj;
			}
			control.data("style", styles);
		}
		var style = SAP.Util.getApplicableStyle(styles);
		var h = SAP.Util.styleTextToHash(style);
		var parent = control.getParent();
		var type = parent.getMetadata().getName();
		var parentType = parent.getMetadata().getName();
		var controlType = control.getMetadata().getName();
		var parentBox = parentType == "sap.m.FlexBox" ||
				parentType == "sap.m.VBox" ||
				parentType == "sap.m.HBox";
		var controlBox = controlType == "sap.m.FlexBox" ||
				controlType == "sap.m.VBox" ||
				controlType == "sap.m.HBox";				
		if (parentBox && !controlBox) {
		}
		else if(0!=control.getMetadata().getName().search("sap.superlistdesigner")) {
			if(typeof control.setWidth == "function" && (!(control instanceof sap.m.TextArea || control instanceof sap.m.RadioButton || control instanceof sap.m.CheckBox))) {
				if(control.getWidth() == control.getMetadata().getPropertyDefaults().width) {
					control.setWidth(h.width);
				}
				delete h.width;
			}
			if(typeof control.setHeight == "function" && (!(control instanceof sap.m.TextArea || control instanceof sap.m.RadioButton || control instanceof sap.m.CheckBox))) {
				if(control.getHeight() == control.getMetadata().getPropertyDefaults().height) {
					control.setHeight(h.height);
				}
				delete h.height;
			}
		}	
		control._style = SAP.Util.hashToStyleText(h);
	},
	//apply "cssfiles" custom property 
	applyCssFiles: function(control) {
		var files = control.data("cssfiles");
		if (files) {
			var filearr=files.split(";");
			if (filearr.length>0){
				for (var i=0; i<filearr.length; i++) {					
					this.loadCssFile(filearr[i]);
				}
			}
		}
	},
	loadCssFile : function(cssPath){
		//var cssPath="../hermes/filesystem/root/"+this.getUser()+this.info.path+"/src/"+filename;		
		//var cssPath=SAP.Util.toDesignTimeURI(filename);
		var fileref=document.createElement("link")
		fileref.setAttribute("rel", "stylesheet")
		fileref.setAttribute("type", "text/css")
		fileref.setAttribute("href", cssPath);
		document.getElementsByTagName("head")[0].appendChild(fileref);
	},
	applyTheme: function(control){
		var theme = control.data("theme");		
		if (theme) {
			var core = sap.ui.getCore();

			if (typeof theme == "string") {
				try{
					var obj = JSON.parse(unescape(theme));
					theme = obj;
				}
				catch(e) {
					
				}
				control.data("theme", theme);
			}
			
			if (theme.fullname && theme.root)
				core.applyTheme(theme.fullname,theme.root);
			else	
				core.applyTheme(theme);
		}
		
	},
    getTimeFromDuration:function(data){
        if(data && data.ms)
        {
            var sign="";
            
            var ms=data.ms;
            if(data.ms<0)
            {
                sign="-";
                ms=-ms;
            }
            var days=Math.floor(ms/86400000);
            ms=ms-days*86400000;
            var hours=Math.floor(ms/3600000);
            ms=ms-hours*3600000;
            var minutes=Math.floor(ms/60000);
            ms=ms-minutes*60000;
            var seconds=Math.floor(ms/1000);
            ms=ms-seconds*1000;
            var result=new Date();
            result.setUTCFullYear(0,0,days);
            result.setUTCHours(hours,minutes,seconds,ms);
            result.ns=data.ns;
            result.isTimeSpan=true;
            result.sign=sign;
            return result;
        }
        else 
            return data;
    }, 
    parseTimeRE:/^([+-])?P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)(?:\.(\d+))?S)?)?/,
    isEdmDurationValue : function (value) {

        return this.parseTimeRE.test(value);
    },
    parseDuration:function (duration) {
        /// <summary>Parses a string in xsd:duration format.</summary>
        /// <param name="duration" type="String">Duration value.</param>
        /// <remarks>
        /// This method will throw an exception if the input string has a year or a month component. 
        /// </remarks>
        /// <returns type="Object">Object representing the time</returns>
        
        var parts = SAP.Util.parseTimeRE.exec(duration);

        if (parts === null) {
            throw { message: "Invalid duration value." };
        }

        var years = parts[2] || "0";
        var months = parts[3] || "0";
        var days = parseInt(parts[4] || 0,10);
        var hours = parseInt(parts[5] || 0,10);
        var minutes = parseInt(parts[6] || 0,10);
        var seconds = parseInt(parts[7] || 0,10);

        if (years !== "0" || months !== "0") {
            throw { message: "Unsupported duration value." };
        }

        var ms = parts[8];
        var ns = 0;
        if (!ms) {
            ms = 0;
        } else {
            if (ms.length > 7) {
                throw { message: "Cannot parse duration value to given precision." };
            }

            ns = SAP.Util.formatNumberWidth(ms.substring(3), 4, true);
            ms = SAP.Util.formatNumberWidth(ms.substring(0, 3), 3, true);

            ms = parseInt(ms, 10);
            ns = parseInt(ns,10);
        }




        var result = new Date(0);
       // result.setUTCFullYear(0);
        result.setUTCDate(days);
        result.setUTCHours(hours,minutes,seconds,ms);

        if (ns) {
            result.ns = ns;
        } 
        if (parts[1] === "-") {
            result.sign="-";
        }
        else
            result.sign="";
        result.isTimeSpan=true;
        return result;
    },
	encryptPassword:function(ds,smp){	
		if (ds) {
            var roots = new Array(ds.odataService, ds.odataQuery, ds.restful, ds.file, ds.odata);
            for(var k=0;k<roots.length;k++){
				for (var i=0; roots[k] && i<roots[k].length;i++) {
					var pass = roots[k][i].password || "";	
                    try{				
					    roots[k][i].password = sjcl.encrypt(Product_Key, pass);	
                    }
                    catch(exception)
                    {
                        roots[k][i].password =pass;
                    }
				}
			}
		}
        ;
        if (smp) {
			var server = smp.ServerProfile;
			if (server) {
				var pass = server.Password || "";
				try {
					pass2 = sjcl.encrypt(Product_Key, pass);
				}
				catch (exception) {
					pass2 = pass;
				}				
				server.Password = pass2;
			}
		}
    },
	decryptPassword: function(ds, smp){
		//oData source
		if (ds) {
            var roots = new Array(ds.odataService, ds.odataQuery, ds.restful, ds.file, ds.odata);
            for(var k=0;k<roots.length;k++){
				for (var i=0; roots[k] && i<roots[k].length;i++) {
					var pass = roots[k][i].password || "";					
					try {
						pass2 = sjcl.decrypt(Product_Key, pass);
					}
					catch (exception) {
						pass2 = pass;
					}
					roots[k][i].password = pass2;	
				}
            }
		}
		
		//smp services
		if (smp) {
			var server = smp.ServerProfile;
			if (server) {
				var pass = server.Password || "";
				try {
					pass2 = sjcl.decrypt(Product_Key, pass);
				}
				catch (exception) {
					pass2 = pass;
				}				
				server.Password = pass2;
			}
		}
	},
	removeProxy:function(ds)
    {
    //oData source
		if (ds) {
            var roots = new Array(ds.odataService, ds.odataQuery, ds.restful, ds.file, ds.odata);
            for(var k=0;k<roots.length;k++){
				for (var i=0; roots[k] && i<roots[k].length;i++) {
                    roots[k][i].proxy=false;
				}
            }
		}

    },
	//runtime fucntion
	//will be called when loading datasource.js in rutnime
	initSourceInfo: function(){

        if(SAP.Util.isPhoneGap())
        {
            SAP.Util.removeProxy(SAP.DataSources.ds);
        }
        else{
            //console.log("Is not PhoneGap");
        }
        try{
        	if(sjcl){
			    SAP.Util.decryptPassword(SAP.DataSources.ds, SAP.SMP.ds);
		    }
        }
        catch (error)
        {
        }
	},
    formatNumberWidth :function (value, width, append) {
        /// <summary>Formats the specified value to the given width.</summary>
        /// <param name="value" type="Number">Number to format (non-negative).</param>
        /// <param name="width" type="Number">Minimum width for number.</param>
        /// <param name="append" type="Boolean">Flag indicating if the value is padded at the beginning (false) or at the end (true).</param>
        /// <returns type="String">Text representation.</returns>
        var result = value.toString(10);
        while (result.length < width) {
            if (append) {
                result += "0";
            } else {
                result = "0" + result;
            }
        }

        return result;
    },
    formatMilliseconds :function (ms, ns) {
        /// <summary>Formats a millisecond and a nanosecond value into a single string.</summary>
        /// <param name="ms" type="Number" mayBeNull="false">Number of milliseconds to format.</param>
        /// <param name="ns" type="Number" mayBeNull="false">Number of nanoseconds to format.</param>
        /// <returns type="String">Formatted text.</returns>
        /// <remarks>If the value is already as string it's returned as-is.</remarks>

        // Avoid generating milliseconds if not necessary.
        if (ms === 0) {
            ms = "";
        } else {
            ms = "." + SAP.Util.formatNumberWidth(ms.toString(), 3);
        }
        if (ns > 0) {
            if (ms === "") {
                ms = ".000";
            }
            ms += SAP.Util.formatNumberWidth(ns.toString(), 4);
        }
        return ms;
    },

    isDateTimeOffset :function (value) {
        /// <summary>Checks whether a Date object is DateTimeOffset value</summary>
        /// <param name="value" type="Date" mayBeNull="false">Value to check.</param>
        /// <returns type="Boolean">true if the value is a DateTimeOffset, false otherwise.</returns>
        return (value.__edmType === "Edm.DateTimeOffset" || (!value.__edmType && value.__offset));
    },
    formatDateTimeOffset:function (value) {
        /// <summary>Formats a DateTime or DateTimeOffset value a string.</summary>
        /// <param name="value" type="Date" mayBeNull="false">Value to format.</param>
        /// <returns type="String">Formatted text.</returns>
        /// <remarks>If the value is already as string it's returned as-is.</remarks>

        if (typeof value === "string") {
            return value;
        }

        var hasOffset = SAP.Util.isDateTimeOffset(value);
        var offset = SAP.Util.getCanonicalTimezone(value.__offset);
        if (hasOffset && offset !== "Z") {
            // We're about to change the value, so make a copy.
            value = new Date(value.valueOf());

            var timezone = SAP.Util.parseTimezone(offset);
            var hours = value.getUTCHours() + (timezone.d * timezone.h);
            var minutes = value.getMinutes() + (timezone.d * timezone.m);

            value.setUTCHours(hours, minutes);
        } else if (!hasOffset) {
            // Don't suffix a 'Z' for Edm.DateTime values.
            offset = "";
        }

        var year = value.getUTCFullYear();
        var month = value.getUTCMonth() + 1;
        var sign = "";
        if (year <= 0) {
            year = -(year - 1);
            sign = "-";
        }

        var ms = SAP.Util.formatMilliseconds(value.getUTCMilliseconds(), undefined/*value.__ns*/);

        return sign +
            SAP.Util.formatNumberWidth(year, 4) + "-" +
            SAP.Util.formatNumberWidth(month, 2) + "-" +
            SAP.Util.formatNumberWidth(value.getUTCDate(), 2) + "T" +
            SAP.Util.formatNumberWidth(value.getUTCHours(), 2) + ":" +
            SAP.Util.formatNumberWidth(value.getUTCMinutes(), 2) + ":" +
            SAP.Util.formatNumberWidth(value.getUTCSeconds(), 2) +
            ms + offset;
    },
    formatDuration :function (value) {


        var days = 0;//value.getUTCDate();
        var hours = value.getUTCHours();
        var minutes = value.getUTCMinutes();
        var seconds = value.getUTCSeconds();
        var milliSeconds=value.getUTCMilliseconds();

        return value.sign + "PT" +
               //this.formatNumberWidth(days, 2) + "DT" +
               SAP.Util.formatNumberWidth(hours, 2) + "H" +
               SAP.Util.formatNumberWidth(minutes, 2) + "M" +
               SAP.Util.formatNumberWidth(seconds, 2) +
               SAP.Util.formatMilliseconds(milliSeconds, value.ns) + "S";
    }
};

SAP.DataSources = {
	getEntityUrl: function(data){
		var __colmeta, entityUrl;
		if(data){
			if(SAP.Util.isArray(data) && data.length>0){
				__colmeta = data[0].__metadata;
			}else{
				__colmeta = data.__metadata;
			}
		}
		
		if(__colmeta && __colmeta["uri"]){
			var url = __colmeta["uri"];
			var pos = url.indexOf("(");
			var pos1 = url.indexOf("(", pos+1);
			var pos2 = url.indexOf("\"", pos+1);
			while (pos1 >= 0 && pos2 > pos1) {
				pos = pos1;
				pos1 = url.indexOf("(", pos1+1);
				pos2 = url.indexOf("\"", pos1+1);
			}
			entityUrl = url.substring(0, pos);
		}
		return entityUrl;
	},
    getMetadataFromResponseXML:function(responseBody, userName, password, jsonp, proxy,okCallBack,errorCallback){
        var rootURL="";
        var table="";
        if(responseBody && typeof(responseBody)==="string")
        {
            var xmlDoc = SAP.Util.loadXMLFromString(responseBody);
            if(xmlDoc.childNodes && xmlDoc.childNodes.length>=1)
            {
                var firstNode=xmlDoc.childNodes[0];
                if(firstNode.localName==="feed" || firstNode.localName==="entry")
                {

                    for(var i=0;firstNode.attributes && i<firstNode.attributes.length;i++)
                    {
                        if(firstNode.attributes[i].localName==="base")
                        {
                            rootURL=firstNode.attributes[i].value;
                            break;
                        }
                    }

                    for(var i=0;rootURL && firstNode.childNodes && i<firstNode.childNodes.length;i++)
                    {
                        var node=firstNode.childNodes[i];
                        if(node.localName==="link")
                        {
                            for(var j=0;node.attributes && j<node.attributes.length;j++)
                            {
                                if(node.attributes[j].localName==="href")
                                {
                                    var value=node.attributes[j].value;
                                    if(value.indexOf(rootURL)===0)
                                    {
                                        table=value.substring(rootURL.length);
                                    }
                                    else{
                                        table=value;
                                    }
                                    var ind=table.indexOf("(");
                                    if(ind>0)
                                    {
                                        table=table.substring(0,ind);
                                    }
                                    break;
                                }
                            }
                            break;
                        }
                    } 
                }
            }

        }
        else if(responseBody["odata.metadata"]){
            var arr=responseBody["odata.metadata"].split("$metadata#");
            if(arr.length===2)
            {
                rootURL=arr[0];
                arr=arr[1].split("&");              
                table=arr[0];
            }
        };
        if(rootURL && table)
        {
            return this.getODataDBTableMeta_fromDBMeta(rootURL,table,userName,password,jsonp,proxy,okCallBack,errorCallback);
        }
        else
        {
            if(errorCallback)
                errorCallback();
        }
    },
    getODataDBTableMeta_fromDBMeta: function(rooturl,tablename, userName, password, jsonp, proxy,okCallBack,errorCallback) {

        return this.getODataDBMeta_new(rooturl, userName, password, jsonp, proxy,okCallBack,errorCallback,tablename);

	},
    getODataDBMeta_new: function(rooturl, userName, password, jsonp, proxy,okCallBack,errorCallback,forTable) {
        if(!rooturl)
        {
            if(errorCallback)errorCallback("url is null");
            return ;
        }
        var url;
        var bUseProxy=false;
        if(rooturl[rooturl.length-1]!='/')
            rooturl=rooturl+"/";
        url=rooturl+"$metadata"; 
       
        var xhr=SAP.Util.createXHR();
        var proxyPath = SAP.DataSources.getDataSourceProxyPath();

		/*if (proxy && proxyPath)*/ {
            bUseProxy=true;
			url = SAP.Util.getOrigin() +
				proxyPath.replace("{url}", encodeURIComponent(url)).
					replace("{user}", encodeURIComponent(userName)).
					replace("{password}", encodeURIComponent(password));
		}
        xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {// 4: The Request is complete
					if ((xhr.status == 200 || xhr.status == 304 || xhr.status == 0 )&& xhr.responseXML ) {
                        var result=[];
                        var entitysets=xhr.responseXML.getElementsByTagName("EntitySet"); 
                        for(var i=0;entitysets && i<entitysets.length;i++)
                        {
                            var tablename=entitysets[i].attributes["Name"].nodeValue;
                            if(!forTable || forTable===tablename)
                            {
                                var meta={
			                        name: tablename,
			                        rootURL: rooturl+ tablename,
			                        jsonp: jsonp,
			                        proxy: proxy,
			                        type: "[]",
			                        //userName: userName,
			                        //password: password,
			                        columns: null
		                        };
                                meta.columns =SAP.DataSources.getEntityTypeProperties(entitysets[i].attributes["EntityType"].nodeValue,xhr.responseXML,meta);
                                meta.metaURL=rooturl;
                                if(!forTable)
                                    result.push(meta);
                                else
                                {
                                    result=meta;
                                    break;
                                }
                            }
                        }  
                        var error;
                        if( !entitysets || entitysets.length===0)
                        {                        
                            if(xhr.responseText)
                            {
                                error=SAP.DataSources.getErrorDetailFromResponseText(xhr.responseText);
                            }
                        }              
                        if(!error)
                        {
                            if(okCallBack)
                                okCallBack(result);
                        }
                        else 
                        {
                            if(errorCallback)
                                errorCallback(error);
                        }

					} else {
						if(errorCallback)
                        {
                            var error="";
                            if(xhr.responseText)
                            {
                                error=SAP.DataSources.getErrorDetailFromResponseText(xhr.responseText);
                            }
                            errorCallback(error);
                        }
					}
				}
			};
        xhr.open("GET", url, true, bUseProxy?"":userName, bUseProxy?"":password);
        xhr.send();
	},
    getODataDBMeta: function(rooturl, userName, password, jsonp, proxy,okCallBack,errorCallback) {
        if(!rooturl)
        {
            if(errorCallback)errorCallback("url is null");
            return ;
        }
        var url;
        var bUseProxy=false;
        if(rooturl[rooturl.length-1]!='/')
            rooturl=rooturl+"/";
        url=rooturl+"$metadata"; 

        var proxyPath = SAP.DataSources.getDataSourceProxyPath();

		if (proxy && proxyPath) {
            bUseProxy=true;
			url = SAP.Util.getOrigin() +
				proxyPath.replace("{url}", encodeURIComponent(url)).
					replace("{user}", encodeURIComponent(userName)).
					replace("{password}", encodeURIComponent(password));
		}
        var bFound=false;
        var meta;
        for(var i=0;i< OData.defaultMetadata.length;i++)
        {
            if(OData.defaultMetadata[i].rootURL===url)
            {
                bFound=true;
                meta=OData.defaultMetadata[i];
                break;
            }
        }
       if(!bFound)
       {
           OData.read(url, function (metadata) { 
                // success callback 
                if(metadata)
                {
                    OData.defaultMetadata.push(metadata);
                    metadata.rootURL=url;

                } 

                if(okCallBack)
                    okCallBack(metadata);

            },errorCallback, OData.metadataHandler);
        }
        else
        {
           if(okCallBack)
                okCallBack(meta);
        }
	},
    getEntityTypeProperties:function(TypeName,responseXML,meta)
    {
         var typenode=SAP.DataSources.getODataTypeNode(TypeName,responseXML,"EntityType");
         var properties=[];
         var columns=[];
         var columnsBase=[];
         var result=[];
         if(typenode)
         {
            var baseType=typenode.attributes["BaseType"];
            if(baseType)
                columnsBase=this.getEntityTypeProperties(baseType.nodeValue,responseXML,meta);
            properties=typenode.getElementsByTagName("Property");
            columns=SAP.DataSources.getColumnsByXML(properties,responseXML,meta);
            result=columns.concat(columnsBase);
         }
         return result;
    },
    getColumnsByXML: function(properties,responseXML,meta) {
        if(!properties)
            return null;
		var result = [];	
		for (var i=0 ;i<properties.length;i++) {
            var odatatype=properties[i].attributes["Type"].nodeValue;
            var type=this.getJSONTypeFromODateType(odatatype);
			var column = {name:properties[i].attributes["Name"].nodeValue, 
                            type: type,originalType:odatatype};
//            var bAdd=true;
            for(var j=0;j<properties[i].attributes.length;j++)
            {
                var attributeName=properties[i].attributes[j].name;
                var arr=attributeName.split(":");
                if(arr.length>0 && arr[arr.length-1].toLowerCase()==="fc_keepincontent" && properties[i].attributes[attributeName].nodeValue==="false")
                {
                    meta.hasPropertiesNotInContent=true;
                    break;
                }
            }
//			if(bAdd)result.push(column);
//            else continue;
            result.push(column);
			if (type === "[]" || type === "object") {
                
				column.columns = this.getColumnsByXML(this.getComplexTypeProperties(odatatype,responseXML),responseXML,meta);
			}
		}		
		return result;
	},
    getODataTypeNode:function(odatatype,responseXML,tagname)
    {
        var nodes=odatatype.split(".");
        var name=nodes[nodes.length-1];
        var namespace="";
        if(nodes.length>1)
            namespace=nodes.slice(0,nodes.length-1).join(".");
        var schemas=responseXML.getElementsByTagName("Schema"); 
        for (var i=0 ;i<schemas.length;i++)
        {
            if(schemas[i].attributes["Namespace"].nodeValue===namespace)
            {
                var ctypes=schemas[i].getElementsByTagName(tagname);
                for(var j=0;j<ctypes.length;j++)
                {
                    if(ctypes[j].attributes["Name"].nodeValue===name)
                    {
                        
                        return ctypes[j];
                    }
                }
                break;
            }
        }
        return null;
    },
    getComplexTypeProperties:function(odatatype,responseXML)
    {
        var typenode=this.getODataTypeNode(odatatype,responseXML,"ComplexType");
        var properties;
        if(typenode)properties=typenode.getElementsByTagName("Property");
        return properties;
    },
    getJSONTypeFromODateType:function(odatatype)
    {
        switch(odatatype)
        {
        case "Edm.Binary":
            return "string";
        case "Edm.Boolean":
            return "boolean";
        case "Edm.Byte":
            return "number";
        case "Edm.Int16":
            return "number";
        case "Edm.Int32":
            return "number";
        case "Edm.Int64":
            return "number";
        case "Edm.Decimal":
            return "number";
        case "Edm.String":
            return "string";
        case "Edm.Single":
            return "number";
        case "Edm.SByte":
            return "number";     
        case "Edm.Double":
            return "number";
        case "Edm.Guid":
            return "string";    
        case "Edm.Time":
            return "datetime";
        case "Edm.DateTime":
            return "datetime";
        case "Edm.DateTimeOffset":
            return "datetime"; 
             
      };
      return "object";
    },
    test: function() {
        this.getODataDBTables("http://10.128.103.128/TestDataService/Employee.svc/","","",false,true,
            function(data)
            {
                var tables;
                tables=data.workspaces[0].collections;
            },
            function(error)
            {
            });
        this.getODataDBTableMeta("http://10.128.103.128/TestDataService/Employee.svc/","customers","","",false,true,
            function(data)
            {
                var meta;
                meta=data;
            },
            function(error)
            {
            });
        this.getODataDBTableMeta("http://10.128.103.128/TestDataService/Employee.svc/","employees","","",false,true,
            function(data)
            {
                var meta;
                meta=data;
            },
            function(error)
            {
            });
        this.getODataQueryMeta("test","http://10.128.103.128/TestDataService/Employee.svc/customers","","",false,true,
            function(data)
            {
                var meta;
                meta=data;
            },
            function(error)
            {
            });
    },
    getODataDBTables: function(rooturl, userName, password, jsonp, proxy,okCallBack,errorCallback) {

        if(!rooturl)
        {
            errorCallback("url is null");
            return null;
        }
        if(rooturl[rooturl.length-1]!='/')
            rooturl=rooturl+"/";
       
        return this.getOData(rooturl,userName,password,jsonp,proxy,okCallBack,errorCallback);

	},
    getURLResponseMeta: function(queryurl, metaurl,metaname,userName, password, jsonp, proxy,okCallback,errorCallback) {
        var that=this;
//        that.data={
//			    name: metaname,
//			    rootURL: metaurl,
//			    jsonp: jsonp,
//			    proxy: proxy,
//			    type: "[]",
//			    userName: userName,
//			    password: password,
//			    columns: null
//		    };

        try{
        SAP.DataSources.getOData(
		    queryurl,
		    userName,
            password,
            jsonp,
            proxy,
		    function(data) {
                var meta={
			        name: metaname,
			        rootURL: metaurl,
			        jsonp: jsonp,
			        proxy: proxy,
			        type: "[]",
			        userName: userName,
			        password: password,
			        columns: null
		        };
			    meta.columns= that.getColumns(data );
                if(okCallback)okCallback(meta);
		    },
		    function(error) {
                errorCallback(error);
		    });
        }
        catch(error)
        {
            errorCallback(error);
        }
    },
    getODataDBTableMeta: function(rooturl, tablename,userName, password, jsonp, proxy,okCallback,errorCallback) {
        var tableurl;
        var url
         if(!rooturl)
        {       
            return null;
        }
        if(rooturl[rooturl.length-1]!='/')
            rooturl=rooturl+"/";
        tableurl=rooturl+tablename
        url=rooturl+tablename+"?$top=1";
        return this.getURLResponseMeta(url,tableurl,tablename,userName,password,jsonp,proxy,okCallback,errorCallback);

	},
    getODataQueryMeta: function(name,queryUrl,userName, password, jsonp, proxy,okCallback,errorCallback) {
        var url;
         if(!queryUrl)
        {          
            return null;
        }
        if(queryUrl.indexOf("?")>=0)
            url=queryUrl+"&$top=1";
        else url=queryUrl+"?$top=1";
        return this.getURLResponseMeta(url,queryUrl,name,userName,password,jsonp,proxy,okCallback,errorCallback);

	},
    getNonNullColumnValue:function(root,key){
        if (root.length && root.length > 0) {
			for(var i=0;i<root.length;i++)
            {
                if(root[i][key]!==null)
                {
                    return root[i][key];
                }
            }
            return null;
		}
        else
        {
            return root[key];
        }
    },

    getColumns: function(root) {
		var result = [];
		
		if (root) {
			var p = root;
			if (p.length && p.length > 0) {
				p = p[0];
			}
            if(SAP.Util.getTypeName(p)==="object")
            {
                var meta=p.__metadata;
			    for (var key in p) {
                    if(key.indexOf("__")===0)//skip the metadata
                        continue;
                    var value=p[key];
                    if(value===null)
                        value=this.getNonNullColumnValue(root,key);
				    var type;
                    var originalType=undefined;
                    if(value===null && meta && meta.properties && meta.properties[key] && meta.properties[key].type )
                    {                        
                        type=SAP.DataSources.getJSONTypeFromODateType(meta.properties[key].type);
                        originalType=meta.properties[key].type;
                        if(value && typeof(value)==="string" && SAP.Util.isEdmDurationValue(value) && originalType.toLowerCase()==="edm.time")
                        {
                            originalType="Edm.TimeSpan";
                        }
                    }
                    else
                    {
                        type= SAP.Util.getTypeName(value);
                        if(type==="datetime" && typeof(value)==="string" && SAP.Util.isEdmDurationValue(value))
                        {
                            originalType="Edm.TimeSpan";
                        }
                    }

				    if (type !== "function") {
					    var column = {name: key, type: type};
                        if(originalType)
                            column.originalType=originalType;
                        var bAdd=true;
                        if (type === "[]" || type === "object") {
						    column.columns = this.getColumns(value);
                            if(SAP.Util.isArray(value))
                            {
                                column.baseType=SAP.Util.getBaseType(value);
                            }
                            if(column.columns.length==0 && value!==null && column.baseType==undefined)
                                bAdd=false;
					    }
					    if(bAdd)result.push(column);

				    }
			    }
            }
		}
		
		return result;
	},
    getErrorDetailFromResponseText:function(response){
        return response;
        var error="";
        var xml=SAP.Util.loadXMLFromString(response);
        var nodes=xml.getElementsByTagName("error");
        if(nodes && nodes.length && nodes[0].childNodes && nodes[0].childNodes.length>0)
        {
            var messagenode=nodes[0].getElementsByTagName("message");
            if(messagenode && messagenode.length )
                error=messagenode[0].textContent;
        }
        if(error!=="")
        {
            return error;
        }
        nodes=xml.getElementsByTagName("title");
        if(nodes && nodes.length )
        {
           error=nodes[0].textContent;
        }
        return error;
    },
	getOData: function(url, userName, password, jsonp, proxy, okCallback, errorCallback) {
		var proxyPath = SAP.DataSources.getDataSourceProxyPath();
        var isphone=SAP.Util.isPhoneGap();
		if (proxy && proxyPath && !isphone) {
            url = SAP.Util.getOrigin() +
				proxyPath.replace("{url}", encodeURIComponent(url)).
					replace("{user}", encodeURIComponent(userName)).
					replace("{password}", encodeURIComponent(password));
		}

		var sdo = new SAP.DataSources.Odata(jsonp, undefined, undefined, 45000);
		if (!(proxy && proxyPath && !isphone)) {
			sdo.user = userName;
			sdo.pwd = password;
		}
		try {
			sdo.read(url, okCallback, 
                function(error)
                {
            	    if (errorCallback) 
                    {
                        if((!error.message || error.message==="no handler for data") &&  error.response && error.response.body)
                        {
                            var err=SAP.DataSources.getErrorDetailFromResponseText(error.response.body);
                            if(err)
                                error.message=err;
                        }
                        errorCallback(error);
			        }
                });
		} catch (error) {
			if (errorCallback) {
				errorCallback(error);
			}
		}
	},
    getDataSourceMetaAsyn: function(dsName,okCallback,errorCallback) {

		var name;
        var props = dsName.split("|");
        if(props.length>=2)
            name=props[1];
        else
            name=props[0];
        var nodes= name.split(".");
        var profnodes;
        if (nodes.length>1)//called by new method
        {
            if(nodes[0].toLowerCase()==="odata" && nodes[1].toLowerCase()!="odataservices" && nodes[1].toLowerCase()!="odataqueries")
            {//old format called by new method
                if (SAP.DataSources.ds)
                {
			        for (var i = 0; i < SAP.DataSources.ds.odata.length; i++) 
                    {
				        if (SAP.DataSources.ds.odata[i].name === nodes[1]) 
                        {
                            if(okCallback)return okCallback(SAP.DataSources.ds.odata[i]);
                            else return SAP.DataSources.ds.odata[i];	
                         }
					        			        
			        }
		        }
            }
            else if(nodes[0].toLowerCase()==="odata" && nodes[1].toLowerCase()==="odataservices" && nodes.length>=4)
            {
                profnodes=SAP.DataSources.ds.odata.odataservices;
                if (profnodes)
                {
			        for (var i = 0; i < profnodes.length; i++) 
                    {                      
				        if (profnodes[i].name === nodes[2]) 
                        {// construct the metadata
                            this.getODataDBTableMeta(
				                profnodes[i].rootURL,
                                nodes[3],
				                profnodes[i].userName,
                                profnodes[i].password,
                                profnodes[i].jsonp,
                                profnodes[i].proxy
                                   ,okCallback,errorCallback);
                            return null;
                        }				        
			        }
		        }
            }
            else if(nodes[0].toLowerCase()==="odata" && nodes[1].toLowerCase()==="odataqueries" && nodes.length>=3)
            {
                profnodes=SAP.DataSources.ds.odata.odataqueries;
                if (profnodes)
                {
			        for (var i = 0; i < profnodes.length; i++) 
                    {
				        if (profnodes[i].name === nodes[2]) 
                        {
                            if(okCallback)return okCallback(profnodes[i]);
					        else return profnodes[i];
                        }
			        }
		        }
            }
            else if(nodes[0].toLowerCase()==="restws" && nodes[1])
            {
                profnodes=SAP.DataSources.ds.restws;
                if (profnodes)
                {
			        for (var i = 0; i < profnodes.length; i++) 
                    {
				        if (profnodes[i].name === nodes[1]) 
                        {
                            if(okCallback)return okCallback(profnodes[i]);
					        else return profnodes[i];
                        }
			        }
		        }
            }
            else if(nodes[0].toLowerCase()==="localfiles" && nodes[1])
            {
                profnodes=SAP.DataSources.ds.localfiles;
                if (profnodes)
                {
			        for (var i = 0; i < profnodes.length; i++) 
                    {
				        if (profnodes[i].name === nodes[1]) 
                            if(okCallback)return okCallback(profnodes[i]);
					        else return profnodes[i];
			        }
		        }
            }
        }
        else{//called by old method 
		    if (SAP.DataSources.ds) {
			    for (var i = 0; i < SAP.DataSources.ds.odata.length; i++) {
				    if (SAP.DataSources.ds.odata[i].name === dsName) {
                        if(okCallback)return okCallback(SAP.DataSources.ds.odata[i]);
					    else return SAP.DataSources.ds.odata[i];
				    }
			    }
		    }
		}
		return errorCallback("can not get datasource information");
	},
	getDataSourceMeta: function(dsName) {
		var name;
        var props = dsName.split("|");
        if(props.length>=2)
            name=props[1];
        else
            name=props[0];
        var nodes= name.split(".");
        var profnodes;
        if (nodes.length>1)//called by new method
        {
            if(nodes[0].toLowerCase()=="odata" )
            {
                if (SAP.DataSources.ds)
                {
			        for (var i = 0; SAP.DataSources.ds.odata && i < SAP.DataSources.ds.odata.length; i++) 
                    {
				        if (SAP.DataSources.ds.odata[i].name === nodes[1]) 
                        {
                            return SAP.DataSources.ds.odata[i];	
                         }
					        			        
			        }
		        }
            }
            else if(nodes[0].toLowerCase()==="odataservice" && nodes.length>=2)
            {
                profnodes=SAP.DataSources.ds.odataService;
                if (profnodes)
                {
			        for (var i = 0; i < profnodes.length; i++) 
                    {                      
				        if (profnodes[i].name === nodes[1]) 
                        {
                            if(nodes.length===2)
                            {
                                return profnodes[i];
                            }
                            for( var j=0; j< profnodes[i].tables.length;j++)
                            {
                                if(profnodes[i].tables[j].name === nodes[2])
                                { 
                                    profnodes[i].tables[j].jsonp=profnodes[i].jsonp;
                                    profnodes[i].tables[j].proxy=profnodes[i].proxy;
                                    //find the tablename
                                    var index=profnodes[i].tables[j].rootURL.lastIndexOf("/");
                                    var tablename=profnodes[i].tables[j].rootURL.substr(index+1);
                                    if(profnodes[i].rootURL[profnodes[i].rootURL.length-1]!='/')
                                        tablename='/'+tablename;
                                    profnodes[i].tables[j].rootURL=profnodes[i].rootURL+tablename;
                                    profnodes[i].tables[j].userName=profnodes[i].userName;
                                    profnodes[i].tables[j].password=profnodes[i].password;
                                    return profnodes[i].tables[j];
                                }
                            }
                        }				        
			        }
		        }
            }
            else if(nodes[0].toLowerCase()==="odataquery" && nodes.length>=2)
            {
                profnodes=SAP.DataSources.ds.odataQuery;
                if (profnodes)
                {
			        for (var i = 0; i < profnodes.length; i++) 
                    {
				        if (profnodes[i].name === nodes[1]) 
                        {
                            return profnodes[i];
                        }
			        }
		        }
            }
            else if(nodes[0].toLowerCase()==="restful" && nodes.length>=2)
            {
                profnodes=SAP.DataSources.ds.restful;
                if (profnodes)
                {
			        for (var i = 0; i < profnodes.length; i++) 
                    {
				        if (profnodes[i].name === nodes[1]) 
                        {
                            return profnodes[i];
                        }
			        }
		        }
            }
            else if(nodes[0].toLowerCase()==="file" && nodes.length>=2)
            {
                profnodes=SAP.DataSources.ds.file;
                if (profnodes)
                {
			        for (var i = 0; i < profnodes.length; i++) 
                    {
				        if (profnodes[i].name === nodes[1]) 
                            return profnodes[i];
			        }
		        }
            }
			else if(nodes[0].toLowerCase()==="smpodata" && nodes.length>=2){
				var meta = SAP.SMP.getSMPMeta(nodes[1]);
				var serverInfo = SAP.SMP.getSMPServerProfile();
				var newMeta = {};
				//make it identical to odata meta
				newMeta.userName = serverInfo.UserName;
				newMeta.password = serverInfo.Password;
				
				//smp connection info
				newMeta.server = serverInfo.SMPServer;
				newMeta.appid = serverInfo.SMPApplicationID;
				newMeta.apptag = serverInfo.SMPApplicationTag;
				newMeta.bAnonymous = serverInfo.AllowAnonymous;
				newMeta.connid = SAP.SMP.ds.AppCid;
				//meta url
				if (meta) {
					newMeta.rootURL = meta.rootURL;
					newMeta.params = meta.params;
					newMeta.columns=meta.columns;
					//entityUrl
					if(meta.isQuery){
						newMeta.entityUrl = meta.entityUrl;
					}else{
						newMeta.entityUrl = meta.rootURL;
					}
				}
			
				return newMeta;
			}
        }
        else{//called by old method 
		    if (SAP.DataSources.ds) {
			    for (var i = 0; i < SAP.DataSources.ds.odata.length; i++) {
				    if (SAP.DataSources.ds.odata[i].name === dsName) {
                            return SAP.DataSources.ds.odata[i];
				    }
			    }
		    }
		}
		return null;
	},
    getDataSourceColumnsMeta:function(dataSource,pathArr)
    {
        if(!pathArr)
            return dataSource;
        var curNode=dataSource;
        for(var i=0;i<pathArr.length;i++)
        {
            var found=false;
            for(var j=0;j<curNode.columns.length;j++)
            {
                if(curNode.columns[j].name===pathArr[i])
                {
                    curNode=curNode.columns[j];
                    found=true;
                    break;
                }
            }
            if(!found)
            {
                return null;
            }
        }
        return curNode;
    },
	getDataSourceProxyPath: function() {
		if (SAP.DataSources.ds) {
			return SAP.DataSources.ds.proxyPath;
		}
		
		return null;
	},
	isAnonymousParameters: function(url) {
		var names = url.split("{?}");
		return names.length > 1;
	},
	getParamNames: function(url) {
		var names = url.split("{?}"); //anonymous parameters
		if (names.length > 1) { //e.g. http://www.dummy.com/service?id={?}&pwd={?}
			var result = [];
			
			for (var i = 0; i < (names.length - 1); i++) {
				result.push("" + (i + 1));
			}
			
			return result;
		} else { //named parameters
			names = url.match(/\x7b(\d+)\x7d/g); //e.g. http://www.dummy.com/service?id={0}&pwd={1}
			if (names && names.length > 0) {
				return names;
			}            
            names = url.match(/\x7b(\w+)\x7d/g); //e.g. http://www.dummy.com/service?id={0}&pwd={1}
            if (names && names.length > 0) {
				return names;
			} 
            else
                return null;
		}
	},
	getParamName: function(name) { //get name from {name}, e.g. {0}, {2}
		return name.substring(1, name.length - 1);
	},
	initParams: function(strParams) {
		var result = [];
		
		if (!SAP.Util.isStringNullOrEmpty(strParams)) {
			var items = strParams.split(";");
			for (var i = 0; i < items.length; i++) {
                var ind=items[i].indexOf(":");
                if(ind>0)
                {
                    var name=items[i].substring(0,ind);
                    var value=items[i].substring(ind+1);
                    result.push({ name: name, value: value });
                }
//				var pair = items[i].split(":");
//				if (pair.length == 2) {
//					result.push({ name: pair[0], value: pair[1] });
//				}
			}
		}
		
		return result;
	},
    initParamsWithDefaultValue: function(DefaultParams) {
		var result = [];

		for (var i = 0; i < DefaultParams.length; i++) {
				result.push({ name: DefaultParams[i].name, defaultValue:DefaultParams[i].defaultValue,value: DefaultParams[i].defaultValue });
		}

		
		return result;
	},
	replaceParamValuesByArgs: function(paramValues, args, zoomingLevels) {
		if (!args || args.length < 1) {
			return;
		}
		
		var allArgs = [];
		for (var i = 0; i < args.length; i++) {
			for (var j = args[i].itemValues.length - 1; j >= 0; j--) {
				allArgs.push(args[i].itemValues[j]);
			}
			
			if (zoomingLevels > args[i].itemValues.length) {
				for (var j = 0; j < (zoomingLevels - args[i].itemValues.length); j++) {
					allArgs.push("");
				}
			}
				
			allArgs.push(args[i].seriesName || "");
		}
		
		var len = allArgs.length;
		for (var i = 0; i < paramValues.length; i++) {
			if (len > i) {
				paramValues[i].value = allArgs[i];
			} else {
				paramValues[i].value = "";
			}			
		}
	},
	getParam: function(params, paramName) {
		for (var i = 0; i < params.length; i++) {
			if (params[i].name === paramName) {
				return params[i];
			}
		}
		
		return null;
	},
    justifyURL: function (url) {
        url = url.trim();
        var inQuote = false;
        var result = "";
        var bFindFirstQuestionMark = false;
        for (var i = 0; i < url.length; i++) {
            var char = url.charAt(i);
//            if (char === '"' && !inQuote) {
//                inQuote = true;
//                result = result + char;
//            }
//            else if (char === '"' && inQuote) {
//                inQuote = false;
//                result = result + char;
//            }
//            else if (char === '?' && !inQuote) {
//                bFindFirstQuestionMark = true;
//                result = result + char;
//            }
            //            else 
            if (char === ' '/* && bFindFirstQuestionMark && !inQuote*/) {
                result = result + "%20";
            }
            else {
                result = result + char;
            }

        }
        return result;
    },
	makeUrl: function(url, paramValues, useDefault,start, rows) {
		useDefault = useDefault == undefined ? false : useDefault;
		if (SAP.DataSources.isAnonymousParameters(url)) {
			var i = 1;
			url = url.replace(/\x7b\x3f\x7d/g, function(match) { 
				var param = SAP.DataSources.getParam(paramValues, "" + i);
				var result = param ? (useDefault ? param.defaultValue : param.value) : "";
				i++;
				return result;
			});
		} else {
			var paramNames = SAP.DataSources.getParamNames(url);
			if (paramNames && paramNames.length > 0) {
				for (var i = 0; i < paramNames.length; i++) {
					var paramName = SAP.DataSources.getParamName(paramNames[i]);
					var param = SAP.DataSources.getParam(paramValues, paramName);
					url = url.replace(paramNames[i], param ? (useDefault ? param.defaultValue : param.value) : "");
				}
			}
		}		
		if(start && start>1 && url.indexOf("$skip")<0)
        {
            if(url.indexOf("?")>=0)
                url+= "&$skip="+(start-1);
            else
                url+="?$skip="+(start-1);
        }
        if(rows && rows>=0 )
        {
            if(url.indexOf("$top")<0)
            {
                if(url.indexOf("?")>=0)
                    url+= "&$top="+rows;
                else
                    url+="?$top="+rows;
            
            }
            else
            {
               url= url.replace(/top=(\d+)/g, function(match, number) { 
			        if(number>rows)return "top="+rows;
                    else return "top="+number;
                    });
            }
        }
		return this.justifyURL(url);
	},
    getColumnsPartFromDataSource: function(dataSource)
    {
        var nodes = dataSource.split(".");
        if(nodes[0].toLowerCase() =="odataservice")
            nodes.splice(0,3);
        else if(nodes[0].toLowerCase() =="odataquery" )
            nodes.splice(0,2);
		else 
			nodes.splice(0, 2);
        return nodes;
    },
    getDataSourceColumnsFromMeta: function(dataSource,dataSourceMeta,typeCallback)
    {
        var result = [];       
    	if (dataSourceMeta) {
            var nodes=this.getColumnsPartFromDataSource(dataSource);
			var parentNode = dataSourceMeta;
			for (var i = 0; i < nodes.length; i++) {
				for (var j = 0; j < parentNode.columns.length; j++) {
					if (parentNode.columns[j].name === nodes[i]) {
						parentNode = parentNode.columns[j];
						break;
					}
				}
			}
			if (parentNode && parentNode.columns) {
				for (var i = 0; i < parentNode.columns.length; i++) {
					if (typeCallback) {
						if (typeCallback(parentNode.columns[i].type)) {
							result.push(parentNode.columns[i]);
						}
					} else {
						result.push(parentNode.columns[i]);
					}
				}
			}
			
		}
		
		return result;
    },
    getDataSourceColumnsAsync: function(dataSource, typeCallback,okCallback, errorCallback) {
		var result = [];
		var items = dataSource.split("|");
		if (items.length === 2) {
			dataSource = items[0];
		}
		var nodes = dataSource.split(".");
        var that=this;
		if (nodes[0] == "SMPOData") {
				var dataSourceMeta = SAP.SMP.getSMPMeta(nodes[1]);
                if(okCallback)okCallback(that.getDataSourceColumnsFromMeta(dataSource,dataSourceMeta,typeCallback));
		} else {
		    SAP.DataSources.getDataSourceMetaAsync(dataSource/*nodes[1]*/,
                function(data)
                {
                   if(okCallback)okCallback(that.getDataSourceColumnsFromMeta(dataSource,data,typeCallback));
                },
                function(error)
                {
                    if(errorCallback)errorCallback(error);
                });
		}

	},
	getDataSourceColumns: function(dataSource, typeCallback) {
        var result = [];
		var items = dataSource.split("|");
		if (items.length === 2) {
			dataSource = items[0];
		}
		var nodes = dataSource.split(".");
        var that=this;
		if (nodes[0] == "SMPOData") {
				var dataSourceMeta = SAP.SMP.getSMPMeta(nodes[1]);
		} else {
		    var dataSourceMeta = SAP.DataSources.getDataSourceMeta(dataSource/*nodes[1]*/);

		}
		if (dataSourceMeta) {
            result= this.getDataSourceColumnsFromMeta(dataSource,dataSourceMeta,typeCallback);
		}
		
		return result;
	},
	getDataSourceColumns4MAKit: function(dataSource) {
		return SAP.DataSources.getDataSourceColumns(dataSource, SAP.Util.isMAKitType);
	},
    getDataByMetaAsync: function(ds, paramValues, userName, password, okCallback, errorCallback) {
		//var nodes = ds.split(".");
        //var that=this;
		SAP.DataSources.getDataSourceMetaAsync(ds/*nodes[1]*/,
            function(dataSourceMeta)
            {
                if (dataSourceMeta) {
			        userName = userName ? userName : dataSourceMeta.userName;
			        password = password ? password : dataSourceMeta.password;
			        var url = SAP.DataSources.makeUrl(dataSourceMeta.rootURL, paramValues);
			
			        SAP.DataSources.getData2(url, userName, password,
				        dataSourceMeta.jsonp, dataSourceMeta.proxy,
				        function(data) {
					        if (okCallback) {
                                var nodes=SAP.DataSources.getColumnsPartFromDataSource(ds);
						        var result = data;
						        if (nodes.length > 0) {
							        result = eval("data." + nodes.join("."));
						        }
						        okCallback(result);
					        }
				        }, errorCallback);
		        }
            },
            errorCallback);
		
	},
    getTransformedSimpleData:function(data,type,isOData)
    {
        if(type==="number" && SAP.Util.getTypeName(data)==="string")
            return Number(data);
        if(type==="boolean" && SAP.Util.getTypeName(data)==="string")
            return Boolean(data);
        if((type==="datetime" || type==="Date" )&& SAP.Util.isString(data))
        {
            return SAP.Util.getDateFromString(data,isOData);
        }
        else if(type==="datetime" && data && data.ms)
        {
            return SAP.Util.getTimeFromDuration(data);
        }
        return data;
    },
    TransformRowByMeta:function(data,meta){

        if(SAP.Util.getTypeName(data)!="object" && SAP.Util.getTypeName(data)!="[]")
        {//for simpleArray situation,we should process it on the upper level
            return ;
        }
        if(!meta.columns || !meta.columns.length)
            return ;
        var isOData=false;;
        if(data.__metadata!=undefined)
            isOData=true;
        for (var key in data) {
            for(var j=0;j<meta.columns.length;j++)
            {
                if(meta.columns[j].name===key)
                {
                    if(meta.columns[j].type!=="object" && meta.columns[j].type!=="[]" )
                    {
                        data[key]=this.getTransformedSimpleData(data[key],meta.columns[j].type,isOData);
//                        if(meta.columns[j].type==="number" && SAP.Util.getTypeName(data[key])==="string")
//                            data[key]=Number(data[key]);
//                        if((meta.columns[j].type==="datetime" || meta.columns[j].type==="Date" )&& SAP.Util.isString(data[key]))
//                        {
//                            data[key]=SAP.Util.getDateFromString(data[key]);
//                        }
                        
                    }
                    else 
                        this.TransformDataByMeta(data[key],meta.columns[j]);
                    break;
                }
            }
        }
    },
    TransformDataByMeta:function(data,meta){
        if(!data || !meta)return;
        if(meta.type=="[]" && meta.baseType!="object" && meta.baseType!="[]" && meta.baseType!=undefined/*root service situation*/)
        {// it is a simple array
            if(data.length && data.length > 0)
            {
                for(var i =0;i<data.length;i++){
                    data[i]=this.getTransformedSimpleData(data[i],meta.baseType);
                }
            }
            return;
        }
        if(meta.type!=="object" && meta.type!=="[]" && meta.appid==undefined)
        {
            return;
        }
        if(data.length && data.length > 0)
        {
            for(var i =0;i<data.length;i++){
                this.TransformRowByMeta(data[i],meta);
            }
        }
        else 
        {
            this.TransformRowByMeta(data,meta);
        }
    },
    TransformResultSet:function(dataSourceMeta,patharr,data){

        var columns;
        var node=dataSourceMeta;
        for (var i=0;i<patharr.length;i++)
        {
            var found=false;
            for(var j=0;j<node.columns.length;j++)
            {
                if(node.columns[j].name===patharr[i])
                {
                    node=node.columns[j];
                    found=true;
                    break;
                }
            }
            if(!found)
                return;
        }
        this.TransformDataByMeta(data,node);
    },
    isOData:function(dsType){
        if(dsType.toLowerCase()==="odataservice" || dsType.toLowerCase()==="odataquery" )
            return true;
        else
            return false;
    },
    isODataDataSource:function(ds){
        var name;
        var props = ds.split("|");
        if(props.length>=2)
            name=props[1];
        else
            name=props[0];
        var nodes=name.split(".");
        if(nodes[0].toLowerCase()==="odataservice" || nodes[0].toLowerCase()==="odataquery" )
            return true;
        else
            return false;
    },
	getData: function(ds, paramValues, userName, password, okCallback, errorCallback,start,rows) {
		//var nodes = ds.split(".");
		var dataSourceMeta=SAP.DataSources.getDataSourceMeta(ds/*nodes[1]*/);
        if (dataSourceMeta) {
			userName = userName ? userName : dataSourceMeta.userName;
			password = password ? password : dataSourceMeta.password;
			var url = SAP.DataSources.makeUrl(dataSourceMeta.rootURL, paramValues,undefined,
                        this.isODataDataSource(ds)?start:undefined,this.isODataDataSource(ds)?rows:undefined);
			var that=this;
            SAP.DataSources.getData2(url, userName, password,
				dataSourceMeta.jsonp, dataSourceMeta.proxy,
				function(data) {
					if (okCallback) {
                        var nodes=SAP.DataSources.getColumnsPartFromDataSource(ds);
						var result = data;
						if (nodes.length > 0) {
							result = eval("data." + nodes.join("."));
						}
                        that.TransformResultSet(dataSourceMeta,nodes,result);
						okCallback(result, ds);
					}
				}, errorCallback,dataSourceMeta);
		}
        else{
            var error={};
            error.message="Can not find datasource metadata";
            if(errorCallback)
                errorCallback(error);
        }
	},
	getData2: function(url, userName, password, jsonp, proxy, okCallback, errorCallback,dataSourceMeta) {
		if (SAP.Util.isRelativePath(url)) {
			SAP.DataSources.getData3(url, okCallback, errorCallback);
		} else {
            if(dataSourceMeta && dataSourceMeta.hasPropertiesNotInContent)
            {              
                var root;
                if(dataSourceMeta.metaURL)
                    root=dataSourceMeta.metaURL;
                else{
                    var ind=dataSourceMeta.rootURL.lastIndexOf("/");
                    if(ind>0)
                        root=dataSourceMeta.rootURL.substring(0,ind);
                    else
                        root=dataSourceMeta.rootURL;
                }
                SAP.DataSources.getODataDBMeta(root,
				    userName, password, jsonp, proxy,
				    function(metadata)
                    {	
                	    SAP.DataSources.getOData(
				            url,
				            userName, password, jsonp, proxy,
				            okCallback, errorCallback);
                    }, 				
                    function()
                    {	
                	    SAP.DataSources.getOData(
				            url,
				            userName, password, jsonp, proxy,
				            okCallback, errorCallback);
                    }
                );
             }
             else
             {
                 SAP.DataSources.getOData(
				        url,
				        userName, password, jsonp, proxy,
				        okCallback, errorCallback);
             }

		}
	},
	getData3: function(url, okCallback, errorCallback) {
		SAP.Util.loadFileByProject(url, function(data) {
			try {
				//only support local json file if using relative path in project
                if(data)
                {
				    var result = JSON.parse(data);
				    if (okCallback) {
					    okCallback(result);
				    }
                }
                else
                {
                	if (errorCallback) {
                        var error={message:"Can't find file!"};
                        errorCallback(error);
				    }
                }
			} 
			catch (err) {
				if (errorCallback) {
					errorCallback(err);
				}
			}
		}, errorCallback);
	},

	replaceInvalidDateTime:function(node){
       var replaced=false;
        var props=node.getElementsByTagName("properties");
        for(var i=0;i<props.length;i++)
        {
            for(var j=0;j<props[i].childNodes.length;j++)
            {
                var prop=props[i].childNodes[j];
                if(prop.nodeType===1 && prop.attributes.length>0)
                {
                    for(var k=0 ;k<prop.attributes.length; k++)
                    {
                        var attr=prop.attributes[k];
                        if(attr.localName==="type" && attr.nodeValue==="Edm.DateTime")
                        {
                            if(prop.childNodes.length>0)
                            {
                                var value=prop.childNodes[0].nodeValue;
                                //var parseDateTimeRE = /^(-?\d{4,})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?(?:\.(\d+))?(.*)$/;
                                var parts = SAP.Util.parseDateTimeRE.exec(value);
                                var offset = (parts) ? SAP.Util.getCanonicalTimezone(parts[8]) : null;

                                if (offset!=null && offset !== "Z") {
                                    attr.nodeValue="Edm.DateTimeOffset";
                                    replaced=true;
                                }

                            }
                            break;
                        }
                    }
                }
            }
        }
        return replaced;
    },
	datasourceSubPath : "",
	executeDSQuery: function(name, args, zoomingLevels, okCallback, errorCallback) {
		var props = name.split("|");
		if (props.length < 2) {
			console.log("dataSource format is wrong: " + name);
			return;
		}
		
		var dataSource = props[1];
		var paramValues = SAP.Util.isStringNullOrEmpty(props[2]) ? [] : SAP.DataSources.initParams(props[2]);
		SAP.DataSources.replaceParamValuesByArgs(paramValues, args, zoomingLevels);
		var userName = props[3];
		var password = props[4];
		if (dataSource.indexOf("SMPOData.") == 0) {
			var srcName = dataSource;
			var idx = srcName.indexOf(".");
			if(idx >= 0)
			{
				srcName = dataSource.substr(idx+1);
			}		
			//to handle data like SMPOData.MobiTrans.d| or SMPOData.MobiTrans.result|
			idx = srcName.indexOf(".");
			if(idx >= 0)
			{
				var srcName1 = srcName.substr(0, idx);
				this.datasourceSubPath = srcName.substr(idx+1);
				srcName = srcName1;
			}
			var dataSourceMeta = SAP["SMP"]["getSMPMeta"](srcName);
			//var serverProfile = SAP["SMP"]["getSMPServerProfile"]();
			var rootUrl = dataSourceMeta["rootURL"];
			//to support parameter
			rootUrl=SAP.DataSources.makeUrl(rootUrl,paramValues);
			var smpApplicationID = SAP.SMP.ds.ServerProfile["SMPApplicationID"];
			var smpServer = SAP.SMP.ds.ServerProfile["SMPServer"];
			SAP.SMP.getSMPAppCid(smpApplicationID, smpServer);
			if(SAP.SMP.ds.AppCid && SAP.SMP.ds.AppCid !== ""){
				SAP.SMP.getSMPData(rootUrl, null,
					function(data, response) {
						if (SAP.Util.datasourceSubPath && SAP.Util.datasourceSubPath != "") {
							var props = SAP.Util.datasourceSubPath.split(".");
							var i;
							for(i = 0; i < props.length; i++) {
								data = data[props[i]];
							}
						}
						if (okCallback) {
							okCallback(data, dataSource);
						}
					},
					function(error) {
						if (errorCallback) {
							errorCallback(error);
						}
					});
			}else{
				SAP.SMP.getSMPAppCidAndRead(rootUrl, null, 
					function(data, response) {
						if (SAP.Util.datasourceSubPath && SAP.Util.datasourceSubPath != "") {
							var props = SAP.Util.datasourceSubPath.split(".");
							var i;
							for(i = 0; i < props.length; i++) {
								data = data[props[i]];
							}
						}
						if (okCallback) {
							okCallback(data, dataSource);
						}
					},
					function(error) {
						if (errorCallback) {
							errorCallback(error);
						}
					});
			}
		} else {
			SAP.DataSources.getData(dataSource, paramValues, userName, password, okCallback, errorCallback);
		}
	}
};

SAP.DataSources.Odata = function(enableJsonpCallback, user, password, timeoutMS) {
	this.enableJsonpCallback = enableJsonpCallback;
	if(user) {
		this.user= user;
		
		if(password) {
			this.pwd = password;
		}
		else {
			this.pwd = null;
		}
	}
	if (timeoutMS) {
		this.timeoutMS = timeoutMS;
	}

	this.myHandler = {
		"maxDataServiceVersion": "3.0",
		"read": function(response, context){
			try {
                 if(response && response.body && typeof(response.body)==="string")
                {
                    var xmlDoc = SAP.Util.loadXMLFromString(response.body);
                    var replaced=SAP.DataSources.replaceInvalidDateTime(xmlDoc);
                    if(replaced)
                        response.body=SAP.Util.XMLToString(xmlDoc);
                    //response.body=response.body.replace(/type="Edm.DateTime"/g,"type=\"Edm.DateTimeOffset\"");
                };
				OData["defaultHandler"]["read"](response, context);
			} 
			catch (err) {
				if (typeof(response["body"]) === "string") {
					try {
						response["data"] = { "results": JSON["parse"](response["body"]) };
					} 
					catch (e) {
						throw err;
					}
				} 
				else {
					//response["data"] = { "results": response["body"] };
                    if(response["body"].value!=undefined && response["body"]["odata.metadata"])
                    {
                        response["data"] = { "results": response["body"].value ,"odata.metadata":response["body"]["odata.metadata"]};
                    }
					else
                    {
                        response["data"] = { "results": response["body"] };
                    }
				}
			}
		},
		"write": function(request, context){
			OData["defaultHandler"]["write"](response, context);
		}
	};

	//for smp read/update
	this.myClient = {
		callbackParameterName: "$callback",
        formatQueryString: "$format=json",
        enableJsonpCallback: false,

		request: function (request, success, error) {
			var createXmlHttpRequest = function(){
				/// <summary>Creates a XmlHttpRequest object.</summary>
				/// <returns type="XmlHttpRequest">XmlHttpRequest object.</returns>
				if (window.XMLHttpRequest) {
					return new window.XMLHttpRequest();
				}
				var exception;
				if (window.ActiveXObject) {
					try {
						return new window.ActiveXObject("Msxml2.XMLHTTP.6.0");
					} catch (_) {
						try {
							return new window.ActiveXObject("Msxml2.XMLHTTP.3.0");
						} catch (e) {
							exception = e;
						}
					}
				} else {
					exception = { message: "XMLHttpRequest not supported" };
				}
				throw exception;
			};
			
			var readResponseHeaders = function(xhr, headers) {
				/// <summary>Reads response headers into array.</summary>
				/// <param name="xhr" type="XMLHttpRequest">HTTP request with response available.</param>
				/// <param name="headers" type="Array">Target array to fill with name/value pairs.</param>
								
				var responseHeaders = xhr.getAllResponseHeaders().split(/\r?\n/);
				var i, len;
				for (i = 0, len = responseHeaders.length; i < len; i++) {
					if (responseHeaders[i]) {
						var header = responseHeaders[i].split(": ");
						headers[header[0]] = header[1];
					}
				}
			};
		
			var result = {};
            var xhr = null;
            var done = false;
			
			result.abort = function () {
                done = true;
                if (xhr) {
                    xhr.abort();
                    xhr = null;
                }
                error({ message: "Request aborted" });
            };
			
			var handleTimeout = function () {
                if (!done) {
                    done = true;
                    xhr = null;
                    error({ message: "Request timed out" });
                }
            };
			
			var name;
            var url = request.requestUri;
			xhr = createXmlHttpRequest();
			xhr.onreadystatechange = function () {
				if (done || xhr === null || xhr.readyState !== 4) {
					return;
				}

				// Workaround for XHR behavior on IE.
				var statusText = xhr.statusText;
				var statusCode = xhr.status;
				if (statusCode === 1223) {
					statusCode = 204;
					statusText = "No Content";
				}

				var headers = [];
				readResponseHeaders(xhr, headers);

				var response = { requestUri: url, statusCode: statusCode, statusText: statusText, headers: headers, body: xhr.responseText };

				done = true;
				xhr = null;
				if (statusCode >= 200 && statusCode <= 299) {
					success(response);
				} else {
					error({ message: "HTTP request failed", request: request, response: response });
				}
			};
			
			xhr.open(request.method || "GET", url, true, request.user, request.password);
			xhr.withCredentials = true;
			// Set the name/value pairs.
			if (request.headers) {
				for (name in request.headers) {
					xhr.setRequestHeader(name, request.headers[name]);
				}
			}
			// Set the timeout if available.
			if (request.timeoutMS) {
				xhr.timeout = request.timeoutMS;
				xhr.ontimeout = handleTimeout;
			}
			xhr.send(request.body);
			
			return result;
		}
	};
	
	this.read = function(url, success, error) {
		var request = {"headers" : {'accept': 'application/json'},
						"requestUri" : url
						};
		if (this.user) {
			request.user = this.user;
			request.password = this.pwd;
			request.headers.authorization = "Basic " + btoa(this.user + ":" + this.pwd);
		}
		if (this.timeoutMS) {
			request.timeoutMS = this.timeoutMS;
		}
		this.request(request, success, error, this.myHandler);
	};
	
	this.request = function(request, success, error, handler, myClient) {
		if (this.enableJsonpCallback) {
			OData["defaultHttpClient"]["enableJsonpCallback"] = true;
		}else{
			OData["defaultHttpClient"]["enableJsonpCallback"] = false;
		}

		OData["request"](request,
				function(data, response){
                    if(data==undefined)
                    {
                        if(error)
                        {
                            var err={};
                            err.message="Can't get response";
                            error(err);
                        }
                        return;
                    }
					if(success)	{
						success(data["results"] == undefined ? data : data["results"], response);
					}
				},
				function(err){
					if(error) {
						error(err);
					}
				},
				handler, myClient);
	};
	
	this.updateRequest = function(request, success, error, myClient) {
		OData["defaultHttpClient"]["enableJsonpCallback"] = false;
		OData["request"](request,
				function(data){
					if(success)	{
						success(data);
					}
				},
				function(err){
					if(error) {
						error(err);
					}
				}, undefined, myClient);
	};
	
	this.update = function(url, batchData, success, error) {
		OData["defaultHttpClient"]["enableJsonpCallback"] = false;
		if(this.user){
			OData["request"]({"requestUri" : url,
						"user": this.user,
						"password": this.pwd,
						"method": "POST",
						"data": batchData
						},
					function(data, response){
						if(success){
							success(data,response);
						}
					},
					function(err){
						if(error){
							error(err);
						}
					},
					OData["batchHandler"]);
		}
		else {
			OData["request"]({"requestUri": url,"method": "POST", "data": batchData},
					function(data, response){
						if(success){
							success(data, reponse);
						}
					},
					function(err){
						if(error){
							error(err);
						}
					},
					OData["batchHandler"]);
		}
	};
};

