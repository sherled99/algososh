describe('Поведение связанного списка', () => {
    beforeEach(() => {
      cy.visit('/list');
    });
  
    it('Кнопки недоступны при пустом инпуте', () => {
      cy.get('[data-testid="input"]').should('be.empty');
      cy.get('[data-testid="add-head-button"]').should('be.disabled');
      cy.get('[data-testid="add-tail-button"]').should('be.disabled');
      cy.get('[data-testid="add-index-button"]').should('be.disabled');
      cy.get('[data-testid="remove-index-button"]').should('be.disabled');
    });
  
    it('Дефолтный список отрисовывается корректно', () => {
      cy.get('[data-testid^="circle-"]').should('have.length', 0);
    });
  
    it('Элемент добавляется в head', () => {
      const inputValue = 'A';
  
      cy.get('[data-testid="input"]').type(inputValue);
      cy.get('[data-testid="add-head-button"]').should('not.be.disabled').click();
  
      cy.get('[data-testid^="circle-"]').should('have.length', 1).each(($circle) => {
        cy.wrap($circle).should('have.text', inputValue);
      });
    });
  
    it('Элемент добавляется в tail', () => {
      const inputValue = 'B';
  
      cy.get('[data-testid="input"]').type(inputValue);
      cy.get('[data-testid="add-tail-button"]').should('not.be.disabled').click();
  
      cy.get('[data-testid^="circle-"]').should('have.length', 1).each(($circle) => {
        cy.wrap($circle).should('have.text', inputValue);
      });
    });

    it('Удаление элемента из head', () => {
        const inputValue = 'A';
  
        cy.get('[data-testid="input"]').type(inputValue);
        cy.get('[data-testid="add-head-button"]').should('not.be.disabled').click();

        cy.get('[data-testid="remove-head-button"]').should('not.be.disabled').click();
    
        cy.get('[data-testid^="circle-"]').should('have.length', 0);
      });
    
      it('Удаление элемента из tail', () => {
        const inputValue = 'B';
  
        cy.get('[data-testid="input"]').type(inputValue);
        cy.get('[data-testid="add-tail-button"]').should('not.be.disabled').click();
    
        cy.get('[data-testid="remove-tail-button"]').should('not.be.disabled').click();
    
        cy.get('[data-testid^="circle-"]').should('have.length', 0);
      });

      it('Добавление элемента по индексу', () => {
        const inputValueA = 'A';
  
        cy.get('[data-testid="input"]').type(inputValueA);
        cy.get('[data-testid="add-head-button"]').should('not.be.disabled').click();

        const inputValueB = 'B';
  
        cy.get('[data-testid="input"]').type(inputValueB);
        cy.get('[data-testid="add-head-button"]').should('not.be.disabled').click();


        const inputValueX = 'X';
        const index = 1;
    
        cy.get('[data-testid="input"]').type(inputValueX);
        cy.get('[data-testid="input-index"]').type(index);
        cy.get('[data-testid="add-index-button"]').should('not.be.disabled').click();
    
        cy.get('[data-testid^="circle-"]').should('have.length', 3).each(($circle, idx) => {
          if (idx === index) {
            cy.wrap($circle).should('have.text', inputValueX);
          }
        });
      });

      it('Удаление элемента по индексу', () => {
        const inputValueA = 'A';
  
        cy.get('[data-testid="input"]').type(inputValueA);
        cy.get('[data-testid="add-head-button"]').should('not.be.disabled').click();

        const inputValueB = 'B';
  
        cy.get('[data-testid="input"]').type(inputValueB);
        cy.get('[data-testid="add-head-button"]').should('not.be.disabled').click();


        const inputValueX = 'X';
        const index = 1;
    
        cy.get('[data-testid="input"]').type(inputValueX);
        cy.get('[data-testid="input-index"]').type(index);
        cy.get('[data-testid="add-index-button"]').should('not.be.disabled').click();


        cy.get('[data-testid="input-index"]').type(index);
        cy.get('[data-testid="remove-index-button"]').should('not.be.disabled').click();

        cy.get('[data-testid^="circle-"]').should('have.length', 3).each(($circle, idx) => {
          if (idx === index) {
            cy.wrap($circle).should('not.have.text', inputValueX);
          }
        });

      });      
  });
  