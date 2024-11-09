import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './',
})
 
const customJestConfig = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testEnvironment: "jest-environment-jsdom",
  };
  
module.exports = createJestConfig(customJestConfig);