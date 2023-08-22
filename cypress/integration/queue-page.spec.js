describe('Тестирование очереди', () => {
    beforeEach(() => {
      cy.visit('/queue');
    });
  
    it('Кнопка добавления недоступна при пустом инпуте', () => {
      cy.get('[data-testid="input"]').should('be.empty'); // Убедитесь, что инпут пустой
      cy.get('[data-testid="add-button"]').should('be.disabled'); // Проверьте, что кнопка добавления недоступна
    });

    it('Элемент добавляется корректно в очередь', () => {
        const inputValues = ['A', 'B'];
    
        cy.get('[data-testid="input"]').type(inputValues[0]);
        cy.get('[data-testid="add-button"]').should('not.be.disabled').click();
    

        cy.get('[data-testid^="circle-"]').eq(0).should('have.text', inputValues[0]);
        cy.get('[data-testid^="circle-"]').eq(0).find('[data-testid="changing"]');

        cy.get('[data-testid="input"]').type(inputValues[1]);
        cy.get('[data-testid="add-button"]').should('not.be.disabled').click();
                
        cy.get('[data-testid^="circle-"]').eq(1).should('have.text', inputValues[1]);
        cy.get('[data-testid^="circle-"]').eq(1).find('[data-testid="changing"]');
    });

    it('Элемент удаляется корректно из стека', () => {
        cy.get('[data-testid="input"]').type('A');
        cy.get('[data-testid="add-button"]').should('not.be.disabled').click();
      
        cy.get('[data-testid="input"]').type('B');
        cy.get('[data-testid="add-button"]').should('not.be.disabled').click();
      
        cy.get('[data-testid="remove-button"]').should('not.be.disabled').click();
      
        cy.get('[data-testid^="circle-"]').first().should('have.text', '');
        
      });

      it('Кнопка "Очистить" очищает стек', () => {
        cy.get('[data-testid="input"]').type('A');
        cy.get('[data-testid="add-button"]').should('not.be.disabled').click();
      
        cy.get('[data-testid="input"]').type('B'); 
        cy.get('[data-testid="add-button"]').should('not.be.disabled').click();
      
        cy.get('[data-testid="clear-button"]').should('not.be.disabled').click();
      
        cy.get('[data-testid^="circle-"]').each(($circle) => {
         cy.wrap($circle).should('have.text', '');
        });
        
      });


  });