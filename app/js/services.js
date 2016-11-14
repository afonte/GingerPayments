angular.module('GingerApp.services', [])
  .factory('gingerAPIservice', function($http) {

    var gingerAPI = {};

    gingerAPI.getPayments = function() {
      return $http.get('http://localhost:3000/payments').then(function (response) {
          return response.data;
      });
    }

    gingerAPI.addPayment = function(payment) {
      return $http.post('http://localhost:3000/payments', payment);
    }

    return gingerAPI;
  });