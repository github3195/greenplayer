<!-- CoachingTeam.vue -->
<style lang="less" scoped>
  .coaching-team {
    max-width: 750px;
    position: absolute;
    top: .7rem;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    overflow: hidden;
    font-size: .28rem;
    color: #282828;
    .basic-info {
      display: flex;
      padding: .2rem;
      .portrait {
        flex: 0 0 1.4rem;
        height: 1.4rem;
        margin-right: .2rem;
      }
      .info {
        overflow: hidden;
        .name {
          font-size: .3rem;
          line-height: .8rem;
        }
        .combat, .time {
          font-size: .22rem;
          color: #646464;
          line-height: .3rem;
        }
      }
    }
    .main-container {
      position: absolute;
      top: 1.9rem;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
    }
    .page-main {
      display: flex;
      position: absolute;
      top: .9rem;
      left: 0;
      right: 0;
      bottom: 0;
      transition: all .2s;
      width: 100%;
      .page-section {
        flex: 0 0 100%;
        height: 100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }
      .section-title {
        height: .7rem;
        line-height: .7rem;
        padding-left: .2rem;
      }
      .title-icon {
        width: .3rem;
        height: .3rem;
        margin-right: .1rem;
        vertical-align: middle;
      }
      .plan-list {
        padding: 0 .2rem;
        .train-plan {
          display: flex;
          padding: .25rem 0;
        }
        .icon {
          flex: 0 0 1.2rem;
          height: 1.2rem;
          margin-right: .2rem;
        }
      }
    }
  }
  .nav {
    display: flex;
    align-items: center;
    height: .9rem;
    .nav-item {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      flex-shrink: 0;
      height: .8rem;
      line-height: .8rem;
      font-size: .3rem;
      color: #646464;
      background: #fff;
      text-align: center;
      -webkit-tap-highlight-color: transparent;
      &.active {
        color: #32b847;
        border-bottom: 2px solid #32b847;
      }
    }
  }
  .get-more {
    text-align: right;
    padding: .2rem;
  }
  .load-more {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
  }
</style>

<template>
  <div class="coaching-team">
    <div class="basic-info">
      <div class="portrait">
        <img class="_fullimg" :src="teamInfo.portrait" alt="">
      </div>
      <div class="info">
        <div class="_ellipsis name">{{teamInfo.teamName}}</div>
        <div class="_ellipsis combat">战斗力：{{teamInfo.teamCredit}}</div>
        <div class="_ellipsis time">执教时间：{{teamInfo.startTime | formatDate}} 至今</div>
      </div>
    </div>
    <div class="gray-place-bar"></div>
    <div class="main-container">
      <nav class="nav border-bottom">
        <a href="javascript:;" class="nav-item" :class="{active: nav===0}" @click="changeNav(0)">训练</a>
        <a href="javascript:;" class="nav-item" :class="{active: nav===1}" @click="changeNav(1)">比赛</a>
      </nav>
      <div class="page-main" :style="{transform: 'translateX('+translateX+')'}">
        <section class="page-section">
          <div class="section-block">
            <div class="section-title border-bottom"><img class="title-icon" src="//share.greenplayer.cn/share/img/icon/content_icon_jiangefu_nor@2x.png">训练计划</div>
            <ul class="plan-list border-bottom" v-if="trainPlanList.length>0">
              <li class="train-plan border-bottom" v-for="item in trainPlanList">
                <div class="icon">
                  <img class="_fullimg" :src="item.portrait" alt="">
                </div>
                <div class="train-name">{{item.planName}}</div>
              </li>
            </ul>
            <div class="get-more border-bottom" v-if="planHaveMore" @click="loadTrainPlanOrGameOfTeam(1)">更多训练计划》</div>
          </div>
          <div class="section-block">
            <div class="section-title border-bottom"><img class="title-icon" src="//share.greenplayer.cn/share/img/icon/content_icon_jiangefu_nor@2x.png">相关日程</div>
            <div class="border-bottom" v-for="item in activityList">
              <activity-item :data="item"></activity-item>
            </div>
            <div class="load-more">
              <span v-if="activityCanLoad" @click.stop="loadActivityInfoOfTeam(1)">加载更多</span>
              <span v-else>没有更多内容了</span>
            </div>
          </div>
        </section>
        <section class="page-section">
          <div class="section-block">
            <div class="section-title border-bottom"><img class="title-icon" src="//share.greenplayer.cn/share/img/icon/content_icon_jiangefu_nor@2x.png">相关赛事</div>
            <div class="border-bottom" v-for="item in teamGameList" @click="goTeamGameDetail(item)">
              <association-game-list :data="item"></association-game-list>
            </div>
            <div class="get-more border-bottom" v-if="gameHaveMore" @click="loadTrainPlanOrGameOfTeam(2)">更多相关赛事》</div>
          </div>
          <div class="section-block">
            <div class="section-title border-bottom"><img class="title-icon" src="//share.greenplayer.cn/share/img/icon/content_icon_jiangefu_nor@2x.png">相关比赛</div>
            <div class="border-bottom" v-for="item in matchesList">
              <match-against :matchInfo="item"></match-against>
            </div>
            <div class="load-more">
              <span v-if="matchesCanLoad" @click.stop="loadActivityInfoOfTeam(2)">加载更多</span>
              <span v-else>没有更多内容了</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import ActivityItem from '@/components/common/ActivityItem'
  import AssociationGameList from '@/components/common/AssociationGameList'
  import MatchAgainst from '@/components/common/MatchAgainst'

  export default {
    name: 'CoachingTeam',
    data () {
      return {
        nav: 0,
        tab2Load: false,
        coachId: this.getQueryString('coachId'),
        teamId: this.getQueryString('teamId'),
        teamInfo: '',
        trainPlanList: [],
        planHaveMore: true,
        trainPlanPage: 1,
        teamGameList: [],
        gameHaveMore: true,
        teamGamePage: 1,
        activityList: [],
        activityCanLoad: true,
        activityPage: 1,
        matchesList: [],
        matchesCanLoad: true,
        matchesPage: 1
      }
    },
    computed: {
      translateX () {
        return `-${this.nav * 100}%`
      },
      apiAddress () {
        return this.$store.state.apiAddress
      },
      commonApi () {
        return `${this.apiAddress}/api/common/baseApiEntry.php`
      }
    },
    filters: {
      formatDate (val) {
        if (val) {
          return val.replace(/\s[\d:]+$/g, '')
        }
        return ''
      }
    },
    mounted () {
      document.title = '执教球队'
      document.documentElement.style.height = document.body.style.height = document.querySelector('#app').style.height = '100%'
      this.$store.commit('setUserList', false)
      this.coachingTeamList()
      this.loadTrainPlanOrGameOfTeam(1)
      this.loadActivityInfoOfTeam(1)
    },
    methods: {
      changeNav (num) {
        if (+num === +this.nav) {
          return
        }
        this.nav = num
        if (!this.tab2Load) {
          this.loadTrainPlanOrGameOfTeam(2)
          this.loadActivityInfoOfTeam(2)
          this.tab2Load = true
        }
      },
      coachingTeamList () {
        let param = {
          json: `{"method":"user_coach_coachingTeamList","coachId":"${this.coachId}"}`
        }
        this.$axios.post(this.commonApi, param).then(res => {
          if (res.data.status === 'success') {
            let thisTeam = res.data.returndata.filter(item => {
              return +item.teamId === +this.teamId
            })
            if (thisTeam.length > 0) {
              this.teamInfo = thisTeam[0]
            }
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      loadTrainPlanOrGameOfTeam (loadType) {    // 901 加载执教球队的训练计划或者参加的赛事
        this.$store.commit('setLoading', true)
        let page = +loadType === 1
                 ? page = this.trainPlanPage
                 : +loadType === 2
                 ? page = this.teamGamePage
                 : 1
        let param = {
          json: `{"teamId" : "${this.teamId}","method" : "user_coach_loadTrainPlanOrGameOfTeam","uid" : "${this.uid || 250}","coachId" : "${this.coachId}","limit" : "3","loadType" : "${loadType}","page" : "${page}"}`
        }
        this.$axios.post(this.commonApi, param).then(res => {
          if (res.data.status === 'success') {
            if (+loadType === 1) {
              if (res.data.returndata.length < 3 || JSON.stringify(res.data.returndata) === '{}') {
                this.planHaveMore = false
              } else {
                this.trainPlanPage++
              }
              this.trainPlanList = res.data.returndata.length > 0 ? this.trainPlanList.concat(res.data.returndata) : this.trainPlanList
            } else if (+loadType === 2) {
              if (res.data.returndata.length < 3 || JSON.stringify(res.data.returndata) === '{}') {
                this.gameHaveMore = false
              } else {
                this.teamGamePage++
              }
              this.teamGameList = res.data.returndata.length > 0 && this.teamGameList.concat(res.data.returndata.map(item => {
                return {
                  id: item.gameId,
                  portrait: item.portrait,
                  name: item.gameName,
                  desc: `${item.ruleName}人制`,
                  status: item.statusCode
                }
              }))
            }
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.$store.commit('setLoading', false)
        })
      },
      loadActivityInfoOfTeam (loadType) {
        this.$store.commit('setLoading', true)
        let page = +loadType === 1
                 ? page = this.activityPage
                 : +loadType === 2
                 ? page = this.matchesPage
                 : 1
        let param = {
          json: `{"teamId" : "${this.teamId}","method" : "user_coach_loadActivityInfoOfTeam","uid" : "${this.uid || 250}","coachId" : "${this.coachId}","limit" : "10","loadType" : "${loadType}","page" : "${page}"}`
        }
        this.$axios.post(this.commonApi, param).then(res => {
          if (res.data.status === 'success') {
            if (+loadType === 1) {    // 相关训练日程
              if (res.data.returndata.length < 10) {
                this.activityCanLoad = false
              } else {
                this.activityPage++
              }
              this.activityList = this.activityList.concat(res.data.returndata.map(item => {
                return {
                  id: item.activityId,
                  type: item.activityType,
                  name: item.activityName,
                  place: item.activityPlace,
                  time: item.activityTime ? item.activityTime.replace(/:\d+$/, '') : '未知',
                  teamId: item.selfTeamId,
                  teamName: item.selfTeamName,
                  teamPortrait: item.selfTeamPortrait
                }
              }))
            } else if (+loadType === 2) {   // 相关比赛
              if (res.data.returndata.length < 10) {
                this.matchesCanLoad = false
              } else {
                this.matchesPage++
              }
              this.matchesList = this.matchesList.concat(res.data.returndata.map(item => {
                return {
                  matchId: item.matchId,
                  homeIcon: item.selfTeamPortrait,
                  awayIcon: item.opponentTeamPortrait,
                  homeName: item.selfTeamName,
                  awayName: item.opponentTeamName,
                  homeScore: item.curScoreA,
                  awayScore: item.curScoreB,
                  matchTime: item.matchTime ? item.matchTime.replace(/:\d+$/, '') : '未知',
                  courtName: item.courtName || '未知'
                }
              }))
            }
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.$store.commit('setLoading', false)
        })
      },
      goTeamGameDetail (item) {
        window.open(`//share.greenplayer.cn/share/MHMenuAboutTeam.html?gameId=${item.id}&isBeiSai=false&teamId=${this.teamId}&teamName=${this.teamInfo.teamName}&teamPortrit=${this.teamInfo.portrait}`)
      }
    },
    components: { ActivityItem, AssociationGameList, MatchAgainst }
  }
</script>
