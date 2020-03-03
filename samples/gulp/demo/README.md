## 检查 node、npm 和 npx 是否正确安装

```shell
node --version
npm --version
npx --version
```

## 安装 gulp 命令行工具

```shell
npm install --global gulp-cli
```

## 创建项目目录并进入

```shell
npx mkdirp demo && cd demo
```

## 在项目目录下创建 package.json 文件

```shell
npm init 
```

上述命令将指引你设置项目名、版本、描述信息等 

## 安装 gulp，作为开发时依赖项

```shell
npm install --save-dev gulp
```

## 检查 gulp 版本

```shell
gulp --version
```

确保输出与下面的屏幕截图匹配，否则你可能需要执行本指南中的上述步骤。 

![gulp--version](https://gulpjs.com/img/docs-gulp-version-command.png)

## 创建 gulpfile 文件



利用任何文本编辑器在项目大的根目录下创建一个名为 gulpfile.js 的文件，并在文件中输入以下内容： 

```javascript
function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask
```

## 测试

在项目根目录下执行 gulp 命令：

```shell
gulp
```

如需运行多个任务（task），可以执行 `gulp <task> <othertask>`。

## 输出结果

默认任务（task）将执行，因为任务为空，因此没有实际动作。

![task](https://gulpjs.com/img/docs-gulp-command.png)