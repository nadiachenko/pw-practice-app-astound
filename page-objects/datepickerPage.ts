import { Page, expect } from "@playwright/test"
import {HelperBase} from "./helperBase"

export class DatepickerPage extends HelperBase {

    constructor(page: Page) {
       super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDays: number) {
        const calendarInput = this.page.getByPlaceholder('Form Picker')
        await calendarInput.click()
        const assertionDate = await this.selectDate(numberOfDays)
        await expect(calendarInput).toHaveValue(assertionDate)
    }

    async selectDateoickerWithRange (startDayFromToday: number, endDayFromToday: number) {
        const calendarInput = this.page.getByPlaceholder('Range Picker')
        await calendarInput.click()
        const assertionDateStart = await this.selectDate(startDayFromToday)
        const assertionDateEnd = await this.selectDate(endDayFromToday)
const dateToAssert = `${assertionDateStart} - ${assertionDateEnd}`
await expect(calendarInput).toHaveValue(dateToAssert)
    }
    private async selectDate(numberOfDays: number) {
        let date = new Date()
        date.setDate(date.getDate() + numberOfDays)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' })
        const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })
        const expectedYear = date.getFullYear()
        const assertionDate = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

        while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, { exact: true }).click()
        return assertionDate;
    }
}

