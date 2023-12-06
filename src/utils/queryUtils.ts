export const stringifyParams = (params: any): string => {
  return Object.keys(params)
    .map((key) => {
      if (params[key] === undefined) {
        return null
      }
      return `${key}=${params[key]}`
    })
    .filter((param) => param !== null)
    .join('&')
}
