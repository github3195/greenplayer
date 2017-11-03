<!-- ViewPicture.vue 查看图片的工具 -->
<style lang="less" scoped>
  .view-picture {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #000;
    .swiper-container {
      width: 100%;
      height: 100%;
    }
    .img-container {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        max-height: 100%;
      }
    }
    .go-back {
      position: absolute;
      top: .3rem;
      right: .3rem;
      z-index: 3;
      width: .6rem;
      height: .6rem;
      background: url(http://share.greenplayer.cn/share/img/icon/close.png) no-repeat;
      background-size: 100% 100%;
    }
  }
</style>

<template>
  <transition name="slideleft">
    <div class="view-picture">
      <div class="go-back" @click="goBack"></div>
      <wc-swiper class="swiper-container" :autoplay="false" :defaultSlide="transData.currentIndex">
        <wc-slide v-for="(item, key) in transData.imageList" :key="key">
          <div class="img-container">
            <img class="" :src="item" alt="">
          </div>
        </wc-slide>
      </wc-swiper>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'ViewPicture',
    data () {
      return {}
    },
    computed: {
      transData () {
        return this.$store.state.transData
      }
    },
    mounted () {
      document.title = '查看图片'
      this.$store.commit('setTopBar', false)
      this.$store.commit('setUserList', false)
      document.documentElement.style.height = document.body.style.height = document.querySelector('#app').style.height = '100%'
    },
    methods: {
      goBack () {
        history.back()
      }
    },
    components: {}
  }
</script>
