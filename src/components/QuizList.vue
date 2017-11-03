<!-- QuizList.vue 竞猜榜单 -->
<style lang="less" scoped>
  .quiz-list {
    font-size: .26rem;
    color: #282828;
    text-align: center;
    overflow-x: hidden;
    .first-three {
      width: 100%;
      height: 3.5rem;
      background: #32b847;
      color: #fff;
      line-height: .6rem;
      .three-item {
        height: 100%;
      }
      .three-portrait {
        position: relative;
        margin: 0 auto;
        width: 1.2rem;
        height: 1.52rem;
        background-position: center;
        background-size: 100% 100%;
        margin-top: .6rem;
        padding-bottom: .2rem;
        .back-image {
          position: absolute;
          z-index: 2;
          width: 100%;
          height: 100%;
          background-position: center;
          background-size: 100% 100%;
        }
        &.first {
          margin-top: .2rem;
        }
        &.first .back-image {
          background-image: url(//share.greenplayer.cn/share/img/icon/sort_1.png);
        }
        &.second .back-image {
          background-image: url(//share.greenplayer.cn/share/img/icon/sort_2.png);
        }
        &.third .back-image {
          background-image: url(//share.greenplayer.cn/share/img/icon/sort_3.png);
        }
      }
      .data {
        line-height: .3rem;
        font-size: .22rem;
      }
    }
    .portrait {
      flex: 0 0 .6rem;
      height: .6rem;
      margin-right: .1rem;
    }
    .list-head {
      height: .6rem;
      line-height: .6rem;
    }
    .list-item {
      height: 100%;
    }
    .player-container {
      height: 1rem;
      line-height: 1rem;
      &.self {
        color: #32b847;
      }
      .player-info {
        display: flex;
        align-items: center;
        height: 100%;
        overflow: hidden;
        text-align: left;
        line-height: .36rem;
      }
      .player-desc {
        flex: 1;
        color: #282828;
        overflow: hidden;
        .self-sort {
          color: #646464;
          font-size: .22rem;
          line-height: .24rem;
        }
      }
    }
    .width14 {
      width: 12%;
    }
    .width18 {
      width: 19%;
    }
    .width28 {
      width: 31%;
    }
  }
  .load-more {
    font-size: .3rem;
    line-height: 1rem;
    text-align: center;
    background: #fafafa;
  }
</style>

<template>
  <div class="quiz-list">
    <div class="first-three _clearfix" v-if="rankList.length>0">
      <div class="_left _width33 three-item" v-if="rankList[1]" @click.stop="goPlayerHome(rankList[1].player_id)">
        <div class="three-portrait second">
          <div class="back-image"></div>
          <img class="_fullimg" :src="rankList[1].portrait" alt="">
        </div>
        <div class="_ellipsis">{{rankList[1].username}}</div>
        <div class="data">{{getrankInfo(rankList[1])}} </div>
        <div class="data">{{+pageType==1?'胜率':'收益率'}}{{rankList[1] | formatRate}}%</div>
      </div>
      <div class="_left _width33 three-item" v-if="rankList[0]" @click.stop="goPlayerHome(rankList[0].player_id)">
        <div class="three-portrait first">
          <div class="back-image"></div>
          <img class="_fullimg" :src="rankList[0].portrait" alt="">
        </div>
        <div class="_ellipsis">{{rankList[0].username}}</div>
        <div class="data">{{getrankInfo(rankList[0])}} </div>
        <div class="data">{{+pageType==1?'胜率':'收益率'}}{{rankList[0] | formatRate}}%</div>
      </div>
      <div class="_left _width33 three-item" v-if="rankList[2]" @click.stop="goPlayerHome(rankList[2].player_id)">
        <div class="three-portrait third">
          <div class="back-image"></div>
          <img class="_fullimg" :src="rankList[2].portrait" alt="">
        </div>
        <div class="_ellipsis">{{rankList[2].username}}</div>
        <div class="data">{{getrankInfo(rankList[2])}} </div>
        <div class="data">{{+pageType==1?'胜率':'收益率'}}{{rankList[2] | formatRate}}%</div>
      </div>
    </div>
    <div class="_clearfix player-container self" v-if="selfRankingInfo.player_id" @click.stop="goPlayerHome(selfRankingInfo.player_id)">
      <div class="_left width14 list-item"></div>
      <div class="_left width28 list-item">
        <div class="player-info">
          <div class="portrait">
            <img class="_fullimg _border-radius50" :src="selfRankingInfo.portrait" alt="">
          </div>
          <div class="player-desc">
            <div class="name _ellipsis">{{selfRankingInfo.username}}</div>
            <div class="self-sort">第{{selfRankingInfo.rankId}}名</div>
          </div>
        </div>
      </div>
      <div class="_left width18 list-item">{{pageType==1?selfRankingInfo.totalQuizNum:pageType==2?selfRankingInfo.totalQuizBet:''}}</div>
      <div class="_left width18 list-item">{{pageType==1?selfRankingInfo.totalAwardNum:pageType==2?selfRankingInfo.totalQuizAward:''}}</div>
      <div class="_left width18 list-item">{{selfRankingInfo | formatRate}}%</div>
    </div>
    <div class="gray-place-bar"></div>
    <div class="list-container">
      <div class="border-bottom">
        <div class="_clearfix list-head">
          <div class="_left width14 list-item">排名</div>
          <div class="_left width28 list-item">球员</div>
          <div class="_left width18 list-item">{{pageType==1?'投注/次':pageType==2?'使用球币':''}}</div>
          <div class="_left width18 list-item">{{pageType==1?'猜中/次':pageType==2?'获得球币':''}}</div>
          <div class="_left width18 list-item">{{pageType==1?'胜率':pageType==2?'收益率':''}}</div>
        </div>
      </div>
      <ul class="sort-list">
        <li class="border-bottom" v-for="(item, index) in rankList.slice(3)">
          <div class="_clearfix player-container" @click.stop="goPlayerHome(item.player_id)">
            <div class="_left width14 list-item">{{item.rankId}}</div>
            <div class="_left width28 list-item">
              <div class="player-info">
                <div class="portrait">
                  <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
                </div>
                <div class="player-desc">
                  <div class="name _ellipsis">{{item.username}}</div>
                </div>
              </div>
            </div>
            <div class="_left width18 list-item">{{pageType==1?item.totalQuizNum:pageType==2?item.totalQuizBet:''}}</div>
            <div class="_left width18 list-item">{{pageType==1?item.totalAwardNum:pageType==2?item.totalQuizAward:''}}</div>
            <div class="_left width18 list-item">{{item | formatRate}}%</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="load-more">
      <div v-if="canLoadMore" @click.stop="loadQuizRankingInfo">加载更多</div>
      <div v-else>没有更多内容了</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'QuizList',
    data () {
      return {
        fromApp: this.getQueryString('fromApp'),
        pageType: this.getQueryString('pageType'),
        playerId: this.getQueryString('playerId'),
        page: 1,
        canLoadMore: true,
        rankList: [],
        selfRankingInfo: ''
      }
    },
    computed: {
      apiAddress () { return this.$store.state.apiAddress }
    },
    filters: {
      formatRate (val) {
        let rate = val.winRate || val.earnRate
        return (rate * 100).toFixed(2)
      }
    },
    mounted () {
      document.title = +this.pageType === 1 ? '猜中榜' : +this.pageType === 2 ? '收益榜' : '竞猜榜单'
      if (this.fromApp || window.eventListener || window.webkit) {
        this.$store.commit('setTopBar', false)
        this.$store.commit('setUserList', false)
      }
      this.getBasicInfoById()
      this.loadQuizRankingInfo()
      this.$sendDataToClient({
        type: 'showShareButton',
        show: 1
      })
      // 设置微信分享
      this.$store.commit('setWxShareTitle', `绿茵场赛事竞猜-${+this.pageType === 1 ? '猜中榜' : +this.pageType === 2 ? '收益榜' : '榜单'}`)
      this.$store.commit('setWxShareDesc', `赛事竞猜数据排行，快来看看吧~`)
      this.$store.commit('setWxShareImgUrl', `http://share.greenplayer.cn/share/img/quiz.png`)
      this.$store.commit('setWxShareLink', `${location.host}${location.pathname}#/quizlist?pageType=${this.pageType}`)
    },
    methods: {
      loadQuizRankingInfo () {    // 1016 获取竞猜猜中榜和收益榜榜单信息
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let limit = 30
        let data = {
          method: 'match_quiz_loadQuizRankingInfo',
          playerId: this.playerId,
          loadType: this.pageType,
          page: this.page,
          limit: limit
        }
        let param = { json: JSON.stringify(data) }
        this.$store.commit('setLoading', true)
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata
            if (!data.rankingInfo) {
              this.canLoadMore = false
              this.$store.commit('setLoading', false)
              return
            }
            if (data.rankingInfo.length < limit) {
              this.canLoadMore = false
            } else {
              this.page++
            }
            this.rankList = this.rankList.concat(data.rankingInfo)
            if (!this.selfRankingInfo) {
              this.selfRankingInfo = data.selfRankingInfo
            }
          }
          this.$store.commit('setLoading', false)
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
            // 设置APP内的分享
            window.shareConfig.title = `绿茵场赛事竞猜-${+this.pageType === 1 ? '猜中榜' : +this.pageType === 2 ? '收益榜' : '榜单'}`
            window.shareConfig.imgUrl = `${res.data.returndata.portrait}`
            window.shareConfig.desc = `${res.data.returndata.name} 的竞猜数据，快来看看吧~~`
            window.shareConfig.url = `${location.host}${location.pathname}#/quizlist?pageType=${this.pageType}&playerId=${this.playerId}`
          }
        })
      },
      getrankInfo (val) {
        if (+this.pageType === 1) {
          return `${val.totalQuizNum}中${val.totalAwardNum}`
        } else if (+this.pageType === 2) {
          return `${val.totalQuizBet} : ${val.totalQuizAward}`
        }
        return ''
      },
      goPlayerHome (id) {
        let sendData = {
          type: 'goThirdParty',
          targetType: 1,
          targetId: id
        }
        if (this.$sendDataToClient(sendData)) {
          return
        }
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
