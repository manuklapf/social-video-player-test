import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import vue from '@vitejs/plugin-vue'

const path = require('path')

module.exports = {
    outDir: 'dist',
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/main.ts'),
            name: 'SocialVideoPlayer'
        },
        rollupOptions: {
            plugins: [dynamicImportVars()],
            external: ['vue', 'axios'],
            output: [
                {
                    format: 'umd',
                    globals: {
                        vue: 'Vue',
                        axios: 'Axios'
                    }
                }
            ]
        }
    }
}
