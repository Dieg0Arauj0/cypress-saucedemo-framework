
const fs = require('fs')
const path = require('path')
const { defineConfig } = require('cypress')

module.exports = defineConfig({
    reporter: 'cypress-mochawesome-reporter',

    downloadsFolder: 'cypress/downloads',

    reporterOptions: {
        charts: true,
        reportPageTitle: 'Relatório E2E - SauceDemo',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
        saveJson: true,
    },

    e2e: {
        baseUrl: 'https://www.saucedemo.com',

        setupNodeEvents(on, config) {
            // Inicializa o plugin do Mochawesome
            require('cypress-mochawesome-reporter/plugin')(on)

            // Task para localizar o PDF mais recente
            on('task', {
                getLatestPdf() {
                    const downloadsFolder = path.join(
                        config.projectRoot,
                        'cypress',
                        'downloads'
                    )

                    const timeout = 10000
                    const interval = 200
                    const start = Date.now()

                    return new Promise((resolve) => {
                        const checkPdf = () => {
                            if (fs.existsSync(downloadsFolder)) {
                                const files = fs.readdirSync(downloadsFolder)
                                    .filter(file => file.toLowerCase().endsWith('.pdf'))
                                    .map(file => ({
                                        name: file,
                                        time: fs.statSync(
                                            path.join(downloadsFolder, file)
                                        ).mtimeMs
                                    }))
                                    .filter(file => file.time >= start)
                                    .sort((a, b) => b.time - a.time)

                                if (files.length > 0) {
                                    return resolve(
                                        path.join(downloadsFolder, files[0].name)
                                    )
                                }
                            }

                            if (Date.now() - start >= timeout) {
                                return resolve(null)
                            }

                            setTimeout(checkPdf, interval)
                        }

                        checkPdf()
                    })
                },
            })

            return config
        },
    },
})
