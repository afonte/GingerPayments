'use strict';

describe('Controller: paymentsController', function () {

  var $rootScope;
  var $q;
  var $filter;
  var $location;
  var $scope;
  var gingerAPIservice;
  var data;
  var controller;

  beforeEach(angular.mock.module('GingerApp'));
  beforeEach(inject(function (_$rootScope_, _$controller_, _$q_, _$filter_, _$location_, _gingerAPIservice_) {
      $rootScope = _$rootScope_;
      $q = _$q_;
      $filter = _$filter_;
      $location = _$location_;
      gingerAPIservice = _gingerAPIservice_;

      data = 
      [
        {
          "id": 499,
          "method": "bank-transfer",
          "amount": 7437,
          "currency": "GBP",
          "created": "Fri Jan 16 1970 04:43:24 GMT+0100 (CET)",
          "status": "denied",
          "merchant": "Webshop Yoda"
        },
        {
          "id": 495,
          "method": "ideal",
          "amount": 9038,
          "currency": "EUR",
          "created": "Wed Jan 20 1988 21:08:13 GMT+0100 (CET)",
          "status": "accepted",
          "merchant": "Ginger"
        }
      ];

      var getPaymentsPromise = $q.defer();
      getPaymentsPromise.resolve(data);
      spyOn(gingerAPIservice, 'getPayments').andReturn(getPaymentsPromise.promise);
      spyOn($location, 'path');

      $scope = {};
      controller = _$controller_('paymentsController', {
        $scope: $scope,
        $location: $location,
        $filter: $filter,
        gingerAPIservice: gingerAPIservice
    });
  }));

  it('should return a list of payments descending order by amount', function () {
    $scope.showTop20Amount();
    $rootScope.$apply();

    expect(gingerAPIservice.getPayments).toHaveBeenCalled();
    expect($scope.payments.length).toBe(2);
    expect($scope.payments[0].amount).toBe(9038);
    expect($scope.payments[1].amount).toBe(7437);
    expect($location.path).toHaveBeenCalledWith('/payments');
  });

  it('should return a list of payments with merchant ginger', function () {
    $scope.showMerchantGringer();
    $rootScope.$apply();

    expect(gingerAPIservice.getPayments).toHaveBeenCalled();
    expect($scope.payments.length).toBe(1);
    expect($scope.payments[0].merchant).toBe('Ginger');
    expect($location.path).toHaveBeenCalledWith('/payments');
  });

  it('should go to payment method filter page', function () {
    $scope.goToFilterPaymentMethodPage();
    $rootScope.$apply();

    expect(gingerAPIservice.getPayments).toHaveBeenCalled();
    expect($location.path).toHaveBeenCalledWith('/payment_method');
  });
  
  it('should filter a list of payments with method ideal', function () {
    $scope.payment_method = 'ideal';
    var ideals = data.filter(p => $scope.searchFilter(p));

    $rootScope.$apply();
    expect(ideals.length).toBe(1);
    expect(ideals[0].method).toBe('ideal');
  });
});