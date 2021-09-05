<template>
 <section class="msite">
        <!--首页头部-->
        <header-top title="aaa">
          <span class="header_search" slot="left">
            <i class="iconfont icon-loupe"></i>
          </span>
          <span class="header_login" slot="right">
            <span class="header_login_text">Login | Signup</span>
          </span>
          </header-top>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/1.jpg">
                  </div>
                  <span>Sweet</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/2.jpg">
                  </div>
                  <span>convinence store</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/3.jpg">
                  </div>
                  <span>tasty food</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/4.jpg">
                  </div>
                  <span>fast food</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/5.jpg">
                  </div>
                  <span>promotion</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/6.jpg">
                  </div>
                  <span>on time</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/7.jpg">
                  </div>
                  <span>breakfast</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/8.jpg">
                  </div>
                  <span>recommendation</span>
                </a>
              </div>
              <div class="swiper-slide">
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/9.jpg">
                  </div>
                  <span>drink</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/10.jpg">
                  </div>
                  <span>convinence store</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/11.jpg">
                  </div>
                  <span>tasty food</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/12.jpg">
                  </div>
                  <span>fast food</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/13.jpg">
                  </div>
                  <span>promotion</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/14.jpg">
                  </div>
                  <span>on time</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/1.jpg">
                  </div>
                  <span>breakfast</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/2.jpg">
                  </div>
                  <span>recommendation</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
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
export default {
  components: {
    HeaderTop,
    ShopList
  },
  //   mounted在页面渲染完成后才加载第三方插件
  mounted () {
    /* eslint-disable no-new */
    new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination'
      }
    })
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
