import {test} from "@playwright/test"

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test.only("Locator", async ({page}) => {
   //byTagname
  await page.locator('input').first().click()
   //byID
   page.locator('#inputEmail')
   //by class
   page.locator('.shape-rectangle')
   //by attribute
   page.locator('[placeholder="Password"]')
   //by Class value
   page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
   //combination
   page.locator('[placeholder="Password"][nbinput]')
   //by Xpath(not recommended)
   page.locator('/html/body/ngx-app/ngx-pages/ngx-one-column-layout/nb-layout/div/div/div/div/div/nb-layout-column/ngx-form-elements/ngx-form-layouts/div[2]/div[1]/nb-card[1]/nb-card-body/form/div[2]')
//by text match
page.locator(':text("Using")')
//by exacttext match
page.locator(':text("Using the grid")')
})

