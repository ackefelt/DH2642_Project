agendaPlannerApp.controller('addActivityCtrl', function ($scope, Agenda) {

	$scope.submit = function() {
		var act = $scope.activity;
		if(activity) {
			var i = Agenda.getParkedActivities().length;
			Agenda.addParkedActivity(new Activity(act.name, act.length, act.type, act.description), i);
		}
	}
});