import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Simula el entorno del navegador en consola
    setupFiles: ['./vitest.setup.ts'], // Carga la inicialización del TestBed de Angular
  },
});