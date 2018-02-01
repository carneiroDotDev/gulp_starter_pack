const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const del = require('del');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// Show a message that it started running
gulp.task('msg',()=>console.log('Gulp is running...'));

// A task to delete my dist folder
gulp.task('clean:dist', function() {
    return del.sync('dist');
});

// Compile html & inject into browser
gulp.task('jade', ()=>{
  return gulp.src('./src/jade/*.jade')
    .pipe(jade({
         pretty: true   
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('sass',()=>{
   console.log("Generate CSS files " + (new Date()).toString());
   gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/sass/*.sass','src/sass/*.scss'])
       .pipe(sass().on('error',sass.logError))
       .pipe(gulp.dest('dist/css'))
       .pipe(rename({suffix: '.min'}))
       .pipe(cssnano())
       .pipe(gulp.dest('dist/css'));
});

// Move JS files to src/js
gulp.task('js',()=>{
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
                     'node_modules/jquery/dist/jquery.min.js',
                     'node_modules/popper.js/dist/umd/popper.min.js'])
               .pipe(gulp.dest('dist/js'))
               .pipe(browserSync.stream());
});

// Compact my custom JS files and move to src/js
gulp.task('uglify', ()=>{
  gulp.src('src/js/*.js')
      .pipe(concat('main'))
      .pipe(rename({suffix: '.min.js'}))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

// Minimize images
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
    gulp.watch('dist/*.html').on('change',browserSync.reload);
});

// Move fonts folder to src 
    gulp.task('fonts',()=>{
         return gulp.src('node_modules/font-awesome/fonts/*')
                    .pipe(gulp.dest('dist/fonts'));
    });

// Move font awesome CSS to src/css  
    gulp.task('fa',()=>{
         return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
                    .pipe(gulp.dest('dist/css'));
    });

// default 
    gulp.task('default',['js','uglify','serve','imageMin','fa','fonts']);
