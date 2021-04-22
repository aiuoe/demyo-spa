<template lang="pug">
	form(@submit.prevent="upload")
		input(type="file" v-on:change="select" multiple)
		input(type="submit" value="Enviar")
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Header from '@/components/Header.vue'
import { capitalize } from '@/modules/filter'
import { mapState, mapActions, mapGetters } from 'vuex'
import axios from 'axios'

@Component({
	components: { Header },
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
	}

	async upload()
	{
    let data = new FormData()
    for(let key in this.photos)
      data.append('photos[]', this.photos[key])
		axios.post('http://localhost:8000/api/auth/photos', data)
	}
}
</script>

<style scoped lang="sass">

</style>
