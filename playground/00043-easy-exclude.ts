// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]

// ============= Your Code Here =============
// Stumbled on the source to this solution before attempting anything
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types
// If T is a Union type, this expression is sort of like doing an Array map, but over each member of T's Union.
// If T = 'a' | 'b' | 'c' this expression is effectively:
// ('a' extends U ? never : 'a') | ('b' extends U ? never : 'b') : ('c' extends U ? never : 'c')
type MyExclude<T, U> = T extends U ? never : T
