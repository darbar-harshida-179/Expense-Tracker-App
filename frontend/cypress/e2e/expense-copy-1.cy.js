describe('Expense Tracker App Full Testing', () => {

  it('login, add, update, delete, budget check and logout', () => {

    // Desktop viewport
    cy.viewport(1400, 900)

    // =========================
    // LOGIN
    // =========================

    cy.visit('http://localhost:5173/login')

    cy.get('input[name="email"]')
      .type('harshida@gmail.com')

    cy.get('input[name="password"]')
      .type('harshida@123')

    cy.get('button[type="submit"]')
      .click()

    cy.url().should('include', '/dashboard')

    // =========================
    // ADD EXPENSE
    // =========================

    cy.contains('button', 'Add')
      .click()

    cy.get('input[name="title"]')
      .type('Pizza')

    cy.get('input[name="amount"]')
      .type('500')

    cy.get('input[name="date"]')
      .type('2026-05-27')

    // React Select Category
    cy.get('[class*="control"]')
      .first()
      .click()

    cy.contains('[id*="option"]', 'Food')
      .click()

    cy.get('button[type="submit"]')
      .click()

    // Success verify
    cy.contains('Expense Added Successfully!')


    // OPEN VIEW EXPENSES PAGE
    // =========================

    cy.contains('View Expense')
      .click()

    cy.url().should('include', '/usersexpensescards')

    // =========================
    // UPDATE EXPENSE
    // =========================

    // Open edit modal
    cy.get('.text-green-600')
      .first()
      .click({ force: true })

    // Clear old amount
    cy.get('input[name="amount"]')
      .clear()
      .type('700')

    cy.get('button[type="submit"]')
      .click()

    // =========================
    // BUDGET LIMIT CHECK
    // =========================

    cy.contains('button', 'Add')
      .click()

    cy.get('input[name="title"]')
      .type('Expensive Shopping')

    cy.get('input[name="amount"]')
      .type('500000')

    cy.get('input[name="date"]')
      .type('2026-05-27')

    // Category select
    cy.get('[class*="control"]')
      .first()
      .click()

    cy.contains('[id*="option"]', 'Shopping')
      .click()

    cy.get('button[type="submit"]')
      .click()

    // Budget toast verify
    cy.contains('Budget Limit Exceeded')

    // Close modal manually if needed
    cy.get('body').type('{esc}')

    // =========================
    // DELETE EXPENSE
    // =========================

    cy.get('button')
      .find('svg')
      .filter('.text-red-500')
      .first()
      .click({ force: true })

    // Confirm delete
    cy.contains('button', 'Delete')
      .click()

    cy.contains('Expense Deleted Successfully!')

    // =========================
    // LOGOUT
    // =========================

    // Open profile dropdown
    cy.contains('Harshida')
      .click()

    // Click logout
    cy.contains('Logout')
      .click()

    // Confirm logout modal
    cy.contains('button', 'Yes')
      .click()

    // Verify login page
    cy.url().should('include', '/login')

  })

})