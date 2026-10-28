describe('Autenticação de Usuário (Login)', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('Deve autenticar com credenciais válidas', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.contains('Products').should('be.visible')
    })

    it('Deve autenticar ao pressionar Enter no campo de senha', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce{enter}')
        cy.contains('Products').should('be.visible')
    })

    it('Deve exibir mensagem de obrigatoriedade ao submeter o formulário vazio', () => {
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username is required')
    })
    it('Deve exigir o preenchimento do usuário quando a senha estiver informada', () => {
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain', 'Username is required')
    })
    it('Deve exigir o preenchimento da senha', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain', 'Password is required')
    })

    it('Deve rejeitar autenticação com campos preenchidos apenas por espaços em branco', () => {
        cy.get('[data-test="username"]').type(' ')
        cy.get('[data-test="password"]').type(' ')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('Deve remover a mensagem de erro ao acionar o botão de fechar', () => {
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('be.visible')
        cy.get('.error-button').click()
        cy.get('[data-test="error"]').should('not.exist')
    })

    it('Deve rejeitar autenticação com usuário inexistente', () => {
        cy.get('[data-test="username"]').type('invalid_user')
        cy.get('[data-test="password"]').type('invalid_password')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain', 'Username and password do not match any user in this service')
    })

    it('Deve rejeitar autenticação com senha incorreta', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('wrong_password')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain', 'Username and password do not match any user in this service')
    })

    it('Deve rejeitar usuário informado com letras maiúsculas', () => {
        cy.get('[data-test="username"]').type('STANDARD_USER')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain', 'Username and password do not match any user in this service')
    })

    it('Deve bloquear a autenticação de usuário bloqueado', () => {
        cy.get('[data-test="username"]').type('locked_out_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain', 'locked out')
    })

    it('Deve permitir adicionar produto ao carrinho independentemente de quebras visuais (visual_user)', () => {
        cy.get('[data-test="username"]').type('visual_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('contain', '1')
    })
    it('Deve encerrar a sessão e retornar à tela de login', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('#react-burger-menu-btn').click()
        cy.get('[data-test="logout-sidebar-link"]').click()
        cy.get('[data-test="login-button"]').should('be.visible')
        cy.url().should('eq', 'https://www.saucedemo.com/')
    })
})