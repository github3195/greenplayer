<!-- 球队考勤 -->
<style lang="less" scoped>
  .team-info {
    position: relative;
    display: flex;
    align-items: center;
    height: 1.5rem;
    padding: .2rem .3rem;
    .team-portrait {
      flex: 0 0 1.1rem;
      height: 1.1rem;
      margin-right: .2rem;
    }
    .team-name {
      font-size: .32rem;
      color: #282828;
      max-height: 1.1rem;
      overflow: hidden;
    }
  }
  .attend-container {
    text-align: center;
    color: #282828;
    .select-times {
      position: relative;
      font-size: 0;
      height: .7rem;
      line-height: .7rem;
      .select-text {
        font-size: .28rem;
      }
      .drop-down-icon {
        width: .2rem;
        height: .15rem;
        margin-left: .1rem;
        margin-bottom: .02rem;
      }
      .drop-container {
        position: absolute;
        top: 100%;
        left: 2.8rem;
        right: 2.8rem;
        z-index: 10;
        .top-angle {
          margin: 0 auto;
          width: .25rem;
          height: .25rem;
          background: #fff;
          box-shadow: 0 0 2px #999;
          transform: rotate(45deg);
        }
        .drop-list {
          position: absolute;
          top: .15rem;
          width: 100%;
          background: #fff;
          color: #282828;
          font-size: .24rem;
          border-radius: 5px;
          box-shadow: 0 0 2px #999;
          li.active {
            color: #32b847;
            background: #f5f5f5;
          }
        }
      }
    }
    .attend-list {
      font-size: .24rem;
      li {
        overflow: hidden;
        .width1 {
          width: 10%;
        }
        .width2 {
          width: 30%;
        }
        .width3 {
          width: 15%;
        }
      }
      .attend-list-header {
        font-size: .22rem;
        height: .5rem;
        line-height: .5rem;
      }
      .attend-list-item {
        height: .9rem;
        line-height: .9rem;
        // &:nth-child(2) .rank { color: #32b847; font-style: italic; }
        // &:nth-child(3) .rank { color: #32b847; font-style: italic; }
        // &:nth-child(4) .rank { color: #32b847; font-style: italic; }
        .player-info {
          font-size: 0;
          display: flex;
          align-items: center;
          height: 100%;
          .player-portrait {
            flex: 0 0 .5rem;
            height: .5rem;
            margin-right: .1rem;
          }
          .player-name {
            font-size: .24rem;
          }
        }
      }
    }
  }
  .scaledown-enter-active, .scaledown-leave {
    transition: transform .1s;
    transform: scaleY(1);
    transform-origin: 0 0;
  }
  .scaledown-enter, .scaledown-leave-active {
    transition: transform .1s;
    transform: scaleY(0);
    transform-origin: 0 0;
  }
</style>

<template>
  <div class="team-attend" @click="dropListShow=false" @touchstart="dropListShow=false">
    <div class="team-info border-bottom">
      <div class="team-portrait">
        <img class="_fullimg" :src="teamPortrait" alt="">
      </div>
      <div class="team-name">{{teamName}}</div>
    </div>
    <div class="attend-container">
      <div class="select-times border-bottom" @click.stop="dropListShow=!dropListShow" @touchstart.stop>
        <span class="select-text">{{selectText}}</span>
        <img class="drop-down-icon" src="http://share.greenplayer.cn/share/img/icon/content_icon_zhanjixiala_off@3x.png" alt="">
        <transition name="scaledown">
          <div class="drop-container" v-show="dropListShow" @click.stop>
            <div class="top-angle"></div>
            <ul class="drop-list">
              <li :class="{active: selectItem === 0}" @click="setStartTime(0)">全部</li>
              <li :class="{active: selectItem === 1}" @click="setStartTime(1)">最近一个月</li>
              <li :class="{active: selectItem === 2}" @click="setStartTime(2)">最近三个月</li>
              <li :class="{active: selectItem === 3}" @click="setStartTime(3)">最近 一 年</li>
            </ul>
          </div>
        </transition>
      </div>
      <ul class="attend-list">
        <li class="attend-list-header border-bottom">
          <div class="_left _ellipsis width1">排名</div>
          <div class="_left _ellipsis width2">球员</div>
          <div class="_left _ellipsis width3">应到/次</div>
          <div class="_left _ellipsis width3">报名/次</div>
          <div class="_left _ellipsis width3">实到/次</div>
          <div class="_left _ellipsis width3">出勤率</div>
        </li>
        <li class="attend-list-item border-bottom" v-for="(item, index) in attendList">
          <div class="_left width1 rank _ellipsis">{{item.rank}}</div>
          <div class="_left width2 player-info _ellipsis">
            <div class="player-portrait">
              <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
            </div>
            <div class="player-name _ellipsis">{{item.name}}</div>
          </div>
          <div class="_left width3 data _ellipsis">{{item.shouldAttentNum}}</div>
          <div class="_left width3 data _ellipsis">{{item.signUpNum}}</div>
          <div class="_left width3 data _ellipsis">{{item.realAttentNum}}</div>
          <div class="_left width3 data _ellipsis">{{item.attentRate}}%</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TeamAttend',
    data () {
      return {
        teamId: this.getQueryString('teamId'),
        teamPortrait: '',
        teamName: '',
        attendType: this.getQueryString('attendType') || 0,   // 0 比赛   1 训练
        startTime: '',
        endTime: '',
        selectText: '全部',
        selectItem: 0,
        attendList: [],
        dropListShow: false
      }
    },
    computed: {
      apiAddress () {
        return this.$store.state.apiAddress
      }
    },
    mounted () {
      this.$store.commit('setLoading', true)
      this.getBasicInfoById()
      this.getTeamPlayerAttendInfo()
    },
    methods: {
      getBasicInfoById () {
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"common_share_getBasicInfoById","targetId":${this.teamId},"type":3}`
        }
        this.$axios.post(url, param).then(res => {
          this.teamName = res.data.returndata.name
          this.teamPortrait = res.data.returndata.portrait
          document.title = `${+this.attendType === 0 ? '比赛' : '训练'}考勤记录`
          this.$store.commit('setWxShareTitle', `${this.teamName}${+this.attendType === 0 ? '比赛' : '训练'}考勤表`)
          this.$store.commit('setWxShareDesc', '有兄弟，踢个球！\n无兄弟，踢个球？')
          this.$store.commit('setWxShareImgUrl', this.teamPortrait)
        }).catch(err => {
          console.log(err)
        })
      },
      getTeamPlayerAttendInfo () {
        this.$store.commit('setLoading', true)
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"team_member_getTeamPlayerAttendInfo","uid":258,"teamId":${this.teamId},"attendType":${this.attendType},"startTime":"${this.startTime}","endTime":"${this.endTime}"}`
        }
        this.$axios.post(url, param).then(res => {
          this.$store.commit('setLoading', false)   // 隐藏加载动画
          if (res.data.status === 'success') {
            this.attendList = res.data.returndata
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      setStartTime (type) {
        this.dropListShow = false
        let now = new Date()
        this.endTime = this.formatDate(now)
        if (type === 0) {
          this.selectItem = 0
          this.selectText = '全部'
          this.startTime = ''
          this.getTeamPlayerAttendInfo()
        } else if (type === 1) {
          this.selectItem = 1
          this.selectText = '最近一个月'
          let start = new Date(now - 30 * 24 * 3600 * 1000)
          this.startTime = this.formatDate(start)
          this.getTeamPlayerAttendInfo()
        } else if (type === 2) {
          this.selectItem = 2
          this.selectText = '最近三个月'
          let start = new Date(now - 90 * 24 * 3600 * 1000)
          this.startTime = this.formatDate(start)
          this.getTeamPlayerAttendInfo()
        } else if (type === 3) {
          this.selectItem = 3
          this.selectText = '最近一年'
          let start = new Date(now - 365 * 24 * 3600 * 1000)
          this.startTime = this.formatDate(start)
          this.getTeamPlayerAttendInfo()
        } else {
          this.startTime = ''
        }
      },
      formatDate (d) {
        if (d instanceof Date) {
          let yy = d.getFullYear()
          let mo = d.getMonth() + 1
          let dd = d.getDate()
          let hh = d.getHours()
          let mi = d.getMinutes()
          let ss = d.getSeconds() > 10 ? d.getSeconds() : `0${d.getSeconds()}`
          return `${yy}-${mo}-${dd} ${hh}:${mi}:${ss}`
        }
        return null
      }
    }
  }
</script>
