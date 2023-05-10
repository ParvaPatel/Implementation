// config-overrides.js
// module.exports = function override(config, env) {
//     // New config, e.g. config.plugins.push...
//     // console.log(JSON.stringify(config.resolve.fallback))
//      config.resolve.fallback = {
//          crypto: false,
//          path: false,
//          stream: false,
//          buffer: false,
//          ...config.resolve.fallback
//      };  
//      return config
//  }
 const webpack = require("webpack")

module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
        crypto: require.resolve('crypto-browserify'),
        path: require.resolve('path-browserify'),
    }
    config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"]
    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ]
    // console.log(config.resolve)
    // console.log(config.plugins)

    return config
}