export const setLocalStorage = (key: string, data: any): void => {
  localStorage.setItem(key, data)
}

export const getFromLocalStorage = (key: string): string | null => {
  const item = localStorage.getItem(key)
  return item ?? null
}

export const getTokenFromStorage = (): string | null => {
  const payload = getFromLocalStorage('auth')
  if (!payload) {
    return null
  }
  const parsed = JSON.parse(payload ?? '')
  const { accessToken } = parsed

  return accessToken
}

export const removeLocalStorage = (key: string): void => {
  localStorage.removeItem(key)
}
