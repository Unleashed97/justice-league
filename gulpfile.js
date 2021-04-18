'use strict';

const { src, dest, parallel, series, watch } = require('gulp');
const sync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const rename = require('gulp-rename');
const pug = require('gulp-pug');

// PUG
const pughtml = ()=>{
    return src('src/pug/pages/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(dest('dist/'))
        .pipe(sync.stream())
}

// HTML
// const html = () => {
//     return src('src/**/*.html')
//         .pipe(htmlmin({
//             removeComments: true,
//             collapseWhitespace: true
//         }))
//         .pipe(dest('dist'))
//         .pipe(sync.stream())
// }

// Styles
const styles = () => {
    return src(['src/scss/main.scss'])
        .pipe(sass())
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], cascade: false }))
        .pipe(cleancss(({ level: { 1: { specialComments: 0}}})))
        .pipe(rename({
            basename: 'style',
            suffix: '.min'
        }))
        .pipe(dest('src/css/'))
        .pipe(dest('dist/css/'))
        .pipe(sync.stream())
}

// Scripts
const scripts = () => {
    return src(['src/js/script.js', 'src/js/**/*.js', '!src/js/script.min.js'])
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(dest('src/js/'))
        .pipe(dest('dist/js/'))
        .pipe(sync.stream())
}

// server
const server = () => {
    sync.init({
        server: { baseDir: 'dist/'},
        notify: false,
        online: true
    })
}

// image minify
const images = () =>{
    return src('src/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}')
        .pipe(newer('dist/images/'))
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest('dist/images/'))
        .pipe(sync.stream())
}

// fonts
const fonts = () =>{
    return src('src/fonts/**/*.{eot,woff,woff2,ttf,svg}')
        .pipe(dest('dist/fonts/'))
        .pipe(sync.stream())
}

// cleandist
const cleandist = () => {
    return del('dist/**/*', { force: true })
}

// Watch
const watchFiles = () => {
    watch('src/pug/**/*.pug', pughtml);
    watch('src/**/*.scss', styles);
    watch(['src/**/*.js', '!src/js/script.min.js'], scripts);
    watch('src/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}', images)
    watch('src/fonts/**/*.{eot,woff,woff2,ttf,svg}', fonts);
    watch('dist/**/*.html').on('change', sync.reload);
}

const build = series(cleandist, parallel(pughtml, styles, scripts, images, fonts));
const watcher = parallel(build, watchFiles, server);

// Export tasks
exports.server = server;
exports.pughtml = pughtml;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.fonts = fonts;
exports.cleandist = cleandist;
exports.build = build;
exports.default = watcher;
