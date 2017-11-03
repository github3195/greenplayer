<!-- GameConvene.vue 赛事召集 -->
<style lang="less" scoped>
  .game-convene {
    .page-head {
      .background {
        height: 3.7rem;
      }
      .game-info {
        position: relative;
        height: 1.5rem;
        padding: .2rem .3rem;
        background: #fff;
      }
      .game-portrait {
        position: absolute;
        width: 1.5rem;
        height: 1.5rem;
        bottom: .15rem;
        border: 2px solid #fff;
        background: #fff;
        border-radius: 50%;
        overflow: hidden;
      }
      .game-desc {
        position: relative;
        padding-left: 1.7rem;
        height: 100%;
        color: #282828;
        .game-name {
          font-size: .28rem;
          line-height: .4rem;
          max-height: .8rem;
          overflow: hidden;
        }
        .game-summary {
          position: absolute;
          bottom: 0;
          font-size: .2rem;
        }
      }
    }
    .page-container {
      padding: 0 .1rem;
      background: #f0f0f0;
      overflow: scroll;
      .block {
        margin: .2rem 0;
        width: 100%;
        padding: 0 .2rem;
        color: #282828;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 1px 5px #a0a0a0;
      }
      .block-head {
        position: relative;
        height: .8rem;
        display: flex;
        align-items: center;
        .text {
          height: .4rem;
          line-height: .4rem;
          font-size: .28rem;
          padding-left: .2rem;
          border-left: 4px solid #32b847;
        }
      }
      .game-detail {
        font-size: .26rem;
        line-height: .32rem;
      }
      .game-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .25rem .2rem;
        .title {
          flex-shrink: .2rem;
        }
        .text {
          max-width: 5rem;
          white-space: pre-wrap;
          overflow: hidden;
        }
      }
      .sponsor {    // 赛事赞助商
        padding: .25rem .2rem;
        .sponsor-list {
        }
        .sponsor-item {
          float: left;
          margin: .2rem 0;
          width: 33.33333%;
          text-align: center;
        }
        .sponsor-portrait {
          width: .6rem;
          height: .6rem;
          margin: 0 auto;
        }
        .sponsor-name {
          margin-top: .1rem;
        }
      }
      .introduction {   // 赛事简介
        padding: .25rem .2rem;
        .title {
          // line-height: .6rem;
        }
        .text {
          padding-left: .4rem;
          line-height: .36rem;
          white-space: pre-wrap;
        }
      }
      .enroll-team {    // 已报名球队
        float: left;
        width: 50%;
        padding: .15rem;
        display: flex;
        align-items: center;
        .team-portrait {
          flex: 0 0 .59rem;
          height: .59rem;
          margin-right: .1rem;
          font-size: 0;
        }
        .team-name {
          line-height: .3rem;
          max-height: .59rem;
          font-size: .2rem;
          overflow: hidden;
        }
      }
    }
    .page-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: .98rem;
      padding: .14rem;
      background: #fff;
      box-shadow: 0 0 1px #a0a0a0;
      .enroll-btn {
        display: block;
        margin: 0 auto;
        height: .7rem;
        line-height: .7rem;
        text-align: center;
        width: 6.8rem;
        background: #32b847;
        border-radius: 4px;
        font-size: .28rem;
        color: #fff;
      }
    }
  }
  .border-bottom::after {
    background: #f0f0f0;
  }
  .border-top {
    position: relative;
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: #f0f0f0;
      transform: scaleY(0.5);
    }
  }
  .team-popup {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    color: #282828;
    background: rgba(0, 0, 0, 0.3);
    .team-container {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      width: 5rem;
      margin: auto;
      transform: translateY(-50%);
      background: #fff;
      border-radius: 5px;
      .close-popup {
        position: absolute;
        display: block;
        right: 0;
        top: 0;
        width: .6rem;
        height: .6rem;
        padding: .1rem;
        background: url(http://share.greenplayer.cn/share/img/icon/close.png) no-repeat;
        background-size: 80% 80%;
        background-position: 50% 50%;
        z-index: 22;
      }
      .popup-title {
        font-size: .28rem;
        padding-left: .2rem;
        line-height: .8rem;
      }
    }
    .no-team-tip {
      padding: .8rem .3rem;
      font-size: .26rem;
      color: #646464;
    }
    .team-list {
      max-height: 7rem;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .team-item {
      display: flex;
      align-items: center;
      padding: .1rem .2rem;
      font-size: .26rem;
      .team-portrait {
        flex: 0 0 .8rem;
        height: .8rem;
        margin-right: .1rem;
      }
      .team-name {
        flex: 1;
        max-height: .8rem;
        line-height: .4rem;
        overflow: hidden;
      }
    }
  }
</style>

<template>
  <div class="game-convene" @click="userlistShow=false">
    <div class="game-convene-container">
      <header class="page-head">
        <div class="background">
          <img class="_fullimg" :src="gameInfo.coverPic.replace('!small', '') || '//share.greenplayer.cn/share/img/association.png'" alt="">
        </div>
        <div class="game-info">
          <div class="game-portrait">
            <img class="_fullimg" :src="gameInfo.portrait" alt="">
          </div>
          <div class="game-desc">
            <div class="game-name">{{gameInfo.gamename}}</div>
            <div class="game-summary">{{gameInfo.rule_name}}制{{getGameType}} {{gameInfo.teamNumber}}支球队</div>
          </div>
        </div>
      </header>
      <main class="page-container">
        <div class="page-inner">
          <!-- 赛事主要信息 -->
          <div class="block ">
            <div class="block-head border-bottom">
              <p class="text">基本资料</p>
            </div>
            <div class="game-detail">
              <div class="game-item border-bottom date">
                <p class="title">赛事时间</p>
                <div class="text">{{gameInfo.starttime.replace(/\s[\d\:]+/, '')}} 至 {{gameInfo.endtime.replace(/\s[\d\:]+/, '')}}</div>
              </div>
              <div class="game-item border-bottom city">
                <p class="title">举办城市</p>
                <div class="text">{{gameInfo.area}}</div>
              </div>
              <div class="game-item border-bottom area">
                <p class="title">举办场地</p>
                <div class="text">{{getPossibleCourt}}</div>
              </div>
              <div class="game-item border-bottom contact">
                <p class="title">联系人</p>
                <div class="text">{{gameInfo.contactName}}</div>
              </div>
              <div class="game-item border-bottom deadline">
                <p class="title">报名截止时间</p>
                <div class="text">{{gameInfo.enrollmentDeadline.replace(/:\d\d$/, '')}}</div>
              </div>
              <div class="game-item border-bottom company">
                <p class="title">主办/协办单位</p>
                <div class="text">
                  <p>{{gameInfo.associationName}}</p>
                </div>
              </div>
              <div class="sponsor border-bottom">
                <p>赞助商</p>
                <ul class="sponsor-list _clearfix">
                  <li class="sponsor-item" v-for="item in gameInfo.sponsorList">
                    <div class="sponsor-portrait">
                      <img class="_fullimg" :src="item.portrait" alt="">
                    </div>
                    <p class="sponsor-name _ellipsis">{{item.sponsorName}}</p>
                  </li>
                </ul>
              </div>
              <div class="introduction">
                <p class="title">赛事介绍</p>
                <div class="text">{{gameInfo.comments}}</div>
              </div>
            </div>
          </div>
          <!-- 报名球队 -->
          <div class="block">
            <div class="block-head border-bottom">
              <p class="text">已报名球队（<span style="color:#32b847;">{{gameInfo.enrollmentList.length}}</span> 支）</p>
            </div>
            <ul class="enroll-team-list _clearfix">
              <li class="enroll-team" v-for="item in gameInfo.enrollmentList">
                <div class="team-portrait">
                  <img class="_fullimg" :src="item.icon" alt="">
                </div>
                <div class="team-name">
                  {{item.teamName}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <div style="height: .98rem;"></div>
      <footer class="page-footer">
        <a href="javascript:;" class="enroll-btn" :style="{background: getGameStatus.color}" @click="enrollGame">{{getGameStatus.text}}</a>
      </footer>
    </div>
    <transition name="fadein">
      <div class="team-popup" v-show="teamListShow" @click="teamListShow=false">
        <div class="team-container">
          <i class="close-popup" @click="teamListShow=false"></i>
          <div class="popup-title" v-if="teamInfo.length>0">请选择要参赛的球队</div>
          <ul class="team-list" v-if="teamInfo.length>0">
            <li class="team-item border-top" v-for="item in teamInfo" @click="selectTeam(item.teamid)">
              <div class="team-portrait">
                <img class="_fullimg" :src="item.portrait" alt="">
              </div>
              <div class="team-name">{{item.teamname}}</div>
            </li>
          </ul>
          <div class="no-team-tip" v-else>
            您还没有创建任何球队，请下载绿茵场APP并创建至少一支球队后再报名
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'GameConvene',
    data () {
      return {
        gameId: this.getQueryString('gameId'),
        gameInfo: '',
        teamListShow: false,
        teamInfo: '',
        hasLoadTeam: false
      }
    },
    computed: {
      apiAddress () {
        return this.$store.state.apiAddress
      },
      uid () { return this.$store.state.uid },
      getGameType () {
        let type = this.gameInfo.gametype
        let roundRobin = this.gameInfo.roundRobin
        return +type === 2 ? +roundRobin === 1 ? '单循环联赛' : '双循环联赛' : '杯赛'
      },
      getGameStatus () {
        let status = this.gameInfo.gameStatus
        if (+status === 0) {
          return {
            color: '#c8c8c8',
            text: '赛事创建中'
          }
        } else if (+status === 1) {
          return {
            color: '#32b847',
            text: '报 名'
          }
        } else if (+status === 5 || +status === 7) {
          return {
            color: '#c8c8c8',
            text: '报名已结束，赛事筹备中'
          }
        } else if (+status > 10 && +status < 30) {
          return {
            color: '#c8c8c8',
            text: '报名已结束，赛事进行中'
          }
        } else if (+status === 30) {
          return {
            color: '#c8c8c8',
            text: '赛事已结束'
          }
        } else {
          return {
            color: '#c8c8c8',
            text: `报名已结束`
          }
        }
      },
      getPossibleCourt () {   // 获取可能的举办场地
        let possibleCourtList = this.gameInfo.possibleCourtList
        if (possibleCourtList.length < 1) {
          return ''
        } else {
          let courtList = possibleCourtList.map(item => item.name)
          return courtList.join('、')
        }
      }
    },
    created () {
      document.documentElement.style.height = document.body.style.height = '100%'
      document.querySelector('#app').style.height = '100%'
    },
    mounted () {
      this.$store.commit('setUserList', true)
      this.gameBasicInfo()
    },
    methods: {
      gameBasicInfo () {    // 获取赛事信息
        this.$store.commit('setLoading', true)
        let url = `${this.apiAddress}/api/game/gameBasicInfo.php`
        let param = {
          json: `{"uid":"${this.uid || 127}","gameId":${this.gameId}}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.gameInfo = res.data.returndata
            document.title = this.gameInfo.gamename
            this.$store.commit('setWxShareTitle', this.gameInfo.gamename)
            this.$store.commit('setWxShareDesc', this.gameInfo.comments)
            this.$store.commit('setWxShareImgUrl', this.gameInfo.portrait)
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.$store.commit('setLoading', false)
        }).catch(err => {
          this.$store.commit('setLoading', false)
          console.log(err)
        })
      },
      loadAllTeamsCreatedBy () {    // 加载用户所创建的所有球队
        let url = `${this.apiAddress}/api/team/loadAllTeamsCreatedBy.php`
        let param = {
          json: `{"uid":"${this.uid}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            // if (res.data.returndata.length < 1) {
            //   this.$store.commit('showToast', '您还没有创建任何球队，请下载绿茵场APP创建至少一支球队后再报名')
            //   this.teamListShow = false
            //   return
            // }
            this.teamInfo = res.data.returndata
            this.hasLoadTeam = true
            this.teamListShow = true
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      enrollGame () {   // 报名参加赛事
        if (+this.gameInfo.gameStatus !== 1) {    // 不是报名状态则退出
          this.$store.commit('showToast', this.getGameStatus.text)
          return
        }
        if (!this.uid) {
          this.$store.commit('showLogin')
          return
        }
        if (!this.hasLoadTeam) {
          this.loadAllTeamsCreatedBy()
        } else {
          this.teamListShow = true
        }
      },
      selectTeam (id) {   // 选择球队后执行报名
        let cfm = confirm('确定报名本场赛事吗？')
        if (!cfm) {
          return
        }
        let url = `${this.apiAddress}/api/game/gameRegister.php`
        let param = {
          json: `{"uid":"${this.uid}","teamId":${id},"gameId":"${this.gameId}", "members":[]}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.$store.commit('showToast', '报名成功，请等待赛事方答复')
            this.gameBasicInfo()
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
