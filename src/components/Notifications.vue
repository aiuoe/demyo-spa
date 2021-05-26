<template lang="pug">
<main class="container section">
	<div class="row">
		<div class="card notify_card col s12 m4 right">
			<div class="col s12 title">
				<h6>уведомления</h6>
				<i class="material-icons">notifications_none</i>
			</div>
			<div class="divider col s12"></div>
			<ul class="col s12 box_notify">
				<li class="item" v-for="notification in notifications" style="cursor: pointer;">
					<a @click="router(notification.friend_id.id)" class="see">
						<img v-if="notification.friend_id.photos.length" class="circle" :src="notification.friend_id.photos[0].url">
						<img v-if="!notification.friend_id.photos.length && notification.friend_id.gender_id.id == 1" class="circle" src="/img/profile_male.jpg">
						<img v-if="!notification.friend_id.photos.length && notification.friend_id.gender_id.id == 2" class="circle" src="/img/profile_female.jpg">
						<img v-if="!notification.friend_id.photos.length && notification.friend_id.gender_id.id == 3" class="circle" src="/img/profile_female.jpg">
						<img v-if="!notification.friend_id.photos.length && notification.friend_id.gender_id.id == 4" class="circle" src="/img/profile_female.jpg">
						<img v-if="!notification.friend_id.photos.length && notification.friend_id.gender_id.id == 5" class="circle" src="/img/profile_female.jpg">
						<div class="title">
							<p>{{ notification.message }}</p>
						</div>
					</a>
				</li>
			</ul>
		</div>
	</div>
</main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Notifications extends Vue 
{
	get notifications()
	{
		return this.$store.state.notifications
	}

	router(id: any)
	{
		this.$router
		.push({name: 'profile', params: {id: id}})
		.catch(err => err)
	}
}
</script>

<style scoped lang="scss">
.row .col
{
	padding: 0 0;
}

.card.notify_card
{
	height: calc(100vh - 145px);
	margin-top: 0;
}

.notify_card .title
{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.7rem 1rem;
}

.notify_card .title h6 
{
	font-size: 1.15rem;
}

.notify_card .title i
{
	color: #666;
}

.box_notify
{
	margin: 0;
	height: 89%;
	overflow-y: auto;
}

.box_notify::-webkit-scrollbar {
	width: 4px;
}

.box_notify .item a
{
	text-decoration: none;
	color: #444;
	display: flex;
	align-items: center;
	padding: 0.5rem 1.2rem;
}

.box_notify .item a.see
{
	background: #f5f6fa;
}

.box_notify .item a:hover
{
	background: #f5f6fa;
}

.box_notify .item a img
{
	width: 50px;
	height: 50px;
	margin-right: 0.1rem;
}

.box_notify .item a .title
{
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.box_notify .item a .title span
{
	font-size: 1.1rem;
}

.box_notify .item a .title p
{
	font-size: 1rem;
	margin: 0;
	color: #aab0b7;
}


@media only screen and (min-width: 602px){
	.card.notify_card
	{
		margin-top: 70px;
		height: 550px;
	}
}
</style>
