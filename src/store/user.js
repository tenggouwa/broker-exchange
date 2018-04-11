import Vue from 'vue'

export const USER_SYMBOL = 'USER_SYMBOL' //symbol指标

export default {
  state: sessionStorage.getItem('symbol')|| {},
  mutations: {
    [USER_SYMBOL](state, user) {
      sessionStorage.setItem('symbol', JSON.stringify(user))
      Object.assign(state, user)
    }
  },
  actions: {
    [USER_SYMBOL]({commit}, user) {
      commit(USER_SIGNIN, user)
    }
  }
}