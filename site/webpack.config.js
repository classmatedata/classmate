import { resolve } from 'path'
export const mode = 'development'
export const entry = './src/index.js'
export const output = {
    path: resolve(__dirname, 'www'),
    filename: 'bundle.js'
}
export const watch = true