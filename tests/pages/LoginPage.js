const { I } = inject();
const credenciais = require("../../resources/data/user");

const locs = {
  txtUsuario: '//input[@id = "user-name"]',
  txtSenha: '//input[@id = "password"]',
  btnEntrar: '//input[@id = "login-button"]',
};

module.exports = {
  doLogin() {
    I.amOnPage("https://www.saucedemo.com/");
    I.waitForElement(locs.txtUsuario, 3);
    I.fillField(locs.txtUsuario, credenciais.user);
    I.fillField(locs.txtSenha, credenciais.password);
    I.click(locs.btnEntrar);
    I.wait(2);
  },
};
