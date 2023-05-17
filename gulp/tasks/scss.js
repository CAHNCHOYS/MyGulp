import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import GulpCleanCss from "gulp-clean-css";

import scssWebp from 'gulp-webpcss';
import autoPrefixer from "gulp-autoprefixer";
import gulpGroupCssMediaQueries from "gulp-group-css-media-queries";

import gulpIf from "gulp-if";



const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(app.path.src.scss, { sourcemaps: app.isProd })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SASS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(gulpIf(app.isBuild,gulpGroupCssMediaQueries()))
    .pipe(gulpIf(app.isBuild,scssWebp({
        webpClass:'.webp',
        noWebpClass:'.no-webp'
    })))
    .pipe(gulpIf(app.isBuild,autoPrefixer({
        grid:true,
        flexbox:true,
        overrideBrowserslist:["last 9 versions"],
        cascade:true,
    })))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(gulpIf(app.isBuild,GulpCleanCss()))
    .pipe(rename({extname:'.min.css'}))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream());
};
