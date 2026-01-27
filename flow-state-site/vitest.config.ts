import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: [
      'src/lib/**/__tests__/**/*.test.ts',
      'src/lib/**/__tests__/**/*.test.tsx',
      'components/**/__tests__/**/*.test.ts',
      'components/**/__tests__/**/*.test.tsx',
      'lib/hooks/__tests__/**/*.test.ts',
      'lib/hooks/__tests__/**/*.test.tsx',
      'lib/a11y/__tests__/**/*.test.ts',
      'lib/a11y/__tests__/**/*.test.tsx',
      'lib/analytics/__tests__/**/*.test.ts',
      'lib/analytics/__tests__/**/*.test.tsx',
      'lib/content/__tests__/**/*.test.ts',
      'lib/content/__tests__/**/*.test.tsx',
      'config/__tests__/**/*.test.ts',
      'config/__tests__/**/*.test.tsx',
    ],
    exclude: ['node_modules', '.next', 'e2e', 'src/__tests__', 'src/lib/api/__tests__'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules', '.next', 'e2e', '**/*.d.ts'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@/lib': path.resolve(__dirname, './lib'),
      '@/components': path.resolve(__dirname, './components'),
      '@/config': path.resolve(__dirname, './config'),
    },
  },
});
