# Front End Development using Gulp, SASS, HTML5, Babel
Task Runner are tools to simplify your tedious work on development, like automating sass/sass compiler, bundling assets, linting source code, hot reloading local server. 

# Run Gulp Project
```
gulp build
```

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
Convert ES6 or latest version to ES5 version for browser compatibility
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


# Minimized Images (Jpg, Png)
Compare image sizes with src/images folder and output/assests/images. Output folder images size are less than original src folder.

https://github.com/imagemin/imagemin-mozjpeg
https://github.com/imagemin/imagemin-optipng
https://www.npmjs.com/package/imagemin
https://www.npmjs.com/package/imagemin-svgo

### packages needed
```
    "imagemin": "^7.0.0",
    "imagemin-gifsicle": "^6.0.1",
    "imagemin-jpegtran": "^6.0.0",
    "imagemin-mozjpeg": "^8.0.0",
    "imagemin-optipng": "^6.0.0",
    "imagemin-pngquant": "^5.0.1",
    "imagemin-svgo": "^7.0.0",
    "pngquant": "^4.0.0",
    "pngquant-bin": "^3.1.1",
    "svgo": "^2.3.1"
```

### code implementation
```
return imagemin([paths.images.src], {
    destination: paths.images.dest,
    plugins: [
      imageminMozjpeg({ // minify jpg images
        quality: [50]
      }),
      imageminPngquant({ // minify png images
        quality: [50]
      }),
      imageminGifsicle({ // minify gif images
        optimizationLevel: 2 // Select an optimization level between 1 and 3
      }),
      imageminSvgo({
				plugins: extendDefaultPlugins([
					{name: 'removeViewBox', active: false}
				])
			})
    ]
  });
```

# Reference URLs
```
https://medium.com/@defrian.yarfi/frontend-development-with-gulp-twig-and-scss-html-pages-a416f89b6669
https://zellwk.com/blog/nunjucks-with-gulp/
https://hackersandslackers.com/image-optimization-imagemin-and-gulp/
https://stackoverflow.com/questions/42152008/gulp-imagemin-couldnt-load-default-plugin-xxx
https://www.sitepoint.com/introduction-gulp-js/
https://www.toptal.com/front-end/webpack-browserify-gulp-which-is-better
https://www.toptal.com/javascript/optimize-js-and-css-with-gulp
https://medium.com/swlh/setting-up-gulp-4-0-2-for-bootstrap-sass-and-browsersync-7917f5f5d2c5
https://gulpjs.com/docs/en/getting-started/quick-start/
https://www.tutorialspoint.com/babeljs/babeljs_working_with_gulp.htm
https://github.com/gulpjs/gulp
https://github.com/JohnFajardo/JohnFajardo
https://www.codebyamir.com/blog/convert-javascript-es6-to-es5-using-babel
https://semaphoreci.com/community/tutorials/getting-started-with-gulp-js
https://css-tricks.com/gulp-for-beginners/
https://web.dev/codelab-imagemin-gulp/
https://www.tutorialspoint.com/gulp/gulp_optimizing_images.htm
```