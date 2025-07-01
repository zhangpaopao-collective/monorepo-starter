// core
import App from '@client/App.vue'
import { loadDirectives } from '@client/directives'
// load
import { loadPlugins } from '@client/plugins'
import { router } from '@client/router'
import { pinia } from '@client/store'
import { createApp } from 'vue'
import '@client/router/permission'
// css
import 'uno.css'
import 'normalize.css'
import '@client/styles/index.less'

const app = createApp(App)

/** 加载插件 */
loadPlugins(app)
/** 加载自定义指令 */
loadDirectives(app)

app.use(pinia).use(router)
router.isReady().then(() => {
  app.mount('#app')
})
