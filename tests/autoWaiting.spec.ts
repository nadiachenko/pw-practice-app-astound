import {test, expect} from "@playwright/test"

test.beforeEach(async ({page}) => {
    await page.goto('http://www.uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})

test ("AutoWaiting1", async({page}) => {
    const successBtn = page.locator('.bg-success')

    await successBtn.click()
    const text = await successBtn.textContent()
    expect(text).toEqual('Data loaded with AJAX get request.')

    //allTextContents do not have autowait logic 
    // await successBtn.waitFor({state: "attached"})
    // const text = await successBtn.allTextContents()
    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successBtn).toHaveText('Data loaded with AJAX get request.',{timeout: 20000})
})

// test ("Alternative Waiting", async({page}) => {
//     const successBtn = page.locator('.bg-success')

// await page.waitForSelector('.bg-success')
// const text = await successBtn.allTextContents()
//      expect(text).toContain('Data loaded with AJAX get request.')

//      //wait for response 
//     // await page.waitForResponse('http://www.uitestingplayground.com/ajaxdata')

//      //wait for calls to be completed(not recommended)
//      await page.waitForLoadState('networkidle')
// })

test.only ("er", async({page}) => {
    //test.setTimeout(10000)
    //test.slow()
    const successBtn = page.locator('.bg-success')
    await successBtn.click()
})

//npx playwright test AutoWaiting --project=chromium --headed