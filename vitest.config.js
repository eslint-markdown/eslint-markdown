import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      exclude: [
        '**/build/**',
        '**/tests/**',
        // These files are copied and pasted, so we exclude them from coverage.
        'packages/eslint-lumir/src/plugins/**/*.ts',
      ],
    },
    projects: ['packages/*'],
  },
});
