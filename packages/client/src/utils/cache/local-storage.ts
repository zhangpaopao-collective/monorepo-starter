/** 统一处理 localStorage */

import type { SidebarClosed, SidebarOpened } from '@client/constants/app-key'
import type { ThemeName } from '@client/hooks/useTheme'
import CacheKey from '@client/constants/cache-key'

// #region 侧边栏状态
export function getSidebarStatus() {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS)
}
export function setSidebarStatus(sidebarStatus: SidebarOpened | SidebarClosed) {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus)
}
// #endregion

// #region 正在应用的主题名称
export function getActiveThemeName() {
  return localStorage.getItem(CacheKey.ACTIVE_THEME_NAME) as ThemeName | null
}
export function setActiveThemeName(themeName: ThemeName) {
  localStorage.setItem(CacheKey.ACTIVE_THEME_NAME, themeName)
}
// #endregion
