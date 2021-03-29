const { src, dest, watch, parallel, series } = require("gulp");
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');

const paths = {
  html: {
    src: 'src/**/*.html',
    dest: 'output/'
  },
  css: {
    src: 'src/scss/**/*.scss',
    dest: 'output/css'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'output/js'
  }
};

function clean() {
  return del([
      'output/css/*.css',
      'output/js/*.js'
  ]);
}

function html() {
  return src(paths.html.src)
        .pipe(dest(paths.html.dest))
}

function css() {
  return src(paths.css.src)
        .pipe(sass().on('error',sass.logError))
        .pipe(concat('style.css'))
        .pipe(autoprefixer())
        .pipe(minify())
        .pipe(dest(paths.css.dest))
}

function scripts() {
  return src(paths.scripts.src) // src() can also be placed in the middle of a pipeline to add files to the stream based on the given globs.
    .pipe(concat('bundle.js'))    
    .pipe(babel())
    .pipe(minify())
    .pipe(dest(paths.scripts.dest)); // dest() is given an output directory string
}

// function images(){
//   gulp.src('./src/images/**/*')
//   .pipe(imagemin())
//   .pipe(gulp.dest('./dist/images'))
//   .pipe(browserSync.reload({stream: true}))
// }

function watchFiles() {  
  browserSync.init({
    server: {
      baseDir: "./output",
      index: "/index.html"
    }
  }); 
  watch(paths.html.src, html);  
  watch(paths.css.src, css);
  watch(paths.scripts.src, scripts); 
  watch(paths.html.src).on('change', browserSync.reload); // any change in output folder, reload page
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
const build = series(clean, parallel(html, css, scripts), watchFiles);

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.css = css;
exports.scripts = scripts;
exports.watch = watchFiles;
exports.build = build;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;