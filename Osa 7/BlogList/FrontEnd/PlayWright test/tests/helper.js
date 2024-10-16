const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)

    await page.getByRole('button', { name: 'login' }).click()
  }

  const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', {name: 'create new blog'}).click()

    await page.getByPlaceholder('give a title').fill(title)
    await page.getByPlaceholder('give a author').fill(author)
    await page.getByPlaceholder('give a url').fill(url)

    await page.getByRole('button', {name: 'create'}).click()
  }
  
  export { loginWith, createBlog }