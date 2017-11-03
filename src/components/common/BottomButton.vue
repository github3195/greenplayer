<!-- BottomButton.vue 底部的按钮 -->
<style lang="less" scoped>
  .bottom-button {
    .bottom-place {
      height: .98rem;
      width: 100%;
    }
    .button-container {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: .98rem;
      padding: .14rem;
      background: #fff;
      box-shadow: 0 0 1px #a0a0a0;
      .bottom-place {
      }
      .button {
        display: block;
        margin: 0 auto;
        height: .7rem;
        line-height: .7rem;
        text-align: center;
        width: 6.8rem;
        background: #32b847;
        border-radius: 4px;
        font-size: .28rem;
        color: #fff;
      }
    }
  }
</style>

<template>
  <div class="bottom-button">
    <div class="bottom-place"></div>
    <div class="button-container">
      <div class="button" @click="buttonClick">{{buttonText}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      buttonText: ''
    },
    methods: {
      buttonClick () {
        this.$emit('bindClick')
      }
    }
  }
</script>
