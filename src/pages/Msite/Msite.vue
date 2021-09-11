<template>
 <section class="msite">
        <!--首页头部-->
        <header-top :title="address.geohash">
          <router-link class="header_search" slot="left" to="/search">
            <i class="iconfont icon-loupe"></i>
          </router-link>
          <router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo' : '/login'">
            <span class="header_login_text" v-if="!userInfo._id">Login|Signup</span>
            <span class="header_login_text" v-else>
              <i class="iconfont icon-user"></i>
            </span>
          </router-link>
          </header-top>
        <!--首页导航-->
        <nav class="msite_nav">
          <!-- v-if当categories有数据时渲染，v-else如果网络速度慢正在等待数据则渲染img -->
          <div class="swiper-container" v-if="categories.length > 0">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categories, index) in categoriesArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(category, index) in categories" :key="index">
                  <div class="food_container">
                    <img :src="imgBaseUrl + category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <img src="./image/msite_back.svg" alt="back" v-else>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">shop nearby</span>
          </div>
          <shop-list/>
        </div>
      </section>
</template>

<script>
// ***************************************************************
// swiper default version 7 has error, so downgrade to version 5
// npm install swiper@^5.3.6
// different version has different default path
// insert comment: eslint-disable no-new to disable eslint check
// ***************************************************************
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import HeaderTop from '@/components/HeaderTop/HeaderTop.vue'
import ShopList from '@/components/ShopList/ShopList.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      imgBaseUrl: 'https://fuss10.elemecdn.com'
    }
  },
  components: {
    HeaderTop,
    ShopList
  },
  computed: {
    ...mapState(['address', 'categories', 'userInfo']),
    categoriesArr () {
      const { categories } = this
      const arr = []
      let minArr = []
      categories.forEach(c => {
        // if minarr is full, then re-define a new empty minarr
        if (minArr.length === 8) {
          minArr = []
        }
        // if minArr empty, them push it to arr
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        // save current item to minArr
        minArr.push(c)
      })
      return arr
    }
  },
  // watch component and perform specified tasks when the value of the component changes
  watch: {
    // watch 当页面更新立即调用swiper，$nextTick(callback函数)
    categories (value) {
      this.$nextTick(() => {
        /* eslint-disable no-new */
        new Swiper('.swiper-container', {
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  },
  //   mounted在页面渲染完成后才加载第三方插件
  mounted () {
    this.$store.dispatch('getFoodCategories')
    this.$store.dispatch('getShops')
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
 .msite  //首页
          width 100%
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
          .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
</style>
