import { get, post } from './http'

/**
 * @method 登录及注册接口
 * @param  user 用户名
 * @param  password 密码
 * @param  code 验证码
 * @param  emial 邮箱
 */ 
export const Login = (params) => post('/user/login', params)

/**
 * @method 发送邮箱接口
 * @param  email
 */
export const sendEmail = (email) => post('/user/emailInfo', email)

/**
 * @method 获取个人信息
 * @param  username
 */
export const getInfo = (username) => post('/user/getuserInfo', {token: username})

/**
 * @method 获取个人信息
 * @param  username
 */
export const updateInfo = (params) => post('/user/primaryInfo', params)

/**
 * @method 获取文章
 * @param  page
 */ 
export const getArticle = (page) => get(`/page/getnotePage?page=${page}`, {})

/** 
 * @method 获取分类
 * @param  无
*/
export const getCategory = () => get('/note/getcategroys', {})

/**
 * @method 获取标签
 * @param  无
 */
export const getLable = () => get('/note/getlables', {})

/**
 * @method 获取最近发表的文章
 * @param  无
 */
export const getTimenoteList = () => get('/note/gettimenoteList', {})

/**
 * @method 搜索获取最近发表的文章
 * @param  value
 */
export const getSearch = (value) => post('/note/like_article_search/', {value})


/**
 * @method 根据标签获取文章
 * @param  lable
 */
export const getLableInfo = (lable) => post('/note/getlableInfo', {lable})

/**
 * @method 根据分类获取文章
 * @param  catogroy
 */
export const getCategorynIfo = (categroy) => post('/note/getManycategroys', {categroy})

/**
 * @method 点赞
 * @param  lable
 */
export const getLike = (params) => post('/note/getManycategroys', params)

/**
 * @method 获取图片
 * @param  lable
 */
export const getPhotos = () => get('/upload/gettalk', {})

/**
 * @method 获取评论
 * @param  
 */
export const getComment = (page) => get(`/page/pageSize?page=${page}`)

/**
 * @method 留言
 * @param  publishURL 请求路径
 * @param  params 参数对象
 */
export const publish = (publishURL,params) => post(publishURL, params)

/**
 * @method 回复留言
 * @param  replyURL 请求路径
 * @param  params 参数对象
 */
export const reply = (replyURL,params) => post(replyURL, params)

/**
 * @method 获取文章详情
 * @param  id
 */
export const getDetail = (id) => get(`/note/bynotetext/${id}`, {})