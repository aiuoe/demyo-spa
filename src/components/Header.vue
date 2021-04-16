<template lang="pug">
header(class="header center" id="header")
  div(class="container header_container")
    a(href="index.php" class="header_logo")
      div(class="logo_img")
        img(class="images" src="img/logo2.svg" alt="logo")
      div(class="logo_text")
        h1 SwingUA
    nav(class="main_nav")
      a(@click="router('dashboard')" class="nav_item")
        i(class="fa fa-search")
        span найти
      a(@click="router('conversations')" class="nav_item")
        i(class="fa fa-envelope")
        span Сообщения
      a(@click="router('conversations')" class="nav_item")
        i(class="fa fa-map-marker-alt")
        span поблизости
      a(@click="router('conversations')" class="nav_item")
        i(class="fa fa-heart")
        span Yведомления
      a(@click="router('profile')" class="nav_item active")
        i(class="fa fa-user-alt")
        span профиль
  div(class="border")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState, mapActions } from 'vuex'
// queries and mutations
import { CONVERSATION_ALL } from '@/graphql/conversation'
import { CONVERSATION_SUBSCRIPTION } from '@/graphql/conversation'
import { MESSAGE_ALL } from '@/graphql/message'
import { MESSAGE_SUBSCRIPTION } from '@/graphql/message'
import { FRIEND_ALL } from '@/graphql/friend'
import { FRIEND_REQUEST_ALL } from '@/graphql/friend'
// others
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
export default class Header extends Vue 
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
    const messageSubscribe = this.$apollo.subscribe({query: MESSAGE_SUBSCRIPTION})
    messageSubscribe.subscribe({
      next: (data: any) => {
        this.messageUpsert(data.data.messageUpsert)
      },
      error: (error: any) => console.log(error)
    })
    
    const conversationSubscribe = this.$apollo.subscribe({query: CONVERSATION_SUBSCRIPTION})
    conversationSubscribe.subscribe({
      next: (data: any) => {
        this.conversationUpsert(data.data.conversationUpsert)
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

<style scoped lang="sass">
.header
  width: 100%
  height: 3.2rem
  background: #fff
  box-shadow: 0px 0px 2px 1px rgba(0,0,0, .15)
  position: fixed
  z-index: 9

.header_container
  display: flex
  align-items: center
  justify-content: flex-start

.header_logo
  width: auto
  height: 100%
  color: #333
  text-decoration: none
  outline: none

.header_logo .logo_img
  display: none

.header_logo .logo_text
  width: 100%
  height: 100%
  display: flex
  justify-content: flex-start
  align-items: center

.header_logo .logo_text h1
  font-size: 1.5rem
  color: #222

.main_nav
  display: none

.border
  height: 2px
  width: 100%
  position: absolute
  bottom: 0
  background: linear-gradient(262deg, rgb(20, 159, 255), rgb(236, 47, 75))

@media screen and (min-width: 568px)
  .header
    height: 4.7rem
    background: #fff
    box-shadow: 0px 0px 4px 4px rgba(0,0,0, .15)
    transition: 0.5s

  .header_container
    display: flex
    justify-content: space-between
    align-items: center

  .header_logo
    width: 15rem
    color: #333
    display: flex
    justify-content: center
    align-items: center

  .header_logo .logo_img
    display: flex
    width: 12rem
    height: 100%

  .header_logo .logo_img img
    margin-left: -1rem

  .header_logo .logo_text
    width: 100%
    height: 100%
    margin-left: -1.5rem

  .header_logo .logo_text h1
    font-size: 2rem
    color: #333

  .main_nav
    display: flex
    justify-content: space-between
    align-items: center

  .main_nav .nav_item
    display: flex
    justify-content: center
    align-items: center
    text-decoration: none
    color: #666
    border-radius: 4px
    margin-left: 0.5rem
    padding: 0.8rem 0rem
    width: 2.7rem
    cursor: pointer

  .main_nav .nav_item:hover
    color: #fff
    background-color: rgba(236, 47, 75, .93)
    transition: background-color 0.1s ease-out
    box-shadow: 0px 0px 2px 1px rgba(0,0,0, .15)

  .main_nav .nav_item.active
    color: #fff
    background-color: rgba(236, 47, 75, .93)
    box-shadow: 0px 0px 2px 1px rgba(0,0,0, .15)

  .main_nav .nav_item span
    display: none

@media screen and (min-width: 1034px)
  .main_nav .nav_item span
    display: flex
    font-size: 1rem

  .main_nav .nav_item i
    margin-right: 0.4rem

  .main_nav .nav_item
    width: auto
    padding: 0.8rem 0.8rem
</style>
