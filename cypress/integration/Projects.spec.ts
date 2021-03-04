describe('<Projects />', () => {
    beforeEach(() => {
        cy.fixture('test-data.json').as('data');
    });

    it('<Login /> - Autenticacción de usuario', function () {
        cy.visit('/');

        cy.get('[data-cy=email-input]').type(this.data.email);
        cy.get('[data-cy=password-input]').type('123456');
        
        cy.intercept('POST', `${this.data.backendUrl}/api/auth`).as('authUser');

        cy.get('[data-cy=login-submit]').click();

        cy.wait('@authUser');
    });

    it('<NewProject /> - Validar el formulario de proyecto', function () {
        cy.get('[data-cy=new-project-btn]').click();

        cy.get('[data-cy=new-project-submit]').click();

        cy.get('[data-cy=project-alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'El nombre del proyecto es obligatorio');

        cy.get('[data-cy=project-alert]')
            .should('have.class', 'message')
            .and('have.class', 'error');
    });

    it('<NewProject /> - Creación de un nuevo proyecto', function () {
        cy.get('[data-cy=project-name-imput]').type('Test project');

        cy.intercept('POST', `${this.data.backendUrl}/api/projects`).as('createProject');

        cy.get('[data-cy=new-project-submit]').click();

        cy.wait('@createProject');

        cy.get('[data-cy=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Proyecto creado satisfactoriamente');

        cy.get('[data-cy=alert]').should('have.class', 'alert-success');

        // Se selecciona la última tarea creada
        cy.wait(200);
        cy.get('[data-cy=project-list] li:nth-child(1) button').click();
    });

    it('<TaskForm /> - Validación y creación de tareas', function () {
        cy.get('[data-cy=new-task-submit]').click();

        cy.get('[data-cy=task-alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'El nombre de la tarea es obligatorio');

        cy.get('[data-cy=task-alert]')
            .should('have.class', 'error')
            .and('have.class', 'message');

        cy.intercept('POST', `${this.data.backendUrl}/api/tasks`).as('createTask');
        
        cy.get('[data-cy=task-name-input]').type('Test task 1');
        cy.get('[data-cy=new-task-submit]').click();
        cy.wait('@createTask');

        cy.get('[data-cy=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Tarea creada satisfactoriamente');

        cy.get('[data-cy=alert]').should('have.class', 'alert-success');

        cy.get('[data-cy=task-name-input]').type('Test task 2');
        cy.get('[data-cy=new-task-submit]').click();
        cy.wait('@createTask');

        cy.get('[data-cy=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Tarea creada satisfactoriamente');

        cy.get('[data-cy=alert]').should('have.class', 'alert-success');

        cy.get('[data-cy=task-name-input]').type('Test task 3');
        cy.get('[data-cy=new-task-submit]').click();
        cy.wait('@createTask');

        cy.get('[data-cy=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Tarea creada satisfactoriamente');

        cy.get('[data-cy=alert]').should('have.class', 'alert-success');
        cy.wait(200);
    });

    it('<Task /> - Completar, descompletar, editar y eliminar tarea', function () {
        // Marca la última tarea como completada
        cy.intercept('PUT', `${this.data.backendUrl}/api/tasks/**`).as('editTask');
        cy.get('[data-cy=task-list] li:nth-child(1) [data-cy=complete-task-btn]').click();
        cy.wait('@editTask');
        
        cy.get('[data-cy=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Tarea actualizada satisfactoriamente');

        cy.get('[data-cy=alert]').should('have.class', 'alert-success');
        cy.get('[data-cy=task-list] li:nth-child(1) [data-cy=decomplete-task-btn]').should('have.class', 'completed');

        // Vuelve a marcar la última tarea como incompleta
        cy.get('[data-cy=task-list] li:nth-child(1) [data-cy=decomplete-task-btn]').click();
        cy.wait('@editTask');

        cy.get('[data-cy=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Tarea actualizada satisfactoriamente');

        cy.get('[data-cy=alert]').should('have.class', 'alert-success');
        cy.get('[data-cy=task-list] li:nth-child(1) [data-cy=complete-task-btn]').should('have.class', 'incompleted');

        // Editar la última tarea
        cy.get('[data-cy=task-list] li:nth-child(1) [data-cy=edit-task-btn]').click();
        cy.get('[data-cy=task-name-input]').clear().type('EDITED TASK 1');
        cy.get('[data-cy=new-task-submit]').click();
        cy.wait('@editTask');

        cy.get('[data-cy=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Tarea actualizada satisfactoriamente');

        cy.get('[data-cy=alert]').should('have.class', 'alert-success');
        cy.get('[data-cy=task-list] li:nth-child(1) [data-cy=task-name]')
            .invoke('text')
            .should('equal', 'EDITED TASK 1');

        // Eliminar la última tarea
        cy.intercept('DELETE', `${this.data.backendUrl}/api/tasks/**`).as('deleteTask');
        cy.get('[data-cy=task-list] li:nth-child(1) [data-cy=delete-task-btn]').click();
        cy.wait('@deleteTask');
        
        cy.get('[data-cy=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Tarea eliminada satisfactoriamente');

        cy.get('[data-cy=alert]').should('have.class', 'alert-success');

        // Espera a que termine la animación que quita la última tarea del DOM
        cy.wait(200);
        
        cy.get('[data-cy=task-list] li:nth-child(1) [data-cy=task-name]')
            .invoke('text')
            .should('not.equal', 'EDITED TASK 1')
            .should('equal', 'Test task 2');
    });
});