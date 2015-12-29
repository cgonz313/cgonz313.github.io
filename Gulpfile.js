var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var fileInclude = require('gulp-file-include');
var rename = require('gulp-rename');



function runBuild() {
 return gulp.src('src/site/*.html.tpl')
   .pipe(fileInclude({
     prefix: '@@',
     basePath: 'src'
   }))
   .pipe(rename({
     extname: ''
   }))
   .pipe(gulp.dest('dist'));
}

function runWatch() {
  //build all for changes in templates
  gulp.watch('src/**/*.html.tpl', ['build']);
}

gulp.task('build', function(){
		runBuild();
	})



gulp.task('default', function(){
		runBuild();
		runWatch();
	});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});



