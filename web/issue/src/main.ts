import { createApp } from 'vue'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import { defaultRepoKey } from './const/keys'

init()

async function init() {
  const app = createApp(App)

  const key = await getDefaultRepository()
  window.console.log('repo-key', key)
  sessionStorage.setItem(defaultRepoKey, key)

  app.mount('#app')
}
