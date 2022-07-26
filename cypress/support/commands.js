const { sign_in_page } = require("../e2e/selectors/sign_in_page");

Cypress.Commands.add("UiSignUp", (firstName, lastName, userName) => {
  cy.get(sign_in_page.signup_link).click();
  cy.intercept("POST", "/users").as("signup");
  cy.get(sign_in_page.first_name).type(firstName);
  cy.get(sign_in_page.last_name).type(lastName);
  cy.get(sign_in_page.username).type(userName);
  cy.get(sign_in_page.user_password).type(sign_in_page.password_for_test);
  cy.get(sign_in_page.confirm_password).type(sign_in_page.password_for_test);
  cy.get(sign_in_page.sign_up_button).click();
  cy.wait("@signup");
});

Cypress.Commands.add("UiLoginNewlyCreated", (login, password) => {
  cy.visit("/");
  cy.get(sign_in_page.user_name_input).type(login);
  cy.get(sign_in_page.password_input).type(password);
  cy.get(sign_in_page.sign_in_button).click();
  cy.get(sign_in_page.user_login_check).should("contain", login);
});

Cypress.Commands.add("UiLoginStandartUser", () => {
  cy.visit("/");
  cy.get(sign_in_page.user_name_input).type("Jessyca.Kuhic");
  cy.get(sign_in_page.password_input).type("s3cret");
  cy.get(sign_in_page.sign_in_button).click();
  cy.get(sign_in_page.user_login_check).should("contain", "Devon B");
});

Cypress.Commands.add("UiOnboarding", (bankinput, randomdigits) => {
  cy.get(sign_in_page.confirmation_modal).should("be.visible");
  cy.get(sign_in_page.onboarding_next_button).should("be.visible").click();
  cy.get(sign_in_page.bank_name_input_field).type(bankinput);
  cy.get(sign_in_page.routing_name_input_field).type(randomdigits);
  cy.get(sign_in_page.acciount_number_input_field).type(randomdigits);
  cy.get(sign_in_page.onboarding_save_button).should("be.visible").click();
  cy.get(sign_in_page.onboarding_next_button).should("be.visible").click();
});
