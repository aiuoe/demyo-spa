<template lang="pug">
div
	div.menu
		Menu

	.conversations
		ul.list.list-conversations
			li.item-conversations(v-for="conversation in conversations")
				a(@click="select(conversation.friend_id.id)")
					span {{ conversation.friend_id.name[0] | capitalize }}
		ul.list.list-messages(v-if="messages")
			li.item-messages(v-for="message in messages")
				span(v-if="message.user_id.id == me_id" class="message right") {{ message.message }}
				span(v-else class="message left") {{ message.message }}

		form(@submit.prevent="store" class="form")
			input(v-model="message" type="text" class="input" placeholder="Message")
			button(type="submit" class="link")
				i(class="fa fa-paper-plane")

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Menu from '@/components/Menu.vue'
import gql from 'graphql-tag';
import { capitalize } from '@/modules/filter'
import { mapState, mapActions, mapGetters } from 'vuex'
import '@/modules/array'

@Component({
	components: { Menu },
	filters: {capitalize: capitalize},
	methods:
	{
		...mapActions(['friendSet'])
	},
	computed: 
	{
		...mapGetters(['me_id', 'conversations'])
	}
})
export default class Conversations extends Vue 
{
	friendSet!: (value: number) => void
	message: string = ''
	messages: any = []
	friend_id: number = 0
	id: number = 0

	async created()
	{
		if (this.$store.state.conversations)
			this.messages = this.$store.state.conversations[0].messages
	}

	// async mounted()
	// {
 //    const obs = this.$apollo.subscribe({
 //    query: gql(`subscription
 //      MessageUpsert
 //      {
 //        messageUpsert
 //        {
 //          id
 //          conversation_id
 //          {
 //          	id
 //          }
 //     			user_id
 //     			{
 //     				id
 //     			}
 //          message
 //        }
 //    }`)})
 //    obs.subscribe({
 //      next: (data: any) => { 
 //      	console.log(data)
 //      	this.conversations.map((item: any) => 
 //      	{
 //      		if (item.id == data.data.messageUpsert.conversation_id.id)
 //      			item.messages.push(data.data.messageUpsert)	
 //      	})
 //      },
 //      error: (error: any) => console.log(error)
 //    })
	// }

	async updated()
	{
		let el: any = document.querySelector('.list-messages')
		el.scrollTop = el.scrollHeight
	}

	// select(id: number)
	// {
	// 	this.friendSet(id)
	// 	this.conversations.map((item: any) => 
	// 	{
	// 		if (item.friend_id.id == id)
	// 		{
	// 			this.messages = item.messages
	// 			this.friend_id = item.friend_id.id 
	// 		}
	// 	})
	// }

	// async store()
	// {
	// 	this.$apollo.mutate({
	// 		mutation: gql(`mutation($id: ID! $friend_id: ID! $message: String!)
	// 		{
	// 		  messageUpsert(input: {
	// 		    id: $id
	// 		    friend_id: $friend_id
	// 		    message: $message
	// 		  })
	// 		  {
	// 		    id
	// 		    conversation_id
	// 		    {
	// 			    id
	// 			    friend_id
	// 			    {
	// 			      id
	// 			      name
	// 			    }
	// 			    messages
	// 			    {
	// 			      id
	// 			      user_id
	// 			      {
	// 			        id
	// 			      }
	// 			      message
	// 			    }
	// 		    }
	// 		    user_id
	// 		    {
	// 		    	id
	// 		    }
	// 		    message
	// 		  }
	// 		}`),
	// 		variables: 
	// 		{
	// 			id: 0,
	// 			friend_id: this.friend_id,
	// 			message: this.message
	// 		}
	// 	})
	// 	.then(res => {
	// 		this.conversations.upsert(res.data.messageUpsert.conversation_id)
	// 		this.messages = this.conversations.get(res.data.messageUpsert.conversation_id.id).messages
	// 		this.message = ''
	// 	})
	// 	.catch(err => console.log(err))
	// }

}
</script>

<style scoped lang="sass">
.menu
	position: fixed
	bottom: 0px
	left: 0px
	width: 100vw
	height: 70px
	background-color: #068DDA

.conversations
	width: 100vw
	height: 100vh
	padding: 7px 7px 70px 7px
	box-sizing: border-box
	display: flex
	flex-direction: column

.list
	width: 100%
	display: flex
	list-style: none

	&-conversations
		height: 10%
		justify-content: flex-start
		align-items: center
		overflow-y: hidden
		overflow-x: scroll
		padding: 7px
		box-sizing: border-box

		.item-conversations
			width: 40px
			height: 40px
			border-radius: 50%
			background-color: #FE7064
			display: flex
			justify-content: center
			align-items: center

			a
				text-decoration: none

				span
					font-size: 20px
					color: white
	
	&-messages
		flex-direction: column
		align-items: center
		height: 83%
		overflow-y: scroll
		overflow-x: hidden
		padding: 7px
		box-sizing: border-box

		.item-messages
			width: 100%
			display: flex
			flex-direction: column
			margin-bottom: 10px

			.message
				display: flex
				justify-content: center
				align-items: center
				background-color: #FFD25B
				width: 70%
				border-radius: 10px
				padding: 7px
				box-sizing: border-box

			.right
				background-color: #0090FD
				align-self: flex-end
	
.form
	width: 100%
	height: 7%
	display: flex

	.input
		width: 90%
		text-indent: 7px
		border: 0px
		outline: none
		background-color: #F2F0F1

	.link
		width: 10%
		height: 100%
		display: flex
		justify-content: center
		align-items: center
		text-decoration: none
		border: 0px
		outline: none

		.fa
			color: #0090FD
			font-size: 25px


@media screen and (min-width: 768px)
	.menu
		top: 0
		width: 70px
		height: 100vh

@media screen and (min-width: 1024px)

@media screen and (min-width: 1280px)


</style>
