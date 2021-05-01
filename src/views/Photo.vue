<template lang="pug">
div(class="container-fluid")
	Header
	<main class="container section">
		<div class="row">
			<div class="col s12">
				<div class="card b__radius">
					<div class="card-content">
						<div class="section">
							<span class="card-title center">изображение профиля</span>
								<p class="center">SwingRU веселее, если вы знаете людей, которые вам нравятся, Загрузите фото профиля, чтобы люди вокруг вас видели вас</p>
						</div>
					</div>
					<div class="divider box"></div>
					<form @submit.prevent="upload">
						<div class="card-content">
							<div class="row">
								<div class="file-field input-field col s12">
									<div class="btn red darken-1">
										<span>File</span>
										<input type="file">
									</div>
										<div class="file-path-wrapper">
											<input class="file-path validate" type="file" v-on:change="select" placeholder="выберите или перетащите фотографию">
										</div>
									</div>
							</div>
						</div>
						<div class="card-action">
							<span class="step">шаг: 2/2</span>
							<button class="btn waves-effect waves-light blue darken-1 right_btn" type="submit" name="action"> спасти
								<i class="material-icons right">send</i>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</main>
	Footer
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { capitalize } from '@/modules/filter'
import { mapState, mapActions, mapGetters } from 'vuex'
import axios from 'axios'

@Component({
	components: { Header, Footer },
	filters: {capitalize: capitalize},
	methods:
	{
		...mapActions(['conversationSet'])
	},
	computed: 
	{
		...mapGetters(['me_id', 'conversations', 'messages', 'friend'])
	}
})
export default class Photo extends Vue 
{
	photos: any = []

	select(e: any)
	{
		this.photos = e.target.files
		console.log(this.photos)
	}

	async upload()
	{
		let data = new FormData()
		for(let key in this.photos)
			data.append('photos[]', this.photos[key])
		await axios
		.post(
			`${process.env.VUE_APP_API_URL}/api/photos`, 
			data, 
			{
				headers: {
					'Authorization': `Bearer ${window.localStorage.getItem('token')}`
				}
		})
		.then((res: any) => this.$router.push({path: 'match'}).catch((error: any) => error))
		.catch((error: any) => console.log(error))	
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
	background-color: #fafafa;
}

.step
{
	color: #777;
}

.card-content .row
{
	margin-bottom: 0;
}

.card-content .card-title
{
	font-size: 2rem;
}

.card-action .right_btn
{
	position: absolute;
	right: 1rem;
	bottom: 0.55rem;
}

.title_form
{
	color: #999;
}
</style>
