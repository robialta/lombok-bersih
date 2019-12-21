const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    configureWebpackPlugin : {
        plugin : [
            new CopyWebpackPlugin([
                {
                    context: 'node_modules/@webcomponents/webcomponentsjs',
                    from: '**/*.js',
                    to: 'webcomponents'
                }
            ])
        ]
    }
}