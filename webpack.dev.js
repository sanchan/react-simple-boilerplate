const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const rootPath = fs.realpathSync(process.cwd());


module.exports = (env, options) => {
  const isDev = true;
  const port = 4000;

  const config = {
    devtool: 'source-map',
    devServer: {
      index: './public/index.html',
      contentBase: './public',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      historyApiFallback: true,
      inline: true,
      port: port,
      hot: true,
      watchContentBase: true,
    },
    entry: {
      index: ['./src/index.js'],
      styles: ['./src/css/index.css']
    },
    output: {
      path: __dirname + '/public',
      filename: 'javascript/[name].js',
      // Maybe this?
      publicPath: `http://localhost:${port}/`,
      // publicPath: '/',
      // Just in case we want to change the HRM filenames
      hotUpdateChunkFilename: 'javascript/[id].[hash].hot-update.js',
      hotUpdateMainFilename: 'javascript/[hash].hot-update.json'
    },
    resolve: {
      // extensions: ['*', '.js', '.jsx'],
      alias: {
        // https://github.com/gaearon/react-hot-loader#react--dom
        'react-dom': '@hot-loader/react-dom',
        components: path.join(rootPath, 'src/components'),
        constants: path.join(rootPath, 'src/constants'),
        store: path.join(rootPath, 'src/store'),
        ducks: path.join(rootPath, 'src/ducks'),
        queries: path.join(rootPath, 'src/queries'),
        utils: path.join(rootPath, 'src/utils'),
        images: path.join(rootPath, 'src/images'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [{
              loader: 'babel-loader',
              options: {
                  cacheDirectory: true
              }
          }, {
              // https://www.npmjs.com/package/webpack-preprocessor-loader
              loader: 'webpack-preprocessor-loader',
              options: {
                  debug: options.mode !== 'production',
                  params: {
                      debug: options.mode !== 'production',
                      mode: options.mode,
                  },
                  verbose: false,
              },
          }]
        },
        {
          test: /\.css$/,
          use: [
            ExtractCssChunks.loader,
            {
              loader: 'css-loader',
              options: {
                // Comment this if you want to use "minified" classnames
                modules: {
                    // If modules is true: Make all CSS classes 5 char length. Ie: '._3yDYR'
                    localIdentName: '[hash:base64:5]',
                },
                // We need this bc of 'postcss-loader': https://github.com/webpack-contrib/css-loader#importloaders
                importLoaders: 2,
                sourceMap: isDev
              }
            }
          ]
          // use: [ 'css-to-mui-loader' ]
        },
        {
          test: /\.(jpg|png|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 25000,
          },
        },
        // {
        //     test: /\.(jpg|png)$/,
        //     loader: 'file-loader',
        //     options: {
        //       name: '[path][name].[hash].[ext]',
        //     },
        // },
        // {
        //   test: /\.svg$/,
        //   use: [
        //     {
        //       loader: '@svgr/webpack',
        //       options: {
        //         native: true,
        //       },
        //     },
        //   ],
        // }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ExtractCssChunks({
        // NOTE filename specifies where to move the extracted CSS so in the HTML file we need something like:
        //     <link href="http://localhost:3000/[name].css" rel="stylesheet">
        // where (in this case) [name] should be replaced by the name of the webpack's entry (ie app.css)
        // We can specify any arbitrary name here like "style.css" so we can have this in our HTML:
        //     <link href="http://localhost:3000/style.css" rel="stylesheet">
        filename: 'css/[name].css',
        chunkFilename: 'css/[id].css',
        // Optional as the plugin cannot automatically detect if you are using HOT, not for production use
        hot: isDev
    }),
    ],
  };

  return config;
}