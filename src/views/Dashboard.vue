<template lang="pug">
	div.menu
		Menu
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios'
import Menu from '@/components/Menu.vue'

@Component({
	components: { Menu }
})
export default class Login extends Vue 
{

}
</script>

<style scoped lang="sass">
.menu
	position: fixed
	bottom: 0px
	left: 0px
	width: 100vw
	height: 70px
	background-color: #068DDA

@media screen and (min-width: 768px)
	.menu
		top: 0
		width: 70px
		height: 100vh

@media screen and (min-width: 1024px)

@media screen and (min-width: 1280px)


</style>
