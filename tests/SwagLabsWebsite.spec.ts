import{test,expect} from '@playwright/test';

test.describe("End to End Testing of Swag Labs Website",()=>{

      test.beforeEach(async ({ page }) => {
        await page.goto("https://www.saucedemo.com");
    });

     test("Automate Positive login functionality",async({ page })=>{
        //const context=await browser.newContext(); //Already page is openen in hooks no need to create another page, instead directly use page fixture
        //const page=await context.newPage();
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill("secret_sauce");
        await page.locator("#login-button").click();
    }),

   //For Negative Testing with invalid user name
    test("Automate Negative login functionality",async({ page })=>{
        //const context=await browser.newContext();
        //const page=await context.newPage();
        //await page.pause();
        await page.locator("#user-name").fill("standard_use");
        await page.locator("#password").fill("secret_sauce");
        await page.locator("#login-button").click();
    }),

    test("Automate cart and checkout page", async({ page })=>{
        //Verifying the URL
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill("secret_sauce");
        await page.locator("#login-button").click();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        //Verifying the Text
        await expect(page.locator(".app_logo")).toHaveText("Swag Labs");
        //Verifying count of products
        const products = page.locator('.inventory_item'); //taking all 6 items locator
        await expect(products).toHaveCount(6);
        //Verifying product name, description, price, and image for each product
        for(let i=0;i<await products.count();i++) //iterating over each item
        {
         await expect(products.nth(i).locator(".inventory_item_name")).toBeVisible();
         await expect(products.nth(i).locator(".inventory_item_desc")).toBeVisible();
         await expect(products.nth(i).locator('.inventory_item_price')).toBeVisible();
         await expect(products.nth(i).locator('.inventory_item_img img')).toBeVisible();
        }
        await page.locator('.inventory_item_name').first().click(); //taking name of the productor locator
        await expect(page.locator('.inventory_details_name')).toBeVisible();
        const productCount=await page.locator(".inventory_item").count();
        console.log(productCount);
        await page.getByText("Add to cart").click();
        await page.locator("#shopping_cart_container > a > span").click();
        await page.locator("#checkout").click();
        await page.locator("#first-name").fill("Nesara");
        await page.locator("#last-name").fill("Gowda");
        await page.locator("#postal-code").fill("560066");
        await page.locator("#continue").click();
        await page.locator("#finish").click();
        await expect (page.locator(".complete-header")).toHaveText("Thank you for your order!")
    })
});