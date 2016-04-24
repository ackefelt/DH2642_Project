// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
agendaPlannerApp.factory('Agenda',function($resource,$rootScope){
	this.firebase = new Firebase('https://89385.firebaseio.com/');
	this.days = [];
	this.parkedActivities = [];

    this.getFirebase = function (callback) {
        this.firebase.once("value", function (snapshot) {
            return callback(snapshot.val())
        });
    }

	// Load day and activity data from firebase.
    this.loadFirebase = function (ref) {
        var mycallback = function (snap) {
            if(snap != undefined){
            if (snap.dayp != undefined) {
                for (var i = 0; i < snap.dayp.length; i++) {
                    ref.addParkedActivity(new Activity(snap.dayp[i].name, snap.dayp[i].length, snap.dayp[i].typeid, snap.dayp[i].description), i + 1)
                }
            }
            if (snap.day1 != undefined) {
                for (var i = 0; i < snap.day1.length; i++) {
                    if (i == 0)
                        ref.addDay();
                    ref.addActivity(new Activity(snap.day1[i].name, snap.day1[i].length, snap.day1[i].typeid, snap.day1[i].description), 0, i)
                }
            }
            if (snap.day2 != undefined) {
                for (var i = 0; i < snap.day2.length; i++) {
                    if (i == 0)
                        ref.addDay();
                    ref.addActivity(new Activity(snap.day2[i].name, snap.day2[i].length, snap.day2[i].typeid, snap.day2[i].description), 1, i)
                }
            }
            if (snap.day3 != undefined) {
                for (var i = 0; i < snap.day3.length; i++) {
                    if (i == 0)
                        ref.addDay();
                    ref.addActivity(new Activity(snap.day3[i].name, snap.day3[i].length, snap.day3[i].typeid, snap.day3[i].description), 2, i)
                }
            }
            if (snap.day4 != undefined) {
                for (var i = 0; i < snap.day4.length; i++) {
                    if (i == 0)
                        ref.addDay();
                    ref.addActivity(new Activity(snap.day4[i].name, snap.day4[i].length, snap.day4[i].typeid, snap.day4[i].description), 3, i)
                }
            }
            if (snap.day5 != undefined) {
                for (var i = 0; i < snap.day5.length; i++) {
                    if (i == 0)
                        ref.addDay();
                    ref.addActivity(new Activity(snap.day5[i].name, snap.day5[i].length, snap.day5[i].typeid, snap.day5[i].description), 4, i)
                }
            }
        	}
        $rootScope.$apply();
    }
    this.getFirebase(mycallback)
	}
	this.loadFirebase(this);
	
	// adds a new day. if startH and startM (start hours and minutes)
	// are not provided it will set the default start of the day to 08:00
	this.addDay = function (startH,startM) {
		var day;
		if(startH){
			day = new Day(startH,startM,this.days.length);
		} else {
			day = new Day(8,0, this.days.length);
		}
		this.days.push(day);
		return day;
	};

    // add an activity to model
    this.addActivity = function (activity, dayIndex, position) {  	
	        if (dayIndex !== null) {
	        	try{       		        	
	            this.days[dayIndex]._addActivity(activity, null);
	        	}
	        	catch(TypeError){
	        		console.log("TypeError");
	        	}
	        } else {
	            this.parkedActivities.push(activity);	            
	        }
    };

	// add an activity to parked activities
	this.addParkedActivity = function(activity,position){
		this.addActivity(activity,null,position);
		this.updateParkedActivitiesOnFirebase();
	};

	// Push parkedActivities to Firebase.
    this.updateParkedActivitiesOnFirebase = function () {   
        var parkedJSON = [];
        for (var i = 0; i < this.parkedActivities.length; i++)
            parkedJSON.push(this.parkedActivities[i].JSON())
        this.firebase.update({
            dayp: parkedJSON
        })
    }

	// return parked activities
	this.getParkedActivities = function () {
        return this.parkedActivities;

    };
    // return array of days
    this.getDays = function () {
    	return this.days;
    }

   	// remove an activity on provided position from parked activites 
	this.removeParkedActivity = function(position) {
        var activity = this.parkedActivities[position];
        this.parkedActivities.splice(position, 1);
        this.updateParkedActivitiesOnFirebase();
        return activity;
	};

	// moves activity between the days, or day and parked activities.
	// to park activity you need to set the new day to null
	// to move a parked activity to let's say day 0 you set oldday to null
	// and new day to 0
	this.moveActivity = function(oldday, oldposition, newday, newposition) {
		if(oldday !== null && oldday == newday) {
			this.days[oldday]._moveActivity(oldposition,newposition);
		}else if(oldday == null && newday == null) {
			var activity = this.removeParkedActivity(oldposition);
			this.addParkedActivity(activity,newposition);
		}else if(oldday == null) {
			var activity = this.removeParkedActivity(oldposition);
			this.days[newday]._addActivity(activity,newposition);
		}else if(newday == null) {
			var activity = this.days[oldday]._removeActivity(oldposition);
			this.addParkedActivity(activity,newposition);
		} else {
			var activity = this.days[oldday]._removeActivity(oldposition);
			this.days[newday]._addActivity(activity,newposition);
		}
	};

	return this;
});

// This is an activity constructor
// When you want to create a new activity you just call
// var act = new Activity("some activity",20,1,"Some description);
function Activity(name,length,typeid,description){
	var _name = name;
	var _length = length;
	var _typeid = typeid;
	var ActivityType = ["Presentation","Group Work","Discussion","Break"]
	var _description = description;
	
	// sets the name of the activity
	this.setName = function(name) {
		_name = name;
		//model.notifyObservers();
	}

	// get the name of the activity
	this.getName = function(name) {
		return _name;
	}
	
	// sets the length of the activity
	this.setLength = function(length) {
		_length = length;
		//model.notifyObservers();
	}

	// get the name of the activity
	this.getLength = function() {
		return _length;
	}
	
	// sets the typeid of the activity
	this.setTypeId = function(typeid) {
		_typeid = typeid;
		//model.notifyObservers();
	}

	// get the type id of the activity
	this.getTypeId = function() {
		return _typeid;
	}
	
	// sets the description of the activity
	this.setDescription = function(description) {
		_description = description;
		//model.notifyObservers();
	}

	// get the description of the activity
	this.getDescription = function() {
		return _description;
	}
	
	// This method returns the string representation of the
	// activity type.
	this.getType = function () {
		return ActivityType[_typeid];
	};

	// Return object as JSON object
	//{ name: _name, length: _length, typeid: _typeid, description: _description })
    this.JSON = function () {     
        if (_name == undefined)
            _name = " ";
        if (_length == undefined)
            _length = 0;
        if (_typeid == undefined)
            _typeid = 0;
        if (_description == undefined) {
            _description = " ";
        }
        return { name: _name, length: _length, typeid: _typeid, description: _description };
    }
}

// This is a day consturctor. You can use it to create days, 
// but there is also a specific function in the Model that adds
// days to the model, so you don't need call this yourself.
function Day(startH,startM,dayID) {
	this.firebase = new Firebase('https://89385.firebaseio.com/');
	this._start = startH * 60 + startM;
	this._activities = [];
	this._index = dayID;
	this.colorFn = ["#9eb7ff", "#ff9e9e", "#a9ff9e", "#fffe9e"];

	// sets the start time to new value
	this.setStart = function(startH,startM) {
		this._start = startH * 60 + startM;
	}

	this.getColor = function() {
        if(this.getTotalLength() == 0) {
            return 0;
        }

        var totalPercentage = 0;
        var testColors = "";

        for(var i = 0; i < 4; i++) {
            if(this.getLengthByType(i)/this.getTotalLength() > 0) {
                if(i == 1 || i == 2) {
                    testColors += this.colorFn[i] + " " + (totalPercentage+1) + "%, ";
                }
                if(i != 3) {
                    totalPercentage += parseInt(Math.round(100*(this.getLengthByType(i)/this.getTotalLength())));
                    testColors += this.colorFn[i] + " " + totalPercentage + "%, ";
                }
                if(i == 3) {
                    totalPercentage++;
                    testColors += this.colorFn[i] + " " + totalPercentage + "%";
                }
            }
        }
        return testColors;
    }

	//sets index of the day
	this.setIndex = function (index) {
		this._index = index;
	}
	this.getIndex = function(){
		return this._index;
	}
	// returns the total length of the acitivities in 
	// a day in minutes
	this.getTotalLength = function () {
		var totalLength = 0;
		$.each(this._activities,function(index,activity){
			totalLength += activity.getLength();
		});
		return totalLength;
	};
	
	// returns the string representation Hours:Minutes of 
	// the end time of the day
	this.getEnd = function() {
		var end = this._start + this.getTotalLength();
		var endhour = Math.floor(end/60);
		var endmin = end % 60;

		if(endhour < 10) {
			endhour = "0" + endhour;
		}
		if(endmin < 10) {
			endmin = "0" + endmin;
		}
		return endhour + ":" + endmin;
	};
	
	// returns the string representation Hours:Minutes of 
	// the start time of the day
	this.getStart = function() {
		var endhour = Math.floor(this._start/60);
		var endmin = this._start % 60;

		if(endhour < 10) {
			endhour = "0" + endhour;
		}
		if(endmin < 10) {
			endmin = "0" + endmin;
		}
		return endhour + ":" + endmin;
		//return Math.floor(this._start/60) + ":" + this._start % 60;
	};

	this.getActivities = function() {
		return this._activities;
	};
	
	// returns the length (in minutes) of activities of certain type
	this.getLengthByType = function (typeid) {
		var length = 0;
		$.each(this._activities,function(index,activity){
			if(activity.getTypeId() == typeid){
				length += activity.getLength();
			}
		});
		return length;
	};
	
	// adds an activity to specific position
	// if the position is not provided then it will add it to the 
	// end of the list
	this._addActivity = function(activity,position){
		if(position != null){
			this._activities.splice(position,0,activity);
		} else {
			this._activities.push(activity);
		}
		this._updateActivites();  
	};
	
	// removes an activity from specific position
	// this method will be called when needed from the model
	// don't call it directly
    this._removeActivity = function (position) {
        var activity = this._activities[position];       
        this._activities.splice(position, 1);
        this._updateActivites();     
        return activity;        
    };
	// moves activity inside one day
	// this method will be called when needed from the model
	// don't call it directly
	this._moveActivity = function(oldposition,newposition) {
		if(newposition > oldposition && newposition < this._activities.length - 1) {
			newposition--;
		}
		var activity = this._removeActivity(oldposition);
		this._addActivity(activity, newposition);
		this._updateActivites();  
	};
    //Push activity updates to Firebase
    this._updateActivites = function () {
        var activitiesJSON = [];
        for (var i = 0; i < this._activities.length; i++) {
            activitiesJSON.push(this._activities[i].JSON())
        }
        if (this._index == 0)
            this.firebase.update({
                day1: activitiesJSON
            });
        if (this._index == 1)
            this.firebase.update({
                day2: activitiesJSON
            });
        if (this._index == 2)
            this.firebase.update({
                day3: activitiesJSON
            });
        if (this._index == 3)
            this.firebase.update({
                day4: activitiesJSON
            });
        if (this._index == 4)
            this.firebase.update({
                day5: activitiesJSON
            });

    }
}