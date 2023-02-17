// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]

// @ts-expect-error
type error = MyAwaited<number>

// ============= Your Code Here =============
/*
* My initial attempt:
* type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer U> ? U : never
* This covered case 1 and 2 and the error but missed the last 3 cases. It seemed ovbious I would
* have to try type recursion.
*
* type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer U> ? MyAwaited<U> : never
* This failed on MyAwaited<U> because U didn't satisfy "Promise<unknown>"
*
* This got me on the right track and I came to the below solution.
*
* If T doesn't match PromiseShape<unknown>, that is our error case - never
* If T does match, we infer the type given to the PromiseShape as U.
* We then need a subcondition to check if U also extends PromiseShape<unknown>.
* If not, U is the type we want.
* If so, we want to "unwrap" U with "MyAwaited", starting the process over.
*/
type PromiseShape<T> = { then: (onfulfilled: (arg: T) => any) => any }
type MyAwaited<T extends PromiseShape<unknown>> =
    T extends PromiseShape<infer U> ? (U extends PromiseShape<unknown> ? MyAwaited<U> : U) : never

