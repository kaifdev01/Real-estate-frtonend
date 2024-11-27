import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';

export default {
  server: {
    host: ['192.168.100.105', "localhost"], // Bind to all available network interfaces
    port: 5173,      // Optional: Customize the port if needed
  },
  plugins: [react()],
};

