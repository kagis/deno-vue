const { rollup } = require('rollup');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const rollupReplace = require('@rollup/plugin-replace');
const rollupAlias = require('@rollup/plugin-alias');
const { appendFile } = require('fs/promises');

queueMicrotask(main);

async function main() {
  const bundle = await rollup({
    input: './entry.js',
    plugins: [
      rollupAlias({
        entries: [{
          find: 'stream',
          replacement: './stream_stub.js',
        }],
      }),
      commonjs({
        dynamicRequireTargets: [
          'node_modules/vue',
          'node_modules/vue/server-renderer',
        ],
      }),
      nodeResolve({ mainFields: ['main'] }),
      rollupReplace({
        values: { 'process.env.NODE_ENV': '""' },
        preventAssignment: true,
      }),
    ],
  });

  await bundle.write({
    file: 'bundle.js',
    format: 'esm',
  });

  await appendFile('bundle.js', 'var window;');
}