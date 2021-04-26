<template lang="pug">
<nav class="nav__mobile btn__person">
  <a href="math.php"><i class="material-icons">favorite_border</i></a>
  <a href="messages.php"><i class="material-icons">mail_outline</i></a>
  <a href="search.php"><i class="material-icons">place</i></a>
  <a href="notify.php"><i class="material-icons">notifications_none</i></a>
  <a href="profile.php" class="nav__active"><i class="material-icons">account_circle</i></a>
</nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Nav extends Vue 
{

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav__mobile
{
  position: fixed;
  bottom: 0;
  z-index: 999;
  display: flex;
}

.nav__mobile a
{
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav__mobile a:active
{
  background: rgba(255,255,255, .2);
}

.nav__active
{
  background: rgba(255,255,255, .15);
}

@media only screen and (min-width: 601px) {
  .nav__mobile
  {
    display: none;
  }
}
</style>
