const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: "./client/client.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
            },
        ],
    },
    // https://github.com/felixge/node-formidable/issues/337#issuecomment-153408479
    plugins: [
        //new webpack.DefinePlugin({ "global.GENTLY": false })
    ],
    optimization: {
        minimize: false,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@client": path.resolve(__dirname, "client"),
            "@common": path.resolve(__dirname, "common"),
        },
    },
    output: {
        filename: "client.js",
        path: path.resolve(__dirname, "dist/client"),
    },
    target: "node",
};
