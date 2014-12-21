angular.module('ContactsApp')
  .filter('labelCase', function() {
    return function(input) {
      // putting brackets around [A-Z] makes matches "captured", then they're available as $1
      input = input.replace(/([A-Z])/g, ' $1');
      return input[0].toUpperCase() + input.slice(1);
    }
  });