const puppeteer = require('puppeteer');
const { startScanner } = require('./pageScanner.js');
require('dotenv').config()

async function bot(debug) {
    const browser = await puppeteer.launch({
        headless: !debug,
        args: ['--no-sandbox'],
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

    await page.goto(process.env.CATEGORY_URL);
    //await page.waitForTimeout(8000);

    //Дожидаемся и закрываем модалку с предложением выбрать города и кликаем по текущему городу
    await page.waitForSelector('.j-modal-content .actions .j-button[data-action="current"]')
        .then(() => page.click('.j-modal-content .actions .j-button[data-action="current"]'));

    // кликаем по кнопке авторизации
    page.click('.j-dropdown.nav-item[data-name="navbar-profile"]')

    // логинемся
    try {
        await page.waitForSelector('.j-input-group input[name="phone"]')
            //.then(() => page.waitForTimeout(3000))
            .then(() => page.focus('.j-input-group input[name="phone"]'))
            .then(() => page.type('.j-input-group input[name="phone"]', process.env.LOGIN))
            .then(() => page.focus('.j-input-group input[name="password"]'))
            .then(() => page.type('.j-input-group input[name="password"]', process.env.PASSWORD))

            .then(() => page.keyboard.press('Enter'))
            .then(() => page.waitForTimeout(5000))
            .then(() => console.log('logged in!'))
    } catch (e) {
        throw new Error('Check that you used correctly username and posting key. (dont use email and password)');
    }

    //await page.waitForTimeout(5000);

    await startScanner(browser, page);
}

exports.bot = bot;