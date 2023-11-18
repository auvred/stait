import { runTypesTests } from '../../utils'

import type { Typestait } from '../../../src'
import type { Equal } from '../../utils'

runTypesTests(import.meta.url)

type ExpectType_single_bare_stait = Typestait<{
  type: 'state1'
}>

type ExpectType_two_bare_staits = Typestait<
  | {
      type: 'state1'
    }
  | {
      type: 'state2'
    }
>

type ExpectType_with_context = Typestait<{
  type: 'stait1'
  context: {
    data1: string
    data2: Partial<
      Omit<
        {
          complexData: true
          reallyComplex: false
        },
        'reallyComplex'
      >
    >
  }
}>

type ExpectType_extra_property = Typestait<{
  type: 'state1'
  extraProperty: string
}>

type ExpectType_extra_properties_and_context = Typestait<
  | {
      type: 'state1'
      extraProperty1: string
    }
  | {
      type: 'state1'
      context: {
        someData: string
      }
      extraProperty2: string
    }
>

type ExpectType_cyclic_action = Typestait<{
  type: 'stait1'
  actions: {
    action: () => 'stait1'
  }
}>

type ExpectType_multiple_actions = Typestait<
  | {
      type: 'stait1'
      actions: {
        action1: () => 'stait2'
        action2: () => 'stait3'
      }
    }
  | {
      type: 'stait2'
      actions: {
        action1: () => 'stait1'
        action2: () => 'stait2'
      }
    }
  | {
      type: 'stait3'
    }
>

type ExpectType_empty_actions = Typestait<
  | {
      type: 'stait1'
      actions: {} // eslint-disable-line @typescript-eslint/ban-types
    }
  | {
      type: 'stait2'
    }
>

type ExpectType_actions_targeting_multiple_staits = Typestait<
  | {
      type: 'stait1'
      actions: {
        action1: () => 'stait1' | 'stait2'
        action2: () => 'stait2'
      }
    }
  | {
      type: 'stait2'
      actions: {
        action1: () => 'stait2' | 'stait1'
      }
    }
>

type ExpectType_dedupe_action_targets = Typestait<
  | {
      type: 'stait1'
      actions: {
        action1: () => 'stait1' | 'stait2' | 'stait2'
        action2: () => 'stait1' | 'stait1' | 'stait1'
      }
    }
  | {
      type: 'stait2'
    }
>

type ExpectError_action_targeting_non_existent_stait = Typestait<{
  type: 'state1'
  actions: {
    action: () => 'state2'
  }
}>

type ExpectError_action_targeting_non_existent_stait_2 = Typestait<{
  type: 'state1'
  actions: {
    action1: () => 'state2'
    action2: () => 'state1'
  }
}>

type ExpectError_action_targeting_non_existent_stait_with_multiple_staits =
  Typestait<
    | {
        type: 'state1'
        actions: {
          action: () => 'state4'
        }
      }
    | {
        type: 'state2'
        actions: {
          action: () => 'state3'
        }
      }
  >

type ExpectType_action_with_payload = Typestait<{
  type: 'stait1'
  actions: {
    action1: (payload: { data1: string; data2: 123 }) => 'stait1'
  }
}>
type ExpectType_should_preserve_action_payload = Equal<
  ExpectType_action_with_payload['actions']['action1'],
  (payload: { data1: string; data2: 123 }) => 'stait1'
>

type ExpectError_action_with_extra_args = Typestait<{
  type: 'stait1'
  actions: {
    action1: (payload1: 'payload1', payload2: 'payload2') => 'stait1'
  }
}>

type ExpectType_with_service = Typestait<{
  type: 'stait1'
  service: 'stait1'
}>

type ExpectType_with_services = Typestait<
  | {
      type: 'stait1'
      service: 'stait2'
    }
  | {
      type: 'stait2'
      service: 'stait1' | 'stait2'
    }
>

type ExpectError_service_targeting_non_existent_stait = Typestait<{
  type: 'stait1'
  service: 'stait2'
}>
