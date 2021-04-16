<template lang="pug">
div(class="container-custom")
	header(class="top_header")
		div(class="top_header_left")
			img(src="/img/logo2.svg")
			h3 SwingUA
		div(class="top_header_right")
			button(@click="login = true" class="open_login" id="open_login") Авторизоваться
	main
		div(class="cont_title")
			h1(class="title_login") идеальное свидание
		button(@click="signup = true" class="open_register" id="open_register") Зарегистрироваться
		button(class="open--login" @click="login = true" id="open_login-movil") Авторизоваться
		Login(v-if="login" class="animate__animated animate__fadeIn" v-bind:login.sync="login")
		Signup(v-if="signup" class="animate__animated animate__fadeIn" v-bind:signup.sync="signup")
	footer
		h4(class="footer") © SwingUA - 2021
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'

@Component({
	components: { Login, Signup }
})
export default class Home extends Vue 
{
	login: boolean = false
	signup: boolean = false
}
</script>
<style scoped lang="sass">
body
  font-family: 'Roboto', sans-serif
  user-select: none

.container-custom
  width: 100%
  height: 100vh
  max-height: 100vh
  background-size: cover
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2), rgba(0,0,0, 0.5), rgba(0,0,0, 0.6)), url('/img/1.jpg')
  background-position: center
  overflow: hidden

.top_header
  width: 100%
  height: 4rem
  display: flex
  align-items: center
  justify-content: flex-start
  position: fixed
  padding: 0 13px

.top_header_left
    display: flex
    align-items: center
    margin-left: -0.6rem
    margin-top: 0.4rem

.top_header_left h3
  color: #fff
  font-weight: 600
  font-size: 1.85rem
  letter-spacing: -1px
  margin-left: -7px

.top_header_left img
  height: 65px

.top_header_right
  display: none

main
  width: 100%
  height: 100vh
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column

main .cont_title
  display: flex
  justify-content: center
  align-items: center
  margin-bottom: 1.5rem

main .title_login
  font-size: 7.2vw
  color: #fff

main .open_register
  outline: none
  border: none
  min-height: 58px
  width: 80%
  border-radius: 100px
  text-transform: uppercase
  font-weight: 550
  font-size: 0.96rem
  color: #333
  cursor: pointer
  letter-spacing: .04em
  background: #fff

main .open--login
  outline: none
  border: 3px solid #fff
  min-height: 58px
  width: 80%
  border-radius: 100px
  text-transform: uppercase
  font-weight: 550
  font-size: 0.96rem
  color: #fff
  cursor: pointer
  letter-spacing: .04em
  background: none
  margin-top: 1.2rem 

footer
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  position: fixed
  bottom: 10px

footer .footer
  font-size: 12px
  font-weight: 100
  color: #fff
  letter-spacing: 1px
  margin-right: 1rem

@media screen and (min-width: 768px)
  .container-custom
    background-size: cover
    background-image: linear-gradient(rgba(0, 0, 0, .9), rgba(0, 0, 0, 0.3), rgba(0,0,0, 0.4), rgba(0,0,0, 0.7)), url('/img/7.jpg')
    background-position: center

  .top_header
    height: 5rem
    justify-content: space-between
    padding: 0 20px

  .top_header_left h3
    font-size: 2.5rem

  .top_header_left img
    height: 88px

  .top_header_right
    display: flex
    align-items: center
    margin-right: 10px

  .top_header_right .open_login
    outline: none
    border: none
    min-height: 40px
    padding: 0 24px 0 24px
    border-radius: 4px
    text-transform: uppercase
    font-weight: 600
    font-size: 0.96rem
    color: #ff1744
    cursor: pointer
    letter-spacing: .02em
    background-color: #fff

  .top_header_right .open_login:hover
    background: linear-gradient(262deg, rgb(20, 159, 255), rgb(236, 47, 75))
    color: white

  .open--login
    display: none

  main .cont_title
    margin-bottom: 1rem

  main .title_login
    font-size: 5.9vw

  main .open_register
    width: auto
    min-height: 55px
    padding: 0 28px 0 28px
    font-weight: 600
    color: #fff
    background: linear-gradient(262deg, rgb(20, 159, 255), rgb(236, 47, 75))

  main .open_register:hover
    background: linear-gradient(262deg,  rgb(236, 47, 75), rgb(20, 159, 255))
    color: white

  footer
    justify-content: flex-end
</style>
