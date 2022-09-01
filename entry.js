const vue = require('vue');
const server_renderer = require('vue/server-renderer');

exports.render_ssr_app = server_renderer.renderToString;
exports.create_ssr_app = vue.createSSRApp;
