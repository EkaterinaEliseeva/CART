var gulp = require("gulp");
var server = require("browser-sync").create();

gulp.task("start", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/*.{html,js,css}", gulp.series("refresh"));
  gulp.watch("img/*", gulp.series("refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});
