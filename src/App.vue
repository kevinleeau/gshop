<template>
 <div id="app">
   <router-view/>
   <!-- 只有在router.js里配置了meta属性才渲染，否则不渲染 -->
   <FooterGuide v-show="$route.meta.showFooter"/>
 </div>
</template>

<script>
import { mapActions } from 'vuex'
import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'
export default {
  components: {
    FooterGuide
  },
  mounted () {
    this.getAddress()
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['getAddress', 'getUserInfo'])
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
// result of a recent compatibility issue between stylus-loader and vue-cli. It was recently fixed in Vue's dev branch.
// need downgrade stylus-loader from version 6 to version 3
// npm install stylus-loader@3
#app
  width 100%
  height 100%
  background #f5f5f5
</style>
