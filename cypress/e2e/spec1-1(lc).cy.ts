describe('create comment', () => {
  it('should login, navigate to profile page, click review button, and submit a review correctly', () => {
    cy.visit('http://localhost:3000/auth/login')

    cy.get('input[name=email]').type('yok@gmail.com')
    cy.get('input[name=password]').type('yok1234')

    cy.get('button[type=submit]').click()

    // Wait for the login to complete, adjust the wait time as needed
    cy.wait(7000)

    // Ensure the URL is as expected after login
    cy.url().should('eq', 'http://localhost:3000/')

    // Wait for the page to load, adjust the wait time as needed
    cy.wait(5000)

    // Visit the profile page
    cy.visit('http://localhost:3000/profile')

    // Click on the review button
    cy.get('[id="reviewButton"]').click()

    // Enter the review text in the textarea
    cy.get('textarea').type('nicenice')
    cy.get('input[value=5]').click({ force: true });

    // Click on the Send button to submit the review
    cy.get('button').contains('Send').click()

    // // Check if the success alert is displayed
    // cy.get('[severity="success"]').should('contain', 'Success Review')
    cy.get('#success-alert').should('contain', 'Success Review')
    cy.wait(7000)
    cy.visit('http://localhost:3000/')
    cy.wait(5000)
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

    //check last element should contain nicenice text that i recenly added
    cy.get('#rate:last').should('contain', 'nicenice')
    
    //--------------------------------------------------------------------------------
    //Check rating is invalid

    // Wait for the login to complete, adjust the wait time as needed
    cy.wait(5000)
    cy.visit('http://localhost:3000/')
    // Ensure the URL is as expected after login
    cy.url().should('eq', 'http://localhost:3000/')

    // Wait for the page to load, adjust the wait time as needed
    cy.wait(5000)

    // Visit the profile page
    cy.visit('http://localhost:3000/profile')

    // Click on the review button
    cy.get('[id="reviewButton"]').click()

    // Enter the review text in the textarea
    cy.get('textarea').type('nicenice')
    //cy.get('input[value=5]').click({ force: true });

    // Click on the Send button to submit the review
    cy.get('button').contains('Send').click()

    // Check if the alert is displayed
    cy.on('window:alert', (message) => {
      expect(message).to.equal('Please select a rating');
    });
  })
})
