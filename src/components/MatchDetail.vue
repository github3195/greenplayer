<style lang="less" scoped>
  .match-detail {
    max-width: 750px;
    margin: 0 auto;
    overflow-x: hidden;
  }
  .nav-list {
    position: relative;
    background: #fff;
    margin: 0 auto;
    height: .7rem;
    line-height: .7rem;
    .nav-item {
      flex: 1;
      display: inline-block;
      padding: 0 .3rem;
      position: relative;
      height: .7rem;
      color: #646464;
      font-size: .28rem;
      background: #fff;
      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 1px;
        background: #b4b4b4;
        transform: scaleX(0.5);
      }
      &.active {
        color: #fff;
        background: #32b847;
        border-color: transparent;
      }
      &:first-child {
        border-left: 0;
      }
    }
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background: #b4b4b4;
      transform: scaleY(0.5);
    }
  }
  .overlay {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
  }
  .change-tab {
    padding: .2rem;
    background: #f0f0f0;
    .desc {
      float: left;
      width: 70%;
      font-size: .24rem;
      color: #282828;
    }
    .action {
      float: right;
      width: 30%;
      text-align: right;
      font-size: .22rem;
      a {
        color: #32b847;
      }
    }
  }
</style>

<template>
  <div class="match-detail">
    <!-- 双方对阵信息 -->
    <head-against :matchResult="matchResult" :homeUniform="homeUniform" :awayUniform="awayUniform"></head-against>
    <nav class="_flex nav-list">
      <div @click.stop="changeCurrent(0)" :class="{active: 0===current}" class="_txt-center nav-item">详情</div>
      <div @click.stop="changeCurrent(1)" :class="{active: 1===current}" class="_txt-center nav-item">名单</div>
      <div @click.stop="changeCurrent(2)" :class="{active: 2===current}" class="_txt-center nav-item">
        {{ showEvent ? '事件' : '竞猜'}}
      </div>
      <div @click.stop="changeCurrent(3)" :class="{active: 3===current}" class="_txt-center nav-item" v-if="showNameList">评选</div>
    </nav>
    <div class="tab-container">
      <div class="tab-item summary" v-show="0===current">
        <!-- 比赛概述 -->
        <match-summary :matchResult="matchResult" :homeUniform="homeUniform" :awayUniform="awayUniform" :refereeList="refereeList" :weatherInfo="weatherInfo"></match-summary>
      </div>
      <div class="tab-item name-list" v-show="1===current">
        <!-- 战术板 -->
        <tactics-board :formationA="formationA" :formationB="formationB" :formationListA="formationListA" :formationListB="formationListB"></tactics-board>
        <!-- 首发替补名单 -->
        <both-name-list :type="0" :titleName="'首发名单'" :playerListA="firstList"></both-name-list>
        <both-name-list :type="0" :titleName="'替补或出场名单'" :playerListA="benchList"></both-name-list>
      </div>
      <div class="tab-item event" v-show="2===current && showEvent">
        <div class="change-tab _clearfix" v-if="isQuizMatch">
          <p class="desc _ellipsis">比赛事件</p>
          <p class="action">
            <a href="javascript:;" @click="showEvent = false">查看竞猜详情》</a>
          </p>
        </div>
        <!-- 事件轴 -->
        <event-axis :events="events" :eventList="eventList" :matchResult="matchResult"></event-axis>
      </div>
      <div class="tab-item guessing" v-show="2===current && !showEvent" v-if="isQuizMatch">
        <div class="change-tab _clearfix" v-show="showEventAction">
          <p class="desc _ellipsis">竞猜详情</p>
          <p class="action">
            <a href="javascript:;" @click="showEvent = true">查看事件详情》</a>
          </p>
        </div>
        <!-- 竞猜 -->
        <prediction-match :quizDetailInfo="quizDetailInfo" :matchTime="matchResult.matchTime" :matchId="matchId" :quizId="quizId" :userId="uid"></prediction-match>
      </div>
      <div class="tab-item vote" v-show="3===current">
        <!-- MVP列表 -->
        <both-name-list :type="1" :titleName="'MVP评选'" :hasLoadMvpList="hasLoadMvpList" :isVoting="true" :homeTeamId="homeTeamId" :awayTeamId="awayTeamId"></both-name-list>
      </div>
    </div>
  </div>
</template>

<script>
  import HeadAgainst from './common/HeadAgainst'    // 头部对阵信息
  import MatchSummary from './common/MatchSummary'    // 比赛概述
  import EventAxis from './common/EventAxis'    // 比赛事件轴
  import TacticsBoard from './common/TacticsBoard'    // 战术板
  import PredictionMatch from './common/PredictionMatch'    // 竞猜
  import BothNameList from './common/BothNameList'    // 双方球员名单
  import LoginPopup from './common/LoginPopup'    // 登录弹窗

  export default {
    name: 'MatchDetail',
    data () {
      return {
        matchId: this.getQueryString('matchId'),
        quizId: this.getQueryString('quizId'),
        teamId: this.getQueryString('teamId'),
        isQuizMatch: false,   // 是否是竞猜
        current: 2,
        hasGetActivities: false,
        hasLoadMvpList: false,
        showEvent: true,  // 控制显示事件或竞猜
        showEventAction: false,   // 查看事件按钮是否显示
        matchResult: {},
        scale: 0,
        homeTeamId: '',
        awayTeamId: '',
        events: {},
        eventList: '',
        weatherInfo: [],
        quizDetailInfo: {},
        homeUniform: {},
        awayUniform: {},
        formationA: {
          name: '',
          coordinate: []
        },
        formationB: {
          name: '',
          coordinate: []
        },
        refereeList: [],
        firstList: {
          MvpPlayerListA: [],
          MvpPlayerListB: []
        },
        benchList: {
          MvpPlayerListA: [],
          MvpPlayerListB: []
        },
        formationListA: [],
        formationListB: []
      }
    },
    computed: {
      isShare () {
        return !this.getQueryString('fromApp')
      },
      showNameList () {   // 比赛结束后才显示评选
        let now = new Date()
        let matchTime = this.matchResult.matchTime ? this.matchResult.matchTime.replace(/-/g, '/') : ''     // replace 兼容ios日期转换格式
        return now > new Date(matchTime)
      },
      uid () {
        return this.$store.state.uid
      },
      apiAddress () {
        return this.$store.state.apiAddress
      }
    },
    mounted () {
      document.title = '单场比赛'
      this.$store.commit('setUserList', true)
      if (this.getQueryString('fromApp')) {
        this.loginInApp()   // app内的登录
        this.$store.commit('setUserList', false)
        this.$store.commit('setTopBar', false)
      } else {
        this.$store.commit('setUserList', true)
        this.$store.commit('setTopBar', true)
      }
      if (this.matchId) {
        this.loadMatchResult(this.matchId, this.teamId) // 加载本场比赛详情
        this.loadMatchAllPartEventList(this.matchId)  // 加载事件
        this.loadQuizDetailInfo() // 加载竞猜
      }
    },
    watch: {
      matchResult (val, oldVal) {
        let now = new Date()
        let matchTime = new Date(val.matchTime.replace(/-/g, '/'))
        if (now > matchTime) {
          this.showEventAction = true
          this.showEvent = true
        }
      }
    },
    methods: {
      loginInApp () {   // app内的用户登录
        let uid = this.getQueryString('uid')
        let token = this.getQueryString('token')
        // let playerId = this.getQueryString('playerId')
        if (uid && token) {
          let url = `${this.apiAddress}/api/login/loginWithToken.php`
          let param = {
            json: '{"uid":"' + uid + '","version":"1.0","token":"' + token + '","source":"wap"}'
          }
          this.$axios.post(url, param).then(res => {
            let data = res.data
            let userinfo = data.userinfo
            if (data.status === 'success') {
              this.$store.commit('setLogined', userinfo)
              window.shareConfig.title = `${userinfo.nickname} 邀请你一起参与比赛竞猜`
              window.shareConfig.imgUrl = userinfo.portrait
            } else {
              // this.$store.commit('showToast', data.errMsg)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      changeCurrent (i) {   // 切换tab，并加载对应tab数据
        this.current = i
        if (!this.hasGetActivities && i === 1) {
          this.loadActivitiesMatchEnroll(this.matchId)
          this.hasGetActivities = true
        } else if (!this.hasLoadMvpList && i === 3) {
          this.hasLoadMvpList = true
        }
      },
      loadMatchResult (matchId, teamId) {   // 比赛信息数据
        let url = `${this.apiAddress}/api/match/loadMatchResultPredictionPage.php`
        let param = {
          json: '{"uid":"300","matchId":' + matchId + ',"teamId":' + teamId + '}'
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.matchResult = res.data.returndata
            if ((new Date()) < (new Date(res.data.returndata.matchTime.replace(/-/g, '/'))) && !this.quizId) {   // 比赛未开始，显示详情
              this.current = 0
            }
            document.title = `${this.matchResult.gameName}`
            if (this.isShare) {
              document.title = `${res.data.returndata.a_name} VS ${res.data.returndata.b_name}的比赛详情`
            }
            this.events = this.matchResult.events
            this.homeUniform = this.matchResult.homeUniform
            this.awayUniform = this.matchResult.awayUniform
            this.refereeList = this.matchResult.refereeList
            this.scale = this.matchResult.scale
            this.homeTeamId = this.matchResult.party_a
            this.awayTeamId = this.matchResult.party_b
            let matchTime = res.data.returndata.matchTime.replace(/(:\d\d)$/i, '')
            let title = this.matchResult.cur_score_a && this.matchResult.cur_score_b
              ? `${res.data.returndata.a_name} ${this.matchResult.cur_score_a}:${this.matchResult.cur_score_b} ${res.data.returndata.b_name}`
              : this.quizId ? `${res.data.returndata.a_name} VS ${res.data.returndata.b_name} 一起来竞猜赢球币吧~`
              : `${res.data.returndata.a_name} VS ${res.data.returndata.b_name}`
            let desc = this.quizId ? `比赛竞猜\n时间：${matchTime}\n地点：${(res.data.returndata.courtName)}` : `时间：${matchTime}\n地点：${(res.data.returndata.courtName)}`
            let imgUrl = this.quizId ? 'http://share.greenplayer.cn/share/img/quiz.png' : res.data.returndata.gamePortrait
            this.$store.commit('setWxShareTitle', title)    // 设置微信分享标题
            this.$store.commit('setWxShareDesc', desc)    //  设置微信分享描述
            this.$store.commit('setWxShareImgUrl', imgUrl)    //  设置微信分享图标
            // 设置供原生调用的分享卡片内容
            window.shareConfig.title = window.shareConfig.title || title
            window.shareConfig.imgUrl = window.shareConfig.imgUrl || imgUrl
            window.shareConfig.desc = desc
            let query = this.$base64.encode(`matchId=${this.matchId}&quizId=${this.quizId}`)
            window.shareConfig.url = `${location.host}${location.pathname}#/matchdetail?${query}`
            // 获取天气
            let cityId = this.matchResult.areaId
            let matchDate = this.matchResult.matchTime
            let urlOfWeather = `${this.apiAddress}/api/common/getWeatherByCityId.php`
            this.$axios.get(urlOfWeather + '?cityId=' + cityId + '&date=' + matchDate).then(res => {
              if (res.data.returndata.length > 0) {
                this.weatherInfo = res.data.returndata[0]
              }
            }).catch(err => {
              console.log(err)
              // this.$store.commit('showToast', err)
            })
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
          // this.$store.commit('showToast', err)
        })
      },
      loadQuizDetailInfo () {   // 请求竞猜的信息，没有quizId或者quizId与matchId不匹配则不展示竞猜的内容
        if (!this.quizId) {
          this.isQuizMatch = false
          return false
        }
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: '{"method":"match_quiz_loadQuizDetailInfo","quizId":' + this.quizId + ',"matchId":' + this.matchId + '}'
        }
        // 请求竞猜信息，返回成功就显示竞猜的信息
        this.$axios.post(url, param).then(res => {
          let data = res.data.returndata
          if (res.data.status === 'success') {
            this.isQuizMatch = true
            this.quizDetailInfo = data
            if (data.status <= 1) {   // 竞猜进行中
              this.showEvent = false
            } else {
              this.showEvent = true
            }
          } else {
            this.$store.commit('showToast', res.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadActivitiesMatchEnroll (matchId) {    // 首发跟替补名单、以及战术板
        let url = `${this.apiAddress}/api/game/getActivitiesMatchEnroll.php`
        let param = {
          json: '{"uid":300,"matchId":' + matchId + '}'
        }
        this.$axios.post(url, param).then(res => {
          let tacticsBoardA = []
          let tacticsBoardB = []
          res.data.returndata.registerInfo_a.forEach((item, index) => {
            if (item.isFirst > 0) {
              this.firstList.MvpPlayerListA.push(item)
              tacticsBoardA.push(item)
            } else {
              this.benchList.MvpPlayerListA.push(item)
            }
          })
          res.data.returndata.registerInfo_b.forEach((item, index) => {
            if (item.isFirst > 0) {
              this.firstList.MvpPlayerListB.push(item)
              tacticsBoardB.push(item)
            } else {
              this.benchList.MvpPlayerListB.push(item)
            }
          })
          let url = `${this.apiAddress}/api/match/loadSystemFormationTemplate.php`
          let param = {
            json: '{"uid":300,"scale":' + this.scale + '}'
          }
          this.$axios.post(url, param).then(res => {    // 获取战术模板
            // 默认战术板第一个
            this.formationA.name = res.data.returndata[0].formation
            this.formationA.coordinate = res.data.returndata[0].coordinate
            this.formationB.name = res.data.returndata[0].formation
            this.formationB.coordinate = res.data.returndata[0].coordinate
            res.data.returndata.forEach((item, index) => {
              if (item.id === this.matchResult.formationIdA) {
                this.formationA.name = item.formation
                this.formationA.coordinate = item.coordinate
              }
              if (item.id === this.matchResult.formationIdB) {
                this.formationB.name = item.formation
                this.formationB.coordinate = item.coordinate
              }
            })
            let formatA = this.formatCoordinate(this.formationA.coordinate)
            this.formationListA = this.setFormation(formatA, tacticsBoardA)
            let formatB = this.formatCoordinate(this.formationB.coordinate)
            this.formationListB = this.setFormation(formatB, tacticsBoardB)
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })
      },
      loadMatchAllPartEventList (matchId) {    // 事件
        let url = `${this.apiAddress}/api/match/loadMatchAllPartEventList.php`
        let param = {
          json: '{"uid":300,"matchId":' + matchId + '}'
        }
        this.$axios.post(url, param).then(res => {
          this.eventList = res.data.returndata
        }).catch(err => {
          console.log(err)
          // this.$store.commit('showToast', err)
        })
      },
      formatCoordinate (arr) {    // 把一维数组的战术板根据y轴位置转换为二维的阵型
        let res = []
        for (let i = 0; i < arr.length; i++) {
          res[arr[i].y] = res[arr[i].y] || []
          res[arr[i].y].push(arr[i])
        }
        return res.filter(item => item)
      },
      setFormation (format, tacticsBoard) {   // 把首发球员的的位置与战术板对应起来
        return format.map(item => {
          return item.map(inItem => {
            for (let i = 0; i < tacticsBoard.length; i++) {
              if (tacticsBoard[i].coordinateX === inItem.x && tacticsBoard[i].coordinateY === inItem.y) {
                return {
                  memberNumber: tacticsBoard[i].memberNumber || 'N',
                  playerName: tacticsBoard[i].username
                }
              }
            }
            return {
              memberNumber: 'N'
            }
          })
        })
      }
    },
    components: { MatchSummary, EventAxis, TacticsBoard, PredictionMatch, BothNameList, HeadAgainst, LoginPopup }
  }
</script>
