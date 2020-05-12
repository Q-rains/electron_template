# umi-electron-javascript

### 基于umijs + electron + javascript的基础开发环境

## 主要特性
- 支持整个应用的热重载，electron main服务使用javascript，不进行额外的构建，render使用react(umi脚手架)

## 项目结构

```ssh
.
|-- build
|   |-- icon.icns                         // 打包后程序图标 MacOS
|   |-- icon.ico                          // 打包后程序图标 Windows
|-- release                               // 打包输出目录
|-- main                                  // 主程序目录
|   `-- main.js                           // 主程序入口
|-- renderer                              // 前端渲染目录
|-- package.json                          // 项目依赖以及打包配置
`-- README.md                             // 项目说明文档
```

## 环境搭建
### 安装

然后通过npm下载依赖

```javascript
  $ npm install
```

### 开发
* 启动
```javascript
  $ npm start
```


### 打包

```javascript
  $ npm run pack  // 打包macOS
  $ npm run exe   // 打包windows
```

如果想把代码打包成一个dmg文件或者zip文件，可以执行以下命令

```javascript
  $ npm run dist
```

### 打包配置说明 [`package.json`](./package.json)

[electron-builder-参数参考](https://www.electron.build/configuration/configuration)

[category-Mac分类参考](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/uid/TP40009250-SW8)

```js
{
  ...
  "build": {
    "productName": "LittleStrong",// 程序名称
    "files": [ // 需要打包的文件
      "dist/",
      "node_modules/",
      "package.json"
    ],
    "mac": { // 打包mac版本
      "category": "your.app.category.type", // mac app分类 
      "target": [ // 打包类型
        "dmg",
        "zip"
      ]
    },
    "win": { // 打包windows版本
      "target": [ // 打包类型
        "nsis"
      ]
    },
    "nsis": {
      "oneClick": false,
      "perMachine": true,
      "allowToChangeInstallationDirectory": true
    },
    "directories": { // 打包后输出目录
      "output": "release"
    },
    "appId": "com.cn.littlestrong.demo", // appstore包名
    "asar": false //  是否加密处理
  },
}
```
