angular.module('GingerApp.payments', []).
    controller('paymentsController', function($scope, $location, $filter, gingerAPIservice) {

        $scope.getPayments = function(){
            gingerAPIservice.getPayments().then(function (response) {
                $scope.payments = response;
            }, function (err) {
                (err);
            });
        }

        $scope.getPayments();

        $scope.showTop20Amount = function(){
            gingerAPIservice.getPayments().then(function (response) {
                $scope.payments = response;
                $scope.payments = $filter('orderBy')($scope.payments, '-amount');
                $scope.payments = $filter('limitTo')($scope.payments, '20');
                $location.path("/payments");
            }, function (err) {
                (err);
            });
        }

        $scope.showMerchantGringer = function () {
             gingerAPIservice.getPayments().then(function (response) {
                $scope.payments = response.filter(
                     (item) => item.merchant == 'Ginger'
                );
                $location.path("/payments");
            }, function (err) {
                (err);
            });
        }

        $scope.goToFilterPaymentMethodPage = function (){
            gingerAPIservice.getPayments().then(function (response) {
                $scope.payments = response;
            }, function (err) {
                (err);
            });
            $location.path("/payment_method");
        }

        $scope.payment_method = null;
        $scope.searchFilter = function (payment) {
            if($scope.payment_method != null){
                return payment.method == $scope.payment_method;
            }
        };

        $scope.addPayment = function () {
            $location.path("/add_payment");
        }
    })
   
    