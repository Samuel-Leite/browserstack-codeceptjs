const loginPage = require("../pages/LoginPage");

Feature("Plataforma Sauce Labs");

Scenario("Realizar login com sucesso", () => {
  loginPage.doLogin();
}).tag("wip");
