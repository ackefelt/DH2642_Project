agendaPlannerApp.controller('overviewCtrl', function ($scope,Agenda) {

 	$scope.days = Agenda.getDays();
 	$scope.parkedActivities = Agenda.getParkedActivities();
 	$scope.getDays = function() {
 		return Agenda.getDays();
 	}
 	$scope.getParkedActivities = function() {
 		return Agenda.getParkedActivities();
 	}
});