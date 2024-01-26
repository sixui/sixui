import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import styleX from 'vite-plugin-stylex';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        // eslint-disable-next-line no-undef
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [
    react(),
    svgr({
      include: '**/*.svg',
    }),
    styleX(),
  ],
});
