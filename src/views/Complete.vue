<template lang="pug">
div(class="container-fluid")
	Header
	<main class="container section">
		<div class="row">
			<div class="col s12">
				<div class="card b__radius">
					<div class="card-content">
						<div class="section">
							<span class="card-title center">Заполните данные своей учетной записи</span>
									<p class="center">SwingRU веселее, если вы знаете людей, которые вам нравятся, помогите нам найти этих людей, заполнив данные вашей учетной записи <span class="red-text text-darken-2">SwingRU</span></p>
						</div>
					</div>
					<div class="divider box"></div>
					<form @submit.prevent="upsert">
						<div class="card-content">
							<div class="row">
								<div class="input-field col s12 m4">
									//- day
									<select v-model="day">
										<option value="" disabled selected>день</option>
										<option v-for="day in days" :value="day.id" v-text="day.id"></option>
									</select>
									<label>Дата рождения</label>
								</div>
								<div class="input-field col s12 m4">
									//- mounth
									<select v-model="mounth">
										<option value="" disabled selected>месяц</option>
										<option v-for="mounth in mounths" :value="mounth.id" v-text="mounth.name"></option>
									</select>
									<label></label>
								</div>
								<div class="input-field col s12 m4">
									//- year
									<select v-model="year">
										<option value="" disabled selected>год</option>
										<option v-for="year in years" :value="year.id" v-text="year.id"></option>
									</select>
									<label></label>
								</div>
							</div>
						</div>
						<div class="divider box"></div>
						<div class="card-content">
							<div class="row">
								<div class="input-field col s12">
									<i class="material-icons prefix">comment</i>
									//- about me
									<input v-model="about_me" id="icon_prefix" type="text" class="validate" required>
									<label for="icon_prefix">Краткое описание вас</label>
								</div>
							</div>
						</div>
						<div class="divider box"></div>
						<div class="card-content">
							<div class="row">
								<div class="input-field col s12 m4">
									//- genero estado
									<select v-model="gender_id">
										<option value="" disabled selected>статус</option>
										<option v-for="gender in genders" v-bind:value="gender.id" v-text="gender.name"></option>
									</select>
									<label>пол / статус</label>
								</div>	
								<div class="input-field col s12 m4">
									//- relationships
									<select v-model="relationship_id">
										<option value="" disabled selected>отношение</option>
										<option v-for="relationship in relationships" :value="relationship.id" v-text="relationship.name"></option>
									</select>
									<label>отношение</label>
								</div>
								<div class="input-field col s12 m4">
									//- wishes
									<select v-model="wish_id">
										<option value="" disabled selected>я хочу</option>
										<option v-for="wish in wishes" :value="wish.id" v-text="wish.name"></option>
									</select>
									<label>я хочу</label>
								</div>
							</div>
						</div>
						<div class="divider box"></div>
						<div class="card-content">
							<span class="title_form">интересы</span>
							<div class="chips">
								//- hobbies
								<input class="custom-class">
							</div>	
						</div>
						<div class="divider box"></div>
						<div class="card-content">
							<div class="row">
								<div class="input-field col s12 m4">
									//- city
									<select v-model="city_id">
										<option value="" disabled selected>положение</option>
										<option v-for="city in cities" v-bind:value="city.id">{{ city.name }}</option>
									</select>
									<label>место расположения</label>
								</div>
							</div>
						</div>
						<div class="card-action">
							<span class="step">шаг: 1/2</span>
							<button class="btn waves-effect waves-light red darken-1 right_btn" type="submit" name="action"> спасти
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
import { mapState, mapActions, mapGetters } from 'vuex'
import { capitalize } from '@/modules/filter'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { USER_UPDATE } from '@/graphql/user'
import { HOBBY_UPSERT } from '@/graphql/hobby'

declare const M: any;

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
export default class Complete extends Vue 
{
	day: number = 0
	mounth: number = 0
	year: number = 0
	birth_date: any = null
	about_me: string = ''
	city_id: number = 0
	gender_id: number = 0
	wish_id: number = 0
	relationship_id: number = 0
	hobbies: any = []

	cities: any = []
	genders: any = []
	wishes: any = []
	relationships: any = []
	mounths: any = []
	days: any = []
	years: any = []

	async created()
	{
    this.cities = [
			{id: 1, name: 'Aleksandriya'},
			{id: 2, name: 'Bakhmut'},
			{id: 3, name: 'Belaya Tserkov'},
			{id: 4, name: 'Berdichev'},
			{id: 5, name: 'Berdyansk'},
			{id: 6, name: 'Borispol'},
			{id: 7, name: 'Brovary'},
			{id: 8, name: 'Cherkassy'},
			{id: 9, name: 'Chernigov'},
			{id: 10, name: 'Chernomorsk'},
			{id: 11, name: 'Chernovtsy'},
			{id: 12, name: 'Dnepr'},
			{id: 13, name: 'Energodar'},
			{id: 14, name: 'Gorishniye Plavni'},
			{id: 15, name: 'Irpen'},
			{id: 16, name: 'Ivano Frankovsk'},
			{id: 17, name: 'Izmail'},
			{id: 18, name: 'Kalush'},
			{id: 19, name: 'Kamenets Podolskiy'},
			{id: 20, name: 'Kamenskoye'},
			{id: 21, name: 'Kharkov'},
			{id: 22, name: 'Kherson'},
			{id: 23, name: 'Khmelnitskiy'},
			{id: 24, name: 'Kolomyya'},
			{id: 25, name: 'Konotop'},
			{id: 26, name: 'Konstantinovka'},
			{id: 27, name: 'Korosten'},
			{id: 28, name: 'Kovel'},
			{id: 29, name: 'Kremenchug'},
			{id: 30, name: 'Kropivnitskiy'},
			{id: 31, name: 'Kryvyi Rih'},
			{id: 32, name: 'Kyiv'},
			{id: 33, name: 'Lozovaya'},
			{id: 34, name: 'Lutsk'},
			{id: 35, name: 'Mariupol'},
			{id: 36, name: 'Melitopol'},
			{id: 37, name: 'Mukachevo'},
			{id: 38, name: 'Nezhin'},
			{id: 39, name: 'Nikolayev'},
			{id: 40, name: 'Nikopol'},
			{id: 41, name: 'Novograd Volynskiy'},
			{id: 42, name: 'Novomoskovsk'},
			{id: 43, name: 'Novovolynsk'},
			{id: 44, name: 'Odessa'},
			{id: 45, name: 'Pavlograd'},
			{id: 46, name: 'Pervomaysk'},
			{id: 47, name: 'Pokrovsk'},
			{id: 48, name: 'Poltava'},
			{id: 49, name: 'Priluki'},
			{id: 50, name: 'Rovno'},
			{id: 51, name: 'Shostka'},
			{id: 52, name: 'Smela'},
			{id: 53, name: 'Sumy'},
			{id: 54, name: 'Ternopol'},
			{id: 55, name: 'Uman'},
			{id: 56, name: 'Uzhgorod'},
			{id: 57, name: 'Vinnitsa'},
			{id: 58, name: 'Zaporozhye'},
			{id: 59, name: 'Zhitomir'}
		]
  
    this.genders = [
			{id: 1, name: 'male'},
			{id: 2, name: 'female'},
			{id: 3, name: 'couple'},
			{id: 4, name: 'male_couple'},
			{id: 5, name: 'female_couple'}
		]

		this.wishes = [
			{id: 1, name: 'общаться и встречаться с людьми'},
			{id: 2, name: 'Выйти с кем-то'},
			{id: 3, name: 'Серьезные отношения'},
			{id: 4, name: 'который возникает'},
			{id: 5, name: 'найди любовь всей моей жизни'}
		]

		this.relationships = [
			{id: 1, name: 'В сложные отношения'},
			{id: 2, name: 'Один'},
			{id: 3, name: 'С парой'}
		]

		this.mounths = [
			{id: 1, name: 'Январь'},
			{id: 2, name: 'Февраль'},
			{id: 3, name: 'маршировать'},
			{id: 4, name: 'апреля'},
			{id: 5, name: 'Может'},
			{id: 6, name: 'июнь'},
			{id: 7, name: 'июль'},
			{id: 8, name: 'август'},
			{id: 9, name: 'сентябрь'},
			{id: 10, name: 'Октябрь'},
			{id: 11, name: 'Ноябрь'},
			{id: 12, name: 'Декабрь'}
		]

		this.days = [
			{id: 1},
			{id: 2},
			{id: 3},
			{id: 4},
			{id: 5},
			{id: 6},
			{id: 7},
			{id: 8},
			{id: 9},
			{id: 10},
			{id: 11},
			{id: 11},
			{id: 12},
			{id: 13},
			{id: 14},
			{id: 15},
			{id: 16},
			{id: 17},
			{id: 18},
			{id: 19},
			{id: 20},
			{id: 21},
			{id: 22},
			{id: 23},
			{id: 24},
			{id: 25},
			{id: 26},
			{id: 27},
			{id: 28},
			{id: 29},
			{id: 30},
			{id: 31}
		]

		this.years = [
			{id: 2003},
			{id: 2002},
			{id: 2001},
			{id: 2000},
			{id: 1999},
			{id: 1998},
			{id: 1997},
			{id: 1996},
			{id: 1995},
			{id: 1994},
			{id: 1993},
			{id: 1992},
			{id: 1991},
			{id: 1990},
			{id: 1989},
			{id: 1988},
			{id: 1987},
			{id: 1986},
			{id: 1985},
			{id: 1984},
			{id: 1983},
			{id: 1982},
			{id: 1981},
			{id: 1980},
			{id: 1979},
			{id: 1978},
			{id: 1977},
			{id: 1976},
			{id: 1975},
			{id: 1974},
			{id: 1973},
			{id: 1972},
			{id: 1971},
			{id: 1970}
		]
			
	}

	async upsert()
	{
		this.birth_date = `${this.year}-${this.mounth}-${this.day}`

		document.querySelectorAll<any>(".chips")[0].M_Chips.chipsData.map((item: any) => 
		{
			this.hobbies.push(item.tag)
		})

		await this.$apollo.mutate({
			mutation: USER_UPDATE,
			variables: 
			{
				id: this.$store.state.me_id,
		    birth_date: this.birth_date,
    		about_me: this.about_me,
    		gender_id: this.gender_id,
    		relationship_id: this.relationship_id,
    		wish_id: this.wish_id,
    		city_id: this.city_id,
			}
		})
		.then(res => console.log(res))
		.catch(err => console.log(err))

		await this.hobbies.map((h: string) => {
			this.$apollo.mutate({
				mutation: HOBBY_UPSERT,
				variables: 
				{
					name: h
				}
			})
			.then(res => console.log(res))
			.catch(err => console.log(err))
		})

		this.$router.push({path: 'photos'})
	}

	async mounted()
	{
	  var elems = document.querySelectorAll('select');
	  var options = { }
	  var instances = M.FormSelect.init(elems, options);

	  var elemtors = document.querySelectorAll('.chips');
	  var instances = M.Chips.init(elemtors, options);

	 	const tags = document.querySelectorAll(".chips");
	   M.Chips.init(tags, {
	     data:[{
	       tag: 'Кино и ТВ'
	     },{
	       tag: 'Музыка'
	     },{
	       tag: 'Путешествия'
	     }],
	     placeholder: 'добавить интересы',
	     secondaryPlaceholder: '+интересы',
	     autocompleteOptions:{
	       data:{
	         'есть и пить':null,
	         'есть':null,
	         'пить':null,
	         'мода и красота':null,
	         'мода':null,
	         'Красота':null,
	         'виды спорта':null,
	         'путешествия':null,
	         'Профессии':null,
	         'игры':null,
	         'хобби':null,
	         'книги и культура':null,
	         'книги':null,
	         'культура':null,
	         'другие':null,
	       },
	       limit: Infinity,
	       minLength: 1,
	     }
	   })
	}
}
</script>

<style scoped lang="scss">
.container-fluid
{
	background: #fafafa;
}

main.container
{
	margin-bottom: 4rem;
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

@media only screen and (min-width: 601px){
	main.container
	{
		margin-bottom: 0;
	}
}
</style>