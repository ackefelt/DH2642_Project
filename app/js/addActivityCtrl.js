agendaPlannerApp.controller('addActivityCtrl', 
	function ($scope, AgendaModel) {

	$scope.submit = function() {
		var act = $scope.activity;
		if(activity) {
			var i = AgendaModel.getParkedActivities().length;
			AgendaModel.addParkedActivity(new Activity(act.name, act.length, act.type, act.description), i);
		}
		/*
		console.log(AgendaModel.getParkedActivities()[i].getName());
		console.log(AgendaModel.getParkedActivities()[i].getLength());		
		console.log(AgendaModel.getParkedActivities()[i].getTypeId());
		console.log(AgendaModel.getParkedActivities()[i].getType());
		console.log(AgendaModel.getParkedActivities()[i].getDescription());
		*/
	}
});