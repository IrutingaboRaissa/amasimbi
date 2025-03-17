const path = require('path');
const webpack = require('webpack'); 

module.exports = {
  entry: './src/app.tsx', 
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'build'), 
    publicPath: '/', 
  },
  mode: 'development', 
  devtool: 'inline-source-map', 
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/'), 
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    // Add other plugins as needed (e.g., HtmlWebpackPlugin)
  ],
  optimization: {
    // Only for production builds - Enables tree shaking and minification
    // minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
    // splitChunks: {
    //   chunks: 'all',
    // },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Or 'dist'
    },
    historyApiFallback: true, // Enables single-page application routing
    compress: true,
    port: 3000, // Or your preferred port
},
};