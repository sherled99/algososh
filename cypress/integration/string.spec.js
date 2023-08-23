import {input, circle} from '../../src/constants/test.js';
describe('Тестирование строки', () => {
    beforeEach(() => {
        cy.visit(`/recursion`);
    });
  
    it('Кнопка развертывания недоступна при пустом инпуте', () => {
      cy.get(input).should('be.empty');
      cy.get('[data-testid="reverse-button"]').should('be.disabled');
    });

    it('Кнопка развертывания работает корректно', () => {
        const inputText = 'hello';
        const reversedText = inputText.split('').reverse().join('');
    
        cy.get(input).type(inputText);
        cy.get('[data-testid="reverse-button"]').should('not.be.disabled').click();
    

        cy.get(circle).should('have.length', inputText.length).each(($circle, index) => {
          cy.wrap($circle).find('[data-testid="letter"]').should('have.text', reversedText[index]);
        });
      });
    
})  