import { router } from '@client/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })
router.beforeEach(async (_, _from, next) => {
  NProgress.start()
  // 权限控制
  next()
})

router.afterEach((_) => {
  NProgress.done()
})
