# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

Opted to use pnpm for development - here's how to install locally

https://pnpm.io/installation

In the project directory, you can run:

### `pnpm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `pnpm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `pnpm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Automation Testing

Decided to go with an end to end testing framework - [Playwright](https://playwright.dev/docs/intro)
It's easy to setup and use for frameworks like Svelte, not so much create-react-app. 

### `npx playwright test` 

Runs the e2e test in playwright headlessly in chrome as default.

### `npx playwright test --headed`

Runs the e2e test in playwright visually (headed) in a browser locally.

Following the instructions above, you would have to do a bit of setup - 
`npx playwright install` to install browsers locally to test against.

## Roadmap - todo

- navigation items in footer wai-aria + provide feedback when clicking
- fix playwright e2e testing, or consider moving towards testcafe or cypress
- deploy to free service like vercel or github pages to verify web performance + automation testing

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
