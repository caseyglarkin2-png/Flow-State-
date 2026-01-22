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
      'lib/__tests__/**/*.test.ts',
      'lib/__tests__/**/*.test.tsx',
      'lib/hooks/__tests__/**/*.test.ts',
      'lib/hooks/__tests__/**/*.test.tsx',
      'lib/a11y/__tests__/**/*.test.ts',
      'lib/a11y/__tests__/**/*.test.tsx',
      'lib/analytics/__tests__/**/*.test.ts',
      'lib/analytics/__tests__/**/*.test.tsx',
    ],
    exclude: ['node_modules', '.next', 'e2e', 'src/__tests__'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules', '.next', 'e2e', '**/*.d.ts'],
    },
  },
  resolve: {
    alias: [
      // Specific paths that exist in src/lib
      { find: '@/lib/hcaptcha', replacement: path.resolve(__dirname, './src/lib/hcaptcha') },
      { find: '@/lib/rateLimit', replacement: path.resolve(__dirname, './src/lib/rateLimit') },
      { find: '@/lib/email', replacement: path.resolve(__dirname, './src/lib/email') },
      { find: '@/lib/webhooks', replacement: path.resolve(__dirname, './src/lib/webhooks') },
      { find: '@/lib/api', replacement: path.resolve(__dirname, './src/lib/api') },
      { find: '@/lib/utm', replacement: path.resolve(__dirname, './lib/utm') },
      // Default lib path (root lib folder)
      { find: '@/lib', replacement: path.resolve(__dirname, './lib') },
      { find: '@/components', replacement: path.resolve(__dirname, './components') },
      { find: '@', replacement: path.resolve(__dirname, './') },
    ],
  },
});
