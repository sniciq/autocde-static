var gulp = require("gulp");
var gutil = require('gulp-util');
var plumber = require( 'gulp-plumber' );
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-html-minifier');
var cssmin = require('gulp-cssmin');
var fs = require("fs");
var series = require('stream-series');
var rmdir = require('rmdir');
var ngAnnotate = require('gulp-ng-annotate');

function buildJsFile(srcFiles, dest) {
	rmdir(dest, function(err, dirs, files) {
		var buildStream = gulp.src(srcFiles)
			.pipe(plumber())
			.pipe(ngAnnotate());
		
		var process = series(buildStream)		
		.pipe(uglify({ 
			preserveComments: 'some',
			mangle: {
				except: ["define","require","module","exports"]
			}
		}))
		.pipe(rename({ extname: '.js' }))
		.pipe(gulp.dest(dest));
	});
}

function buildJs() {
	gutil.log("building js files...");
	
	buildJsFile('../../src/main/webapp/WEB-INF/ctrl/**/*.js', '../../src/main/webapp/WEB-INF/dist/ctrl/');
	buildJsFile('../../src/main/webapp/WEB-INF/directive/**/*.js', '../../src/main/webapp/WEB-INF/dist/directive/');
	buildJsFile('../../src/main/webapp/WEB-INF/filter/**/*.js', '../../src/main/webapp/WEB-INF/dist/filter/');
}

function buildCss() {
	var files = ['../../src/main/webapp/WEB-INF/directive/**/*.css'];
	gutil.log("building css files...");
	
	var buildStream = gulp.src(files)
	.pipe(plumber())
	.pipe(cssmin())
	.pipe(rename({ extname: '.css' }))
	.pipe(gulp.dest('../../src/main/webapp/WEB-INF/dist/directive/'));
}

function buildHtml() {
	var srcFiles = ['../../src/main/webapp/WEB-INF/templates/**/*.html'];
	gutil.log("building html files...");
	
	rmdir('../../src/main/webapp/WEB-INF/dist/templates/',function(err, dirs, files) {
		var options = {
	        removeComments: true,//清除HTML注释
	        collapseWhitespace: true,//压缩HTML
	        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
	        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
	        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
	        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
	        minifyJS: true,//压缩页面JS
	        minifyCSS: true//压缩页面CSS
	    };
		
		var buildStream = gulp.src(srcFiles)
		.pipe(plumber());
		
		var process = series(buildStream)		
		.pipe(htmlmin(options))
		.pipe(rename({ extname: '.html' }))
		.pipe(gulp.dest('../../src/main/webapp/WEB-INF/dist/templates/'));
	});
}

gulp.task('default', function() {
	buildJs();
	buildCss();
	buildHtml();
})
