<!-- 加载动画 -->
<style lang="less" scoped>
  .loading {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, .3);
    z-index: 100;
    .loading-icon {
      width: 1.6rem;
      height: 1.6rem;
      background-image: url(//share.greenplayer.cn/share/img/loading.png);
      background-size: 100% auto;
      background-repeat: no-repeat;
      background-position: 0 0;
    }
  }
</style>

<template>
  <div class="loading">
    <!-- <div class="loading-icon" :style="{'background-position': pos}"></div> -->
    <img src="//share.greenplayer.cn/share/img/playerloading.gif" alt="">
  </div>
</template>

<script>
  export default {
    data () {
      return {
        positionY: 0,
        pos: ''
      }
    },
    mounted () {
      // setInterval(() => {
      //   this.positionY = this.positionY < 33.6 ? this.positionY + 1.6 : 0
      //   this.pos = `0 -${this.positionY}rem`
      // }, 100)
    }
  }
</script>
