var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pug = require('gulp-pug');
var template = require('gulp-template');
var dotenv = require('dotenv');

dotenv.load();
var environments = {
  "development" : {
	URL_WINDOW: "http://localhost:3000"
  },
  "production" : {
	URL_WINDOW: "https://gdgmonterrey.firebaseapp.com"
  }
}

var environment = process.argv.length > 2 ? environments["development"] : environments["production"];
environment.API_KEY = process.env.API_KEY;
environment.AUTH_DOMAIN = process.env.AUTH_DOMAIN;
environment.DATABASE_URL = process.env.DATABASE_URL;
environment.STORAGE_BUCKET = process.env.STORAGE_BUCKET;
environment.MESSAGING_SENDER_ID = process.env.MESSAGING_SENDER_ID;
environment.URL_SUSCRIBE_NOTIFICATION = process.env.URL_SUSCRIBE_NOTIFICATION;

gulp.task('less', function() {
	return gulp.src(['app/less/**/*.less'])
		.pipe(less())
		.pipe(concat('app.min.css'))
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('vendor-css', function() {
	return gulp.src([
			'node_modules/normalize.css/normalize.min.css',
		])
		.pipe(concat('vendor.min.css'))
		.pipe(gulp.dest('build/css'))
});


gulp.task('vendor-js', function() {
	return gulp.src([
			'node_modules/whatwg-fetch/fetch.js',
			'node_modules/firebase/firebase.js'
		])
		.pipe(concat('vendor.min.js'))
		.pipe(gulp.dest('build/js'))
});


gulp.task('js', function() {
	return gulp.src('app/js/*.js')
		.pipe(uglify())
		.pipe(template(environment))
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('build/js'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('pug', function () {
  return gulp.src(['app/index.pug'])
	.pipe(pug())
	.pipe(gulp.dest('build/'))
	.pipe(browserSync.reload({
		stream: true
	}))
	
});

gulp.task('copy-images', function() {
	gulp.src([
		'app/img/**/*.*'
	])
	.pipe(gulp.dest('build/img'))
});

gulp.task('copy-files', function() {
	gulp.src([
		'app/manifest.json',
		'app/firebase-messaging-sw.js'
	])
	.pipe(template(environment))
	.pipe(gulp.dest('build/'))
});

gulp.task('copy-ico', function() {
	gulp.src(['app/favicon.ico'])
	.pipe(gulp.dest('build/'))
});


gulp.task('default', ['vendor-css', 'vendor-js', 'less', 'js', 'pug', 'copy-images', 'copy-files', 'copy-ico']);

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'build'
		},
	})
});


gulp.task('dev', ['browserSync', 'vendor-css', 'vendor-js', 'less', 'js', 'pug', 'copy-images', 'copy-files', 'copy-ico'], function() {
	gulp.watch('app/less/*.less', ['less', browserSync.reload]);
	gulp.watch('app/js/*.js', ['js',browserSync.reload]);
	gulp.watch('app/*.pug', ['pug', browserSync.reload]);
	gulp.watch('app/firebase-messaging-sw.js', ['copy-files', browserSync.reload]);
});
