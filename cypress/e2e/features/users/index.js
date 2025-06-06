/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

const randomUser = () => ({
  username: `testuser${Date.now()}`,
  email: `test${Date.now()}@mail.com`,
  password: 'Test1234!'
});

let user;

Given('el usuario navega a la página de registro', () => {
  user = randomUser();
  cy.visit('/registro');
  cy.get('#root').should('exist');
  cy.get('body').should('not.contain', 'Cargando...');
  cy.get('form.register-form').should('exist');
});

When('completa el formulario de registro con datos válidos', () => {
  cy.get('input[name="username"]').type(user.username);
  cy.get('input[name="email"]').type(user.email);
  cy.get('input[name="password"]').type(user.password);
});

When('envía el formulario de registro', () => {
  cy.get('form').submit();
});

Then('ve un mensaje de confirmación de registro', () => {
  cy.contains(/usuario registrado correctamente|registro exitoso|registrado con éxito/i).should('be.visible');
});

Given('el usuario navega a la página de login', () => {
  cy.visit('/login');
  cy.get('#root').should('exist');
  cy.get('body').should('not.contain', 'Cargando...');
  cy.get('form', { timeout: 10000 }).should('exist');
});

When('completa el formulario de login con credenciales válidas', () => {
  cy.get('input[name="email"]').type(user.email);
  cy.get('input[name="password"]').type(user.password);
});

When('envía el formulario de login', () => {
  cy.get('form').submit();
});

Then('ve un mensaje de bienvenida', () => {
  cy.contains(/bienvenido|login correcto|¡bienvenido/i).should('be.visible');
});