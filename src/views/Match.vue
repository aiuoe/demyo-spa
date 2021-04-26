<template lang="pug">
div(class="container-fluid")
	Header
	span(v-if="!users.length") no hay usuarios para mostrar
	main(class="container section" v-if="users.length")
		div(class="row")
			div(class="col s12 m10 l11 card left b__radius")
				div(class="col s12 m7 l7 image")
					img(src="img/user.jpg" alt="user")
					a(class="btn-floating halfway-fab waves-effect waves-light blue")
						i(class="material-icons") visibility
					a(class="btn-floating halfway-fab waves-effect waves-light red darken-2 left")
						i(class="material-icons") replay
					div(class="botons")
						a(@click="send" class="btn waves-effect waves-gray")
							i(class="material-icons red-text text-darken-1") favorite
						a(class="btn waves-effect waves-gray")
							i(class="material-icons grey-text") close
				ul(class="col s12 m5 l5 data" v-if="user != null")
					li(class="name_user") {{ user.name }}
					li(class="age_user") возраст, {{ user.age }}
					li(class="city_user") {{ user.country }}
					li(class="title") Sobre mi
					li(class="info_user") Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima sit nisi ea, fugiat voluptatem sapiente porro harum, atque, aperiam eveniet odio dolor hic, neque quod dolore corrupti quae consectetur repudiandae.
					li(class="title") Relacion personal
			div(class="col s1 m2 l1 users hide-on-small-only")
				ul
					li(v-for="user in users" v-if="user.id != me_id" @click="select(user.id)" :class="['item--user', {'active': init == user.id}]")
						img(src="https://randomuser.me/api/portraits/women/67.jpg" alt="user" )
				a(@click="next")
					i(class="material-icons red-text text-darken-1") arrow_downward
	Footer
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapState, mapActions, mapGetters } from 'vuex'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { FRIEND_REQUEST_SEND, FRIEND_REQUEST_ACCEPT } from '@/graphql/friend'
import '@/modules/array'

@Component({
	components: { Header, Footer },
	methods:
	{
		...mapActions(['pageSet'])
	},
	computed: 
	{
		...mapGetters(['me_id', 'users'])
	}
})
export default class Match extends Vue 
{
	pageSet!: (value: number) => void
	user: any = null
	page: number = 1
	init: number = 0

	@Watch('users', {immediate: true})
	usersOnChange()
	{
		if (this.$store.state.users.length)
		{
			this.user = this.$store.state.users[0]
			this.init = this.user.id
		}
	}

	next()
	{
		this.pageSet((this.$store.state.page + 1))
	}

	async send()
	{
		this.$apollo.mutate({
			mutation: FRIEND_REQUEST_SEND,
			variables: {
				friend_id: this.user.id
			}
		})
		.then(res => 
		{
			this.$store.state.users
			.delete(this.user.id)
		})
		.catch(err => console.log(err))
	}

	async accept(id: number)
	{
		this.$apollo.mutate({
			mutation: FRIEND_REQUEST_ACCEPT,
			variables: {
				id: id
			}
		})
		.then(res => console.log(res))
		.catch(err => console.log(err))
	}

	async mounted()
	{
		if (this.$store.state.users.length && this.user == null)
		{
			this.user = this.$store.state.users[0]
			this.init = this.user.id
		}
	}

	async updated()
	{
		if (this.$store.state.users.length && this.user == null)
		{
			this.user = this.$store.state.users[0]
			this.init = this.user.id
		}
	}

	select(id: number)
	{
		this.user = this.$store.state.users.get(id)
		this.init = id
	}
}
</script>

<style scoped lang="sass">
.container-fluid
	width: 100vw
	min-height: 100vh
	display: flex
	flex-direction: column
	justify-content: space-between
	align-items: center
	overflow-x: hidden

.card
	height: 76vh
	padding: 0 0 0 0
	overflow: hidden

.row .col
	padding: 0 0

.image
	width: 100%
	height: 60%
	position: relative

.image img
	width: 100%
	height: 100%
	border-radius: 6px 6px 0px 0px

.btn-floating.halfway-fab 
	bottom: 1rem

.botons
	width: 100%
	display: flex
	justify-content: center
	position: absolute
	bottom: 1rem

.botons .btn
	padding: 2.25rem 1.05rem
	background: #fff
	display: flex
	justify-content: center
	align-items: center
	border-radius: 50%
	margin: 0 5px

.botons .btn i
	font-size: 2.7rem

.users
	display: flex
	flex-direction: column
	align-items: center
	width: 100%
	height: 100%
	justify-content: center

.users ul
	display: flex
	flex-direction: column
	align-items: center

.users li
	width: 58px
	height: 58px
	display: flex
	justify-content: center
	align-items: center
	margin-bottom: 0.55rem
	border-radius: 50%
	cursor: pointer

.users .active
	background: linear-gradient(262deg,  #009FFF, #ec2F4B)

.users .active > img
	border: 2px solid #fafafa

.users img
	width: 52px
	height: 52px
	border-radius: 50%

.col.data
	padding: 0 1rem

.name_user
	font-size: 1.5rem
	letter-spacing: 0.2px
	text-shadow: 0px 1px 1px #dedede

.age_user
	font-size: 1rem

.city_user
	font-size: 1rem

.info_user
	font-size: 1rem
	text-align: justify

.title
	font-size: 1rem
	font-weight: 600
	margin-top: 0.5rem

@media only screen and (min-width: 602px)
	.card
		height: 55vh

	.image
		height: 100%

	.botons .btn
		padding: 2rem 0.8rem
		margin: 0 5px

	.botons .btn i
		font-size: 2.3rem

@media only screen and (min-width: 768px)
	.card
		height: 562px

	.image
		height: 100%

	.image img
		border-radius: 6px 0px 0px 6px

	.btn-floating.halfway-fab 
		bottom: 1.5rem

	.botons
		bottom: 1.5rem

	.botons .btn
		padding: 2.65rem 1.35rem
		margin: 0 10px

	.botons .btn i
		font-size: 3rem

	.col.data
		padding: 0.5rem 1.6rem

	.name_user
		font-size: 1.8rem

	.age_user
		font-size: 1.3rem
		margin-bottom: 0.2rem

	.city_user
		font-size: 1.1rem

	.title
		font-size: 1.2rem
		margin-top: 1rem
</style>
