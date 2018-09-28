export const isString = (value) => Object.prototype.toString.call(value) === "[object String]"

export const typeMatch = (item, types) => {
  types = Array.isArray(types) ? types : [types]

  return item && item.type && types.filter(type => type.prototype && item.type.prototype == type.prototype).length
}

export const matchChild = (children, types, single = false) => children.reduce((acc, child) => {
  (typeMatch(child, types)) ? (single ? acc.match = child : acc.match.push(child)) : acc.children.push(child)
  return acc;
}, {match: single ? null : [], children: []})

// export const classBuilder = (classBuilder = null) => {
//   classBuilder = classBuilder ? Array.isArray(classBuilder) ? classBuilder : [classBuilder] : []
//
//   return {
//     append: (value, test = true) => test && value && classBuilder.push(value),
//     value: () => classBuilder.join(' ')
//   }
// }
export const builder = (builder = null) => {
  builder = builder ? Array.isArray(builder) ? builder : [builder] : []

  const fluent = {
    kvp: (key, value, test = true) => {
      test && key && value && (builder[key] = value)
      return fluent
    },
    append: (value, test = true) => {
      test && value && builder.push(value)
      return fluent
    },
    ssv: () => builder.join(' '),
    object: () => ({...builder})
  }

  return fluent
}


export default {
  isString,
  typeMatch,
  matchChild,
  builder
}
