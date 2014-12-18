angular.module('ContactsApp')
  .controller('ListController', function($scope, Contact, $location) {

    // Get all contacts
    $scope.contacts = Contact.query();

    // Control what fields are displayed (later will let user set this)
    $scope.fields = ['firstName', 'lastName'];

    $scope.sort = function(field) {
      $scope.sort.field = field;
      $scope.sort.order = !$scope.sort.order;
    };

    $scope.sort.field = 'firstName';
    $scope.sort.order = false;

    $scope.show = function(id) {
      $location.url('/contact/' + id);
    };

  });