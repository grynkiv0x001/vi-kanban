import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },

  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@': path.resolve(__dirname, './src/'),
    },
  },
});
