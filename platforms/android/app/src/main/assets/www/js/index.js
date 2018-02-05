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
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    setSocialLogin: function(){
        var log = document.getElementById("log-fcbk");
        if (log) {
            log.addEventListener('click', this.socialLogin.bind(log.id), false);
        }

        log = document.getElementById("log-gpls");
        if (log) {
            log.addEventListener('click', this.socialLogin.bind(log.id), false);
        }

        log = document.getElementById("log-twtr");
        if (log) {
            log.addEventListener('click', this.socialLogin.bind(log.id), false);
        }
    },

    socialLogin: function(target){
        switch (target.currentTarget.id) {
            case "log-fcbk":
                alert('try to log with facebook');
                break;
            case "log-gpls":
                alert('try to log with g plus');
                break;
            case "log-twtr":
                alert('try to log with twitter');
                break;
            default:
                break;
        }
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        //this.receivedEvent('deviceready');
        var rta = document.getElementById("lbl-rta");
        FingerprintAuth.isAvailable(
            function (result) {

                alert("FingerprintAuth available: " + JSON.stringify(result));
    
                // If has fingerprint device and has fingerprints registered
                if (result.isAvailable == true && result.hasEnrolledFingerprints == true) {

                    // Check the docs to know more about the encryptConfig object :)
                    var encryptConfig = {
                        clientId: "myAppName",
                        username: "currentUser",
                        password: "currentUserPassword",
                        maxAttempts: 5,
                        locale: "en_US",
                        dialogTitle: "Hey dude, your finger",
                        dialogMessage: "Put your finger on the device",
                        dialogHint: "No one will steal your identity, promised"
                    }; // See config object for required parameters

                    // Set config and success callback
                    FingerprintAuth.encrypt(encryptConfig, function(_fingerResult){
                        alert("successCallback(): " + JSON.stringify(_fingerResult))
                        if (_fingerResult.withFingerprint) {
                            alert("Successfully encrypted credentials.");
                            alert("Encrypted credentials: " + result.token);  
                        } else if (_fingerResult.withBackup) {
                            alert("Authenticated with backup password");
                        }
                    // Error callback
                    }, function(err){
                        if (err === "Cancelled") {
                            alert("FingerprintAuth Dialog Cancelled!");
                        } else {
                            alert("FingerprintAuth Error: " + err);
                        }
                    });
                }

                if(rta) {
                    rta.innerHTML = "Disponible";
                }
            }, 
            function (message) {
                if(rta) {
                    rta.innerHTML = "No disponible " + message;
                }
            }
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

app.initialize();
app.setSocialLogin();