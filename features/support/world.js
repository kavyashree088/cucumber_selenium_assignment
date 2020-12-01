var seleniumWebdriver = require("selenium-webdriver");
const {
  setWorldConstructor,
  setDefaultTimeout,
} = require("@cucumber/cucumber");

class CustomWorld {
  constructor() {
    this.driver = new seleniumWebdriver.Builder().forBrowser("chrome").build();
  }
}

setDefaultTimeout(20000);
setWorldConstructor(CustomWorld);
