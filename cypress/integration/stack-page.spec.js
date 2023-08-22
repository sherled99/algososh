describe('Тестирование стека', () => {
    beforeEach(() => {
      cy.visit('/stack');
    });
  
    it('Кнопка добавления недоступна при пустом инпуте', () => {
      cy.get('[data-testid="input"]').should('be.empty');
      cy.get('[data-testid="add-button"]').should('be.disabled');
    });

    it('Элемент добавляется корректно в стек', () => {
        const inputValue = 'A';
    
        cy.get('[data-testid="input"]').type(inputValue);
        cy.get('[data-testid="add-button"]').should('not.be.disabled').click();
    
        cy.get('[data-testid^="circle-"]').should('have.length', 1).each(($circle) => {
          cy.wrap($circle).should('have.text', inputValue);
          cy.wrap($circle).find('[data-testid="changing"]');
        });
      });
      

      it('Элемент удаляется корректно из стека', () => {    
        const inputValue = 'A';
        cy.get('[data-testid="input"]').type(inputValue);
        cy.get('[data-testid="add-button"]').should('not.be.disabled').click();

        cy.get('[data-testid="remove-button"]').should('not.be.disabled').click();
        cy.get('[data-testid^="circle-"]').should('have.length', 0);
      });

      it('Кнопка "Очистить" работает корректно', () => {
    
        const inputValueA = 'A';
        cy.get('[data-testid="input"]').type(inputValueA);
        cy.get('[data-testid="add-button"]').should('not.be.disabled').click();

        const inputValuB = 'B';
        cy.get('[data-testid="input"]').type(inputValuB);
        cy.get('[data-testid="add-button"]').should('not.be.disabled').click();

        cy.get('[data-testid="clear-button"]').should('not.be.disabled').click();
        cy.get('[data-testid^="circle-"]').should('have.length', 0);
      });
  });