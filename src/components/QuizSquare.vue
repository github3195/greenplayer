<!-- GuessingSquare.vue 竞猜广场 -->
<style lang="less" scoped>
  .guessing-square {
    font-size: .26rem;
    color: #282828;
    .general-situation {
      .situation-container {
        margin: .25rem 0;
      }
      .self-quiz {
        line-height: .5rem;
        font-size: .28rem;
        .fc-green {
          color: #32b847;
        }
        .fs-big {
          font-size: .32rem;
        }
        .situation-info {
          padding-left: 1rem;
        }
      }
      .quiz-square {
        .sort-list {
          position: relative;
          &::after {
            content: '';
            position: absolute;
            right: .2rem;
            top: .1rem;
            width: .18rem;
            height: .3rem;
            background-image: url(//share.greenplayer.cn/share/img/icon/gengduo@2x.png);
            background-size: 100% 100%;
          }
        }
        .list-title {
          margin-left: .2rem;
          height: .4rem;
          width: 1.2rem;
        }
        .player-container {
          padding: .1rem .2rem 0 .2rem;
        }
        .players {
          display: flex;
          align-items: center;
          margin-top: .3rem;
          &:nth-child(2) .sort-icon {
            background-image: url(//share.greenplayer.cn/share/img/icon/NO.2@2x.png);
          }
          &:nth-child(3) .sort-icon {
            background-image: url(//share.greenplayer.cn/share/img/icon/NO.3@2x.png);
          }
        }
        .sort-icon {
          flex: 0 0 .5rem;
          height: .2rem;
          background-image: url(//share.greenplayer.cn/share/img/icon/NO.1@2x.png);
          background-size: 100% 100%;
          margin-right: .1rem;
        }
        .portrait {
          flex: 0 0 .7rem;
          height: .7rem;
          margin-right: .1rem;
        }
        .info {
          flex: 1;
          overflow: hidden;
          line-height: .4rem;
        }
        .rate {
          width: 1.3rem;
          height: .26rem;
          line-height: .26rem;
          border-radius: .13rem;
          color: #fff;
          background: #f35d40;
          font-size: .17rem;
          text-align: center;
          &.pro {
            background: #ed8601;
          }
        }
      }
    }
    // .drop-refresh {
    //   height: 1rem;
    //   line-height: 1rem;
    //   text-align: center;
    //   margin-top: -1rem;
    // }
    .load-more {
      font-size: .3rem;
      line-height: 1rem;
      text-align: center;
      background: #fafafa;
    }
  }
</style>

<template>
  <div class="guessing-square">
    <!-- <div class="drop-refresh">{{dropRefreshText}}</div> -->
    <div class="general-situation">
      <div v-if="+pageType===1">   <!-- 我的竞猜的头部 -->
        <div class="_clearfix center-line situation-container self-quiz">
          <div class="_left _width50 situation-info">
            <div>场 次：{{staticsInfo.totalQuizNum}}</div>
            <div>投 注：{{staticsInfo.totalQuizItemNum}}</div>
            <div>猜 中：<span class="fc-green">{{staticsInfo.totalAwardNum}}</span></div>
            <div>胜 率：<span class="fc-green fs-big">{{staticsInfo.winRate}}%</span></div>
          </div>
          <div class="_left _width50 situation-info">
            <div>使 用：{{staticsInfo.totalQuizBet | fixedNumber}}</div>
            <div>获 得：{{staticsInfo.totalQuizAward | fixedNumber}}</div>
            <div>赢 得：<span class="fc-green">{{staticsInfo.totalEarn | fixedNumber}}</span></div>
            <div>收益率：<span class="fc-green fs-big">{{staticsInfo.earnRate}}%</span></div>
          </div>
        </div>
      </div>
      <div v-else-if="+pageType===2">   <!-- 竞猜广场的头部 -->
        <div class="_clearfix center-line situation-container quiz-square">
          <div class="_left _width50" @click="goListDetail(1)">
            <div class="sort-list">
              <div class="list-title"><img class="_fullimg" src="//share.greenplayer.cn/share/img/icon/guess@2x.png" alt=""></div>
              <ul class="player-container">
                <li class="players" v-for="item in staticsInfo.quizWinRateInfo">
                  <div class="sort-icon"></div>
                  <div class="portrait">
                    <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
                  </div>
                  <div class="info">
                    <div class="_ellipsis name">{{item.username}}</div>
                    <div class="_ellipsis rate win">胜率：{{item.winRate * 100}}%</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="_left _width50" @click="goListDetail(2)">
            <div class="sort-list">
              <div class="list-title"><img class="_fullimg" src="//share.greenplayer.cn/share/img/icon/profit@2x.png" alt=""></div>
              <ul class="player-container">
                <li class="players" v-for="item in staticsInfo.quizEarnRateInfo">
                  <div class="sort-icon"></div>
                  <div class="portrait">
                    <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
                  </div>
                  <div class="info">
                    <div class="_ellipsis name">{{item.username}}</div>
                    <div class="_ellipsis rate pro">收益率：{{item.earnRate * 100}}%</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul>
      <li v-for="item in quizInfoList">
        <div class="gray-place-bar"></div>
        <quiz-card :data="item" :playerName="playerName" :playerPortrait="playerPortrait"></quiz-card>
      </li>
    </ul>
    <div class="load-more">
      <div v-if="canLoadMore" @click.stop="getQuizInfoListOfPlayer">加载更多</div>
      <div v-else>没有更多内容了</div>
    </div>
  </div>
</template>

<script>
  import QuizCard from '@/components/common/QuizCard'

  export default {
    name: 'QuizSquare',
    data () {
      return {
        pageType: this.getQueryString('pageType'),
        page: 1,
        canLoadMore: true,
        quizInfoList: [],
        staticsInfo: '',
        playerName: '',
        playerPortrait: '',
        dropRefreshText: '继续下拉以刷新',
        refreshDistance: 50,    // 下拉多大距离触发刷新
        touchStartY: '',
        translateTop: 0
      }
    },
    computed: {
      apiAddress () { return this.$store.state.apiAddress },
      uid () { return this.getQueryString('uid') || this.$store.state.uid },
      playerId () { return this.getQueryString('playerId') || this.uid }
    },
    filters: {
      fixedNumber (val) {
        if (+val) {
          return (+val).toFixed(2)
        }
        return val
      }
    },
    mounted () {
      document.title = +this.pageType === 1 ? '我的竞猜' : +this.pageType === 2 ? '竞猜广场' : '竞猜'
      this.$store.commit('setTopBar', false)
      this.$store.commit('setUserList', false)
      this.getQuizInfoListOfPlayer()
      this.getBasicInfoById()
    },
    methods: {
      getQuizInfoListOfPlayer () {    // 771 加载竞猜列表
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let limit = 20
        let data = {
          method: 'match_quiz_getQuizInfoListOfPlayer',
          playerId: this.playerId,
          page: this.page,
          limit: limit,
          loadType: this.pageType     // 加载类型，0全部，1我的，2广场
        }
        let param = { json: JSON.stringify(data) }
        this.$store.commit('setLoading', true)
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata
            if (data.quizInfoList.length < limit) {
              this.canLoadMore = false
            }
            this.page++
            this.quizInfoList = this.quizInfoList.concat(data.quizInfoList)
            if (!this.staticsInfo) {
              this.staticsInfo = data.staticsInfo
            }
          } else {
            this.canLoadMore = false
          }
          this.translateTop = 0
          this.dropRefreshText = '继续下拉以刷新'
          this.$store.commit('setLoading', false)
        })
      },
      goListDetail (type) {   // 跳转榜单，1猜中榜，2收益榜
        let url = `${location.protocol}//${location.host}${location.pathname}#/quizlist?fromApp=true&pageType=${type}&playerId=${this.playerId}`
        let data = {
          type: 'goUrl',
          url: url
        }
        if (this.$sendDataToClient(data)) {
          return
        }
        this.$router.push({
          path: 'quizlist',
          query: {
            pageType: type,
            playerId: this.playerId
          }
        })
      },
      getBasicInfoById () {   // 加载球员头像名称
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let data = {
          method: 'common_share_getBasicInfoById',
          targetId: this.playerId,
          type: 1
        }
        let param = { json: JSON.stringify(data) }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.playerName = res.data.returndata.name
            this.playerPortrait = res.data.returndata.portrait
          }
        })
      },
      dropStart (e) {
        this.touchStartY = e.touches[0].clientY
      },
      dropMove (e) {
        let moveClientY = e.touches[0].clientY
        let move = moveClientY - this.touchStartY
        if (move > 0 && +document.body.scrollTop === 0) {
          this.translateTop += 2
        } else if (+document.body.scrollTop > 0) {
          this.translateTop = 0
        }
        if (this.translateTop > this.refreshDistance) {
          this.dropRefreshText = '放开后刷新'
        } else {
          this.dropRefreshText = '继续下拉以刷新'
        }
      },
      dropEnd (e) {
        if (this.translateTop > this.refreshDistance) {
          this.translateTop = this.refreshDistance
          this.dropRefreshText = '正在刷新'
          this.page = 1
          this.canLoadMore = true
          this.staticsInfo = ''
          this.quizInfoList = []
          this.getQuizInfoListOfPlayer()
        } else {
          this.translateTop = 0
          this.dropRefreshText = '继续下拉以刷新'
        }
      }
    },
    components: { QuizCard }
  }
</script>
