
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import strip from '@rollup/plugin-strip';

export default {
  input: ['build/pwa-files.js'],
  output: {
    file: 'dist/pwa-files.js',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    resolve(),
    minifyHTML(),
    terser(),
    strip({
      functions: ['console.log']
    })
  ]
};