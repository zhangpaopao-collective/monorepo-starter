import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const Layouts = () => import('@client/layouts/index.vue')

/**
 * 常驻路由
 * 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置 Name 属性
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layouts,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: ':path(.*)',
        component: () => import('@client/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/403',
    component: () => import('@client/views/error-page/403.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/404',
    component: () => import('@client/views/error-page/404.vue'),
    meta: {
      hidden: true,
    },
    alias: '/:pathMatch(.*)*',
  },
  {
    path: '/',
    component: Layouts,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@client/views/home/index.vue'),
        name: 'Home',
        meta: {
          title: '首页',
          svgIcon: 'home',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/unocss',
    component: Layouts,
    redirect: '/unocss/index',
    children: [
      {
        path: 'index',
        component: () => import('@client/views/unocss/index.vue'),
        name: 'UnoCSS',
        meta: {
          title: 'UnoCSS',
          svgIcon: 'unocss',
        },
      },
    ],
  },
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const dynamicRoutes: RouteRecordRaw[] = []

export const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  }
  catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}
