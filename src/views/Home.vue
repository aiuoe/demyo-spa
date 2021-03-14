<template>
	<div class="landing_page">
		<div class="landing_logo">
			<img src="../assets/logo.png" alt="svg" class="logo">
			<img src="../assets/c.svg" alt="svg" class="vector">
			<h2 class="landing--name">SwingUA</h2>
		</div>
		<div class="landing_btn">
			<div class="text-name">
				<h1>SwingUA</h1>
				<p>Место для подключения</p>
			</div>
			<button class="btn landing--btn" id="open-login">Авторизоваться</button>
			<span class="landing--text">У вас нет аккаунта? <a href="#" id="open-register">Зарегистрироваться</a></span>
			<div class="line"></div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
<style scoped lang="scss">
.landing_page
{
	width: 100%;
	height: 100vh;
	background-size: cover;
	background-position: center;
	background-attachment: fixed;
	background-image: linear-gradient(rgba(255, 105, 92, .9), rgba(253, 42, 123, .9)), url(../assets/1.jpg);
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 71% 29%;

}

.landing_logo
{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.landing_logo img
{
	width: 30%;
	height: 25%;
	user-select: none;
}

.landing_logo .landing--name
{
	font-size: 2rem;
	margin-top: 0.2rem;
	letter-spacing: 0.2rem;
	color: var(--text-secundary);
}

.landing_logo .vector
{
	display: none;
}

.landing_btn .text-name
{
	display: none;
}

.landing_btn
{
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	position: relative;
}

.landing_btn .landing--btn
{
	color: #2c2c2c;
	background: var(--text-secundary);
	box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
	padding: 0.75rem 0;
}

.landing_btn .landing--btn:hover
{
	background-color: #f0f0f0;
	transition: background-color 0.9s ease-out;
}

.landing_btn .landing--text
{
	color: var(--text-secundary);
	font-size: 0.9rem;
	margin-top: 1rem;
	padding: 0 0 1.2rem 0;
	margin-bottom: 1.2rem;
}

.landing_btn .landing--text a
{
	color: var(--text-secundary);
	text-decoration: none;
	font-weight: 600;
}

.landing_btn .landing--text a:hover
{
	text-decoration: underline;
}

@media screen and (min-width: 768px){
	.landing_page
	{
		background-size: cover;
		background-position: center;
		background-image: linear-gradient(rgba(253, 42, 123, .7), rgba(255, 105, 92, .25)), url(../assets/3.jpg);
	}

	.landing_logo img
	{
		width: 27%;
		height: 36%;
	}

	.landing_logo .landing--name
	{
		font-size: 3rem;
		margin-top: 0.2rem;
		letter-spacing: 0.1rem;
	}

	.landing_btn
	{
		justify-content: center;
	}

	.landing_btn .landing--btn
	{
		width: 38%;
	}
}

@media screen and (min-width: 1024px){

	.landing_page
	{
		display: grid;
		grid-template-columns: 50% 50%;
		grid-template-rows: 100%;
	}

	.landing_logo .landing--name
	{
		display: none;
	}

	.landing_logo img
	{
		width: 67%;
		height: 67%;
	}

	.landing_logo .logo
	{
		display: none;
	}

	.landing_logo .vector
	{
		display: flex;
	}

	.landing_btn .text-name
	{
		display: flex;
		flex-direction: column;
		text-align: center;
		margin-bottom: 1.7rem;
	}

	.landing_btn .text-name h1
	{
		color: var(--text-secundary);
		font-size: 6rem;
		margin-bottom: 0.3rem;
	}

	.landing_btn .text-name p
	{
		color: var(--text-secundary);
	}

	.landing_btn
	{
		grid-row: 1/2;
	}

	.landing_btn .landing--btn
	{
		padding: 0.9rem 0;
	}

	.landing_btn .landing--btn:hover
	{
		color: var(--text-secundary);
		background-color: #d93783;
		transition: background-color 0.9s ease-out;
	}

	.landing_btn .landing--text
	{
		margin-top: 1.5rem;
		margin-bottom: 0;
	}
}
</style>
