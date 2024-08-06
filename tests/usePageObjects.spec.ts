import { test, expect } from "@playwright/test"
import {PageManager} from "../page-objects/pageManager"
import {faker} from '@faker-js/faker'

test.beforeEach(async ({ page }) => {
    await page.goto('/')

})

test('navigate to form page', async ({ page }) => {
    const pm = new PageManager(page)
    

    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test.only('parametrized methods', async ({ page }) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`
   await pm.navigateTo().formLayoutsPage()
    await  pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWOWD, 'Option 1')
   await page.screenshot({path: 'screenshots/formLayiutsPage.png'})
   const buffer = await page.screenshot()
    await  pm.onFormLayoutsPage().submitInlineForm( randomFullName, randomEmail, false)
    await page.locator('nb-card', {hasText: "Inline Form"}).screenshot({path: 'screenshots/inlineForm.png'})
    await pm.navigateTo().datepickerPage()
    await  pm.onDatepickerPage().selectCommonDatePickerDateFromToday(5)
    await  pm.onDatepickerPage().selectDateoickerWithRange(2,5)
})

// npx playwright test usePageObjects --project=chromium --headed