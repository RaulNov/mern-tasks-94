describe('<Login /> & <NewProfile /> Forms', () => {
    it('<Login /> - Verificar la pantalla de login', function () {
        cy.visit('/');

        cy.contains('h1', 'Iniciar sesión');

        cy.get('[data-cy=login-title]')
            .invoke('text')
            .should('equal', 'Iniciar sesión');

        cy.get('[data-cy=login-form]').should('exist');

        cy.get('[data-cy=email-input]').should('exist');
        cy.get('[data-cy=password-input]').should('exist');

        cy.get('[data-cy=login-submit]')
            .should('exist')
            .should('have.value', 'Iniciar sesión')
            .should('have.class', 'btn-primary')
            .and('have.class', 'btn');

        cy.get('[data-cy=new-profile-link]')
            .should('exist')
            .should('have.prop', 'tagName')
            .should('eq', 'A');
        
        cy.get('[data-cy=new-profile-link]')
            .should('have.attr', 'href')
            .should('eq', '/new-profile');

        cy.visit('/new-profile');
    });

    it('<NewProfile /> - Verificar la pantalla de crear perfil', function () {
        cy.get('[data-cy=new-profile-title]')
            .invoke('text')
            .should('equal', 'Obtener una cuenta');
        
        cy.get('[data-cy=new-profile-form]').should('exist');

        cy.get('[data-cy=username-input]').should('exist');
        cy.get('[data-cy=email-input]').should('exist');
        cy.get('[data-cy=password-input]')
            .should('exist')
            .should('have.prop', 'type')
            .should('equal', 'password');
        cy.get('[data-cy=confirm-password-input]').should('exist');

        cy.get('[data-cy=new-profile-submit]')
            .should('exist')
            .should('have.class', 'btn-primary')
            .should('have.value', 'Registrarse')
            .should('not.have.value', 'Crear nueva cuenta');

        cy.get('[data-cy=login-link]')
            .should('exist')
            .should('have.attr', 'href')
            .should('equal', '/');
        
        cy.visit('/');
    });
});