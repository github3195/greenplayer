<!-- SimpleCycle.vue -->
<style lang="less" scoped>
  .simple-cycle-container {
    text-align: center;
    .score-board-head {
      height: .6rem;
      line-height: .6rem;
      font-size: .24rem;
      background: #f0f0f0;
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #c4c4c4;
        transform: scaleY(0.5);
      }
    }
    .score-board-list {
      .score-board-item {
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
        .team {
          display: flex;
          align-items: center;
          .team-portrait {
            flex: 0 0 .6rem;
            height: .6rem;
            margin-right: .1rem;
          }
        }
      }
    }
    .width-large { width: 30%; height: 100%;}
    .width-middle { width: 16%; height: 100%;}
    .width-small { width: 9%; height: 100%;}
    .match-title {
      height: .7rem;
      line-height: .7rem;
      background: #f0f0f0;
      font-size: .3rem;
      text-align: center;
      box-shadow: 0 1px 1px #c4c4c4;
    }
  }
</style>

<template>
  <div class="simple-cycle-container">
    <ul class="score-board-head _clearfix">
      <li class="_left _ellipsis width-small">排名</li>
      <li class="_left _ellipsis width-large">队徽/队名</li>
      <li class="_left _ellipsis width-small">场次</li>
      <li class="_left _ellipsis width-small">胜</li>
      <li class="_left _ellipsis width-small">平</li>
      <li class="_left _ellipsis width-small">负</li>
      <li class="_left _ellipsis width-middle">进/失</li>
      <li class="_left _ellipsis width-small">积分</li>
    </ul>
    <ul class="score-board-list">
      <li class="score-board-item _clearfix" v-for="(item, index) in datalist">
        <div class="_left _ellipsis width-small rank">{{item.rank}}</div>
        <div class="_left _ellipsis width-large team">
          <div class="team-portrait">
            <img class="_fullimg" :src="item.portrait" alt="">
          </div>
          <div class="team-name _ellipsis">{{item.teamName}}</div>
        </div>
        <div class="_left _ellipsis width-small match-times">{{-(-item.success-item.dual-item.lose)}}</div>
        <div class="_left _ellipsis width-small win">{{item.success}}</div>
        <div class="_left _ellipsis width-small flat">{{item.dual}}</div>
        <div class="_left _ellipsis width-small lose">{{item.lose}}</div>
        <div class="_left _ellipsis width-middle goal">{{item.score}}/{{item.score - item.NetScore}}</div>
        <div class="_left _ellipsis width-small score">{{item.credit}}</div>
      </li>
    </ul>
    <div class="match-title">相关比赛</div>
    <div class="border-bottom"
         v-for="item in matchesList">
      <match-against :matchInfo="item"></match-against>
    </div>
  </div>
</template>

<script>
  import MatchAgainst from './common/MatchAgainst'

  export default {
    name: 'SimpleCycle',
    data () {
      return {
        gameId: this.getQueryString('gameId'),
        groupName: this.getQueryString('groupName') || 'A',
        teamIds: this.getQueryString('teamIds').split('+'),   // app分享的链接使用‘+’拼起来
        datalist: '',
        matchesList: ''
      }
    },
    computed: {
      apiAddress () { return this.$store.state.apiAddress }
    },
    mounted () {
      this.$store.commit('setUserList', false)
      if (this.teamIds.length < 2) {    // 我自己链过来的链接 球队id使用‘-’拼起来的
        this.teamIds = this.getQueryString('teamIds').split('-')
      }
      this.loadGameBasicInfo()
      this.getGameTeamSmallCycleRuleList()
      this.getGameTeamCycleMatchList()
    },
    methods: {
      loadGameBasicInfo () {
        let url = `${this.apiAddress}/api/game/gameBasicInfo.php`
        let param = {
          json: `{"gameId":"${this.gameId}","sign":"","token":"","uid":127,"version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            document.title = `${res.data.returndata.gamename}小循环赛况`
            // 设置微信分享
            this.$store.commit('setWxShareTitle', `${res.data.returndata.gamename} 小循环赛况`)
            this.$store.commit('setWxShareImgUrl', res.data.returndata.portrait)
            this.$store.commit('setWxShareDesc', '小循环对阵和比分，同分排名不纠结')
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
          this.$store.commit('setLoading', false)
        })
      },
      getGameTeamSmallCycleRuleList () {
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"gameId":"${this.gameId}","groupName":"${this.groupName}","method":"game_team_getGameTeamSmallCycleRuleList","sign":"","teamIds":[${this.teamIds}],"token":"","uid":"","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.datalist = res.data.returndata
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getGameTeamCycleMatchList () {
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"gameId":"${this.gameId}","method":"game_team_getGameTeamCycleMatchList","sign":"","teamIds":[${this.teamIds}],"token":"","uid":"","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.matchesList = res.data.returndata.map(match => {
              return {
                matchId: match.id,
                homeIcon: match.portraitA,
                awayIcon: match.portraitB,
                homeName: match.teamNameA,
                awayName: match.teamNameB,
                homeCoat: match.homeUniform.coatColor ? match.homeUniform.coatColor.replace(/0x/, '#') : '',
                homePant: match.homeUniform.pantsColor ? match.homeUniform.pantsColor.replace(/0x/, '#') : '',
                homeSock: match.homeUniform.socksColor ? match.homeUniform.socksColor.replace(/0x/, '#') : '',
                awayCoat: match.awayUniform.coatColor ? match.awayUniform.coatColor.replace(/0x/, '#') : '',
                awayPant: match.awayUniform.pantsColor ? match.awayUniform.pantsColor.replace(/0x/, '#') : '',
                awaySock: match.awayUniform.socksColor ? match.awayUniform.socksColor.replace(/0x/, '#') : '',
                homeScore: match.scoreA,
                awayScore: match.scoreB,
                turnName: match.turnName,
                matchTime: match.matchTime ? match.matchTime.replace(/:\d+$/, '') : '未知',
                courtName: match.courtName || '未知'
              }
            })
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    components: { MatchAgainst }
  }
</script>
