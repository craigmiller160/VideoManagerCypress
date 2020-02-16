describe('Test spec', () => {
	it('testing env', () => {
		const url = Cypress.env('CYPRESS_host_url');
		cy.visit(url);
	});
});