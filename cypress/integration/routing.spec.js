describe('Проверка работы роутинга', () => {
    const pages = ['recursion', 'fibonacci', 'sorting', 'stack', 'queue', 'list'];
  
    it('Все страницы с визуализацией алгоритмов должны быть доступны', () => {
      pages.forEach((page) => {
        cy.visit(`/${page}`);
        cy.get('[data-testid="algorithm-page"]').should('be.visible');
      });
    });
  });
  