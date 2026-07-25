import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the same build works from a repo subpath on both
// GitHub Pages (/Workouts/) and GitLab Pages (/workouts/).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { outDir: 'dist' },
});
