// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
]

// @ts-expect-error
type error = If<null, 'a', 'b'>

// ============= Your Code Here =============
/*
* Not much to say about this one. Once I realized I could "extend true"
* just by trying it, the solution was straight-forward.
*/
type If<C extends boolean, T, F> = C extends true ? T : F
