var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var CleanWebpackPlugin = require('clean-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var env = require("./config/env.js")
var entry = require("./config/entry.js")

console.log("=============================================================");
console.log("openDebug="+env.isOutLog);
console.log("isOpenMock="+env.isOpenMock);
console.log("isDebugSourceMap="+env.isDebugSourceMap);
console.log("=============================================================");

module.exports = {
    //devtool: '#source-map',
    entry: {},
    output: {
        filename: '[name].icity.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.scss$/, 
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'style-loader!css-loader!sass-loader'
                    }
                }
            },
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg|gif)$/, 
                loader: "file-loader?name=res/[hash:8].[name].[ext]"
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'], 
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'zepto$': 'n-zepto/n-zepto.js'
        }
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: __dirname + '/res/',
            to: __dirname + '/dist/res/'
        }]),
        new webpack.optimize.CommonsChunkPlugin('icommon'),
        new ExtractTextPlugin("[name].icity.css"),
        new webpack.ProvidePlugin({
            $: 'n-zepto',
            env: path.join(__dirname, "./config/env.js"),
            mock: path.join(__dirname, "./src/common/mock.js")
        }),
        new CleanWebpackPlugin(['dist'],
            {
                root: __dirname,
                verbose: true,
                dry: false
            }
        )
    ]
}

//########################################################
if(env.isDebugSourceMap) {
    module.exports.devtool = "#source-map";
}
//########################################################
if(process.env.NODE_DEV == 0) {
    var size = module.exports.plugins.length;
    module.exports.plugins[size] = new UglifyJsPlugin({
        uglifyOptions: {
            ecma: 8
        }
    })
}
//########################################################
var jsEntryMap = {}
var htmlEntryMap = []
for(var i=0; i<entry.entryFiles.length; i++) {
    var item = entry.entryFiles[i];
    
    if(item.js != undefined) {
        var jsname = path.basename(item.js, ".js");
        jsEntryMap[jsname] = item.js;
    }
    if(item.css != undefined) {
        var cssname = path.basename(item.css).replace(".", "");
        jsEntryMap[cssname] = item.css;
    }

    var htmlname = path.basename(item.html);
    htmlEntryMap[i] = new HtmlWebpackPlugin({
        filename: htmlname,
        template: item.html,
        hash: true,
        inject: 'head',
        chunks: ['icommon', jsname],
        css: ['']
    });
}
module.exports.entry = jsEntryMap;
module.exports.plugins = module.exports.plugins.concat(htmlEntryMap)