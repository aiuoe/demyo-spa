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
import gql from 'graphql-tag'
import axios from 'axios'
import '@/modules/array'

@Component({
  methods:
  {
    ...mapActions(['meSet', 'conversationAction'])
  }
})
export default class Menu extends Vue 
{
  meSet!: (value: number) => void
  conversationAction!: (value: any) => void

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
    .then(res => this.meSet(res.data.me.id))
    .catch(err => console.log(err))

    await this.$apollo.query({
      query: gql(`query
      {
        conversations(page:1)
        {
          id
          friend_id
          {
            id
            name
          }
          messages
          {
            id
            conversation_id
            {
             id
            }
            user_id
            {
              id
            }
            message
          }
        }
      }`)
    })
    .then(res => this.conversationAction(res.data.conversations))
    .catch(err => console.log(err))
  }

  async mounted()
  {
    const obs = this.$apollo.subscribe({
    query: gql(`subscription
      MessageUpsert
      {
        messageUpsert
        {
          id
          conversation_id
          {
           id
          }
           user_id
           {
             id
           }
          message
        }
    }`)})
    obs.subscribe({
      next: (data: any) => { 
        this.$store.state.conversations.map((conversation: any) =>
        {
          if(conversation.id == data.data.messageUpsert.conversation_id.id)
            conversation.messages.map((message: any) => 
            {
              if(message.id == data.data.messageUpsert.id)
                message.message = data.data.messageUpsert.message
              else
                conversation.messages.push(data.data.messageUpsert)
            })
        })
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
    .catch(err => console.log(err))
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
