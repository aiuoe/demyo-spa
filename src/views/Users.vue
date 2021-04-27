<template lang="pug">

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gql from 'graphql-tag';
import { capitalize } from '@/modules/filter'
import { mapState, mapActions, mapGetters } from 'vuex'

@Component({
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