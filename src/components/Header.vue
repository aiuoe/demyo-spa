<template lang="pug">
header(class="navbar-fixed")
  nav(class="bg__header")
    div(class="nav-wrapper container")
      a(href="#!" class="brand-logo left") SwingRU
      ul(class="right hide-on-small-only" v-if="nav")
        li
          router-link(to="/match")
            i(class="material-icons") favorite_border
        li
          router-link(to="/conversations")
            i(class="material-icons") mail_outline
        li
          router-link(to="/search")
            i(class="material-icons") place

        li
          a(@click="show_notify = !show_notify")
            i(class="material-icons") notifications_none
        li
          a(@click="show" class="dropdown-trigger valign-wrapper" data-target="dropdown1")
            i(class="material-icons") account_circle
            i(class="material-icons") arrow_drop_down
          ul(id="dropdown1" class="dropdown-content b__radius" v-show="dropdown")
            li
              router-link(:to="{name: 'profile', params: { id: me_id}}" class="grey-text text-darken-2")
                i(class="material-icons left") account_circle
                span профиль
            li
              a(href="#" class="grey-text text-darken-2")
                i(class="material-icons") settings
                span параметр
            li
              a(href="#" class="grey-text text-darken-2")
                i(class="material-icons") mode_edit
                span пароль
            li(class="divider")
            li
              a(@click="logout" class="grey-text text-darken-2")
                i(class="material-icons") power_settings_new
                span выйти  
  Notifications(v-if="show_notify")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState, mapActions, mapGetters } from 'vuex'
// queries and mutations
import { CONVERSATION_ALL } from '@/graphql/conversation'
import { CONVERSATION_SUBSCRIPTION } from '@/graphql/conversation'
import { MESSAGE_ALL } from '@/graphql/message'
import { MESSAGE_SUBSCRIPTION } from '@/graphql/message'
import { FRIEND_ALL } from '@/graphql/friend'
import { FRIEND_REQUEST_ALL } from '@/graphql/friend'
import { NOTIFICATION_SUBSCRIPTION, NOTIFICATION_ALL } from '@/graphql/notification'
import { USER_ALL, ME_ID, USER_EVERY } from '@/graphql/user'
import Notifications from '@/components/Notifications.vue'

// others
import gql from 'graphql-tag'
import axios from 'axios'
import '@/modules/array'

@Component({
  components: { Notifications },
  computed: 
  {
    ...mapGetters(['me_id'])
  },
  methods:
  {
    ...mapActions([
      'meSet', 
      'friendUpsert', 
      'messageUpsert', 
      'notificationUpsert', 
      'conversationUpsert', 
      'friendRequestUpsert',
      'userUpsert',
      'userAllUpsert'
    ])
  }
})
export default class Header extends Vue 
{

  meSet!: (value: number) => void
  conversationUpsert!: (value: any) => void
  messageUpsert!: (value: any) => void
  notificationUpsert!: (value: any) => void
  friendUpsert!: (value: any) => void
  friendRequestUpsert!: (value: any) => void
  userUpsert!: (value: any) => void
  userAllUpsert!: (value: any) => void
  dropdown: boolean = false
  nav: boolean = true
  show_notify: boolean = false

  show()
  {
    this.dropdown = !this.dropdown
  }

  async created()
  {
    if (location.pathname == '/complete' || location.pathname == '/photos')
      this.nav = false

    this.$apollo.query({query: ME_ID})
    .then((res: any) => this.meSet(res.data.me.id))
    .catch(error => this.force_out())

    // conversations
    await this.$apollo.query({query: CONVERSATION_ALL, variables: {page: 1}})
    .then((res: any) => this.conversationUpsert(res.data.conversations))
    .catch(error => this.force_out())

    // messages
    await this.$apollo.query({query: MESSAGE_ALL, variables: {page: 1}})
    .then((res: any) => this.messageUpsert(res.data.messages))
    .catch(error => this.force_out())

    // notifications
    await this.$apollo.query({query: NOTIFICATION_ALL})
    .then((res: any) => this.notificationUpsert(res.data.notifications))
    .catch(error => this.force_out())

    // friends
    await this.$apollo.query({query: FRIEND_ALL, variables: {page: 1}})
    .then((res: any) => this.friendUpsert(res.data.friends))
    .catch(error => this.force_out())

    // friends requests
    await this.$apollo.query({query: FRIEND_REQUEST_ALL, variables: {page: 1}})
    .then((res: any) => this.friendRequestUpsert(res.data.friendrequests))
    .catch(error => this.force_out())

    // users
    await this.$apollo.query({query: USER_ALL, variables: {page: 1}})
    .then((res: any) => this.userUpsert(res.data.users))
    .catch(error => this.force_out())

    await this.$apollo.query({query: USER_EVERY})
    .then((res: any) => this.userAllUpsert(res.data.users_all))
    .catch(error => this.force_out())
  }

  async mounted()
  {
    const messageSubscribe = this.$apollo.subscribe({query: MESSAGE_SUBSCRIPTION})
    messageSubscribe.subscribe({
      next: (data: any) => {
        this.messageUpsert(data.data.messageUpsert)
      },
      error: (error: any) => this.force_out()
    })
    
    const conversationSubscribe = this.$apollo.subscribe({query: CONVERSATION_SUBSCRIPTION})
    conversationSubscribe.subscribe({
      next: (data: any) => {
        this.conversationUpsert(data.data.conversationUpsert)
      },
      error: (error: any) => this.force_out()
    })

    const notificationSubscribe = this.$apollo.subscribe({query: NOTIFICATION_SUBSCRIPTION})
    notificationSubscribe.subscribe({
      next: (data: any) => {
        this.notificationUpsert(data.data.notificationSubscription)
      },
      error: (error: any) => this.force_out()
    })
  }

  router(path: string)
  {
    this.$router
    .push({path: path})
    .catch(err => err)
  }

  async logout()
  {
    return await axios
    .post(`${process.env.VUE_APP_API_URL}/api/auth/logout`, {}, {"headers": {"Authorization": `Bearer ${window.localStorage.getItem('token')}`}})
    .then(res => this.force_out())
    .catch(error => this.force_out())
  }

  force_out()
  {
    window.localStorage.clear()
    this.$router.push({ path: '/' })
    location.reload()
  }
}
</script>

<style scoped lang="sass">
#dropdown1
  width: 100px
  opacity: 1
  display: block
  top: 70px
  left: 78%

header
  width: 100vw

.header
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
    background-color: #3A73B8
    transition: background-color 0.1s ease-out
    box-shadow: 0px 0px 2px 1px rgba(0,0,0, .15)

  .active
    color: #fff
    background-color: #3A73B8
    box-shadow: 0px 0px 2px 1px rgba(0,0,0, .15)

  .main_nav .nav_item span
    display: none

  #dropdown1
    width: 100px
    opacity: 1
    display: block
    top: 70px
    left: 78%

@media screen and (min-width: 1024px)
  .main_nav .nav_item span
    display: flex
    font-size: 1rem

  .main_nav .nav_item i
    margin-right: 0.4rem

  .main_nav .nav_item
    width: auto
    padding: 0.8rem 0.8rem

  #dropdown1
    width: 100px
    opacity: 1
    display: block
    top: 70px
    left: 83%

@media screen and (min-width: 1440px)
  .main_nav .nav_item span
    display: flex
    font-size: 1rem

  .main_nav .nav_item i
    margin-right: 0.4rem

  .main_nav .nav_item
    width: auto
    padding: 0.8rem 0.8rem
    
  #dropdown1
    width: 100px
    opacity: 1
    display: block
    top: 70px
    left: 88%
</style>
