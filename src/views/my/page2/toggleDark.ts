import { useDark, useToggle } from '@vueuse/core'

export const isDark = useDark({
  // selector: "body", // 默认值："html"
  // attribute: "color-scheme", // 默认值："class"
  // storageKey: "isDark", // 存储到localStorage/sessionStorage中的Key名
  // valueDark: "dark", // 暗黑class名字
  // valueLight: "light", // 高亮class名字
})

export const toggleDark = useToggle(isDark)
;``
