<template>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">TakeAway</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on: loginMethod}" @click="loginMethod=true">Message Login</a>
            <a href="javascript:;" :class="{on: !loginMethod}" @click="loginMethod=false">Password Login</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <!-- 用:class选择渲染内容，在同一个表单内 -->
            <div :class="{on: loginMethod}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="phone number" v-model="phone">
                <button :disabled="!rightPhone" class="get_verification" :class="{right_phone: rightPhone}" @click.prevent="getCode">{{countTime > 0 ? `Code Sent ${countTime}s Left` : 'Get Code'}}</button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="code" v-model="code">
              </section>
              <section class="login_hint">
                <a href="javascript:;">《Agreement》</a>
              </section>
            </div>
            <!-- 用:class选择渲染内容，在同一个表单内 -->
            <div :class="{on: !loginMethod}">
              <section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="Mobile/Email" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="text" maxlength="8" placeholder="password" v-if="showPassword" v-model="pwd">
                  <input type="password" maxlength="8" placeholder="Password" v-else v-model="pwd">
                  <div class="switch_button" :class="showPassword ? 'on' : 'off'" @click="showPassword=!showPassword">
                    <!-- 对象类名，当showpassword时启用类名right -->
                    <div class="switch_circle" :class="{right: showPassword}"></div>
                    <span class="switch_text">{{showPassword ? 'text' : ''}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="Code" v-model="captcha">
                  <img class="get_verification" src="http://localhost:4000/captcha" ref="captcha" alt="captcha" @click="getCaptcha">
                </section>
              </section>
            </div>
            <button class="login_submit">Login</button>
          </form>
          <a href="javascript:;" class="about_us">About</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-wireless"></i>
        </a>
      </div>
      <!-- 这是一个popup， @监听子组件发过来的closeTip事件，并作出名为closeMessage的行动 -->
      <Message :alertText="alertText" v-show="showMessage" @closeTip="closeMessage"/>
    </section>
</template>

<script>
import Message from '@/components/Message/Message.vue'
import { reqSendCode, reqPwdLogin, reqSmsLogin } from '@/api/index.js'
export default {
  components: {
    Message
  },
  data () {
    return {
      loginMethod: true, //  true message login, false password login
      phone: '',
      countTime: 0,
      showPassword: false,
      pwd: '',
      code: '',
      name: '',
      captcha: '',
      alertText: '',
      showMessage: false,
      intervalId: 0
    }
  },
  computed: {
    rightPhone () {
      return /^0\d{10}$/.test(this.phone)
    }
  },
  methods: {
    async getCode () {
      //  only if当前没有计时，才启动倒计时
      if (!this.countTime) {
        this.countTime = 10
        this.intervalId = setInterval(() => {
          this.countTime--
          if (this.countTime === 0) {
            clearInterval(this.intervalId)
          }
        }, 1000)
        const result = await reqSendCode(this.phone)
        if (result.code === 1) {
          this.showAlert(result.msg)
          if (this.countTime) {
            this.countTime = 0
            clearInterval(this.intervalId)
            this.intervalId = 0
          }
        }
      }
    },
    closeMessage () {
      this.showMessage = false
      this.alertText = ''
      this.code = ''
      this.phone = ''
      this.name = ''
      this.pwd = ''
    },
    showAlert (alertText) {
      this.showMessage = true
      this.alertText = alertText
    },
    async login () {
      let result
      // 判断用户用什么方式登录，然后相应进行前台校验 true message login, false password login
      if (this.loginMethod) {
        const { rightPhone, phone, code } = this
        if (!this.rightPhone) {
          return this.showAlert('incorrect phone')
        } else if (!/^\d{6}$/.test(code)) {
          return this.showAlert('incorrect code')
        }
        // 判断用户是通过message登录
        result = await reqSmsLogin(phone, code)
      } else {
        const { name, pwd, captcha } = this
        if (!this.name) {
          return this.showAlert('incorrect name')
        } else if (!this.pwd) {
          return this.showAlert('incorrect password')
        } else if (!this.captcha) {
          return this.showAlert('incorrect captcha')
        }
        // 判断用户是通过密码登录
        result = await reqPwdLogin({name, pwd, captcha})
      }
      // 不管用户是通过何种方式登录，结果统一在result里，然后关闭定时器
      if (this.countTime) {
        this.countTime = 0
        clearInterval(this.intervalId)
        this.intervalId = 0
      }
      if (result.code === 0) {
        // 正常结果返回后保存数据，并实现路由跳转
        const user = result.data
        this.$store.dispatch('recordUser', user)
        this.$router.replace('/profile')
      } else {
        const msg = result.msg
        this.showAlert(msg)
        // 如果登录失败，图形验证码要更换
        this.getCaptcha()
        this.captcha = ''
      }
    },
    getCaptcha () {
      // 路径加上 ?time=+date.now() 获取每次点击的时间差，从而实现每次点击访问同一地址，获得随机的captcha验证码
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    }
  }
}

</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(30px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>
