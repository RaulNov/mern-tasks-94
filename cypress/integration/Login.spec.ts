describe('<Login />', () => {
    beforeEach(() => {
        cy.fixture('test-data.json').as('data');
    });

    it('<Login /> - Validación, alertas y autenticación de usuario', function () {
        cy.visit('/');

        cy.get('[data-cy=login-submit]').click();

        cy.get('[data-cy=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Todos los campos son obligatorios');

        cy.get('[data-cy=alert]').should('have.class', 'alert-error');

        cy.get('[data-cy=email-input]').type('non_exist@email.com');
        cy.get('[data-cy=password-input]').type('qwe');

        cy.intercept('POST', `${this.data.backendUrl}/api/auth`).as('authUser');

        cy.get('[data-cy=login-submit]').click();

        cy.wait('@authUser');

        cy.get('[data-cy=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Este email no está registrado');

        cy.get('[data-cy=alert]').should('have.class', 'alert-error');

        cy.get('[data-cy=email-input]').clear().type(this.data.email);

        cy.get('[data-cy=login-submit]').click();

        cy.wait('@authUser');

        cy.get('[data-cy=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'El email o el password están incorrectos');

        cy.get('[data-cy=alert]').should('have.class', 'alert-error');

        cy.get('[data-cy=password-input]').clear().type('123456');

        cy.get('[data-cy=login-submit]').click();

        cy.wait('@authUser');

        cy.get('[data-cy=task-list-title]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Selecciona un proyecto');
    });
});