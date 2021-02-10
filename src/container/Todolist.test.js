const puppeteer = require('puppeteer');

/**
 * This is only for debugging purposes.
 */
const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: true,
  };
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {};
};

describe('Todo List', () => {
  let page;
  let browser;
  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400,
      },
      userAgent: '',
    });

    await page.goto('http://localhost:3000/todoList');
  }, 16000);
  
  afterEach(async () => {
    browser.close();
  })
  
  test('adds a todo correctly', async () => {
    //Adds a new task
    await page.waitForSelector('#new-task');
    await page.focus('#new-task');
    await page.keyboard.type('abcd');
    const newTaskEle = await page.$eval('#new-task', (e) => e.value);
    expect(newTaskEle).toBe('abcd');
    await page.click('.add-task');
    const liEle = await page.$eval(
      '#incomplete-tasks li:first-child label',
      (e) => e.innerHTML
    );
    expect(liEle).toBe('abcd');
  });

  test('completes a todo correctly', async () => {
    //Adds a new task
    await page.waitForSelector('#new-task');
    // add first task
    await page.focus('#new-task');
    await page.keyboard.type('abcd');
    await page.click('.add-task');
    // add second task
    await page.focus('#new-task');
    await page.keyboard.type('ghi');
    await page.click('.add-task');

    // complete the first task
    await page.click('#incomplete-tasks li:first-child .todo-complete');

    const completedLiEle = await page.$eval(
      '#completed-tasks li:first-child label',
      (e) => e.innerHTML
    );
    // Checks for the items in the completed lists
    expect((await page.$$('#completed-tasks li')).length).toBe(1);
    expect(completedLiEle).toBe('abcd');

    // Checks for the items in the incomplete lists
    const incompletedLiEle = await page.$eval(
      '#incomplete-tasks li:first-child label',
      (e) => e.innerHTML
    );
    expect((await page.$$('#incomplete-tasks li')).length).toBe(1);
    expect(incompletedLiEle).toBe('ghi');
  });

  test('deletes a todo correctly', async () => {
    //Adds a new task
    await page.waitForSelector('#new-task');
    // add first task
    await page.focus('#new-task');
    await page.keyboard.type('abcd');
    await page.click('.add-task');
    // add second task
    await page.focus('#new-task');
    await page.keyboard.type('ghi');
    await page.click('.add-task');

    // complete the first task
    await page.click('#incomplete-tasks li:first-child .delete');

    // Checks for the items in the incomplete lists
    const incompletedLiEle = await page.$eval(
      '#incomplete-tasks li:first-child label',
      (e) => e.innerHTML
    );
    expect((await page.$$('#incomplete-tasks li')).length).toBe(1);
    expect(incompletedLiEle).toBe('ghi');
  });

  test('edits a todo correctly', async () => {
    //Adds a new task
    await page.waitForSelector('#new-task');
    // add first task
    await page.focus('#new-task');
    await page.keyboard.type('abcd');
    await page.click('.add-task');

    await page.click('#incomplete-tasks li:first-child .edit');
    const incompleteEditField = '#incomplete-tasks li:first-child .edit-todo';
    await page.focus(incompleteEditField);
    // clears the field first
    await page.$eval(incompleteEditField, (el) => (el.value = ''));
    // replaces with a new value
    await page.keyboard.type('baz');
    await page.$eval(incompleteEditField, (e) => e.blur());

    const incompletedLiEle = await page.$eval(
      '#incomplete-tasks li:first-child label',
      (e) => e.innerHTML
    );
    expect(incompletedLiEle).toBe('baz');
  });
});
