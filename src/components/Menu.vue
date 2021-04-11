<template lang="pug">
nav.nav
  ul(class="list")
    li(class="item")
      a(@click="router('users')" class="link")
        i(class="fa fa-users")
    li(class="item")
      a(@click="router('conversations')" class="link")
        i(class="fa fa-comments")
    li(class="item")
      a(@click="router('dashboard')" class="link")
        i(class="fa fa-home")
    li(class="item")
      a(@click="router('notifications')" class="link")
        i(class="fa fa-bell")
    li(class="item")
      a(@click="logout" class="link")
        i(class="fa fa-sign-out-alt")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState, mapActions } from 'vuex'
import { CONVERSATION_ALL } from '@/graphql/conversation'
import { MESSAGE_ALL } from '@/graphql/message'
import { MESSAGE_SUBSCRIPTION } from '@/graphql/message'
import { FRIEND_ALL } from '@/graphql/friend'
import { FRIEND_REQUEST_ALL } from '@/graphql/friend'
import gql from 'graphql-tag'
import axios from 'axios'
import '@/modules/array'

@Component({
  methods:
  {
    ...mapActions([
      'meSet', 
      'friendUpsert', 
      'messageUpsert', 
      'conversationUpsert', 
      'friendRequestUpsert'
    ])
  }
})
export default class Menu extends Vue 
{
  meSet!: (value: number) => void
  conversationUpsert!: (value: any) => void
  messageUpsert!: (value: any) => void
  friendUpsert!: (value: any) => void
  friendRequestUpsert!: (value: any) => void

  async created()
  {
    this.$apollo.query({
      query: gql(`query
      {
        me
        {
          id
        }
      }`)
    })
    .then((res: any) => this.meSet(res.data.me.id))
    .catch(error => console.log(error))

    // conversations
    await this.$apollo.query({query: CONVERSATION_ALL, variables: {page: 1}})
    .then((res: any) => this.conversationUpsert(res.data.conversations))
    .catch(error => console.log(error))

    // messages
    await this.$apollo.query({query: MESSAGE_ALL, variables: {page: 1}})
    .then((res: any) => this.messageUpsert(res.data.messages))
    .catch(error => console.log(error))

    // friends
    await this.$apollo.query({query: FRIEND_ALL, variables: {page: 1}})
    .then((res: any) => this.friendUpsert(res.data.friends))
    .catch(error => console.log(error))

    // friends requests
    await this.$apollo.query({query: FRIEND_REQUEST_ALL, variables: {page: 1}})
    .then((res: any) => this.friendRequestUpsert(res.data.friendrequests))
    .catch(error => console.log(error))
  }

  async mounted()
  {
    const obs = this.$apollo.subscribe({query: MESSAGE_SUBSCRIPTION})
    obs.subscribe({
      next: (data: any) => {
        console.log(data)
        this.messageUpsert(data.data.messageUpsert)
      },
      error: (error: any) => console.log(error)
    })
  }

  router(path: string)
  {
    this.$router.push({path: path}).catch(err => err)
  }

  async logout()
  {
    return await axios
    .post(`${process.env.VUE_APP_API_URL}/api/auth/logout`, {}, {"headers": {"Authorization": `Bearer ${window.localStorage.getItem('token')}`}})
    .then(res => 
    {
      window.localStorage.clear()
      this.$router.push({ path: '/' })
    })
    .catch(error => console.log(error))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.nav
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center

.list
  display: flex
  justify-content: space-evenly
  align-items: center
  list-style: none
  width: 100%
  height: 100%

  .item
    width: calc(100% / 4)
    height: 100%
    display: flex
    justify-content: center
    align-items: center

    .link
      text-decoration: none

      .fa
        font-size: 35px
        color: white


@media screen and (min-width: 768px)
  .list
    height: 50%
    flex-direction: column
    justify-content: space-around
    align-items: center

</style>
