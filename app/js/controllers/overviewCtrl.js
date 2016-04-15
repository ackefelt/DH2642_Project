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
 		var newDays = angular.element(document.querySelector('#newDays'));
 		var txt = "<div class='col-md-3 day'>"+
            "<div class='row dayHeader'>"+
                "<div class='col-md-9 dayInfo'>"+
                    "<p>Start time: {{this.getDays()[0].getStart()}} </p>"+
                    "<p>End time: {{this.getDays()[0].getEnd()}} </p>"+
                    "<p>Total length: {{this.getDays()[0].getTotalLength()}} min</p>"+
                "</div>"+
                "<div class='col-md-3 timeAllocatedBox'></div>"+
            "</div>"+
        "<div>"+
            "<div class='row schedule'>"+
                "<a ng-repeat='activity in days[0].getActivities()' {{this.days}} >"+
                "<div class='row breakLine'>"+
                    "<p class='schedule-text'> {{this.activity.getLength()}} min {{this.activity.getName()}} </p>"+
                "</div>"+
                "</a>"+
            "</div>"+
        "</div>";
        newDays.append(txt);
 	}
});