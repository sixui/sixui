import { resolve } from 'path';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
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
      formats: ['es'],
      entry: {
        main: resolve(__dirname, 'src/main.ts'),
      },
      name: 'SixUI',
      fileName: 'sixui',
    },
    rollupOptions: {
      // Should replicate peerDependencies
      external: ['react', 'react-dom'],
      output: {
        dir: 'dist',
        assetFileNames: 'sixui.[ext]',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: true,
  },
});
