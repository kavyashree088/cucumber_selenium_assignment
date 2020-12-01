var assert = require("assert").strict;
const { Given, When, Then } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");

//To open the applicatio
Given(/^I visit MyTime Consumers page$/, function () {
  return this.driver.get("https://www.mytime.com/consumers");
});

//To verify the application page load
Then(/^I see title MyTime Consumer page$/, function () {
  return this.driver.getTitle().then(function (title) {
    assert.equal(
      title,
      "Open Appointments for Massages, Haircuts, Dentists, Yoga and more - MyTime"
    );
  });
});

//To enter the service text in serach
When(/^I type haircut in search text$/, async function () {
  this.driver.wait(
    until.elementIsVisible(
      this.driver.findElement(By.xpath('(//input[@id="search-query"])[2]')),
      10000
    )
  );
  return this.driver
    .findElement(By.xpath('(//input[@id="search-query"])[2]'))
    .sendKeys("haircut");
});

//To enter the city for required service
When(/^I type Los Angeles, CA in search-location text$/, async function () {
  this.driver.wait(
    until.elementIsVisible(
      this.driver.findElement(By.xpath('(//input[@id="search-location"])[2]')),
      10000
    )
  );
  this.driver
    .findElement(By.xpath('(//input[@id="search-location"])[2]'))
    .clear();
  return this.driver
    .findElement(By.xpath('(//input[@id="search-location"])[2]'))
    .sendKeys("Los Angeles, CA");
});

//To click on the search button
When(/^I click on "([^"]*)" button by class$/, function (element) {
  return this.driver.findElement(By.className(element)).click();
});
