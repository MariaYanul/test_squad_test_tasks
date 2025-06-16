import { browser, expect } from "@wdio/globals";
describe("My first Webdriverio home task", () => {
  it("Open WebdriverIO home page and go to the API page", async () => {
    await browser.url("https://webdriver.io/");

    let apiButton = await $('//nav//a[text()="API"]');
    await expect(apiButton).toBeDisplayed();
    await apiButton.click();
    await browser.pause(2000);

    let url = await browser.getUrl();
    expect(url).toContain("/docs/api");
    console.log("API Url is: " + url);

    let introHeading = await $('//h2[text()="Introduction"]');
    await expect(introHeading).toBeDisplayed();
  });

  it("Check Intoduction header", async () => {
    await browser.url("https://webdriver.io/docs/api");

    let header = await $(
      "/html/body/div/div[3]/div/div/main/div/div/div/div/article/div[2]/header/h1"
    );
    console.log("Header is: " + (await header.getText()));
    let text = await header.getText();
    await expect(text).toBe("Introduction");
  });

  it("Check that WebDriver atribute is a link", async () => {
    await browser.url("https://webdriver.io/docs/api");

    let webDriverLink = await $("=WebDriver");
    await expect(webDriverLink).toBeDisplayed();
    let hrefValue = await webDriverLink.getAttribute("href");
    expect(hrefValue).toBeTruthy();
    console.log("WebDriver link href:", hrefValue);
  });

  it("Check Search field", async () => {
    await browser.url("https://webdriver.io/docs/api");

    let searchField = await $("button.DocSearch-Button");
    await expect(searchField).toBeDisplayed();
    await searchField.click();
    await browser.pause(2000);

    let searchInput = await $("input.DocSearch-Input");
    await browser.pause(2000);
    await searchInput.setValue("all is done");
    await browser.pause(5000);

    let clearButton = await $("button.DocSearch-Clear");
    await clearButton.waitForDisplayed();
    await clearButton.click();
    await browser.pause(2000);
  });
});
