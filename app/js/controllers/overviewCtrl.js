agendaPlannerApp.controller('overviewCtrl', function ($scope,Agenda,ngDragDrop,$location) {
    
    $scope.colorFn = ["#9eb7ff", "#ff9e9e", "#a9ff9e", "#fffe9e"];
    $scope.latestDragPos = 0;
    $scope.latestDragDay = null;
 	$scope.days = Agenda.getDays();
 	$scope.parkedActivities = Agenda.getParkedActivities();
        
    $scope.drag = function(oldDay, oldPosition, dragEl, dropEl){
        $scope.latestDragDay = oldDay;
        $scope.latestDragPos = oldPosition;
    }

    $scope.dropped = function(newDay, newPosition, dragEl, dropEl) {
    Agenda.moveActivity($scope.latestDragDay, $scope.latestDragPos, newDay,newPosition);
    $scope.days = Agenda.getDays();
    $scope.parkedActivities = Agenda.getParkedActivities();
    $scope.$apply();
    }

    $scope.actStartTime = function(index,day) {
        var time = day.getStart();
        time = time.split(":");
        var totalMin = parseInt(time[0]*60) + parseInt(time[1]);

        var acts = day.getActivities()
        for(var i = 0; i < index; i++) {
            totalMin += parseInt(acts[i].getLength());
        }
        //console.log(index + " has total " + totalMin);

        var endhour = Math.floor(totalMin/60);
        var endmin = totalMin % 60;

        if(endhour < 10) {
            endhour = "0" + endhour;
        }
        if(endmin < 10) {
            endmin = "0" + endmin;
        }
        return endhour + ":" + endmin;
    }

 	$scope.getParkedActivities = function() {
 		return Agenda.getParkedActivities();
 	}
    $scope.changeToEditView = function(index,dayIndex){
        $location.path('edit/'+dayIndex+'/'+index);
    }

 	$scope.addDay = function() {
        Agenda.addDay();
 	}
    $scope.removeDay = function(index) {
        Agenda.removeDay(index);
    }
    $scope.removeParkedActivity = function(position) {
        Agenda.removeParkedActivity(position);
    }
    $scope.removeActivity = function(position, dayIndex) {
        Agenda.removeActivity(position, dayIndex);
    }

    $scope.newTime = function(day,timeVal) {
        if (timeVal.indexOf(":") == -1){
            alert("Wrong time format");
        }
        else{
            var time = timeVal.split(":");
            var hour = parseInt(time[0]);
            var min = parseInt(time[1]);

            if( isNaN(hour) || hour > 23 || hour < 0 || isNaN(min) || min > 59 || min < 0){
                alert("Wrong time format, use for example 23:54, hh:mm");
            } 
            else {
                if(time.length > 1) {
                    if(time[1] < 60 && time[1] >= 0) {
                        if(time[1] == "") {
                            day.setStart(parseInt(time[0]),0);
                        } else {
                            day.setStart(parseInt(time[0]),parseInt(time[1]));
                        }
                    } else {
                        day.setStart(parseInt(time[0]),0);
                    }
                } else {
                    day.setStart(parseInt(time[0]),0);
                }
            }
            day._updateActivites();
        }
    }
});