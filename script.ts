function getUrlParams(path: string, pattern: string) {
  const pathInArray = path.split('/');
  const patternInArray = pattern.split('/');
  const result: Record<string, string> = {};
  for(let i = 0; i < pathInArray.length; i++) {
    if(patternInArray[i][0] !== ':' && patternInArray[i] !== pathInArray[i]) {
      break;
    }
    if(patternInArray[i][0] === ':') {
      result[patternInArray[i].substring(1)] = pathInArray[i]
    }
  }
  return result;
}

const pattern = 'staticOne/:paramOne/staticTwo/staticThree/:paramTwo'
console.log('______________getUrlParams_____________')

// does not match the first static part: staticOne <> staticZero, returns {}
console.log(getUrlParams('staticZero/one', pattern))

// matched the first static and param part, returns {paramOne: 'one'}
console.log(getUrlParams('staticOne/one', pattern))

// matched the first static and param part with extra, returns {paramOne: 'one'}
console.log(getUrlParams('staticOne/one/staticThree/three', pattern))

// matched the first, second and third static + param parts
// returns {paramOne: 'one', paramTwo: 'two'}
console.log(getUrlParams('staticOne/one/staticTwo/staticThree/two', pattern))



type Data = {id: string, name?: string, count: number}

const before: Data = {id: '1', count: 0} 
const after: Data = {id: '1', name: 'khan', count: 1}

function objectDiff<T extends object>(source: T, target: T) {
  const uniqueKeys = [...new Set([
    ...Object.keys(source),
    ...Object.keys(target)
  ])]
  const result: Record<keyof T, {old?: T[keyof T], new?: T[keyof T]}> = {} as any;
  for(let i = 0; i < uniqueKeys.length; i++) {
    const key = uniqueKeys[i] as keyof T
    if(source[key] === target[key]) {
      continue;
    }
    result[key] = {
      old: source[key],
      new: target[key]
    }
  }
  return result;
}

// should read {name: {old: undefined, new: 'khan'}, count: {old: 0, new: 1}}
console.log('______________objectDiff_____________')
console.log(objectDiff(before, after))
