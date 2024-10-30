/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: { projectService: true },
  settings: {
    "import/resolver": { typescript: true, node: true },
    react: { version: "detect" },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:unicorn/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@next/next/recommended",
    "plugin:@next/next/core-web-vitals",
    "prettier",
  ],
  plugins: ["simple-import-sort", "no-relative-import-paths"],
  rules: {
    "no-restricted-imports": [
      "error",
      { patterns: ["~/app*", "~/script*", "~/.*", "~/lib/*/"] },
    ],
    "no-restricted-globals": [
      "error",
      "window",
      "self",
      "global",
      "globalThis",
    ],
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "object-shorthand": "error",
    "arrow-body-style": "error",
    "lines-around-directive": "error",
    curly: ["error", "multi-or-nest", "consistent"],
    quotes: ["error", "double", { avoidEscape: true }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { ignoreRestSiblings: true },
    ],
    "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],
    "@typescript-eslint/no-empty-object-type": [
      "error",
      { allowInterfaces: "with-single-extends" },
    ],
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      },
    ],
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "import/no-cycle": "error",
    "import/no-self-import": "error",
    "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: false,
        peerDependencies: false,
        bundledDependencies: false,
        optionalDependencies: false,
      },
    ],
    "unicorn/no-null": "off",
    "unicorn/prefer-global-this": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        replacements: {
          lib: { library: false },
          env: { environment: false },
          ref: { reference: false },
          args: { arguments: false },
          params: { parameters: false },
          props: { properties: false },
        },
      },
    ],
    "react/prop-types": "off",
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    "react/self-closing-comp": "error",
    "react/jsx-no-useless-fragment": "error",
    "react/jsx-curly-brace-presence": "error",
    "react/jsx-boolean-value": "error",
    "react/jsx-filename-extension": [
      "error",
      { allow: "as-needed", extensions: [".tsx", ".jsx"] },
    ],
    "react-hooks/exhaustive-deps": "error",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["client", "server"].map((env) => `^\\u0000${env}-only$`), // Runtime environments
          ["^\\u0000[^\\.]"], // External side-effects
          ["^\\u0000~\\/"], // Internal side-effects
          ["^\\u0000\\.\\."], // Parent side-effects
          ["^\\u0000\\.[^\\.]"], // Relative side-effects
          ["\\u0000$"], // External types
          ["^~\\/.*\\u0000$"], // Internal types
          ["^\\.\\..*\\u0000$"], // Parent types
          ["^\\.[^\\.].*\\u0000$"], // Relative types
          ["^[^\\.]"], // External modules
          ["^~\\/"], // Internal modules
          ["^\\.\\."], // Parent modules
          ["^\\.[^\\.]"], // Relative modules
        ],
      },
    ],
    "simple-import-sort/exports": "error",
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      { prefix: "~", allowSameFolder: true },
    ],
  },
  overrides: [
    {
      files: [".", "lib"].map(
        (directory) => `${directory}/*.{ts,cts,mts,tsx,js,jsx}`,
      ),
      rules: {
        "no-relative-import-paths/no-relative-import-paths": [
          "error",
          { prefix: "~", allowSameFolder: false },
        ],
      },
    },
  ],
};
