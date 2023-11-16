import { runTypesTests } from '../../utils'

import type { ActionForTypestait } from '../../../src'

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
