const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: './src/index.js',

    module: {
        rules: [

            // js load
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },

            // image load
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: 'images',
                        name: '[name]-[sha1:hash:7].[ext]'
                    }
                }]
            },

            // font load
            {
                test: /\.(ttf|otf|eot|woff|woff2)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: 'fonts',
                        name: '[name].[ext]'
                    }
                }]
            },

            // css load
            {
                test: /\.(css)$/,
                use: ["style-loader", "css-loader"]
            },

            // scss/sass load
            {
                test: /\.(c[ca]ss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            title: "Assessment",
            buildTime: new Date().toString()
        })
    ]
}