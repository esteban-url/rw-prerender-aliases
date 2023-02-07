// More info at https://redwoodjs.com/docs/project-configuration-dev-test-build

const config = {
  rootDir: '../',
  preset: '@redwoodjs/testing/config/jest/web',
  moduleNameMapper: {
    '^@ui/(.*)': '<rootDir>/web/src/components/ui/$1',
  },
}

module.exports = config
