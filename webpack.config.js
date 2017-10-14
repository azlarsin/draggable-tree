/**
 * Created by azlar on 16/04/2017.
 */

const path = require('path'),
    webpack = require('webpack'),
    isProduction = process.env.NODE_ENV === 'production',
    filename = isProduction ? "DraggableTree.min.js" : "DraggableTree.js";

module.exports = {
    entry: [
        './index.js'
    ],
    output: {
        path: path.resolve(__dirname, "lib"),
        filename: filename,
        library: "DraggableTree",
        publicPath: '/lib',
    },

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', options: { presets:['es2015', 'stage-0']} },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
        ]
    },

    plugins: isProduction ?
        [
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                comments: false,
                sourceMap: true,
                compress: {
                    unused: true,
                    dead_code: true, // big one--strip code that will never execute
                    warnings: false, // good for prod apps so users can't peek behind curtain
                    drop_debugger: true,
                    conditionals: true,
                    evaluate: true,
                    drop_console: true, // strips console statements
                    sequences: true,
                    booleans: true,
                }
            })
        ]
        :
        []
};