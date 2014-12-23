angular.module('ContactsApp')
  .filter('labelCase', function() {
    return function(input) {
      // putting brackets around [A-Z] makes matches "captured", then they're available as $1
      input = input.replace(/([A-Z])/g, ' $1');
      return input[0].toUpperCase() + input.slice(1);
    }
  })
  // Sample usage   ng-repeat='(k,v) in contact | keyFilter: "firstName" '
  // Where contact is the obj and firstName is the query
  .filter('keyFilter', function() {
    return function(obj, query) {
      var result = {};
      angular.forEach(obj, function(val, key) {
        if (key !== query) {
          result[key] = val;
        }
      });
      return result;
    }
  });