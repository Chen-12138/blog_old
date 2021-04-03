const state = {
    // 是否登录
    loginStatus: false,
    // 保存用户信息
    user: null,
    // 歌曲播放状态
    playing: false,
    // 控制背景颜色
    backgroundColor: false,
    // 背景颜色
    bgColor: 'rgba(rgba(242, 242, 242, 0.6))',
    // 控制字体颜色
    fontColor: false,
    // 字体颜色
    Color: '#333',
    // 是否显示加载页面
    LoadingShow: false,
    // 加载页面文字
    LoadingTitle: '正在加载请稍后...',
    // 请求路径
    // 生产环境
    // 开发环境
    baseURL: 'http://localhost:3000'
}

export default state