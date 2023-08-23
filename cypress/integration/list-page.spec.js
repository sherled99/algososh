import {input, circle, addHeadButton, addTailButton, addIndexButton, removeIndexButton, inputIndex} from '../../src/constants/test.js';

describe('Поведение связанного списка', () => {
    beforeEach(() => {
      cy.visit('/list');
    });
  
    it('Кнопки недоступны при пустом инпуте', () => {
      cy.get(input).should('be.empty');
      cy.get(addHeadButton).should('be.disabled');
      cy.get(addTailButton).should('be.disabled');
      cy.get(addIndexButton).should('be.disabled');
      cy.get(removeIndexButton).should('be.disabled');
    });
  
    it('Дефолтный список отрисовывается корректно', () => {
      cy.get(circle).should('have.length', 0);
    });
  
    it('Элемент добавляется в head', () => {
      const inputValue = 'A';
  
      cy.get(input).type(inputValue);
      cy.get(addHeadButton).should('not.be.disabled').click();
  
      cy.get(circle).should('have.length', 1).each(($circle) => {
        cy.wrap($circle).should('have.text', inputValue);
      });
    });
  
    it('Элемент добавляется в tail', () => {
      const inputValue = 'B';
  
      cy.get(input).type(inputValue);
      cy.get(addTailButton).should('not.be.disabled').click();
  
      cy.get(circle).should('have.length', 1).each(($circle) => {
        cy.wrap($circle).should('have.text', inputValue);
      });
    });

    it('Удаление элемента из head', () => {
        const inputValue = 'A';
  
        cy.get(input).type(inputValue);
        cy.get(addHeadButton).should('not.be.disabled').click();

        cy.get('[data-testid="remove-head-button"]').should('not.be.disabled').click();
    
        cy.get(circle).should('have.length', 0);
      });
    
      it('Удаление элемента из tail', () => {
        const inputValue = 'B';
  
        cy.get(input).type(inputValue);
        cy.get(addTailButton).should('not.be.disabled').click();
    
        cy.get('[data-testid="remove-tail-button"]').should('not.be.disabled').click();
    
        cy.get(circle).should('have.length', 0);
      });

      it('Добавление элемента по индексу', () => {
        const inputValueA = 'A';
  
        cy.get(input).type(inputValueA);
        cy.get(addHeadButton).should('not.be.disabled').click();

        const inputValueB = 'B';
  
        cy.get(input).type(inputValueB);
        cy.get(addHeadButton).should('not.be.disabled').click();

        const inputValueX = 'X';
        const index = 1;
    
        cy.get(input).type(inputValueX);
        cy.get(inputIndex).type(index);
        cy.get(addIndexButton).should('not.be.disabled').click();
    
        cy.get(circle).should('have.length', 3).each(($circle, idx) => {
          if (idx === index) {
            cy.wrap($circle).should('have.text', inputValueX);
          }
        });
      });

      it('Удаление элемента по индексу', () => {
        const inputValueA = 'A';
  
        cy.get(input).type(inputValueA);
        cy.get(addHeadButton).should('not.be.disabled').click();

        const inputValueB = 'B';
  
        cy.get(input).type(inputValueB);
        cy.get(addHeadButton).should('not.be.disabled').click();


        const inputValueX = 'X';
        const index = 1;
    
        cy.get(input).type(inputValueX);
        cy.get(inputIndex).type(index);
        cy.get(addIndexButton).should('not.be.disabled').click();


        cy.get(inputIndex).type(index);
        cy.get(removeIndexButton).should('not.be.disabled').click();

        cy.get(circle).should('have.length', 3).each(($circle, idx) => {
          if (idx === index) {
            cy.wrap($circle).should('not.have.text', inputValueX);
          }
        });

      });      
  });
  