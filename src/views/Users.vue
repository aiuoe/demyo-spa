<template lang="pug">
div
	div.menu
		Menu

	div.main
		span.subtitle(v-if="friendrequests.length") Requests
		hr.divider(v-if="friendrequests.length")
		ul.list
			li.item(v-for="friendrequest in friendrequests")
				.photo
					span {{ friendrequest.friend_id.name[0] | capitalize }}
				.data
					span {{ friendrequest.friend_id.name | capitalize }} {{ friendrequest.friend_id.lastname | capitalize }}
					span {{ friendrequest.friend_id.age }} years old
					span {{ friendrequest.friend_id.country | capitalize }}
					.actions
						a.action(@click="friendRequestAccept(friendrequest.id)") 
							i(class="fa fa-user-check")
						a.action(@click="store(user.id)") 
							i(class="fa fa-comment-alt")

		span.subtitle Users
		hr.divider
		ul.list
			li.item(v-for="user in users" v-if="user.id != me_id")
				.photo
					span {{ user.name[0] | capitalize }}
				.data
					span {{ user.name | capitalize }} {{ user.lastname | capitalize }}
					span {{ user.age }} years old
					span {{ user.country | capitalize }}
					.actions
						a.action(@click="sendFriendRequest(user.id)") 
							i(class="fa fa-user-plus")
						a.action(@click="store(user.id)") 
							i(class="fa fa-comment-alt")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios'
import Menu from '@/components/Menu.vue'
import gql from 'graphql-tag';
import { capitalize } from '@/modules/filter'
import { mapState, mapActions, mapGetters } from 'vuex'

@Component({
	components: { Menu },
	filters: {capitalize: capitalize},
	methods:
	{
		...mapActions(['friendSet'])
	},
	computed:
	{
		...mapGetters(['me_id'])
	}
})
export default class Users extends Vue 
{
	users: any = []
	friendrequests: any = []
	friendSet!: (value: number) => void

	async created()
	{
		await this.$apollo.query({
			query: gql(`query
			{
				users(page: 1 first: 10)
			  {
			    data
			    {
			      id
			      name
			      lastname
			      country
			      age
			    }
			  }
			}`)
		})
		.then(res => this.users = res.data.users.data)
		.catch(err => console.log(err))

		await this.$apollo.query({
			query: gql(`query
			{
			  friendrequests(page: 1)
			  {
			    id
			    friend_id
			    {
			      id
			      name
			      lastname
			      country
			      age
			    }
			  }
			}`)
		})
		.then(res => this.friendrequests = res.data.friendrequests)
		.catch(err => console.log(err))
	}

	async mounted()
	{
    const obs = this.$apollo.subscribe({
    query: gql(`subscription
      FriendRequest
      {
        friendRequest
        {
        	id
          friend_id
          {
          	id
          	name
          	lastname
          	country
          	age
          }
        }
    }`)})
    obs.subscribe({
      next: (data: any) => {
      	this.friendrequests.push(data.data.friendRequest)
      },
      error: (error: any) => console.log(error)
    })
	}

	store(id: number)
	{
		this.friendSet(id)
		this.$router.push('conversations').catch(err => err)
	}

	async sendFriendRequest(friend_id: number)
	{
		this.$apollo.mutate({
			mutation: gql(`mutation($friend_id: ID!)
			{
				friendRequest(friend_id: $friend_id)
				{
					id
					friend_id
					{
						id
						name
						lastname
						country
						age
					}
				}
			}`),
			variables: {
				friend_id: friend_id
			}
		})
		.then(res => console.log(res))
		.catch(err => console.log(err))
	}

	async friendRequestAccept(id: number)
	{
		this.$apollo.mutate({
			mutation: gql(`mutation($id: ID!)
			{
				friendRequestAccept(id: $id)
			}`),
			variables: {
				id: id
			}
		})
		.then(res => this.friendrequests.delete(id))
		.catch(err => console.log(err))
	}

	router(path: string)
	{
		this.$router.push({path: path}).catch(err => err)
	}

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

.main
	width: 100vw
	height: 100vh
	padding: 10px 20px 70px 20px
	box-sizing: border-box
	display: flex
	flex-direction: column
	justify-content: flex-start
	align-items: center

.subtitle
	align-self: flex-start
	color: #068DDA

.divider
	width: 100%
	height: 2px
	background-color: #068DDA
	border: 0px

.list
	width: 100%
	display: flex
	flex-direction: column
	justify-content: space-evenly
	align-items: center
	list-style: none
	overflow-y: scroll
	overflow-x: hidden
	padding: 7px 7px 70px 7px
	box-sizing: border-box

.item
	width: 90%
	height: 100px
	margin-bottom: 7px
	display: flex
	border: 1px solid lightgray

.photo
	width: 30%
	height: 100%
	display: flex
	justify-content: center
	align-items: center

	span
		width: 100%
		height: 100%
		background-color: #FE7064
		font-size: 55px
		color: white
		display: flex
		justify-content: center
		align-items: center

.data
	width: 70%
	height: 100%
	padding: 10px
	box-sizing: border-box
	overflow: hidden
	display: flex
	flex-direction: column
	justify-content: center
	align-items: flex-start

.actions
	width: 100%
	height: 30px
	display: flex
	justify-content: space-evenly
	align-items: center

	.action
		width: 45%
		height: 100%
		display: flex
		justify-content: center
		align-items: center
		font-size: 20px
		text-decoration: none
	
		.fa
			color: #1490DF

@media screen and (min-width: 768px)
	.menu
		top: 0
		width: 70px
		height: 100vh

@media screen and (min-width: 1024px)

@media screen and (min-width: 1280px)


</style>
