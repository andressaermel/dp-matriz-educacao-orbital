const gulp = require("gulp"),
	{ parallel, series } = require("gulp");

const tinypng = require("gulp-tinypng-compress"),
	htmlmin = require("gulp-htmlmin"),
	uglify = require("gulp-uglify"),
	sass = require("gulp-sass")(require("sass")),
	sourcemaps = require("gulp-sourcemaps"),
	concat = require("gulp-concat"),
	browser = require("browser-sync").create(),
	render = require("gulp-nunjucks-render"),
	autoprefixer = require("gulp-autoprefixer"),
	babel = require("gulp-babel"),
	header = require("gulp-header-comment");

const source = "source/",
	dist = "dist/",
	banner = `
                <%= pkg.title %> <<%= pkg.homepage %>>
                Developed by <%= pkg.author.name %> <<%= pkg.author.email %>>
                Copyright © <%= moment().format('YYYY') %> <%= pkg.author.company %> <<%= pkg.author.url %>>
                Lastest Update in <%= moment().format('DD/MM/YY') %>
            `;

function images(cb) {
	gulp
		.src(source + "assets/images/**/*.{png,jpg,jpeg}")
		.pipe(
			tinypng({
				key: "8nJXfZZX22V6hdL4vmYmWwV9nHzFB0Pb",
				sigFile: "images/.tinypng-sigs",
				log: true,
			})
		)
		.pipe(gulp.dest(dist + "images"));
	cb();
}

function js(cb) {
	gulp
		.src([
			"./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
			"./node_modules/maska/dist/cdn/maska.js",
			source + "assets/js/*js",
		])
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ["@babel/preset-env"],
			})
		)
		.pipe(concat("app.js"))
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(header(banner))
		.pipe(sourcemaps.write("../maps"))
		.pipe(gulp.dest(dist + "js"))
		.pipe(browser.stream());
	cb();
}

function css(cb) {
	gulp
		.src(source + "assets/css/*.sass")
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: "compressed",
			}).on("error", sass.logError)
		)
		.pipe(
			autoprefixer({
				browserlist: ["last 2 versions"],
				cascade: false,
			})
		)
		.pipe(header(banner))
		.pipe(sourcemaps.write(`../maps`))
		.pipe(gulp.dest(dist + "css"))
		.pipe(browser.stream());
	cb();
}

function nunjucks(cb) {
	gulp
		.src(source + "pages/*.html")
		.pipe(
			render({
				path: [source + "includes/"],
			})
		)
		.pipe(
			htmlmin({
				collapseWhitespace: true,
			})
		)
		.pipe(gulp.dest(dist));
	cb();
}

function fonts(cb) {
	gulp
		.src(["./node_modules/bootstrap-icons/font/fonts/**/*", source + "assets/fonts/**/*"])
		.pipe(gulp.dest(dist + "fonts"));
	cb();
}

function icons(cb) {
	gulp
		.src([
			"./node_modules/bootstrap-icons/bootstrap-icons.svg",
			source + "assets/svg/**/*",
			source + "assets/images/**/*.{ico,svg}",
		])
		.pipe(gulp.dest(dist + "images"));
	cb();
}

function files(cb) {
	gulp.src([source + "manifest.json", source + "*.html"]).pipe(gulp.dest(dist));
	cb();
}

function php(cb) {
	gulp.src([source + "pages/*.php"]).pipe(gulp.dest(dist));
	cb();
}

function watcher() {
	browser.init({
		server: {
			baseDir: dist,
		},
	});
	gulp.watch(source + "assets/css/**/*.sass", css);
	gulp.watch(source + "assets/js/*.js", js).on("change", browser.reload);
	gulp.watch(source + "pages/*.html", nunjucks).on("change", browser.reload);
	gulp.watch(source + "includes/*.html", nunjucks).on("change", browser.reload);
}

exports.default = series(css, js, images, fonts, icons, php, files, nunjucks, watcher);
exports.build = parallel(css, js, images, fonts, icons, php, files, nunjucks);
exports.assets = parallel(css, js, fonts, icons, files);
exports.php = parallel(php);
