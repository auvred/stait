import { runTypesTests } from '../../utils'

import type { ActionForTypestait } from '../../../src'
import type { Equal } from '../../utils'

runTypesTests(import.meta.url)

type ExpectType_simple_recursive_action_depth_1 = ActionForTypestait<
  {
    type: 'stait1'
    actions: {
      action1: () => 'stait1'
    }
  },
  'stait1',
  'action1'
>

type ExpectType_simple_recursive_action_depth_2 =
  ReturnType<ExpectType_simple_recursive_action_depth_1>['actions']['action1']

type ExpectType_simple_recursive_action_depth_2_equals_depth_1 = Equal<
  ExpectType_simple_recursive_action_depth_1,
  ExpectType_simple_recursive_action_depth_2
>

type ExpectError_action_for_non_existent_stait = ActionForTypestait<
  {
    type: 'stait1'
    actions: {
      action1: () => 'stait1'
    }
  },
  'stait2',
  'action1'
>

type ExpectError_non_existent_action = ActionForTypestait<
  {
    type: 'stait1'
    actions: {
      action1: () => 'stait1'
    }
  },
  'stait1',
  'action2'
>

type ExpectType_without_context_and_without_payload = ActionForTypestait<
  {
    type: 'stait1'
    actions: {
      action1: () => 'stait1'
    }
  },
  'stait1',
  'action1'
>
type ExpectType_args_without_context_and_without_payload = Equal<
  Parameters<ExpectType_without_context_and_without_payload>,
  []
>

type ExpectType_with_context_and_without_payload = ActionForTypestait<
  {
    type: 'stait1'
    context: {
      data1: string
      data2: 123
    }
    actions: {
      action1: () => 'stait1'
    }
  },
  'stait1',
  'action1'
>
type ExpectType_args_with_context_and_without_payload = Equal<
  Parameters<ExpectType_with_context_and_without_payload>,
  [
    {
      ctx: {
        data1: string
        data2: 123
      }
    },
  ]
>

type ExpectType_without_context_and_with_payload = ActionForTypestait<
  {
    type: 'stait1'
    actions: {
      action1: (payload: { data1: string; data2: 123 }) => 'stait1'
    }
  },
  'stait1',
  'action1'
>
type ExpectType_args_without_context_and_with_payload = Equal<
  Parameters<ExpectType_without_context_and_with_payload>,
  [
    {
      payload: {
        data1: string
        data2: 123
      }
    },
  ]
>

type ExpectType_with_context_and_with_payload = ActionForTypestait<
  {
    type: 'stait1'
    context: {
      data1: string
      data2: 123
    }
    actions: {
      action1: (payload: { data1: string; data2: 123 }) => 'stait1'
    }
  },
  'stait1',
  'action1'
>
type ExpectType_args_with_context_and_with_payload = Equal<
  Parameters<ExpectType_with_context_and_with_payload>,
  [
    {
      ctx: {
        data1: string
        data2: 123
      }
      payload: {
        data1: string
        data2: 123
      }
    },
  ]
>
