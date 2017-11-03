<!-- gameVote.vue 赛事评选 -->
<style lang="less" scoped>
  .game-vote {
    max-width: 750px;
    margin: 0 auto;
    .honor-info {
      color: #282828;
      text-align: center;
      .honor-img {
        position: relative;
        margin: .5rem auto .2rem;
        width: 2.4rem;
        height: 2.4rem;
        .background {
          position: absolute;
          left: -.5rem;
          right: -.5rem;
          top: -.5rem;
          bottom: -.5rem;
          background: url(http://share.greenplayer.cn/share/img/honor-bg.png);
          background-size: 100%;
          background-repeat: no-repeat;
          z-index: -1;
        }
      }
      .honor-match {
        font-size: .28rem;
        padding: 0 1rem .2rem;
        line-height: .4rem;
      }
      .honor-name {
        font-size: .3rem;
        padding: .2rem 1rem;
      }
      .deadline {
        font-size: .24rem;
        color: #000;
      }
      .note {
        color: #646464;
        font-size: .22rem;
        padding: .2rem .5rem 0;
        // text-align: left;
      }
    }
    .vote-info {
      height: .6rem;
      background: #f0f0f0;
      font-size: .28rem;
      padding: 0 .2rem;
      margin-top: .2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .show-data {
        display: flex;
        align-items: center;
        font-size: .22rem;
      }
      .select-btn {
        width: .8rem;
        height: .4rem;
        background: #fff;
        border-radius: .2rem;
        box-shadow: 0 0 1px #a0a0a0;
        transition: all .1s;
        margin-left: .1rem;
        .select-ball {
          width: .4rem;
          height: .4rem;
          border-radius: .2rem;
          box-shadow: 0 0 1px #a0a0a0;
          background: #fff;
          transition: all .1s;
        }
      }
    }
    .vote-list {
      font-size: .3rem;
      color: #282828;
      .vote-item {
        position: relative;
        padding: .2rem;
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
        .item-info {
          position: relative;
          display: flex;
          .portrait {
            flex: 0 0 .9rem;
            height: .9rem;
            margin-right: .2rem;
          }
          .detail {
            position: relative;
            flex: 1;
            .name {
              position: absolute;
              left: 0;
              top: 0;
              line-height: .44rem;
              max-width: 4.6rem;
            }
            .proportion {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 4.6rem;
              height: .2rem;
              border-radius: .1rem;
              background: #f0f0f0;
              .proportion-inner {
                width: 0;
                height: 100%;
                transition: all .2s;
                background: #32b847;
                border-radius: .1rem;
              }
            }
            .vote-btn {
              position: absolute;
              right: 0;
              top: 0;
              width: 1rem;
              height: .44rem;
              line-height: .44rem;
              text-align: center;
              background: #32b847;
              color: #fff;
              border-radius: 3px;
              &.disable {
                background: #a0a0a0;
              }
            }
            .number {
              position: absolute;
              right: 0;
              bottom: 0;
              font-size: .22rem;
            }
          }
        }
        .game-data {
          padding-top: .3rem;
          .rel-data {
            margin-bottom: .3rem;
          }
          .description {
            margin-bottom: .3rem;
            .text {
              text-indent: .4rem;
              line-height: .4rem;
            }
            .rel-image {
              margin-top: .2rem;
              .image-container {
                float: left;
                width: 1.5rem;
                height: 1.5rem;
                margin-right: .35rem;
                margin-bottom: .2rem;
                &:nth-child(4n) {
                  margin-right: 0;
                }
              }
            }
          }
          .data-detail {
            display: flex;
            text-align: center;
          }
          .data-item {
            flex: 1;
            max-width: 25%;
            position: relative;
            &::after {
              content: '';
              display: block;
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              width: 1px;
              background: #a0a0a0;
              transform: scaleX(0.5);
            }
            &:last-child::after {
              width: 0;
            }
            .title {
              line-height: .5rem;
            }
            .data {
              line-height: .5rem;
            }
          }
        }
      }
    }
  }
  .scaledown-enter-active, .scaledown-leave-active {
    transition: transform .2s;
    transform-origin: 0 0;
  }
  .scaledown-enter, .scaledown-leave-active {
    transform: scaleY(0);
    transform-origin: 0 0;
  }
</style>

<template>
  <div class="game-vote">
    <div class="honor-info">
      <div class="honor-img">
        <div class="background"></div>
        <img class="_fullimg" :src="voteInfo.voteIcon" alt="">
      </div>
      <div class="honor-name">{{voteInfo.voteName}}</div>
      <div class="honor-match">{{voteInfo.gamename}}</div>
      <div class="deadline">(截止日期：{{getDeadline}})</div>
      <div class="note">{{voteInfo.note}}</div>
    </div>
    <div class="vote-info">
      <div class="desc">{{+voteInfo.voteType === 1?'候选球员':'候选球队'}}：{{waitingList.length}}{{+voteInfo.voteType === 1?'人':'支'}}</div>
      <div class="show-data">
        <p>{{+voteInfo.voteType === 1?'球员赛事数据':'球队赛事数据'}}</p>
        <div class="select-btn" @click="showRelData=!showRelData" :style="{background: showRelData ? '#32b847' : '#fff'}">
          <div class="select-ball" :style="{transform: showRelData ? 'translateX(100%)' : 'translateX(0)'}"></div>
        </div>
      </div>
    </div>
    <!-- votetype=1 球员 -->
    <ul class="vote-list" v-if="+voteInfo.voteType === 1">
      <li class="vote-item" v-for="item in waitingList">
        <!-- 参评球队球员基本信息及投票信息 -->
        <div class="item-info">
          <div class="portrait">
            <img class="_fullimg _border-radius50" :src="item.playerPortrait" alt="">
          </div>
          <div class="detail">
            <div class="name _ellipsis">{{item.playerName}}</div>
            <div class="proportion">
              <div class="proportion-inner" :style="{width: (item.voteNumber/totalVote*100)+'%'}"></div>
            </div>
            <div class="vote-btn" :class="{disable: +item.isVote===1 || hasOverdue}" @click.stop="voteThis(item)">{{+item.isVote===0?'投票':'已投'}}</div>
            <div class="number">({{item.voteNumber}}票)</div>
          </div>
        </div>
        <!-- 相关数据，控制显示，默认隐藏 -->
        <transition name="">
          <div class="game-data" v-show="showRelData">
            <div class="rel-data">相关数据：</div>
            <div class="description" v-show="false">
              <div class="text">666</div>
              <div class="rel-image _clearfix">
                <div class="image-container">
                  <img class="_fullimg" src="http://img0.imgtn.bdimg.com/it/u=2193266985,2492889133&fm=200&gp=0.jpg" alt="">
                </div>
              </div>
            </div>
            <div class="data-detail">
              <div class="data-item">
                <p class="title _ellipsis">场次</p>
                <p class="data">{{item.matches}}</p>
              </div>
              <div class="data-item">
                <p class="title _ellipsis">进球</p>
                <p class="data">{{item.totalScore || 0}}</p>
              </div>
              <div class="data-item">
                <p class="title _ellipsis">助攻</p>
                <p class="data">{{item.assist || 0}}</p>
              </div>
              <div class="data-item">
                <p class="title _ellipsis">红/黄牌</p>
                <p class="data">{{item.redCardNum || 0}}/{{item.yellowCardNum || 0}}</p>
              </div>
            </div>
          </div>
        </transition>
      </li>
    </ul>
    <!-- votetype=2 球队 -->
    <ul class="vote-list" v-else>
      <li class="vote-item" v-for="item in waitingList">
        <!-- 参评球队球员基本信息及投票信息 -->
        <div class="item-info">
          <div class="portrait">
            <img class="_fullimg" :src="item.teamPortrait" alt="">
          </div>
          <div class="detail">
            <div class="name _ellipsis">{{item.teamName}}</div>
            <div class="proportion">
              <div class="proportion-inner" :style="{width: (item.voteNumber/totalVote*100)+'%'}"></div>
            </div>
            <div class="vote-btn" :class="{disable: +item.isVote===1 || hasOverdue}" @click.stop="voteThis(item)">{{+item.isVote===0?'投票':'已投'}}</div>
            <div class="number">({{item.voteNumber}}票)</div>
          </div>
        </div>
        <!-- 相关数据，控制显示，默认隐藏 -->
        <transition name="">
          <div class="game-data" v-show="showRelData">
            <div class="rel-data">相关数据：</div>
            <div class="description" v-show="false">
              <div class="text">666</div>
              <div class="rel-image _clearfix">
                <div class="image-container">
                  <img class="_fullimg" src="http://img0.imgtn.bdimg.com/it/u=2193266985,2492889133&fm=200&gp=0.jpg" alt="">
                </div>
              </div>
            </div>
            <div class="data-detail">
              <div class="data-item">
                <p class="title _ellipsis">排名</p>
                <p class="data">{{item.rank}}</p>
              </div>
              <div class="data-item">
                <p class="title _ellipsis">积分</p>
                <p class="data">{{item.credit}}</p>
              </div>
              <div class="data-item">
                <p class="title _ellipsis">进/失球</p>
                <p class="data">{{item.totalScore || 0}}/{{item.totalLose || 0}}</p>
              </div>
              <div class="data-item">
                <p class="title _ellipsis">红/黄牌</p>
                <p class="data">{{item.redCardNum || 0}}/{{item.yellowCardNum || 0}}</p>
              </div>
            </div>
          </div>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'gameVote',
    data () {
      return {
        showRelData: true,
        voteId: this.getQueryString('voteId'),
        fromApp: this.getQueryString('fromApp'),
        voteInfo: '',
        waitingList: []
      }
    },
    computed: {
      uid () {
        return this.getQueryString('uid') || this.$store.state.uid
      },
      apiAddress () {
        return this.$store.state.apiAddress
      },
      totalVote () {
        return this.waitingList.reduce((pre, item) => +item.voteNumber + pre, 0)
      },
      userHasVote () {
        let isVote = this.waitingList.filter(item => {
          return +item.isVote === 1
        })
        return isVote.length > 0
      },
      getDeadline () {
        return this.voteInfo.deadline ? this.voteInfo.deadline.replace(/:\d+$/, '') : '未知'
      },
      hasOverdue () {
        let now = new Date()
        let deadline = new Date(this.voteInfo.deadline.replace(/-/g, '/'))
        return now > deadline
      }
    },
    mounted () {
      document.title = '赛事评选'
      this.getVoteInfoById()
      if (this.fromApp === 'true') {
        this.loginInApp()
      } else {
        this.$store.commit('setUserList', true)
      }
      let sendData = {
        type: 'showShareButton',
        show: 1
      }
      this.$sendDataToClient(sendData)
    },
    watch: {
      uid (val, oldVal) {
        this.getVoteInfoById()
      }
    },
    methods: {
      loginInApp () {   // app内的用户登录
        let uid = this.getQueryString('uid')
        let token = this.getQueryString('token')
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
            } else {
              this.$store.commit('showToast', data.errMsg)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      getVoteInfoById () {    // 获取评选信息
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"game_common_getVoteInfoById","voteId":${this.voteId},"uid":${this.uid}}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.voteInfo = res.data.returndata.voteInfo
            this.waitingList = res.data.returndata.waitingList
            this.$store.commit('setWxShareTitle', `赛事评选--${this.voteInfo.voteName}`)
            this.$store.commit('setWxShareDesc', `${this.voteInfo.gamename}发起了评选，快来参与吧~~`)
            this.$store.commit('setWxShareImgUrl', this.voteInfo.voteIcon)
            // 设置APP内的分享
            window.shareConfig.title = `赛事评选--${this.voteInfo.voteName}`
            window.shareConfig.imgUrl = this.voteInfo.voteIcon
            window.shareConfig.desc = `${this.voteInfo.gamename}发起了评选，快来参与吧~~`
            window.shareConfig.url = `http://share.greenplayer.cn/share/green/#/gamevote?voteId=${this.voteId}`
          } else {
            // this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      voteThis (item) {
        if (this.hasOverdue) {
          this.$store.commit('showToast', `已经过了截止日期~~`)
          return
        }
        // if (this.userHasVote) {
        //   this.$store.commit('showToast', `每人只有一票，你已投过票了~~`)
        //   return
        // }
        if (+item.isVote === 1) {   // 已投过票
          this.$store.commit('showToast', `你已为该${+this.voteInfo.voteType === 1 ? '球员' : '球队'}投过票了`)
          return
        }
        if (this.fromApp && this.uid) {
          this.gameSelectionVote(item.voteItemId)
        } else if (!this.uid) {
          this.$store.commit('showLogin')
        } else {
          this.gameSelectionVote(item.voteItemId)
        }
      },
      gameSelectionVote (itemId) {
        if (!itemId) {
          this.$store.commit('showToast', '选择出错了')
          return
        }
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"game_common_gameSelectionVote","voteItemId":${itemId},"uid":${this.uid}}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.$store.commit('showToast', '投票成功，谢谢参与')
            this.getVoteInfoById()
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
