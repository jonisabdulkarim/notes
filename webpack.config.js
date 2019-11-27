var path = require('path');

module.exports = {
    entry: './src/main/js/app.js', // defines entry point
    devtool: 'sourcemaps', // creates sourcemaps so to find original source code
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'), // packages all js scripts
                exclude: /(node_modules)/,
                use: [{ // compiles ES6 into standard
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            }
        ]
    }
};