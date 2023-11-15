const Helper = require("@codeceptjs/helper");
const { container, ecorder, event, output, helper } = require("codeceptjs");
const execSync = require("child_process").execSync;
const utf8 = { encoding: "utf-8" };
const utils = require("./Utils");
var validacao = "";

class hooks extends Helper {
  _init() {
    // before all tests
    console.log("*************************************");
    console.log("******* Variáveis de Ambiente *******");
    console.log("MODE: " + process.env.MODE);
    console.log("CAPS: " + process.env.CAPS);
    console.log("*************************************");
    try {
      execSync("rm -rfv output/", utf8);
    } catch {}
  }
  _before(test) {
    // before a test
    test.retries(process.env.RETRY);
    console.log(
      "--------------------------------Start----------------------------------"
    );
    let allure = codeceptjs.container.plugins("allure");
    allure.addParameter("0", "Mode", process.env.MODE);
    allure.addParameter("0", "Device", process.env.CAPS);
  }
  _after() {
    console.log(
      "--------------------------------End----------------------------------"
    );
  } // after a test
  _beforeStep() {} // before each step
  _afterStep() {
    // after each step
    // utils.addEvidenciaApiAllure();
  }
  _beforeSuite() {} // before each suite
  _afterSuite() {} // after each suite
  _passed() {} // after a test passed
  _failed() {} // after a test failed
  _finishTest() {
    // after all tests
    execSync("allure serve output", utf8);
  }
}
module.exports = hooks;
