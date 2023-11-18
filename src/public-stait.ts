import type { ActionsDecl, ContextDecl, Flatten } from './utils'

export type PublicStaitFromTypestait<
  T extends {
    type: string
    context?: ContextDecl
    actions?: ActionsDecl<T>
    service?: T['type']
  },
  Types extends T['type'],
> = {
  [Type in Types]: Extract<T, { type: Type }> extends infer Stait
    ? Stait extends { type: Type }
      ? Flatten<
          {
            type: Stait['type']
          } & (Stait extends {
            context: ContextDecl
          }
            ? {
                context: Stait['context']
              }
            : unknown) &
            (Stait extends {
              actions: ActionsDecl<T>
            }
              ? {
                  actions: {
                    // cleanup + dedupe targets
                    [A in keyof Stait['actions']]: PublicActionFromTypestait<
                      T,
                      Type,
                      // @ts-expect-error: TODO: should we ignore this?
                      A
                    >
                  }
                }
              : unknown)
        >
      : never
    : never
}[Types]

export type PublicActionFromTypestait<
  T extends {
    type: string
    context?: ContextDecl
    actions?: ActionsDecl<T>
    service?: T['type']
  },
  Type extends T['type'],
  ActionName extends keyof Extract<T, { type: Type }>['actions'],
> = Extract<T, { type: Type }> extends {
  type: Type
  actions: {
    [Key in ActionName]: (payload: infer ActionPayload) => unknown
  }
}
  ? unknown extends ActionPayload
    ? () => void
    : (payload: ActionPayload) => void
  : never
