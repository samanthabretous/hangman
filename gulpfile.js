const gulp = require("gulp");
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');
const watchify = require("watchify");
const gutil = require("gulp-util");
const glob = require('glob');
const es = require('event-stream');
const buffer = require('vinyl-buffer');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

// create task
gulp.task('css', () => {
  gulp.src('src/css/*.css')
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist'))
});

gulp.task('javascript', (done) => {
  glob('./src/*.js', (err, files) => {
    if (err) {
      done(err);
    }

    const tasks = files.map(entry => {
      const taskFile = browserify({
        basedir: '.',
        debug: true,
        entries: [entry],
        cache: {},
        packageCache: {}
      })
      .plugin(watchify);

      const bundle = () => {
        return taskFile.bundle()
        .pipe(source(entry))
        .pipe(buffer())
        .pipe(rename({
          extname: '.bundle.js'
        }))
        .pipe(gulp.dest("dist"));
      };

      taskFile.on('update', bundle);
      taskFile.on("log", gutil.log);
      return bundle();
    })
    es.merge(tasks).on('end', done);
  });
});

gulp.task('watch', () => {
  gulp.watch('src/css/*.css', ['css']);
});

gulp.task('default', ['css', 'javascript', 'watch'])
