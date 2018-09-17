// install dependencies for fx-extra and concat, since ng6 doesn't support
// porting yet, feel free to modify this
const fe = require('fs-extra');
const con = require('concat');

// use async for production build
(async function build() {
  // register data to be concatinated
  // note: register exactly by this order.
  const files = [
    './dist/AngularElement/runtime.js',
    './dist/AngularElement/polyfills.js',
    // if script.js is present in dist folder if you run 'ng build' add it in here
    // './dist/AngularElement/script.js',
    './dist/AngularElement/main.js'
  ];

  // ensure a directory named "poll", create if none
  await fe.ensureDir('poll');
  // concatinate files into a single Js file
  await con(files, 'poll/poll.js');
  // copy styling from dist folder, since I used ViewEncapsulation, this is not necessary
  // await fs.copyFile('./dist/AngularElement/styles.css', 'poll/styles.css');
  // copy asset files from the dist folder asset directory to the "poll" directory
  await fe.copy('./dist/AngularElement/assets/img/', 'poll');
})();
