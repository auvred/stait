export type ContextDecl = Record<string, unknown>

export type ActionsDecl<_Typestait extends { type: string }> = Record<
  string,
  // `any` looks cleaner in user-facing errors
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (payload?: any) => _Typestait['type']
>

export type Flatten<T> = [T] extends [infer TT]
  ? {
      [K in keyof TT]: TT[K]
    }
  : never
