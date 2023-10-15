/**
 * Created by Muhammad Iqbal Tawaqal in process of recruitment to JDS (Jabar Digital Service) as Frontend Engineer
 * iqbal.tawakal@outlook.com
 * +62 812-8341-6965
 */
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'

loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')
