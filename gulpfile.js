const { basename, dirname } = require("path");
const { src, dest, series } = require("gulp");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const rollupEach = require("gulp-rollup-each");
const typescript = require("rollup-plugin-typescript");

const rolup = ({ format }) => {
  return rollupEach({
    output: { format },
    plugins: [typescript({ tsconfig: "./tsconfig.json" })]
  });
};

const tsRename = isLib => {
  return rename(path => {
    if (isLib) {
      path.basename = basename(path.dirname);
      path.dirname = dirname(path.dirname);
    }
    path.extname = ".js";
  });
};

function js() {
  return src("src/js/**/*.js")
    .pipe(uglify())
    .pipe(dest("dist/js"));
}

function lib() {
    return src("src/js/lib/*/index.ts")
      .pipe(rolup({ format: "umd" }))
      .pipe(tsRename(true))
      .pipe(dest("src/js/lib"));
  }

function ts() {
  return src("src/js/!(lib)**/!(_)*.ts")
    .pipe(rolup({ format: "iife" }))
    .pipe(tsRename(false))
    .pipe(dest("src/js"));
}

exports.default = series(ts,lib);

exports.build = series(js);
