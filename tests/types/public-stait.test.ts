import { runTypesTests } from '../utils'

import type {
  PublicActionFromTypestait,
  PublicStaitFromTypestait,
  Typestait,
} from '../../src'
import type { Equal } from '../utils'

runTypesTests(import.meta.url)

type ExpectType_public_stait = PublicStaitFromTypestait<
  Typestait<{
    type: 'stait1'
    context: {
      data1: string
      data2: 123
    }
    actions: {
      action1: (payload: { data3: string; data4: '123' }) => 'stait1'
    }
  }>,
  'stait1'
>

type ExpectError_should_validate_requested_type = PublicStaitFromTypestait<
  Typestait<{
    type: 'stait1'
    context: {
      data1: string
      data2: 123
    }
    actions: {
      action1: (payload: { data3: string; data4: '123' }) => 'stait1'
    }
  }>,
  'stait3'
>

type ExpectType_should_hide_service = Equal<
  PublicStaitFromTypestait<
    Typestait<{
      type: 'stait1'
      context: {
        data1: string
        data2: 123
      }
      service: 'stait1'
    }>,
    'stait1'
  >,
  {
    type: 'stait1'
    context: {
      data1: string
      data2: 123
    }
  }
>

type ExpectType_index_accessed_action = PublicStaitFromTypestait<
  Typestait<{
    type: 'stait1'
    actions: {
      action1: (payload: { data1: string; data2: 123 }) => 'stait1'
    }
  }>,
  'stait1'
>['actions']['action1']
type ExpectType_public_action_from_typestait = PublicActionFromTypestait<
  Typestait<{
    type: 'stait1'
    actions: {
      action1: (payload: { data1: string; data2: 123 }) => 'stait1'
    }
  }>,
  'stait1',
  'action1'
>
type ExpectType_index_accessed_action_equals_public_action_from_typestait =
  Equal<
    ExpectType_index_accessed_action,
    ExpectType_public_action_from_typestait
  >

type ExpectError_public_action_from_typestait_should_validate_type =
  PublicActionFromTypestait<
    Typestait<{
      type: 'stait1'
      actions: {
        action1: () => 'stait1'
      }
    }>,
    'stait2',
    'action1'
  >

type ExpectError_public_action_from_typestait_should_validate_action_name =
  PublicActionFromTypestait<
    Typestait<{
      type: 'stait1'
      actions: {
        action1: () => 'stait1'
      }
    }>,
    'stait1',
    'action2'
  >

type ExpectType_action_without_payload = PublicActionFromTypestait<
  Typestait<{
    type: 'stait1'
    actions: {
      action1: () => 'stait1'
    }
  }>,
  'stait1',
  'action1'
>
type ExpectType_action_should_preserve_absence_of_payload = Equal<
  Parameters<ExpectType_action_without_payload>,
  []
>

type ExpectType_action_with_payload = PublicActionFromTypestait<
  Typestait<{
    type: 'stait1'
    actions: {
      action1: (payload: { data1: string; data2: 123 }) => 'stait1'
    }
  }>,
  'stait1',
  'action1'
>
type ExpectType_action_should_preserve_presence_of_payload = Equal<
  Parameters<ExpectType_action_with_payload>,
  [{ data1: string; data2: 123 }]
>
