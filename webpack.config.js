const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinCssExtractPlugin = require('mini-css-extract-plugin');
const {re} = require("@babel/core/lib/vendor/import-meta-resolve");

module.exports = (env = {}) => {

    const {mode = 'development'} = env;

    const isProd = mode === 'production';
    const isDev = mode === 'development';

    const getStyleLoaders = () => {
        return [
            isProd ? MinCssExtractPlugin.loader : 'style-loader',
            'css-loader'
        ]
    };

    const getPlugins = () => {
        const plugins = [
            new HtmlWebpackPlugin({
                template: 'public/index.html',
                title: "Assessment",
                buildTime: new Date().toString()
            })
        ]
        if (isProd) {
            plugins.push(
                new MinCssExtractPlugin({
                    filename: 'main-[hash:8].css'
                })
            )
        }

        return plugins;
    };

    return {
        mode: isProd ? 'production' : isDev && 'development',
        entry: './src/index.js',
        output: {
            filename: isProd ? 'main-[hash:8].js' : undefined,
            publicPath: "/"
        },

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
                    use: getStyleLoaders()
                },

                // scss/sass load
                {
                    test: /\.(c[ca]ss)$/,
                    use: [...getStyleLoaders(), "sass-loader"]
                },
            ]
        },

        plugins: [
            ...getPlugins()
        ],

        devServer: {
            open: true,
            historyApiFallback: true
        }
    }
}