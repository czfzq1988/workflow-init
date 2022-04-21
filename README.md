# workflow-init

项目规范

## 代码规范

### eslint

```
npm i eslint -D
npx eslint --init
```

### prettier

```
npm i prettier eslint-config-prettier eslint-plugin-prettier -D
```

在.eslintrc 中,extend 中添加 "prettier" 解决 eslint 和 prettier 的冲突

## git 规范

Git 有很多的 hooks, 让我们在不同的阶段,对代码进行不同的操作,控制提交到仓库的代码的规范性,和准确性, 以下只是几个常用的钩子

### pre-commit

通过钩子函数,判断提交的代码是否符合规范

### commit-msg

通过钩子函数,判断 commit 信息是否符合规范

### pre-push

通过钩子,执行测试,避免对以前的内容造成影响

## git 规范工具

### 安装代码校验依赖

#### husky 操作 git 钩子的工具

#### lint-staged 本地暂存代码检查工具

```
npm i lint-staged husky -D
npm set-script prepare "husky install" # 在package.json中添加脚本
npm run prepare # 初始化husky,将 git hooks 钩子交由,husky执行
```

初始化 husky, 会在根目录创建 .husky 文件夹

```
npx husky add .husky/pre-commit "npx lint-staged"
```

pre-commit 执行 npx lint-staged 指令

根目录创建 .lintstagedrc.json 文件控制检查和操作方式

```
{
    "*.{js,jsx,ts,tsx}": ["prettier --write .", "eslint  --fix"],
    "*.md": ["prettier --write"]
}
```

### 安装提交信息依赖

```
npm i commitlint @commitlint/config-conventional -D
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

@commitlint/config-conventional 这是一个规范配置,标识采用什么规范来执行消息校验, 这个默认是 Angular 的提交规范

| **类型** | **描述**                                               |
| -------- | ------------------------------------------------------ |
| build    | 编译相关的修改，例如发布版本、对项目构建或者依赖的改动 |
| chore    | 其他修改, 比如改变构建流程、或者增加依赖库、工具等     |
| ci       | 持续集成修改                                           |
| docs     | 文档修改                                               |
| feat     | 新特性、新功能                                         |
| fix      | 修改 bug                                               |
| perf     | 优化相关，比如提升性能、体验                           |
| refactor | 代码重构                                               |
| revert   | 回滚到上一个版本                                       |
| style    | 代码格式修改, 注意不是 css 修改                        |
| test     | 测试用例修改                                           |

### 安装辅助提交依赖

```
npm i commitizen cz-conventional-changelog -D
```

安装指令和命令行的展示信息

```
npm set-script commit "git-cz" # package.json 中添加 commit 指令, 执行 `git-cz` 指令
```

编写 commit 指令

```
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

初始化命令行的选项信息,不然没有选项

### 自定义提交规范

```
npm i -D commitlint-config-cz  cz-customizable
```

变更 commitlint.config.js 这里采用自己定义的规范,将会覆盖上面那个,所以上面那个可以不用安装

```
module.exports = {
  // 利用cz自定义提交规范
  extends: ['cz'],
  rules: {
    // 自定义规则
  }
}
```

增加 .cz-config.js

```
'use strict'
module.exports = {
  types: [
    types: [
      { value: "feat", name: "feat:     新增功能" },
      { value: "fix", name: "fix:      修复 bug" },
      { value: "docs", name: "docs:     文档变更" },
      { value: "style", name: "style:    代码格式（不影响功能，例如空格、分号等格式修正）" },
      { value: "refactor", name: "refactor: 代码重构（不包括 bug 修复、功能新增）" },
      { value: "perf", name: "perf:     性能优化" },
      { value: "test", name: "test:     添加、修改测试用例" },
      { value: "build", name: "build:    构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）" },
      { value: "ci", name: "ci:       修改 CI 配置、脚本" },
      { value: "chore", name: "chore:    对构建过程或辅助工具和库的更改（不影响源文件、测试用例）" },
      { value: "revert", name: "revert:   回滚 commit" },
    ],
  ],
  scopes: [
    { name: 'leetcode' },
    { name: 'javascript' },
    { name: 'typescript' },
    { name: 'Vue' },
    { name: 'node' }
  ],
  // it needs to match the value for field type. Eg.: 'fix'
  /*  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },  */
  // override the messages, defaults are as follows
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope (可选):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: '短说明:\n',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?(yes/no)'
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['特性', '修复'],
  // limit subject length
  subjectLimit: 100
}
```

package.json 中,将原来 commit 配置,变更为自定义配置

```
"config": {
  "commitizen": {
    "path": "./node_modules/cz-customizable"
  }
}
```

## 单元测试

### 代码 push 前进行单元测试

```
npx husky add .husky/pre-push "npm test" # 提交代码前,跑一遍测试用例
```
