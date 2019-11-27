module.exports = function () {
  $.gulp.task('build', $.gulp.series('clean', 'copy', 'less', 'scripts', 'images', 'webp', 'svg'));
};
