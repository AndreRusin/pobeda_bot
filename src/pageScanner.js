require('dotenv').config()

async function startScanner(browser, page) {
    let lustProductBarcode = await page.$$eval('.filter-grid .card.is-lazy .card-wrapper', barcodes => {
        return barcodes[0].dataset.barcode;
    });

    while (true) {
        await page.reload().then(() => page.waitForTimeout(3000));
        const currentLustProduct = await getLustProduct(page);

        if(currentLustProduct !== lustProductBarcode) {
            console .log('Новый!')
            lustProductBarcode = currentLustProduct;
        } else {
            console .log('Нету новых')
        }

    }
}

async function getLustProduct(page) {
    return await page.$$eval('.filter-grid .card.is-lazy .card-wrapper', barcodes => {
        return barcodes[0].dataset.barcode;
    });
}

exports.startScanner = startScanner;