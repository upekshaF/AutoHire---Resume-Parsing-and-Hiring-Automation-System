export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {},
    moduleNameMapper: {},
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    // Add the following lines for ES module support
    
    testMatch: ['**/*.test.js'],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
  };
  