describe('Checkout', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
    });
    it('Deve concluir a compra de um único produto', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Diego')
        cy.get('[data-test="lastName"]').type('Araujo')
        cy.get('[data-test="postalCode"]').type('05143320')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()
        cy.contains('Thank you for your order!').should('be.visible')
    })
    it('Deve concluir a compra de dois produtos', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('[data-test="shopping-cart-badge"]') .should('have.text', '2')
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type('Diego')
    cy.get('[data-test="lastName"]').type('Araujo')
    cy.get('[data-test="postalCode"]').type('05143320')
    cy.get('[data-test="continue"]').click()
    cy.get('.cart_item').should('have.length', 2)
    cy.get('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Backpack').and('contain', 'Sauce Labs Bike Light')
    cy.get('[data-test="finish"]').click()
    cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!')
})
    it('Deve impedir o avanço quando todos os campos obrigatórios estiverem vazios', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="error"]').should('contain', 'Error: First Name is required')
    })
    it.skip('Deve rejeitar campos preenchidos apenas com espaços em branco', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type(' ')
        cy.get('[data-test="lastName"]').type(' ')
        cy.get('[data-test="postalCode"]').type(' ')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="error"]').should('contain', 'Error: First Name is required')
    })
    it('Deve exigir o preenchimento do sobrenome', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Diego')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="error"]').should('contain', 'Error: Last Name is required')
    })
    it('Deve exigir o preenchimento do código postal', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Diego')
        cy.get('[data-test="lastName"]').type('Araujo')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="error"]').should('contain', 'Error: Postal Code is required')
    })
    it('Deve retornar ao carrinho ao cancelar o checkout', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="cancel"]').click()
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html')
    })
    it('Deve retornar à página de produtos após concluir a compra', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Diego')
        cy.get('[data-test="lastName"]').type('Araujo')
        cy.get('[data-test="postalCode"]').type('05143320')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()
        cy.get('[data-test="back-to-products"]').click()
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    })
    it('Deve gerar e baixar o PDF do pedido', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()

        cy.get('[data-test="firstName"]').type('Diego')
        cy.get('[data-test="lastName"]').type('Araujo')
        cy.get('[data-test="postalCode"]').type('05143320')

        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()

        // Verifica se o botão está disponível e aciona o download
        cy.get('[data-test="generate-pdf-order"]')
            .should('be.visible')
            .and('be.enabled')
            .click()

        // Localiza o arquivo PDF baixado
        cy.task('getLatestPdf').then(filePath => {
            expect(filePath, 'PDF encontrado na pasta de downloads')
                .to.not.be.null

            // Verifica se o arquivo existe e não está vazio
            cy.readFile(filePath, null)
                .should('have.length.greaterThan', 0)
                .then(buffer => {
                    // Valida a assinatura de um arquivo PDF
                    expect(
                        buffer.toString('utf8', 0, 5)
                    ).to.equal('%PDF-')
                })
        })
    })
})