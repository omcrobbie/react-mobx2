export function populateData<T>(cls: T, data: any) {
  for (let p in cls) {
    if (cls.hasOwnProperty(p) && !!data[camelToKebab(p)]) {
      cls[p] = data[camelToKebab(p)];
    }
  }
}
// export function kebabToCamel(prop: string) {
//     let parts = prop.split('-');
//     if (parts.length === 1) {
//         return prop;
//     }
//     return parts[0] +
//         parts.slice(1)
//             .map(part => part[0].toUpperCase() + part.slice(1))
//             .join('');
// }
export function camelToKebab(input: string) {
  return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function kebabToCamel(input: string) {
  if (input.indexOf('-') === -1) {
    return input;
  }
  return input.replace(/-([a-z])/g, function(g) {
    return g[1].toUpperCase();
  });
}
