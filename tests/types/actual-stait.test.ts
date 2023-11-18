import { runTypesTests } from '../utils'

import type { ActualStaitFromTypestait, Typestait } from '../../src'

runTypesTests(import.meta.url)

type ExpectType_actual_stait = ActualStaitFromTypestait<
  Typestait<
    | {
        type: 'stait1'
        context: {
          data1: string
          data2: 123
        }
        actions: {
          action1: (payload: number) => 'stait1' | 'stait2'
        }
      }
    | {
        type: 'stait2'
        context: {
          data3: string
          data4: 123
        }
        service: 'stait1' | 'stait2'
      }
  >,
  'stait1'
>

type ExpectType_multiple_types = ActualStaitFromTypestait<
  Typestait<
    | {
        type: 'stait1'
      }
    | {
        type: 'stait2'
      }
    | {
        type: 'stait3'
      }
  >,
  'stait1' | 'stait2'
>
