import { get, post } from './http'

/**
 * @method 登录及注册接口
 * @param  user 用户名
 * @param  password 密码
 * @param  code 验证码
 * @param  emial 邮箱
 */ 
export const userLogin = (params) => post('/users/login', params)

/**
 * @method 发送邮箱接口
 * @param  email
 */
export const sendEmail = (email) => post('/users/sendEmail', email)

/**
 * @method 获取个人信息
 * @param  username
 */
export const getInfo = (username) => post('/users/getuserInfo', {token: username})

/**
 * @method 更新个人信息
 * @param  username
 */
export const updateInfo = (params) => post('/users/editUser', params)

/**
 * @method 获取文章
 */ 
export const getArticle = (page, pageSize) => get(`/article/getArticle?page=${page}&pageSize=${pageSize}`, {})

/**
 * @method 获取文章数量
 * 
 */
export const getArticleCount = () => get('/article/getCount', {})

/** 
 * @method 获取分类
*/
export const getCategory = () => get('/article/getCategory', {})

/**
 * @method 获取标签
 */
export const getLabel = () => get('/article/getLable', {})

/**
 * @method 获取最近发表的文章
 */
export const getRecentArticle = () => get('/article/getRecentArticle', {})

/**
 * @method 搜索获取最近发表的文章
 */
export const getSearch = (keyword) => post('/article/articleSearch', {keyword})


/**
 * @method 根据标签获取文章
 */
export const getLabelInfo = (params) => post('/article/getArticleByLabel', params)

/**
 * @method 根据分类获取文章
 */
export const getCategorynIfo = (params) => post('/article/getArticleByCategory', params)

/**
 * @method 点赞
 */
export const getLike = (params) => post('/note/notelike', params)

/**
 * @method 获取图片
 * @param  page
 * @param  pageSize
 */
export const getPhotos = (page, pageSize) => get(`/photo/getPhoto?page=${page}&pageSize=${pageSize}`, {})

/**
 * @method 获取相册详情
 * @param  pic_id
 */
 export const getPhotoById = (pic_id) => post(`/photo/getPhotoById`, {pic_id})


/**
 * @method 获取评论
 */
export const getComment = (page, pageSize) => get(`/message/getMessage?page=${page}&pageSize=${pageSize}`, {})

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
export const getArticleInfo = (id) => get(`/note/bynotetext/${id}`, {})

/**
 * @method 获取文章留言
 * @param  article_id
 * @param  page
 * @param  pageSize
 */
 export const getArticleMessage = (params) => post(`/article/getMessageById`, params)


/**
 * @method 获取Demo
 */
export const getDemo = (page, pageSize) => get(`/video/getVideo?page=${page}&pageSize=${pageSize}`, {});

/**
 * @method 获取音乐
 */
export const getMusic = (id) => get(`/music/getMusic?id=${id}`, {});