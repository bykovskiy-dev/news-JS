const webpack = require('webpack');

module.exports = {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.API_URL': JSON.stringify(process.env.API_URL ?? 'https://rss-news-api.onrender.com/v2/'),
            'process.env.API_KEY': JSON.stringify(process.env.API_KEY ?? ''),
        }),
    ],
};
