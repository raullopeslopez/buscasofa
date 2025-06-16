/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('el usuario navega a la página About', () => {
    cy.visit('http://localhost:5173/about');
    cy.get('#root').should('exist');
    cy.get('body').should('not.contain', 'Cargando...');
});

Then('debería ver el título "Acerca de nosotros"', () => {
    cy.get('h1').should('contain', 'Acerca de nosotros');
});

Then('debería ver el subtítulo descriptivo del proyecto', () => {
    cy.get('h2').should('contain', 'Esto es la entrega de la actividad grupal de Ingeniería del Software Avanzada');
});

Then('debería ver la sección de emojis del equipo', () => {
    cy.get('.emoji-list').should('exist');
    cy.get('.emoji-list h3').should('contain', 'Así nos hemos sentido durante el desarrollo:');
});

Then('debería ver el emoji de confusión', () => {
    cy.get('.emoji-list ul li').eq(0).should('contain', '😵');
});

Then('debería ver el emoji de frustración', () => {
    cy.get('.emoji-list ul li').eq(1).should('contain', '😤');
});

Then('debería ver el formulario de feedback', () => {
    cy.get('.feedback-form').should('exist');
    cy.get('label[for="opinion"]').should('contain', '¿Qué te ha parecido?');
    cy.get('#opinion').should('exist');
});

Then('debería poder escribir en el campo de opinión', () => {
    cy.get('#opinion')
        .should('be.visible')
        .type('El input funciona correctamente')
        .should('have.value', 'El input funciona correctamente');
});

Then('debería ver la información del equipo', () => {
    cy.get('#info').should('contain', 'Somos el equipo nº 3');
});

When('el usuario escribe {string} en el campo de opinión', (texto) => {
    cy.get('#opinion').clear().type(String(texto));
});

Then('el campo debería mantener el texto escrito', () => {
    cy.get('#opinion').should('have.value', 'Esta aplicación está genial');
}); 