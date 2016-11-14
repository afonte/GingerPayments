'use strict';

describe('Gingerapp', function() {

  browser.get('index.html');

  it('should automatically redirect to /payments when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/payments");
  });

  beforeEach(function() {
      browser.get('index.html#/payments');
    });

  describe('top20Payments', function() {
    it('should render payments when user clicks to callback btn', function() {
      element(by.css('.callback')).click();
      expect(element(by.xpath('.//*[.="creditcard"]')).isDisplayed()).toBe(true);
    });
  });

  describe('showMerchantGringer', function() {
    it('should render payments with Ginger when user clicks to promise btn', function() {
      element(by.css('.promise')).click();
      
      expect(element(by.xpath('.//*[.="Ginger"]')).isDisplayed()).toBe(true);
      expect(element(by.xpath('.//*[.="Bookshop"]')).isPresent()).toBe(false);
    });
  });

  describe('goToFilterPaymentMethodPage', function() {
    it('should redirect to /payment_method when user clicks to filter payment-method', function() {
      element(by.css('.filter-method')).click();
      expect(browser.getLocationAbsUrl()).toMatch("/payment_method");
    });
  });

  describe('addPayment', function() {
    it('should redirect to /add_payment when user clicks to Add payment', function() {
      element(by.css('.payment-form')).click();
      expect(browser.getLocationAbsUrl()).toMatch("/add_payment");
    });

    it('should redirect to /payments when user fills Add payment form', function() {
      element(by.css('.payment-form')).click();
      element(by.model('method')).sendKeys('ideal');
      element(by.model('amount')).sendKeys('12.10');
      element(by.model('currency')).sendKeys('USD');
      element(by.model('status')).sendKeys('accepted');
      element(by.model('merchant')).sendKeys('Ginger');
      element(by.tagName('button')).click();

      expect(browser.getLocationAbsUrl()).toMatch("/payments");
    });
  });
});
