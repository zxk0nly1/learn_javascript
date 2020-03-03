### 安装需要的插件

 ```sh
npm install gulp-rev gulp-rev-replace gulp-useref gulp-filter gulp-uglify gulp-csso --save-dev
 ```

- gulp-rev
- gulp-rev-replace
- gulp-useref

![html](https://upload-images.jianshu.io/upload_images/3735344-373d70760ceb2f6e.png?imageMogr2/auto-orient/strip|imageView2/2/w/739/format/webp)

- gulp-filter
- gulp-uglify
- gulp-csso

### 简单的例子

```sh
touch gulpfile.js
```

```javascript
/**
 *首先加载要依赖的加载项
 */
var gulp = require('gulp');

// 给每个文件添加版本号(在文件后面加上哈希码，当文件改变时更改哈希码，内容一样的文件哈希码一样(即使修改时间不一样))
var rev = require('gulp-rev');

// 将文件里面的引用改成新的
var revReplace = require('gulp-rev-replace');

// 通过注释的方式告诉gulp合并文件 地址：https://www.npmjs.com/package/gulp-useref
var useref = require('gulp-useref');

// 过滤器 （筛选、restore恢复）
var filter = require('gulp-filter');

// 压缩js文件
var uglify = require('gulp-uglify');
// 压缩css文件
var csso = require('gulp-csso');
/* end */

// 定义一个任务
gulp.task('default', function() {
    var jsFilter = filter('**/*.js', { restore: true });
    var cssFilter = filter('**/*.css', { restore: true });
    // 排除首页，保证首页名字不变
    var indexHtmlFilter = filter(['**/*', '!**/index.html'], { restore: true });

    // 每个pipe处理就像是一个过滤器，对这个文件流进行处理
    return gulp.src(['src/index.html', 'src/css/*.css', 'src/js/*.js'])
        // 分析带有useref注释的语句，将包括的js、css文件放进文件流
        .pipe(useref())
        // 将js文件筛选出来
        .pipe(jsFilter)
        // 将js文件进行压缩
        .pipe(uglify())
        // 通过restore将js文件重新扔回文件流里面
        .pipe(jsFilter.restore)

    // css文件处理
    .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)

    // 给文件添加版本号
    .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        // 更新文件里的引用
        .pipe(revReplace())

    // dest表示已经结束，将文件流扔入到'dist目录下'
    .pipe(gulp.dest('dist'));
});
```

### 注：

~~~sh
  *
  */```

```/*! 压缩时不会被省略掉
  *
  */```

### 其他插件
1. gulp-watch 
 监听文件的改变，自动执行任务，当js文件改变时自动打包
2. gulp-postcss
 与autoprefixer插件相结合，自动给css属性添加前缀
3. gulp-concat
 可以将很多文件合并成一个文件
4. gulp-responsive
 可以生成一系列的响应式图片
~~~

