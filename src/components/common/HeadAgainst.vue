<!-- 头部对阵信息 -->
<style lang="less" scoped>
  .against {
    position: relative;
    width: 100%;
    height: 3.2rem;
    font-size: .24rem;
    overflow: hidden;
    .against-background {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: url(http://share.greenplayer.cn/share/img/against-bg.png);
      background-size: 100% 100%;
    }
    .against-container {
      position: relative;
      z-index: 5;
      height: 100%;
      .against-team {
        width: 32%;
        height: 100%;
        .team-logo {
          position: relative;
          width: 1.25rem;
          height: 1.25rem;
          margin: .8rem auto .3rem;
          .uniform {
            position: absolute;
            top: 0;
            height: 100%;
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
              &.coats, &.pants{
                border-bottom: 1px solid #b4b4b4;
              }
            }
          }
        }
        .team-name {
          margin: 0 auto;
          padding: 0 .1rem;
          width: 2.3rem;
          font-size: .24rem;
          line-height: .3rem;
          max-height: .6rem;
          overflow: hidden;
          color: #fff;
          text-align: center;
        }
      }
      .against-info {
        width: 36%;
        height: 100%;
        color: #fff;
        .against-score {
          font-size: .4rem;
          margin: .9rem 0 .2rem 0;
          span {
            font-size: .24rem;
          }
        }
        .against-date {
          margin: .2rem 0;
          line-height: .32rem;
        }
        .against-court {
          margin: .2rem 0;
          line-height: .32rem;
        }
        .video-link {
          margin: 0 auto;
          display: block;
          width: 1.6rem;
          font-size: .22rem;
          height: .5rem;
          line-height: .5rem;
          background: #32b847;
          color: #fff;
          border-radius: 5px;
        }
      }
    }
  }
</style>

<template>
  <div class="against">
    <div class="against-background"></div>
    <div class="against-container">
      <div class="_left against-team home">
        <div class="team-logo">
          <div class="uniform left" v-if="String(homeUniform.coatColor) && String(homeUniform.pantsColor) && String(homeUniform.socksColor)">
            <p class="uniform-color coats" :style="{background: String(homeUniform.coatColor).replace(/0x/, '#')}"></p>
            <p class="uniform-color pants" :style="{background: String(homeUniform.pantsColor).replace(/0x/, '#')}"></p>
            <p class="uniform-color socks" :style="{background: String(homeUniform.socksColor).replace(/0x/, '#')}"></p>
          </div>
          <img class="_fullimg" :src="matchResult.a_icon || cndefault_team_portrait" alt="">
        </div>
        <p class="team-name">{{matchResult.a_name || '待定'}}</p>
      </div>
      <div class="_left against-info _txt-center">
        <p class="against-score">
          <span v-if="matchResult.penalty_score_a||matchResult.penalty_score_b">({{matchResult.penalty_score_a}})</span>
          {{setScore(matchResult.cur_score_a, matchResult.cur_score_b)}}
          <span v-if="matchResult.penalty_score_b||matchResult.penalty_score_a">({{matchResult.penalty_score_b}})</span>
        <p class="against-date _ellipsis">{{matchResult.matchTime ? String(matchResult.matchTime).replace(/(\:\d\d)$/i, '') : ''}}</p>
        <p class="against-court _ellipsis">{{matchResult.courtName}}</p>
        <a class="video-link _ellipsis"
           href="javascript:void(0);"
           @click="goLive(matchResult.videoLiveUrl)"
           v-if="showVideoLink">视频直播</a>
      </div>
      <div class="_left against-team away">
        <div class="team-logo">
          <div class="uniform right" v-if="String(awayUniform.coatColor) && String(awayUniform.pantsColor) && String(awayUniform.socksColor)">
            <p class="uniform-color coats" :style="{background: String(awayUniform.coatColor).replace(/0x/, '#')}"></p>
            <p class="uniform-color pants" :style="{background: String(awayUniform.pantsColor).replace(/0x/, '#')}"></p>
            <p class="uniform-color socks" :style="{background: String(awayUniform.socksColor).replace(/0x/, '#')}"></p>
          </div>
          <img class="_fullimg" :src="matchResult.b_icon || cndefault_team_portrait" alt="">
        </div>
        <p class="team-name">{{matchResult.b_name || '待定'}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        cndefault_team_portrait: '//share.greenplayer.cn/share/img/dt.png'
      }
    },
    props: {
      matchResult: Object,
      homeUniform: Object,
      awayUniform: Object
    },
    methods: {
      setScore (scoreA, scoreB) {
        if (scoreA && scoreB) return scoreA + ' : ' + scoreB
        if (+this.matchResult.isDelay === 1) {
          return '比赛延期'
        }
        if (+this.matchResult.isWaiver === 1) {
          return '双方弃权'
        }
        return 'VS'
      },
      goLive (link) {   // 直播链接跳转
        if (!link) {
          this.$store.commit('showToast', '无效地址')
          return
        }
        let sendData = {
          type: 'openUrlWithBrowser',
          url: link
        }
        if (this.$sendDataToClient(sendData)) {
          return
        }
        window.open(link)
      }
    },
    computed: {
      showVideoLink () {
        if (this.matchResult.videoLiveUrl) {
          let now = new Date()
          let matchTime = new Date(this.matchResult.matchTime.replace(/-/g, '/'))
          let halfHourAdvance = new Date(matchTime.getTime() - (30 * 60 * 1000))
          let twoHourDelay = new Date(matchTime.getTime() + (120 * 60 * 1000))
          if (this.matchResult.scores_a && this.matchResult.scores_b) {
            return false
          } else if (now > halfHourAdvance && now < twoHourDelay) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      }
    },
    mounted () {
    }
  }
</script>
