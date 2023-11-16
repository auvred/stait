import { runTypesTests } from '../../utils'

import type { ServiceForTypestait } from '../../../src'
import type { Equal } from '../../utils'

runTypesTests(import.meta.url)

type ExpectType_recursive_service_depth_1 = ServiceForTypestait<
  {
    type: 'stait1'
    service: 'stait1'
  },
  'stait1'
>

type ExpectType_recursive_service_depth_2 = Awaited<
  ReturnType<ExpectType_recursive_service_depth_1>
>['service']

type ExpectType_recursive_service_depth_2_equals_depth_1 = Equal<
  ExpectType_recursive_service_depth_1,
  ExpectType_recursive_service_depth_2
>

type ExpectType_multiple_staits = ServiceForTypestait<
  | {
      type: 'stait1'
      service: 'stait2'
    }
  | {
      type: 'stait2'
      context: {
        data1: string
        data2: 123
      }
    },
  'stait1'
>

type ExpectError_service_for_non_existent_stait = ServiceForTypestait<
  {
    type: 'stait1'
    service: 'stait1'
  },
  'stait2'
>
