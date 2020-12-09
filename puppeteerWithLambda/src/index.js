/* eslint-disable @typescript-eslint/no-var-requires */
const chromium = require('chrome-aws-lambda');

module.exports.handler = async (event) => {
  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  const url = event.queryStringParameters && event.queryStringParameters.url;

  if (!url) {
    await browser.close();

    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'queryString url is required ex) url="https://example.com"'
      })
    };
  }

  try {
  await page.goto(url);

    const shot = await page.screenshot({
      encoding: 'base64'
    });

    await browser.close();
    return {
      statusCode: 200,
      body: JSON.stringify({
        base64: shot,
      })
    };
  } catch (error) {
    await browser.close();

    return {
      statusCode: 400,
      body: JSON.stringify({
        error
      })
    };
  }
};
