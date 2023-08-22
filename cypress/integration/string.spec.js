describe('Тестирование строки', () => {
    beforeEach(() => {
        cy.visit(`/recursion`);
    });
  
    it('Кнопка развертывания недоступна при пустом инпуте', () => {
      cy.get('[data-testid="input"]').should('be.empty');
      cy.get('[data-testid="reverse-button"]').should('be.disabled');
    });

    it('Кнопка развертывания работает корректно', () => {
        const inputText = 'hello';
        const reversedText = inputText.split('').reverse().join('');
    
        cy.get('[data-testid="input"]').type(inputText);
        cy.get('[data-testid="reverse-button"]').should('not.be.disabled').click();
    

        cy.get('[data-testid^="circle-"]').should('have.length', inputText.length).each(($circle, index) => {
          cy.wrap($circle).find('[data-testid="letter"]').should('have.text', reversedText[index]);
        });
      });
    
})  