import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
    await page.goto('/')

})

test.describe('Form Layout', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: 'Email' })
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        //simulate keystroke
        await usingTheGridEmailInput.pressSequentially('test@test.com', { delay: 500 })

        //generic assertions
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test@test.com')

        //location assertion
        await expect(usingTheGridEmailInput).toHaveValue('test@test.com')

    })
    test.only('radiobuttons', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid" })
        // await usingTheGridForm.getByLabel('Option 1').check({ force: true })

        await usingTheGridForm.getByLabel('Option 1').check({ force: true })
        const radioStatus = await usingTheGridForm.getByLabel('Option 1').isChecked()
        await expect(usingTheGridForm).toHaveScreenshot()
        // expect(radioStatus).toBeTruthy()
        // await expect(usingTheGridForm.getByRole('radio', { name: 'Option 1' })).toBeChecked()

        // await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true })
        // expect(await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeFalsy()
        // expect(await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).isChecked()).toBeTruthy()
    })

})

test('checkbox', async ({ page }) => {

    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()
    // click just clicks on checkbox
    // await page.getByRole('checkbox', {name:'Hide on click'}).click({force:true})
    // check selects cb if it is not checked and if yes - does not uncheck
    await page.getByRole('checkbox', { name: 'Hide on click' }).check({ force: true })

    const allBoxes = page.getByRole('checkbox')
    for (const box of await allBoxes.all()) {
        await box.check({ force: true })
        expect(await box.isChecked()).toBeTruthy()
    }
})

test('drop downs and lists', async ({ page }) => {

    const dropDown = page.locator('ngx-header nb-select')
    await dropDown.click()
    page.getByRole('list') //<ul>
    page.getByRole('listitem') //<li>

    //const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
    //await optionList.filter({hasText: "Cosmic"}).click()
    const header = page.locator('nb-layout-header')
    //await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    for (const color in colors) {
        await optionList.filter({ hasText: color }).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if (color != "Corporate") {
            await dropDown.click()
        }


    }
})

test('tooltips', async ({ page }) => {

    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const tooltipCard = page.locator('nb-card', { hasText: 'Tooltip Placements' })
    await tooltipCard.getByRole('button', { name: "Top" }).hover()

    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
})

test('dialog box', async ({ page }) => {

    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()


    //browser dialog
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })
    await page.getByRole('table').locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})
test('tables', async ({ page }) => {

    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    const targetRow = page.getByRole('row', { name: 'mdo@gmail.com' })
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()

    //get the row based on the value in the specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowByID = page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1).getByText('11') })
    await targetRowByID.click()
    await targetRowByID.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowByID.locator('td').nth(5)).toHaveText('test@test.com')

    //filter of the table

    const ages = ['20', '30', '40', '200']
    for (let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')
        for (let row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent()
            if(age == '200') {
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else {
                expect(cellValue).toEqual(age)
            }
            
        }
    }
})
test('Date picker', async ({ page }) => {

    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()


    const calendarInput = page.getByPlaceholder('Form Picker')
    await calendarInput.click()

    let date = new Date()
    date.setDate(date.getDate()+1)

    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
    const expectedYear = date.getFullYear()
    const assertionDate = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

    while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact:true}).click()
    await expect(calendarInput).toHaveValue(assertionDate)
})

test('Slider', async ({ page }) => {
    // const temperatureGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    // await temperatureGauge.evaluate(node =>{
    //     node.setAttribute('cx', '232.630')
    //     node.setAttribute('cy', '232.630')
    // } )
    // await temperatureGauge.click()

    //2nd approach - mouce movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
await tempBox.scrollIntoViewIfNeeded()
const box = await tempBox.boundingBox()
const x = box.x + box.width/2
const y = box.y + box.height/2
await page.mouse.move(x,y)
await page.mouse.down()
await page.mouse.move(x+100,y)
await page.mouse.down(x+100, y+100)
await page.mouse.up()
await expect(tempBox).toContainText('26')
})


//npx playwright test uiComponents --project=chromium --headed
//Use the Ctrl + \ (Control + Backslash) or Cmd + \ on macOS to pause script execution.