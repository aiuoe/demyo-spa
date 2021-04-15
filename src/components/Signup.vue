<template lang="pug">
div(class="modal_register is_visible_register" id="modal_register")
  div(class="modal_register_container is_visible_register" id="container_register")
    div(class="container_logo")
      div(@click="$emit('update:signup', false)" class="close" id="close_register")
        i(class="fa fa-angle-left")
        i(class="fa fa-times-circle")
      div(class="container_img")
        img(class="logo3" src="img/logo3.svg" alt="svg")
        img(class="logo2" src="img/logo2.svg" alt="svg")
      p регистр
      span(class="text-register") Миллионы людей хотят встретить кого-то вроде вас
    div(class="container_form")
      form(@submit.prevent="signup" class="modal--form")
        div(class="input_item")
          div(class="input--i")
            i(class="fa fa-id-card")
          div(class="input--t")
            input(v-model="name" type="text" placeholder="имя")
        div(class="input_item")
          div(class="input--i")
            i(class="fa fa-calendar-alt")
          div(class="input--t")
            input(v-model="age" type="number" min="18" max="60" placeholder="возраст")
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
        input(type="submit" class="btn_register" value="регистр")
      div(class="form--text")
      div(class="line-register")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component
export default class Signup extends Vue 
{
  name: string = ''
  lastname: string = ''
  email: string = ''
  password: string = ''
  country: string = ''
  sex: string = ''
  age: number | null = null

  async signup()
  {
   await axios
   .post(`${process.env.VUE_APP_API_URL}/api/auth/signup`, {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      country: this.country,
      age: this.age,
      sex: this.sex
   })
   .then((res: any) => 
   {
      this.$emit('update:signup', false)
      this.$emit('update:login', true)
   })
   .catch(err => console.log(err))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.modal_register
  top: 0
  left: 0
  right: 0
  bottom: 0
  width: 100vw
  height: 100vh
  display: flex
  overflow: auto
  position: fixed
  opacity: 0
  pointer-events: none
  transition: opacity 0.3s
  align-items: center
  justify-content: center
  background-color: rgba(0,0,0, .8)
  z-index: 999

.modal_register_container
  width: 100%
  height: 100%
  opacity: 0
  pointer-events: none
  transition: opacity 0.1s
  transition: ease 0.9s
  background: #fff
  display: grid
  grid-template-rows: 48% 52%

.is_visible_register
  opacity: 1
  pointer-events: auto

.modal_register .container_logo
  display: flex
  flex-direction: column
  align-items: center
  position: relative
  padding-top: 1.8rem

.modal_register .close
  display: flex
  top: 1rem
  left: 1rem
  position: absolute

.modal_register .close i
  font-size: 1.9rem
  cursor: pointer
  color: #999

.modal_register .fa-times-circle
  display: none

.modal_register .container_img
  width: 12.5rem
  height: 10rem

.modal_register .container_img img
  width: 100%
  height: 100%

.modal_register .container_img .logo2
  display: none

.modal_register p
  font-size: 1.2rem
  font-weight: 600
  margin-top: -1rem
  color: #222

.modal_register .text-register
  display: none

.modal_register .container_form
  display: flex
  align-items: center
  flex-direction: column
  justify-content: flex-start
  position: relative

.modal_register .modal--form
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column

.modal_register .input_item
  width: 87%
  height: 2.55rem
  display: flex
  background: none
  margin-bottom: 1rem
  background: #f0f0f0
  border-radius: 0.6rem
  border: 1px solid #f0f0f0
  transition: 0.3s

.modal_register .input_item .input--i
  width: 2.6rem
  height: 100%
  display: flex
  align-items: center
  justify-content: center
  text-indent: 2px
  background: #f0f0f0
  border-top-left-radius: 0.6rem
  border-bottom-left-radius: 0.6rem

.modal_register .input--i i
  font-size: 1rem
  color: #999

.modal_register .input_item .input--t
  width: 100%
  height: 100%

.modal_register .input--t input
  border: none
  outline: none
  background: none
  font-size: 0.9rem
  font-weight: 600
  color: #444
  padding-right: 0.8rem
  width: 100%
  height: 100%

.modal_register .input--t input::placeholder
  color: #999
  font-weight: 600

.modal_register .input_item:focus-within
  border: 1px solid dodgerBlue
  box-shadow: 0 0 8px 0 dodgerBlue

.modal_register .form--text
  width: 100%
  display: flex
  justify-content: center
  align-items: center

.modal_register .form--text a
  text-decoration: none
  font-size: 0.89rem
  font-weight: 600
  color: #222

.line-register
  width: 35%
  height: 0.25rem
  margin: 0 auto
  background: #999
  bottom: 1rem
  border-radius: 1rem
  position: absolute

.btn_register
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

.btn_register:hover
  background: linear-gradient(262deg, rgb(236, 47, 75), rgb(20, 159, 255))

@media screen and (min-width: 768px)

  .modal_register_container
    width: 26.5rem
    height: 36rem
    border-radius: 0.5rem
    border: 1px solid transparent
    box-shadow: 0 4px 5px rgba(0,0,0,0.5)
    grid-template-rows: 35% 65%

  .modal_register .close
    left: 23.9rem

  .modal_register .close i
    font-size: 1.5rem
    transition-duration: .2s

  .modal_register .fa-times-circle
    display: flex

  .modal_register .fa-angle-left
    display: none
    
  .modal_register .close i:hover
    transition-duration: .2s
    transform: rotate(90deg)

  .modal_register .container_logo
    padding-top: 0.5rem

  .modal_register .container_img
    width: 15rem
    height: 11rem

  .modal_register .container_img .logo3
    display: none

  .modal_register .container_img .logo2
    display: flex

  .modal_register p
    font-size: 1.45rem
    margin-top: -2rem
  
  .modal_register .text-register
    display: flex
    max-width: 80%
    text-align: center
    font-size: 1rem
    font-weight: 300
    margin-top: 0.4rem

  .modal_register .container_form
    justify-content: center

  .modal_register .input_item
    width: 86%

  .modal_register .input--t input
    font-size: 1rem

  .btn_register
    width: 85%
    font-size: 1rem
</style>
