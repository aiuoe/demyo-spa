<template lang="pug">
div(class="container-fluid")
	Header
	span(v-if="!users.length") no hay usuarios para mostrar
	<main class="container section" v-if="users.length">
		<div class="row">
			<div class="col s12 m10 l11 card left b__radius" v-if="user">
				<div class="col s12 m7 l7 image">
					<img v-if="user.photos.length" :src="user.photos[0].url">
					<img v-if="!user.photos.length && user.gender_id.id == 1" src="/img/profile_male.jpg">
					<img v-if="!user.photos.length && user.gender_id.id == 2" src="/img/profile_female.jpg">
					<img v-if="!user.photos.length && user.gender_id.id == 3" src="/img/profile_female.jpg">
					<img v-if="!user.photos.length && user.gender_id.id == 4" src="/img/profile_female.jpg">
					<img v-if="!user.photos.length && user.gender_id.id == 5" src="/img/profile_female.jpg">
					<a @click="router" class="btn-floating halfway-fab waves-effect waves-light blue">
						<i class="material-icons">visibility</i>
					</a>
					<a @click="previous" class="btn-floating halfway-fab waves-effect waves-light red darken-2 left">
						<i class="material-icons">replay</i>
					</a>
					<div class="botons">
						<a @click="send" class="btn waves-effect waves-gray">
							<i class="material-icons red-text text-darken-1">favorite</i></a>
						</a>
						<a @click="next" class="btn waves-effect waves-gray">
							<i class="material-icons grey-text">close</i></a>
						</a>
					</div>
					<i class="material-icons camera">local_see</i>
				</div>
				<ul class="col s12 m5 l5 data" v-if="user != null">
					<li class="name">{{ user.name }}</li>
					<li class="age" v-if="user.birth_date">возраст, {{ user.birth_date | age }}</li>
					<li class="title" v-if="user.city_id">
						<div class="title_li">
							<i class="material-icons teal-text">place</i>
							<span>Россия, {{ user.city_id.name }}</span>
						</div>
					</li>
					<li class="title info">
						<div class="title_li" v-if="user.about_me">
							<i class="material-icons blue-grey-text">comment</i>
							<span>Обо мне:</span>
						</div>
						<span class="parrafo">{{ user.about_me }}</span>
					</li>
					<li class="title" v-if="user.gender_id">
						<div class="title_li">
							<i class="material-icons light-blue-text">star</i>
							<span>пол:</span>
						</div>
						<span>{{ user.gender_id.name }}</span>
					</li>
					<li class="title" v-if="user.relationship_id">
						<div class="title_li">
							<i class="material-icons red-text darken-4">favorite</i>
							<span>отношение:</span>
						</div>
						<span>{{ user.relationship_id.name }}</span>
					</li>
					<li class="title" v-if="user.wish_id">
						<div class="title_li">
							<i class="material-icons brown-text">explore</i>
							<span>я хочу:</span>
						</div>
						<span>{{ user.wish_id.name }}</span>
					</li>
				</ul>
			</div>
			<div class="col s1 m2 l1 users hide-on-small-only center-column">
				<ul class="list-users">
					<li v-for="user in users" v-if="user.id != me_id" @click="select(user.id)" :class="['item--user', {'active': init == user.id}]">
						<img v-if="user.photos.length" :src="user.photos[0].url" alt="user">
						<img v-if="!user.photos.length && user.gender_id.id == 1" src="img/profile_male.jpg">
						<img v-if="!user.photos.length && user.gender_id.id == 2" src="img/profile_female.jpg">
						<img v-if="!user.photos.length && user.gender_id.id == 3" src="img/profile_female.jpg">
						<img v-if="!user.photos.length && user.gender_id.id == 4" src="img/profile_female.jpg">
						<img v-if="!user.photos.length && user.gender_id.id == 5" src="img/profile_female.jpg">
					</li>
				</ul>
				//- a(@click="next" class="link")
				//- 	i(class="material-icons red-text text-darken-1") arrow_downward
			</div>
		</div>
	</main>
	Footer
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapState, mapActions, mapGetters } from 'vuex'
import { age } from '@/modules/filter'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { FRIEND_UPSERT } from '@/graphql/friend'
import '@/modules/array'

declare const M: any;

@Component({
	components: { Header, Footer },
	filters: {age: age},
	computed: 
	{
		...mapGetters(['me_id'])
	}
})
export default class Match extends Vue 
{
	user: any = null
	init: number = 0

	async send()
	{
		await this.$apollo.mutate({
			mutation: FRIEND_UPSERT,
			variables: {
				id: this.user.id
			}
		})
		.then(res => 
		{
			M.toast({html: res.data.friendUpsert, classes: 'red darken-3'})

			do
			{
				let next = this.users.next(this.user.id)
		
				if (next)
					this.user = next
		
			}while(this.user.id == this.$store.state.me_id)	
		})
		.catch(error => error)
	}

	previous()
	{
		do
		{
			let previous = this.users.previous(this.user.id)
	
			if (previous)
				this.user = previous
	
		}while(this.user.id == this.$store.state.me_id)		
		document.querySelector('.list-users')!.scrollTop -= 75
	}

	next()
	{
		do
		{
			let next = this.users.next(this.user.id)
	
			if (next)
				this.user = next
	
		}while(this.user.id == this.$store.state.me_id)

		document.querySelector('.list-users')!.scrollTop += 70
	}

	async mounted()
	{
		if (this.user == null)
			this.user = this.users[0]
	
		if (this.user)
			this.init = this.user.id
	}

	async updated()
	{
		if (this.user == null)
			this.user = this.users[0]
	
		if (this.user)
			this.init = this.user.id
	}

	get users()
	{
		return this.$store.state.users_all.filter((u: any) => u.id != this.$store.state.me_id)
	}

	router()
	{
		this.$router
		.push({name: 'profile', params: {id: this.user.id}})
		.catch(err => err)
	}

	select(id: number)
	{
		this.user = this.users.get(id)
		this.init = id
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

.center-column
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.link
{
	cursor: pointer;
}

.card
{
	height: 76vh;
	padding: 0 0 0 0;
	overflow: hidden;
}

.row .col
{
	padding: 0 0;
}

.image
{
	width: 100%;
	height: 60%;
	position: relative;
}

.image img
{
	width: 100%;
	height: 100%;
	border-radius: 0.25rem 0.25rem 0px 0px;
}

.btn-floating.halfway-fab 
{
	bottom: 1rem;
}

.botons
{
	width: 100%;
	display: flex;
	justify-content: center;
	position: absolute;
	bottom: 1rem;
}

.botons .btn
{
	padding: 2.25rem 1.05rem;
	background: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	margin: 0 5px;
}

.botons .btn i
{
	font-size: 2.7rem;
}

.users
{
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
}

.users ul
{
	display: flex;
	flex-direction: column;
	align-items: center;
}

.users li
{
	width: 58px;
	height: 58px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 0.55rem;
	border-radius: 50%;
	cursor: pointer;
}

.users .active
{
	background: linear-gradient(262deg,  #009FFF, #ec2F4B);
}

.users .active > img
{
	border: 2px solid #fafafa;
}

.users img
{
	width: 52px;
	height: 52px;
	border-radius: 50%;
}

.camera
{
	position: absolute;
	top: 1rem;
	left: 1rem;
	color: rgba(0, 0, 0, .27);
}

.col.data
{
	padding: 0 1rem;
}

.title
{
	display: flex;
	font-size: 1rem;
	margin-top: 0.3rem;
	justify-content: flex-start;
	word-wrap: break-word;
}

.title span
{
	font-size: 1rem;
}

.title_li
{
	display: flex;
	margin-right: 0.4rem;
}

.title_li span
{
	font-size: 1rem;
}

.title i
{
	margin-right: 0.35rem;
	font-size: 1.45rem;
}

.parrafo
{
	text-align: justify;
	font-size: 0.95rem;
}

.name
{
	font-size: 1.4rem;
	letter-spacing: 0.2px;
	text-shadow: 1px 1px 1px #ededed;
}

.age
{
	font-size: 1.2rem;
	margin-top: -0.45rem;
	text-indent: 2px;
}

.title.info
{
	display: none;
}

@media only screen and (min-width: 602px)
{
	.card
	{
		height: 55vh;
	}

	.image
	{
		height: 100%;
	}

	.botons .btn
	{
		padding: 2rem 0.8rem;
		margin: 0 5px;
	}

	.botons .btn i
	{
		font-size: 2.3rem;
	}

	.title
	{
		display: flex;
		flex-direction: column;
	}
}

@media only screen and (min-width: 768px)
{
	.row
	{
		width: 100%;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	.card
	{
		width: 92% !important;
		height: 562px;
	}

	.users
	{
		width: 6% !important;
		height: 576px;
	}

	.users .list-users
	{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		overflow-y: scroll;
		padding: 10px 5px;
		box-sizing: border-box;
	}

	.users .list-users::-webkit-scrollbar 
	{
		width: 0px;
	}

	.users .list-users .item--user
	{
		width: 60px;
		height: 60px;
		min-height: 60px;
		border-radius: 50%;
	}

	.image
	{
		height: 100%;
	}

	.image img
	{
		border-radius: 0.25rem 0px 0px 0.25rem;
	}

	.btn-floating.halfway-fab 
	{
		bottom: 1.5rem;
	}

	.botons
	{
		bottom: 1.5rem;
	}

	.botons .btn
	{
		padding: 2.65rem 1.35rem;
		margin: 0 10px;
	}

	.botons .btn i
	{
		font-size: 3rem;
	}

	.col.data
	{
		padding: 0.5rem 1.6rem;
	}
	
	.title
	{
		margin-top: 1rem;
	}
	
	.title span
	{
		font-size: 1rem;
	}

	.title_li span
	{
		font-size: 1.15rem;
	}

	.parrafo
	{
		text-align: justify;
	}

	.name
	{
		font-size: 1.8rem;
		letter-spacing: 0.3px;
	}

	.age
	{
		font-size: 1.4rem;
		margin-top: -0.5rem;
		margin-bottom: 1rem;
		text-indent: 2px;
	}

	.title.info
	{
		display: flex;
	}
}
</style>
