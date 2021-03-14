<template lang="pug">
div
	form(@submit.prevent="login" class="form form-login" v-if="flogin")
		input(v-model="email" class="input" type="text" placeholder="Email")
		input(v-model="password" class="input" autocomplete="off" type="password" placeholder="Password")
		input(type="submit" class="btn-send" value="Login")
		span You do not have an account ? 
			a(@click="show") Create

	form(@submit.prevent="signup" class="form form-signup" v-if="fsignup")
		input(v-model="name" class="input" type="text" placeholder="Name")
		input(v-model="lastname" class="input" type="text" placeholder="Lastname")
		input(v-model="country" class="input" type="text" placeholder="Country")
		input(v-model="age" class="input" type="text" placeholder="Age")
		input(v-model="email" class="input" type="email" placeholder="Email")
		input(v-model="password" class="input" type="password" autocomplete="off" placeholder="Password")
		input(type="submit" class="btn-send" value="signup")
		span Do you already have an account? 
			a(@click="show") Login
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios'

@Component
export default class Login extends Vue 
{
	flogin: boolean = true
	fsignup: boolean = false
	name: string = ''
	lastname: string = ''
	email: string = ''
	password: string = ''
	country: string = ''
	age: string = ''
	registry: boolean = false

	show()
	{
		this.flogin = !this.flogin
		this.fsignup = !this.fsignup
	}

	async login()
	{
		let params =
		{
			email: this.email,
			password: this.password
		}
		await axios.post(`${process.env.VUE_APP_API_URL}/api/auth/login`, params)
		.then(res => 
		{
			window.localStorage.setItem('token', res['data']['access_token'])
			this.$router.push({path: 'dashboard'}).catch(err => err)
		})
		.catch(err => console.log(err))
	}

	async signup()
	{
		let params =
		{
			name: this.name,
			lastname: this.lastname,
			email: this.email,
			password: this.password,
			country: this.country,
			age: this.age,
		}

		await axios.post(`${process.env.VUE_APP_API_URL}/api/auth/signup`, params)
		.then(res => this.$router.push({path: '/'}))
		.catch(err => console.log(err))
	}
}
</script>

<style scoped lang="sass">
.form
	width: 90vw
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	padding: 10px
	box-sizing: border-box

	&-login
		margin-top: 30vh

	&-signup
		margin-top: 15vh

.input
	width: 90%
	height: 40px
	margin-bottom: 7px
	text-indent: 17px
	outline: none
	border: 1px solid #ccc
	background-color: #F2F0F1
	border-radius: 20px
	font-size: 17px

.btn-send
	width: 90%
	height: 40px
	background-color: #0063FC
	color: white
	outline: none
	border: 0px
	border-radius: 20px
	cursor: pointer
	font-size: 17px
	margin-bottom: 37px

@media screen and (min-width: 768px)
	.input
		width: 70%
		height: 40px
		font-size: 17px

	.btn-send
		width: 50%
		height: 40px
		font-size: 17px
		margin-bottom: 37px

@media screen and (min-width: 1024px)
	.input
		width: 50%
		height: 40px
		font-size: 17px

	.btn-send
		width: 30%
		height: 40px
		font-size: 17px
		margin-bottom: 37px

@media screen and (min-width: 1280px)
	.input
		width: 30%
		height: 40px
		font-size: 17px

	.btn-send
		width: 15%
		height: 40px
		font-size: 17px
		margin-bottom: 37px


</style>
