import { ref, onMounted } from 'vue'

/**
 * Composable для управления темной темой приложения.
 * Автоматически определяет системные предпочтения и сохраняет выбор пользователя.
 */
export function useTheme() {
  const isDark = ref(false)

  /**
   * Инициализация темы на основе системных предпочтений
   */
  const initTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (prefersDark) {
      isDark.value = true
      applyTheme(true)
    }
  }

  /**
   * Применяет тему к документу
   */
  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  /**
   * Переключает тему
   */
  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme(isDark.value)
  }

  onMounted(() => {
    initTheme()
  })

  return {
    isDark,
    toggleTheme
  }
}
