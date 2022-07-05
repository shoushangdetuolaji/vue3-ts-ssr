## 集成ESLint

安装

`npx eslint --init`

```
How would you like to use ESLint?...
To check syntax only
To check syntax and find problems
To check syntax, find problems, and enforce code style √

What type of modules does your project use?...
JavaScript modules (import/export) √
CommonJS (require/export)
None of these

Which framework does your project use?
React
Vue.js √
None of these

Does your project use TypeScript?
No/Yes  => Yes

Where does your code run?...
Browser √
Node √ => both choose

How would you like to define a style for your project?...
Use a popular style guide √
Anser questions about your style

Which style guide do you want to follow? ...
Airbnb
Standard √
Google
XO

What format do you want your config file to be in? ...
JavaScript √
YAML
JSON

Would you like to install them now? No / Yes => Yes

Which package manager do you want to use? ...
npm √
yarn
pnpm

```



然后生成配置文件`.eslintrc.js`

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
      // 这里可以自行添加规则
  }
}
```



vscode编辑器安装扩展

`ESLint`

