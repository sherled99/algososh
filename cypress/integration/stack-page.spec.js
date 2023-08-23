import {input, circle, addButton, clearButton} from '../../src/constants/test.js';
describe('Тестирование стека', () => {
    beforeEach(() => {
      cy.visit('/stack');
    });
  
    it('Кнопка добавления недоступна при пустом инпуте', () => {
      cy.get(input).should('be.empty');
      cy.get(addButton).should('be.disabled');
    });

    it('Элемент добавляется корректно в стек', () => {
        const inputValue = 'A';
    
        cy.get(input).type(inputValue);
        cy.get(addButton).should('not.be.disabled').click();
    
        cy.get(circle).should('have.length', 1).each(($circle) => {
          cy.wrap($circle).should('have.text', inputValue);
          cy.wrap($circle).find('[data-testid="changing"]');
        });
      });
      

      it('Элемент удаляется корректно из стека', () => {    
        const inputValue = 'A';
        cy.get(input).type(inputValue);
        cy.get(addButton).should('not.be.disabled').click();

        cy.get('[data-testid="remove-button"]').should('not.be.disabled').click();
        cy.get(circle).should('have.length', 0);
      });

      it('Кнопка "Очистить" работает корректно', () => {
    
        const inputValueA = 'A';
        cy.get(input).type(inputValueA);
        cy.get(addButton).should('not.be.disabled').click();

        const inputValuB = 'B';
        cy.get(input).type(inputValuB);
        cy.get(addButton).should('not.be.disabled').click();

        cy.get(clearButton).should('not.be.disabled').click();
        cy.get(circle).should('have.length', 0);
      });
  });