<!-- 赛事数据列表，射手，助攻GameDataRankList.vue -->
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
        height: .98rem;
        line-height: .98rem;
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
        .player {
          position: relative;
          display: flex;
          align-items: center;
          .player-link {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 2;
          }
          .player-portrait {
            flex: 0 0 .6rem;
            width: .6rem;
            height: .6rem;
            margin-right: .1rem;
          }
        }
      }
    }
    .no-data {
      height: 1rem;
      line-height: 1rem;
    }
    .width-large {width: 35%; height: 100%;}
    .width-middle {width: 20%; height: 100%;}
    .width-small {width: 10%; height: 100%;}
  }
</style>

<template>
  <div class="game-data-container">
    <ul class="data-list-head _clearfix">
      <li class="_left _ellipsis width-small">排行</li>
      <li class="_left _ellipsis width-large">球员</li>
      <li class="_left _ellipsis width-large">所属球队</li>
      <li class="_left _ellipsis width-middle">{{+rankType===1?'进球(点球)':'助攻'}}</li>
    </ul>
    <ul class="data-list" :style="{overflow: scrollable ? 'scroll' : 'hidden'}">
      <li class="data-item _clearfix" v-for="(item, index) in datalist" @click="jump(item.uid)">
        <div class="_left _ellipsis width-small">{{item.rank}}</div>
        <div class="_left _ellipsis width-large player">
          <!-- <a class="player-link" href="javascript:;"></a> -->
          <div class="player-portrait">
            <img class="_fullimg" :src="item.userIcon" alt="">
          </div>
          <div class="_ellipsis">{{item.userName}}</div>
        </div>
        <div class="_left _ellipsis width-large">{{item.teamName}}</div>
        <div class="_left _ellipsis width-middle">{{item.totalScore}}<span v-if="+rankType===1">({{item.reserved}})</span></div>
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
      rankType: '',
      scrollable: ''
    },
    methods: {
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
