<template lang="pug">
div.container-fluid
	Header
	<main class="container">
		<div class="row" v-if="user">
			<div class="col s12">
				<div class="card b__radius">
					<div class="card-image image__bg">
						<img class="responsive-img materialboxed bg" src="/img/7.jpg" alt="background">
						<a href="#modal-photo" class="btn-floating halfway-fab waves-effect waves-light red darken-2 modal-trigger">
							<i class="material-icons">camera_alt</i>
						</a>
						<div class="photo">
							<img v-if="user.photos.length" :src="user.photos[0].url" class="responsive-img materialboxed photo_i">
							<img v-if="!user.photos.length && user.gender_id.id == 1" class="responsive-img materialboxed photo_i" src="/img/profile_male.jpg">
							<img v-if="!user.photos.length && user.gender_id.id == 2" class="responsive-img materialboxed photo_i" src="/img/profile_female.jpg">
							<img v-if="!user.photos.length && user.gender_id.id == 3" class="responsive-img materialboxed photo_i" src="/img/profile_female.jpg">
							<img v-if="!user.photos.length && user.gender_id.id == 4" class="responsive-img materialboxed photo_i" src="/img/profile_female.jpg">
							<img v-if="!user.photos.length && user.gender_id.id == 5" class="responsive-img materialboxed photo_i" src="/img/profile_female.jpg">
						</div>
						<a v-if="me_id != $route.params.id"  @click="send" class="btn waves-effect waves-gray math white">
							<i class="material-icons red-text text-darken-1">favorite</i></a>
						</a>
					</div>
					<div class="card-content profile">
						<div>
							<span class="title" v-if="user.name">{{ user.name }}<span>, </span><span class="age" v-if="user.birth_date">{{ user.birth_date | age }}</span></span>
							<p class="descripcion" v-if="user.about_me">{{ user.about_me }}</p>
						</div>
						<div class="divider"></div>
						<div class="item">
							<div class="item_box">
								<i class="material-icons light-blue-text">star</i>
								<span>пол:</span>
							</div>
							<p v-if="user.gender_id">{{ user.gender_id.name }}</p>
						</div>
						<div class="item">
							<div class="item_box">
								<i class="material-icons red-text darken-4">favorite</i>
								<span>отношение:</span>
							</div>
							<p v-if="user.relationship_id">{{ user.relationship_id.name }}</p>
						</div>
						<div class="item">
							<div class="item_box">
								<i class="material-icons brown-text">explore</i>
								<span>я хочу:</span>
							</div>
							<p v-if="user.wish_id">{{ user.wish_id.name }}</p>
						</div>
						<div class="divider"></div>
						<div class="item">
							<div class="item_box">
								<i class="material-icons teal-text">place</i>
								<span>место расположения:</span>
							</div>
							<span v-if="user.city_id">Россия, {{ user.city_id.name }}</span>
						</div>
						<div class="item">
							<div class="item_box">
								<i class="material-icons pink-text">label</i>
								<span>интересы:</span>
							</div>
							<span>to travel,</span>
							<span>music</span>
						</div>
					</div>
				</div>
			</div>
			<div class="col s12">
				<div class="card b__radius">
					<div class="card-content">
						<span class="card-title">
							<a href="#modal2" class="waves-effect waves-light btn-small right blue darken-1 modal-trigger">
								<i class="material-icons center">add_a_photo</i>
							</a> галерея
						</span>
						<ul class="row content__img">
							<li class="col s6 m4 l3">
								<img class="responsive-img materialboxed b__radius" src="img/user.jpg" alt="">
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</main>

	<div id="modal-photo" class="modal">
		<div class="modal-content modal__photo b__radius">
			<h5 class="center-align red-text text-darken-1">Изменить фото профиля и обложку</h5>
			<h6 class="center-align">Контролируйте, что о вас думают другие</h6>
			
			<form @submit.prevent="" class="section">
				<div class="file-field input-field">
					<div class="btn blue darken-1">
						<span>профиль</span>
						<input type="file">
					</div>
					<div class="file-path-wrapper">
						<input class="file-path validate" type="text" placeholder="изменить изображение профиля">
					</div>
					<input type="submit" class="btn right red darken-2" value="менять">
				</div>
			</form>

			<form @submit.prevent="" class="section">
				<div class="file-field input-field">
					<div class="btn blue darken-1">
						<span>обложка</span>
						<input type="file">
					</div>
					<div class="file-path-wrapper">
						<input class="file-path validate" type="text" placeholder="сменить обложку">
					</div>
					<input type="submit" class="btn right red darken-2 btn_bottom" value="менять">
				</div>
			</form>
		</div>
	</div>

	<div id="modal2" class="modal bottom-sheet">
		<form @submit.prevent="" class="container">
			<div class="modal-content">
				<span class="blue-text text-darken-1 text_modal">загрузить фотографии</span>
				<div class="file-field input-field add_more">
					<div class="btn red darken-2">
						<span>Фото</span>
						<input type="file" multiple>
					</div>
						<div class="file-path-wrapper">
							<input class="file-path validate" type="text" placeholder="загрузить одну или несколько фотографий">
						</div>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn waves-effect waves-light blue darken-1" type="submit" name="action"> спасти </button>
			</div>
		</form>
	</div>
	Footer

</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { mapState, mapActions, mapGetters } from 'vuex'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { FRIEND_UPSERT } from '@/graphql/friend'
import { age } from '@/modules/filter'

declare const M: any;

@Component({
	components: { Header, Footer },
	filters: {age: age},
	computed: 
	{
		...mapGetters(['me_id'])
	}
})
export default class Profile extends Vue 
{
	async mounted()
	{
 		var elems = document.querySelectorAll('.modal');
		let options = {}
	  var instances = M.Modal.init(elems, options);
	}

	async send()
	{
		await this.$apollo.mutate({
			mutation: FRIEND_UPSERT,
			variables: {
				id: this.$route.params.id
			}
		})
		.then(res => 
		{
			M.toast({html: res.data.friendUpsert, classes: 'red darken-3'})
		})
		.catch(err => err)
	}

	get user()
	{
		return this.$store.state.users_all.get(this.$route.params.id)
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
	padding-bottom: 3.5rem;
}

.image__bg img
{
	height: 250px;
}

.row.content__img
{
	margin-bottom: 0;
}

.content__img li
{
	margin-top: 1rem;
}

.modal-content.modal__photo
{
	padding: 1px 14px 44px 14px;
}

.text_modal
{
	font-size: 1.5rem;
}

.modal .modal-content
{
	padding-bottom: 0px;
}

.file-field.input-field.add_more
{
	margin-top: 1.2rem;
}

.btn_bottom
{
	margin-bottom: 1.1rem;
}

.photo
{
	position: absolute;
	bottom: -3rem;
	left: 1.3rem;
	width: 135px;
	height: 135px;
	border-radius: 4px;
	overflow: hidden;
}

.photo img.photo_i
{
	width: 100%;
	height: 100%;
}

.card-content.profile
{
	padding: 4.5rem 1.7rem 1.7rem 1.7rem;
}

.card
{
	overflow: hidden;
}

.profile .title
{
	font-size: 1.55rem;
	letter-spacing: 0.1px;
}

.profile .age
{
	font-size: 1.2rem;
}

.profile .descripcion
{
	font-size: 1rem;
	padding-top: 1rem;
	font-weight: 100;
	text-align: justify;
}

.profile .divider
{
	margin-top: 2rem;
	margin-bottom: 2rem;
}

.profile .item
{
	margin-bottom: 1.7rem;
}

.profile .item_box
{
	display: flex;
	align-items: center;
	margin-bottom: 0.3rem;
}

.profile .item i
{
	font-size: 1.3rem;
	margin-right: .4rem;
}

.profile .item span, .profile .item p
{
	font-size: 1.05rem;
}

.profile .item span
{
	margin-right: 1rem;
}

.math
{
	position: absolute;
	top: 0.8rem;
	right: 1.2rem;
	padding: 1.5rem 1rem;
	background: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
}

@media only screen and (min-width: 600px)
{
	.image__bg img
	{
		height: 350px;
	}

	.file-field.input-field.add_more
	{
		margin-top: 1.5rem;
	}

	.modal-content.modal__photo
	{
		padding: 10px 25px 44px 25px;
	}

	.btn_bottom
	{
		margin-bottom: 0rem;
	}

	.photo
	{
		bottom: -5.2rem;
		left: 2.1rem;
		width: 190px;
		height: 190px;
		border-radius: 50%;
	}

	.card-content.profile
	{
		padding: 1.6rem 1.6rem 2rem 17rem;
	}
}

@media only screen and (min-width: 768px){
	main
	{
		padding-bottom: 0rem;
	}

	.photo
	{
		bottom: -5.2rem;
		left: 2.1rem;
		width: 212px;
		height: 212px;
	}

	.card-content.profile
	{
		padding: 1.3rem 1.6rem 2rem 17.8rem;
	}

	.profile .item
	{
		display: flex;
		align-items: center;
	}

	.profile .item_box
	{
		margin-bottom: 0rem;
	}

	.profile .title
	{
		font-size: 2rem;
	}

	.profile .age
	{
		font-size: 1.6rem;
	}

	.profile .descripcion
	{
		font-size: 1.03rem;
	}
}
</style>
