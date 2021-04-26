<template lang="pug">
div(class="father")
	<main class="main__login">
		<header class="header__login">
			<div class="container__login header__box">
				<div class="center__login one">
					<span>Россия</span>
				</div>
				<div class="center__login two">
					<p>SwingRU</p>
				</div>
				<div class="center__login three">
					<a @click="toSignup" class="btn waves-effect waves-light btn__login">регистрироваться</a>
				</div>
			</div>
		</header>
		<div class="main__box container__login row animate__animated animate__fadeIn">
			<div class="box__register">
				<div class="box1">
					<div class="center">
						<p class="title">Авторизоваться</p>
					</div>
					<div class="row input__box">
						<form @submit.prevent="login" class="col s12">
							<div class="input-field col s12">
								<input v-model="email" type="email" id="email" class="validate" required="">
								<label for="email">электронное письмо</label>
								<span class="helper-text" data-error="напишите действующий адрес электронной почты" data-success=""></span>
							</div>
							<div class="input-field col s12">
								<input v-model="password" id="password" type="password" class="validate" required="">
										<label for="password">пароль</label>
							</div>
							<div class="center">
								<button class="btn red darken-2 border__radius waves-effect waves-light" type="submit">авторизоваться</button>
							</div>
						</form>
					</div>
					<div class="center f_password">
						<a href="#" class="password">Забыли свой пароль?</a>
					</div>
				</div>
				<div class="box2 center__login">
					<img src="img/logo6.svg" alt="logo">
				</div>
			</div>
		</div>
	</main>
	<footer class="footer__login">
		<div class="divider__login"></div>
		<p>© 2021 Авторские права - SwingRU.com</p>
	</footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

declare const M: any;

@Component
export default class Login extends Vue 
{
	email: string = ''
	password: string = ''

	toSignup()
	{
		this.$router.push({path: '/'})
	}

	async login()
	{
		await axios
    .post(`${process.env.VUE_APP_API_URL}/api/auth/login`, {email: this.email, password: this.password})
		.then((res: any) => 
		{
			window.localStorage.setItem('token', res['data']['access_token'])
			this.$router.push({path: 'dashboard'}).catch((err: any) => err)
		})
		.catch((err: any) => M.toast({html: 'неверный пароль', classes: 'red darken-3'}))
	}
}
</script>

<style scoped lang="scss">
.father
{
	background: #f6f6f6;
}

.container__login
{
	margin: 0 auto;
	width: 88%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.center__login
{
	display: flex;
	justify-content: center;
	align-items: center;
}

.header__login
{
	width: 100%;
	height: 230px;
	z-index: -1;
	background-size: cover;
	background-image: linear-gradient(rgba(0, 0, 0, .6), rgba(0,0,0, .03)), url('/img/2.jpg');
	background-position: center;
	position: absolute;
	top: 0;
	left: 0;
}

.header__box
{
	height: 4.3rem;
	display: flex;
	align-items: center;
	overflow: hidden;
}

.header__login .one
{
	display: none;
}

.header__login .three
{
	display: none;
}

.header__login span
{
	color: #fff;
	font-size: 1.25rem;
}

.header__login p
{
	color: #fff;
	font-size: 2.5rem;
	font-weight: 600;
	letter-spacing: -1px;
	text-shadow: 1px 1px 3px #444s;
	margin: 0;
}

.border__radius
{
	border-radius: 7px;
	color: #fff;
}

.btn.btn__login
{
	background-color: #fff;
	color: #ff1744;
	font-weight: 600;
	border-radius: 7px;
}

.btn.btn__login:hover
{
	color: #fff;
	background: #cf2f4b;
}

.main__login
{
	z-index: 9;
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
}

.main__box.container__login
{
	width: 85%;
	margin-top: 6rem;
	margin-bottom: 4rem;
	border-radius: 10px;
	box-shadow: 0 20px 40px rgb(0 0 0 / 10%);
	overflow: hidden;
}

.main__login .box__register
{
	width: 100%;
	height: 83.5vh;
	background: #fafafa;
	display: flex;
}

.main__login .box__register .box1
{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
}

.box__register .row .input-field
{
	margin-top: 0rem;
	margin-bottom: 0.5rem;
}

.box__register .row .input-field:nth-child(2)
{
	margin-bottom: 1.5rem;
}

.main__login .box__register .box1 .title
{
	font-size: 2rem;
	font-weight: 500;
	margin-top: 0;
}

.main__login .box__register .box1 .f_password
{
	position: absolute;
	bottom: 1.8rem;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.main__login .box__register .box1 .password
{
	color: #777;
	font-size: 1.1rem;
}

.main__login .box__register .box2
{
	width: 50%;
	height: 100%;
	background: #f6f6f6;
	border-top-right-radius: 10px;
	border-bottom-right-radius: 10px;
	display: none;
}

.main__login .box__register .box2 img
{
	width: 65%;
	
	height: 65%;
}

.input__box
{
	width: 97%;
}

.footer__login
{
	width: 100%;
	height: 3rem;
	background: #f6f6f6;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	padding: 0 6%;
	overflow: hidden;
}

.footer__login .divider__login
{
	top: 0;
	width: 90%;
	height: 1px;
	position: absolute;
	background-color: #dedede;
}

.footer__login p
{
	font-size: 0.85rem;
	color: #767676;
	letter-spacing: 0.5px;
}

@media only screen and (min-width: 568px){
	.header__login .three
	{
		display: flex;
	}

	.header__login .two
	{
		margin-right: -9rem;
	}

	.input__box
	{
		width: 90%;
	}
}

@media only screen and (min-width: 768px)
{
	.header__login .one
	{
		display: flex;
	}

	.main__login .box__register .box2
	{
		display: flex;
	}

	.main__login .box__register .box1
	{
		width: 50%;
	}

	.main__box.container__login
	{
		width: 71%;
	}

	.header__login
	{
		// background-image: linear-gradient(rgba(0, 0, 0, .45), rgba(0,0,0, .03)), url(img/2.jpg);
	}

	.main__login .box__register .box1 .f_password
	{
		bottom: 1.3rem;
	}
}
</style>
