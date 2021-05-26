<template lang="pug">
<footer class="page-footer hide-on-small-only footer">
  <div class="footer-copyright">
    <div class="container">© 2021 Авторские права - SwingRU.com
      <a class="grey-text text-lighten-4 right">Россия</a>
    </div>
  </div>
</footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Footer extends Vue 
{

}
</script>

<style scoped lang="scss">
.footer
{
	background: none;
	width: 100vw;
}

.footer .footer-copyright
{
	background: #18202D;
}
</style>
