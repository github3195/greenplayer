<!-- MatchAgainst.vue 比赛的对阵信息，单独提一个组件，能更灵活的复用 -->
<style lang="less" scoped>
  .match-against {
    text-align: center;
    .team-info {
      width: 30%;
      .team-portrait {
        position: relative;
        margin: .2rem auto;
        width: 0.9rem;
        height: 0.9rem;
        font-size: 0;
        .uniform {
          position: absolute;
          top: 0;
          height: .9rem;
          width: .14rem;
          border: 1px solid #b4b4b4;
          &.left {
            left: -0.4rem;
          }
          &.right {
            right: -0.4rem;
          }
          .uniform-color {
            height: 33.333333%;
            &.coat, &.pant{
              border-bottom: 1px solid #b4b4b4;
            }
          }
        }
      }
      .team-name {
        font-size: 0.24rem;
        line-height: .3rem;
        color: #282828;
        padding: 0 .1rem .2rem;
      }
    }
    .match-info {
      position: relative;
      width: 40%;
      color: #282828;
      min-height: 1.8rem;
      padding-top: .3rem;
      .turn-name {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        font-size: .2rem;
        line-height: .4rem;
      }
      .referee-role {
        position: absolute;
        top: -1px;
        left: 0;
        right: 0;
        margin: auto;
        width: 1rem;
        height: .3rem;
        line-height: .3rem;
        color: white;
        font-size: .2rem;
      }
      .referee-text::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        border-bottom: .3rem solid #fff;
        border-right: .1rem solid transparent; 
      }
      .referee-text::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        border-bottom: .3rem solid #fff;
        border-left: .1rem solid transparent; 
      }
      .score {
        font-size: 0.4rem;
        color: #505050;
        line-height: .5rem;
      }
      .penalty-score {
        font-size: .22rem;
      }
      .time, .field {
        font-size: 0.22rem;
        line-height: .4rem;
      }
      .result-icon {
        position: absolute;
        bottom: .1rem;
        left: 0;
        right: 0;
        margin: auto;
        width: .9rem;
        height: .9rem;
      }
    }
  }
</style>

<template>
  <div class="match-against _clearfix" @click.stop="goMatchDetail(matchInfo.matchId, matchInfo.quizId)">
    <div class="team-info _left">
      <div class="team-portrait">
        <img class="_fullimg" :src="matchInfo.homeIcon || '//share.greenplayer.cn/share/img/dt.png'" alt="">
        <div class="uniform left" v-if="matchInfo.homeCoat||matchInfo.homePant||matchInfo.homeSock">
          <p class="uniform-color coat" :style="{background: matchInfo.homeCoat}"></p>
          <p class="uniform-color pant" :style="{background: matchInfo.homePant}"></p>
          <p class="uniform-color sock" :style="{background: matchInfo.homeSock}"></p>
        </div>
      </div>
      <p class="_ellipsis team-name">{{matchInfo.homeName || '待定'}}</p>
    </div>
    <div class="match-info _left">
      <div class="referee-role" v-if="matchInfo.refereeRoleId">
        <p class="referee-text" style="background:#32b847;" v-if="+matchInfo.refereeRoleId === 1">主 裁</p>
        <p class="referee-text" style="background:#24bfb9;" v-if="+matchInfo.refereeRoleId === 2 || +matchInfo.refereeRoleId === 3">边 裁</p>
        <p class="referee-text" style="background:rgb(94,129,190);" v-if="+matchInfo.refereeRoleId === 4">四 官</p>
      </div>
      <p class="_ellipsis turn-name" v-if="matchInfo.turnName">{{matchInfo.turnName}}</p>
      <p class="_ellipsis score">
        <span class="penalty-score" v-if="matchInfo.homePenaltyScore">({{matchInfo.homePenaltyScore}})</span>
        {{getScores}}
        <span class="penalty-score" v-if="matchInfo.awayPenaltyScore">({{matchInfo.awayPenaltyScore}})</span>
      </p>
      <p class="_ellipsis time">{{matchInfo.matchTime}}</p>
      <p class="_ellipsis field">{{matchInfo.courtName}}</p>
      <div class="result-icon">
        <img v-if="+matchInfo.gameResult===1"
             class="_fullimg"
             src="http://share.greenplayer.cn/share/img/icon/content_seal_sheng_nor@3x.png"
             alt="">
        <img v-else-if="+matchInfo.gameResult===0"
             class="_fullimg"
             src="http://share.greenplayer.cn/share/img/icon/content_seal_ping_nor@3x.png"
             alt="">
        <img v-else-if="+matchInfo.gameResult===-1"
             class="_fullimg"
             src="http://share.greenplayer.cn/share/img/icon/content_seal_fu_nor@3x.png"
             alt="">
      </div>
    </div>
    <div class="team-info _left">
      <div class="team-portrait">
        <img class="_fullimg" :src="matchInfo.awayIcon || '//share.greenplayer.cn/share/img/dt.png'" alt="">
        <div class="uniform right" v-if="matchInfo.awayCoat||matchInfo.awayPant||matchInfo.awaySock">
          <p class="uniform-color coat" :style="{background: matchInfo.awayCoat}"></p>
          <p class="uniform-color pant" :style="{background: matchInfo.awayPant}"></p>
          <p class="uniform-color sock" :style="{background: matchInfo.awaySock}"></p>
        </div>
      </div>
      <p class="_ellipsis team-name">{{matchInfo.awayName || '待定'}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      matchInfo: '',
      isQuiz: {
        default: false
      }
    },
    computed: {
      getScores () {
        if (this.matchInfo.homeScore && this.matchInfo.awayScore) {
          return `${this.matchInfo.homeScore} : ${this.matchInfo.awayScore}`
        }
        if (+this.matchInfo.isDelay === 1) {
          return '比赛延期'
        }
        if (+this.matchInfo.isWaiver === 1) {
          return '双方弃权'
        }
        return 'VS'
      }
    },
    methods: {
      goMatchDetail (id, quizId) {
        let sendData = {
          type: 'goMatch',
          matchId: id
        }
        if (this.isQuiz) {
          sendData = {
            type: 'goMatchQuiz',
            matchId: id,
            quizId: quizId
          }
        }
        if (this.$sendDataToClient(sendData)) {
          return
        }
        this.$router.push({
          path: 'matchdetail',
          query: {
            matchId: id,
            quizId: quizId
          }
        })
      }
    }
  }
</script>
