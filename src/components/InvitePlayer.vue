<!-- InvitePlayer.vue 邀请入队 -->
<style lang="less" scoped>
  .invite-player {
    .page-head {
      position: relative;
      color: #fff;
      font-size: .28rem;
      .head-background {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: url(http://share.greenplayer.cn/share/img/backimge.png);
        background-size: 100% 100%;
      }
      .team-invite {
        display: flex;
        align-items: center;
        padding: 0 .3rem;
        height: 1rem;
        .team-portrait {
          flex: 0 0 .8rem;
          height: .8rem;
          margin-right: .1rem;
        }
        .team-info {
          flex: 1;
          line-height: .4rem;
          overflow: hidden;
          .text {
            font-size: .22rem;
          }
        }
      }
      .team-show {
        text-align: center;
        .portrait {
          margin: .3rem auto .1rem;
          width: 2rem;
          height: 2rem;
        }
        .name {
          font-size: .3rem;
          line-height: .5rem;
        }
        .court {
          font-size: .24rem;
          color: #e6e6e6;
        }
      }
      .team-basic {
        font-size: .24rem;
        margin-top: .5rem;
        text-align: center;
        display: flex;
        .basic-item {
          flex: 1;
          padding: .1rem 0;
          line-height: .4rem;
          border-left: 1px solid #a0a0a0;
          &:first-child {
            border: 0;
          }
          .data {
            font-size: .28rem;
          }
          .item {
            font-size: .24rem;
            color: #e6e6e6;
          }
        }
      }
    }
    .page-center {
      .player-list {
        font-size: .28rem;
        .player {
          float: left;
          width: 25%;
          padding: .2rem;
          .player-portrait {
            width: 1rem;
            height: 1rem;
            margin: 0 auto;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
              border: 1px solid #a0a0a0;
              border-radius: 50%;
            }
          }
          .player-name {
            height: .4rem;
            line-height: .4rem;
            color: #282828;
            text-align: center;
          }
        }
      }
      .no-player {
        font-size: .3rem;
        color: #646464;
        line-height: 2rem;
        text-align: center;
      }
    }
    .page-foot {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1rem;
      background: #f0f0f0;
      box-shadow: 0 0 1px #a0a0a0;
      .join-btn {
        display: block;
        margin: auto;
        font-size: .4rem;
        color: #fff;
        width: 90%;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        background: #32b847;
        border-radius: 5px;
      }
    }
  }
  .select-popup {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    color: #282828;
    background: rgba(0, 0, 0, 0.3);
    .select-container {
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
    .no-select-tip {
      padding: .8rem .3rem;
      font-size: .26rem;
      color: #646464;
    }
    .select-list {
      max-height: 7rem;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .select-item {
      display: flex;
      align-items: center;
      padding: .1rem .2rem;
      font-size: .26rem;
      .select-portrait {
        flex: 0 0 .8rem;
        height: .8rem;
        margin-right: .1rem;
      }
      .select-name {
        flex: 1;
        max-height: .8rem;
        line-height: .4rem;
        overflow: hidden;
      }
    }
  }
</style>

<template>
  <div class="invite-player">
    <div class="page-head">
      <div class="head-background"></div>
      <div class="team-invite">
        <div class="team-portrait">
          <img class="_fullimg" :src="teamInfo.portrait" alt="">
        </div>
        <div class="team-info">
          <div class="team-name _ellipsis">{{teamInfo.teamname}}</div>
          <div class="text">邀请你加入，共写绿茵传奇</div>
        </div>
      </div>
      <div class="team-show">
        <div class="portrait">
          <img class="_fullimg" :src="teamInfo.portrait" alt="">
        </div>
        <div class="name _ellipsis">{{teamInfo.teamname}}</div>
        <div class="court _ellipsis">主场：{{teamInfo.courtAddress || '未知'}}</div>
      </div>
      <div class="team-basic">
        <div class="basic-item">
          <p class="data _ellipsis">{{getCreateTime}}</p>
          <p class="item _ellipsis">成立时间</p>
        </div>
        <div class="basic-item">
          <p class="data _ellipsis">{{teamInfo.area}}</p>
          <p class="item _ellipsis">地区</p>
        </div>
        <div class="basic-item">
          <p class="data _ellipsis">{{playerList.length}}</p>
          <p class="item _ellipsis">成员</p>
        </div>
      </div>
    </div>
    <div class="page-center">
      <ul class="player-list _clearfix" v-if="playerList.length>0">
        <li class="player" v-for="item in playerList">
          <div class="player-portrait">
            <img :src="item.portrait" alt="">
          </div>
          <div class="player-name _ellipsis">{{item.userName}}</div>
        </li>
      </ul>
      <div class="no-player" v-else>暂无球员</div>
    </div>
    <div style="height:1rem;"></div>
    <div class="page-foot">
      <a class="join-btn" href="javascript:;" @click="selectPlayer">加入球队</a>
    </div>
    <transition name="fadein">
      <div class="select-popup" v-show="selectPopupShow" @click="selectPopupShow=false">
        <div class="select-container">
          <i class="close-popup" @click="selectPopupShow=false"></i>
          <div class="popup-title" v-if="playerInfo.length>0">请选择要加入球队的球员</div>
          <ul class="select-list" v-if="playerInfo.length>0">
            <li class="select-item border-top" v-for="item in playerInfo" @click="joinTeam(item.playerId)">
              <div class="select-portrait">
                <img class="_fullimg" :src="item.portrait" alt="">
              </div>
              <div class="select-name">{{item.name}}<span style="color:red;font-size:.2rem;" v-if="hasJoined(item.playerId)">(已入队)</span></div>
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
  export default {
    name: 'InvitePlayer',
    data () {
      return {
        teamId: this.getQueryString('teamId'),
        teamInfo: '',
        playerList: '',
        playerInfo: '',
        selectPopupShow: false
      }
    },
    computed: {
      uid () { return this.$store.state.uid },
      apiAddress () {
        return this.$store.state.apiAddress
      },
      getCreateTime () {
        if (this.teamInfo.createTime) {
          return this.teamInfo.createTime.replace(/\s[\d:]+$/, '')
        }
        return '未知'
      }
    },
    mounted () {
      document.title = '邀请入队'
      this.$store.commit('setUserList', true)
      this.teamBasicInfo()
    },
    watch: {
      uid (val, oldVal) {
        if (val) {
          this.loadUserPlayerList()
        }
      }
    },
    methods: {
      teamBasicInfo () {
        let url = `${this.apiAddress}/api/team/teamBasicInfo.php`
        let uid = this.uid || 250
        let param = {
          json: `{"uid":${uid},"teamId":${this.teamId},"msgId":"0","isMsgReceiver":"0"} `
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.teamInfo = res.data.returndata
            this.playerList = res.data.returndata.playerList
            this.$store.commit('setWxShareTitle', `"${res.data.returndata.teamname}" 集结号`)
            this.$store.commit('setWxShareDesc', `无兄弟不足球，大伙儿都在等你入队吆~`)
            this.$store.commit('setWxShareImgUrl', res.data.returndata.portrait)
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      selectPlayer () {
        if (!this.uid) {
          this.$store.commit('showLogin')
          return
        }
        if (!this.playerInfo) {
          this.loadUserPlayerList()
        }
        this.selectPopupShow = true
      },
      joinTeam (playerId) {
        let arr = this.teamInfo.playerList.map(item => item.userid)
        if (arr.indexOf(playerId) > -1) {
          this.$store.commit('showToast', '您已经是该球队的一员了')
          return
        }
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"team_player_playerJoinTeam","uid":${this.uid},"playerId":${playerId},"teamId":"${this.teamId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.$store.commit('showToast', '加入球队成功')
            this.teamBasicInfo()
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      hasJoined (playerId) {    // 判断球员是否已在队中
        let arr = this.teamInfo.playerList.map(item => item.userid)
        if (arr.indexOf(playerId) > -1) {
          return true
        }
        return false
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
      }
    }
  }
</script>
