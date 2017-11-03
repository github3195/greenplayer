<!-- PortraitText.vue 左边缩略图，右边文字描述的模板 -->
<style lang="less" scoped>
  .portrait-text {
    display: flex;
    font-size: 0;
    overflow: hidden;
    .portrait {
      flex: 0 0 1.2rem;
      height: 1.2rem;
      margin-right: .2rem;
    }
    .text {
      position: relative;
      flex: 1;
      overflow: hidden;
      .name {
        position: absolute;
        top: 0;
        left: 0;
        font-size: .3rem;
        color: #282828;
        line-height: .4rem;
        height: .8rem;
        overflow: hidden;
      }
      .desc {
        position: absolute;
        bottom: 0;
        font-size: .22rem;
        color: #646464;
        line-height: .32rem;
      }
    }
  }
</style>

<template>
  <div class="portrait-text">
    <div class="portrait">
      <img class="_fullimg" :src="data.portrait" alt="">
    </div>
    <div class="text">
      <div class="name" v-html="data.name"></div>
      <div class="desc _ellipsis">{{data.desc}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      data: ''
    }
  }
</script>
