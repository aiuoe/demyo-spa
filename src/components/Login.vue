<template lang="pug">
div(class="modal_login is_visible_login" id="modal_login")
	div(class="modal_login-container is_visible_login" id="container_login")
		div(class="container_logo")
			a(@click="$emit('update:login', false)" class="close" id="close_login")
				i(class="fa fa-angle-left")
				i(class="fa fa-times-circle")
			div(class="container_img")
				img(class="logo3" src="img/logo3.svg" alt="svg")
				img(class="logo2" src="img/logo2.svg" alt="svg")
			p начнем с входа в систему!
			span(class="text-register") Найдите интересных людей вокруг вас
		div(class="container_form")
			form(@submit.prevent="login" class="modal-form" )
				div(class="input_item")
					div(class="input--i")
						i(class="fa fa-envelope")
					div(class="input--t")
						input(v-model="email" type="email" placeholder="Эл. адрес")
				div(class="input_item")
					div(class="input--i")
						i(class="fa fa-lock")
					div(class="input--t")
						input(v-model="password" type="password" placeholder="пароль" autocomplete="off")
				input(type="submit" class="btn_login" value="авторизоваться")
			div(class="form--text")
				a(href="#") Забыли Ваш пароль?
			div(class="line-login")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component
export default class Login extends Vue 
{
	email: string = ''
	password: string = ''

	async login()
	{
		await axios
    .post(`${process.env.VUE_APP_API_URL}/api/auth/login`, {email: this.email, password: this.password})
		.then((res: any) => 
		{
			window.localStorage.setItem('token', res['data']['access_token'])
			this.$router.push({path: 'dashboard'}).catch((err: any) => err)
		})
		.catch((err: any) => console.log(err))
	}
}
</script>

<style scoped lang="sass">
.modal_login
  top: 0
  left: 0
  right: 0
  bottom: 0
  width: 100vw
  height: 100vh
  display: flex
  overflow: auto
  position: fixed
  opacity: 1
  pointer-events: none
  transition: opacity 0.3s
  align-items: center
  justify-content: center
  background-color: rgba(0,0,0, .8)
  z-index: 999

.modal_login-container
  width: 100%
  height: 100%
  opacity: 0
  pointer-events: none
  transition: opacity 0.1s
  transition: ease 0.9s
  background: #fff
  display: grid
  grid-template-rows: 60% 40%

.is_visible_login
  opacity: 1
  pointer-events: auto

.modal_login .container_logo
  display: flex
  flex-direction: column
  align-items: center
  position: relative
  padding-top: 1.8rem

.modal_login .close
  display: flex
  top: 1rem
  left: 1rem
  position: absolute

.modal_login .close i
  font-size: 1.9rem
  cursor: pointer
  color: #999

.modal_login .fa-times-circle
  display: none

.modal_login .container_img
  width: 12.5rem
  height: 10rem

.modal_login .container_img img
  width: 100%
  height: 100%

.modal_login .container_img .logo2
  display: none

.modal_login p
  font-size: 1.2rem
  font-weight: 600
  margin-top: -1rem
  color: #222

.modal_login .text-register
  display: none

.modal_login .container_form
  display: flex
  align-items: center
  flex-direction: column
  justify-content: flex-start
  position: relative

.modal_login .modal-form
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column

.modal_login .input_item
  width: 87%
  height: 2.55rem
  display: flex
  background: none
  margin-bottom: 1rem
  background: #f0f0f0
  border-radius: 0.6rem
  border: 1px solid #f0f0f0
  transition: 0.3s

.modal_login .input_item .input--i
  width: 2.6rem
  height: 100%
  display: flex
  align-items: center
  justify-content: center
  text-indent: 2px
  background: #f0f0f0
  border-top-left-radius: 0.6rem
  border-bottom-left-radius: 0.6rem

.modal_login .input--i i
  font-size: 1rem
  color: #999

.modal_login .input_item .input--t
  width: 100%
  height: 100%

.modal_login .input--t input
  border: none
  outline: none
  background: none
  font-size: 0.9rem
  font-weight: 600
  color: #444
  padding-right: 0.8rem
  width: 100%
  height: 100%

.modal_login .input--t input::placeholder
  color: #999
  font-weight: 600

.modal_login .input_item:focus-within
  border: 1px solid dodgerBlue
  box-shadow: 0 0 8px 0 dodgerBlue

.modal_login .form--text
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  margin-top: 1.05rem

.modal_login .form--text a
  text-decoration: none
  font-size: 0.89rem
  font-weight: 600
  color: #222

.line-login
  width: 35%
  height: 0.25rem
  margin: 0 auto
  background: #999
  bottom: 1rem
  border-radius: 1rem
  position: absolute

.btn_login
  width: 86%
  height: 2.5rem
  border: none
  color: #fff
  font-size: 0.9rem
  background: linear-gradient(262deg, rgb(20, 159, 255), rgb(236, 47, 75))
  font-weight: 600
  outline: none
  cursor: pointer
  border-radius: 0.6rem
  font-family: 'Roboto', sans-serif
  box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75)
  margin-top: 0.4rem

.btn_login:hover
  background: linear-gradient(262deg, rgb(236, 47, 75), rgb(20, 159, 255))

@media screen and (min-width: 768px)

  .modal_login-container
    width: 26.5rem
    height: 36rem
    border-radius: 0.5rem
    border: 1px solid transparent
    box-shadow: 0 4px 5px rgba(0,0,0,0.5)
    grid-template-rows: 50% 50%

  .modal_login .close
    left: 23.9rem

  .modal_login .close i
    font-size: 1.5rem
    transition-duration: .2s

  .modal_login .fa-times-circle
    display: flex

  .modal_login .fa-angle-left
    display: none
  
  .modal_login .close i:hover
    transition-duration: .2s
    transform: rotate(90deg)

  .modal_login .container_logo
    padding-top: 1.2rem

  .modal_login .container_img
    width: 17rem
    height: 11rem

  .modal_login .container_img .logo3
    display: none
  
  .modal_login .container_img .logo2
    display: flex
  
  .modal_login p
    font-size: 1.55rem
    margin-top: -2rem
  
  .modal_login .text-register
    display: flex
    max-width: 80%
    text-align: center
    font-size: 1rem
    font-weight: 300
    margin-top: 0.4rem

  .modal_login .container_form
    justify-content: center
  
  .modal_login .input_item
    width: 86%
  
  .modal_login .input--t input
    font-size: 1rem
  
  .btn_login
    width: 85%
    font-size: 1rem
  
  .line-login
    width: 30%
</style>
