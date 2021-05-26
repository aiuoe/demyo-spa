<template lang="pug">
div(class="container-fluid")
	Header
	span(v-if="!conversations.length") no hay conversaciones para mostrar
	<main class="container section" v-if="conversations.length">
		<div class="row card_message">
			<div class="col s12 m4 box_1">
				<div class="box_title_user">
					<div class="search">
						<div class="item_1">
							<i class="material-icons">search</i>
						</div>
						<div class="item_2">
							<input type="text" placeholder="поиск...">
						</div>
					</div>
				</div>
				<ul class="collection">
					<li v-for="conversation in conversations" @click="select(conversation.id, conversation.friend_id.id)" :class="['collection-item', 'avatar', {'active': init == conversation.id}]" v-if="conversation.friend_id.id != me_id">
							<img v-if="conversation.friend_id.photos.length" :src="conversation.friend_id.photos[0].url" class="circle">
							<span class="title truncate">{{ conversation.friend_id.name }}</span>
							<p class="truncate">Hi, my name is Carlos Swift, i need a please</p>
					</li>
				</ul>
			</div>
			<div class="col s12 m8 box_2">
				<div class="box_title_msj">
					<div class="name">
						<span v-if="friend">{{ friend.friend_id.name }}</span>
						<div class="status green"></div>
					</div>
					<a class="tools">
						<i class="material-icons">info_outline</i>
					</a>
				</div>
				<ul class="box_text_msj">
					<li v-for="message in messages" class="chat_item">
						<p v-if="message.user_id.id == me_id" class="user">{{ message.message }}</p>
						<p v-else >{{ message.message }}</p>
					</li>
				</ul>
				<form @submit.prevent="store" class="box_chat_msj">
					<div class="box_input">
						<div class="item1">
							<i class="material-icons">sentiment_very_satisfied</i>
						</div>
						<div class="item2">
							<input v-model="message" type="text" placeholder="Послать сообщение...">
						</div>
						<button type="submit" class="item3">
							<i class="material-icons">send</i>
						</button>
					</div>
				</form>
			</div>
		</div>
	</main>
	Footer
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { capitalize } from '@/modules/filter'
import { mapState, mapActions, mapGetters } from 'vuex'
import { MESSAGE_UPSERT } from '@/graphql/message'

@Component({
	components: { Header, Footer },
	filters: {capitalize: capitalize},
	methods:
	{
		...mapActions(['conversationSet'])
	},
	computed: 
	{
		...mapGetters(['me_id', 'conversations', 'messages', 'friend'])
	}
})
export default class Conversation extends Vue 
{
	conversationSet!: (value: number) => void
	message: string = ''
	friend_id: number = 0
	id: number = 0
	init: number = 0

	async mounted()
	{
		let el: any = document.querySelector('.box_text_msj')
		if (el !== null)
			el.scrollTop = el.scrollHeight

		if (this.$store.state.conversations.length && this.friend_id == 0 && this.init == 0)
		{
			this.init = this.$store.state.conversations[0].id
			this.friend_id = this.$store.state.conversations[0].friend_id.id
		}
	}

	async updated()
	{
		let el: any = document.querySelector('.box_text_msj')
		if (el !== null)
			el.scrollTop = el.scrollHeight

		if (this.$store.state.conversations.length && this.friend_id == 0 && this.init == 0)
		{
			this.init = this.$store.state.conversations[0].id
			this.friend_id = this.$store.state.conversations[0].friend_id.id
		}
	}

	select(id: number, friend_id: number)
	{
		this.friend_id = friend_id 
		this.conversationSet(id)
		this.init = id
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

<style scoped lang="scss">
.container-fluid
{
	width: 100vw;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	overflow-x: hidden;
}

.card_message
{
	height: 77vh;
	background: #fff;
	border: 1px solid #dbdbdb;
	border-radius: 3px;
}

input:not([type]):focus:not([readonly]),
input[type=text]:not(.browser-default):focus:not([readonly])
{
  border-bottom: 0px solid #26a69a;
  -webkit-box-shadow: 0 0px 0 0 #26a69a;
          box-shadow: 0 0px 0 0 #26a69a;
}

.row .col
{
	padding: 0 0 0 0;
}

.box_1
{
	height: 100%;
}

.box_1 .box_title_user
{
	width: 100%;
	height: 4rem;
	border-top-left-radius: 3px; 
	border-top-right-radius: 3px; 
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: 1px solid #dbdbdb;
}

.box_1 .box_title_user .search
{
	width: 87%;
	height: 60%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 0.9rem 0 0.6rem;
	border-radius: 20px;
	background: #dedede;
}

.box_1 .box_title_user .search .item_1
{
	width: 11%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.box_1 .box_title_user .search .item_1 i
{
	color: #999;
}

.box_1 .box_title_user .search .item_2
{
	width: 89%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.box_1 .box_title_user .search .item_2 input
{
	border-bottom: none;
	padding: 0 0 0 0;
	margin: 0 0 0 0;
	width: 100%;
	height: 100%;
	text-indent: 1.5px;
}

.box_1 .box_title_user .search .item_2 input::placeholder
{
	color: #999;
}

.users
{
	width: 100%;
	margin: 0 0 0 0;
}

ul.collection
{
	height: 513px;
	overflow-y: auto;
	margin: 0 0;
	padding: 0.5rem 0 1rem 0;
}

ul.collection::-webkit-scrollbar 
{
	width: 5px;
}

.box_1 .collection li
{
	cursor: pointer;
}

.box_1 .collection li:hover
{
	background-color: #fafafa;
}

.box_2 .box_title_msj
{
	width: 100%;
	height: 4rem;
	border-bottom: 1px solid #dbdbdb;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 1.25rem;
}

.box_2 .box_title_msj .name
{
	display: flex;
	align-items: center;
}

.box_2 .box_title_msj .name span
{
	font-size: 1.17rem;
}

.box_2 .box_title_msj .name .status
{
	margin-left: 0.55rem;
}

.box_2 .box_title_msj .tools
{
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
	color: #666;
	cursor: pointer;
}

.box_2 .box_text_msj
{
	width: 100%;
	height: 453px;
	padding: 1.5rem 1.3rem 1.7rem 1.3rem;
	overflow-y: auto;
}

.box_2 .box_text_msj::-webkit-scrollbar 
{
	width: 5px;
}

ul.box_text_msj
{
	margin: 0 0;
	padding: 0 0;
}

.box_2 .box_text_msj .chat_item
{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-bottom: 0.8rem;
}

.box_2 .box_text_msj li p
{
	align-self: flex-start;
	width: auto;
	max-width: 85%;
	margin: 0 0;
	word-wrap: break-word;
	padding: 12px 16px;
	border-radius: 20px;
	position: relative;
	background: #efefef;
	text-align: justify;
}

.box_2 .box_text_msj li p.user
{
	align-self: flex-end;
	background: #e53935;
	color: #fff;
}

.box_2 .box_chat_msj
{
	width: 100%;
	height: 4rem;
	padding: 0 1.5rem;
	display: flex;
	justify-content: center;
	align-items: flex-start;
}

.box_2 .box_input
{
	width: 100%;
	height: 77%;
	display: flex;
	border: 1px solid #dedede;
	border-radius: 8px;
}

.box_2 .box_input .item1
{
	width: 8%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.box_2 .box_input .item1 i
{
	color: #444;
	cursor: pointer;
}

.box_2 .box_input .item1 i:hover
{
	color: #EC304C;
}

.box_2 .box_input .item1 i:active
{
	color: #B71C1C;
}

.box_2 .box_input .item2
{
	width: 84%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.box_2 .box_input .item2 input
{
	border-bottom: none;
	padding: 0 0 0 0;
	margin: 0 0 0 0;
	width: 100%;
	height: 100%;
}

.box_2 .box_input .item2 input:focus
{
	border-bottom: none;
}

.box_2 .box_input .item2 input:active
{
	border-bottom: none;
}

.box_2 .box_input .item3
{
	width: 8%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 0px;
	background-color: transparent;
}

.box_2 .box_input .item3 i
{
	color: #444;
	cursor: pointer;
}

.box_2 .box_input .item3 i:hover
{
	color: #42a5f5;
}

.box_2 .box_input .item3 i:active
{
	color: #1794EE;
}

@media only screen and (min-width: 768px)
{
	.container-fluid
	{
		overflow-y: hidden;
		background: #fafafa;
	}

	.card_message
	{
		height: 575px;
		margin-top: -0.1rem;
	}

	.box_1
	{
		border-right: 1px solid #dbdbdb;
	}
}
</style>
