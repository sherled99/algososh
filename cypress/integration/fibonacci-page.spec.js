describe('Тестирование последовательности Фибоначчи', () => {
    beforeEach(() => {
      cy.visit('/fibonacci');
    });
  
    it('Кнопка развертывания недоступна при пустом инпуте', () => {
      cy.get('[data-testid="input"]').should('be.empty');
      cy.get('[data-testid="fibonacci-button"]').should('be.disabled');
    });

    it('Числа генерируются корректно', () => {
        const inputNumber = 5;
        const fibonacciSequence = [1, 1, 2, 3, 5];
    
        cy.get('[data-testid="input"]').type(inputNumber.toString());
        cy.get('[data-testid="fibonacci-button"]').should('not.be.disabled').click();
    
        cy.get('[data-testid^="circle-"]').should('have.length', inputNumber).each(($circle, index) => {
          cy.wrap($circle).find('[data-testid="letter"]').should('have.text', fibonacciSequence[index].toString());
        });
      });
  
  });