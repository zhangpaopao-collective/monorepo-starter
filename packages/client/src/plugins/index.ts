import type { App } from 'vue'
import { loadTdesignVueNext } from './tdesign-vue-next'

export function loadPlugins(app: App) {
  loadTdesignVueNext(app)
}
