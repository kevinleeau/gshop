<template>
 <div>
     <Shopheader/>
     <div class="tab">
        <div class="tab-item">
            <router-link to="/shop/goods">food</router-link>
        </div>
        <div clsss="tab-item">
            <router-link to="/shop/ratings">comment</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/shop/info">details</router-link>
        </div>
     </div>
     <router-view/>
 </div>
</template>

<script>
import Shopheader from '@/components/Shopheader/Shopheader.vue'
export default {
  components: {
    Shopheader
  }
}

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>
