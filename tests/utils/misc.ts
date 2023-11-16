// Source: @type-challenges/utils
// https://github.com/type-challenges/type-challenges/blob/e0bb3fd63ed8c8164b9f2cbfd2b8466d09870d04/utils/index.d.ts#L7-L9
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? true
  : false
