<template lang="pug">
div(class="container-fluid")
	Header
	span(v-if="!user_all.length") no hay usuarios para mostrar
	<main class="container" v-if="user_all.length">
		<div class="row section">
			<div class="card b__radius">
				<div class="card-content card_center">
					<div class="title">
						<span>люди поблизости</span>
					</div>
					<div class="flex_box">
						<div class="tools">
							<a class="waves-effect waves-light btn-small right blue darken-1 b__radius modal-trigger">
								<i class="material-icons center">tune</i>
							</a>
						</div>
						<div class="input-field">
							<select v-model="selection">
								<option value="all" selected>все</option>
								<option value="new">новый</option>
								<option value="online">онлайн</option>
							</select>
						</div>
					</div>
				</div>
				<div class="card-content setting" id="setting"></div>
				<div class="card-content box_users">
					<ul class="row content__img">
						<li v-for="user in user_all" class="col s12 m4 l3">
							<img class="responsive-img b__radius" src="img/user.jpg" alt="">
							<a href="#" class="data">
								<div class="data_title">
									<span class="title"> {{ user.name | extract(10) }}</span>
									<span class="age"> {{ user.birth_date | age }} </span>
									<div class="status green"></div>
								</div>
								<span class="city"><i class="material-icons">place</i>Россия, {{ user.city_id.name }}</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</main>
	Footer
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions, mapGetters } from 'vuex'
import { capitalize, upperCase,  extract, age } from '@/modules/filter'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

declare const M: any;

@Component({
	components: { Header, Footer },
	filters: {capitalize: capitalize, extract: extract, upperCase: upperCase, age: age},
	computed: 
	{
		...mapGetters(['me_id', 'user_all'])
	}
})
export default class Login extends Vue 
{
	selection: any = null

	select()
	{
		console.log(this.$refs)
	}


	async mounted()
	{
	  var elems = document.querySelectorAll('select');
	  var options = { }
	  var instances = M.FormSelect.init(elems, options);
	}

	async updated()
	{
		console.log(this.selection)
	}
}
</script>

<style scoped lang="scss">
.container-fluid
{
	width: 100vw;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	overflow-x: hidden;
}

main
{
	padding-bottom: 2.5rem;
}

.input-field
{
	margin: 0 0 0 0;
	padding: 0 0 0 0;
}

.card_center
{
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: -1rem;
}

.flex_box
{
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-top: 1rem;
}

.flex_box .tools
{
	margin-right: 1.3rem;
}

.card-content span
{
	font-size: 1.3rem;
}

.setting
{
	background: #f6f6f6;
	border-top: 2px solid #e0e0e0;
	height: 150px;
	transition: all 2s;
	display: none;
}

.row.content__img
{
	margin-bottom: 0;
	margin-top: 0;
}

.content__img li
{
	margin-top: 1rem;
	position: relative;
}

.card-content.box_users
{
	padding-top: 0.5rem;
}

.content__img li .data
{
	width: 100%;
	bottom: 0;
	color: #fff;
	display: flex;
	flex-direction: column;
	position: absolute;
	padding: 0 17px 18px 17px; 
}

.content__img li .data_title
{
	display: flex;
	align-items: center;
}

.content__img li .data .title
{
	color: #fff;
	font-size: 22px;
	font-weight: 700;
	letter-spacing: 0.2px;
	text-indent: 2px;
	text-shadow: 1px 1px 3px #444;
	margin-right: 10px;
}

.content__img li .data .age
{
	font-size: 19px;
	font-weight: 700;
	letter-spacing: 0.2px;
	text-indent: 2px;
	text-shadow: 1px 1px 3px #444;
}

.content__img li .data .city
{
	font-size: 17px;
	margin-top: -4px;
	text-shadow: 1px 1px 3px #444;
	display: flex;
	align-items: center;
}

.content__img li .data .city i
{
	font-size: 19px;
}

@media only screen and (min-width: 550px)
{
	.card_center
	{
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.flex_box
	{
		justify-content: flex-end;
		margin-top: 0;
	}

	.flex_box .input-field
	{
		width: 45%;
	}
}

@media only screen and (min-width: 768px)
{
	main
	{
		padding-bottom: 0rem;
	}
}
</style>
