module.exports = {
  roots: ['<rootDir>/src'],
  rootDir: './',
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],

  transform: {
    '^.+.tsx?$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
};
