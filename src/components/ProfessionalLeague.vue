<!-- 专业赛事 ProfessionalLeague.vue -->
<style lang="less" scoped>
  @maincolor: #32b847;
  .professional-game {
    font-size: 0;
    .page-header {
      position: relative;
      width: 100%;
      height: 2rem;
      background: rgba(0, 0, 0, .5);
      overflow: hidden;
      .bg-container {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
        img {
          width: 100%;
          margin-top: -15%;
        }
      }
      .header-container {
        display: flex;
        height: 100%;
        padding-top: .6rem;
        padding-left: .5rem;
        padding-right: .5rem;
        .game-portrait {
          flex: 0 0 1rem;
          height: 1rem;
          background: #fff;
          margin-right: .2rem;
        }
        .game-info {
          flex: 1;
          height: 1rem;
          position: relative;
          color: #fff;
          .game-name {
            font-weight: 700;
            height: .72rem;
            line-height: .4rem;
            overflow: hidden;
            font-size: .34rem;
          }
          .game-desc {
            position: absolute;
            bottom: 0;
            font-size: .24rem;
            max-width: 5.5rem;
          }
        }
      }
    }
    .page-nav {
      height: .8rem;
      line-height: .8rem;
      font-size: .28rem;
      color: #646464;
      width: 100%;
      overflow: hidden;
      .nav-list {
        display: flex;
        height: 100%;
        .nav-item {
          flex: 1;
          min-width: 1rem;
          margin: 0 .2rem;
          text-align: center;
          &.active {
            color: @maincolor;
            border-bottom: 2px solid @maincolor;
          }
        }
      }
    }
    .page-container {
      position: absolute;
      // top: 4.3rem;   顶部下载条可能不显示，top设为动态
      bottom: 0;
      left: 0;
      right: 0;
      padding-top: .1rem;
      background: #f0f0f0;
      overflow: hidden;
      .container-inner {
        width: 100%;
        height: 100%;
        background: #fff;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        overflow-x: hidden;
        .page-group {
          display: flex;
          font-size: .28rem;
          height: 100%;
          transition: all .2s;
          .page {
            min-width: 100%;
            max-width: 100%;
            height: 100%;
            overflow: scroll;
            -webkit-overflow-scrolling: touch;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="professional-game">
    <header class="page-header">
      <div class="bg-container">
        <img :src="gameInfo.coverPic" alt="">
      </div>
      <div class="header-container">
        <div class="game-portrait">
          <img class="_fullimg" :src="gameInfo.portrait" alt="">
        </div>
        <div class="game-info">
          <p class="game-name">{{gameInfo.gamename}}</p>
          <p class="game-desc _ellipsis">{{gameInfo.gamename}}</p>
        </div>
      </div>
    </header>
    <nav class="page-nav">
      <ul class="nav-list">
        <li class="nav-item" :class="{active: curNav===0}" @click="changePage(0)">新闻</li>
        <li class="nav-item" :class="{active: curNav===1}" @click="changePage(1)">赛程</li>
        <li class="nav-item" :class="{active: curNav===2}" @click="changePage(2)">榜单</li>
        <li class="nav-item" :class="{active: curNav===3}" @click="changePage(3)">名单</li>
      </ul>
    </nav>
    <main class="page-container" :style="{top:topDistance}">
      <div class="container-inner">
        <div class="page-group" :style="{transform: 'translateX(' + pageTranslateX +')'}">
          <div class="page news">
            <news-list></news-list>
          </div>
          <div class="page schedule">
            <schedule-list :loaded="loadSchedule" :scrollable="true"></schedule-list>
          </div>
          <div class="page data">
            <game-data-list :loaded="loadGameData" :gameBasicInfo="gameInfo" :scrollable="true"></game-data-list>
          </div>
          <div class="page participant">
            <participant-list :loaded="loadParticipant"></participant-list>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import NewsList from './common/NewsList'    // 赛事新闻列表
  import ScheduleList from './common/ScheduleList'    // 赛事赛程
  import GameDataList from './common/GameDataList'    // 赛事榜单
  import ParticipantList from './common/ParticipantList'    // 赛事名单

  export default {
    name: 'ProfessionalLeague',
    data () {
      return {
        gameId: this.getQueryString('gameId'),
        gameInfo: '',
        topDistance: '3.5rem',  // container距离顶部
        curNav: 0,
        pageTranslateX: '0%',
        loadSchedule: false,  // 加载赛程
        loadGameData: false,  // 加载榜单
        loadParticipant: false // 加载参赛名单
      }
    },
    computed: {
      apiAddress () { return this.$store.state.apiAddress }
    },
    created () {
      document.documentElement.style.height = document.body.style.height = '100%'
      document.querySelector('#app').style.height = '100%'
    },
    mounted () {
      this.loadGameBasicInfo()
    },
    methods: {
      changePage (nav) {
        this.curNav = nav
        this.pageTranslateX = `-${nav * 100}%`
        if (+nav === 1) {
          this.loadSchedule = true
        } else if (+nav === 2) {
          this.loadGameData = true
        } else if (+nav === 3) {
          this.loadParticipant = true
        }
      },
      loadGameBasicInfo () {
        let url = `${this.apiAddress}/api/game/gameBasicInfo.php`
        let param = {
          json: `{"gameId":"${this.gameId}","sign":"","token":"","uid":127,"version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.gameInfo = res.data.returndata
            document.title = res.data.returndata.gamename
            // 设置微信分享
            this.$store.commit('setWxShareTitle', res.data.returndata.gamename)
            this.$store.commit('setWxShareImgUrl', res.data.returndata.portrait)
            this.$store.commit('setWxShareDesc', `${res.data.returndata.gamename} 赛事资讯、数据榜单，快来了解一下吧~`)
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
          this.$store.commit('setLoading', false)
        })
      }
    },
    components: { NewsList, ScheduleList, GameDataList, ParticipantList }
  }
</script>
