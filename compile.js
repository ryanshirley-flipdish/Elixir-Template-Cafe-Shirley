// Import
var sass = require("sass")
const fs = require("fs").promises
const fsReg = require("fs")

// Devlopment type
const devType = process.argv.slice(2)

// Ensure dist folder exists
if (!fsReg.existsSync("dist"))
    fsReg.mkdirSync("dist")

    // Run compiler
;(async () => {
    try {
        console.log(`Running compiler for ${devType}!`)
        const packageJSON = JSON.parse(await fs.readFile("package.json"))
        const version = packageJSON.version.split(".")[0]

        // Minify CSS
        const { css } = minifyCss("src/styles.scss")

        // Write CSS to file
        const path = `dist/${devType}-v${version}.min.css`
        await fs.writeFile(
            path,
            ammendCompilerInformation(css.toString(), packageJSON.version)
        )

        console.log(`Finished compiling CSS!`)
    } catch (e) {
        console.log(e.message || e)
    }
})()

// Minify CSS function
function minifyCss(file) {
    return sass.renderSync({
        file,
        outputStyle: "compressed",
    })
}

// Ammend compiler information to CSS file
function ammendCompilerInformation(css, version) {
    const comment = `/*---------------------------------------------------------------------------------
Template Name:   Cafe Shirley
Author:          Flipdish
Website:         https://www.flipdish.com/
Version:         ${version}
Compiled Time:   ${new Date()}
--------------------------------- TEMPLATE CSS ----------------------------------*/\n`

    return comment + css
}
