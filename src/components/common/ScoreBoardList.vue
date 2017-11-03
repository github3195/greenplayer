<!-- 赛事积分列表 ScoreRankList.vue -->
<style lang="less" scoped>
  .score-board-container {
    position: relative;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    text-align: center;
    .score-board-head {
      position: relative;
      z-index: 3;
      height: .6rem;
      line-height: .6rem;
      font-size: .24rem;
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #c4c4c4;
        transform: scaleY(0.5);
      }
    }
    .ranking-container {
      .ranking-item {
        display: flex;
        align-items: center;
        padding: .2rem 0;
      }
      .ranking-title {
        flex: 0 0 1.1rem;
      }
      .team-list {
        flex: 1;
        overflow-x: auto;
        display: flex;
      }
      .team-container {
        flex: 0 0 1.55rem;
        overflow: hidden;
      }
      .portrait {
        width: .6rem;
        height: .6rem;
        margin: 0 auto;
      }
      .name {
        line-height: .36rem;
        padding-left: .1rem;
        font-size: .22rem;
      }
    }
    .data-container {
      .score-board-list {
        .group-title {
          line-height: .6rem;
          background: #f0f0f0;
          text-align: left;
          padding-left: .2rem;
          font-size: .36rem;
        }
        .score-board-item {
          position: relative;
          height: .98rem;
          line-height: .98rem;
          font-size: .24rem;
          color: #282828;
          &::after {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background: #c4c4c4;
            transform: scaleY(0.5);
          }
          .team {
            display: flex;
            align-items: center;
            .team-portrait {
              flex: 0 0 .6rem;
              width: .6rem;
              height: .6rem;
              margin-right: .1rem;
            }
          }
        }
      }
    }
    .no-data {
      height: 1rem;
      line-height: 1rem;
    }
    .width-large { width: 30%; height: 100%;}
    .width-middle { width: 16%; height: 100%;}
    .width-small { width: 9%; height: 100%;}
  }
</style>

<template>
  <div class="score-board-container" :style="{overflow: scrollable ? 'scroll' : 'hidden'}">
    <div class="ranking-container">
      <ul class="ranking-list">
        <li class="ranking-item border-bottom" v-for="item in gameRanking">
          <div class="ranking-title">{{item.title}}</div>
          <ul class="team-list">
            <li class="team-container" v-for="team in item.teamsInfo" @click="goTeamHome(team)">
              <div class="portrait">
                <img class="_fullimg" :src="team.icon" alt="">
              </div>
              <div class="name _ellipsis">{{team.teamname}}</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ul class="score-board-head _clearfix">
      <li class="_left _ellipsis width-small">排名</li>
      <li class="_left _ellipsis width-large">队徽/队名</li>
      <li class="_left _ellipsis width-small">场次</li>
      <li class="_left _ellipsis width-small">胜</li>
      <li class="_left _ellipsis width-small">平</li>
      <li class="_left _ellipsis width-small">负</li>
      <li class="_left _ellipsis width-middle">进/失</li>
      <li class="_left _ellipsis width-small">积分</li>
    </ul>
    <div class="data-container">
      <ul class="score-board-list group" v-for="(group, i) in datalist">
        <p class="group-title">{{group.group}}</p>
        <li class="score-board-item _clearfix" v-for="(item, index) in group.list" @click="goTeamHome(item)">
          <div class="_left _ellipsis width-small rank">{{item.rank}}</div>
          <div class="_left _ellipsis width-large team">
            <div class="team-portrait">
              <img class="_fullimg" :src="item.portrait" alt="">
            </div>
            <div class="team-name _ellipsis">{{item.teamName}}</div>
          </div>
          <div class="_left _ellipsis width-small match-times">{{-(-item.success-item.dual-item.lose)}}</div>
          <div class="_left _ellipsis width-small win">{{item.success}}</div>
          <div class="_left _ellipsis width-small flat">{{item.dual}}</div>
          <div class="_left _ellipsis width-small lose">{{item.lose}}</div>
          <div class="_left _ellipsis width-middle goal">{{item.Score}}/{{item.Score - item.NetScore}}</div>
          <div class="_left _ellipsis width-small score" :data-teamid="item.teamId">{{item.credit}}</div>
        </li>
      </ul>
      <div class="no-data" v-if="datalist.length < 1">暂无数据</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        gameId: this.getQueryString('gameId')
      }
    },
    props: {
      datalist: '',
      gameBasicInfo: '',
      scrollable: '',
      gameRanking: ''
    },
    mounted () {
    },
    watch: {
      datalist (val, oldVal) {
        if (val.length > 0 && +this.gameBasicInfo.groupRankSeq !== 2) {   // groupRankSeq =2 是大循环，不计算小循环
          this.$nextTick(() => {
            this.setGroupSimpleCycle()
          })
        }
      }
    },
    methods: {
      setGroupSimpleCycle () {    // 设置小循环
        let scoreList = document.querySelectorAll('.score-board-list.group')
        Array.prototype.slice.call(scoreList).forEach((item, index, that) => {
          let groupName = item.firstChild.innerText.replace('组', '') || 'A'
          let scoreItem = Array.prototype.filter.call(item.children, a => (/score-board-item/i).test(a.className))   // 获取分组下的积分排名列表
          let score = scoreItem.map(a => {
            let children = a.children
            return children[7]    // 获取分组积分列表
          })
          let obj = {}
          let height = score[0].clientHeight
          Array.prototype.slice.call(score).forEach((item, index) => {
            obj[item.innerText] = obj[item.innerText] ? (obj[item.innerText] + '-' + index) : '' + index
          })
          for (let p in obj) {
            if (+p > 0) {
              let arr = obj[p].split('-')
              if (arr.length > 1) {
                let teamIds = arr.map(item => {
                  return score[item].getAttribute('data-teamid')
                }).join('-')
                arr.sort((a, b) => a - b)
                let node = document.createElement('div')
                node.style.height = `${height * arr.length}px`
                node.style.position = 'absolute'
                node.style.left = 0
                node.style.right = 0
                node.style.background = 'rgba(50, 184, 71, 0.1)'
                node.style.zIndex = 3
                node.style.textAlign = 'right'
                node.style.lineHeight = 0
                node.style.border = '1px solid #32b847'
                let icon = document.createElement('img')
                icon.src = 'http://share.greenplayer.cn/share/img/icon/content_icon_xiaoxunhuan_nor@2x.png'
                icon.width = 12
                icon.height = 12
                node.appendChild(icon)
                node.onclick = (e) => {
                  e.stopPropagation()
                  let sendData = {
                    type: 'goMinorCycle',
                    gameId: this.gameId,
                    groupName: groupName,
                    teamIds: teamIds.split('-'),
                    gameBasicInfo: this.gameBasicInfo
                  }
                  if (this.$sendDataToClient(sendData)) {
                    return
                  }
                  location.href = `http://share.greenplayer.cn/share/green/#/simplecycle?gameId=${this.gameId}&groupName=${groupName}&teamIds=${teamIds}`
                }
                scoreItem[arr[0]].appendChild(node)
              }
            }
          }
        })
      },
      goTeamHome (obj) {
        let sendData = {
          type: 'goThirdParty',
          targetType: 2,
          targetId: obj.teamId || obj.tid
        }
        if (this.$sendDataToClient(sendData)) {
          return
        }
        this.$router.push({
          path: 'thirdpartyhome',
          query: {
            pageType: 2,
            teamId: obj.teamId || obj.tid
          }
        })
      }
    }
  }
</script>
