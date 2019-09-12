const path = require('path');  //node way of importing third party library
const webpack = require('webpack'); 
const ExtractTextPlugin = require('extract-text-webpack-plugin');  //node way of importing third party library

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'test'){
    require('dotenv').config({ path: '.env.test' });  //with this the external will read
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' });    
}

module.exports = (env) => {
    // console.log('env', env);
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return  {        
            entry: ['babel-polyfill', './src/app.js'],
            output: {
                path: path.join(__dirname, 'public', 'dist'),
                filename: 'bundle.js'
            },
            module: {
                rules: [{
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                }, {
                    test: /\.s?css$/,
                    use: CSSExtract.extract({
                        use: [
                            // 'style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                }]
            },
            plugins: [
                CSSExtract,
                new webpack.DefinePlugin({
                    'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                    'process.env.FIREBASE_AUTHDOMAIN': JSON.stringify(process.env.FIREBASE_AUTHDOMAIN),
                    'process.env.FIREBASE_DATABASEURL': JSON.stringify(process.env.FIREBASE_DATABASEURL),
                    'process.env.FIREBASE_PROJECTID': JSON.stringify(process.env.FIREBASE_PROJECTID),
                    'process.env.FIREBASE_STORAGEBUCKET': JSON.stringify(process.env.FIREBASE_STORAGEBUCKET),
                    'process.env.FIREBASE_MESSAGINGSENDERID': JSON.stringify(process.env.FIREBASE_MESSAGINGSENDERID),
                    'process.env.FIREBASE_APPID': JSON.stringify(process.env.FIREBASE_APPID)

                })
            ],
            // devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
            devtool: isProduction ? 'source-map' : 'inline-source-map',
            devServer: {
                contentBase: path.join(__dirname, 'public'),
                historyApiFallback: true,
                publicPath: '/dist/'      
            }
        };    
 };

