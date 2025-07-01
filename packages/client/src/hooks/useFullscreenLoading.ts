import type { LoadingInstance, LoadingPlugin, type LoadingProps } from 'tdesign-vue-next'

const defaultOptions = {
  preventScrollThrough: true,
  text: '加载中...',
}

interface UseFullscreenLoading {
  <T extends (...args: Parameters<T>) => ReturnType<T>>(
    fn: T,
    options?: LoadingProps
  ): (...args: Parameters<T>) => Promise<ReturnType<T>>
}

/**
 * 传入一个函数 fn，在它执行周期内，加上「全屏」loading
 * @param fn 要执行的函数
 * @param options LoadingOptions
 * @returns 返回一个新的函数，该函数返回一个 Promise
 */
export const useFullscreenLoading: UseFullscreenLoading = (fn, options = {}) => {
  let loadingInstance: LoadingInstance
  return async (...args) => {
    try {
      loadingInstance = LoadingPlugin({ ...defaultOptions, ...options })
      return await fn(...args)
    }
    finally {
      loadingInstance?.hide()
    }
  }
}
