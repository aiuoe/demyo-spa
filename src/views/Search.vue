<template lang="pug">
div(class="container-fluid")
	Header
	main(class="main")
		div(class="container_users center")
			div(class="container container_u")
				div(class="box_users box")
					div(class="title")
						div(class="title_name")
							p люди поблизости
						div(class="items")
							button(class="icon center" onclick="openFilter()")
								i(class="fa fa-sliders-h")
								div(class="select")
								button(id="button" class="button")
									span(id="select-label") Все
									i(class="fa fa-angle-down")
								div(class="dropdown hidden" id="dropdown")
									input(type="radio" id="select-all" name="where" value="all" class="option")
									label(for="select-all" class="select-item") Все
									input(type="radio" id="select-new" name="where" value="new" class="option")
									label(for="select-new" class="select-item") Новый
									input(type="radio" id="select-online" name="where" value="online" class="option")
									label(for="select-online" class="select-item") Сейчас в сети
					//- div(id="filter")
					ul(class="user")
						li(class="user_card" v-for="user in users" v-if="user.id != me_id")
							img(class="user_card" src="https://res.cloudinary.com/demo/image/upload/v1565124833/eden_group.jpg")
							div(class="profile")
								div(class="name") 
									span {{ user.name | capitalize }}
									span  {{ user.age }}
								div(class="local")
									i(class="fa fa-map-marker-alt")
									span 20 км от тебя
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions, mapGetters } from 'vuex'
import { capitalize } from '@/modules/filter'
import Header from '@/components/Header.vue'

@Component({
	components: { Header },
	filters: {capitalize: capitalize},
	computed: 
	{
		...mapGetters(['me_id', 'users'])
	}
})
export default class Login extends Vue 
{

}
</script>

<style scoped lang="sass">
.container_users
	width: 100%
	height: auto
	position: relative
	margin-top: 1.3rem
	margin-bottom: 1.5rem

.container_u
	display: flex
	flex-direction: column

.box_users
	width: 100%
	height: auto
	display: flex
	flex-direction: column

.box_users .title
	width: 100%
	height: 3.5rem
	display: flex
	justify-content: space-between
	align-items: center
	padding: 0 1rem

.box_users .title .title_name
	display: flex
	justify-content: center
	align-items: center
	font-size: 1.15rem

.box_users .title .items
	display: flex
	align-items: center

.box_users .title .icon
	width: 38px
	height: 38px
	color: #555
	cursor: pointer
	border-radius: 6px
	background: transparent
	border: 1px solid #bebebe
	font-size: 1.03rem
	outline: none

.box_users .title .icon:hover
	background: #f2f2f2

.box_users .title .icon:active
	background: #fafafa

.select
	position: relative
	margin-left: 0.5rem

.button
	height: 38px
	width: 100%
	padding: 0rem 0.85rem 0 0.85rem
	display: flex
	justify-content: space-between
	align-items: center
	border-radius: 6px
	background: transparent
	border: 1px solid #bebebe
	position: relative
	cursor: pointer
	outline: none

.button:hover
	background: #f2f2f2

.button:active
	background: #fafafa

.fa-angle-down
	font-size: 1.1rem
	padding-left: 0.6rem

.dropdown
	top: 122%
	right: 0
	width: 10rem
	position: absolute
	border: 1px solid #bebebe
	border-radius: 6px
	overflow: hidden
	z-index: 5

.option
	display: none

.select-item
	display: block
	padding: 0.7rem 1rem
	color: #222
	cursor: pointer
	background: #fff

.select-item:hover
	background: #f2f2f2

.hidden
	display: none

.filter
	width: 100%
	height: 200px
	background: #f6f6f6
	border-top: 2px solid #e0e0e0

.user
	width: 100%
	display: grid
	grid-template-columns: repeat(2, auto)
	grid-gap: 1rem
	justify-content: center
	list-style: none
	padding: 1rem 1rem 1rem 1rem
	position: relative
	overflow: hidden

.user .user_card
	width: 135px
	height: 194px
	cursor: pointer
	border-radius: 8px
	box-shadow: 0 1px 1px 0px rgba(0, 0, 0, .3) 
	position: relative
	z-index: 0

.user .user_card:hover .profile
	background: rgba(248, 248, 248, 0.15)
	backdrop-filter: blur(4px)
	-webkit-backdrop-filter: blur(4px)

.user .user_card .profile
	width: 100%
	height: 30%
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	position: absolute
	bottom: 0
	border-bottom-left-radius: 8px
	border-bottom-right-radius: 8px 

.user .user_card .profile .name
	width: 100%
	height: 50%
	color: #fff
	font-size: 20px
	font-weight: 700
	letter-spacing: 0.5px
	text-shadow: 1px 1px 3px #444

.user .user_card .profile .name span
	font-size: 14px

.user .user_card .profile .local
	width: 100%
	display: flex
	justify-content: center
	align-items: flex-start
	padding: 0 0 20px 0

.user .user_card .profile .local i
	color: #fff

.user .user_card .profile .local span
	color: #fff
	padding: 0 10px
	text-shadow: 1px 1px 3px #444

@media screen and (min-width: 768px)


@media screen and (min-width: 1024px)
	.box_users .title
		height: 4.2rem
		padding: 0 2.1rem

	.user
		grid-template-columns: repeat(5, auto)
		grid-gap: 2rem
		padding: 1.5rem 2.1rem 1.5rem 2.1rem

	.user .user_card
		width: 195px
		height: 254px

	.dropdown
		left: 0

</style>
