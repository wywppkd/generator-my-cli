#!/usr/bin/env node
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)
  }
  
  // 钩子1: 接收用户输入
  prompting () {
    // 读取第一个参数作为指定项目根目录
    return this.prompt([
      {
        type: 'input',
        name: 'title',// 变量名
        message: '请输入你的项目title',
        default: this.appname // 默认当前目录名称
      }
    ])
    .then(answers => {
      this.answers = answers
    })
  }
  // 钩子2: 写入文件
  writing () {
    console.log("this.answers", this.answers) // 用户输入内容
    const srcDir = this.sourceRoot() // 目标路径
    const destDir = this.destinationRoot() // 目标路径
    this.fs.copyTpl(srcDir, destDir, this.answers) // 拷贝模板文件并传入模板变量
  }

  install(){
    this.env.options.nodePackageManager = 'npm'
  }
}

