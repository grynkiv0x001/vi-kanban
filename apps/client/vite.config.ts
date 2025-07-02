import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
