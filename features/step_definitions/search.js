var assert = require("assert").strict;
const { Given, When, Then } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");

//To verify search page
Then(/^I'm taken to the haircut search page$/, function () {
  this.driver
    .wait(
      until.titleContains("Haircut in Los Angeles, CA - Book on MyTime"),
      10000
    )
    .then(() => {
      return this.driver.getTitle().then(function (title) {
        assert.strictEqual(
          title,
          "Haircut in Los Angeles, CA - Book on MyTime"
        );
      });
    });
});

//To verify the multiple service visibility
Then(
  /^I'm able to see multiple available haircut services$/,
  async function () {
    let list = await this.driver.wait(
      until.elementLocated(By.id("results")),
      10000
    );
    let results = await list.findElements(By.css("li"));
    return assert(results.length > 0, "No haircut oppointments available");
  }
);

//To click on the first available service
When(/^I click on the first available appointment$/, async function () {
  let list = await this.driver.wait(
    until.elementLocated(By.id("results")),
    10000
  );

  return await list.findElement(By.css("li")).click();
});
