import {get, post} from './http'

/**
 * @method 管理员登录接口
 * @param  user 用户名
 * @param  pass 密码
 */
export const Login = (params) => post('/admin/adminUserCheck', params)

/**
 * @method 退出管理员登录接口
 */
export const Exit = () => post('/admin/adminExit', {})

/**
 * @method  检查管理员是否登录
 */
export const checkLogin = () => post('/admin/adminIsLogined', {})

/**
 * @method 获取文章数据
 * @param  page
 */
export const getNote = (page) => get(`/page/getnotePage?page=${page}`, {})

/**
 * @method  发表文章
 * @param   一个对象
 */
export const articlePublish = (params) => post('/article/articlePublish', params)

/**
 * @method 更新文章
 * @param 一个对象 
 */
export const articleUpdate = (params) => post('/article/articleUpdate', params)

/**
 * @method 获取文章详情
 * @param  id
 */
export const getDetail = (id) => get(`/article/getArticleByid?article_id=${id}`, {})

/**
 * @method 发表图片说说
 * @param  contents
 * @param  imgsrc
 */
export const sendPhoto = (params) => post('/photo/sendPhotos', params)

/**
 * @method 发表Demo
 * @param  一个对象
 */
export const sendDemo = (params) => post('/video/sendVideo', params)

/**
 * @method 获取用户列表
 * @param  无
 */
export const getUser = () => get('/admin/getUser', {})

/**
 * @method 删除用户
 * @param  username 用户名
 */
export const deleteUser = (username) => post('/admin/deleteUser', {username})

/**
 * @methos 删除文章
 * @param article_id
 */

export const deleteArticle = (article_id) => post('/article/deleteMessage', {article_id})