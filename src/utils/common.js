export const getLocalStorageItem = key => {
  const result = localStorage.getItem(key)

  if (!result) {
    return []
  }

  return JSON.parse(result)
}

export const setLocalStorageItem = (key, value) => {
  localStorage.removeItem(key)
  localStorage.setItem(key, value)
}

export const itemInList = (item, list) => {
  let _inList = false

  for (let i = 0; i < list.length; i++) {
    if (item.id === list[i].id) {
      _inList = true
      break
    } else continue
  }

  return _inList
}
