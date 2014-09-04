jQuery.sap.declare("Application");
jQuery.sap.require("sap.ui.app.Application");
 
sap.ui.app.Application.extend("Application", {
 
         init : function() {
          },
  
          main : function() {
                  
				// create app view and put to html root element
				var root = this.getRoot();
				var view = sap.ui.htmlview("appView", "view.App");
				SAP.Util.decorateView(view);
				view.placeAt(root);
         }
});