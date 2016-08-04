var path = require('path');
var webpack = require('webpack');

module.exports =
{
    watch: true,
    entry: './src/app/index.js',
    output: {
        path: path.join(__dirname, "build"),
        filename: 'index.js'
    },

    plugins: [
        /*new webpack.optimize.UglifyJsPlugin({
         compress: {
         warnings: false,
         drop_console: true,
         unsafe: false
         }
         })*/
    ],

    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: path.join(__dirname, "src/app"),
            exclude: /quill.js$/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0', 'react'],
                cacheDirectory: true
            }
        }
        ]
    }
};