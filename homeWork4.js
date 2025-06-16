import { browser } from "@wdio/globals";

describe("GitHub Sign Up Flow", () => {
  it("Sign-up steps", async () => {
    await browser.url("https://github.com/");

    const signUpLink = await $('a[href*="/signup?ref_cta=Sign+up"]');
    await signUpLink.waitForClickable({ timeout: 10000 });
    await signUpLink.click();

    const header = await $("h1");
    await header.waitForDisplayed({ timeout: 5000 });
    const text = await header.getText();
    expect(text).toContain("Create your free account");

    const emailField = await $("#email");
    const passwordField = await $("#password");
    const usernameField = await $("#login");

    await emailField.waitForDisplayed();
    await passwordField.waitForDisplayed();
    await usernameField.waitForDisplayed();

    await emailField.setValue("testemail@example.com");
    await passwordField.setValue("StrongP@ssw0rd12345");
    await usernameField.setValue("uniqueusername2025");

    const emailPrefsCheckbox = await $('input[name="opt_in"]');
    if (await emailPrefsCheckbox.isExisting()) {
      await emailPrefsCheckbox.waitForDisplayed();
      if (!(await emailPrefsCheckbox.isSelected())) {
        await emailPrefsCheckbox.click();
      }
    }
    await browser.pause(5000);
  });

  it("Check Millions of developers section", async () => {
    await browser.url("https://github.com/");
    await browser.pause(2000);

    await browser.execute(() => window.scrollBy(0, 1500));
    await browser.pause(1000);

    const tryProHeader = await $(
      "h2=Millions of developers and businesses call GitHub home"
    );
    await tryProHeader.scrollIntoView();
    await expect(tryProHeader).toBeDisplayed();
    await browser.pause(1000);

    // Вибачаюсь я тут і далі почала використовувати XPath, щось поки не вдається мені писати селектори, треба буде більше практики
    const tryGitHubCopilotButton = await $(
      '//*[@id="cta"]/div/section/div/div/div/a/span/span'
    );
    await tryGitHubCopilotButton.click();
    await browser.pause(2000);

    const tryHeader2 = await $(
      "/html/body/div[1]/div[4]/main/div/div/div[1]/h1"
    );
    await tryHeader2.scrollIntoView();
    await expect(tryHeader2).toBeDisplayed();
    await browser.pause(1000);

    const tryNowButton = await $(
      "/html/body/div[1]/div[4]/main/div/div/div[3]/form/button/span/span"
    );
    await tryNowButton.click();
    await browser.pause(2000);
  });

  it("Check Subscribe", async () => {
    await browser.url("https://github.com/");
    await browser.pause(2000);

    const footer = await $("footer");
    await footer.scrollIntoView();
    const subscribeButton = await $(
      "/html/body/div[1]/footer/div[1]/div/section/a[2]"
    );
    const isClickable = await subscribeButton.isClickable();
    console.log("Subscribe button is clickable:", isClickable);
    await subscribeButton.click();

    const subscribeHeader = await $('//*[@id="hero-section-brand-heading"]');
    await expect(subscribeHeader).toBeDisplayed();

    const workEmailField = await $('//*[@id=":R11h76:"]');
    await workEmailField.waitForDisplayed();
    await workEmailField.waitForEnabled();
    await workEmailField.setValue("testemail@example.com");
    const countryDropDown = await $('//*[@id="country"]');
    const subscribeButton2 = await $('//*[@id="form"]/form/div/button');

    await workEmailField.setValue("testemail@example.com");
    await countryDropDown.selectByVisibleText("Ukraine");

    const checkbox = await $('//*[@id="gated-agree-marketingEmailOptin1"]');
    if (await checkbox.isExisting()) {
      await checkbox.waitForDisplayed();
      if (!(await checkbox.isSelected())) {
        await checkbox.click();
      }
    }
    await browser.pause(2000);
    await subscribeButton2.click();
    await browser.pause(2000);

    const thanksHeader = await $('//*[@id="hero-section-brand-heading"]');
    await expect(thanksHeader).toBeDisplayed();
    await browser.pause(2000);
  });

  it("Git search act", async () => {
    await browser.url("https://github.com/");

    const searchInputButton = await $(
      'svg.octicon.octicon-search[data-view-component="true"]'
    );
    const searchInputField = await $('//*[@id="query-builder-test"]');

    await searchInputButton.click();
    await searchInputButton.waitForDisplayed({ timeout: 10000 });
    await searchInputField.click();
    await searchInputField.setValue("act");
    await browser.keys("Enter");

    const firstResult = await $(
      "/html/body/div[1]/div[4]/main/react-app/div/div/div[1]/div/div/div[2]/div/div/div[1]/div[4]/div/div/div[1]/div/div[1]/h3/div/div[2]/a/span"
    );
    await firstResult.waitForDisplayed({ timeout: 10000 });

    const firstResultText = await firstResult.getText();
    expect(firstResultText.toLowerCase()).toContain("act");
  });

  it("Git Prising", async () => {
    await browser.url("https://github.com/");

    const prisingButton = await $(
      "/html/body/div[1]/div[3]/header/div/div[2]/div/nav/ul/li[6]/a"
    );

    await prisingButton.click();
    await browser.pause(2000);

    const prisingHeader1 = await $("/html/body/div[1]/div[4]/main/div[1]/h1");
    const compareAllFeaturesButton = await $(
      "/html/body/div[1]/div[4]/main/div[2]/div/div[3]/a"
    );

    await expect(prisingHeader1).toBeDisplayed();
    await browser.pause(2000);

    await compareAllFeaturesButton.scrollIntoView();
    await browser.pause(2000);
    await compareAllFeaturesButton.click();

    const compareFeaturesHeader = await $(
      "/html/body/div[1]/div[4]/main/div[4]/h1"
    );
    await expect(compareFeaturesHeader).toBeDisplayed();
    await browser.pause(2000);
  });
});
