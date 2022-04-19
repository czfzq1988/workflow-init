'use strict'
const scopes = [
  ['hooks', 'hook 相关'],
  ['utils', 'utils 相关'],
  ['styles', '样式相关'],
  ['deps', '项目依赖'],
  ['auth', '对 auth 修改'],
  ['other', '其他修改'],
  // 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
  ['custom', '以上都不是？我要自定义']
].map(([value, description]) => {
  return {
    value,
    name: `${value.padEnd(30)} (${description})`
  }
})

module.exports = {
  types: [
    { value: 'feat', name: 'feat:     新增功能' },
    { value: 'fix', name: 'fix:      修复 bug' },
    { value: 'docs', name: 'docs:     文档变更' },
    {
      value: 'style',
      name: 'style:    代码格式（不影响功能，例如空格、分号等格式修正）'
    },
    {
      value: 'refactor',
      name: 'refactor: 代码重构（不包括 bug 修复、功能新增）'
    },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'test', name: 'test:     添加、修改测试用例' },
    {
      value: 'build',
      name: 'build:    构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）'
    },
    { value: 'ci', name: 'ci:       修改 CI 配置、脚本' },
    {
      value: 'chore',
      name: 'chore:    对构建过程或辅助工具和库的更改（不影响源文件、测试用例）'
    },
    { value: 'revert', name: 'revert:   回滚 commit' }
  ],
  scopes,
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
  // 是否允许自定义填写 scope，在 scope 选择的时候，会有 empty 和 custom 可以选择。
  allowCustomScopes: true,

  // 设置只有 type 选择了 feat 或 fix，才询问 breaking message
  allowBreakingChanges: ['feat', 'fix'],

  // 跳过要询问的步骤
  skipQuestions: ['body', 'footer'],

  // limit subject length
  subjectLimit: 100
}
