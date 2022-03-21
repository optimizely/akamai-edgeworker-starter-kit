import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser';

export default {

  /* Specify main file for EdgeWorker */
  input: 'src/main.js',

  /* Define external modules, which will be provided by the EdgeWorker platform */
  external: ['log', 'http-request'],

  /* Define output format as an ES module and specify the output directory */
  output: {
    format: 'es',
    dir: "dist"
  },

  /* Bundle all modules into a single output module */
  preserveModules: false,

  plugins: [

    /* Convert CommonJS modules to ES6 */
    commonjs(),

    json(),

    /* Resolve modules from node_modules */
    resolve({browser: true}),

    /* Copy bundle.json to the output directory */
    copy({
      targets: [
        { src: 'bundle.json', dest: 'dist' }
      ]
    }),

    terser(),
  ]
};
