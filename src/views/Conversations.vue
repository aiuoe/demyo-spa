<template lang="pug">
div(class="container-fluid")
	Header
	main(class="main")
		div(class="container_messages center")
			div(class="container container_msj")
				div(class="box_chat box")
					div(class="box_users")
						div(class="user_title center")
							p встречи
						
						//- conversations
						ul(class="user_box")
							li(v-for="conversation in conversations" @click="select(conversation.id, conversation.friend_id.id)" class="messages")
								div(class="avatar")
									img(src="https://randomuser.me/api/portraits/women/34.jpg")
								div(class="friend")
									div(class="user") {{ conversation.friend_id.name | capitalize }} {{ conversation.friend_id.lastname | capitalize }}
									div(class="text") lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
					div(class="box_messages center")
						div(class="no_msj")
							p Вы не выбрали ни одного сообщения
						div(class="chat_item")
							div(class="chat_title")
								div(class="items")
									i(class="fa fa-chevron-left")
									span {{ friend_name | capitalize }} {{ friend_lastname | capitalize }}
									div(class="btn_state")
								i(class="fa fa-info-circle icon")

							//- messages
							ul(class="chat_cont")
								//- <div class="time">
								//- 	<span class="time-line"></span>
								//- 	<span>22:10</span>
								//- 	<span class="time-line"></span>
								//- </div>
								li(v-for="message in messages" class="message")
									div(v-if="me_id == message.user_id.id" class="chat--item user")
										p {{ message.message }}
										i(class="fa fa-check-circle")
									div(v-if="me_id != message.user_id.id" class="chat--item user-id")
										i(class="fa fa-check-circle")
										p {{ message.message }}
							form(@submit.prevent="store" class="chat_msj")
								div(class="input")
									textarea(v-model="message" class="textarea" placeholder="Напиши сообщение")
								div(class="icon")
									button послать
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue'
import { capitalize } from '@/modules/filter'
import { mapState, mapActions, mapGetters } from 'vuex'
import { MESSAGE_UPSERT } from '@/graphql/message'

@Component({
	components: { Header },
	filters: {capitalize: capitalize},
	methods:
	{
		...mapActions(['conversationSet'])
	},
	computed: 
	{
		...mapGetters(['me_id', 'conversations', 'messages'])
	}
})
export default class Conversations extends Vue 
{
	conversationSet!: (value: number) => void
	message: string = ''
	friend_id: number = 0
	friend_name: string = ''
	friend_lastname: string = ''
	id: number = 0

	async mounted()
	{
		if (this.$store.state.conversations.length)
		{
			this.friend_id = this.$store.state.conversations[0].friend_id.id
			this.friend_name = this.$store.state.conversations[0].friend_id.name
			this.friend_lastname = this.$store.state.conversations[0].friend_id.lastname
		}
	}

	async updated()
	{
		let el: any = document.querySelector('.chat_cont')
		el.scrollTop = el.scrollHeight
	}

	select(id: number, friend_id: number)
	{
		this.friend_id = friend_id 
		this.conversationSet(id)
	}

	async store()
	{
		this.$apollo.mutate({
			mutation: MESSAGE_UPSERT,
			variables: 
			{
				id: 0,
				friend_id: this.friend_id,
				message: this.message
			}
		})
		.then(res => {
			this.$store.state.messages.upsert(res.data.messageUpsert)
			this.message = ''
		})
		.catch(err => console.log(err))
	}

}
</script>

<style scoped lang="sass">
.container-fluid
	margin: 0px
	padding: 0px
	min-height: 100vh
	width: 100vw
	display: flex
	flex-direction: column

.container_messages
	width: 100%
	height: auto
	position: relative
	margin-top: 1rem
	margin-bottom: 1.5rem

.container_msj
	display: flex
	flex-direction: column

.friend 
	display: flex
	flex-direction: column
	align-items: flex-start

	.user
		text-align: left

.box_chat
	width: 100%
	height: auto
	display: flex

.box_users
	width: 100%
	height: 100%
	display: flex
	flex-direction: column

.box_users .user_title
	width: 100%
	height: 46px
	color: #fff
	font-size: 1.1rem
	font-weight: 600
	border-top-left-radius: 4px
	background: rgb(20, 159, 255)
	box-shadow: 0 1px 8px 0 rgba(0, 20, 20, 0.2)
	border-bottom: 3px solid #ed465f

.box_users .messages:hover
	box-shadow: 0 0 15px 0 rgba(43,78,78,0.1)

.box_users .user_box
	width: 100%
	height: 100%
	padding: 0.4rem 0 1rem 0

.box_users .messages
	padding: 10px 20px
	display: flex
	align-items: center
	transition: 0.2 box-shadow
	cursor: pointer
	overflow: hidden

.box_users .messages .avatar img
	width: 53px
	height: 53px
	border-radius: 70px

.box_users .messages .user
	padding: 0 10px
	font-weight: 600px
	letter-spacing: 0.5px
	font-size: 18px

.box_users .messages .text
	width: 250px
	white-space: nowrap
	overflow: hidden
	text-overflow: ellipsis
	padding: 0 10px
	font-weight: 100
	font-size: 15px
	opacity: 0.8

.box_messages
	width: 100%
	height: 100%
	display: none

.no_msj
	display: none

.chat_item
	display: flex
	flex-direction: column
	width: 100%
	height: 100%
	position: relative

.chat_title
	width: 100%
	height: 55px
	display: flex
	padding: 0 1.5rem
	justify-content: space-between
	align-items: center
	border-bottom: 1px solid #dedede

.chat_title .items
	display: flex
	align-items: center

.chat_title span
	font-size: 1.1rem
	margin-right: 0.5rem

.chat_title .icon
	color: #999
	font-size: 1.25rem
	width: 2rem
	height: 2rem
	display: flex
	justify-content: center
	align-items: center
	border-radius: 50%
	cursor: pointer

.chat_title .icon:hover
	color: #fafafa
	background: rgb(20, 159, 255)

.items .fa-chevron-left
	font-size: 1.1rem
	color: #666
	margin-right: 1.2rem
	cursor: pointer

.chat_item .chat_cont
	width: 100%
	height: calc(100% - 4rem - 73px)
	display: flex
	flex-direction: column
	align-items: center
	padding: 1rem 1rem 1px 1rem
	overflow-y: auto
	list-style: none

.chat_cont::-webkit-scrollbar
	width: 3px

.chat_cont::-webkit-scrollbar-thumb
	background-color: rgb(20, 159, 255)
 
.chat_cont::-webkit-scrollbar-track
	background-color: white

.chat_cont .message
	width: 100%

.chat_cont .time
	width: 100%
	display: flex
	align-items: center
	justify-content: space-between
	margin-bottom: 1rem

.time .time-line
	width: 46%
	height: 1px
	border-radius: 1rem
	background: #ededed

.time span
	color: #999
	font-size: 0.9rem
	font-weight: 500

.chat--item
	width: 100%
	margin-bottom: 1rem
	display: flex
	align-items: flex-end

.chat--item i
	font-size: 1rem
	color: #999 

.chat--item p
	width: auto
	max-width: 85%
	font-size: 0.9rem
	font-weight: 400
	padding: 0.8rem 1.1rem
	border-radius: 3rem
	border-bottom: 1px solid #ededed

.chat--item.user-id
	justify-content: flex-start

.chat--item.user-id i
	margin-right: 0.1rem 

.chat--item.user-id p
	color: #333
	background: #f0f0f0

.chat--item.user
	justify-content: flex-end

.chat--item.user i
	margin-left: 0.1rem 

.chat--item.user p
	color: #fff
	background: linear-gradient(262deg, rgba(216, 47, 75, .8), rgba(236, 47, 75, .9))

.chat_msj
	width: 100%
	height: 3.1rem
	display: flex
	align-items: center
	position: absolute
	bottom: 0
	justify-content: space-between
	padding: 0 1.3rem
	border-top: 1px solid #dedede

.chat_msj .input
	width: 90%
	height: 67%
	display: flex
	align-items: center
	justify-content: flex-start

.chat_msj .input textarea
	width: 99%
	height: 100%
	display: flex
	justify-content: center
	align-items: center
	resize: none
	font-size: 0.9rem
	outline: none
	border: 1px solid #ccc
	border-radius: 4px
	color: #222
	padding: 0.5rem 1rem
	box-shadow: inset 0 1px 0 rgb(0 0 0 / 7%)

	&::-webkit-scrollbar
		width: 1px

.chat_msj .icon
	width: 10%
	height: 65%
	display: flex
	justify-content: center
	align-items: center

.chat_msj .icon button
	color: #fafafa
	font-size: 1rem
	border: none
	outline: none
	height: 100%
	padding: 0rem 0.4rem
	border-radius: 4px
	background: #ed465f
	cursor: pointer

.chat_msj .icon button:hover
	background: #ed3d47

@media screen and (min-width: 440px)
	.box_users .messages .text
		width: 330px

@media screen and (min-width: 560px)
	.box_users .messages .text
		width: 400px

@media screen and (min-width: 660px)
	.box_users .messages .text
		width: 500px

@media screen and (min-width: 768px)
	.main
		margin-bottom: 0

	.footer
		display: none

	.container_messages
		margin-bottom: 0

	.container_msj
		display: flex
		flex-direction: row
		justify-content: space-between

	.box_users .messages:hover
		border-right: 5px solid #ed3d57

	.box_chat
		height: 83.5vh

	.box_users
		width: 48%
		border-right: 1px solid #dedede

	.box_users .user_title
		height: 75px

	.box_users .user_box
		width: 100%
		height: 100%
		overflow-y: auto

	.box_users .messages .text
		width: 240px

	.box_users .messages .avatar img
		width: 65px
		height: 65px

	.box_messages
		width: 70%
		display: flex

	.no_msj
		color: #333
		font-weight: 600

	.chat_title
		height: 77px

	.chat_msj
		height: 3.7rem

	.fa-chevron-left
		display: none

@media screen and (min-width: 930px)
	.box_users
		width: 43%

	.box_users .messages .text
		width: 250px

@media screen and (min-width: 1024px)
	.box_users
		width: 36%

@media screen and (min-width: 1200px)
	.box_users
		width: 30%
</style>
