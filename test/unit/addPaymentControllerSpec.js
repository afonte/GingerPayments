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
    $scope.submit({$valid : true});
    $rootScope.$apply();

    expect(gingerAPIservice.addPayment).toHaveBeenCalled();
    expect($location.path).toHaveBeenCalledWith('/payments');
  });
});