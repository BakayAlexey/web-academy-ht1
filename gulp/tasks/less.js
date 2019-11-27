module.exports = function () {
  $.gulp.task('less', function () {
    return $.gulp.src('less/style.less')
      .pipe($.gulpPlumber())
      .pipe($.gulpSourcemaps.init())
      .pipe($.gulpLess())
      .pipe($.gulpAutoprefixer())
      .pipe($.gulpCsso())
      .pipe($.gulpRename('style.min.css'))
      .pipe($.gulpSourcemaps.write(''))
      .pipe($.gulp.dest('build/css'))
      .pipe($.browserSync.stream());
  });
};
