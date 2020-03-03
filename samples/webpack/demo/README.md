### webpack 打包程序小案例

### 安装webpack
```shell
npm install webpack -g
```

### 新建项目
```shell
mkdir demo && cd demo
npm init -y
npm install webpack --save-dev
touch src/index.js
touch src/Greeter.js
touch public/index.html
touch webpack.config.js
```

### 写入项目
##### webpack.config.js

``` javascript
const path = require('path');

module.exports = {
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    mode: 'development'
}
```

##### src/index.js

```javascript
const greet = require('./Greeter.js');
document.querySelector("#root").appendChild(greet());
```

##### src/Greeter.js

```javascript
module.exports = function() {
    var greet = document.createElement('div');
    greet.textContent = "Hi there and greeting!";
    return greet;
};
```

##### public/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="root">
    </div>
    <script src="../dist/bundle.js"></script>
</body>
</html>
```

##### insert into package.json

```json
"scripts": {
        "dev": "webpack --mode development",
        "build": "webpack --mode production"
}
```

##### 报错调试

![error1](https://upload-images.jianshu.io/upload_images/3675862-2718b7df4c33577d.png?imageMogr2/auto-orient/strip|imageView2/2/w/638/format/webp)

这是因为**webpack**版本过高导致的结果，使用下面的命令进行打包，可以解决

```shell
webpack ./src/index.js -o ./dist/bundle.js
(或)webpack
```

其中 **bundle.js**是打包后生成的文件的文件名 