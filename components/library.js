export const isString = (value) => Object.prototype.toString.call(value) === "[object String]"

export const typeMatch = (item, types) => {
  types = Array.isArray(types) ? types : [types]

  return item && item.type && types.filter(type => type.prototype && item.type.prototype == type.prototype).length
}

export const matchChild = (children, types, single = false) => children.reduce((acc, child) => {
  (typeMatch(child, types)) ? (single ? acc.match = child : acc.match.push(child)) : acc.children.push(child)
  return acc;
}, {match: single ? null : [], children: []})

export default {
  isString,
  typeMatch,
  matchChild
}
