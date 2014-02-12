# gulp-rjs [![NPM version][npm-image]][npm-url]

> r.js optimizer plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-rjs` as a development dependency:

```shell
npm install --save-dev gulp-rjs
```

Then, use it in your `gulpfile.js`:
```javascript
var rjs = require("gulp-rjs");
gulp.src('app/scripts/*.js')
	.pipe(gulp.dest('./dist/scripts'))
	.pipe(rjs({baseUrl:'dist/scripts'}))
```

CoffeeScript pipeline example:

```javascript
var rjs = require("gulp-rjs");
gulp.src('app/scripts/*.coffee')
	.pipe(coffee().on('error', gutil.log))
	.pipe(gulp.dest('./dist/scripts'))
	.pipe(rjs({baseUrl:'dist/scripts'}))
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-rjs
[npm-image]: https://badge.fury.io/js/gulp-rjs.png
