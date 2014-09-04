SAP.DataSources.ds = 
{
	"odata": [],
	"odataService": [],
	"odataQuery": [],
	"restful": [
		{
			"name": "Levels",
			"rootURL": "http://i-am-mean.herokuapp.com/api/levels",
			"type": "[]",
			"jsonp": false,
			"proxy": true,
			"userName": "",
			"password": "{\"iv\":\"iztyMPpkF7mcEJyoW6/ssw\",\"v\":1,\"iter\":1000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"1UnCoHWceB4\",\"ct\":\"u9WrN4TPBBc\"}",
			"params": [],
			"columns": [
				{
					"name": "user",
					"type": "object",
					"columns": [
						{
							"name": "displayName",
							"type": "string"
						},
						{
							"name": "_id",
							"type": "string"
						}
					]
				},
				{
					"name": "_id",
					"type": "string"
				},
				{
					"name": "created",
					"type": "datetime"
				},
				{
					"name": "sections",
					"type": "[]",
					"columns": [
						{
							"name": "name",
							"type": "string"
						},
						{
							"name": "order",
							"type": "number"
						},
						{
							"name": "questions",
							"type": "[]",
							"columns": [
								{
									"name": "user",
									"type": "object",
									"columns": [
										{
											"name": "displayName",
											"type": "string"
										},
										{
											"name": "_id",
											"type": "string"
										}
									]
								},
								{
									"name": "_id",
									"type": "string"
								},
								{
									"name": "created",
									"type": "datetime"
								},
								{
									"name": "correctAnswer",
									"type": "number"
								},
								{
									"name": "answer4",
									"type": "string"
								},
								{
									"name": "answer3",
									"type": "string"
								},
								{
									"name": "answer2",
									"type": "string"
								},
								{
									"name": "answer1",
									"type": "string"
								},
								{
									"name": "prompt",
									"type": "string"
								},
								{
									"name": "name",
									"type": "string"
								}
							],
							"baseType": "object"
						}
					],
					"baseType": "object"
				},
				{
					"name": "order",
					"type": "number"
				},
				{
					"name": "name",
					"type": "string"
				}
			],
			"baseType": "object"
		}
	],
	"file": [
		{
			"name": "APBDemo",
			"rootURL": "model/Data.json",
			"jsonp": false,
			"proxy": true,
			"type": "[]",
			"userName": "",
			"password": "{\"iv\":\"LZ7anf1tJhqiWmX932Zl0w\",\"v\":1,\"iter\":1000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"1UnCoHWceB4\",\"ct\":\"ZTpxeTOq5zA\"}",
			"params": [],
			"columns": [
				{
					"name": "id",
					"type": "number"
				},
				{
					"name": "name",
					"type": "string"
				},
				{
					"name": "Salary",
					"type": "number"
				},
				{
					"name": "Gender",
					"type": "boolean"
				}
			]
		},
		{
			"name": "Employees",
			"rootURL": "model/employee.json",
			"type": "[]",
			"jsonp": false,
			"proxy": true,
			"userName": "",
			"password": "{\"iv\":\"XO/kZo8fp+hEF6VitcfyMQ\",\"v\":1,\"iter\":1000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"1UnCoHWceB4\",\"ct\":\"9KE7gbNsZBI\"}",
			"params": [],
			"columns": [
				{
					"name": "empid",
					"type": "number"
				},
				{
					"name": "fname",
					"type": "string"
				},
				{
					"name": "lname",
					"type": "string"
				},
				{
					"name": "Gender",
					"type": "string"
				},
				{
					"name": "sdate",
					"type": "string"
				},
				{
					"name": "salary",
					"type": "string"
				},
				{
					"name": "status",
					"type": "string"
				}
			],
			"baseType": "object"
		}
	],
	"proxyPath": "/proxy/{url}/?user={user}&password={password}"
};
	//SMP data sources
SAP.SMP.ds = 
{
	"ServerProfile": {
		"SMPServer": "https://smp-p1940805557trial.hanatrial.ondemand.com",
		"SMPApplicationID": "firstApp",
		"SMPApplicationTag": "mySecurity",
		"AllowAnonymous": false,
		"NONXHRCredentials": false,
		"UserName": "p1940805557",
		"Password": "{\"iv\":\"212lLxjooOe+d8eJZu8wpA\",\"v\":1,\"iter\":1000,\"ks\":128,\"ts\":64,\"mode\":\"ccm\",\"adata\":\"\",\"cipher\":\"aes\",\"salt\":\"1UnCoHWceB4\",\"ct\":\"6Kz9nD29+8uDNGWo2ap7uAE\"}"
	},
	"AppCid": "",
	"SMPOData": [
		{
			"name": "ContactPersonCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/ContactPersonCollection",
			"type": "[]",
			"columns": [
				{
					"name": "AddressTypeCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "AddressKey",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "FullName",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "Title",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "BusinessPartnerKey",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "LanguageCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "CountryCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "NickName",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "Building",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "PostalCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "LastName",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ContactKey",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "City",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "GenderText",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "Initials",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "FirstName",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "LanguageText",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "Street",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "EmailAddress",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "MiddleName",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "FaxNumber",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "AddressTypeText",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "TelephoneNumber",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "GenderCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "CountryText",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "BusinessPartnerCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/BusinessPartnerCollection",
			"type": "[]",
			"columns": [
				{
					"name": "Address",
					"type": "object",
					"originalType": "gwdemo.Address",
					"columns": [
						{
							"name": "Street",
							"type": "string",
							"originalType": "Edm.String"
						},
						{
							"name": "City",
							"type": "string",
							"originalType": "Edm.String"
						},
						{
							"name": "AddressTypeCode",
							"type": "string",
							"originalType": "Edm.String"
						},
						{
							"name": "PostalCode",
							"type": "string",
							"originalType": "Edm.String"
						},
						{
							"name": "CountryText",
							"type": "string",
							"originalType": "Edm.String"
						},
						{
							"name": "Building",
							"type": "string",
							"originalType": "Edm.String"
						},
						{
							"name": "AddressTypeText",
							"type": "string",
							"originalType": "Edm.String"
						},
						{
							"name": "CountryCode",
							"type": "string",
							"originalType": "Edm.String"
						},
						{
							"name": "AddressKey",
							"type": "string",
							"originalType": "Edm.String"
						}
					]
				},
				{
					"name": "BusinessPartnerID",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "Company",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "BusinessPartnerRoleText",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "BusinessPartnerKey",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "CurrencyText",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "WebAddress",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "BusinessPartnerRoleCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "FaxNumber",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "LegalForm",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "EmailAddress",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "TelephoneNumber",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "CurrencyCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "CountryCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "GenderCode",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "AddressTypeCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/AddressTypeCollection",
			"type": "[]",
			"columns": [
				{
					"name": "AddressTypeCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "AddressTypeText",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "BusinessPartnerRoleCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/BusinessPartnerRoleCollection",
			"type": "[]",
			"columns": [
				{
					"name": "BusinessPartnerRoleCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "BusinessPartnerRoleText",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "GenderCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/GenderCollection",
			"type": "[]",
			"columns": [
				{
					"name": "GenderCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "GenderText",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "CountryCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/CountryCollection",
			"type": "[]",
			"columns": [
				{
					"name": "CountryCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "CountryText",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "LanguageCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/LanguageCollection",
			"type": "[]",
			"columns": [
				{
					"name": "LanguageCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "LanguageText",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "ProductCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/ProductCollection",
			"type": "[]",
			"columns": [
				{
					"name": "ProductName",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ChangedAt",
					"type": "datetime",
					"originalType": "Edm.DateTime"
				},
				{
					"name": "TaxTariffText",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ProductID",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "DimensionUnit",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "WeightUnitText",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "UnitPrice",
					"type": "number",
					"originalType": "Edm.Decimal"
				},
				{
					"name": "ProductKey",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "WeightMeasure",
					"type": "number",
					"originalType": "Edm.Decimal"
				},
				{
					"name": "ProductWidth",
					"type": "number",
					"originalType": "Edm.Decimal"
				},
				{
					"name": "DimensionUnitText",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "SupplierID",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ProductDescription",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ProductCategory",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "TaxTariffCode",
					"type": "number",
					"originalType": "Edm.Byte"
				},
				{
					"name": "QuantityUnit",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ProductTypeCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "QuantityUnitText",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "WeightUnitCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "SupplierName",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "CurrencyCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ProductHeight",
					"type": "number",
					"originalType": "Edm.Decimal"
				},
				{
					"name": "CurrencyText",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ProductDepth",
					"type": "number",
					"originalType": "Edm.Decimal"
				},
				{
					"name": "SupplierGuid",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "ConversionFactorCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/ConversionFactorCollection",
			"type": "[]",
			"columns": [
				{
					"name": "SourceUnitCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "TargetUnitCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ProductKey",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "SourceUnitText",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "Numerator",
					"type": "number",
					"originalType": "Edm.Int32"
				},
				{
					"name": "ConversionFactorKey",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "TargetUnitText",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "Denominator",
					"type": "number",
					"originalType": "Edm.Int32"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "TariffCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/TariffCollection",
			"type": "[]",
			"columns": [
				{
					"name": "TaxTariffCode",
					"type": "number",
					"originalType": "Edm.Byte"
				},
				{
					"name": "TariffText",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "WeightUnitCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/WeightUnitCollection",
			"type": "[]",
			"columns": [
				{
					"name": "WeightUnitCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "WeightUnitText",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "DimensionUnitCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/DimensionUnitCollection",
			"type": "[]",
			"columns": [
				{
					"name": "DimensionUnitCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "DimensionUnitText",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "QuantityUnitCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/QuantityUnitCollection",
			"type": "[]",
			"columns": [
				{
					"name": "QuantityUnitCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "QuantityUnitText",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "SourceUnitCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/SourceUnitCollection",
			"type": "[]",
			"columns": [
				{
					"name": "SourceUnitCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "SourceUnitText",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "TargetUnitCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/TargetUnitCollection",
			"type": "[]",
			"columns": [
				{
					"name": "TargetUnitCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "TargetUnitText",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "ProductTypeCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/ProductTypeCollection",
			"type": "[]",
			"columns": [
				{
					"name": "ProductTypeCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ProductTypeText",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "ProductCategoryCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/ProductCategoryCollection",
			"type": "[]",
			"columns": [
				{
					"name": "ProductCategoryCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ProductCategoryText",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "SalesOrderLineItemCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/SalesOrderLineItemCollection",
			"type": "[]",
			"columns": [
				{
					"name": "CurrencyCodeDescription",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "OpportunityItemPosition",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ProductName",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "NetSum",
					"type": "number",
					"originalType": "Edm.Decimal"
				},
				{
					"name": "TotalSum",
					"type": "number",
					"originalType": "Edm.Decimal"
				},
				{
					"name": "SalesOrderItem",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "Currency",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "SalesOrderItemKey",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ProductKey",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ProductID",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "SalesOrderKey",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "Availability",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "Tax",
					"type": "number",
					"originalType": "Edm.Decimal"
				},
				{
					"name": "Note",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "SalesOrderCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/SalesOrderCollection",
			"type": "[]",
			"columns": [
				{
					"name": "SalesOrderID",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "CreatedByEmployeeLastName",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "Status",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ChangedByEmployeeLastName",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ChangedByEmployeeUserID",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "NetSum",
					"type": "number",
					"originalType": "Edm.Decimal"
				},
				{
					"name": "CustomerKey",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "CreatedByEmployeeUserID",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "DeliveryStatus",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "CurrencyCodeDescription",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "StatusDescription",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ChangedByCustomerName",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "CreatedByEmployeeFirstName",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "DeliveryStatusDescription",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "Note",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "CreatedAt",
					"type": "datetime",
					"originalType": "Edm.DateTime"
				},
				{
					"name": "Tax",
					"type": "number",
					"originalType": "Edm.Decimal"
				},
				{
					"name": "TotalSum",
					"type": "number",
					"originalType": "Edm.Decimal"
				},
				{
					"name": "CreatedByCustomerName",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ChangedByEmployeeFirstName",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "ChangedAt",
					"type": "datetime",
					"originalType": "Edm.DateTime"
				},
				{
					"name": "CustomerID",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "CustomerName",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "SalesOrderKey",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "BillingStatus",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "BillingStatusDescription",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "Currency",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"hasPropertiesNotInContent": true,
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "StatusCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/StatusCollection",
			"type": "[]",
			"columns": [
				{
					"name": "StatusCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "StatusDescription",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "DeliveryStatusCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/DeliveryStatusCollection",
			"type": "[]",
			"columns": [
				{
					"name": "DeliveryStatusCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "DeliveryStatusDescription",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "BillingStatusCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/BillingStatusCollection",
			"type": "[]",
			"columns": [
				{
					"name": "BillingStatusCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "BillingStatusDescription",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		},
		{
			"name": "CurrencyCollection",
			"rootURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp/CurrencyCollection",
			"type": "[]",
			"columns": [
				{
					"name": "CurrencyCode",
					"type": "string",
					"originalType": "Edm.String"
				},
				{
					"name": "CurrencyDescription",
					"type": "string",
					"originalType": "Edm.String"
				}
			],
			"metaURL": "https://smp-p1940805557trial.hanatrial.ondemand.com/firstApp"
		}
	]
};
SAP.Util.initSourceInfo();
