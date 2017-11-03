<!-- 球队、教练 的战绩 -->
<style lang="less" scoped>
  .team-record {
    max-width: 750px;
    margin: 0 auto;
  }
  .basic-info {
    padding: .2rem;
  }
  .summary-show {
    display: flex;
    padding: .4rem;
  }
  .total-match {
    flex: 0 0 1.2rem;
    font-size: .3rem;
    text-align: center;
    .number {
      margin-top: .2rem;
      font-size: .4rem;
      line-height: .6rem;
    }
  }
  .pie-view {
    flex: 1;
    margin-left: .4rem;
  }
</style>

<template>
  <div class="team-record">
    <portrait-text :data="basicInfo" class="basic-info border-bottom"></portrait-text>
    <div class="summary-show">
      <div class="total-match">
        <div class="number">{{totalMatches}}</div>
        <div>总场次</div>
      </div>
      <div class="_flex">
        <pie-chart class="pie-view" v-if="winRate.number>=0" :options="winRate"></pie-chart>
        <pie-chart class="pie-view" v-if="dualRate.number>=0" :options="dualRate"></pie-chart>
        <pie-chart class="pie-view" v-if="loseRate.number>=0" :options="loseRate"></pie-chart>
      </div>
    </div>
    <div class="gray-place-bar"></div>
    <div class="matches-list border-bottom" v-for="matchInfo in matchesList">
      <match-against :matchInfo="matchInfo"></match-against>
    </div>
  </div>
</template>

<script>
  import PieChart from './tools/PieChart'
  import MatchAgainst from './common/MatchAgainst'
  import PortraitText from './common/PortraitText'

  export default {
    name: 'TeamRecord',
    data () {
      return {
        coachId: this.getQueryString('coachId'),
        teamId: this.getQueryString('teamId'),
        basicInfo: {
          portrait: '',
          name: '',
          desc: ''
        },
        totalMatches: '0',
        winMatches: '',
        dualMatches: '',
        loseMatches: '',
        winRate: {
          rate: '',
          number: -1,
          text: '胜'
        },
        dualRate: {
          rate: '',
          number: -1,
          text: '平'
        },
        loseRate: {
          rate: '',
          number: -1,
          text: '负'
        },
        matchesList: ''
      }
    },
    computed: {
      uid () {
        return this.$store.state.uid
      },
      apiAddress () {
        return this.$store.state.apiAddress
      }
    },
    mounted () {
      document.title = '战绩'
      this.$store.commit('setUserList', false)
      this.loadCoachBasicInfo()
      if (this.teamId) {
        this.getBasicInfoById()
      }
      this.loadCoachingRecord()
    },
    methods: {
      loadCoachBasicInfo () {   // 加载教练基本信息
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"user_coach_getCoachInfo","uid":"${this.uid || 250}","coachId":"${this.coachId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata
            this.basicInfo.name = data.coachName
            this.basicInfo.portrait = data.portrait
            this.$store.commit('setWxShareTitle', `${data.coachName} 的执教战绩`)
            this.$store.commit('setWxShareImgUrl', data.portrait)
            this.$store.commit('setWxShareDesc', '执教球队')
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      getBasicInfoById () {   // 加载基本信息
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {   // targetType 要 +1 ，因为本接口 1用户 2球员 3球队 4裁判 5 赛事 6协会
          json: `{"method":"common_share_getBasicInfoById","targetId":${this.teamId},"type":"3"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.basicInfo.desc = `执教球队：${res.data.returndata.name}`
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadCoachingRecord () {   // 加载教练的执教战绩
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"user_coach_loadCoachingRecord","coachId":"${this.coachId}","teamId":"${this.teamId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata
            this.totalMatches = data.totalMatches
            this.winMatches = data.winMatches
            this.dualMatches = data.dualMatches
            this.loseMatches = data.loseMatches
            this.winRate.rate = parseInt(data.winMatches / data.totalMatches * 100)
            this.winRate.number = data.winMatches
            this.dualRate.rate = parseInt(data.dualMatches / data.totalMatches * 100)
            this.dualRate.number = data.dualMatches
            this.loseRate.rate = parseInt(data.loseMatches / data.totalMatches * 100)
            this.loseRate.number = data.loseMatches
            this.matchesList = data.matchData.map(item => {
              return {
                matchId: item.id,
                homeIcon: item.portraitA,
                awayIcon: item.portraitB,
                homeName: item.teamNameA,
                awayName: item.teamNameB,
                homeScore: item.scoreA,
                awayScore: item.scoreB,
                gameResult: item.gameResult,
                matchTime: item.matchTime ? item.matchTime.replace(/:\d+$/, '') : '未知',
                courtName: item.courtName || '未知',
                homeCoat: item.homeUniform.coatColor ? item.homeUniform.coatColor.replace('0x', '#') : '',
                homePant: item.homeUniform.pantsColor ? item.homeUniform.pantsColor.replace('0x', '#') : '',
                homeSock: item.homeUniform.socksColor ? item.homeUniform.socksColor.replace('0x', '#') : '',
                awayCoat: item.awayUniform.coatColor ? item.awayUniform.coatColor.replace('0x', '#') : '',
                awayPant: item.awayUniform.pantsColor ? item.awayUniform.pantsColor.replace('0x', '#') : '',
                awaySock: item.awayUniform.socksColor ? item.awayUniform.socksColor.replace('0x', '#') : ''
              }
            })
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      }
    },
    components: { PieChart, MatchAgainst, PortraitText }
  }
</script>
