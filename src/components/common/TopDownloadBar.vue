<!-- 分享出去的页面显示在顶部的下载条 -->
<style lang="less" scoped="">
  .top-bar {
    width: 100%;
    height: .7rem;
    .download {
      top: 0;
      left: 0;
      right: 0;
      height: .7rem;
      line-height: .7rem;
      vertical-align: text-bottom;
      background: #5e81be;
      z-index: 11;
      overflow: hidden;
      .logo {
        margin: .10rem;
        width: .50rem;
        height: .50rem;
        background-image: url(//share.greenplayer.cn/share/img/logo.png);
        background-size: 100%;
        background-repeat: no-repeat;
      }
      .text {
        width: 3rem;
        color: #fff;
        font-size: .2rem;
      }
      .download-btn {
        margin-right: .1rem;
        margin-top: .1rem;
        width: 2rem;
        height: .5rem;
        line-height: .5rem;
        background: #4cc334;
        border-radius: 5px;
        font-size: .28rem;
        color: #fff;
      }
    }
    .top-place {
      width: 100%;
      height: 100%;
    }
  }
</style>

<template>
  <div class="top-bar">
    <div class="download _fixed">
      <div class="_left logo"></div>
      <div class="_left text _ellipsis">{{topBarText}}</div>
      <a class="_right download-btn _txt-center _block" href="http://www.greenplayer.cn/download/">开启绿茵场</a>
    </div>
    <div class="top-place"></div>
  </div>
</template>

<script>
  export default {
    computed: {
      topBarText () { return this.$store.state.topBarText }
    }
  }
</script>
