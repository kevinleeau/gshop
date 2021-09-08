<template>
 <!-- 接收到父组件的数据后使用 -->
 <div class="star" :class="'star-' + size">
   <!-- 循环遍历starArr, 把不同的item作为class绑定渲染 -->
   <!-- starArr根据score计算得出 -->
    <span class="star-item" v-for="(item, index) in starArr" :class="item" :key="index"></span>
  </div>
</template>

<script>
const classOn = 'on'
const classOff = 'off'
const classHalf = 'half'
export default {
  // 子组件里接收父组件发送过来的score和size数据
  props: {
    score: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  },
  // 0.5 等于半星，必须满足5星占位符，example:
  computed: {
    starArr () {
      const { score } = this
      const scs = []
      // 取得score的整数为
      const scoreInteger = Math.floor(score)
      // 向scs中添加多个classOn，全星；0或1个classHalf，半星；多个classOff，0星
      for (let i = 0; i < scoreInteger; i++) {
        scs.push(classOn)
      }
      if (score * 10 - scoreInteger * 10 >= 0.5) {
        scs.push(classHalf)
      }
      while (scs.length < 5) {
        scs.push(classOff)
      }
      return scs
    }
  }
}

</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
