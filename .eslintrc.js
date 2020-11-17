module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    extends: ["plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        "prettier/@typescript-eslint" // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    ],
    parserOptions: {
        sourceType: "module",
        project: '**/tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 11,
        ecmaFeatures: {
            jsx: false
        }
    }, rules: {
        "camelcase": "off",
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "warn",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/prefer-for-of": "warn",
        "@typescript-eslint/triple-slash-reference": "error",
        "@typescript-eslint/unified-signatures": "warn",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "no-return-await": "off",
        "@typescript-eslint/return-await": ["error", 'in-try-catch'],
        "comma-dangle": "off",
        "constructor-super": "error",
        "curly": ["error", "all"],
        "eqeqeq": ["warn", "always"],
        "no-cond-assign": "error",
        "no-duplicate-case": "error",
        "no-duplicate-imports": "error",
        "no-empty": ["error", {
            "allowEmptyCatch": true
        }],
        "object-curly-spacing": ["error", "never"],
        "no-invalid-this": "off",
        "no-new-wrappers": "error",
        "no-redeclare": "error",
        "no-sequences": "error",
        "no-shadow": "off",
        "quotes": ["error", "single", {"avoidEscape": true}],
        "no-throw-literal": "error",
        "no-unsafe-finally": "error",
        "no-unused-labels": "error",
        "no-var": "warn",
        "no-void": "error",
        "prefer-const": "warn",
        semi: ["error", "never"]
    }, "plugins": ["@typescript-eslint"]
};