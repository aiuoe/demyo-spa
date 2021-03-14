import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		me_id: 0,
		friend_id: 0
  },
  getters: {
    me_id: state => 
    {
      return state.me_id
    }
  },
  mutations: {
  	meSet(state, value)
  	{
  		state.me_id = value
  	},
  	friendSet(state, value)
  	{
  		state.friend_id = value
  	}
  },
  actions: {
  	async meSet({commit}, value)
  	{
			commit('meSet', value)  		
  	},
   	async friendSet({commit}, value)
  	{
			commit('friendSet', value)  		
  	}
  },
  modules: {
  }
})
