var assert = require("assert").strict;
const { Given, When, Then } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");
let date,
  time,
  month,
  year = "";

//To verify the appointment page
Then(/^I'm taken to the appointment page$/, function () {
  this.driver
    .wait(
      until.titleContains("MyTime - Appointments when you want them"),
      10000
    )
    .then(() => {
      return this.driver.getTitle().then(function (title) {
        assert.strictEqual(title, "MyTime - Appointments when you want them");
      });
    });
});

// To verify number of appointment slots
Then(/^Minimum two appoitment slots displayed$/, async function () {
  let appointmentBody = await this.driver.findElement(
    By.className("timepicker-body")
  );
  let slots = await appointmentBody.findElements(By.css("li.slot"));

  return assert(slots.length >= 2, "Minimum two slots not available");
});

//To select staff from dropdown
When(/^I select anyone from the staff$/, async function () {
  let staffDropdown = await this.driver
    .findElement(By.className("employees-dropdown"))
    .findElement(By.css("button"));
  staffDropdown.click();
  let anyoneOption = await this.driver.wait(
    until.elementLocated(
      By.xpath("//a[contains(@data-employee_id, 'anyone')]"),
      10000
    )
  );
  return anyoneOption.click();
});

//To select first apoointmet
When(/^select the first available slot$/, async function () {
  let dateValue = await this.driver.findElement(By.css(".day.selected"));
  await dateValue.getText().then((text) => {
    date = text;
  });

  let monthText = await this.driver.findElement(By.css(".date-month-text"));
  await monthText.getText().then((text) => {
    month = text;
  });

  let appointmentBody = await this.driver.findElement(
    By.className("timepicker-body")
  );
  let slots = await appointmentBody.findElements(By.css("li.slot"));
  let slot = await slots[0];
  await slot
    .findElement(By.className("time"))
    .getText()
    .then((text) => {
      time = text;
    });
  return slot.findElement(By.className("add-to-cart")).click();
});

//To verify the appointment time and date while checkout
Then(/^verify the dates selected$/, async function () {
  let appointmentText = await this.driver.wait(
    until.elementLocated(By.className("summary-appointment-time")),
    10000
  );
  return appointmentText.getText().then((text) => {
    let slotText = text.split(" ");
    assert(
      month.includes(slotText[1]) &&
        date === slotText[2] &&
        time === slotText[4] + " " + slotText[5],
      "Booking slot doesn't match the user choosen time"
    );
  });
});
