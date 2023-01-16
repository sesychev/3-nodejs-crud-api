/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "transform": {
    "^.+\\.(ts)?$": "ts-jest",
    "^.+\\.(js)$": "babel-jest"
  },
  "testMatch": ["**/*.test.ts"],
  "transformIgnorePatterns": ["./node_modules/"],
  "forceExit": true,
  "clearMocks": true,
  "resetMocks": true,
  "restoreMocks": true
};