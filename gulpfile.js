var fs = require('fs'),
    path = require('path'),

    gulp = require('gulp'),
    babel = require('gulp-babel'),

    browserify = require('browserify'),
    babelify = require('babelify'),
    envify = require('envify/custom'),
    exorcist = require('exorcist'),

    mkdirp = require('mkdirp'),

    config = require('./package');

gulp.task('transpile', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('.'));
});

gulp.task('dist', function () {
  var outDir = 'dist',
      builds = {
        "./src": config.name,
        "./src/drivers": config.name + '.drivers',
      };

  // Make sure the dist directory exists
  mkdirp.sync(outDir);

  // Make bundles for distribution
  for (var entry in builds) {
    var
      buildName = builds[entry],
      build = path.join(outDir, buildName+'.js'),
      minBuild = path.join(outDir, buildName+'.min.js');

    processBundle(entry, build);
    processBundle(entry, minBuild, true);
  }

  function processBundle (entry, path, minify) {
    var
      outStream = fs.createWriteStream(path, 'utf8'),

      bundle = browserify({
        debug: true
      }).transform(babelify);

    if (minify)
      bundle.transform(envify({
        NODE_ENV: 'production',
        _: 'purge'
      }))
      .transform({
        global: true
      }, 'uglifyify');


    return (
      bundle
        .add(require.resolve(entry), { entry: true })
        .bundle()
        .on('error', function (e) { console.log(e); })
        .pipe(exorcist(path + '.map'))
        .pipe(outStream)
    );
  }
});

gulp.task('watch', ['transpile'], function () {
  gulp.watch(['src/**/*.js'], ['transpile']);
});

gulp.task('build', ['transpile', 'dist']);
