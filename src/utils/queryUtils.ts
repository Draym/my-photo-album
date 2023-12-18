export const stringifyQueryParams = (params: any): string => {
  const result = Object.keys(params)
    .map((key) => {
      if (params[key] === undefined) {
        return null
      }
      return `${key}=${params[key]}`
    })
    .filter((param) => param !== null)
  return result.length == 0 ? '' : '?' + result.join('&')
}
