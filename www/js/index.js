/*global stepcounter*/

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listeners
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    onDeviceReady: function() {

        //Start Counter with offset of last time
        stepcounter.start(window.localStorage.stepcount, function() {
            console.log("Step Started");
        }, function() {
            console.log("Failed to start Step");
        });
    },
};

app.initialize();
