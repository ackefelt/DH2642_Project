agendaPlannerApp.controller('addActivityCtrl', function ($scope, $location,$routeParams,Agenda) {

	$scope.submit = function() {
		var act = $scope.activity;
		if(activity) {
			if(act.name != null && act.length > 0) {
				var i = Agenda.getParkedActivities().length;
				Agenda.addParkedActivity(new Activity(act.name, act.length, act.type, act.description), i);
				$location.path('overview'); // path not hash
			}
			else{
				alert("Name and length must be specified.");
			}
		}
	}
});