// const { defineConfig } = require("cypress");
// import { defineConfig } from "cypress";
// import cucumber from 'cypress-cucumber-preprocessor';

export default {
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    //specPattern: "**/*.feature",
    baseUrl: 'http://localhost:5173/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // on("file:preprocessor", cucumber());
    },
  },
};
