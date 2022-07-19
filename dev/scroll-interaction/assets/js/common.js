const $ = (selector) => {
  const all = document.querySelectorAll(selector)
  return all.length > 1 ? all : all[0] ?? null
}

export {
  $
}
