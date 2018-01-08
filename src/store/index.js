import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

//使用vuex
Vue.use(Vuex)

//导入vuex.store实例化对象
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})