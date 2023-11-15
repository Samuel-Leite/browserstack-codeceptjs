const { setHeadlessWhen, setCommonPlugins } = require("@codeceptjs/configure");
require("dotenv").config();
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

const capabilities = require("./resources/conf/" +
  [process.env.MODE] +
  "/caps.json")[process.env.CAPS];

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: "./*_test.js",
  output: "./output",
  helpers: {
    Appium: {
      host: "hub-cloud.browserstack.com",
      port: 4444,
      user: "samuelleite_GtpoxN",
      key: "sYCp8ma8kXSd4DoH6mAY",
      platform: capabilities.platformName,
      desiredCapabilities: capabilities,
    },
    Hooks: {
      require: "./helpers/hooks.js",
    },
    ChaiWrapper: {
      require: "codeceptjs-chai",
    },
  },
  bootstrap: null,
  mocha: {
    mochawesome: {
      stdout: "./output/console.log",
      options: {
        reportDir: "./output",
        reportFilename: "report",
      },
    },
    reporterOptions: {
      "codeceptjs-cli-reporter": {
        stdout: "./output",
        options: {
          verbose: true,
          steps: true,
        },
      },
      "mocha-junit-reporter": {
        stdout: "./output/console.log",
        options: {
          mochaFile: "./output/result.xml",
          attachments: true, //add screenshot for a failed test
        },
      },
    },
  },
  include: {
    I: "./steps_file.js",
  },
  plugins: {
    // Para uso do Allure report
    allure: {
      enabled: true,
      outputDir: "./output",
      require: "@codeceptjs/allure-legacy",
    },
    stepByStepReport: {
      enabled: true,
      screenshotsForAllureReport: true,
      ignoreSteps: ["grab*"],
      output: "./output",
      deleteSuccessful: false,
      disableScreenshotOnFail: false,
    },
    // Habilitar o ultimo print em caso de falha
    screenshotOnFail: {
      enabled: true,
    },
    // Para usar a funcão retry no script de teste
    retryTo: {
      enabled: true,
      pollInterval: 500,
    },
    // Para executar o retry automatico nos steps em caso de erro
    retryFailedStep: {
      enabled: true,
      factor: 1,
      retries: require("./resources/conf/" + [process.env.MODE] + "/caps.json")[
        process.env.CAPS
      ].newCommandTimeout,
      ignoredSteps: [
        "*wait*", // ignore all wait steps
        /wait/, // ignore all steps with a wait in it (by regexp)
        "*aguardo*", // ignore all aguardo steps
        /aguardo/, // ignore all steps with a aguardo in it (by regexp)
      ],
    },
    // Para tentar fazer uma ação com retorno boolean em vez de erro
    // Ex: const result = await tryTo(() => I.see('Welcome'));
    tryTo: {
      enabled: true,
    },
  },
  name: "browserstack-codeceptjs",
};
