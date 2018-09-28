export const typeMatch = (item, type) => item && item.type && type && type.prototype && item.type.prototype == type.prototype
export const isString = (value) => Object.prototype.toString.call(value) === "[object String]"

export default {
  typeMatch,
  isString
}
