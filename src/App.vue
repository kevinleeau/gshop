<template>
 <div id="app">
   <router-view/>
   <FooterGuide/>
 </div>
</template>

<script>
import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'
export default {
  components: {
    FooterGuide
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
