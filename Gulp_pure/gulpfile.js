const gulp = require("gulp");
const del = require('del');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const jade = require('gulp-jade');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('clean:dist', function() {
    return del.sync('dist');
});

gulp.task('msg',()=>console.log('Gulp is running...'));

gulp.task('jade', ()=>{
   gulp.src('src/jade/*.jade')
        .pipe(jade({
           pretty: true  //Remove this flag to have a minified HTML file
        }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
})

gulp.task('imageMin',()=>{
   gulp.src('src/images/*')
       .pipe(imagemin([
           imagemin.gifsicle({interlaced: true}),
           imagemin.jpegtran({progressive: true}),
           imagemin.optipng({optimizationLevel: 5}),
           imagemin.svgo({
           plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
            ]
          })
        ]))
       .pipe(gulp.dest('dist/images'));
});

gulp.task('uglify', ()=>{
  gulp.src('src/js/*.js')
      .pipe(concat('main'))
      .pipe(rename({suffix: '.min.js'}))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.stream());
});

gulp.task('sass',()=>{
   console.log("Generate CSS files " + (new Date()).toString());
   gulp.src(['src/sass/*.sass','src/sass/*.scss'])
       .pipe(sass().on('error',sass.logError))
       .pipe(autoprefixer())
       .pipe(gulp.dest('dist/css'))
       .pipe(rename({suffix: '.min'}))
       .pipe(cssnano())
       .pipe(gulp.dest('dist/css'))
       .pipe(browserSync.stream());
});

//Watch sass & server
gulp.task('serve',['sass','jade'],()=>{
     browserSync.init({
         server:"./dist"
     });
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss',
                'src/sass/*.sass'], ['sass']);
    gulp.watch(['src/jade/*.jade'], ['jade']);
    gulp.watch(['src/js/*.js'], ['uglify']);
    gulp.watch(['src/images/*'], ['imageMin']);
    gulp.watch(['dist/*.html',
                'dist/css/*.css',
                'dist/js/*.js',
                'dist/images/*',
                'dist/fonts/*']).on('change',browserSync.reload);
});

gulp.task('default',['msg','jade','imageMin','uglify','sass','serve']);

