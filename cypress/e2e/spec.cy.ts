describe('Login and navigation feature', () => {
  it('should login and navigate to home page correctly', () => {
    cy.visit('http://localhost:3000/auth/login')

    cy.get('input[name=email]').type('yok@gmail.com')
    cy.get('input[name=password]').type('yok1234')

    cy.get('button[type=submit]').click()

    cy.url().should('eq', 'http://localhost:3000/')
    cy.visit('http://localhost:3000/restaurant/detail/1')

    cy.intercept({
      method: 'GET',
      url: 'https://redrice-backend-go.onrender.com/api/v1/restaurants/1/comments'
    }).as('getComments')

    cy.wait('@getComments').should(({ response }) => {
      expect(response?.statusCode).to.eq(200)
      expect(response?.body).to.be.an('array')
      expect(response?.body.length).to.be.greaterThan(0)
    })
  })
})