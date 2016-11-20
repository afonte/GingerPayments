angular.module('GingerApp.addPayment', []).
    controller('addPaymentController', function($scope, $location, gingerAPIservice) {
        $scope.payment = {
            method: null,
            amount: null,
            currency: null,
            status: null,
            merchant: null
        }
        
        $scope.submit = function (createPaymentForm) {
            if(createPaymentForm.$valid){
                gingerAPIservice.addPayment(
                {
                    "method": $scope.payment.method,
                    "amount": $scope.payment.amount  * 100,
                    "currency":  $scope.payment.currency,
                    "created" : new Date(),
                    "status" : $scope.payment.status,
                    "merchant" : $scope.payment.merchant
                }
                ).then(function () {
                    $location.path("/payments");
                }, function (err) {
                    (err);
                });
            }
        }
    })