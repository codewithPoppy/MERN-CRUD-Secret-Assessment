describe("Navigation", () => {
  it("should add secret", () => {
    cy.visit("http://localhost:3000/");
    cy.get("input:first").type("This is a test secret");
    cy.get("input:last").type("100");
    cy.get("button").click();
    cy.wait(1000);
    cy.get("a:last").click();
    cy.wait(1000);
    cy.url().should("include", "/secret/");
    cy.get("h6:first").should("have.text", "Content: This is a test secret");
  });
  it("should show validation errors", () => {
    cy.visit("http://localhost:3000/");
    cy.get("button").click();
    cy.get("p").should(($p) => {
      expect($p, "3 items").to.have.length(3);
      expect($p.eq(0), "first item").to.contain(
        "Text cannot be an empty string"
      );
      expect($p.eq(1), "second item").to.contain(
        "Expiration time should be greater than zero"
      );
    });
  });
  it("should show not found error", () => {
    cy.visit("http://localhost:3000/secret/asdf");
    cy.wait(1000);
    cy.get("h6:first").should("have.text", "Secret not found");
  });
});
