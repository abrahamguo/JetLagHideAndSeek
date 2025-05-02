import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginImport from "eslint-plugin-import";
import pluginImportAlias from "eslint-plugin-import-alias";
import pluginReact from "eslint-plugin-react";
import tsconfig from "./tsconfig.json" with { type: "json" };

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        plugins: { import: pluginImport, "import-alias": pluginImportAlias },
        settings: {
            "import/extensions": [".ts", ".tsx"],
            "import/resolver": { typescript: {} },
            react: { version: "19" },
        },
        rules: {
            "import/no-unused-modules": ["error", { unusedExports: true }],
            "import-alias/import-alias": [
                "error",
                {
                    relativeDepth: 1,
                    aliases: Object.entries(tsconfig.compilerOptions.paths).map(
                        ([to, [from]]) => ({
                            alias: to.replace(/\*$/, ""),
                            matcher: from.replace(/^\.\//, "^"),
                        }),
                    ),
                },
            ],
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/no-explicit-any": "off", // Would be great to remove all `any` types...
        },
    },
];
