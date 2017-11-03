<!-- ActivityConvene.vue 活动召集 -->
<style lang="less" scoped>
  .activity-convene {
    font-size: .28rem;
    .page-head {
      position: relative;
      width: 100%;
      height: 3.2rem;
      .head-background {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(//share.greenplayer.cn/share/img/against-bg.png);
        background-size: 100%;
        z-index: -1;
      }
      .head {
        display: flex;
        align-items: center;
        color: #fff;
        width: 100%;
        height: 100%;
        padding: .5rem;
        .portrait {
          flex: 0 0 1.8rem;
          height: 1.8rem;
          margin-right: .2rem;
        }
        .desc {
          flex: 1;
          overflow: hidden;
          .title {
            font-size: .32rem;
            line-height: .8rem;
          }
          .date {
            line-height: .5rem;
          }
          .addr {
            line-height: .5rem;
          }
        }
      }
    }
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
        background: #f0f0f0;
        padding: .2rem;
        .activity-info {
          background: #fff;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          .list {}
          .item {
            position: relative;
            padding: .2rem;
            display: flex;
            justify-content: space-between;
            line-height: .4rem;
            &::after {
              content: '';
              display: block;
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              height: 1px;
              background: #a0a0a0;
              transform: scaleY(0.5);
            }
            &:last-child::after {
              height: 0;
            }
            .title {
              flex: 0;
              white-space: nowrap;
              font-size: .32rem;
              img {
                width: .5rem;
                height: .5rem;
                vertical-align: middle;
              }
            }
            .content {
              flex: 1;
              text-align: right;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div class="activity-convene">
    <header class="page-head">
      <div class="head-background"></div>
      <div class="head">
        <div class="portrait">
          <img class="_fullimg" :src="activityInfo.selfTeamPortrait" alt="">
        </div>
        <div class="desc">
          <p class="title _ellipsis">{{activityInfo.selfTeamName}}</p>
          <p class="date _ellipsis">{{getActivityTime}}</p>
          <p class="addr _ellipsis">{{activityInfo.activityPlace}}</p>
        </div>
      </div>
    </header>
    <nav class="page-nav">
      <a href="javascript:;" class="nav-item" :class="{active: nav===0}" @click="nav=0">详情</a>
      <a href="javascript:;" class="nav-item" :class="{active: nav===1}" @click="nav=1">名单</a>
    </nav>
    <div class="page-container">
      <div class="page-group" :style="{transform: 'translateX('+translateVert+')'}">
        <!-- 活动详情 -->
        <div class="page detail">
          <div class="activity-info">
            <ul class="list">
              <li class="item">
                <div class="title">
                  活动说明：
                </div>
                <div class="content">{{activityInfo.activityName}}</div>
              </li>
              <li class="item">
                <div class="title">
                  费用：
                </div>
                <div class="content">{{activityInfo.estimateCost}}</div>
              </li>
              <li class="item">
                <div class="title">
                  <!-- <img src="//share.greenplayer.cn/share/img/match/comment.png" alt=""> -->
                  备注：
                </div>
                <div class="content">{{activityInfo.noteInfo}}</div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 报名名单 -->
        <div class="page name-list">
          <convene-name-list
            :registInfo="registInfo"
            :unregistInfo="unregistInfo"
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
            <li class="select-item border-top" v-for="item in playerInfo" @click="register(item.playerId)">
              <div class="select-portrait">
                <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
              </div>
              <div class="select-name">{{item.name}}</div>
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
  import ConveneNameList from './common/ConveneNameList'

  export default {
    name: 'ActivityConvene',
    data () {
      return {
        nav: 1,
        activityId: this.getQueryString('activityId') || 6421,
        teamId: this.getQueryString('teamId') || 185,
        activityInfo: '',
        registerType: '',
        selectPopupShow: false,
        playerInfo: '',
        registInfo: {
          enroll: [],
          leave: [],
          undetermined: []
        },
        unregistInfo: ''
      }
    },
    computed: {
      apiAddress () {
        return this.$store.state.apiAddress
      },
      uid () { return this.$store.state.uid },
      translateVert () {
        return -this.nav * 100 + '%'
      },
      getActivityTime () {
        return this.activityInfo.activityTime ? this.activityInfo.activityTime.replace(/:\d+$/, '') : this.activityInfo.activityTime
      }
    },
    watch: {
      uid (val, oldVal) {
        if (val) {
          this.loadUserPlayerList()
        }
      }
    },
    mounted () {
      document.title = '活动召集'
      document.documentElement.style.height = document.body.style.height = '100%'
      document.querySelector('#app').style.height = '100%'
      this.$store.commit('setUserList', true)   // 显示用户登录状态
      this.loadDetailedActivityInfo()
      this.getActivityRegisterInfo()
    },
    methods: {
      loadDetailedActivityInfo () {   // 加载活动信息
        let url = `${this.apiAddress}/api/team/activities/loadDetailedActivityInfo.php`
        let param = {
          json: `{"activityId":"${this.activityId}","playerId":"","teamId":"${this.teamId}","uid":"258"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.activityInfo = res.data.activityInfo
            // 设置微信分享
            this.$store.commit('setWxShareTitle', `${res.data.activityInfo.selfTeamName}活动召集`)
            this.$store.commit('setWxShareDesc', `${res.data.activityInfo.selfTeamName}召集大家一起来参加${res.data.activityInfo.activityTime.replace(/\s[\d:]$/, '')}的活动，快来报名吧~`)
            this.$store.commit('setWxShareImgUrl', res.data.activityInfo.selfTeamPortrait)
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getActivityRegisterInfo () {    // 加载活动报名人员情况
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"match_activity_getActivityRegisterInfo","activityId":${this.activityId}}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.registInfo = {
              enroll: [],
              leave: [],
              undetermined: []
            }
            res.data.returndata.registerInfo_a.forEach(item => {
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
            this.unregistInfo = res.data.returndata.unRegisterInfo_a
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      undetermined () {     // 选择待定
        this.handleClick(0)
      },
      leave () {    // 选择请假
        this.handleClick(-1)
      },
      enroll () {   // 选择报名
        this.handleClick(100)
      },
      handleClick (type) {
        if (!this.uid) {
          this.$store.commit('showLogin')
          return
        }
        if (this.playerInfo === '') {
          this.loadUserPlayerList()
        }
        this.registerType = type
        if (this.playerInfo.length === 1) {
          this.register(this.playerInfo[0].playerId)
          return
        }
        this.selectPopupShow = true
      },
      register (playerId) {
        this.$store.commit('setLoading', true)
        let url = `${this.apiAddress}/api/team/activities/registerForActivity.php`
        let param = {
          json: `{"uid":${this.uid},"playerId":${playerId},"teamId":"${this.teamId}","isManager":"0","activityId":"${this.activityId}","participateType":"${this.registerType}","participateNumbers":"1"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let successText = +this.registerType === 0 ? '反馈成功'
                            : +this.registerType === -1 ? '请假成功'
                            : +this.registerType === 100 ? '报名成功'
                            : ''
            this.$store.commit('showToast', successText)
            this.getActivityRegisterInfo()
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.$store.commit('setLoading', false)
        }).catch(err => {
          console.log(err)
          this.$store.commit('setLoading', false)
        })
      },
      loadUserPlayerList () {
        let url = `${this.apiAddress}/api/user/loadUserPlayerList.php`
        let param = {
          json: `{"uid":"${this.uid}"}`
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
      }
    },
    components: { ConveneNameList }
  }
</script>
