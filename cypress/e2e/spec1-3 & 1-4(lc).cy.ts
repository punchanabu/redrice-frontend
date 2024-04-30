describe('user story 1-3 and 1-4', () => {
  it('should show comment correctly', () => {
    cy.visit('http://localhost:3000/auth/login')

    cy.get('input[name=email]').type('yok@gmail.com')
    cy.get('input[name=password]').type('yok1234')

    cy.get('button[type=submit]').click()

    cy.wait(7000)
    cy.url().should('eq', 'http://localhost:3000/')
    cy.wait(7000)
    cy.visit('http://localhost:3000/restaurant/detail/1')

    //see in case of having comments
    cy.intercept({
      method: 'GET',
      url: 'https://redrice-backend-go.onrender.com/api/v1/restaurants/1/comments'
    }).as('getComments')

    cy.wait('@getComments').should(({ response }) => {
      expect(response?.statusCode).to.eq(200)
      expect(response?.body).to.be.an('array')
      expect(response?.body.length).to.be.greaterThan(0)
    })
    cy.wait(4000)
    cy.visit('http://localhost:3000/')
    cy.wait(3000)
    cy.visit('http://localhost:3000/restaurant/detail/2')

    //see in case of no comments
    cy.intercept({
      method: 'GET',
      url: 'https://redrice-backend-go.onrender.com/api/v1/restaurants/2/comments'
    }).as('getComments')

    cy.wait('@getComments').should(({ response }) => {
      expect(response?.statusCode).to.eq(200)
      expect(response?.body).to.be.an('array')
      expect(response?.body.length).to.equal(0)
    })
  })
})