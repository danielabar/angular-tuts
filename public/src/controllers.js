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
  })
  .controller('NewController', function($scope, Contact, $location) {

    // Create an empty Contact resource for user to fill in, note that field types correspond to html5 input types
    $scope.contact = new Contact({
      firstName : ['', 'text'],
      lastName : ['', 'text'],
      email : ['', 'email'],
      homePhone : ['', 'tel'],
      cellPhone : ['', 'tel'],
      birthday : ['', 'date'],
      website : ['', 'url'],
      address : ['', 'text']
    });

    $scope.save = function() {
      if ($scope.newContact.$invalid) {
        $scope.$broadcast('record:invalid');
      } else {
        $scope.contact.$save();
        $location.url('/contacts');
      }
    }
  })
  .controller('SingleController', function($scope, $location, Contact, $routeParams) {
    $scope.contact = Contact.get({ id : parseInt($routeParams.id, 10) });
    $scope.delete = function() {
      $scope.contact.$delete();
      $location.url('/contacts');
    }
  });