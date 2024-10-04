import { resolve } from 'path';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import styleX from 'vite-plugin-stylex';

// https://vitejs.dev/config/

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    styleX(),
    dts({
      tsconfigPath: 'tsconfig.app.build.json',
    }),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SixUI',
      fileName: 'sixui',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    cssCodeSplit: true,
  },
});
