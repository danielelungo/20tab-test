module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  //   transform: {
  //     "^.+\\.ts?$": "ts-jest",
  //   },
  //   transformIgnorePatterns: ["<rootDir>/node_modules/"],
  transform: {
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
}
