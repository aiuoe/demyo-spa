import Vue from 'vue'
import Vuex from 'vuex'
import '@/modules/array'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		me_id: 0,
		conversation_id: 0,
		conversations: new Array<any>(),
		messages: new Array<any>(),
		friends: new Array<any>(),
		friendRequests: new Array<any>(),
		users: new Array<any>(),
		users_all: new Array<any>(),
		notifications: new Array<any>(),
		page: 1,
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
		friend: state => 
		{
			if (state.conversations.length)
			{
				if (state.conversation_id == 0)
					return state.conversations.filter(i => i.id == state.conversations[0].id)[0]
				else
					return state.conversations.filter(i => i.id == state.conversation_id)[0]
			}
		},
		messages: state =>
		{
			if (state.conversations.length)
			{
				if (state.conversation_id == 0)
					return state.messages.filter(i => i.conversation_id == state.conversations[0].id)
				else
					return state.messages.filter(i => i.conversation_id == state.conversation_id)
			}
		},
		friends: state =>
		{
			return state.friends
		},
		friendRequests: state =>
		{
			return state.friendRequests
		},
		users: state =>
		{
			return state.users_all
			.filter((u: any) => u.id != state.me_id)
		},
		users_all: state =>
		{
			return state.users_all
			.filter((u: any) => u.id != state.me_id)
		},
		user_every: state =>
		{
			return state.users_all
		}
	},
	mutations: {
		meSet(state, value)
		{
			state.me_id = value
		},
		pageSet(state, value)
		{
			state.page = value
		},
		conversationSet(state, value)
		{
			state.conversation_id = value
		},
		conversationUpsert(state, value)
		{
			if (state.conversations.length === 0 && Array.isArray(value))
				state.conversations = value
			else if (Array.isArray(value) === false)
				state.conversations.upsert(value)
		},
		messageUpsert(state, value: any)
		{
			if (state.messages.length === 0 && Array.isArray(value))
				state.messages = value
			else if (Array.isArray(value) === false)
				state.messages.upsert(value)
		},
		friendUpsert(state, value)
		{
			state.friends = value
		},
		friendRequestUpsert(state, value)
		{
			state.friendRequests = value
		},
		userUpsert(state, value)
		{
			if (state.users.length === 0 && Array.isArray(value))
				state.users = value
			else if (Array.isArray(value) === false)
				state.users.upsert(value)
		},
		userAllUpsert(state, value)
		{
			if (state.users_all.length === 0 && Array.isArray(value))
				state.users_all = value
			else if (Array.isArray(value) === false)
				state.users_all.upsert(value)
		},
		notificationUpsert(state, value: any)
		{
			if (state.notifications.length === 0 && Array.isArray(value))
				state.notifications = value
			else if (Array.isArray(value) === false)
				state.notifications.upsert(value)
		},
	},
	actions: {
		async meSet({commit}, value)
		{
			commit('meSet', value)  		
		},
		async pageSet({commit}, value)
		{
			commit('pageSet', value)  		
		},
		async conversationSet({commit}, value)
		{
			commit('conversationSet', value)  		
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
		},
		async userUpsert({commit}, value)
		{
			commit('userUpsert', value)
		},
		async userAllUpsert({commit}, value)
		{
			commit('userAllUpsert', value)
		},
		async notificationUpsert({commit}, value)
		{
			commit('notificationUpsert', value)
		},
	},
	modules: {
	}
})
