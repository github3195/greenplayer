<!-- 赛事数据榜单 GameDataList.vue -->
<style lang="less" scoped>
  .game-data-container {
    position: relative;
    overflow: hidden;
    height: 100%;
    .game-data-nav {
      padding: .05rem .4rem .1rem;
      background: #f0f0f0;
      .nav-list {
        position: relative;
        display: flex;
        justify-content: center; 
        &::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: -1px;
          height: 1px;
          background: #646464;
          transform: scaleY(0.5);
        }
        &::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
          height: 1px;
          background: #646464;
          transform: scaleY(0.5);
        }
        .nav-item {
          position: relative;
          flex: 1;
          text-align: center;
          height: .5rem;
          line-height: .5rem;
          font-size: .26rem;
          color: #646464;
          z-index: 1;
          &.active {
            background: #fff;
            color: #32b847;
          }
          &::after {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 1px;
            background: #646464;
            transform: scaleX(0.5);
          }
          &:last-child::before {
            content: '';
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 1px;
            background: #646464;
            transform: scaleX(0.5);
          }
        }
      }
    }
    .data-list-container {
      position: absolute;
      top: .6rem;
      bottom: 0;
      left: 0;
      right: 0;
      .list-group {
        height: 100%;
        .list-page {
          height: 100%;
        }
      }
    }
  }
</style>

<template>
  <div class="game-data-container">
    <div class="game-data-nav">
      <ul class="nav-list">
        <li class="nav-item" :class="{active: nav === 4}" @click="changeNav(4)" v-if="showCredit">赛程</li>
        <li class="nav-item" :class="{active: nav === 0}" @click="changeNav(0)">积分榜</li>
        <li class="nav-item" :class="{active: nav === 1}" @click="changeNav(1)">射手榜</li>
        <li class="nav-item" :class="{active: nav === 2}" @click="changeNav(2)">助攻榜</li>
        <li class="nav-item" :class="{active: nav === 3}" @click="changeNav(3)">纪律</li>
      </ul>
    </div>
    <div class="data-list-container">
      <div class="list-group">
        <div class="list-page" v-show="nav===0">
          <score-board-list :datalist="scoreBoard"
                            :gameRanking="gameRanking"
                            :gameBasicInfo="gameBasicInfo"
                            :scrollable="scrollable"></score-board-list>
        </div>
        <div class="list-page" v-show="nav===1">
          <game-data-rank-list :datalist="shooterList"
                               :rankType="1"
                               :scrollable="scrollable"></game-data-rank-list>
        </div>
        <div class="list-page" v-show="nav===2">
          <game-data-rank-list :datalist="assistList"
                               :rankType="3"
                               :scrollable="scrollable"></game-data-rank-list>
        </div>
        <div class="list-page" v-show="nav===3">
          <punish-rank-list :datalist="punishList"
                            :scrollable="scrollable"></punish-rank-list>
        </div>
        <div class="list-page" v-show="nav===4" v-if="showCredit">
          <schedule-list :loaded="loadSchedule"
                         :scrollable="scrollable"></schedule-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ScoreBoardList from './ScoreBoardList'   // 积分榜
  import GameDataRankList from './GameDataRankList'   // 射手榜、助攻榜
  import PunishRankList from './PunishRankList'   // 红黄牌榜
  import ScheduleList from './ScheduleList'   // 赛程

  export default {
    data () {
      return {
        nav: 0,
        gameId: this.getQueryString('gameId'),
        scoreBoard: '',    // 积分榜
        gameRanking: '',    // 赛事排名
        shooterList: '',    // 射手榜
        assistList: '',   // 助攻榜
        punishList: '',    // 红黄牌榜
        loadSchedule: false
      }
    },
    props: {
      loaded: false,
      showCredit: false,
      gameBasicInfo: '',
      scrollable: ''
    },
    computed: {
      apiAddress () {
        return this.$store.state.apiAddress
      },
      uid () {
        return this.getQueryString('uid') || this.$store.state.uid
      }
    },
    watch: {
      loaded (val, oldVal) {
        if (val) {
          this.$store.commit('setLoading', true)
          this.getGroupMatchRank()
        }
      }
    },
    mounted () {
      if (this.showCredit) {
        this.nav = 4
        this.loadSchedule = true
      }
    },
    methods: {
      changeNav (i) {
        this.nav = i
        if (i === 0 && this.scoreBoard === '') {
          this.$store.commit('setLoading', true)
          this.getGroupMatchRank()
          if (+this.gameBasicInfo.gametype === 3) {
            this.loadGameRanking()
          }
        } else if (i === 1 && this.shooterList === '') {
          this.$store.commit('setLoading', true)
          this.loadGameScoreRankList(1)
        } else if (i === 2 && this.assistList === '') {
          this.$store.commit('setLoading', true)
          this.loadGameScoreRankList(3)
        } else if (i === 3 && this.punishList === '') {
          this.$store.commit('setLoading', true)
          this.loadGamePunishRankList()
        } else if (i === 4 && this.loadSchedule === false) {
          this.loadSchedule = true
        }
      },
      getGroupMatchRank () {    // 加载积分榜数据
        let url = `${this.apiAddress}/api/game/getGroupMatchRank.php?gameId=${this.gameId}`
        this.$axios.get(url).then(res => {
          if (res.data.status === 'success') {
            let data = []
            res.data.returndata.forEach(item => {
              if (item.teamId) {            // 不分组的积分榜
                if (data.length < 1) {
                  data.push({
                    group: '',
                    list: res.data.returndata
                  })
                }
              } else if (!item.teamId) {    // 分组的积分榜
                let groupName = ''
                for (let prop in item) {
                  groupName = prop
                  break
                }
                if (!groupName) {
                  return
                }
                data.push({
                  group: groupName ? `${groupName}组` : '',
                  list: item[groupName]
                })
              }
            })
            this.scoreBoard = data
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.$store.commit('setLoading', false)
        }).catch(err => {
          console.log(err)
          this.$store.commit('setLoading', false)
        })
      },
      loadGameRanking () {
        let url = `${this.apiAddress}/api/game/loadGameRanking.php`
        let param = {
          json: `{"gameId":"${this.gameId}","uid":"${this.uid || 127}","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.gameRanking = res.data.returndata
          }
        })
      },
      loadGameScoreRankList (rankType) {    // 加载射手助攻榜，rankType=1是射手 =3是助攻
        let url = `${this.apiAddress}/api/game/loadGameScoreRankList.php`
        let param = {
          json: `{"gameId":"${this.gameId}","rankType":"${rankType}","sign":"","token":"","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            if (rankType === 1) {
              this.shooterList = res.data.returndata
            } else if (rankType === 3) {
              this.assistList = res.data.returndata
            }
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.$store.commit('setLoading', false)
        }).catch(err => {
          console.log(err)
          this.$store.commit('setLoading', false)
        })
      },
      loadGamePunishRankList () {   // 获取红黄牌榜单
        let url = `${this.apiAddress}/api/game/loadGamePunishRankList.php`
        let param = {
          json: `{"gameId":"${this.gameId}","orderType":"1","sign":"","token":"","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.punishList = res.data.returndata
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.$store.commit('setLoading', false)
        }).catch(err => {
          console.log(err)
          this.$store.commit('setLoading', false)
        })
      }
    },
    components: { ScoreBoardList, GameDataRankList, PunishRankList, ScheduleList }
  }
</script>
