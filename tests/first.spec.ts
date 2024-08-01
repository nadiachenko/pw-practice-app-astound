import {test, expect} from "@playwright/test"

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test("Locator", async ({page}) => {
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

test ("User facing locator", async({page}) => {
     await page.getByRole('textbox', {name: 'Email'}).first().click()
     await page.getByRole('button', {name:'Sign in'}).first().click()
     await page.getByLabel('Email').first().click()
     await page.getByPlaceholder('Jane doe').first().click()
     await page.getByText('Using the Grid').click()
    await page.getByTitle('Iot Dashboard').click()
     await page.getByTestId('SignIn').click()
})


test ("Child elements", async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').click()
    await page.locator('nb-card').getByRole('button', {name:'Sign in'}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test ("Parent elements", async({page}) => {
    await page.locator('nb-card', {hasText:"Using the Grid"}).getByRole('textbox', {name:'Email'}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole('textbox', {name:'Email'}).click()
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name:'Email'}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name:'Password'}).click()
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name:'Email'}).click()
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name:'Email'}).click()
})


test ("Reuse of locators", async({page}) => {

    const basicForm =  page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name:'Email'})
   
    await emailField.fill("test@test.com")
    await basicForm.getByRole('textbox', {name:'Password'}).fill("1232212")
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})


test ("Extracting values", async({page}) => {

    const basicForm =  page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
   await expect(buttonText).toEqual('Submit')

   const radioBtnLabels = await page.locator('nb-radio').allTextContents()
   expect(radioBtnLabels).toContain('Option 1')

   const emailField = basicForm.getByRole('textbox', {name:'Email'})
   await emailField.fill('test@test.com')
   const emailValue = await emailField.inputValue()
   expect(emailValue).toEqual('test@test.com') 

const placeholderValue = await emailField.getAttribute('placeholder')
expect(placeholderValue).toEqual('Email')

})

//ASSERTIONS
test.only (" assertions", async({page}) => {
//General assertion
    const basicFormBtn =  page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
  const textContent = await basicFormBtn.textContent()

   expect(textContent).toEqual('Submit')

//locator assertion
   await expect(basicFormBtn).toHaveText('Submit')

   //soft assertion
   await expect.soft(basicFormBtn).toHaveText('Submit5')
   await basicFormBtn.click()
})


//npx playwright test --project=chromium --headed