// NOTE: there is no completion for string literals in type arguments :(
// https://github.com/microsoft/TypeScript/issues/52898
// https://github.com/microsoft/TypeScript/issues/54464

import type { ActualStaitFromTypestait } from './actual-stait'
import type { ActionsDecl, ContextDecl, Flatten, MaybePromise } from './utils'

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
                    [A in keyof Stait['actions']]: (
                      ...args: Parameters<Stait['actions'][A]>
                    ) => ReturnType<Stait['actions'][A]>
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

export type ServiceForTypestait<
  T extends {
    type: string
    context?: ContextDecl
    actions?: ActionsDecl<T>
    service?: T['type']
  },
  // TODO: limit Types only to staits that have service
  Type extends T['type'],
> = Extract<T, { type: Type }> extends {
  type: Type
  context?: infer Context
  service: infer ServiceTarget
}
  ? unknown extends Context
    ? () => MaybePromise<
        ActualStaitFromTypestait<
          T,
          // @ts-expect-error: TODO: should we ignore this?
          ServiceTarget
        >
      >
    : (context: Context) => MaybePromise<
        ActualStaitFromTypestait<
          T,
          // @ts-expect-error: TODO: should we ignore this?
          ServiceTarget
        >
      >
  : never

export type ActionForTypestait<
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
  context?: infer Context
  actions: {
    [Key in ActionName]: (payload: infer ActionPayload) => infer ActionTarget
  }
}
  ? unknown extends Context
    ? unknown extends ActionPayload
      ? () => ActualStaitFromTypestait<
          T,
          // @ts-expect-error: TODO: should we ignore this?
          ActionTarget
        >
      : (opts: { payload: ActionPayload }) => ActualStaitFromTypestait<
          T,
          // @ts-expect-error: TODO: should we ignore this?
          ActionTarget
        >
    : unknown extends ActionPayload
      ? (opts: { ctx: Context }) => ActualStaitFromTypestait<
          T,
          // @ts-expect-error: TODO: should we ignore this?
          ActionTarget
        >
      : (opts: {
          ctx: Context
          payload: ActionPayload
        }) => ActualStaitFromTypestait<
          T,
          // @ts-expect-error: TODO: should we ignore this?
          ActionTarget
        >
  : never
