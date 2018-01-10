/*
 *  Starter code for University of Waterloo CS349 - Spring 2017 - A3.
 *	Refer to the JS examples shown in lecture for further reference.
 *  Note: this code uses ECMAScript 6.
 *  Updated 2017-07-12.
 */
	
"use strict";

// Get your own API key from https://uwaterloo.ca/api/register
var apiKey = '2805fe2789024aefffa7324cce6f47ee';

(function(exports) {

	/* A Model class */
    class AppModel {
		constructor() {
			this._observers = [];
            this.data = null;
		}

        // You can add attributes / functions here to store the data

        searchUser(){
		    var userId = document.getElementById("userid").value;
		    console.log(userId);
            this.loadData("https://api.uwaterloo.ca/v2/directory/" + userId + ".json");
        }

        // Call this function to retrieve data from a UW API endpoint
        loadData(endpointUrl) {
            var that = this;
            $.getJSON(endpointUrl + "?key=" + apiKey,
                function (data) {
                    // Do something with the data; probably store it
                    // in the Model to be later read by the View.
                    // Use that (instead of this) to refer to the instance 
                    // of AppModel inside this function.
                    that.data = data
                    console.log(that.data);
                    that.notify(); // Notify View(s)
                }
            );
        }
		
		// Add observer functionality to AppModel objects:
		
		// Add an observer to the list
		addObserver(observer) {
            this._observers.push(observer);
            observer.updateView(this, null);
        }
		
		// Notify all the observers on the list
		notify(args) {
            _.forEach(this._observers, function(obs) {
                obs.updateView(this, args);
            });
        }
    }

    /*
     * A view class.
     * model:  the model we're observing
     * div:  the HTML div where the content goes
     */
    class AppView {
		constructor(model, div) {
			this.model = model;
			this.div = div;
			model.addObserver(this); // Add this View as an Observer
		}
		
        updateView(obs, args) {
            // Add code here to update the View
            if(this.model.data != null) {
                document.getElementById("given_name").innerHTML = this.model.data.data.given_name;
                document.getElementById("last_name").innerHTML = this.model.data.data.last_name;
                document.getElementById("department").innerHTML = this.model.data.data.department;
                document.getElementById("email_addresses").innerHTML = this.model.data.data.email_addresses;
                document.getElementById("offices").innerHTML = this.model.data.data.offices;
                document.getElementById("telephone_numbers").innerHTML = this.model.data.data.telephone_numbers;
                document.getElementById("homepage").setAttribute("href", this.model.data.data.homepage);
                document.getElementById("homepage").innerHTML = this.model.data.data.homepage;
            }
        };        
    }

	/*
		Function that will be called to start the app.
		Complete it with any additional initialization.
	*/
    exports.startApp = function() {
        var model = new AppModel();
        var view = new AppView(model, "div#viewContent");
        // Export model
        exports.model = model;
    }

})(window);
