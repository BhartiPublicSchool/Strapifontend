// import { pathsToModuleNameMapper, JestConfigWithTsJest } from "ts-jest";
// import { compilerOptions } from "./tsconfig.json";

// const jestConfig: JestConfigWithTsJest = {
//     preset: "ts-jest",
//     moduleDirectories: ["node_modules", "<rootDir>"],
//     moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
// }

// export default jestConfig;




module.exports = {
    roots: ['<rootDir>/src', '<rootDir>/src/services'],
    testMatch: ['**/*.test.ts'],
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    collectCoverage: true,
    coveragePathIgnorePatterns: ['(test/.*.mock).(jsx?|tsx?)$'],
    silent: false,
    detectOpenHandles: true,
    setupFilesAfterEnv: ["./global.ts"],
    projects: ['<rootDir>'],
    preset: 'ts-jest',
    modulePaths: [
        "<rootDir>/src/",
        "<rootDir>/src/services",
        "<rootDir>/src/connectors",
        "<rootDir>/src/models"
    ],
    transform: {
        "^.+\\.tsx?$": ["ts-jest", {
            Diagnostics: false
        }],
    }
    // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    // testPathIgnorePatterns: ["/lib/", "/node_modules/"],
}