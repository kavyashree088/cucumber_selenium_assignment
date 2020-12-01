var assert = require("assert").strict;
const { Given, When, Then } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");

//To Verify the Specific service page of a client
Then(/^I'm taken to the specific haircut service page$/, function () {
  this.driver
    .wait(
      until.titleContains(": Los Angeles, CA - Haircut | Book Online"),
      10000
    )
    .then(() => {
      return this.driver.getTitle().then(function (title) {
        assert(
          title.includes(": Los Angeles, CA - Haircut | Book Online"),
          "Specific Service page not found"
        );
      });
    });
});

//To click on the book appointment
When(/^I click on the book button in service page$/, async function () {
  let book = await this.driver.wait(
    until.elementLocated(
      By.xpath("//div[contains(@class, 'panel-title-button')]"),
      10000
    )
  );
  //to avlid stale element exception
  await this.driver.wait(until.elementIsVisible(book), 10000);
  return book.click();
});
