import webpackStream from "webpack-stream";
import fileInclude from "gulp-file-include";

export const jsTasks = ()=>{
    return app.gulp.src(app.path.src.js, {sourcemaps: app.isProd})
     .pipe(fileInclude())
     
      .pipe(webpackStream({
             mode: app.isBuild ? "production" : "development",
             output:{
                 filename:"app.js",
             }
      }))
      .pipe(app.gulp.dest(app.path.build.js))
      .pipe(app.plugins.browserSync.stream());
}

