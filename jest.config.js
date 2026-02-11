/** @type {import('jest').Config} */
export default {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],

  // Поддержка ESM
  extensionsToTreatAsEsm: [".ts", ".tsx"],

  // Полифиллы для Node.js globals (TextEncoder/TextDecoder для MSW)
  setupFiles: ["<rootDir>/jest.setup.js"],

  moduleNameMapper: {
    // Алиасы FSD
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@entities/(.*)$": "<rootDir>/src/entities/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    // Стили
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    // Статические файлы
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testMatch: ["<rootDir>/src/**/*.(spec|test).(ts|tsx)"],

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.jest.json",
      },
    ],
  },

  transformIgnorePatterns: [],

  moduleDirectories: ["node_modules", "<rootDir>/src"],

  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
    "!src/**/*.stories.{ts,tsx}",
    "!src/vite-env.d.ts",
  ],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "mjs"],
};
