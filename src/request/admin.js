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

/**
 * @method 获取文章数据
 * @param  page
 */
export const getNote = (page) => get(`/page/getnotePage?page=${page}`, {})

/**
 * @method  发表文章
 * @param   一个对象
 */
export const articlePublish = (params) => post('/note/articlePublish', params)

/**
 * @method 更新文章
 * @param 一个对象 
 */
export const articleUpdate = (params) => post('/note/editorArticle', params)

/**
 * @method 获取文章详情
 * @param  id
 */
export const getDetail = (id) => get(`/note/getArticleInfo/${id}`, {})