const { sign_in_page } = require("../selectors/sign_in_page");
import { myRandomString } from "../../support/main_functions";
const test_data = myRandomString();
import { myRandomDigits } from "../../support/main_functions";
const random_digits = myRandomDigits();

describe("UI tests for sign in page", () => {
  before("visiting sign in page", () => {
    cy.visit("/");
  });

  it('should show "Real World App logo"', () => {
    cy.get(sign_in_page.logo_image)
      .should("be.visible")
      .and("have.attr", "xmlns", "http://www.w3.org/2000/svg");
  });

  it('should show "Sign in" title', () => {
    cy.get(sign_in_page.title_text)
      .should("be.visible")
      .and("have.text", "Sign in");
  });

  it('Show typeable "UserName" field', () => {
    cy.get(sign_in_page.user_name_label)
      .should("be.visible")
      .and("have.text", "Username");
    cy.get(sign_in_page.user_name_input)
      .should("be.visible")
      .type("Test")
      .clear();
  });

  it('Show typeable "Password" field', () => {
    cy.get(sign_in_page.password_input).should("be.visible").type("Test");
    cy.get(sign_in_page.password_label)
      .should("be.visible")
      .and("have.text", "Password");
    cy.get(sign_in_page.password_input).should("be.visible").clear();
  });

  it("show Username and Password placeholders", () => {
    cy.get(sign_in_page.outside).click();
    cy.get(sign_in_page.password_label)
      .should("be.visible")
      .and("have.text", "Password");
    cy.get(sign_in_page.user_name_label)
      .should("be.visible")
      .and("have.text", "Username");
  });

  it('show "Username is required" error if user clicks on it and then click outside this field and didn\'t enter any value', () => {
    cy.get(sign_in_page.password_input).click();
    cy.get(sign_in_page.user_helper_text)
      .should("be.visible")
      .and("have.text", "Username is required");
    cy.get(sign_in_page.user_helper_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
  });

  it('Check "Remember me" checkbox', () => {
    cy.get(sign_in_page.checkbox).check().should("be.checked");
    cy.get(sign_in_page.checkbox).uncheck().should("not.be.checked");
  });

  it("Should show disabled by default sign in btn", () => {
    cy.get(sign_in_page.sign_in_button).should("be.disabled");
  });

  it("should have 'Don't have an account? Sign Up' clickable link under 'Sign in' btn", () => {
    cy.get(sign_in_page.sign_in_button)
      .next()
      .should("have.text", "Don't have an account? Sign Up");
    cy.get(sign_in_page.signup_link)
      .should("be.visible")
      .and("have.text", "Don't have an account? Sign Up")
      .click();
    cy.url().should("contain", "signup");
  });

  it("Should show Cypress copyright link that leads to 'https://www.cypress.io/'", () => {
    cy.go("back");
    cy.get(sign_in_page.built_by)
      .should("be.visible")
      .and("have.text", "Built by");
    cy.get(sign_in_page.copyright_link)
      .should("have.attr", "href", "https://cypress.io")
      .and("have.attr", "target", "_blank")
      .should("have.attr", "rel", "noopener noreferrer");
    cy.get(sign_in_page.copyright_link).then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
    });
    cy.get(sign_in_page.copyright_logo)
      .should("be.visible")
      .and("have.attr", "xmlns", "http://www.w3.org/2000/svg");
  });

  it("should allow a visitor to sign-up", () => {
    cy.get(sign_in_page.signup_link).click();
    cy.intercept("POST", "/users").as("signup");
    cy.get(sign_in_page.first_name).type(test_data);
    cy.get(sign_in_page.last_name).type(test_data);
    cy.get(sign_in_page.username).type(test_data);
    cy.get(sign_in_page.user_password).type(sign_in_page.password_for_test);
    cy.get(sign_in_page.confirm_password).type(sign_in_page.password_for_test);
    cy.get(sign_in_page.sign_up_button).click();
    cy.wait("@signup");
  });

  it("should allow a newly created user to login", () => {
    cy.get(sign_in_page.user_name_input).type(test_data);
    cy.get(sign_in_page.password_input).type(sign_in_page.password_for_test);
    cy.get(sign_in_page.sign_in_button).click();
    cy.get(sign_in_page.confirmation_modal).should("be.visible");
    cy.get(sign_in_page.onboarding_next_button).should("be.visible").click();
    cy.get(sign_in_page.bank_name_input_field).type(test_data);
    cy.get(sign_in_page.routing_name_input_field).type(random_digits);
    cy.get(sign_in_page.acciount_number_input_field).type(random_digits);
    cy.get(sign_in_page.onboarding_save_button).should("be.visible").click();
    cy.get(sign_in_page.onboarding_next_button).should("be.visible").click();
    cy.get(sign_in_page.user_login_check).should("contain", test_data);
  });

  /* it("should allow a visitor to login", () => {
    cy.visit("/");
    cy.get(sign_in_page.user_name_input).type(sign_in_page.user_test_data);
    cy.get(sign_in_page.password_input).type(sign_in_page.password_for_test);
    cy.get(sign_in_page.button).click();
    cy.get(sign_in_page.user_login_check).should(
      "contain",
      sign_in_page.user_test_data
    );
  });*/ // doesn't work in long-distance. Seems that test project has user auto-deleting feature. Previously created users were deleted.

  it("should allow a visitor to logout", () => {
    cy.get(sign_in_page.logout_button).should("be.visible").click();
    cy.url().should("contain", "signin");
  });

  it("should display login errors", () => {
    cy.get(sign_in_page.password_input).click();
    cy.get(sign_in_page.user_helper_text)
      .should("be.visible")
      .and("have.text", "Username is required");
    cy.get(sign_in_page.user_helper_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.password_input).type("1");
    cy.get(sign_in_page.username).click();
    cy.get(sign_in_page.password_helper_text)
      .should("be.visible")
      .and("have.text", "Password must contain at least 4 characters");
    cy.get(sign_in_page.user_helper_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
  });

  it("should display signup errors", () => {
    cy.get(sign_in_page.signup_link).click();
    cy.get(sign_in_page.last_name).click();
    cy.get(sign_in_page.first_name_helper_text)
      .should("be.visible")
      .and("have.text", "First Name is required");
    cy.get(sign_in_page.first_name_helper_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.user_name_input).click();
    cy.get(sign_in_page.last_name_helper_text)
      .should("be.visible")
      .and("have.text", "Last Name is required");
    cy.get(sign_in_page.last_name_helper_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.user_password).click();
    cy.get(sign_in_page.user_name_helper_text)
      .should("be.visible")
      .and("have.text", "Username is required");
    cy.get(sign_in_page.user_name_helper_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.confirm_password).click();
    cy.get(sign_in_page.password_helper_text)
      .should("be.visible")
      .and("have.text", "Enter your password");
    cy.get(sign_in_page.password_helper_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.user_password).type("1");
    cy.get(sign_in_page.password_helper_text)
      .should("be.visible")
      .and("have.text", "Password must contain at least 4 characters");
    cy.get(sign_in_page.password_helper_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.first_name).click();
    cy.get(sign_in_page.confirm_password_helper_text)
      .should("be.visible")
      .and("have.text", "Confirm your password");
    cy.get(sign_in_page.confirm_password_helper_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
  });

  it(" should error for an invalid user", () => {
    cy.visit("/");
    cy.get(sign_in_page.user_name_input).type(sign_in_page.user_test_data);
    cy.get(sign_in_page.password_input).type(random_digits);
    cy.get(sign_in_page.sign_in_button).click();
    cy.get(sign_in_page.invalid_user_message)
      .should("be.visible")
      .and("have.text", "Username or password is invalid");
  });

  it("should error for an invalid password for existing user", () => {
    cy.get(sign_in_page.user_name_input).type(test_data);
    cy.get(sign_in_page.password_input).type(test_data);
    cy.get(sign_in_page.sign_in_button).click();
    cy.get(sign_in_page.invalid_user_message)
      .should("be.visible")
      .and("have.text", "Username or password is invalid");
  });
});
