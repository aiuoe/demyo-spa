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
					<form>
						<div class="card-content">
							<div class="row">
								<div class="input-field col s12 m4">
									<select>
										<option value="" disabled selected>день</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6</option>
										<option value="7">7</option>
										<option value="8">8</option>
										<option value="9">9</option>
										<option value="10">10</option>
										<option value="11">11</option>
										<option value="12">12</option>
										<option value="13">13</option>
										<option value="14">14</option>
										<option value="15">15</option>
										<option value="16">16</option>
										<option value="17">17</option>
										<option value="18">18</option>
										<option value="19">19</option>
										<option value="20">20</option>
										<option value="21">21</option>
										<option value="22">22</option>
										<option value="23">23</option>
										<option value="24">24</option>
										<option value="25">25</option>
										<option value="26">26</option>
										<option value="27">27</option>
										<option value="28">28</option>
										<option value="29">29</option>
										<option value="30">30</option>
										<option value="31">31</option>
									</select>
									<label>Дата рождения</label>
								</div>
								<div class="input-field col s12 m4">
									<select>
										<option value="" disabled selected>месяц</option>
										<option value="jan">Январь</option>
										<option value="feb">Февраль</option>
										<option value="mar">маршировать</option>
										<option value="apr">апреля</option>
										<option value="may">Может</option>
										<option value="jun">июнь</option>
										<option value="jul">июль</option>
										<option value="aug">август</option>
										<option value="sep">сентябрь</option>
										<option value="oct">Октябрь</option>
										<option value="nov">Ноябрь</option>
										<option value="dec">Декабрь</option>
									</select>
									<label></label>
								</div>
								<div class="input-field col s12 m4">
									<select>
										<option value="" disabled selected>год</option>
										<option value="2003">2003</option>
										<option value="2002">2002</option>
										<option value="2001">2001</option>
										<option value="2000">2000</option>
										<option value="1999">1999</option>
										<option value="1998">1998</option>
										<option value="1997">1997</option>
										<option value="1996">1996</option>
										<option value="1995">1995</option>
										<option value="1994">1994</option>
										<option value="1993">1993</option>
										<option value="1992">1992</option>
										<option value="1991">1991</option>
										<option value="1990">1990</option>
										<option value="1989">1989</option>
										<option value="1988">1988</option>
										<option value="1987">1987</option>
										<option value="1986">1986</option>
										<option value="1985">1985</option>
										<option value="1984">1984</option>
										<option value="1983">1983</option>
										<option value="1982">1982</option>
										<option value="1981">1981</option>
										<option value="1980">1980</option>
										<option value="1979">1979</option>
										<option value="1978">1978</option>
										<option value="1977">1977</option>
										<option value="1976">1976</option>
										<option value="1975">1975</option>
										<option value="1974">1974</option>
										<option value="1973">1973</option>
										<option value="1972">1972</option>
										<option value="1971">1971</option>
										<option value="1970">1970</option>
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
									<input id="icon_prefix" type="text" class="validate">
									<label for="icon_prefix">Краткое описание вас</label>
								</div>
							</div>
						</div>
						<div class="divider box"></div>
						<div class="card-content">
							<div class="row">
								<div class="input-field col s12 m4">
									<select>
										<option value="" disabled selected>статус</option>
										<option value="1">мужчина</option>
										<option value="2">женский</option>
										<option value="3">пара мужчина + женщина</option>
										<option value="4">пара мужчина + мужчина</option>
										<option value="5">пара женщина + женщина</option>
									</select>
									<label>пол / статус</label>
								</div>	
								<div class="input-field col s12 m4">
									<select>
										<option value="" disabled selected>отношение</option>
										<option value="a">В сложные отношения</option>
										<option value="b">Один</option>
										<option value="c">С парой</option>
									</select>
									<label>отношение</label>
								</div>
								<div class="input-field col s12 m4">
									<select>
										<option value="" disabled selected>я хочу</option>
										<option value="1">общаться и встречаться с людьми</option>
										<option value="2">Выйти с кем-то</option>
										<option value="3">Серьезные отношения</option>
										<option value="4">который возникает</option>
										<option value="5">найди любовь всей моей жизни</option>
									</select>
									<label>я хочу</label>
								</div>
							</div>
						</div>
						<div class="divider box"></div>
						<div class="card-content">
							<span class="title_form">интересы</span>
							<div class="chips chips-autocomplete">
								<input class="custom-class">
							</div>	
						</div>
						<div class="divider box"></div>
						<div class="card-content">
							<div class="row">
								<div class="input-field col s12 m4">
									<select>
										<option value="" disabled selected>положение</option>
										<option value="1">Aleksandriya</option>
										<option value="2">Bakhmut</option>
										<option value="3">Belaya Tserkov</option>
										<option value="4">Berdichev</option>
										<option value="5">Berdyansk</option>
										<option value="6">Borispol</option>
										<option value="7">Brovary</option>
										<option value="8">Cherkassy</option>
										<option value="9">Chernigov</option>
										<option value="10">Chernomorsk</option>
										<option value="11">Chernovtsy</option>
										<option value="12">Dnepr</option>
										<option value="13">Energodar</option>
										<option value="14">Gorishniye Plavni</option>
										<option value="15">Irpen</option>
										<option value="16">Ivano Frankovsk</option>
										<option value="17">Izmail</option>
										<option value="18">Kalush</option>
										<option value="19">Kamenets Podolskiy</option>
										<option value="20">Kamenskoye</option>
										<option value="21">Kharkov</option>
										<option value="22">Kherson</option>
										<option value="23">Khmelnitskiy</option>
										<option value="24">Kolomyya</option>
										<option value="25">Konotop</option>
										<option value="26">Konstantinovka</option>
										<option value="27">Korosten</option>
										<option value="28">Kovel</option>
										<option value="29">Kremenchug</option>
										<option value="30">Kropivnitskiy</option>
										<option value="31">Kryvyi Rih</option>
										<option value="32">Kyiv</option>
										<option value="33">Lozovaya</option>
										<option value="34">Lutsk</option>
										<option value="35">Mariupol</option>
										<option value="36">Melitopol</option>
										<option value="37">Mukachevo</option>
										<option value="38">Nezhin</option>
										<option value="39">Nikolayev</option>
										<option value="40">Nikopol</option>
										<option value="41">Novograd Volynskiy</option>
										<option value="42">Novomoskovsk</option>
										<option value="43">Novovolynsk</option>
										<option value="44">Odessa</option>
										<option value="45">Pavlograd</option>
										<option value="46">Pervomaysk</option>
										<option value="47">Pokrovsk</option>
										<option value="48">Poltava</option>
										<option value="49">Priluki</option>
										<option value="50">Rovno</option>
										<option value="51">Shostka</option>
										<option value="52">Smela</option>
										<option value="53">Sumy</option>
										<option value="54">Ternopol</option>
										<option value="55">Uman</option>
										<option value="56">Uzhgorod</option>
										<option value="57">Vinnitsa</option>
										<option value="58">Zaporozhye</option>
										<option value="59">Zhitomir</option>
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
	//- Footer
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { capitalize } from '@/modules/filter'
import { mapState, mapActions, mapGetters } from 'vuex'
import { MESSAGE_UPSERT } from '@/graphql/message'

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
 async created()
 {

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

// .chips
// {
// 	border: 0px;
// }

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
