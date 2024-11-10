describe("Login and Logout Functionality", () => {
    beforeEach(() => {
      // Visit the root URL before each test
      cy.visit("/");
      cy.wait(1000); // Wait for the page to load
    });
  
    it("Logs in and then logs out the user", () => {
      // Log in the user first
      // Open the login form using a more specific selector
      cy.get('#registerForm button[data-auth="login"]').click();
      cy.wait(500); // Wait for the login form to open
  
      // Enter valid Noroff email and password
      cy.get("#loginEmail").type("testitestiiiiiiiiiiii@noroff.no");
      cy.get("#loginPassword").type("123456789");
  
      // Submit the login form
      cy.get("#loginForm").submit();
      cy.wait(1000); // Wait for the login to complete
  
      // Ensure that the logout button is visible, confirming the user is logged in
      cy.get('button[data-auth="logout"]', { timeout: 8000 }).should("be.visible");
  
      // Now log the user out
      cy.get('button[data-auth="logout"]').click();
      cy.wait(500); // Wait for logout to complete
  
      // Assert that the logout button is no longer visible
      cy.get('button[data-auth="logout"]').should("not.exist");
  
      // Optionally, check if the login button appears (if you have one)
      cy.get('button[data-auth="login"]').should("be.visible");
    });
  });
  