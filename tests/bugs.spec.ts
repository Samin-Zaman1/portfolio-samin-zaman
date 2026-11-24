import { expect, test, type Page } from "@playwright/test";

// Instant scrolling, so a scroll after hovering doesn't close the report card
test.use({ reducedMotion: "reduce" });

const bug = (page: Page, id: number) => page.locator(`[data-bug="${id}"]`);
const tag = (page: Page, id: number) => page.getByRole("button", { name: new RegExp(`^BUG-00${id}`) });
const card = (page: Page) => page.locator(".report");
const isTouch = () => test.info().project.name === "mobile-chrome";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("starts with 3 open bugs", async ({ page }) => {
  await expect(page.locator("[data-bug]:not(.fixed)")).toHaveCount(3);
  await expect(page.locator("#cnt")).toHaveText("0/3");
  await expect(page.locator("#foot")).toHaveText("build #0047 · known issues: 3");
});

for (const id of [1, 2, 3]) {
  test(`hovering BUG-00${id} shows its report, fully on screen`, async ({ page }) => {
    test.skip(isTouch(), "no hover on touch screens");
    await bug(page, id).scrollIntoViewIfNeeded();
    await bug(page, id).hover();
    await expect(card(page)).toBeVisible();
    await expect(card(page).locator("h4")).not.toBeEmpty();

    const box = (await card(page).boundingBox())!;
    const vp = page.viewportSize()!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(vp.width);
    expect(box.y + box.height).toBeLessThanOrEqual(vp.height);

    await page.mouse.move(0, 0);
    await expect(card(page)).toBeHidden();
  });
}

test("clicking a bug files it and fixes the element", async ({ page }) => {
  await bug(page, 2).click();
  await expect(bug(page, 2)).toHaveClass(/fixed/);
  await expect(page.locator("#cnt")).toHaveText("1/3");
  await expect(page.locator("#foot")).toHaveText("build #0047 · known issues: 2");
  await expect(page.locator("#toast")).toContainText("BUG-002 filed");
  await expect(tag(page, 2)).toHaveCount(0);

  // Filing the same element again changes nothing
  await bug(page, 2).click();
  await expect(page.locator("#cnt")).toHaveText("1/3");
});

test("clicking the red tag files the bug too", async ({ page }) => {
  test.skip(isTouch(), "touch needs two taps, tested below");
  await tag(page, 3).click();
  await expect(bug(page, 3)).toHaveClass(/fixed/);
  await expect(page.locator("#cnt")).toHaveText("1/3");
});

test("filing BUG-003 restores the Adapting list styles", async ({ page }) => {
  await expect(bug(page, 3)).toHaveClass(/broken/);
  await bug(page, 3).click();
  await expect(bug(page, 3)).not.toHaveClass(/broken/);
});

test("bugs can be found and filed with the keyboard", async ({ page }) => {
  test.skip(isTouch(), "no keyboard on touch screens");
  await tag(page, 1).focus();
  await expect(card(page)).toBeVisible();
  await expect(card(page).locator("h4")).toHaveText("Headline overlaps the intro paragraph");

  await page.keyboard.press("Escape");
  await expect(card(page)).toBeHidden();

  await page.keyboard.press("Enter");
  await expect(bug(page, 1)).toHaveClass(/fixed/);
  await expect(card(page)).toBeHidden();

  await tag(page, 2).focus();
  await page.keyboard.press(" ");
  await expect(page.locator("#cnt")).toHaveText("2/3");
});

test("filing all 3 turns the build green", async ({ page }) => {
  for (const id of [1, 2, 3]) await bug(page, id).click();
  await expect(page.locator("body")).toHaveClass(/stable/);
  await expect(page.locator("#build")).toContainText("build passing");
  await expect(page.locator("#cnt")).toHaveText("3/3");
  await expect(page.locator("#toast")).toContainText("All 3 found");
});

test("report card ID matches the bug tag", async ({ page }) => {
  test.skip(isTouch(), "no hover on touch screens");
  await bug(page, 1).hover();
  await expect(card(page).locator(".key")).toHaveText("Portfolio / BUG-001");
});

test("on a touch screen the first tap shows the report and the second files it", async ({ page }) => {
  test.skip(!isTouch(), "touch only");
  await bug(page, 2).tap();
  await expect(card(page)).toBeVisible();
  await expect(card(page)).toContainText("Tap again to file this bug");
  await expect(bug(page, 2)).not.toHaveClass(/fixed/);

  await bug(page, 2).tap();
  await expect(bug(page, 2)).toHaveClass(/fixed/);
  await expect(card(page)).toBeHidden();
});

test("on a touch screen tapping elsewhere closes the report without filing", async ({ page }) => {
  test.skip(!isTouch(), "touch only");
  await bug(page, 2).tap();
  await expect(card(page)).toBeVisible();
  await page.locator(".sec h2").first().tap();
  await expect(card(page)).toBeHidden();
  await expect(page.locator("#cnt")).toHaveText("0/3");
});
