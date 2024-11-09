import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
const customJestConfig = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // <= setup file here 
    testEnvironment: "jest-environment-jsdom",
  };
  
module.exports = createJestConfig(customJestConfig);