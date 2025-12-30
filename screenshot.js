const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function takeScreenshot(iterationNum) {
    const browser = await chromium.launch();
    const page = await browser.newPage({
        viewport: { width: 1280, height: 800 }
    });

    const htmlPath = path.join(__dirname, 'public', 'index.html');
    await page.goto(`file://${htmlPath}`);

    const screenshotPath = path.join(__dirname, `screenshot-iteration-${iterationNum}.png`);
    await page.screenshot({
        path: screenshotPath,
        fullPage: true
    });

    console.log(`Screenshot saved to: ${screenshotPath}`);

    await browser.close();
}

const iteration = process.argv[2] || '1';
takeScreenshot(iteration);
