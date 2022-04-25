

module.exports = {
    mode: "development",
    entry: './src/index.js',

    module: {
        rules: [

            {
                test: /\.js/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
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
                use: "css-loader"
            },
        ]
    }
}