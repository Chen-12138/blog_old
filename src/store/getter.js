import state from './state'

// 登录状态
export const loginStatus = state => {
    return (
        state.loginStatus || JSON.parse(window.localStorage.getItem('loginStatus'))
    )
}

// 用户信息
export const user = state => {
    return state.user || JSON.parse(window.localStorage.getItem('user'))
}

// 播放状态
export const playing = state => {
    return state.playing
}