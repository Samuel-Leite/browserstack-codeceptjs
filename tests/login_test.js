Feature("Plataforma Sauce Labs");

Scenario("Realizar login com sucesso", ({ I }) => {
  I.amOnPage("https://www.saucedemo.com/");
  I.waitForElement('//input[@id = "user-name"]', 3);
  I.fillField('//input[@id = "user-name"]', "standard_user");
  I.fillField('//input[@id = "password"]', "secret_sauce");
  I.click('//input[@id = "login-button"]');
  I.wait(2);
});
