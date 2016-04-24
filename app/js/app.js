var agendaPlannerApp = angular.module('agendaPlanner', ['ngRoute','ngResource','ngDragDrop','lvl.directives.dragdrop','firebase']);

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