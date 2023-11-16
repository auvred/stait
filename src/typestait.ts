// NOTE: there is no completion for string literals in type arguments :(
// https://github.com/microsoft/TypeScript/issues/52898
// https://github.com/microsoft/TypeScript/issues/54464

import type { ActionsDecl, ContextDecl, Flatten } from './utils'

export type Typestait<
  T extends {
    type: string
    context?: ContextDecl
    actions?: ActionsDecl<T>
    service?: T['type']
  },
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
                    [A in keyof Stait['actions']]: () => ReturnType<
                      Stait['actions'][A]
                    >
                  }
                }
              : Stait extends {
                    service: T['type']
                  }
                ? {
                    service: Stait['service']
                  }
                : unknown)
        >
      : // TODO: place something meaningful here
        123
    : 456
}[T['type']]
