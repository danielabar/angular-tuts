angular.module('ContactsApp', ['ngRoute', 'ngResource', 'ngMessages'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/contacts', {
        controller: 'ListController',
        templateUrl: 'views/list.html'
      })
      .when('/contact/new', {
        controller: 'NewController',
        templateUrl: 'views/new.html'
      })
      .when('/contact/:id', {
        controller: 'SingleController',
        templateUrl: 'views/single.html'
      })
      .when('/settings', {
        controller: 'SettingsController',
        templateUrl: 'views/settings.html'
      })
      .otherwise({
        redirectTo: '/contacts'
      });

      // So we don't get ugly hash bang in urls
      $locationProvider.html5Mode(true);
  })
  .value('options', {})

  // run block runs immediately when application is started (runs only once?)
  .run(function(options, Fields) {
    Fields.get().success(function(data) {
      options.displayed_fields = data;
    });
  })
