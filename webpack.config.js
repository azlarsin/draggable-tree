/**
 * Created by azlar on 16/04/2017.
 */

const path = require('path');

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, "lib"),
        filename: 'DraggableTree.js',
        library: "DraggableTree"
    },

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', options: { presets:['es2015', 'stage-0']} },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
        ],
    },
    externals: {
        'react': 'commonjs react'
    }
};