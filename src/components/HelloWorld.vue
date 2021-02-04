<template>
  <div class="hello">
    <h1>Hello!</h1>
    <h1>{{ name }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component
export default class HelloWorld extends Vue {
  name: string = ''

 async mounted()
 {
    const obs = this.$apollo.subscribe({
    query: gql(`subscription
      UserUpdated
      {
        userUpdated
        {
          id
          name
          email
        }
    }`)})
    obs.subscribe({
      next: (data: any) => { this.name = data.data.userUpdated.name },
      error: (error: any) => console.log(error)
    })

 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
