<template lang="pug">
<footer class="page-footer btn__person hide-on-small-only">
    <div class="footer-copyright grey darken-4">
        <div class="container"> © 2021 Авторские права - SwingRU.com
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
.page-footer.btn__person
{
	width: 100vw;
  padding-top: 6px;
}
</style>
