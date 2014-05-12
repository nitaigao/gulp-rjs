# gulp-r

First, install `gulp-r` as a development dependency:

```shell
npm install --save-dev gulp-rjs
```

Then, use it in your `gulpfile.js`:

```javascript
var rjs = require("gulp-rjs");

gulp.src("app/scripts/*.js")
    .pipe(gulp.dest("./dist/scripts"))
    .pipe(rjs({
        "baseUrl": "dist/scripts"
    }))
```

---

[![Build Status](https://travis-ci.org/polacks/gulp-r.svg?branch=master)](https://travis-ci.org/polacks/gulp-r)
[![Code Climate](https://codeclimate.com/github/polacks/gulp-r.png)](https://codeclimate.com/github/polacks/gulp-r)
[![Dependency Status](https://david-dm.org/polacks/gulp-r.svg)](https://david-dm.org/polacks/gulp-r)
