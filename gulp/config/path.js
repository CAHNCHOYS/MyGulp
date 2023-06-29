import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = "./dist";
const srcFolder = "./src";

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    html: `${buildFolder}/`,
    css: `${buildFolder}/css`,
    files: `${buildFolder}/files/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
  },
  src: {
    js: `${srcFolder}/js/app.js`,
    scss: `${srcFolder}/scss/{style.scss,footer.scss,header.scss,forms.scss,popups.scss}`, //Следим только за опреденленными файлама. Можно укзать *.scss для всех
    html: `${srcFolder}/*.html`,
    files: `${srcFolder}/files/**/*.*`,
    images: `${srcFolder}/img/**/*.{jpg,png,webp,jpeg,gif,ico}`,
    svg: `${srcFolder}/img/**/*.svg`,
    fonts: `${srcFolder}/fonts/{*.{svg,eot},icon.ttf}`, 
  },
  watch: {
    js: `${srcFolder}/js/**/*.*`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
    files: `${srcFolder}/files/**/*.*`,
    images: `${srcFolder}/img/**/*.*`,
    fonts: `${srcFolder}/fonts/{*.{svg,eot},icon.ttf`,
  },
  clean: buildFolder,
  buildFolder,
  srcFolder,
  rootFolder,
};
