var gulp = require('gulp'),
  fs = require('fs'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  minify = require('gulp-minify'),
  uglify = require('gulp-uglify');

var filePaths = {
  scripts: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-animate/angular-animate.js',
    'app/scripts/**/*.js'
  ],
  styles: [
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'app/styles/**/*.css'
  ],
  fonts: [
  'bower_components/bootstrap/fonts/*',
  'app/assets/dinFont/*'
  ],
  img:[
  'app/assets/img/*']
};

//validate sources
var validateResources = function (resources) {
  resources.forEach(function (resource) {
    if (!resource.match(/\*/) && !fs.existsSync(resource)) {
      throw resource + " not found!";
    }
  });
}

//clean
gulp.task('clean', function(cb) {
  return gulp.src(['app/lib/css/app.css', 'app/lib/js/app.js'], {
      read: false
    })
    .pipe(clean());
});

gulp.task('copy:fonts', function() {
  validateResources(filePaths.fonts);

  return gulp.src(filePaths.fonts)
    .pipe(gulp.dest('app/lib/fonts'));
});
gulp.task('copy:img', function() {
  validateResources(filePaths.img);

  return gulp.src(filePaths.img)
    .pipe(gulp.dest('app/lib/img'));
});

//scripts files
gulp.task('scripts', function(){
  validateResources(filePaths.scripts);
  return gulp.src(filePaths.scripts)
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/lib/js'))
});

//server connection
gulp.task('connect', function(){
  connect.server({
    livereload:true,
    root: 'app',
    port: 3500
  })
});

// run styles in the gulp
gulp.task('styles', function(){
  validateResources(filePaths.styles);
  return gulp.src(filePaths.styles)
  .pipe(concat('app.css'))
  .pipe(minify())
  .pipe(gulp.dest('app/lib/css'))
})

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(filePaths.scripts, ['scripts']);

  gulp.watch(filePaths.styles, ['copy:fonts','styles']);

});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean', 'scripts', 'copy:fonts', 'copy:img', 'styles', 'connect', 'watch'], function() {
});
