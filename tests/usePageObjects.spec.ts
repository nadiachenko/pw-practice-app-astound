import { test, expect } from "@playwright/test"
import {PageManager} from "../page-objects/pageManager"

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')

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
   await pm.navigateTo().formLayoutsPage()
    await  pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@yest.com', 'Welcome1', 'Option 1')
    await  pm.onFormLayoutsPage().submitInlineForm('John Doe', 'test@yest.com', false)
    await pm.navigateTo().datepickerPage()
    await  pm.onDatepickerPage().selectCommonDatePickerDateFromToday(5)
    await  pm.onDatepickerPage().selectDateoickerWithRange(2,5)
})

// npx playwright test usePageObjects --project=chromium --headed