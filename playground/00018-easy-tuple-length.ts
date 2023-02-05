// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>,
]

// ============= Your Code Here =============
// Maybe I can do the opposite of "First of Array" and add 1??
// No...
// https://stackoverflow.com/a/66235430 Use indexed access type and `length` property?
// `tesla` and `spaceX` are readonly types, won't work with `any[]`
// type Length<T extends any[]> = T['length']

// This doesn't satisfy the error cases
// type Length<T> = T['length']

// This solves the first error but not the second (strings have a length property)
// type Length<T extends { length: number }> = T['length']

type Length<T extends readonly any[]> = T['length']

