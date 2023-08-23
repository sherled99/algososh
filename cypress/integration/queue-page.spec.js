import {input, circle, addButton, clearButton} from '../../src/constants/test.js';
describe('Тестирование очереди', () => {
    beforeEach(() => {
      cy.visit('/queue');
    });
  
    it('Кнопка добавления недоступна при пустом инпуте', () => {
      cy.get(input).should('be.empty'); // Убедитесь, что инпут пустой
      cy.get(addButton).should('be.disabled'); // Проверьте, что кнопка добавления недоступна
    });

    it('Элемент добавляется корректно в очередь', () => {
        const inputValues = ['A', 'B'];
    
        cy.get(input).type(inputValues[0]);
        cy.get(addButton).should('not.be.disabled').click();
    

        cy.get(circle).eq(0).should('have.text', inputValues[0]);
        cy.get(circle).eq(0).find('[data-testid="changing"]');

        cy.get(input).type(inputValues[1]);
        cy.get(addButton).should('not.be.disabled').click();
                
        cy.get(circle).eq(1).should('have.text', inputValues[1]);
        cy.get(circle).eq(1).find('[data-testid="changing"]');
    });

    it('Элемент удаляется корректно из стека', () => {
        cy.get(input).type('A');
        cy.get(addButton).should('not.be.disabled').click();
      
        cy.get(input).type('B');
        cy.get(addButton).should('not.be.disabled').click();
      
        cy.get('[data-testid="remove-button"]').should('not.be.disabled').click();
      
        cy.get(circle).first().should('have.text', '');
        
      });

      it('Кнопка "Очистить" очищает стек', () => {
        cy.get(input).type('A');
        cy.get(addButton).should('not.be.disabled').click();
      
        cy.get(input).type('B'); 
        cy.get(addButton).should('not.be.disabled').click();
      
        cy.get(clearButton).should('not.be.disabled').click();
      
        cy.get(circle).each(($circle) => {
         cy.wrap($circle).should('have.text', '');
        });
        
      });


  });