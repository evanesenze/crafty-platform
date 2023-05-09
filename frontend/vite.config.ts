import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: true,
        port: 3000,
    },
    build: {
        outDir: 'build',
    },
    plugins: [react()],
    resolve: {
        alias: {
            components: '/src/components',
            pages: '/src/pages',
            widgets: '/src/widgets'
        }
    }
});
