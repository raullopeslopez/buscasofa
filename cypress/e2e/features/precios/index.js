import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

Given("el usuario abre la aplicación de gasolineras", () => {
    cy.visit('/').wait(5000);
});

