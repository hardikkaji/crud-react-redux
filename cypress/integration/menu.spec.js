/// <reference types="Cypress" />

context('Menu', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('should have three items', () => {
		cy.get('#navbarNav>ul>li').then((list) => {
			expect(list).to.have.length(3);
		});
	});

	it('should route to Add New Game Page', () => {
		cy.get("[automationid='Add New Game']").click().then(() => {
			cy.get("[automationid='heading']").then((data) => {
				expect(data.html()).to.be.equals("Add Game");
			});
		});
	});
});
