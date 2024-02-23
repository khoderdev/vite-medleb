// webpack.config.js
const WorkboxPlugin = require("workbox-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  // mode: 'production',
  plugins: [
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    new BundleAnalyzerPlugin(),
  ],
};
