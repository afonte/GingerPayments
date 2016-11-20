angular.module('GingerApp', [
  'GingerApp.services',
  'GingerApp.payments',
  'GingerApp.addPayment',
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/payments", {templateUrl: "partials/payments.html"}).
	when("/payment_method", {templateUrl: "partials/payment_method.html", controller: "paymentsController"}).
	when("/add_payment", {templateUrl: "partials/add_payment.html", controller: "addPaymentController"}).
	otherwise({redirectTo: '/payments'});
}]);

