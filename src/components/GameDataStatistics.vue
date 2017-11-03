<!-- 协会赛事数据统计 GameDataStatistics.vue -->
<style lang="less" scoped>
  .game-statistics {
    font-size: .3rem;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: .7rem;
    background: #f0f0f0;
    .data-container {
      position: absolute;
      top: .7rem;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      .game-info {
        height: 2rem;
        padding: .3rem .2rem;
        display: flex;
        background: #fff;
        .game-portrait {
          flex: 0 0 1.4rem;
          height: 1.4rem;
          margin-right: .2rem;
        }
        .game-desc {
          position: relative;
          flex: 1;
          font-size: .3rem;
          color: #282828;
          .game-name {
            line-height: .4rem;
            height: .8rem;
            overflow: hidden;
            .game-status {
              display: inline-block;
              padding: 0 .08rem;
              margin-right: .1rem;
              font-size: .22rem;
              background: #5e81be;
              color: #fff;
              border-radius: 3px;
            }
          }
          .change-game {
            position: absolute;
            right: 0;
            bottom: 0;
            color: #32b847;
            border: 1px solid #32b847;
            border-radius: 3px;
            padding: .1rem;
          }
        }
      }
      .game-data {
        position: absolute;
        top: 2rem;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        text-align: center;
        background: #f0f0f0;
        margin-top: .1rem;
        .data-list-head {
          position: relative;
          background: #fff;
          height: .5rem;
          line-height: .5rem;
          font-size: .22rem;
          color: #282828;
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
        }
        .data-list {
          background: #fff;
          .data-item {
            position: relative;
            height: 1rem;
            line-height: 1rem;
            color: #505050;
            font-size: .22rem;
            &:last-child {
              background: #f0f0f0;
              height: .6rem;
              line-height: .6rem;
            }
            &.count {
              background: #f0f0f0;
              color: #282828;
              font-size: .24rem;
            }
            &::after {
              content: '';
              display: block;
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 1px;
              background: #f0f0f0;
              transform: scaleY(0.5);
            }
          }
        }
      }
    }
    .select-popup {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.3);
      z-index: 20;
      .select-container {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        margin: auto;
        width: 6.6rem;
        background: #fff;
        padding: .05rem 0;
        overflow: hidden;
        transform: translateY(-50%);
        .close-select-popup {
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
        .select-list {
          max-height: 8.6rem;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
          .select-item {
            position: relative;
            height: 1.2rem;
            display: flex;
            padding: .2rem;
            &.active {
              color: #32b847;
            }
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
            .game-portrait {
              flex: 0 0 .8rem;
              height: .8rem;
              margin-right: .1rem;
            }
            .game-info {
              flex: 1;
              position: relative;
              overflow: hidden;
              height: .8rem;
              .game-name {
                font-size: .24rem;
                line-height: .4rem;
              }
              .game-desc {
                position: absolute;
                bottom: 0;
                font-size: .2rem;
                color: #646464;
                white-space: pre;
              }
            }
          }
        }
      }
    }
  }
  .slidein-enter-active, .slidein-leave-active {
    transition: all .2s
  }
  .slidein-enter, .slidein-leave-active {
    opacity: 0.5;
  }
</style>

<template>
  <div class="game-statistics">
    <div class="data-container">
      <div class="game-info">
        <div class="game-portrait">
          <img class="_fullimg" :src="gameInfo.portrait" alt="">
        </div>
        <div class="game-desc">
          <p class="game-name"><span class="game-status" :style="{background: getGameStatus.color}" v-show="!isFriendly">{{getGameStatus.text}}</span>{{gameInfo.gameName || '友谊赛'}}</p>
          <div class="change-game" @click="showSelect=true">切换赛事</div>
        </div>
      </div>
      <div class="game-data" v-if="isFriendly">
        <!-- <ul class="data-list-head _clearfix">
          <li class="_left _width25">日期</li>
          <li class="_left _width25">球队</li>
          <li class="_left _width25">比分</li>
          <li class="_left _width25">球队</li>
        </ul>
        <ul class="data-list">
          <li class="data-item _clearfix">
            <div class="_left _width25">2017-8-8</div>
            <div class="_left _width25">第一只球队</div>
            <div class="_left _width25">2：3</div>
            <div class="_left _width25">第二只球队</div>
          </li>
        </ul> -->
        <div class="border-bottom"
             style="background:#fff;" 
             v-for="item in friendlyDataList">
          <match-against :matchInfo="item"></match-against>
        </div>
      </div>
      <div class="game-data" v-else>
        <ul class="data-list-head _clearfix">
          <li class="_left _width25">轮次</li>
          <li class="_left _width25">场次</li>
          <li class="_left _width25">进球</li>
          <li class="_left _width25">场均进球</li>
        </ul>
        <ul class="data-list" v-for="list in gameDataList">
          <li class="data-item _clearfix" v-for="item in list">
            <div class="_left _width25">{{item.turns}}</div>
            <div class="_left _width25">{{item.totalSession}}</div>
            <div class="_left _width25">{{item.totalScore}}</div>
            <div class="_left _width25">{{item.averageScore}}</div>
          </li>
        </ul>
      </div>
    </div>
    <transition name="slidein">
      <div class="select-popup" v-show="showSelect" @click="showSelect=false" @touchmove.stop>
        <div class="select-container">
          <i class="close-select-popup" @click="showSelect=false"></i>
          <ul class="select-list">
            <li class="select-item _ellipsis" :class="{active: activeItem === index}" v-for="(item, index) in gameList" @click="changeGames(item.gameId, index)">
              <div class="game-portrait">
                <img class="_fullimg" :src="item.portrait" alt="">
              </div>
              <div class="game-info">
                <p class="game-name _ellipsis">{{index===0 ? '友谊赛' : item.gameName}}</p>
                <p class="game-desc">总场次: {{item.totalMatches}}   总进球: {{item.totalScore}}   场均进球: {{item.averageScore}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import MatchAgainst from '@/components/common/MatchAgainst'

  export default {
    name: 'GameDataStatistics',
    data () {
      return {
        associationId: this.getQueryString('associationId') || 289,
        gameId: this.getQueryString('gameId'),
        isFriendly: this.getQueryString('isFriendly'),
        showSelect: false,
        activeItem: 0,    // 选中的赛事
        gameInfo: '',
        gameList: '',    // 赛事列表
        friendlyDataList: '',   // 友谊赛数据
        gameDataList: ''    // 赛事数据
      }
    },
    computed: {
      apiAddress () {
        return this.$store.state.apiAddress
      },
      getGameStatus () {    // 计算赛事状态，返回颜色和文字
        let now = new Date()
        let startTime = new Date(this.gameInfo.startTime)
        let endTime = new Date(this.gameInfo.endTime)
        if (now < startTime) {
          return {
            color: '#66d993',
            text: '未开始'
          }
        } else if (now > endTime) {
          return {
            color: '#c8c8c8',
            text: '已结束'
          }
        } else {
          return {
            color: '#5e81be',
            text: '进行中'
          }
        }
      }
    },
    mounted () {
      document.documentElement.style.height = document.body.style.height = '100%'
      document.querySelector('#app').style.height = '100%'
      document.title = '赛事数据统计'
      this.loadAssociationGameList()
      if (this.isFriendly === 'true') {
        this.loadFriendlyMatchInfo()
      } else {
        this.loadGameDataStatisticsList()
      }
    },
    methods: {
      loadAssociationGameList () {    // 获取协会赛事列表
        this.$store.commit('setLoading', true)
        let url = `${this.apiAddress}/api/team/gameManagement/loadAssociationGameList.php`
        let param = {
          json: `{"associationId":"${this.associationId}","fetchAll":"1","sign":"","token":"","uid":"250","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.gameList = res.data.returndata
            let index = -1
            this.gameList.forEach((item, i) => {
              if (+item.gameId === +this.gameId && item.gameId !== '') {
                index = i
              }
            })
            if (index > -1) {
              this.gameInfo = this.gameList[index]
              this.$store.commit('setWxShareTitle', this.gameInfo.gameName)
              this.activeItem = index
              this.isFriendly = false
            } else {
              this.gameInfo = res.data.returndata[0]
              this.$store.commit('setWxShareTitle', '友谊赛')
              this.activeItem = 0
              this.isFriendly = true
            }
            this.$store.commit('setWxShareDesc', '进球数、场均进球、赛事总进球数据统计')
            this.$store.commit('setWxShareImgUrl', this.gameInfo.portrait)
            this.$store.commit('setLoading', false)
          } else {
            this.$store.commit('setLoading', false)
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          this.$store.commit('setLoading', false)
          console.log(err)
        })
      },
      changeGames (id, index) {
        if (+this.gameId === +id) {   // 点击一样的赛事，不重新加载数据
          return
        }
        this.activeItem = index
        if (id) {
          this.isFriendly = false
          this.gameId = id
          this.gameInfo = this.gameList[index]
          this.loadGameDataStatisticsList()
        } else {
          this.isFriendly = true
          this.gameId = ''
          this.gameInfo = this.gameList[0]
          this.loadFriendlyMatchInfo()
        }
      },
      loadFriendlyMatchInfo () {    // 获取协会友谊赛数据
        let url = `${this.apiAddress}/api/association/loadFriendlyMatchInfo.php`
        let param = {
          json: `{"associationId":"${this.associationId}","sign":"","token":"","uid":"250","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.friendlyDataList = res.data.returndata.map(match => {
              return {
                matchId: match.matchId,
                homeIcon: match.teamPortraitA,
                awayIcon: match.teamPortraitB,
                homeName: match.teamNameA,
                awayName: match.teamNameB,
                // homeCoat: match.homeUniform.coatColor ? match.homeUniform.coatColor.replace(/0x/, '#') : '',
                // homePant: match.homeUniform.pantsColor ? match.homeUniform.pantsColor.replace(/0x/, '#') : '',
                // homeSock: match.homeUniform.socksColor ? match.homeUniform.socksColor.replace(/0x/, '#') : '',
                // awayCoat: match.awayUniform.coatColor ? match.awayUniform.coatColor.replace(/0x/, '#') : '',
                // awayPant: match.awayUniform.pantsColor ? match.awayUniform.pantsColor.replace(/0x/, '#') : '',
                // awaySock: match.awayUniform.socksColor ? match.awayUniform.socksColor.replace(/0x/, '#') : '',
                homeScore: match.scoreA,
                awayScore: match.scoreB,
                matchTime: match.matchTime ? match.matchTime.replace(/:\d+$/, '') : '未知',
                courtName: match.courtName || '未知'
              }
            })
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadGameDataStatisticsList () {   // 获取协会赛事数据
        let url = `${this.apiAddress}/api/team/gameManagement/loadGameDataStatisticsList.php`
        let param = {
          json: `{"uid":250,"gameId":${this.gameId}}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.gameDataList = res.data.returndata
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    components: { MatchAgainst }
  }
</script>
