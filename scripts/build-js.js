var browserify = require('browserify'),
    exorcist = require('exorcist'),
    path = require('path'),
    babelify = require('babelify'),
    prod = process.argv.indexOf('--prod') != -1,
    fast = process.argv.indexOf('--fast') != -1


if (prod) console.warn('\x1b[36m%s\x1b[0m', 'Building minified js bundle for production... This may take a while... ');

var b = browserify(path.resolve(__dirname + '/../src/browser/js/browser.js'), {debug:!fast});

b.transform(babelify, {presets: ["es2015"], plugins: ["transform-object-rest-spread"]})

if (prod) b.transform('uglifyify', {global: true})

b = b.bundle()

if (!fast) b.pipe(exorcist(path.resolve(__dirname + '/../app/browser/scripts.js.map')))

b.pipe(process.stdout)
