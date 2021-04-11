import Vue from 'vue'
import Vuex from 'vuex'
import '@/modules/array'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		me_id: 0,
		friend_id: 0,
    conversations: new Array<any>(),
    messages: new Array<any>(),
    friends: new Array<any>(),
    friendRequests: new Array<any>()
  },
  getters: {
    me_id: state => 
    {
      return state.me_id
    },
    conversations: state => 
    {
      return state.conversations
    },
    messages: state =>
    {
      return state.messages
    },
    friends: state =>
    {
      return state.friends
    },
    friendRequests: state =>
    {
      return state.friendRequests
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
  	},
    conversationUpsert(state, value)
    {
      state.conversations = value
    },
    messageUpsert(state, value: any)
    {
      if (state.messages.length === 0 && Array.isArray(value))
        state.messages = value
      else
      {
        let count = state.messages.length
        // exists = !!state.messages.find((i: any) => i.id == value.id)

        // if (count && exists)
        // {
        //   let index: number = state.messages.findIndex((i: any) => i.id == value.id)
        //   state.messages.splice(index, 1, value)
        // }
        // if (exists == false && count && Array.isArray(value) === false)
 
        if (count && Array.isArray(value) === false)
          state.messages.upsert(value)
      }


    },
    friendUpsert(state, value)
    {
      state.friends = value
    },
    friendRequestUpsert(state, value)
    {
      state.friendRequests = value
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
  	},
    async conversationUpsert({commit}, value)
    {
      commit('conversationUpsert', value)
    },
    async messageUpsert({commit}, value)
    {
      commit('messageUpsert', value)
    },
    async friendUpsert({commit}, value)
    {
      commit('friendUpsert', value)
    },
    async friendRequestUpsert({commit}, value)
    {
      commit('friendRequestUpsert', value)
    }
  },
  modules: {
  }
})
