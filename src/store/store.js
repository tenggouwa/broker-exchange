import Vue from 'vue'
import Vuex from 'vuex'
import api from './fetch/api';
import * as types from './type.js';

Vue.use(Vuex)

let state = {
	tickersBTC:[],
  tickersUSDT:[],
  dialogBox:false,
};

const actions = {
	getMineTickerData({commit},param){
		api.mineTickerData(param).then(res=>{
			state.tickersBTC = res.data.BTC;
			state.tickersUSDT = res.data.USDT;
		})
	}
}
const mutations = {
  openDialog(state,bool){
    state.dialogBox = bool;
    // console.log(state.dialogBox,bool)
  },
}


export default new Vuex.Store({
	state,
  actions,
  mutations
})