var gulp = require('gulp'),
	fs = require('fs'),

	server = require('browser-sync'),
	del = require('del'),
	watch = require('gulp-watch'),
	sequence = require('run-sequence'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	gulpif = require('gulp-if'),
	run = require('gulp-run'),

	jade = require('gulp-jade'),
	htmlmin = require('gulp-minify-html'),
	htmlvalidator = require('gulp-w3cjs'),

	less = require('gulp-less'),
	cssmin = require('gulp-minify-css'),
	prefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),

	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),

	jsonTree = require('gulp-json-tree'),
	replace = require('gulp-replace'),

	sitemap = require('gulp-sitemap'),
	gzip = require('gulp-gzip'),

	imagemin = require('gulp-imagemin'),
	spritesheet = require('gulp-svg-sprite'),
	svg2png = require('gulp-svg2png');


var siteInfos = JSON.parse(fs.readFileSync('bower.json', { encoding: 'utf8' }));


/* ____________________________________________________________________________________ SERVER */

gulp.task('server', function() {
	return server.init(null, {
		server: {
			baseDir: 'build'
		},
		host: '0.0.0.0',
		port: '8000',
		notify: false
	});
});

var reload = server.reload;

var onError = function(err) {
	notify.onError({
		title: 'Compilation error',
		message: '<%= error.message %>',
		sound: 'Tink'
	})(err);
	
	this.emit('end');
};


/* ____________________________________________________________________________________ CLEAN */

gulp.task('clean', function (callback) {
	return del(['build/**/*'], callback);
});


/* ____________________________________________________________________________________ UTILITIES */

gulp.task('validator', ['json'], function() {
	return gulp.src('static/**/*.jade')
		.pipe(jade({
			basedir: './',
			pretty: true,
			data: JSON.parse(fs.readFileSync('data/data.json', { encoding: 'utf8' }))
		}))
		// .pipe(htmlvalidator())
		.pipe(gulp.dest('build'));
});


/* ____________________________________________________________________________________ WATCH */

gulp.task('jade', function() {
	return gulp.src('static/**/*.jade')
		.pipe(plumber({errorHandler: onError}))
		.pipe(jade({
			basedir: './',
			data: JSON.parse(fs.readFileSync('data/data.json', { encoding: 'utf8' }))
		}))
		.pipe(gulp.dest('build'))
		.pipe(reload({stream:true}));
});

gulp.task('json', function(){
	return gulp.src(['data/**/*.json', '!data/data.json'])
		.pipe(plumber({errorHandler: onError}))
		.pipe(jsonTree({
			filename: 'data.json'
		}))
		.pipe(replace('.json', ''))
		.pipe(gulp.dest('data'));
});

gulp.task('data', function(callback) {
	sequence(
		'json',
		'jade',
	callback);
});

gulp.task('less', function(){
	return gulp.src(['less/*.less'])
		.pipe(plumber({errorHandler: onError}))
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(prefixer('last 5 versions', 'ie 9'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/css'))
		.pipe(reload({stream:true}));
});

gulp.task('js', function(){
	var scripts = JSON.parse(fs.readFileSync('js/_compile.json', { encoding: 'utf8' }));

	return scripts.forEach(function(obj){
		return gulp.src(obj.src)
			.pipe(plumber({errorHandler: onError}))
			.pipe(sourcemaps.init())
			.pipe(concat(obj.name))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('build/js'))
			.pipe(reload({stream:true}));
	});
});

gulp.task('php', function(){
	return gulp.src(['server/**/*.*', 'server/**/.*', 'server/.*/**'])
		.pipe(gulp.dest('build'));
});

gulp.task('medias', function(){
	return gulp.src(['medias/**/*'])
		.pipe(gulp.dest('build/medias'));
});

gulp.task('fonts', function(){
	return gulp.src('fonts/**/*')
		.pipe(gulp.dest('build/fonts'));
});

gulp.task('images', function(){
	return gulp.src(['img/**/*', '!img/sprite/**/*', '!img/sprite'])
		.pipe(gulp.dest('build/img'));
});

gulp.task('spritesheet', function() {
	return gulp.src('img/sprite/**/*.svg', {cwd: '.'})
		.pipe(plumber())
		.pipe(spritesheet({
			'svg': {
				'xmlDeclaration': false,
				'doctypeDeclaration': false,
				'namespaceIDs': false,
				'dimensionAttributes': false
			},
			'shape': {
				'id': {
					'whitespace': '_'
				}
			},
			'mode': {
				'css': {
					'dest': 'build/css',
					'prefix': '.icon-%s',
					'dimensions': true,
					'sprite': '../img/sprite.svg',
					'bust': false,
					'render': {
						'less': {
							'dest': '../../less/utilities/sprite'
						}
					}
				}
			}
		})).on('error', function(error){ console.log(error); })
		// .pipe(gulp.dest('.'))
		// .pipe(gulpif('*.svg', svg2png()))
		.pipe(gulp.dest('.'));
});

gulp.task('css', function(callback) {
	sequence(
		'spritesheet',
		'less',
	callback);
});

gulp.task('make', function(callback) {
	sequence(
		'clean',
		'json',
		['css', 'images', 'fonts', 'medias', 'jade', 'js', 'php'],
		'server',
	callback);
});

gulp.task('default', ['make'], function() {
	gulp.watch(['static/**/*.jade', 'templates/**/*.jade', 'data/data.json'], ['jade']);
	gulp.watch('less/**/*.less', ['less']);
	gulp.watch(['js/**/*.js', 'js/_compile.json'], ['js']);
	gulp.watch(['data/**/*.json', '!data/data.json'], ['data']);
	gulp.watch(['server/**/*.*', 'server/**/.*'], ['php']);
});


/* ____________________________________________________________________________________ DIST */

gulp.task('less-dist', ['spritesheet'], function(){
	return gulp.src(['less/*.less'])
		.pipe(less())
		.pipe(prefixer('last 5 versions', 'ie 9'))
		.pipe(cssmin({
			compatibility: 'ie9',
			keepSpecialComments: 0,
			roundingPrecision: -1
		}))
		//.pipe(gzip({ gzipOptions: { level: 9, memLevel: 1} }))
		.pipe(gulp.dest('build/css'));
});

gulp.task('jade-dist', ['json'], function() {
	return gulp.src('static/**/*.jade')
		.pipe(jade({
			basedir: './',
			data: JSON.parse(fs.readFileSync('data/data.json', { encoding: 'utf8' }))
		}))
		.pipe(htmlvalidator())
		.pipe(htmlmin({
			removeComments: true,
			removeCommentsFromCDATA: true,
			removeCDATASectionsFromCDATA: true,
			collapseBooleanAttributes: true,
			removeAttributeQuotes: true,
			removeRedundantAttributes: true,
			useShortDoctype: true,
			removeEmptyAttributes: true,
			removeOptionalTags: true,
			minifyJS: true,
			minifyCSS: true,
			collapseWhitespace: true
		}))
		//.pipe(gzip({ gzipOptions: { level: 9, memLevel: 1} }))
		.pipe(gulp.dest('build'));
});

gulp.task('js-dist', function() {
	var scripts = JSON.parse(fs.readFileSync('js/_compile.json', { encoding: 'utf8' }));

    return scripts.forEach(function(obj){
		return gulp.src(obj.src)
			.pipe(concat(obj.name))
			.pipe(uglify())
			//.pipe(gzip({ gzipOptions: { level: 9, memLevel: 1} }))
			.pipe(gulp.dest('build/js'));
    });
});

gulp.task('sitemap', function(){
    gulp.src('build/**/*.html')
        .pipe(sitemap({
            siteUrl: siteInfos.homepage
        }))
        //.pipe(gzip({ gzipOptions: { level: 9, memLevel: 1} }))
        .pipe(gulp.dest('./build'));
});

gulp.task('fonts-dist', function(){
	return gulp.src(['fonts/**/*'])
		//.pipe(gulpif('*.svg', gzip({ gzipOptions: { level: 9, memLevel: 1} })))
		//.pipe(gulpif('*.ttf', gzip({ gzipOptions: { level: 9, memLevel: 1} })))
		//.pipe(gulpif('*.woff2', gzip({ gzipOptions: { level: 9, memLevel: 1} })))
		.pipe(gulp.dest('build/fonts'));
});

gulp.task('images-dist', function(){
	return gulp.src(['img/**/*', '!img/sprite/**/*', '!img/sprite'])
		.pipe(imagemin({
			multipass: true,
			interlaced: true,
			optimizationLevel: 9,
			svgoPlugins: [
				{ removeViewBox: true },
				{ removeUselessStrokeAndFill: true },
				{ removeEmptyAttrs: true }
			]
		}))
		//.pipe(gulpif('*.svg', gzip({ gzipOptions: { level: 9, memLevel: 1} })))
		.pipe(gulp.dest('build/img'));
});

gulp.task('optimize-images', ['images-dist'], function() {
	return gulp.src('.')
		.pipe(run('imageOptim -j -a -q -d build/img/'));
});

gulp.task('done', function() {
	return gulp.src('.')
		.pipe(run('open -a iterm'))
		.pipe(notify({
			title: 'Compilation completed',
			message: 'Your distribution folder is now ready',
			sound: 'Tink'
		}));
});

gulp.task('gzip-spritesheet', function(callback) {
	gulp.src('build/img/sprite.svg')
		.pipe(gzip({ gzipOptions: { level: 9, memLevel: 1} }))
		.pipe(gulp.dest('build/img'));
	return del(['build/img/sprite.svg'], callback);
});

gulp.task('dist', function(callback) {
	sequence(
		'clean',
		'json',
		['less-dist', 'jade-dist', 'js-dist', 'optimize-images', 'fonts-dist', 'medias', 'php'],
		['sitemap'],
		// ['sitemap', 'gzip-spritesheet'],
		'done',
	callback);
});

gulp.task('code', function(callback) {
	sequence(
		'clean',
		['less-dist', 'jade-dist', 'js-dist', 'php'],
		['sitemap'],
		//['sitemap', 'gzip-spritesheet'],
		'done',
	callback);
});