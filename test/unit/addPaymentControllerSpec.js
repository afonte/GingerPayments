'use strict';

describe('Controller: addPaymentController', function () {

  var $rootScope;
  var $q;
  var $location;
  var $scope;
  var gingerAPIservice;
  var data;
  var controller;

  beforeEach(angular.mock.module('GingerApp'));
  beforeEach(inject(function (_$rootScope_, _$controller_, _$q_, _$location_, _gingerAPIservice_) {
      $rootScope = _$rootScope_;
      $q = _$q_;
      $location = _$location_;
      gingerAPIservice = _gingerAPIservice_;

      var addPaymentPromise = $q.defer();
      addPaymentPromise.resolve();
      spyOn(gingerAPIservice, 'addPayment').andReturn(addPaymentPromise.promise);
      spyOn($location, 'path');

      $scope = {};
      controller = _$controller_('addPaymentController', {
        $scope: $scope,
        $location: $location,
        gingerAPIservice: gingerAPIservice
    });
  }));

  it('should submit to add payment', function () {
    $scope.payment = {
      "method": "creditcard",
      "amount": 15,
      "currency":  "USD",
      "status" : "acc",
      "merchant" : "ginger"
    }

    $scope.submit({$valid : true});
    $rootScope.$apply();

    expect(gingerAPIservice.addPayment).toHaveBeenCalledWith(jasmine.objectContaining({
      "method": "creditcard",
      "amount": 1500,
      "currency":  "USD",
      "status" : "acc",
      "merchant" : "ginger"
    }));
    expect($location.path).toHaveBeenCalledWith('/payments');
  });
});