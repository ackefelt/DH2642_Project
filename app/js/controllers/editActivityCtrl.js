agendaPlannerApp.controller('editActivityCtrl', function ($scope, $routeParams, $location,Agenda) {

	console.log($routeParams.day_index);
	if($routeParams.day_index == "parked") {
		$scope.actName = Agenda.parkedActivities[$routeParams.activity_index].getName();
		$scope.actLength = Agenda.parkedActivities[$routeParams.activity_index].getLength();
		$scope.actType = Agenda.parkedActivities[$routeParams.activity_index].getTypeId();
		$scope.actDescription = Agenda.parkedActivities[$routeParams.activity_index].getDescription();	
		}
	else {
		$scope.actName = Agenda.days[$routeParams.day_index]._activities[$routeParams.activity_index].getName();
		$scope.actLength = Agenda.days[$routeParams.day_index]._activities[$routeParams.activity_index].getLength();
		$scope.actType = Agenda.days[$routeParams.day_index]._activities[$routeParams.activity_index].getTypeId();
		$scope.actDescription = Agenda.days[$routeParams.day_index]._activities[$routeParams.activity_index].getDescription();
	
	}

	$scope.submit = function() {
		if(this.actName != null && this.actLength > 0) {
			if($routeParams.day_index == "parked") {
				Agenda.parkedActivities[$routeParams.activity_index].setName(this.actName);
				Agenda.parkedActivities[$routeParams.activity_index].setLength(this.actLength);
				Agenda.parkedActivities[$routeParams.activity_index].setTypeId(this.actType);
				Agenda.parkedActivities[$routeParams.activity_index].setDescription(this.actDescription);
				Agenda.updateParkedActivitiesOnFirebase();
			}
			else{
				Agenda.days[$routeParams.day_index]._activities[$routeParams.activity_index].setName(this.actName);
				Agenda.days[$routeParams.day_index]._activities[$routeParams.activity_index].setLength(this.actLength);
				Agenda.days[$routeParams.day_index]._activities[$routeParams.activity_index].setTypeId(this.actType);
				Agenda.days[$routeParams.day_index]._activities[$routeParams.activity_index].setDescription(this.actDescription);
				Agenda.days[$routeParams.day_index]._updateActivites();
			}
			$location.path('overview'); // path not hash
		}
		else{
			alert("Name and length must be specified.");
		}
		
	}
});