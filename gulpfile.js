const { src, dest, watch, parallel, series } = require("gulp");
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');
const {extendDefaultPlugins} = require('svgo');
const cache = require('gulp-cache');
const del = require('del');
const paths = {
  html: {
    src: 'src/**/*.html',
    dest: 'output/'
  },
  css: {
    src: 'src/scss/**/*.scss',
    dest: 'output/assets/css'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'output/assets/js'
  },
  images: {
    src: 'src/images/*',
    dest: 'output/assets/images'
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

function images() {
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
}

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
  watch(paths.images.src, images); 
  watch(paths.html.src).on('change', browserSync.reload); // any change in output folder, reload page
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
const build = series(clean, parallel(html, css, scripts, images), watchFiles);

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.css = css;
exports.scripts = scripts;
exports.images = images;
exports.watch = watchFiles;
exports.build = build;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;