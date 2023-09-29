import puppeteer from 'puppeteer';
import { dirname, join} from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));



async function takeScreenshot() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set navigation timeout to 0 (no timeout)
  page.setDefaultNavigationTimeout(0); 

  await page.goto('https://youtube.com');
  await page.screenshot({ path: join(__dirname ,'screenshot2.png') }); // Specify the full file path and format
  await browser.close();
}

takeScreenshot();