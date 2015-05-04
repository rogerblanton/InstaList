/*eslint no-process-env:0, valid-jsdoc:0, no-unused-vars:0*/
"use strict";
var gulp = require('gulp'),
    gutil = require( "gulp-util" ),
    gzip = require('gulp-gzip'),
    vulcanize = require('gulp-vulcanize'),
    sourcemaps = require('gulp-sourcemaps'),
    traceur = require('gulp-traceur'),
    uglify = require('gulp-uglify'),
    run = require( "run-sequence" ),
    fs = require( "fs" ),
    requiredir = require( "requiredir" ),
    dotenv = require( "dotenv" ),
    config = require( "./config.paths.js" ),
    dummy,
    currentTasks;

// get array of currently running tasks
/*currentTasks = process.argv.reduce(
  function( prev, curr ) {
    if ( prev.consume ) {
      prev.list.push( curr );
    } else if ( ( /gulp(\.js)?$/ ).test( curr ) ) {
      prev.consume = true;
    }
    return prev;
  }, {
    consume: false,
    list: []
  }
).list.filter( function( name ) { return !( /(^--)|(\/)/g ).test( name ); });
*/
// assume default
/*
if ( currentTasks.length === 0 && process.argv.length === 2 ) {
  currentTasks.push( "default" );
}
*/
// load gulp tasks from ./tasks
/* jshint -W098 */
dummy = requiredir( "./tasks" );

/*** MAGIC "START" TASK ***/
gulp.task( "start", function( done ) {
  gutil.log( ( new Date() ).toString() );
  gutil.log( "Running task for env: " + process.env.GULP_ENVIRONMENT );

  switch ( process.env.GULP_ENVIRONMENT ) {
    case "DEVELOPMENT":
      run( "dev", done );
      break;
    case "PRODUCTION":
      run( "prod", done );
      break;
    case "QA":
      // do QA task ?
      gutil.log( "Task has not been created yet" );
      done();
      break;
    default:
      run( "default", done );
      break;
  }
});

/* TODO Do we need a watch task? */
gulp.task( "watch", function( done ) {
  run(
    [
      "less:watch",
      "jscs:watch",
      "lint:watch",
      "traceur:watch"
    ],
    done
  );
});

/*** DEVELOPMENT BUILD TASK ***/
gulp.task( "build:dev", function( done ) {
  run(
    "clean:dev",
    [
      "less:dev",
      "symlink:dev",
      "vendor:dev",
      "traceur:dev"
    ],
    done
  );
});

/*** MAIN DEVELOPMENT TASK ***/
gulp.task( "dev", function( done ) {
  run(
    "build:dev",
    "build:tests:only",
    "server:dev",
    [
      "less:watch",
      "jscs:watch",
      "lint:watch",
      "traceur:watch"
    ],
    "jscs:client",
    "lint:client",
    "tdd",
    done
  );
});

/*** TESTING TASKS ***/
gulp.task( "build:tests:only", function( done ) {
  run(
    [
      "symlink:tests",
      "vendor:tests",
      "build:tests:index"
    ],
    done
  );
});

gulp.task( "build:tests", function( done ) {
  run(
    "build:dev",
    "build:tests:only",
    done
  );
});

gulp.task( "test", function( done ) {
  run(
    "build:tests",
    "karma:once",
    done
  );
});

/*** PRODUCTION BUILD TASK ***/
gulp.task( "build:prod", function( done ) {
  gutil.log( "TODO THIS TASK" );
  done();
});

/*** MAIN PRODUCTION TASK ***/
gulp.task( "prod", function( done ) {
  run( "build:prod", done );
});

/*** BUILD ALL OF THE THINGS ***/
gulp.task( "build", [ "build:dev", "build:prod" ]);


/*** GULP DEFAULT IS START ***/
gulp.task( "default", [ "start" ]);

/*gulp.task('vulcanize', function () {
    return gulp.src('index.html')
        .pipe(
          vulcanize({
            dest: 'build',
            //strip: true,
            inline: true,
            files:[
              'index.html'
            ]
          })
        )
        .pipe(gzip())
        .pipe(
          gulp.dest('build')
        );
});

gulp.task('traceur', function () {
    return gulp.src('assets/javascripts/il*.js')
        .pipe(sourcemaps.init())
        .pipe(traceur())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/javascripts/es5'));
});

gulp.task('uglify', ['traceur'], function () {
  return gulp.src('assets/javascripts/es5/*.js')
      .pipe(
        uglify({
          sequences     : true,  // join consecutive statemets with the “comma operator”
          properties    : true,  // optimize property access: a["foo"] → a.foo
          dead_code     : true,  // discard unreachable code
          drop_debugger : true,  // discard “debugger” statements
          unsafe        : false, // some unsafe optimizations (see below)
          conditionals  : true,  // optimize if-s and conditional expressions
          comparisons   : true,  // optimize comparisons
          evaluate      : true,  // evaluate constant expressions
          booleans      : true,  // optimize boolean expressions
          loops         : true,  // optimize loops
          unused        : true,  // drop unused variables/functions
          hoist_funs    : true,  // hoist function declarations
          hoist_vars    : false, // hoist variable declarations
          if_return     : true,  // optimize if-s followed by return/continue
          join_vars     : true,  // join var declarations
          cascade       : true,  // try to cascade `right` into `left` in sequences
          side_effects  : true,  // drop side-effect-free statements
          warnings      : true,  // warn about potentially dangerous optimizations/code
          global_defs   : {}
        })
      )
      //.pipe(gzip())
      .pipe(gulp.dest('build/assets/javascripts/min'));
});

//gulp.task('default', ['vulcanize', 'uglify']);
*/
