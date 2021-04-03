import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './action'
import state from './state'
import mutations from './mutation'
import * as getters from './getter'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations: {
    setPlaying(state, data) {
      state.playing = data;
    },
    isLogin(state, data) {
      state.loginStatus = data;
    },
    saveUser(state, data) {
      state.user = data;
    },
    updateBgColor(state, data) {
      state.backgroundColor = data;
      data ? state.bgColor = 'rgba(43, 44, 40,0.6)' : state.bgColor = 'rgba(242, 242, 242, 0.6)';
    },
    updatefont(state, data) {
      state.fontColor = data;
      data ? state.Color = '#fff': state.Color = '#333';
    },
    LoadingTitleChange(state, data) {
      state.LoadingTitle = data.title;
      state.LoadingShow = data.isShow;
    },
  },
  actions: {
  },
  modules: {
  }
})
