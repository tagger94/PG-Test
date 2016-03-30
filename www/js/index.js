/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        
        this.success = function(message) {
            alert(message);
        }

        this.failure = function() {
            alert("Error calling CordovaStepCounter Plugin");
        }
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        

        // Start the step counter
        // startingOffset will be added to the total steps counted in this session.
        // ie. say you have already recorded 150 steps for a certain activity, then
        // the step counter records 50. The getStepCount method will then return 200.
        var startingOffset = 0;
        stepcounter.start(startingOffset, success, failure);

        // Stop the step counter
        stepcounter.stop(success, failure);

        // Get the amount of steps for today (or -1 if it no data given)
        stepcounter.getTodayStepCount(success, failure);

        // Get the amount of steps since the service is started (it is actually reseted to 0 when the service is killed by the system)
        stepcounter.getStepCount(success, failure);

        // Returns true/false if Android device is running >API level 19 && has the step counter API available
        stepcounter.deviceCanCountSteps(success, failure);

        // Get the step history (JavaScript object)
        // sample result :
        //{
        //  "2015-01-01":{"offset": 123, "steps": 456},
        //  "2015-01-02":{"offset": 579, "steps": 789}
        //  ...
        //}
        stepcounter.getHistory(
            function(historyData) {
                success(historyData);
            },
            failure
        );
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
