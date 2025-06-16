import { browser, expect } from "@wdio/globals";

describe("Webdriverio - API page", () => {
  it("should scroll to footer and check Help link", async () => {
    await browser.url("https://webdriver.io/docs/api");

    const footer = await $("footer");
    await footer.scrollIntoView();
    const helpLink = await $('footer a[href="/community/support"]');

    const isEnabled = await helpLink.isEnabled();
    console.log("Help link is enabled:", isEnabled);
  });

  it("Check Help link is displayed", async () => {
    await browser.url("https://webdriver.io/docs/api");

    const footer = await $("footer");
    await footer.scrollIntoView();
    const helpLink = await $('footer a[href="/community/support"]');

    const isDisplayed = await helpLink.isDisplayed();
    console.log("Help link is displayed:", isDisplayed);
  });

  it("Check Help link is visible", async () => {
    await browser.url("https://webdriver.io/docs/api");

    const footer = await $("footer");
    await footer.scrollIntoView();
    const helpLink = await $('footer a[href="/community/support"]');
    const location = await helpLink.getLocation();
    const windowSize = await browser.getWindowSize();
    const isInViewport = location.y >= 0 && location.y <= windowSize.height;
    console.log("Help link is in viewport:", isInViewport);
  });

  it("Check Help link is clickable", async () => {
    await browser.url("https://webdriver.io/docs/api");

    const footer = await $("footer");
    await footer.scrollIntoView();
    const helpLink = await $('footer a[href="/community/support"]');

    const isClickable = await helpLink.isClickable();
    console.log("Help link is clickable:", isClickable);
  });

  it("Check Help link is get HTML", async () => {
    await browser.url("https://webdriver.io/docs/api");

    const footer = await $("footer");
    await footer.scrollIntoView();
    const helpLink = await $('footer a[href="/community/support"]');

    const html = await helpLink.getHTML(false);
    console.log("Help link HTML:", html);
  });
});
