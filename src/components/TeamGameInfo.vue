<!-- TeamGameInfo.vue 球队参赛信息表 -->
<style lang="less" scoped>
  .team-game-info {
    font-size: .28rem;
    color: #282828;
    .team-info {
      padding: .2rem;
      display: flex;
      .portrait {
        flex: 0 0 1.34rem;
        height: 1.34rem;
        margin-right: .2rem;
      }
      .name {
        flex: 1;
        position: relative;
        .game {
          position: absolute;
          bottom: 0;
          color: #646464;
          font-size: .24rem;
        }
      }
    }
    .team-basic {
      .basic-item {
        position: relative;
        min-height: .96rem;
        display: flex;
        align-items: center;
        padding: 0 .2rem;
        justify-content: space-between;
      }
      .title {
        display: flex;
        height: .96rem;
        align-items: center;
        img {
          flex: 0 0 .4rem;
          height: .4rem;
          margin-right: .1rem;
        }
      }
      .uniform-content {
        display: flex;
        padding-left: 2rem;
      }
      .uniform-item {
        display: flex;
        align-items: center;
        margin: -.2rem .1rem .2rem;
      }
      .uniform-color, .uniform-img {
        width: .8rem;
        height: .8rem;
        border: 1px solid #c8c8c8;
        p {
          width: 100%;
          height: 33.333333%;
          border-bottom: 1px solid #c8c8c8;
        }
        p:last-child {
          border: 0;
        }
      }
      .uniforms {
        font-size: 0;
        margin-left: .2rem;
      }
    }
    .player-container {
      .list-head {
        text-align: center;
        height: .6rem;
        line-height: .6rem;
      }
      .player-list {
        text-align: center;
        .player {
          width: 100%;
          height: 1rem;
          line-height: 1rem;
        }
      }
      .player-info {
        .portrait {
          margin: .05rem auto;
          width: .6rem;
          height: .6rem;
        }
        .name {
          line-height: .3rem;
          font-size: .18rem;
        }
      }
    }
    .place-bottom {
      height: .8rem;
    }
    .join-team {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: .8rem;
      line-height: .8rem;
      color: #fff;
      font-size: .3rem;
      background: #5e81be;
      text-align: center;
    }
  }
  .width1 {
    width: 20%;
    height: 100%;
    overflow: hidden;
  }
  .page-left {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 20;
    background: rgba(0, 0, 0, 0.5);
  }
</style>

<template>
  <div class="team-game-info">
    <div class="team-info">
      <div class="portrait">
        <img class="_fullimg" :src="teamGameInfo.portrait" alt="">
      </div>
      <div class="name">
        <div class="team">{{teamGameInfo.teamName}}</div>
        <div class="game">{{teamGameInfo.gameName}}</div>
      </div>
    </div>
    <div class="gray-place-bar"></div>
    <div class="team-basic">
      <div class="basic-item border-bottom">
        <div class="title">
          <img src="//share.greenplayer.cn/share/img/icon/leader.png" alt="">
          <span>领队</span>
        </div>
        <div class="content">{{teamGameInfo.leaderName}}</div>
      </div>
      <div class="basic-item border-bottom">
        <div class="title">
          <img src="//share.greenplayer.cn/share/img/icon/coach.png" alt="">
          <span>教练</span>
        </div>
        <div class="content">{{teamGameInfo.coachName}}</div>
      </div>
      <div class="basic-item uniform">
        <div>
          <div class="title">
            <img src="//share.greenplayer.cn/share/img/match/uniform.png" alt="">
            <span>队服</span>
          </div>
          <div class="uniform-content">
            <div class="uniform-item">
              <div>主场队服</div>
              <div class="uniforms">
                <img class="uniform-img" v-if="false" src="" alt="">
                <div class="uniform-color" v-else>
                  <p :style="{background: teamGameInfo.homeCoat}"></p>
                  <p :style="{background: teamGameInfo.homePants}"></p>
                  <p :style="{background: teamGameInfo.homeSocks}"></p>
                </div>
              </div>
            </div>
            <div class="uniform-item">
              <div>客场队服</div>
              <div class="uniforms">
                <img class="uniform-img" v-if="false" src="" alt="">
                <div class="uniform-color" v-else>
                  <p :style="{background: teamGameInfo.awayCoat}"></p>
                  <p :style="{background: teamGameInfo.awayPants}"></p>
                  <p :style="{background: teamGameInfo.awaySocks}"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="gray-place-bar"></div>
    <div class="player-container">
      <div class="list-head _clearfix border-bottom">
        <div class="_left width1">排序</div>
        <div class="_left width1">球员</div>
        <div class="_left width1">位置</div>
        <div class="_left width1">号码</div>
        <div class="_left width1">参赛号</div>
      </div>
      <ul class="player-list">
        <li class="player _clearfix border-bottom"
            v-for="(item, index) in playerList"
            @click="goPlayerHome(item.playerId)">
          <div class="_left width1">{{++index}}</div>
          <div class="_left width1">
            <div class="player-info">
              <div class="portrait">
                <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
              </div>
              <div class="name _ellipsis">{{item.playerName}}</div>
            </div>
          </div>
          <div class="_left width1">{{item.position || '--'}}</div>
          <div class="_left width1">{{+item.memberNumber>=0 ? item.memberNumber : 'N'}}</div>
          <div class="_left width1">{{item.entryNumber || '--'}}</div>
        </li>
      </ul>
    </div>
    <div class="place-bottom"></div>
    <div class="join-team" @click.stop="apply('')" v-if="teamId&&gameId">申请征战/修改资料</div>
    <transition name="fadein">
      <div class="select-popup" v-show="selectPopupShow" @click="selectPopupShow=false">
        <div class="select-container">
          <i class="close-popup" @click="selectPopupShow=false"></i>
          <div class="popup-title" v-if="playerInfo.length>0">请选择球员</div>
          <ul class="select-list" v-if="playerInfo.length>0">
            <li class="select-item" v-for="item in numberOfTeamMember" @click="apply(item.playerId, item.name)">
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
  export default {
    name: 'TeamGameInfo',
    data () {
      return {
        gameId: this.getQueryString('gameId'),
        teamId: this.getQueryString('teamId'),
        isAssociation: this.getQueryString('isAssociation'),
        teamGameInfo: '',
        playerList: '',
        playerInfo: '',
        selectPopupShow: false,
        teamMemberList: '',
        teamBasicInfo: ''
      }
    },
    computed: {
      apiAddress () {
        return this.$store.state.apiAddress
      },
      uid () {
        return this.$store.state.uid
      },
      numberOfTeamMember () {
        return this.playerInfo.filter(item => {
          return this.isTeamMember(item.playerId)
        })
      }
    },
    watch: {
      uid (val, oldVal) {
        if (val) {
          this.loadUserPlayerList()
        }
      }
    },
    filters: {
      getCoachName (val) {
        if (val && val.coachList) {
          return val.coachList.length > 0 ? val.coachList[0].coachName : ''
        }
        return ''
      }
    },
    mounted () {
      document.title = '球队参赛信息'
      this.$store.commit('setTopBar', true)
      this.$store.commit('setUserList', true)
      this.loadTeamGameInfo()
      this.loadTeamBasicInfo()
      this.loadUserPlayerList()
    },
    methods: {
      loadTeamGameInfo () {   // 获取球队参赛信息
        let url = `${this.apiAddress}/api/team/gameManagement/loadTeamGameInfo.php`
        let param = {
          json: `{"gameId":"${this.gameId}","isAssociation":"0","teamId":"${this.teamId}","uid":"500","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.teamGameInfo = res.data.returndata
            this.teamGameInfo.homeCoat = this.teamGameInfo.homeCoat ? this.teamGameInfo.homeCoat.replace('0x', '#') : ''
            this.teamGameInfo.homePants = this.teamGameInfo.homePants ? this.teamGameInfo.homePants.replace('0x', '#') : ''
            this.teamGameInfo.homeSocks = this.teamGameInfo.homeSocks ? this.teamGameInfo.homeSocks.replace('0x', '#') : ''
            this.teamGameInfo.awayCoat = this.teamGameInfo.awayCoat ? this.teamGameInfo.awayCoat.replace('0x', '#') : ''
            this.teamGameInfo.awayPants = this.teamGameInfo.awayPants ? this.teamGameInfo.awayPants.replace('0x', '#') : ''
            this.teamGameInfo.awaySocks = this.teamGameInfo.awaySocks ? this.teamGameInfo.awaySocks.replace('0x', '#') : ''
            this.playerList = res.data.returndata.playerList
            // 设置微信分享
            this.$store.commit('setWxShareTitle', `${this.teamGameInfo.teamName} 的参赛信息`)
            this.$store.commit('setWxShareDesc', `${this.teamGameInfo.teamName} 参加“${this.teamGameInfo.gameName}”的信息，快来看看吧！`)
            this.$store.commit('setWxShareImgUrl', this.teamGameInfo.portrait)
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
            this.teamBasicInfo = res.data.returndata
            this.teamMemberList = res.data.returndata.playerList.map(item => item.userid)
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      loadUserPlayerList () {   // 获取球员列表
        if (!this.uid) {
          return
        }
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
        })
      },
      playerJoinTeam (playerId) {
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"team_player_playerJoinTeam","uid":${this.uid},"playerId":${playerId},"teamId":"${this.teamId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.$store.commit('showToast', '加入球队成功，请填写相关信息')
            this.$store.commit('setTransData', {    // 设置传输过去的数据，以供编辑页面调用
              playerId: playerId,
              gameId: this.gameId,
              teamId: this.teamId
            })
            this.$router.push({
              path: 'editdata'
            })
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      isTeamMember (id) {   // 判断是否球队成员
        return this.teamMemberList.indexOf(id) >= 0
      },
      apply (playerId) {    // 点击申请
        if (!this.uid) {
          this.$store.commit('showLogin')
          return
        }
        if (playerId) {   // 如果是弹窗选择的球员，直接有playerId
          this.$store.commit('setTransData', {    // 设置传输过去的数据，以供编辑页面调用
            playerId: playerId,
            gameId: this.gameId,
            teamId: this.teamId
          })
          this.$router.push({
            path: 'editdata'
          })
          return
        }
        if (this.numberOfTeamMember.length === 1) {   // 如果有且仅有一个球员在球队，直接跳转
          let playerId = this.numberOfTeamMember[0].playerId
          this.$store.commit('setTransData', {    // 设置传输过去的数据，以供编辑页面调用
            playerId: playerId,
            gameId: this.gameId,
            teamId: this.teamId
          })
          this.$router.push({
            path: 'editdata'
          })
        } else if (this.numberOfTeamMember.length > 1) {
          this.selectPopupShow = true
        } else {    // 用户下没有球员是球队成员，提示入队
          this.$store.commit('setConfirmShow', true)
          this.$store.commit('setConfirm', {
            confirmText: `您还不是球队成员，请先加入球队后再申请`,
            confirmSureText: '加入球队',
            ensure: () => {
              this.playerJoinTeam(this.uid)
              this.$store.commit('setConfirmShow', false)
            }
          })
        }
      },
      goPlayerHome (id) {
        // window.open(`/#/thirdpartyhome?playerId=${id}&pageType=1`)
        this.$router.push({
          path: 'thirdpartyhome',
          query: {
            pageType: 1,
            playerId: id
          }
        })
      }
    }
  }
</script>
