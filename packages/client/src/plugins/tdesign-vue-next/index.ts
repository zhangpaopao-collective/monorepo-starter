import type { App } from 'vue'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'

export function loadTdesignVueNext(app: App) {
  app.use(TDesign)
}
