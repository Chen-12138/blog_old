import {get, post} from './http'

/**
 * @method 管理员登录接口
 * @param  user 用户名
 * @param  pass 密码
 */
export const Login = (params) => post('/user/adminUserCheck', params)

/**
 * @method 退出管理员登录接口
 */
export const Exit = () => get('/user/adminExit', {})

/**
 * @method  检查管理员是否登录
 */
export const checkLogin = () => get('/user/adminIslogined', {})