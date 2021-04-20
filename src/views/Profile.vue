<template lang="pug">
div.container-fluid
  Header
  main(class="main")
    div(class="container_bg")
      img(class="images" src="img/upload/bg1.jpg")
    div(class="container_profile center")
      div(class="container container_p")
        div(class="box_profile")
          div(class="box_item box data")
            div(class="profile_img")
              img(class="images" src="https://placeimg.com/195/254/people")
            div(class="profile_data")
              h1 Josue Cortez
              div(class="state")
                div(class="btn_state")
                span Я в сети!
          div(class="box_item box photo")
            div(class="item_title")
              h3 Фотографии
            div(class="item_img")
              div
                p Нет фотографий для показа
        div(class="box_skills")
          div(class="box_item_skills box")
            div(class="skills_title")
              h3 проверки
            div(class="skills_items")
              div(class="item verificated")
                div(class="i")
                  i(class="fa fa-camera")
                div(class="t")
                  p Фотография
                div(class="ii")
                  i(class="fa fa-check")
              div(class="item")
                div(class="i")
                  i(class="fa fa-envelope")
                div(class="t")
                  p Почта
                div(class="ii")
                  i(class="fa fa-check")
              div(class="item")
                div(class="i")
                  i(class="fa fa-phone-alt")
                div(class="t")
                  p Телефон
                div(class="ii")
                  i(class="fa fa-check")
          div(class="box_item_skills box")
            div(class="skills_title")
              h3 интересы
              button(class="btn btn_skill") Добавлять
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from '@/components/Header.vue'

@Component({
  components: { Header }
})
export default class Profile extends Vue 
{

}
</script>
<style scoped lang="sass">
.container-fluid
  margin: 0px
  padding: 0px
  min-height: 100vh
  width: 100vw
  display: flex
  flex-direction: column

.container_bg
  width: 100%
  height: 40vh
  top: 0
  z-index: -1
  position: absolute

.container_bg img
  border-bottom-right-radius: 100%
  border-bottom-left-radius: 100%

.container_profile
  width: 100%
  height: 100%
  position: relative
  margin-top: 2rem

.container_p
  display: flex
  flex-direction: column

.box_profile
  width: 100%
  display: flex
  flex-direction: column

.box_item
  width: 100%
  height: auto
  margin-bottom: 1rem

.box_skills
  width: 100%
  display: flex
  flex-direction: column

.box_item_skills
  width: 100%
  height: auto
  margin-bottom: 1rem

.data
  display: flex
  justify-content: space-between
  align-items: flex-start
  padding: 1rem

.profile_img
  width: 22rem
  height: 100%

.profile_img img
  border-radius: 4px

.profile_data
  width: 100%
  height: 100%
  padding: 0 2rem

.profile_data h1
  font-size: 1.8rem

.skills_title
  padding: 0.6rem 1rem 
  display: flex
  justify-content: space-between
  align-items: center
  border-bottom: 1px solid #dedede

.skills_title h3
  font-weight: 100

.skills_items
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  padding: 1rem 1rem 0 1rem

.skills_items .item
  width: 100%
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 1.35rem
  color: #999

.skills_items .item.verificated
  color: #5dc26a

.skills_items .item .i
  width: 10%
  height: 100%
  display: flex
  align-items: center
  justify-content: flex-start
  color: inherit
  font-size: 1.35rem

.skills_items .item .t
  width: 80%
  height: 100%
  text-indent: 0.3rem
  font-size: 1.05rem
  color: inherit

.skills_items .item .ii
  width: 10%
  height: 100%
  display: flex
  align-items: center
  justify-content: center
  color: inherit
  font-size: 1.1rem

.photo .item_title
  padding: 0.6rem 1rem 
  border-bottom: 1px solid #dedede

.photo .item_img
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  padding: 0.9rem 1rem

.btn_skill
  padding: 0.6rem 0.75rem
  background: linear-gradient(262deg, rgb(236, 47, 75),rgb(20, 159, 255))
  color: #fff

.btn_skill:hover
  background: linear-gradient(262deg, rgb(20, 159, 255), rgb(236, 47, 75))

@media screen and (min-width: 768px)
  .container_profile
    margin-top: 4rem

  .container_bg
    height: 55vh

  .container_bg img
    border-bottom-right-radius: 0%
    border-bottom-left-radius: 0%

  .container_p
    display: flex
    flex-direction: row
    justify-content: space-between

  .box_profile
    width: 73%

  .data
    padding: 2rem 2rem

  .box_item
    margin-bottom: 1.5rem

  .box_skills
    width: 24.5%

  .box_item_skills
    margin-bottom: 1.5rem

  .profile_data h1
    font-size: 2.2rem

  .photo .item_title
    padding: 0.9rem 1.8rem 

  .photo .item_img
    padding: 1.5rem 1.8rem
</style>
