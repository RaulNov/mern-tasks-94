describe('<NewProfile />', () => {
    beforeEach(() => {
        cy.fixture('test-data.json').as('data');
    });

    it('<NewProfile /> - Crear un nuevo perfil de usuario', function () {
        cy.visit('/new-profile');

        cy.get('[data-cy=new-profile-submit]').click();

        cy.get('[data-cy=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Todos los campos son obligatorios');
        
        cy.get('[data-cy=alert]').should('have.class', 'alert-error');

        cy.get('[data-cy=new-profile-form]').should('exist');

        cy.get('[data-cy=username-input]').type('New Tester');
        cy.get('[data-cy=email-input]').type('new_tester@email.com');
        cy.get('[data-cy=password-input]').type('123')
        cy.get('[data-cy=confirm-password-input]').type('123');

        cy.get('[data-cy=new-profile-submit]').click();

        cy.get('[data-cy=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'La contraseña debe tener al menos 6 caracteres');
        
        cy.get('[data-cy=alert]').should('have.class', 'alert-error');

        cy.get('[data-cy=password-input]').clear().type('123456')
        cy.get('[data-cy=confirm-password-input]').clear().type('123455');

        cy.get('[data-cy=new-profile-submit]').click();

        cy.get('[data-cy=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Las contraseñas no son iguales');
        
        cy.get('[data-cy=alert]').should('have.class', 'alert-error');

        cy.get('[data-cy=confirm-password-input]').clear().type('123456');
        
        cy.intercept('POST', `${this.data.backendUrl}/api/users`).as('createUser');
        
        cy.get('[data-cy=new-profile-submit]').click();

        cy.wait('@createUser');

        cy.get('[data-cy=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Usuario creado satisfactoriamente');
        
        cy.get('[data-cy=alert]').should('have.class', 'alert-success');
    });

    it('<NewProfile /> - Verificar usuario repetido', function () {
        cy.get('[data-cy=username-input]').type('Tester');
        cy.get('[data-cy=email-input]').type(this.data.email);
        cy.get('[data-cy=password-input]').type('123456');
        cy.get('[data-cy=confirm-password-input]').type('123456');

        cy.get('[data-cy=new-profile-submit]').click();

        cy.get('[data-cy=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'El correo ya ha sido registrado');
        
        cy.get('[data-cy=alert]').should('have.class', 'alert-error');

        cy.visit('/');
    });
});