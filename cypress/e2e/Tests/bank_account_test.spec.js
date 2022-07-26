import { myRandomString } from "../../support/main_functions";
const test_data = myRandomString();
import { myRandomDigits } from "../../support/main_functions";
import { sign_in_page } from "../selectors/sign_in_page";
import { bank_accounts } from "../selectors/Bank_accounts";
const random_digits = myRandomDigits();

describe("UI tests for bank page", () => {
  before("visiting sign in page", () => {
    cy.visit("/");
  });

  it("creates a new bank account by onboarding", () => {
    cy.UiSignUp(test_data, test_data, test_data);
    cy.UiLoginNewlyCreated(test_data, sign_in_page.password_for_test);
    cy.UiOnboarding(test_data, random_digits);
    cy.get(bank_accounts.bank_account_button).click();
    cy.get(bank_accounts.bank_list).should("contain.text", test_data);
  });

  it("Delete bank account", () => {
    cy.visit("/");
    cy.UiLoginNewlyCreated(test_data, sign_in_page.password_for_test);
    cy.get(bank_accounts.bank_account_button).click();
    cy.get(bank_accounts.bank_list).should("contain.text", test_data);
    cy.get(bank_accounts.delete_button).should("be.visible").click();
    cy.get(bank_accounts.bank_list)
      .should("contain.text", test_data)
      .and("contain.text", "(Deleted)");
  });

  it("creates a new bank account", () => {
    cy.visit("/");
    cy.UiLoginNewlyCreated(test_data, sign_in_page.password_for_test);
    cy.get(bank_accounts.bank_account_button).click();
    cy.get(bank_accounts.create_new_bank_acc_button)
      .should("be.visible")
      .click();
    cy.get(sign_in_page.bank_name_input_field).type(test_data + random_digits);
    cy.get(sign_in_page.routing_name_input_field).type(random_digits);
    cy.get(sign_in_page.acciount_number_input_field).type(random_digits);
    cy.get(sign_in_page.onboarding_save_button).should("be.visible").click();
    cy.get(bank_accounts.bank_list).should(
      "contain.text",
      test_data + random_digits
    );
  });
  it("Errors for bank account creation", () => {
    cy.visit("/");
    cy.UiLoginNewlyCreated(test_data, sign_in_page.password_for_test);
    cy.get(bank_accounts.bank_account_button).click();
    cy.get(bank_accounts.create_new_bank_acc_button).click();
    cy.get(sign_in_page.bank_name_input_field).click();
    cy.get(sign_in_page.routing_name_input_field).click();
    cy.get(bank_accounts.bank_name_error_text)
      .should("be.visible")
      .and("have.text", "Enter a bank name");
    cy.get(bank_accounts.bank_name_error_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.acciount_number_input_field).click();
    cy.get(bank_accounts.routing_name_error_text)
      .should("be.visible")
      .and("have.text", "Enter a valid bank routing number");
    cy.get(bank_accounts.routing_name_error_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.bank_name_input_field).click();
    cy.get(bank_accounts.account_name_error_text)
      .should("be.visible")
      .and("have.text", "Enter a valid bank account number");
    cy.get(bank_accounts.account_name_error_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.bank_name_input_field).type("1");
    cy.get(bank_accounts.bank_name_error_text)
      .should("be.visible")
      .and("have.text", "Must contain at least 5 characters");
    cy.get(bank_accounts.bank_name_error_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.routing_name_input_field).type("1");
    cy.get(bank_accounts.routing_name_error_text)
      .should("be.visible")
      .and("have.text", "Must contain a valid routing number");
    cy.get(bank_accounts.routing_name_error_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.routing_name_input_field).type(random_digits);
    cy.get(bank_accounts.routing_name_error_text)
      .should("be.visible")
      .and("have.text", "Must contain a valid routing number");
    cy.get(bank_accounts.routing_name_error_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.acciount_number_input_field).type("1");
    cy.get(bank_accounts.account_name_error_text)
      .should("be.visible")
      .and("have.text", "Must contain at least 9 digits");
    cy.get(bank_accounts.account_name_error_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.acciount_number_input_field).type(
      random_digits + random_digits
    );
    cy.get(bank_accounts.account_name_error_text)
      .should("be.visible")
      .and("have.text", "Must contain no more than 12 digits");
    cy.get(bank_accounts.account_name_error_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
  });

  it("Errors for bank account creation at onboarding", () => {
    cy.visit("/");
    cy.UiSignUp(test_data + "1", test_data + "1", test_data + "1");
    cy.UiLoginNewlyCreated(test_data + "1", sign_in_page.password_for_test);
    cy.get(sign_in_page.onboarding_next_button).should("be.visible").click();
    cy.get(sign_in_page.bank_name_input_field).click();
    cy.get(sign_in_page.routing_name_input_field).click();
    cy.get(bank_accounts.bank_name_error_text)
      .should("be.visible")
      .and("have.text", "Enter a bank name");
    cy.get(bank_accounts.bank_name_error_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.acciount_number_input_field).click();
    cy.get(bank_accounts.routing_name_error_text)
      .should("be.visible")
      .and("have.text", "Enter a valid bank routing number");
    cy.get(bank_accounts.routing_name_error_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.bank_name_input_field).click();
    cy.get(bank_accounts.account_name_error_text)
      .should("be.visible")
      .and("have.text", "Enter a valid bank account number");
    cy.get(bank_accounts.account_name_error_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.bank_name_input_field).type("1");
    cy.get(bank_accounts.bank_name_error_text)
      .should("be.visible")
      .and("have.text", "Must contain at least 5 characters");
    cy.get(bank_accounts.bank_name_error_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.routing_name_input_field).type("1");
    cy.get(bank_accounts.routing_name_error_text)
      .should("be.visible")
      .and("have.text", "Must contain a valid routing number");
    cy.get(bank_accounts.routing_name_error_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.routing_name_input_field).type(random_digits);
    cy.get(bank_accounts.routing_name_error_text)
      .should("be.visible")
      .and("have.text", "Must contain a valid routing number");
    cy.get(bank_accounts.routing_name_error_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.acciount_number_input_field).type("1");
    cy.get(bank_accounts.account_name_error_text)
      .should("be.visible")
      .and("have.text", "Must contain at least 9 digits");
    cy.get(bank_accounts.account_name_error_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
    cy.get(sign_in_page.acciount_number_input_field).type(
      random_digits + random_digits
    );
    cy.get(bank_accounts.account_name_error_text)
      .should("be.visible")
      .and("have.text", "Must contain no more than 12 digits");
    cy.get(bank_accounts.account_name_error_text)
      .should("have.css", "color")
      .and("eq", "rgb(244, 67, 54)");
  });
});
