module.exports = function () {
  $.gulp.task('images', function () {
    return $.gulp.src('build/img/*.{jpg,png,svg}')
      .pipe($.gulpImagemin([
        $.gulpImagemin.jpegtran({progressive: true}),
        $.imageminJpegRecompress({
          loops: 5,
          min: 65,
          max: 70,
          quality: 'medium'
        }),
        $.gulpImagemin.optipng({optimizationLevel: 3}),
        $.imageminPngquant({quality: [0.65, 0.70], speed: 5}),
        $.gulpImagemin.svgo(),
      ]))
      .pipe($.gulp.dest('build/img'));
  });
};
