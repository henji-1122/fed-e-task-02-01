##### fed-e-task-02-01作业 (模块2-1)

###### 一、简答题

1. 谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值
解析：前端工程化就是我们在开发过程中遵循一定的标准和规范，通过工具提高开发效率、降低成本的一种手段。   
前端工程化主要解决的问题:    
    (1). 解决传统语言或语法的弊端
    (2). 解决无法使用模块化\组件化组织代码的问题
    (3). 解决重复的机械式工作
    (4). 解决由于代码法风格统一、仓库代码质量无法保证带来的问题
    (5). 解决前端必须依赖后端服务接口支持(开发、部署)的问题
    (6). 解决前端开发过程整体依赖后端项目的问题   


2. 你认为脚手架除了为我们创建项目结构，还有什么更深的意义？    
解析：脚手架除了为我们创建项目基础结构，更重要的是提供给开发者一些约定和规范：    
    (1). 相同的组织结构
    (2). 相同的开发范式
    (3). 相同的模块依赖
    (4). 相同的工具配置
    (5). 相同的基础代码



###### 一、编程题   
1. 概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具。     
解析：脚手架就是一个node的cli应用，他的实现过程就是启动脚手架后，会询问一写预设的问题，将我们回答的结果结合模板文件生成一个项目的解构。        
使用 NodeJS 完成一个自定义的小型脚手架工具：

``` javascript
// 创建一个应用
mkdir smaple-scaffoding
cd smaple-scaffoding
yarn init  //初始化package.json

// 在vscode中打开项目
// 在package.json中增加bin字段，用于指定cli应用的入口文件
"bin": "cli.js"
```


<!-- cli.js 文件 -->
``` javascript 
#!/usr/bin/env node

// Node CLI 应用入口文件必须有这样一个特殊的文件头
// 如果是Linux或者macOS系统下还需要修改此文件的读写权限为755，这样才能作为一个cli的入口。
// 具体就是通过chmod 755 cli.js实现修改

// 脚手架的工作过程：
// 1. 通过命令行交互询问用户问题(在node中发起命令行交互询问，需要用inquirer模块)
// 2. 根据用户回答的结果生成文件(根据templates中的模板生成)

const fs = require('fs')
const inquirer = require('inquirer')
const path = require('path')
const ejs = require('ejs')

inquirer.prompt([
    {
        type:'input',
        name:'name',
        message:'Your Project name',
    }
])
.then(answers => {
    // console.log(answers)

    // 根据用户回答的结果生成文件
    // 模板目录
    const tmplDir = path.join(__dirname,'templates')
    // 目标目录
    const destDir = process.cwd()

    // 将模板下的文件全部转换到目标目录
    fs.readdir(tmplDir, (err, files) => {
        if(err) throw err
        files.forEach(file => {
            // console.log(file)
            // 通过模板引擎渲染文件(安装ejs模板引擎)
            ejs.renderFile(path.join(tmplDir,file), answers, (err, result) => {// (文件的绝对路径，工作路径的数据上下文， 回调函数)
                if(err) throw err
                // console.log(result)
                // 将结果写入到目标文件路径
                fs.writeFileSync(path.join(destDir, file), result)
            }) 
        })
    })
})

// 命令行中执行 sample-scaffoding  在新创建的项目中生成对应的文件
```


<!-- 新建项目目录，用此脚手架生成项目 -->
```javascript
cd ..
mkdir scaffoding-project
cd scaffoding-project
scaffoding-project > sample-scaffoding 
// 此时在scaffoding-project项目目录下就会生成对应的文件
```
------> 附件中附代码




2. 尝试使用 Gulp 完成 项目 的自动化构建
3. 使用 Grunt 完成 项目 的自动化构建