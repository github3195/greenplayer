<!-- toast 吐司提示 -->
<style lang="less" scoped>
  .toast {
    position: fixed;
    z-index: 99;
    top: 75%;
    left: 0;
    right: 0;
    font-size: 0;
    text-align: center;
    .toast-text {
      display: inline-block;
      font-size: .28rem;
      max-width: 80%;
      padding: .1rem .4rem;
      line-height: .4rem;
      color: #fff;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.5);
    }
  }
</style>

<template>
  <div class="toast">
    <span class="toast-text">{{toastText}}</span>
  </div>
</template>

<script>
  export default {
    computed: {
      toastText () {
        return this.$store.state.toastText
      }
    }
  }
</script>
