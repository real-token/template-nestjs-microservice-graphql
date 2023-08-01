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
    testMatch: ["**/*.middleware.spec.ts"],
    coverageDirectory: "./coverage/middlewares",
    rootDir: "../../",
    collectCoverageFrom: [
        "src/middlewares/**/*.middleware.ts",
    ],
    coverageReporters: ["html", "text-summary"],
    testEnvironment: "node"
}