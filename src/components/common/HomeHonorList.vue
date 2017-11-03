<!-- HomeHonorList.vue -->
<style lang="less" scoped>
  .honor-container {
    text-align: center;
    color: #282828;
    .honor {
      .portrait {
        width: 1.5rem;
        height: 1.5rem;
        margin: .2rem auto;
      }
      .honor-name {
        font-size: .24rem;
      }
      .honor-game {
        font-size: .22rem;
        margin: .2rem .1rem;
        line-height: .3rem;
        max-height: .6rem;
        overflow: hidden;
      }
    }
  }
</style>

<template>
  <div class="honor-container border-bottom">
    <ul class="honor-list _clearfix">
      <li class="honor _left _width33" v-for="item in honorsList" @click="goGameHonor(item.gameId)">
        <div class="portrait">
          <img class="_fullimg" :src="item.portrait" alt="">
        </div>
        <div class="honor-name">{{item.name}}</div>
        <div class="honor-game">{{item.game}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      honorsList: ''
    },
    methods: {
      goGameHonor (gameId) {
        let url = `http://share.greenplayer.cn/share/honors.html?fromApp=true&gameId=${gameId}`
        let sendData = {
          type: 'goUrl',
          url: url
        }
        if (this.$sendDataToClient(sendData)) {
          return
        }
        window.open(url)
      }
    }
  }
</script>
