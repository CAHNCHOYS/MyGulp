import gulp from "gulp";

import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
  isBuild: process.argv.includes("--build"),
  isProd: !process.argv.includes("--build"),
  path,
  gulp,
  plugins,
};

//Задача копирования
import { copy } from "./gulp/tasks/copy.js";
//Очитска проекта
import { reset } from "./gulp/tasks/clean.js";
//Работа с html
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { jsTasks } from "./gulp/tasks/jsTasks.js";
import { images } from "./gulp/tasks/images.js";
import {
  fontsStyle,
  ttfTowoff2,
  otf2woff,
  wathchSvgFonts,
} from "./gulp/tasks/fonts.js";

//Слежение за файлами в папке
function watchFiles() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, jsTasks);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.fonts, wathchSvgFonts);
}

const fonts = gulp.series(otf2woff, ttfTowoff2, fontsStyle, wathchSvgFonts);
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(jsTasks, html, scss, copy, images)
);

//Сценарие выполнения задач в режиме разработки
const dev = gulp.series(reset, mainTasks, gulp.parallel(watchFiles, server));
const build = gulp.series(reset, mainTasks);

export { dev };
export { build };

gulp.task("default", dev);
