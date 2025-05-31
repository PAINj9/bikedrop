import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
 //base: '/bikedrop/', 
 //TENGO QUE SACAR ESAS BARRAS DE ARRIBA PARA DEPLOYEAR, Y DEJARLAS PARA PROGRAMAR EN LOCALHOST
})
