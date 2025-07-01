const {dest, watch, src, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

function styles() {
    return src('./src/components/style.scss')
        .pipe(concat('style.css'))
        .pipe(sass({ style: 'compressed' }))
        .pipe(dest('./src/dist'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src('./src/components/App.jsx')
        .pipe(concat('App.jsx'))
        .pipe(dest('./src/dist'))
        .pipe(browserSync.stream())
}

function watcher() {
    browserSync.init({
        server: {
            baseDir: 'src/',
        }
    })
    watch(['./src/components/style.scss'], styles);
    watch(['./src/components/App.jsx'], scripts);
    watch(['./*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.default = parallel(styles, scripts, watcher);