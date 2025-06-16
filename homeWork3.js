import { browser, expect } from "@wdio/globals";

describe("GitHub Home Page Tests", () => {
  beforeEach(async () => {
    await browser.url("https://github.com/");
  });

  it("TC1: should load the homepage and show logo", async () => {
    const logo = await $('a[href="/"] svg');
    expect(await logo.isDisplayed()).toBe(true);
  });

  it("TC2: should have the correct page title", async () => {
    const title = await browser.getTitle();
    expect(title).toContain("GitHub");
  });

  it('TC3: should display the "Sign in" button', async () => {
    const signInBtn = await $("=Sign in");

    await signInBtn.waitForDisplayed({ timeout: 10000 });
    expect(await signInBtn.isDisplayed()).toBe(true);
  });

  it('TC4: should redirect to login page after clicking "Sign in"', async () => {
    const signInBtn = await $("=Sign in");

    await signInBtn.waitForClickable({ timeout: 10000 });
    await signInBtn.click();

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/login"),
      {
        timeout: 10000,
        timeoutMsg: "Login page did not open in time",
      }
    );
    expect(await browser.getUrl()).toContain("/login");
  });

  it("TC5: should accept input in email field", async () => {
    const emailInput = await $('input[name="user_email"]');
    await emailInput.waitForDisplayed({ timeout: 5000 });
    await emailInput.setValue("test@example.com");
    expect(await emailInput.getValue()).toBe("test@example.com");
  });
});
