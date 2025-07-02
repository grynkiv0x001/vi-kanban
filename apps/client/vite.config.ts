import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import * as path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ jsxImportSource: '@emotion/react' }), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      'shared': path.resolve(__dirname, '../../packages/shared'),
    },
  },
});
