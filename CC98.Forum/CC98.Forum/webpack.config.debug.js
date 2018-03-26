"use strict"

const webpack = require("webpack")
const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
// const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {

    // webpack 4 only
    mode: "development",

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader'
                // use: 'ts-loader'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'] 
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },

    entry: {
        main: './Main.tsx',
        css_green: './Themes/forgive_green.scss',
        css_blue: './Themes/wuteng_blue.scss',
        css_more_green: './Themes/deep_dark_green.scss',
        vendors: [
            'react',
            'react-dom',
            // 'react-router',
            'react-router-dom',
            'redux',
            'react-redux',
            'redux-thunk',
            'url-join',
            'blueimp-canvas-to-blob',
            'history',
            'whatwg-fetch',
            'aplayer',
            'dplayer',
            'es6-promise',
            'core-js/shim',
        ]
    },
    output: {
        path: path.resolve(__dirname, 'wwwroot/'),
        // should use absolute path
        publicPath: '/',
        filename: 'static/scripts/[name]-[hash:8].js'
    },
    
    devtool: 'source-map',
    
    externals: {
        'jquery': '$',
        'moment': 'moment',
        'editor.md': 'editormd',
        'codemirror': 'CodeMirror',
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: 'Template.html',
            filename: 'index.html',
            chunks: ['main', 'vendors']
        }),
        
        new CopyWebpackPlugin([
            // copy config files
            { from: 'wwwroot/static', to: 'static/' },

            { from: 'node_modules/jquery/dist', to: 'static/scripts/lib/jquery/' },
            { from: 'node_modules/moment', to: 'static/scripts/lib/moment/' },
            { from: 'node_modules/font-awesome', to: 'static/content/font-awesome/' },
            { from: 'node_modules/moment', to: 'static/scripts/lib/moment/' },
            { from: 'node_modules/editor.md', to: 'static/scripts/lib/editor.md/' },
            { from: 'node_modules/codemirror', to: 'static/scripts/lib/editor.md/lib/codemirror/' },
            { from: 'node_modules/spectrum-colorpicker/spectrum.js', to: 'static/scripts/lib/spectrum/spectrum.js' },
            { from: 'node_modules/dplayer/dist/DPlayer.min.css', to: 'static/content/DPlayer.min.css' }
        ]),

        // new ExtractTextPlugin('static/content/[name].min.css'),
    ],

    devServer: {
        // contentBase: path.resolve(__dirname, "wwwroot/static"),
        // publicPath: "/static/",
        historyApiFallback: true,
        hot: true,
        inline: true,
        open: true,
    },
}

/** note:
  cnpm i webpack-dev-server@2 style-loader

  delete _@types_webpack@3.0.5 in node_modules

  .\node_modules\.bin\webpack-dev-server --config .\webpack.config.h2.js
  
**/