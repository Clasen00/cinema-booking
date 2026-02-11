/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],

  // Поддержка ESM
  extensionsToTreatAsEsm: [".ts", ".tsx"],

  // Полифиллы для Node.js globals (TextEncoder/TextDecoder для MSW)
  setupFiles: ["<rootDir>/jest.setup.cjs"],

  moduleNameMapper: {
    // apiClient мок (должен быть перед общими алиасами FSD)
    "^@/shared/api/apiClient$": "<rootDir>/__mocks__/@/shared/api/apiClient.ts",
    // Алиасы FSD
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@entities/(.*)$": "<rootDir>/src/entities/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    // MSW
    "^msw/node$": "<rootDir>/__mocks__/msw.cjs",
    "^msw$": "<rootDir>/__mocks__/msw.cjs",
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

  transformIgnorePatterns: [
    "node_modules/(?!(react-router-dom|react-router|@remix-run)/)",
  ],

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
