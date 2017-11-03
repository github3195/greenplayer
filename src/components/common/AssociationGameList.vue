<!-- AssociationGameList.vue 协会赛事列表 -->
<style lang="less" scoped>
  .game-info {
    height: 1.4rem;
    font-size: .28rem;
    color: #282828;
    display: flex;
    padding: .2rem;
    overflow: hidden;
    .portrait {
      flex: 0 0 1rem;
      height: 1rem;
      margin-right: .1rem;
    }
    .status {
      flex: 0 0 .8rem;
      height: .3rem;
      line-height: .35rem;
      color: #fff;
      text-align: center;
      font-size: .2rem;
      margin-right: .1rem;
      border-radius: 3px;
    }
    .summary {
      flex: 1;
      overflow: hidden;
    }
    .name {
      line-height: .32rem;
      height: .64rem;
      overflow: hidden;
    }
    .desc {
      color: #646464;
      font-size: .2rem;
      line-height: .36rem;
    }
  }
</style>

<template>
  <div class="game-info border-bottom" @click="jump(data.id)">
    <div class="portrait">
      <img class="_fullimg" :src="data.portrait" alt="">
    </div>
    <div class="status" :style="{background: getGameStatus(data.status).color}">{{getGameStatus(data.status).text}}</div>
    <div class="summary">
      <div class="name">{{data.name}}</div>
      <div class="desc">{{data.desc}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      data: '',
      type: ''
    },
    methods: {
      getGameStatus (status) {
        if (+status === 0) {
          return {
            color: '#fd5f46',
            text: '创建中'
          }
        } else if (+status === 1) {
          return {
            color: '#66d993',
            text: '报名中'
          }
        } else if (+status === 5 || +status === 7) {
          return {
            color: '#fd5f46',
            text: '筹备中'
          }
        } else if (+status > 10 && +status < 30) {
          return {
            color: '#5e81be',
            text: '进行中'
          }
        } else if (+status === 30) {
          return {
            color: '#c8c8c8',
            text: '已结束'
          }
        }
        return {
          color: '#c8c8c8',
          text: '未知'
        }
      },
      jump (id) {
        let sendData = {
          type: 'goThirdParty',
          targetType: 3,
          targetId: id
        }
        if (!this.$sendDataToClient(sendData)) {
          if (+this.type === 5) {   // 跳第三方主页
            this.$router.push({
              path: 'thirdpartyhome',
              query: {
                pageType: 3,
                gameId: id
              }
            })
          }
        }
      }
    }
  }
</script>
