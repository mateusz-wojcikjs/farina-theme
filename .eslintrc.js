module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    plugins: ["html"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    parser: "@typescript-eslint/parser"
}