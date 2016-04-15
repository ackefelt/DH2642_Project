agendaPlannerApp.controller('addActivityCtrl', function ($scope, Agenda) {

	$scope.submit = function() {
		var act = $scope.activity;
		if(activity) {
			var i = Agenda.getParkedActivities().length;
			Agenda.addParkedActivity(new Activity(act.name, act.length, act.type, act.description), i);
		}
		console.log(Agenda.getParkedActivities());
		console.log(Agenda.getParkedActivities()[0].getName());
		/*
		console.log(AgendaModel.getParkedActivities()[i].getName());
		console.log(AgendaModel.getParkedActivities()[i].getLength());		
		console.log(AgendaModel.getParkedActivities()[i].getTypeId());
		console.log(AgendaModel.getParkedActivities()[i].getType());
		console.log(AgendaModel.getParkedActivities()[i].getDescription());
		*/
	}
});