var gulp = require('gulp');
var minify = require('gulp-minifier');
var watch = require('gulp-watch');
var server = require('gulp-server-livereload');

gulp.task('hello', function() {
    console.log('Hello Zell');
});

gulp.task('minify', function() {
    return gulp.src('app/**/*').pipe(minify({
        minify: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyJS: true,
        minifyCSS: true,
        getKeptComment: function (content, filePath) {
            var m = content.match(/\/\*![\s\S]*?\*\//img);
            return m && m.join('\n') + '\n' || '';
        }
    })).pipe(gulp.dest('dist/'));
});

gulp.task('watch', function () {
    // Endless stream mode
    return watch('app/*', { ignoreInitial: false })
        .pipe(gulp.dest('dist/'));
});

gulp.task('callback', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch('css/**/*', function () {
        gulp.src('css/**/*')
            .pipe(gulp.dest('build'));
    });
});


gulp.task('livereload', function() {
    gulp.src('app/**/*')
        .pipe(server({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});