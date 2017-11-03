<!-- QuizCard.vue 竞猜的详情项 -->
<style lang="less" scoped>
  .quiz-card {
      .quiz-basis {
        position: relative;
        height: .7rem;
        overflow: hidden;
        .against-info {
          display: flex;
          align-items: center;
          padding: 0 .2rem;
          height: 100%;
          line-height: .4rem;
        }
        .team-name {
          flex: 0 0 1;
          max-width: 2.4rem;
        }
        .result {
          flex: 0 0 1;
          padding: 0 .1rem;
          color: #32b847;
          text-align: center;
        }
        .quiz-status {
          position: absolute;
          right: 0;
          top: 0;
          width: 1.2rem;
          height: .4rem;
          padding-left: .2rem;
          line-height: .4rem;
          background: red;
          color: #fff;
          text-align: center;
          &::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            font-size: 0;
            border: 0;
            border-bottom: .4rem solid #fff;
            border-right: .2rem solid transparent; 
          }
        }
      }
      .quiz-detail {
        display: flex;
        justify-content: space-between;
        padding: .3rem .2rem;
        line-height: .6rem;
        .part-in {
          color: #787878;
        }
        .use-bill {
          font-size: .4rem;
        }
        .bill-get {
          height: .6rem;
        }
      }
      .quiz-launch {
        padding: .1rem 0;
        height: .8rem;
        line-height: .4rem;
        overflow: hidden;
        .launch-item {
          display: flex;
          justify-content: center;
          align-items: center;
          height: .6rem;
          padding-right: .06rem;
        }
        .launcher {
          flex: 0 0 .9rem;
        }
        .portrait {
          flex: 0 0 .44rem;
          height: .44rem;
          margin: 0 .1rem;
        }
      }
    }
</style>

<template>
  <div class="quiz-card" @click="goMatchQuiz(data)">
    <div class="quiz-basis border-bottom">
      <div class="against-info">
        <p class="team-name _ellipsis">{{data.party_a_name}}</p>
        <div class="result">{{data | getMatchResult}}</div>
        <p class="team-name _ellipsis">{{data.party_b_name}}</p>
      </div>
      <div class="quiz-status" :style="{background: getStatusDesc(data).bgc}">{{getStatusDesc(data).text}}</div>
    </div>
    <div class="border-bottom">
      <div class="quiz-detail">
        <div class="part-in">
          <p>参与用户：{{data.userNum}}人</p>
          <p>截止时间：{{data.match_time ? data.match_time.replace(/:\d+$/, '') : ''}}</p>
        </div>
        <div class="ball-bill">
          <p class="bill-get">获得球币：<span class="use-bill" :style="{color: +data.quizStatus === 3 ? '#fa0a0a' : ''}">{{+data.quizStatus >= 3 ? data.awardBillTotal : '--'}}</span></p>
          <p>使用球币：{{data.billTotal || 0}}</p>
        </div>
      </div>
    </div>
    <div class="quiz-launch">
      <div class="center-line _clearfix">
        <div class="launch-item _left _width50">
          <div class="launcher">发起人:</div>
          <div class="portrait">
            <img class="_fullimg _border-radius50" :src="data | getPlayerPortrait" alt="">
          </div>
          <div class="_ellipsis">{{data | getPlayerName}}</div>
        </div>
        <div class="launch-item _left _width50" @click.stop="inviteUser(data)">
          <div class="portrait">
            <img class="_fullimg _border-radius50" src="//share.greenplayer.cn/share/img/icon/username.png" alt="">
          </div>
          <div class="_ellipsis">邀请用户</div>
        </div>
      </div>
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
      playerName: '',
      playerPortrait: ''
    },
    filters: {
      getMatchResult (val) {
        return val.scoreA && val.scoreB ? `${val.scoreA} : ${val.scoreB}` : 'VS'
      },
      getPlayerPortrait (val) {   // 客服MM发起
        if (+val.launcherType === 0 && +val.launcherId === 145) {
          return '//share.greenplayer.cn/share/img/logo.png'
        }
        return val.playerPortrait
      },
      getPlayerName (val) {   // 客服MM发起
        if (+val.launcherType === 0 && +val.launcherId === 145) {
          return '绿茵场'
        }
        return val.playerName
      }
    },
    methods: {
      getStatusDesc (item) {    // 转换竞猜状态信息
        let status = item.quizStatus
        if (+status === 1) {
          return {
            bgc: '#32b847',
            text: '竞猜中'
          }
        } else if (+status === 2) {
          return {
            bgc: '#32b847',
            text: '比赛中'
          }
        } else if (+status === 3) {
          return {
            bgc: '#fa0a0a',
            text: '已猜中'
          }
        } else if (+status === 4) {
          return {
            bgc: '#a0a0a0',
            text: '未猜中'
          }
        } else if (+status === 5) {
          return {
            bgc: '#59bfb9',
            text: '已结束'
          }
        } else if (+status === 6) {
          return {
            bgc: '#a0a0a0',
            text: '已失效'
          }
        }
      },
      goMatchQuiz (item) {    // 跳转竞猜
        let sendData = {
          type: 'goMatchQuiz',
          matchId: item.matchId,
          quizId: item.quizId
        }
        if (this.$sendDataToClient(sendData)) {
          return
        }
        this.$router.push({
          path: 'matchdetail',
          query: {
            matchId: item.matchId,
            quizId: item.quizId
          }
        })
      },
      inviteUser (item) {   // 邀请用户参与竞猜
        let sendData = {
          type: 'inviteUser',
          matchId: item.matchId,
          quizId: item.quizId,
          url: `${location.protocol}//${location.host}${location.pathname}#/matchdetail?matchId=${item.matchId}&quizId=${item.quizId}`,
          title: `${this.playerName} 邀请你一起来参与比赛竞猜`,
          desc: `${item.party_a_name}vs${item.party_b_name}将于${item.match_time.replace(/:\d+$/, '')}在${item.courtName}精彩对决，快来一起竞猜吧`,
          imgUrl: `${this.playerPortrait}`
        }
        if (this.$sendDataToClient(sendData)) {
          return
        }
      }
    }
  }
</script>
