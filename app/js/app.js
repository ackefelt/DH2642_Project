var agendaPlannerApp = angular.module('agendaPlanner', ['ngRoute','ngResource']);

agendaPlannerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html'
      }).
      when('/overview', {
        templateUrl: 'partials/agendaOverview.html',
        controller: 'overviewCtrl'
      }).          
      when('/add', {
        templateUrl: 'partials/addActivity.html',
        controller: 'addActivityCtrl'
      }).      
      otherwise({
        redirectTo: '/home'
      });
  }]);

agendaPlannerApp.directive('overview', function() {
    return {
        restrict: "E",
        template: "<div class='col-md-3 addDay'>" +
                  "<a href='#/overview' data-ng-click='append()' class='btn addDayBtn'>+ Add a day</a>"+
                  "</div>",
        controller: function($scope, $element, $attrs) {
            $scope.append = function() {
              var newDay =   " <div class='col-md-3 day'>" +
        "<div class='row dayHeader'>"+
            "<div class='col-md-9 dayInfo'>"+
            "<p>Start time: {{this.getDays()[0].getStart()}} </p>"+
            "<p>End time: {{this.getDays()[0].getEnd()}} </p>"+
            "<p>Total length: {{this.getDays()[0].getTotalLength()}} min</p>"+
            "</div>"+
            "<div class='col-md-3 timeAllocatedBox'>"+
            "</div>"+
        "</div>"+
    "<div>"+
        "<div class='row schedule'>"+
            "<a ng-repeat='activity in days[0].getActivities()' {{this.days}} >"+
            "<div class='row breakLine'>"+
            "<p class='schedule-text'> {{this.activity.getLength()}} min {{this.activity.getName()}} </p>"+
            "</div>" +
             "</a>" +
        "</div>" +
    "</div>" +
"</div>";
                $element.append(newDay);
            }
        }
    }
});