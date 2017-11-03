<!-- MatchConvene.vue 比赛召集 -->
<style lang="less" scoped>
  .match-convene {
    .page-nav {
      position: relative;
      width: 100%;
      height: .7rem;
      line-height: .7rem;
      display: flex;
      text-align: center;
      &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: #a0a0a0;
        transform: scaleY(0.5);
      }
      .nav-item {
        flex: 1;
        color: #282828;
        font-size: .3rem;
        &.active {
          color: #fff;
          background: #32b847;
        }
      }
    }
    .page-container {
      position: absolute;
      top: 4.6rem;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      .page-group {
        display: flex;
        height: 100%;
        transition: all .2s;
      }
      .page {
        flex: 1;
        max-width: 100%;
        min-width: 100%;
        height: 100%;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
      }
      .detail {
        background: #fff;
      }
      .name-list {
        position: relative;
        overflow: hidden;
      }
    }
  }
</style>

<template>
  <div class="match-convene">
    <head-against :matchResult="matchResult" :homeUniform="homeUniform" :awayUniform="awayUniform"></head-against>
    <nav class="page-nav">
      <a href="javascript:;" class="nav-item" :class="{active: nav===0}" @click="nav=0">详情</a>
      <a href="javascript:;" class="nav-item" :class="{active: nav===1}" @click="nav=1">名单</a>
    </nav>
    <div class="page-container">
      <div class="page-group" :style="{transform: 'translateX('+translateVert+')'}">
        <!-- 活动详情 -->
        <div class="page detail">
          <match-summary :matchResult="matchResult" :homeUniform="homeUniform" :awayUniform="awayUniform" :refereeList="refereeList" :weatherInfo="weatherInfo"></match-summary>
        </div>
        <!-- 报名名单 -->
        <div class="page name-list">
          <convene-name-list
            :registInfo="registInfo"
            :unregistInfo="unregistInfo"
            :showBtn="teamId"
            @undetermined="undetermined"
            @leave="leave"
            @enroll="enroll"></convene-name-list>
        </div>
      </div>
    </div>
    <transition name="fadein">
      <div class="select-popup" v-show="selectPopupShow" @click="selectPopupShow=false">
        <div class="select-container">
          <i class="close-popup" @click="selectPopupShow=false"></i>
          <div class="popup-title" v-if="playerInfo.length>0">请选择要反馈的球员</div>
          <ul class="select-list" v-if="playerInfo.length>0">
            <li class="select-item" v-for="item in playerInfo" @click="feedback(item.playerId, item.name)">
              <div class="select-portrait">
                <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
              </div>
              <div class="select-name">
                {{item.name}}
                <span style="color:red;font-size:.2rem;" v-if="isTeamMember(item.playerId)">(球队成员)</span>
              </div>
            </li>
          </ul>
          <div class="no-select-tip" v-else>
            没有球员
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import HeadAgainst from './common/HeadAgainst'
  import MatchSummary from './common/MatchSummary'
  import ConveneNameList from './common/ConveneNameList'

  export default {
    name: 'MatchConvene',
    data () {
      return {
        nav: 1,
        matchId: this.getQueryString('matchId'),
        teamId: this.getQueryString('teamId').split('@')[0],    // 分享链接拼错
        teamName: '',
        activityId: '',
        matchResult: {},
        homeUniform: {},
        awayUniform: {},
        refereeList: [],
        weatherInfo: {},
        registInfo: {
          enroll: [],
          leave: [],
          undetermined: []
        },
        unregistInfo: [],
        participateType: '',
        selectPopupShow: false,
        playerInfo: '',
        teamMemberList: ''
      }
    },
    computed: {
      apiAddress () {
        return this.$store.state.apiAddress
      },
      uid () {
        return this.$store.state.uid
      },
      translateVert () {
        return -this.nav * 100 + '%'
      }
    },
    mounted () {
      document.title = '比赛召集'
      this.$store.commit('setUserList', true)
      this.$store.commit('setTopBar', true)
      this.loadTeamBasicInfo()
      this.loadMatchResult(this.matchId, this.teamId)
      this.getActivitiesMatchEnroll()
    },
    watch: {
      uid (val, oldVal) {
        if (val) {
          this.loadUserPlayerList()
        }
      }
    },
    methods: {
      loadMatchResult (matchId, teamId) {   // 比赛信息数据
        let url = this.apiAddress + '/api/match/loadMatchResultPredictionPage.php'
        let param = {
          json: `{"uid":"300","matchId":"${this.matchId}","teamId":"${this.teamId || 0}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.matchResult = res.data.returndata
            this.activityId = this.activityId ? this.activityId : this.matchResult.activityId
            this.events = this.matchResult.events
            this.homeUniform = this.matchResult.homeUniform
            this.awayUniform = this.matchResult.awayUniform
            this.refereeList = this.matchResult.refereeList
            this.scale = this.matchResult.scale
            this.homeTeamId = this.matchResult.party_a
            this.awayTeamId = this.matchResult.party_b
            this.teamName = +this.teamId === +this.matchResult.party_a
                           ? this.matchResult.a_name
                           : +this.teamId === +this.matchResult.party_b
                           ? this.matchResult.b_name
                           : '球队'
            let matchTime = res.data.returndata.matchTime.replace(/(:\d\d)$/i, '')
            let sharePortrait = +this.teamId === +this.matchResult.party_a
                              ? this.matchResult.a_icon
                              : +this.teamId === +this.matchResult.party_b
                              ? this.matchResult.b_icon
                              : ''
            this.$store.commit('setWxShareTitle', `${res.data.returndata.a_name || '待定'} VS ${res.data.returndata.b_name || '待定'}`)
            this.$store.commit('setWxShareDesc', `时间：${matchTime}\n地点：${(res.data.returndata.courtName)}\n速度报名`)
            this.$store.commit('setWxShareImgUrl', sharePortrait || '//share.greenplayer.cn/share/img/dt.png')
            let cityId = this.matchResult.areaId
            let matchDate = this.matchResult.matchTime
            let urlOfWeather = 'http://120.24.236.54/E443070F24B0F5A/api/common/getWeatherByCityId.php'
            this.$axios.get(urlOfWeather + '?cityId=' + cityId + '&date=' + matchDate).then(res => {   // 获取天气
              if (res.data.returndata.length > 0) {
                this.weatherInfo = res.data.returndata[0]
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getActivitiesMatchEnroll () {
        let url = `${this.apiAddress}/api/game/getActivitiesMatchEnroll.php`
        let param = {
          json: `{"uid":"300","matchId":"${this.matchId}","teamId":"${this.teamId || 0}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata
            let registList = data.party_a === this.teamId
                           ? data.registerInfo_a
                           : data.party_b === this.teamId
                           ? data.registerInfo_b
                           : ''
            if (!this.activityId) {
              this.activityId = data.party_a === this.teamId
                              ? data.activityIdA
                              : data.party_b === this.teamId
                              ? data.activityIdB
                              : ''
            }
            this.unregistInfo = data.party_a === this.teamId
                              ? data.unRegisterInfo_a
                              : data.party_b === this.teamId
                              ? data.unRegisterInfo_b
                              : ''
            this.registInfo = {
              enroll: [],
              leave: [],
              undetermined: []
            }
            registList.forEach(item => {
              let obj = {
                playerId: item.uid,
                portrait: item.portrait,
                name: item.username,
                memberNumber: item.memberNumber
              }
              if (+item.registerType === 100) {
                this.registInfo.enroll.push(obj)
              } else if (+item.registerType === -1) {
                this.registInfo.leave.push(obj)
              } else if (+item.registerType === 0) {
                this.registInfo.undetermined.push(obj)
              }
            })
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      undetermined () {
        this.handleClick(0)
      },
      leave () {
        this.handleClick(-1)
      },
      enroll () {
        this.handleClick(100)
      },
      handleClick (type) {
        if (!this.uid) {
          this.$store.commit('showLogin')
          return
        }
        if (!this.activityId) {
          this.$store.commit('setConfirmShow', true)
          this.$store.commit('setConfirm', {
            confirmText: `没有活动id，可能需要球队管理员同意后才可进行反馈`,
            ensure: () => {
              this.$store.commit('setConfirmShow', false)
            }
          })
          return
        }
        if (this.playerInfo === '') {
          this.loadUserPlayerList()
        }
        this.participateType = type
        if (this.playerInfo.length === 1) {
          this.feedback(this.playerInfo[0].playerId, this.playerInfo[0].name)
          return
        }
        this.selectPopupShow = true
      },
      feedback (playerId, name) {
        if (!this.isTeamMember(playerId)) {
          this.$store.commit('setConfirmShow', true)
          this.$store.commit('setConfirm', {
            confirmText: `<span style="color:#32b847;">${name}</span> 还不是 <span style="color:#32b847;">${this.teamName}</span> 的成员，需加入球队才可报名，点击确定加入球队并反馈`,
            ensure: () => {
              this.playerJoinTeam(playerId)
              this.$store.commit('setConfirmShow', false)
            }
          })
          return
        }
        this.registerForActivity(playerId)
      },
      playerJoinTeam (playerId) {
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"team_player_playerJoinTeam","uid":${this.uid},"playerId":${playerId},"teamId":"${this.teamId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.teamMemberList.push(playerId)
            this.registerForActivity(playerId)
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      registerForActivity (playerId) {
        let url = `${this.apiAddress}/api/team/activities/registerForActivity.php`
        let param = {
          json: `{"activityId":"${this.activityId}","isManager":"0","participateNumbers":"1","participateType":"${this.participateType}","playerId":"${playerId}","teamId":"${this.teamId}","uid":"${this.uid}","version":"wap"}`
        }
        let successText = +this.participateType === 0 ? '反馈成功'
                        : +this.participateType === -1 ? '请假成功'
                        : +this.participateType === 100 ? '报名成功'
                        : ''
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.$store.commit('showToast', successText)
            this.getActivitiesMatchEnroll()
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      loadUserPlayerList () {
        let url = `${this.apiAddress}/api/user/loadUserPlayerList.php`
        let param = {
          json: `{"uid":${this.uid}}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.playerInfo = res.data.returndata
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadTeamBasicInfo () {    // 获取球队基本信息以及球队成员
        let url = `${this.apiAddress}/api/team/teamBasicInfo.php`
        let param = {
          json: `{"uid":"${this.uid || 250}","teamId":${this.teamId}}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.teamMemberList = res.data.returndata.playerList.map(item => item.userid)
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      isTeamMember (id) {   // 判断是否球队成员
        return this.teamMemberList.indexOf(id) >= 0
      }
    },
    components: { HeadAgainst, MatchSummary, ConveneNameList }
  }
</script>
