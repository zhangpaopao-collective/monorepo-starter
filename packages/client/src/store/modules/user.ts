import type { LoginRequestData } from '@client/api/login/types/login'
import { getUserInfoApi, loginApi } from '@client/api/login'
import { resetRouter } from '@client/router'
import { pinia } from '@client/store'
import { getToken, removeToken, setToken } from '@client/utils/cache/cookies'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(getToken() || '')
  const roles = ref<string[]>([])
  const username = ref<string>('')

  /** 登录 */
  const login = async ({ username, password, code }: LoginRequestData) => {
    const { data } = await loginApi({ username, password, code })
    setToken(data.token)
    token.value = data.token
  }
  /** 获取用户详情 */
  const getInfo = async () => {
    const { data } = await getUserInfoApi()
    username.value = data.username
    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
  }
  /** 模拟角色变化 */
  const changeRoles = async (role: string) => {
    const newToken = `token-${role}`
    token.value = newToken
    setToken(newToken)
    // 用刷新页面代替重新登录
    window.location.reload()
  }

  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {}

  /** 登出 */
  const logout = () => {
    removeToken()
    token.value = ''
    roles.value = []
    resetRouter()
    _resetTagsView()
  }
  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    token.value = ''
    roles.value = []
  }

  return { token, roles, username, login, getInfo, changeRoles, logout, resetToken }
})

/**
 * 在 SPA 应用中可用于在 pinia 实例被激活前使用 store
 * 在 SSR 应用中可用于在 setup 外使用 store
 */
export function useUserStoreHook() {
  return useUserStore(pinia)
}
