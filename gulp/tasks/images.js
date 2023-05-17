import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
import gulpIf from "gulp-if";

export const images = () => {
  return app.gulp
    .src(app.path.src.images, { sourcemaps: true })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "Pictures",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(gulpIf(app.isBuild, webp()))
    .pipe(gulpIf(app.isBuild, app.gulp.dest(app.path.build.images)))
    .pipe(gulpIf(app.isBuild, app.gulp.src(app.path.src.images)))
    .pipe(gulpIf(app.isBuild, app.plugins.newer(app.path.build.images)))
    .pipe(
      gulpIf(app.isBuild,imagemin({
        progressive: true,
        interlaced: true,
        optimizationLevel: 3,
        svgoPlugins: [{ removeViewBox: false }],
      }) )
      
    )
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))

    .pipe(app.plugins.browserSync.stream());
};
