<!-- 双方球员名单 -->
<style lang="less" scoped>
  .both-name-list {
    .name-list-title {
      padding: 0 .2rem;
      width: 100%;
      height: .5rem;
      line-height: .5rem;
      font-size: .24rem;
      color: #282828;
      background: #e6e6e6;
    }
    .both-name-list-container {
      position: relative;
      .name-list-wrap {
        &.home .name-list .name-list-item .player-info {
          .player-name .thumbs-up {
            background: url(//share.greenplayer.cn/share/img/icon/content_elect_green_nor@2x.png);
            background-size: 100% 100%;
            &.disable {
              background-image: url(//share.greenplayer.cn/share/img/icon/content_icon_dianzan_off@2x.png.jpg);
            }
          }
          .player-position .vote-bar .vote-bar-inner {
            background: #3d811f;
          }
        }
        .name-list {
          .name-list-item {
            margin: .3rem 0;
            .player-portrait {
              position: relative;
              margin: 0 .2rem;
              width: .8rem;
              height: .8rem;
              font-size: 0;
              border-radius: 50%;
              &.left {
                border: 1px solid #3d811f;
                .close-num {
                  background: url(//share.greenplayer.cn/share/img/match/content_polo-shirt_left_green@2x.png);
                  background-size: 100% 100%;
                }
              }
              &.right {
                border: 1px solid #5e81be;
                .close-num {
                  background: url(//share.greenplayer.cn/share/img/match/content_polo-shirt_right_blue@2x.png);
                  background-size: 100% 100%;
                }
              }
              .close-num {
                position: absolute;
                right: -.1rem;
                bottom: -.1rem;
                width: .4rem;
                height: .4rem;
                line-height: .4rem;
                text-align: center;
                font-size: .2rem;
                color: #fff;
                font-style: normal;
                background-size: 100% 100%;
              }
            }
            .player-info {
              font-size: .26rem;
              width: 2.5rem;
              .player-name {
                position: relative;
                width: 2.5rem;
                height: .4rem;
                line-height: .4rem;
                color: #282828;
                .name {
                  display: inline-block;
                  max-width: 1.3rem;
                }
                .votes {
                  vertical-align: top;
                }
                .thumbs-up {
                  position: absolute;
                  right: .1rem;
                  bottom: 0;
                  width: .40rem;
                  height: .40rem;
                  background: url(//share.greenplayer.cn/share/img/icon/content_elect_blue_nor@2x.png);
                  background-size: 100% 100%;
                  &.disable {
                    background-image: url(//share.greenplayer.cn/share/img/icon/content_icon_dianzan_off@2x.png.jpg);
                  }
                }
              }
              .player-position {
                position: relative;
                height: .4rem;
                line-height: .4rem;
                color: #646464;
                font-size: .24rem;
                .position {
                  display: inline-block;
                  width: .6rem;
                }
                .vote-bar {
                  display: inline-block;
                  width: 1.8rem;
                  height: .12rem;
                  border: 1px solid #b4b4b4;
                  border-radius: 4px;
                  position: absolute;
                  margin: auto;
                  top: 0;
                  bottom: 0;
                  .vote-bar-inner {
                    display: block;
                    width: 0;
                    height: 100%;
                    background: #5e81be;
                    border-radius: 4px;
                    transition: width .2s;
                    &.right {
                      background: #5e81be;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .dividing-line {
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 1px;
        height: auto;
        background: #b4b4b4;
        transform: scaleX(0.5);
      }
    }
  }
</style>

<template>
  <div class="both-name-list">
    <div class="name-list-title" :class="{'_txt-center':type===1}">{{getTitleName}}</div>
    <div class="both-name-list-container _clearfix">
      <div class="name-list-wrap home _left _width50">
        <ul class="name-list">
          <li class="name-list-item _clearfix" v-for="(item, index) in playerList.MvpPlayerListA">
            <div class="player-portrait left _left">
              <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
              <i class="close-num">{{+item.memberNumber>=0?item.memberNumber:'N'}}</i>
            </div>
            <div v-if="0 === type" class="player-info left _left">
              <p class="player-name _ellipsis">{{item.username}}</p>
              <p class="player-position _ellipsis">{{item.roleName || '--'}}</p>
            </div>
            <div v-if="1 === type" class="player-info left _left">
              <p class="player-name">
                <span class="name _ellipsis">{{item.username}}</span>
                <span class="votes">({{item.supportNumber}})</span>
                <i class="thumbs-up" v-if="isVoting && beforeDeadLineA && +item.isVote===0" @click.stop="voteForPlayerA(item)"></i>
                <i class="thumbs-up disable" v-else-if="beforeDeadLineA"></i>
              </p>
              <p class="player-position">
                <span class="position _ellipsis">{{item.roleName || '--'}}</span>
                <span class="vote-bar">
                  <span class="vote-bar-inner" :style="{width: (item.supportNumber/voteTotalA*100) + '%'}"></span>
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="name-list-wrap away _right _width50">
        <ul class="name-list">
          <li class="name-list-item _clearfix" v-for="(item, index) in playerList.MvpPlayerListB">
            <div class="player-portrait right _left">
              <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
              <i class="close-num">{{+item.memberNumber>=0?item.memberNumber:'N'}}</i>
            </div>
            <div v-if="0 === type" class="player-info right _left">
              <p class="player-name _ellipsis">{{item.username}}</p>
              <p class="player-position _ellipsis">{{item.roleName || '--'}}</p>
            </div>
            <div v-if="1 === type" class="player-info right _left">
              <p class="player-name">
                <span class="name _ellipsis">{{item.username}}</span>
                <span class="votes">({{item.supportNumber}})</span>
                <i class="thumbs-up" v-if="isVoting && beforeDeadLineB && +item.isVote===0" @click.stop="voteForPlayerB(item)"></i>
                <i class="thumbs-up disable" v-else-if="beforeDeadLineB"></i>
              </p>
              <p class="player-position">
                <span class="position _ellipsis">{{item.roleName || '--'}}</span>
                <span class="vote-bar">
                  <span class="vote-bar-inner" :style="{width: (item.supportNumber/voteTotalB*100) + '%'}"></span>
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="dividing-line"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        playerList: '',
        matchId: this.getQueryString('matchId')
      }
    },
    props: {
      type: Number,
      titleName: String,
      isVoting: Boolean,
      hasLoadMvpList: false,
      homeTeamId: '',
      awayTeamId: '',
      playerListA: ''
    },
    computed: {
      voteTotalA () {    // 计算主队总票数
        let n = 0
        this.playerList.MvpPlayerListA.forEach((item, index) => {
          n += parseInt(item.supportNumber)
        })
        return n
      },
      voteTotalB () {    // 计算客队总票数
        let n = 0
        this.playerList.MvpPlayerListB.forEach((item, index) => {
          n += parseInt(item.supportNumber)
        })
        return n
      },
      beforeDeadLineA () {   // 计算现在投票是否截止了
        let now = new Date()
        if (this.playerList.deadlineA) {
          let deadLine = new Date(this.playerList.deadlineA.replace(/-/g, '/'))  // ios下 yy-mm-dd 不能正确 new ， 转为 yy/mm/dd
          return now < deadLine
        }
        return false
      },
      beforeDeadLineB () {   // 计算现在投票是否截止了
        let now = new Date()
        if (this.playerList.deadlineB) {
          let deadLine = new Date(this.playerList.deadlineB.replace(/-/g, '/'))  // ios下 yy-mm-dd 不能正确 new ， 转为 yy/mm/dd
          return now < deadLine
        }
        return false
      },
      getTitleName () {
        if (this.type === 0) {
          return this.titleName
        } else if (this.type === 1) {
          if (this.beforeDeadLineA || this.beforeDeadLineB) {
            return this.beforeDeadLineA
                 ? `${this.titleName}(截止${this.playerList.deadlineA.replace(/:\d\d$/, '')})`
                 : `${this.titleName}(截止${this.playerList.deadlineB.replace(/:\d\d$/, '')})`
          } else {
            return `${this.titleName}(已结束)`
          }
        }
      },
      uid () { return this.$store.state.uid || this.getQueryString('uid') },
      apiAddress () {
        return this.$store.state.apiAddress
      }
    },
    mounted () {
      if (this.playerListA) {
        this.playerList = this.playerListA    // 名单的数据是父组件传过来的
      }
    },
    watch: {
      uid (val, oldVal) {
        if (this.type === 1) {
          this.loadMvpInfoForTeam()
        }
      },
      hasLoadMvpList (val, oldVal) {
        if (val) {
          this.loadMvpInfoForTeam()
        }
      },
      playerListA (val, oldVal) {
        if (val) {
          this.playerList = val
        }
      }
    },
    methods: {
      voteForPlayerA (item) {
        if (!this.uid) {
          if (this.getQueryString('fromApp')) {
            let sendData = {
              type: 'goLogin'
            }
            if (this.$sendDataToClient(sendData)) {
              return
            }
          }
          this.$store.commit('showLogin')
          return false
        }
        let targetId = item.uid
        let url = `${this.apiAddress}/api/match/voteForMvpOfMatch.php`
        let param = {
          json: '{"matchId":"' + this.matchId + '","teamId":' + this.homeTeamId + ', "uid":' + this.uid + ',"targetId":' + targetId + '}'
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            item.supportNumber++
            this.voteTotalA++
            this.loadMvpInfoForTeam()
            this.$store.commit('showToast', '投票成功')
          } else {
            this.$store.commit('showToast', res.data.errMsg)
            this.loadMvpInfoForTeam()
          }
        }).catch(err => {
          console.log(err)
        })
      },
      voteForPlayerB (item) {
        if (!this.uid) {
          if (this.getQueryString('fromApp')) {
            let sendData = {
              type: 'goLogin'
            }
            if (this.$sendDataToClient(sendData)) {
              return
            }
          }
          this.$store.commit('showLogin')
          return false
        }
        let targetId = item.uid
        let url = `${this.apiAddress}/api/match/voteForMvpOfMatch.php`
        let param = {
          json: '{"matchId":"' + this.matchId + '","teamId":' + this.awayTeamId + ', "uid":' + this.uid + ',"targetId":' + targetId + '}'
        }
        this.$axios.post(url, param).then(res => {
          console.log(res)
          if (res.data.status === 'success') {
            item.supportNumber++
            this.voteTotalB++
            this.loadMvpInfoForTeam()
            this.$store.commit('showToast', '投票成功')
          } else {
            this.$store.commit('showToast', res.data.errMsg)
            this.loadMvpInfoForTeam()
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadMvpInfoForTeam () {    // MVP评选列表
        let url = `${this.apiAddress}/api/match/loadMvpInfoForTeam.php`
        let teamId = this.teamId || 0
        let param = {
          json: '{"uid":"' + this.uid + '","matchId":' + this.matchId + ',"teamId":' + teamId + '}'
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.playerList = res.data.returndata
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
