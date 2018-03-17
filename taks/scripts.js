import gulp from 'gulp';
import gulpIf from 'gulp-if'; // 做判断
import concat from 'gulp-concat'; // 处理文件拼接
import webpack from 'webpack'; // 打包
import gulpWebpack from 'webpack-stream';
import named from 'vinyl-named';
import livereload from 'gulp-livereload'; // 热跟新
import plumber from 'gulp-plumber'; // 处理文件流
import rename from 'gulp-rename'; // 文件重命名
import uglify from 'gulp-uglify'; // 压缩js
import { log, colors } from 'gulp-util'; // 命令行log
import args from './util/args'; // 命令行参数

gulp.task('scripts', () => {
    return gulp.src(['app/js/index.js'])
        // 处理错误
        .pipe(plumber({
            errorHandle: function () {

            }
        }))
        .pipe(named())
        .pipe(gulpWebpack({
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel'
                }]
            }
        }), null, (err, stats) => {
            log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
                chunks: false
            }))
        })
        .pipe(gulp.dest('server/public/js'))
        .pipe(rename({
            basename: 'cp',
            extname: '.min.js'
        }))
        .pipe(uglify({ compress: { properties: false }, output: { 'quote_keys': true } }))
        .pipe(gulp.dest('server/public/js'))
        .pipe(gulpIf(args.watch, livereload()))
})
