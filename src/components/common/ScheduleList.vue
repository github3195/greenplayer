<!-- 赛程列表 ScheduleList.vue -->
<style lang="less" scoped>
  .schedule-container {
    position: relative;
    height: 100%;
    overflow: hidden;
    .schedule-nav {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 .3rem;
      height: .68rem;
      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background: #c4c4c4;
        transform: scaleY(0.5);
      }
    }
    .matches-list {
      position: absolute;
      left: 0;
      right: 0;
      top: .68rem;
      bottom: 0;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      .group-title {
        background: #f0f0f0;
        height: .6rem;
        line-height: .6rem;
        padding-left: .2rem;
      }
      .group-matches {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: #a0a0a0;
          transform: scaleY(0.5);
        }
      }
    }
  }
</style>

<template>
  <div class="schedule-container">
    <div class="schedule-nav">
      <div class="nav-item" @click="setTurn(0)" :style="{visibility: currentTurn > 0 ? 'visible' : 'hidden'}">上一轮</div>
      <div class="nav-item">{{turnsText}}</div>
      <div class="nav-item" @click="setTurn(1)" :style="{visibility: currentTurn < allTurn-1 ? 'visible' : 'hidden'}">下一轮</div>
    </div>
    <div class="matches-list" :style="{overflow: scrollable ? 'scroll' : 'hidden'}">
      <div v-for="item in matches">
        <div class="group-title" v-if="item.title && matches.length>1">{{item.title}}组</div>
        <div class="group-matches"
             v-for="match in item.list">
          <matches-against :matchInfo="match"></matches-against>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MatchesAgainst from './MatchAgainst'

  export default {
    data () {
      return {
        gameId: this.getQueryString('gameId'),
        turns: '',
        currentTurn: '',
        turnsText: '',
        allTurn: '',
        matchesList: '',
        matches: ''
      }
    },
    props: {
      loaded: false,
      scrollable: ''
    },
    computed: {
      apiAddress () {
        return this.$store.state.apiAddress
      }
    },
    mounted () {
    },
    watch: {
      loaded (val, oldVal) {
        if (val) {
          this.$store.commit('setLoading', true)
          this.loadSetupGameScheduleCompletely()
        }
      },
      matchesList (val, oldVal) {
        if (val) {
          this.formatMatchList(val)
        }
      }
    },
    methods: {
      loadSetupGameScheduleCompletely () {
        let url = `${this.apiAddress}/api/game/loadSetupGameScheduleCompletely.php`
        let param = {
          json: `{"gameId":"${this.gameId}","sign":"","token":"","uid":127,"version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata
            this.turns = data.Turns
            this.currentTurn = +data.Turns[data.currentTurn - 1].turn === 3 && +data.Turns[data.currentTurn - 1].isWinTurn === 1
                             ? data.currentTurn
                             : data.currentTurn - 1
            this.allTurn = data.index
            this.matchesList = this.turns[+this.currentTurn]
            if (this.matchesList.isWinTurn === '1') {
              let text = this.matchesList.turn === '1' ? ''
                         : this.matchesList.turn === '2' ? '半'
                         : `1/${this.matchesList.turn}`
              this.turnsText = `${text}决赛`
            } else {
              this.turnsText = `第${+this.currentTurn + 1}轮`
            }
            if (+this.turns[this.allTurn - 1].isWinTurn === 1 && +this.turns[this.allTurn - 1].turn === 1) {
              if (+this.turns[this.allTurn - 3].isWinTurn === 1 && +this.turns[this.allTurn - 3].turn === 3) {
                this.turns[this.allTurn - 1].matchList.unshift(this.turns[this.allTurn - 3].matchList[0])
              }
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
      setTurn (flag) {
        if (flag === 0) {   // 上一轮
          this.currentTurn--
          if (this.turns[+this.currentTurn].isWinTurn === '1' && this.turns[+this.currentTurn].turn === '3') {
            this.currentTurn--
          }
          this.matchesList = this.turns[+this.currentTurn]
          if (this.matchesList.isWinTurn === '1') {
            let text = this.matchesList.turn === '1' ? '' : this.matchesList.turn === '2' ? '半' : `1/${this.matchesList.turn}`
            this.turnsText = `${text}决赛`
          } else {
            this.turnsText = `第${+this.currentTurn + 1}轮`
          }
        } else if (flag === 1) {    // 下一轮
          this.currentTurn++
          if (this.turns[+this.currentTurn].isWinTurn === '1' && this.turns[+this.currentTurn].turn === '3') {
            this.currentTurn++
          }
          this.matchesList = this.turns[+this.currentTurn]
          if (this.matchesList.isWinTurn === '1') {
            let text = this.matchesList.turn === '1' ? '' : this.matchesList.turn === '2' ? '半' : `1/${this.matchesList.turn}`
            this.turnsText = `${text}决赛`
          } else {
            this.turnsText = `第${+this.currentTurn + 1}轮`
          }
        }
        document.querySelector('.matches-list').scrollTop = 0   // 切换轮次滚回顶部
      },
      formatMatchList (list) {
        let isFinal = false
        if (+list.isWinTurn === 1 && +list.turn === 1) {
          isFinal = true
        }
        let isWinTurn = +list.isWinTurn === 1
        let arr = list.matchList.map((item, index) => {
          let groupTitle = ''
          for (let p in item) {
            groupTitle = p
          }
          return {
            title: isWinTurn ? '' : groupTitle,
            list: item[groupTitle].map((match, i) => {
              let turnName = ''
              if (isFinal) {
                turnName = index === 0 && list.matchList.length > 1 ? `三四名决赛` : `冠亚军决赛`
              } else {
                if (isWinTurn) {
                  turnName = `第${++index}场`
                } else {
                  turnName = ''
                }
              }
              return {
                matchId: match.matchId,
                homeIcon: match.party_a_icon,
                awayIcon: match.party_b_icon,
                homeName: match.party_a_name || '未知',
                awayName: match.party_b_name || '未知',
                homeCoat: match.homeUniform.coatColor ? match.homeUniform.coatColor.replace(/0x/, '#') : '',
                homePant: match.homeUniform.pantsColor ? match.homeUniform.pantsColor.replace(/0x/, '#') : '',
                homeSock: match.homeUniform.socksColor ? match.homeUniform.socksColor.replace(/0x/, '#') : '',
                awayCoat: match.awayUniform.coatColor ? match.awayUniform.coatColor.replace(/0x/, '#') : '',
                awayPant: match.awayUniform.pantsColor ? match.awayUniform.pantsColor.replace(/0x/, '#') : '',
                awaySock: match.awayUniform.socksColor ? match.awayUniform.socksColor.replace(/0x/, '#') : '',
                homeScore: match.scores_a,
                awayScore: match.scores_b,
                homePenaltyScore: (+match.penalty_score_a > 0 || +match.penalty_score_b) > 0 && match.penalty_score_a,
                awayPenaltyScore: (+match.penalty_score_b > 0 || +match.penalty_score_a) > 0 && match.penalty_score_b,
                turnName: turnName,
                matchTime: match.matchTime ? match.matchTime.replace(/:\d+$/, '') : '未知',
                courtName: match.courtName || '未知',
                isDelay: match.isDelay,
                isWaiver: match.isWaiver
              }
            })
          }
        })
        this.matches = arr
      }
    },
    components: { MatchesAgainst }
  }
</script>
