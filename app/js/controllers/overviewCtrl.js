agendaPlannerApp.controller('overviewCtrl', function ($scope,Agenda) {

 	$scope.days = Agenda.getDays();
 	$scope.parkedActivities = Agenda.getParkedActivities();
 	$scope.getDays = function() {
 		return Agenda.getDays();
 	}
 	$scope.getParkedActivities = function() {
 		return Agenda.getParkedActivities();
 	}

 	$scope.addDay = function() {
 		document.getElementById('days2').innerHTML += '<div class="day">'+
                    '<div class="dayHeader">'+
                        '<div class="dayInfo">'+
                            '<p>Start time: <input type="text" name="startTime" value="08:00" style="width: 50px;"></p>'+
                            '<p>End time: --:--</p>'+
                            '<p>Total length: -- min</p>'+
                        '</div>'+
                        '<div class="timeAllocatedBox"></div>'+
                    '</div>'+
                    '<div class="daySchedule">'+
                        '<a ng-repeat="activity in days[0].getActivities()" {{this.days}}>'+
                        //'<div class="breakLine">'+
                        //    '<p class="schedule-text"> -- min x </p>'+
                        //'</div>'+
                        '</a>'+
                    '</div>'+
                '</div>';
 	}
});