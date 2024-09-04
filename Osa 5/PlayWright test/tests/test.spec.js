const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')

    await request.post('/api/users', {
      data: {
        username: 'TestUser',
        name: 'Testi Uuseri',
        password: '1234',
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const header = await page.getByText('Log in to application')

    await expect(header).toBeVisible()
  })

  describe('Login', () => {
    test('user can log in', async ({ page }) => {
      await loginWith(page, 'TestUser', '1234')

      await expect(page.getByText('Testi Uuseri logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('TestUser')
      await page.getByTestId('password').fill('wrong password')
      await page.getByRole('button', {name: 'login'}).click()

      await expect(page.getByText('Testi Uuseri logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'TestUser', '1234')
      await expect(page.getByText('Testi Uuseri logged in')).toBeVisible()
    })
  
    test('a new blog can be created and show in bloglist', async ({ page }) => {
      await createBlog(page, 'Testi titlenki...', 'Testi Uuseri', 'Testi urlinki...')
      await page.reload()
      await expect(page.getByText('Testi titlenki...view')).toBeVisible() 
    }) 

    test('add a like', async ({page}) => {
    /*
      // USE WHEN TEST.ONLY
      await createBlog(page, 'Testi titlenki...', 'Testi Uuseri', 'Testi urlinki...')
      await page.reload() 
    */
      await page.reload()

      const testBlog = await page.locator('text=Testi titlenki...view')
      await testBlog.getByRole('button', { name: 'view'}).click()
      await page.getByRole('button', { name: 'like' }).click()

      await page.reload()
 
      await testBlog.getByRole('button', { name: 'view'}).click()
      await expect(page.getByText('Likes 1like')).toBeVisible()
    }) 
 
    test('blog can remove', async ({page}) => {
    /*
      // USE WHEN TEST.ONLY
      await createBlog(page, 'Testi titlenki...', 'Testi Uuseri', 'Testi urlinki...')
      await page.reload()
    */
      const testBlog = await page.locator('text=Testi titlenki...view')
      await testBlog.getByRole('button', { name: 'view'}).click()

      page.on('dialog', async dialog => {
        expect(dialog.message()).toBe('remove blog Testi titlenki... by Testi Uuseri?')
        await dialog.accept()
      })
      await page.getByRole('button', { name: 'remove '}).click()

      await expect(page.locator('text=Testi titlenki...view')).not.toBeVisible()
    })

    test('only user can delete own blog', async ({page}) => {
    /*
      // USE WHEN TEST.ONLY
      await createBlog(page, 'Testi titlenki...', 'Testi Uuseri', 'Testi urlinki...')
      await page.reload()
    */
      const testBlog = await page.locator('text=Testi titlenki...view')
      await testBlog.getByRole('button', { name: 'view'}).click()

      const removeBtn = await page.getByRole('button', { name: 'remove '})
      expect(removeBtn).toBeVisible()
    })

    test('blogs are organized by likes', async ({page}) => {
    /*
      // USE WHEN TEST.ONLY
      await createBlog(page, 'Testi titlenki...', 'Testi Uuseri', 'Testi urlinki...')
      await page.reload()
    */
      const testBlog = await page.locator('text=Testi titlenki...view')
      await testBlog.getByRole('button', { name: 'view'}).click()
      await page.getByRole('button', { name: 'like' }).click();

      await page.reload()

      const last = page.locator('text=Testi titlenki...view').last()
      await expect(last).toBeVisible();
    })
  })
})