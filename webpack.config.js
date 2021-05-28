const path = require("path");
const WebpackUserscript = require("webpack-userscript");

const dev = process.env.NODE_ENV === "development";

module.exports = {
    mode: dev ? "development" : "production",
    entry: path.resolve(__dirname, "src", "index.ts"),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "meetify.user.js",
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        port: 8080,
    },
    devtool: 'eval-source-map',
    plugins: [
        new WebpackUserscript({
            headers: {
                name: "Meetify",
                namespace: "https://webzyno.com",
                version: dev ? `[version]-build.[buildNo]` : `[version]`,
                description: "Google Meet notification tampermonkey script",
                author: "Chao Tzu-Hsien",
                match: ["https://meet.google.com/*"],
                icon: "https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v1/web-64dp/logo_meet_2020q4_color_1x_web_64dp.png",
                grant: [
                    "GM_notification",
                ],
            },
            proxyScript: {
                baseUrl: "http://127.0.0.1:8080",
                filename: "[basename].proxy.user.js",
                enable: true,
            },
        }),
    ],
};
