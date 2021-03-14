<template lang="pug">
nav.nav
  ul(class="list")
    li(class="item")
      a(@click="router('dashboard')" class="link")
        i(class="fa fa-home")
    li(class="item")
      a(@click="router('users')" class="link")
        i(class="fa fa-users")
    li(class="item")
      a(@click="router('conversations')" class="link")
        i(class="fa fa-comments")
    li(class="item")
      a(@click="logout" class="link")
        i(class="fa fa-sign-out-alt")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex'
import gql from 'graphql-tag';

@Component({
  methods:
  {
    ...mapActions(['meSet'])
  }
})
export default class Menu extends Vue 
{
  meSet!: (value: number) => void

  async created()
  {
    this.$apollo.query({
      query: gql(`query
      {
        me
        {
          id
        }
      }`)
    })
    .then(res => this.meSet(res.data.me.id))
    .catch(err => console.log(err))
  }

  router(path: string)
  {
    this.$router.push({path: path}).catch(err => err)
  }

  logout()
  {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.nav
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center

.list
  display: flex
  justify-content: space-evenly
  align-items: center
  list-style: none
  width: 100%
  height: 100%

  .item
    width: calc(100% / 4)
    height: 100%
    display: flex
    justify-content: center
    align-items: center

    .link
      text-decoration: none

      .fa
        font-size: 35px
        color: white


@media screen and (min-width: 768px)
  .list
    height: 50%
    flex-direction: column
    justify-content: space-around
    align-items: center

</style>
