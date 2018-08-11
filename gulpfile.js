var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var browsersync = require('browser-sync');


gulp.task('sass', function() {
	return gulp.src('dev/scss/**/*.scss')
		.pipe(sourcemaps.init())
			.pipe(sass({
				outputStyle: 'expanded'
			}))
			.pipe(prefix({
				browsers: ['last 2 versions'],
				cascade: false
			}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dev/css'))
		.pipe(browsersync.reload({
			stream: true
		}))
});

gulp.task('browsersync', function() {
	browsersync({
		server: {
			baseDir: 'dev'
		}
	});
})

gulp.task('watch', ['sass', 'browsersync'], function() {
	gulp.watch('dev/scss/**/*.scss', ['sass']),
	gulp.watch('dev/index.html', browsersync.reload),
	gulp.watch('dev/js/**/*.js', browsersync.reload)
});