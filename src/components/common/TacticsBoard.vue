<!-- 战术板 -->
<style lang="less" scoped>
  .tactics-board {
    .formation-txt {
      height: .5rem;
      line-height: .5rem;
      font-size: .26rem;
      color: #282828;
      text-align: center;
    }
    .board-container {
      height: 4.8rem;
      background: url(http://share.greenplayer.cn/share/img/match/full-board-min.png);
      background-size: 100% 100%;
      .board-detail {
        height: 100%;
        color: #282828;
        .formation-list {
          display: flex;
          height: 100%;
          &.home {
            flex-direction: row-reverse;
          }
          &.away {
            span {
              background: yellow !important;
            }
          }
          .formation-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .player-num {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              span {
                display: inline-block;
                font-size: .24rem;
                height: .4rem;
                line-height: .4rem;
                width: .4rem;
                text-align: center;
                background: #fff;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div class="tactics-board">
    <p class="_flex formation-txt">
      <span class="_flex-item">{{formationA.name}}</span>
      <span class="_flex-item">比赛阵型</span>
      <span class="_flex-item">{{formationB.name}}</span>
    </p>
    <div class="_clearfix board-container">
      <div class="_left _width50 board-detail left">
        <ul class="formation-list home">
          <li class="formation-item" v-for="(item, index) in formationListA">
            <p class="player-num" v-for="(player, i) in item"><span @click="show(player.playerName)">{{player.memberNumber | formateMemberNumber}}</span></p>
          </li>
        </ul>
      </div>
      <div class="_left _width50 board-detail right">
        <ul class="formation-list away">
          <li class="formation-item" v-for="(item, index) in formationListB">
            <p class="player-num" v-for="(player, i) in item"><span @click="show(player.playerName)">{{player.memberNumber | formateMemberNumber}}</span></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    props: {
      formationListA: Array,
      formationListB: Array,
      formationA: Object,
      formationB: Object
    },
    filters: {
      formateMemberNumber (val) {
        return +val >= 0 ? val : 'N'
      }
    },
    methods: {
      show (name) {
        name && this.$store.commit('showToast', name)
      }
    }
  }
</script>
