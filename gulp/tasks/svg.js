module.exports = function () {
  $.gulp.task('svg', function () {
    return $.gulp.src('img/**/*.svg')
      .pipe($.gulpSvgmin({
        js2svg: {
          pretty: true,
        }
      }))
      .pipe($.gulpCheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
      }))
      .pipe($.gulpReplace('&gt', '>'))
      .pipe($.gulpSvgSprite({
        mode: {
          symbol: {
            sprite: 'sprite.svg'
          }
        }
      }))
      .pipe($.gulp.dest('build/img'));
  });
};
