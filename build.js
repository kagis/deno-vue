const { rollup } = require('rollup');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const rollupReplace = require('@rollup/plugin-replace');
const rollupAlias = require('@rollup/plugin-alias');
const rollupCleanup = require('rollup-plugin-cleanup');


async function main() {
  const bundle = await rollup({
    input: './entry.js',
    plugins: [
      rollupAlias({
        entries: [{
          find: 'node:stream',
          replacement: './stream_stub.js',
        }],
      }),
      commonjs({
        dynamicRequireTargets: [
          'node_modules/vue',
          'node_modules/vue/server-renderer',
        ],
      }),
      nodeResolve({
        exportConditions: ['node'],
      }),
      rollupReplace({
        values: { 'process.env.NODE_ENV': '""' },
        preventAssignment: true,
      }),
      // remove jsdoc to prevent deno do type imports
      // TODO preserve copyrights
      rollupCleanup({
        sourcemap: false,
      }),
    ],
  });

  await bundle.write({
    file: 'bundle.js',
    format: 'esm',
  });
}

await main();
