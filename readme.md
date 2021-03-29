Babel is an open-source Javascript library that is used to convert (or transpile) JavaScript ES6+ code to ES5 for browser compatibility.

# Create Folder 
Create a project folder "gulp-project"

# Installing Gulp
Before we install gulp you need to have Node.js (Node) installed in your computer.
https://developers.google.com/web/ilt/pwa/introduction-to-gulp
Instead of gulp.task, i have created export functions.


# Create a package.json file in your project directory
npm init will ask you a couple of questions. Once you've finished filling them out you can take a peek at the package.json file it generated to see what it actually did.
```
npm init
```

# Create gulp file
Once packages are installed (in node_modules), you are ready to use them. All gulp code is written in a gulpfile.js file. To use a package, start by including it in gulpfile.js.

# gulp-minify vs gulp-uglify
gulp-minify supports custom minify file name, e.g -min.js or .min.js , and also supports keeping the original source file

# Use BrowserSync to Update changes
From here we will create a watch() function, to watch changes made in our .scss file and automatically compile that and show on the browser.
```
function watch() {
  browserSync.init({
      server: {
        baseDir: "./src",
        index: "/index.html"
      }
  });
  gulp.watch(paths.css.src, css);
  gulp.watch('./*.html').on('change',browserSync.reload);
  gulp.watch(paths.scripts.src, scripts);  
}
exports.watch = watch;
```
Here, you want to tell browser sync which file to start. In many cases, just the “baseDir:” is enough, but to make it more foolproof add the index.html file to the “index:” so it calls to the right place. Also, don’t forget to export the function.


# Setting up Babel 7
```
npm install --save-dev babel-preset-env
```
create .babelrc file
```
{
  "presets": ["@babel/preset-env"]
}
```
https://babeljs.io/blog/2015/10/31/setting-up-babel-6


# Reference URLs
```
https://www.toptal.com/javascript/optimize-js-and-css-with-gulp
https://medium.com/swlh/setting-up-gulp-4-0-2-for-bootstrap-sass-and-browsersync-7917f5f5d2c5
https://gulpjs.com/docs/en/getting-started/quick-start/
https://www.tutorialspoint.com/babeljs/babeljs_working_with_gulp.htm
https://github.com/gulpjs/gulp
https://github.com/JohnFajardo/JohnFajardo
https://www.codebyamir.com/blog/convert-javascript-es6-to-es5-using-babel
https://semaphoreci.com/community/tutorials/getting-started-with-gulp-js
```