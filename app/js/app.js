var agendaPlannerApp = angular.module('agendaPlanner', ['ngRoute']);

agendaPlannerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html'
      }).
      when('/overview', {
        templateUrl: 'partials/agendaOverview.html'
      }).          
      when('/add', {
        templateUrl: 'partials/addActivity.html',
        controller: 'addActivityCtrl'
      }).      
      otherwise({
        redirectTo: '/home'
      });
  }]);