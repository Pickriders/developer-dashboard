// @ts-check
const nextJest = require("next/jest");

// next/jest wires SWC, .env loading and CSS/image stubs the same way `next build` does.
const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "node",
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
  testMatch: ["<rootDir>/src/**/*.test.ts", "<rootDir>/src/**/*.test.tsx"],
  clearMocks: true,
  // The generated client is verified by tsc, not by coverage numbers.
  coveragePathIgnorePatterns: ["/node_modules/", "<rootDir>/src/services/apiService/"],
};

module.exports = createJestConfig(config);
