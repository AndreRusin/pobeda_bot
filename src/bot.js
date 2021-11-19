const puppeteer = require('puppeteer');
require('dotenv').config()

async function bot(debug) {
    const browser = await puppeteer.launch({
        headless: !debug,
        args: ['--no-sandbox'],
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

    await page.goto(process.env.CATEGORY_URL);
    await page.waitForTimeout(8000);

    //Дожидаемся и закрываем модалку с предложением выбрать города
    await page.waitForSelector('.j-modal-content .actions .j-button[data-action="current"]')
        .then(() => page.click('.j-modal-content .actions .j-button[data-action="current"]'));

    page.click('.j-modal-content .actions .j-button[data-action="current"]')

}

exports.bot = bot;