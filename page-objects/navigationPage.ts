import { Page } from "@playwright/test"
import {HelperBase} from "./helperBase"

export class NavigationPage extends HelperBase {

   
    constructor(page: Page) {
       super(page)
    }

    async formLayoutsPage() {
       await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
        await this.waitForNumberOfSeconds(2)
    }

    async datepickerPage() {
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }
    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }
    async toastrPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }
    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenuItem(groupitemTitle:string) {
const groupMenuItem = this.page.getByTitle(groupitemTitle)
const expanded = await groupMenuItem.getAttribute('aria-expanded')
if(expanded == 'false'){
    await groupMenuItem.click()
}
    }
}

// OPTION2
//export class NavigationPage {

//     readonly page: Page
//     readonly formLayoutsMenuItem: Locator
//     readonly datepickerMenuItem: Locator
//     readonly smartTableMenuItem: Locator
//     readonly toastrMenuItem: Locator
//     readonly tooltipMenuItem: Locator

//     constructor(page: Page) {
//         this.page = page
//         this.formLayoutsMenuItem = page.getByText('Form Layouts')
//         this.datepickerMenuItem = page.getByText('Datepicker')
//         this.smartTableMenuItem = page.getByText('Smart Table')
//         this.toastrMenuItem = page.getByText('Toastr')
//         this.tooltipMenuItem = page.getByText('Tooltip')

//     }

//     async formLayoutsPage() {
//         await this.selectGroupMenuItem('Forms')
//         await this.formLayoutsMenuItem.click()
//     }

//     async datepickerPage() {
//         await this.selectGroupMenuItem('Forms')
//         await this.datepickerMenuItem.click()
//     }
//     async smartTablePage() {
//         await this.selectGroupMenuItem('Tables & Data')
//         await this.smartTableMenuItem.click()
//     }
//     async toastrPage() {
//         await this.selectGroupMenuItem('Modal & Overlays')
//         await this.toastrMenuItem.click()
//     }
//     async tooltipPage() {
//         await this.selectGroupMenuItem('Modal & Overlays')y
//         await this.tooltipMenuItem.click()
//     }

//     private async selectGroupMenuItem(groupitemTitle:string) {
// const groupMenuItem = this.page.getByTitle(groupitemTitle)
// const expanded = await groupMenuItem.getAttribute('aria-expanded')
// if(expanded == 'false'){
//     await groupMenuItem.click()
// }
//     }
// }