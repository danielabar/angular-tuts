angular.module('ContactsApp', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/contacts', {
        controller: 'ListController',
        templateUrl: 'views/list.html'
      });

      // So we don't get ugly hash bang in urls
      $locationProvider.html5Mode(true);
  });
