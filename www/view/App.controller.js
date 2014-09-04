sap.ui.controller("view.App", {
    onInit : function() {
        
        var view = this.getView();

        // remember the App Control
        this.app = view.byId("theApp");
        
        // subscribe to event bus
        var bus = sap.ui.getCore().getEventBus();
        bus.subscribe("nav", "to", this.navToHandler, this);
        bus.subscribe("nav", "back", this.navBackHandler, this);
    },

    navToHandler : function(channelId, eventId, data) {
        if (data && data.id) {
            // Navigate to given page (include bindingContext)
            this.app.to(data.id, data);
        } else {
            jQuery.sap.log.error("nav-to event cannot be processed. Invalid data: " + data);
        }
    },

    navBackHandler : function() {
        this.app.back();
    }
});

