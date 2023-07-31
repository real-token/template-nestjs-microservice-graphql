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
    testMatch: ["**/*.service.spec.ts"],
    coverageDirectory: "./coverage/services",
    rootDir: "../../",
    collectCoverageFrom: [
        "src/modules/**/*.service.ts",
    ],
    coverageReporters: ["html", "text-summary"],
    testEnvironment: "node"
}