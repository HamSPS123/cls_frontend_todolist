// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura  from '@primevue/themes/aura';
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ["@primevue/nuxt-module", "@nuxtjs/tailwindcss", '@pinia/nuxt'],
  primevue: {
    options: {
        theme: {
            preset: Aura,
        },
        ripple: true,
    },
    autoImport: true,
},
pinia: {
    storesDirs: ['./stores/**']
}
});