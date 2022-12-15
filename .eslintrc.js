/*
 * @Descripttion: 
 * @version: 0.0.1
 * @Author: Jvan
 * @Date: 2020-05-08 13:24:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-06-24 13:35:35
 */
module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript/recommended'
    ],
    parserOptions: {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    rules: {
        'no-mixed-spaces-and-tabs': 'off',
        'no-console': 0,
        'no-debugger': 1,
        "no-cond-assign": 0,
        "arrow-spacing": 2,
        "indent": [2,4, {
            "SwitchCase":1,
            "ignoreComments":true
        }],
        "keyword-spacing": 2,
        "key-spacing": 2,
        "no-multiple-empty-lines": 2,
        "no-multi-spaces":2,
        "brace-style":2,
        "space-infix-ops":2,
        "comma-spacing":2,
        "space-before-function-paren":["error", {
            "anonymous": "always",
            "named": "never",
            "asyncArrow": "always"
        }],
        "vue/html-indent": ["error", 4],
        "vue/max-attributes-per-line": ["error", {
            "singleline": {
                "max": 10
            },
            "multiline": {
                "max": 5
            }
        }],
        "vue/no-multi-spaces": ["error", {
            "ignoreProperties": false
        }],
        "@typescript-eslint/indent": ["error",4],
        "vue/mustache-interpolation-spacing": ["error"],
        "@typescript-eslint/no-var-requires":"off",
        "@typescript-eslint/no-explicit-any": ["off"],
        '@typescript-eslint/camelcase': 'off',
        "@typescript-eslint/ban-types": 'off',
        "@typescript-eslint/no-unused-vars": 1,
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/ban-ts-comment": "off"
    }
}
