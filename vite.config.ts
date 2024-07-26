import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import styleX from 'vite-plugin-stylex';

// https://vitejs.dev/config/

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '~',
        // eslint-disable-next-line no-undef
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [react(), styleX()],
});
