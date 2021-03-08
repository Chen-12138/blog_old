/**
 * 统一出口
 */
import * as getApi from './api'
import * as adminApi from './admin'
export default {
    ...getApi,
    ...adminApi
}