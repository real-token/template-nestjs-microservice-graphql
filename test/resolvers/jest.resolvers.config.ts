module.exports = {
    moduleFileExtensions: [
        "js",
        "json",
        "ts"
    ],
    transform: {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    collectCoverage: true,
    testMatch: ["**/*.resolver.spec.ts"],
    coverageDirectory: "./coverage/resolvers",
    rootDir: "../../",
    collectCoverageFrom: [
        "src/modules/**/*.resolver.ts",
    ],
    coverageReporters: ["html", "text-summary"],
    testEnvironment: "node"
}