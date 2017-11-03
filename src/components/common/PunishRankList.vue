<!-- 红黄牌榜单 PunishRankList.vue -->
<style lang="less" scoped>
  .game-data-container {
    position: relative;
    height: 100%;
    text-align: center;
    .data-list-head {
      position: relative;
      z-index: 3;
      height: .6rem;
      line-height: .6rem;
      font-size: .24rem;
      // box-shadow: 0 1px 1px #999;
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #c4c4c4;
        transform: scaleY(0.5);
      }
    }
    .data-list {
      position: absolute;
      top: .6rem;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      .data-item {
        font-size: .24rem;
        color: #282828;
        &::after {
          content: '';
          display: block;
          width: 100%;
          height: 1px;
          background: #c4c4c4;
          transform: scaleY(0.5);
        }
        .team-info {
          height: .98rem;
          line-height: .98rem;
          &::after {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background: #c4c4c4;
            transform: scaleY(0.5);
          }
          .team {
            display: flex;
            align-items: center;
            .team-portrait {
              flex: 0 0 .6rem;
              width: .6rem;
              height: .6rem;
              margin-right: .1rem;
            }
          }
          .show-more-icon {
            position: absolute;
            left: 0;
            right: 0;
            bottom: .15rem;
            margin: auto;
            width: .15rem;
            height: .15rem;
            border-left: 1px solid #646464;
            border-bottom: 1px solid #646464;
            transform: rotate(-45deg);
          }
        }
        .player-list {
          .player-item {
            height: .98rem;
            line-height: .98rem;
            .player-info {
              position: relative;
              display: flex;
              align-items: center;
              .team-portrait {
                flex: 0 0 .6rem;
                width: .6rem;
                height: .6rem;
                margin-right: .1rem;
              }
              .player-link {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                z-index: 2;
              }
            }
          }
        }
      }
    }
    .no-data {
      height: 1rem;
      line-height: 1rem;
    }
    .width-large {width: 46%; height: 100%;}
    .width-middle {width: 30%; height: 100%;}
    .width-small {width: 12%; height: 100%;}
  }
</style>

<template>
  <div class="game-data-container">
    <ul class="data-list-head _clearfix">
      <li class="_left _ellipsis width-small">排行</li>
      <li class="_left _ellipsis width-large">球队(球员)</li>
      <li class="_left _ellipsis width-middle">红/黄牌</li>
      <li class="_left _ellipsis width-small">处罚</li>
    </ul>
    <ul class="data-list" :style="{overflow: scrollable ? 'scroll' : 'hidden'}">
      <li class="data-item" v-for="(item, index) in datalist" @click.stop="togglePlayerList">
        <div class="team-info _clearfix">
          <div class="_left _ellipsis width-small">{{++index}}</div>
          <div class="_left _ellipsis width-large team">
            <div class="team-portrait">
              <img class="_fullimg" :src="item.teamIcon" alt="">
            </div>
            <div class="_ellipsis">{{item.teamName}}</div>
          </div>
          <div class="_left _ellipsis width-middle">{{item.totalRedCard}}/{{item.totalYellowCard}}</div>
          <div class="_left _ellipsis width-small _rel">
            罚分{{item.deductPoints}}
            <i class="show-more-icon"></i>
          </div>
        </div>
        <ul class="player-list" @click.stop>
          <li class="_clearfix player-item" v-for="player in item.players" @click="jump(player.uid)">
            <div class="_left _ellipsis width-small"></div>
            <div class="_left _ellipsis width-large player-info">
              <!-- <a class="player-link" href="javascript:;"></a> -->
              <div class="team-portrait">
                <img class="_fullimg" :src="player.userIcon" alt="">
              </div>
              <div class="_ellipsis">{{player.userName}}</div>
            </div>
            <div class="_left _ellipsis width-middle">{{player.RedCard}}/{{player.YellowCard}}</div>
            <div class="_left _ellipsis width-small" v-if="+player.suspendCount>0">停赛{{player.suspendCount}}</div>
          </li>
        </ul>
      </li>
    </ul>
    <div class="no-data" v-if="datalist.length<1">暂无数据</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    props: {
      datalist: '',
      scrollable: ''
    },
    methods: {
      togglePlayerList (e) {
        let target = e.target || e.srcElement
        let parent = target.parentNode
        while (!(/data-item/i).test(parent.className)) {
          parent = parent.parentNode
        }
        let playerList = parent.lastChild
        playerList.style.display = playerList.style.display === 'none' ? 'block' : 'none'
      },
      jump (id) {
        let sendData = {
          type: 'goThirdParty',
          targetType: 1,
          targetId: id
        }
        if (this.$sendDataToClient(sendData)) {
          return
        }
        this.$router.push({
          path: 'thirdpartyhome',
          query: {
            pageType: 1,
            playerId: id
          }
        })
      }
    }
  }
</script>
