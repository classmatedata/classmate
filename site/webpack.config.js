// no need to install, it is built in node
import { path } from 'path'

//those are instructions for webpack
//  (letting it know how to "pack" our files into one bundle)
module.exports = {
    mode: 'development',
    entry: './www/js/index.js',
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: 'bundle.js'
    },
    watch: true
}