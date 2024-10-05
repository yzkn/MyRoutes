import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'js/app.js'),
            fileName: 'bundle',
            formats: ['es'],
        },
    },
});