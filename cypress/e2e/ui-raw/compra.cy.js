describe('Compra', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
    });

    it('Deve adicionar um produto ao carrinho', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', '1')
    })

    it('Deve remover um produto do carrinho', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
    })

    it('Deve adicionar múltiplos produtos ao carrinho', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
        cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', '4')
    })

    it('Deve ordenar os produtos por preço crescente', () => {
        cy.get('[data-test="product-sort-container"]').select('lohi')

        cy.get('[data-test="inventory-item-price"]').then($prices => {
            const prices = [...$prices].map(element =>
                Number(element.innerText.replace('$', ''))
            )

            const sortedPrices = [...prices].sort((a, b) => a - b)

            expect(prices).to.deep.equal(sortedPrices)
        })
    })

    it('Deve ordenar os produtos por preço decrescente', () => {
        cy.get('[data-test="product-sort-container"]').select('hilo')

        cy.get('[data-test="inventory-item-price"]').then($prices => {
            const prices = [...$prices].map(element =>
                Number(element.innerText.replace('$', ''))
            )

            const sortedPrices = [...prices].sort((a, b) => b - a)

            expect(prices).to.deep.equal(sortedPrices)
        })
    })
    it('Deve ordenar os produtos por nome em ordem decrescente', () => {
        cy.get('[data-test="product-sort-container"]').select('za')

        cy.get('[data-test="inventory-item-name"]').then($products => {
            const names = [...$products].map(element =>
                element.innerText
            )

            const sortedNames = [...names].sort((a, b) =>
                b.localeCompare(a, 'en')
            )

            expect(names).to.deep.equal(sortedNames)
        })
    })
    it('Deve apresentar o link correto para o perfil do X', () => {
        cy.get('[data-test="social-x"]')
            .should('have.attr', 'href', 'https://x.com/saucelabs')
    })

    it('Deve apresentar o link correto para o perfil do Facebook', () => {
        cy.get('[data-test="social-facebook"]')
            .should('have.attr', 'href', 'https://www.facebook.com/saucelabs')
    })

    it('Deve apresentar o link correto para o perfil do LinkedIn', () => {
        cy.get('[data-test="social-linkedin"]')
            .should('have.attr', 'href', 'https://www.linkedin.com/company/sauce-labs/')
    })
})