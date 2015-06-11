module.exports = {
    cache: true,
    entry: './js/index.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'bundle.js'
    },
    devtool: 'source-map',

    module: {
        resolveLoader: {
            modulesDirectories: [
                'C:/Users/suprasan/AppData/Roaming/npm/node_modules'
            ]
        },
        loaders: [
            {
                test: /\.js$/,
                include: /js/,
                loader: 'babel-loader',
                query: { modules: 'common' }
            },
            {
                test: /\.css$/,
                include: /css/,
                loader: 'style!css'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            { test: /\.woff$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" }
        ]
    },

    resolve: {
        alias: {
            css: __dirname + '/css'
        }
    },

    externals:
    {
        jquery: 'jQuery',
        'jquery.ui.widget': 'jQuery',
        kendo: 'kendo',
        riot: 'riot'
    }
};
