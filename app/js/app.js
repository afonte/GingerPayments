angular.module('GingerApp', [
  'GingerApp.services',
  'GingerApp.controllers',
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/payments", {templateUrl: "partials/payments.html", controller: "paymentsController"}).
	when("/payment_method", {templateUrl: "partials/payment_method.html", controller: "paymentsController"}).
	when("/add_payment", {templateUrl: "partials/add_payment.html", controller: "addPaymentController"}).
	otherwise({redirectTo: '/payments'});
}]);
