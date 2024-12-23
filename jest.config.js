module.exports = {
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
        '^.+\\.svg$': 'jest-transform-stub', // 添加这一行
    },
    transformIgnorePatterns: [
        '/node_modules/(?!node-fetch)',
    ],
    moduleNameMapper: {
        '\\.svg$': '<rootDir>/__mocks__/svgMock.js', // 添加这一行
    },
};