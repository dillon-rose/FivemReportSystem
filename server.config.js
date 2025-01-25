const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: "./server/server.ts",
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
            "@server": path.resolve(__dirname, "server"),
            "@common": path.resolve(__dirname, "common"),
        },
    },
    output: {
        filename: "server.js",
        path: path.resolve(__dirname, "dist/server"),
    },
    target: "node",
};
