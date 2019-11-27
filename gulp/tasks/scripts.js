const jsFiles = [
  $.path.js,
];

module.exports = function () {
  $.gulp.task('scripts', function () {
    return $.gulp.src(jsFiles)
      .pipe($.gulpPlumber())
      .pipe($.gulpSourcemaps.init())
      .pipe($.babel({presets: ['@babel/preset-env']}))
      .pipe($.gulpConcat('script.js'))
      .pipe($.gulpUglify())
      .pipe($.gulpRename('script.min.js'))
      .pipe($.gulpSourcemaps.write(''))
      .pipe($.gulp.dest('build/js'))
      .pipe($.browserSync.stream());
  });
};
