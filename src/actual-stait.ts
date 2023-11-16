import type { ActionForTypestait, ServiceForTypestait } from './typestait'
import type { ActionsDecl, ContextDecl, Flatten } from './utils'

export type ActualStaitFromTypestait<
  T extends {
    type: string
    context?: ContextDecl
    actions?: ActionsDecl<T>
    service?: T['type']
  },
  Types extends T['type'],
> = {
  [Type in T['type']]: Extract<T, { type: Type }> extends infer Stait
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
                    [A in keyof Stait['actions']]: ActionForTypestait<
                      T,
                      Type,
                      // @ts-expect-error: TODO: should we ignore this?
                      A
                    >
                  }
                }
              : Stait extends {
                    service: T['type']
                  }
                ? {
                    service: ServiceForTypestait<T, Stait['type']>
                  }
                : unknown)
        >
      : never
    : never
}[Types]
