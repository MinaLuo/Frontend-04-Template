module.exports = {
    entry: "./animation-demo.js",
    // devServer: {
    //     contentBase: './dist',
    //     compress: true,
    //     port: 9000
    // },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                    plugins: [["@babel/plugin-transform-react-jsx", { pragma: "createElement" }]]
                }
            }
        }]
    },
    mode: "development"
}