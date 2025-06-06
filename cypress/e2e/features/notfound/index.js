/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("el usuario navega a {string}", (ruta) => {
    cy.visit(String(ruta));
    cy.get('#root').should('exist');
    cy.get('body').should('not.contain', 'Cargando...');
});

Then("debería ver el texto {string}", (texto) => {
    cy.contains(String(texto), { timeout: 10000 }).should('be.visible');
});