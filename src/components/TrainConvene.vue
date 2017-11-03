<!-- TrainConvene.vue 训练召集 -->
<style lang="less" scoped>
  .activity-convene {
    font-size: .28rem;
    color: #282828;
    .page-head {
      position: relative;
      width: 100%;
      height: 3.2rem;
      .head-background {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(http://share.greenplayer.cn/share/img/against-bg.png);
        background-size: 100% 100%;
        z-index: -1;
      }
      .head {
        display: flex;
        align-items: center;
        color: #fff;
        width: 100%;
        height: 100%;
        padding: .5rem;
        .portrait {
          flex: 0 0 1.8rem;
          height: 1.8rem;
          margin-right: .2rem;
        }
        .desc {
          flex: 1;
          overflow: hidden;
          .title {
            font-size: .32rem;
            line-height: .8rem;
          }
          .date, .addr {
            line-height: .5rem;
          }
        }
      }
    }
    .page-nav {
      width: 100%;
      height: .7rem;
      line-height: .7rem;
      display: flex;
      text-align: center;
      .nav-item {
        flex: 1;
        color: #282828;
        font-size: .3rem;
        &.active {
          color: #fff;
          background: #32b847;
        }
      }
    }
    .page-container {
      position: absolute;
      top: 4.6rem;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      .page-group {
        display: flex;
        height: 100%;
        transition: all .2s;
      }
      .page {
        flex: 1;
        max-width: 100%;
        min-width: 100%;
        height: 100%;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
      }
      .detail {
        background: #f0f0f0;
        padding: .2rem;
        .activity-info {
          background: #fff;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          .item {
            position: relative;
            padding: 0 .2rem;
            height: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: .4rem;
            .title {
              flex: 0;
              white-space: nowrap;
              font-size: .32rem;
              img {
                width: .5rem;
                height: .5rem;
                vertical-align: middle;
              }
            }
            .content {
              flex: 1;
              text-align: right;
            }
          }
        }
        .train-desc {
          color: #646464;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 .4rem 0 .6rem;
          height: 1rem;
          &.train-item {
            padding-left: .8rem;
          }
        }
        .equip-list {
          overflow: hidden;
          color: #646464;
          padding: 0 .2rem 0 .8rem;
          .equip-item {
            float: left;
            margin-right: .2rem;
            margin-bottom: .2rem;
            padding: .1rem .2rem;
            background: #ddd;
            font-size: .22rem;
            border-radius: 3px;
          }
        }
      }
      .content {
        .template-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 1rem;
          padding: 0 .2rem;
        }
        .template-item-list {
          padding-left: .4rem;
          color: #646464;
        }
        .test-name {
          padding-top: .2rem;
          padding-left: .3rem;
        }
        .player-list {
          padding: .2rem;
          .player {
            padding: .1rem .2rem;
            display: flex;
            color: #646464;
            font-size: .22rem;
            align-items: center;
            overflow: hidden;
            .info {
              display: flex;
              align-items: center;
              overflow: hidden;
            }
            .portrait {
              flex: 0 0 .6rem;
              height: .6rem;
              margin-right: .1rem;
            }
            .name {
              line-height: .3rem;
            }
            .grade {
              flex: 0 0 1rem;
              height: .4rem;
              line-height: .4rem;
              text-align: center;
              box-shadow: 0 0 1px #646464;
              border-radius: 3px;
            }
          }
        }
        .train-match {
          padding: .2rem;
          .match-score {
            width: 1.2rem;
            height: .46rem;
            line-height: .46rem;
            text-align: center;
            margin: 0 auto;
            background: #f0f0f0;
            font-size: .2rem;
            border-radius: 3px;
          }
          .match-event {
            position: relative;
            .block-split {
              position: absolute;
              top: .1rem;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              width: 1px;
              background: #f0f0f0;
              transform: translate(0.5);
            }
            .event-item {
              display: flex;
              align-items: center;
              margin: .2rem 0;
              font-size: .26rem;
              color: #787878;
              &.home {
                flex-direction: row-reverse;
              }
            }
            .event-icon {
              flex: 0 0 .3rem;
              height: .3rem;
              margin: 0 .2rem;
            }
            .event-player {
              margin: 0 .2rem;
            }
          }
        }
      }
      .comment {
        .comment-item, .homework {
          height: 1rem;
          line-height: 1rem;
          padding: 0 .2rem;
        }
        .homework-list {
          padding-left: .2rem;
          .homework {}
        }
        .comment-list {
          .comment-content {
            display: flex;
            height: 1rem;
            align-items: center;
            overflow: hidden;
            padding: 0 .3rem;
          }
          .player-info {
            flex: 0 0 50%;
            display: flex;
            align-items: center;
            overflow: hidden;
            .portrait {
              flex: 0 0 .6rem;
              height: .6rem;
              margin-right: .1rem;
            }
            .name {
              line-height: .36rem;
            }
          }
          .text {
            flex: 0 0 25%;
            text-align: center;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="activity-convene">
    <header class="page-head">
      <div class="head-background"></div>
      <div class="head">
        <div class="portrait">
          <img class="_fullimg" :src="activityInfo.portrait" alt="">
        </div>
        <div class="desc">
          <p class="title _ellipsis">{{activityInfo.teamName}}</p>
          <p class="date _ellipsis">{{getActivityTime}}</p>
          <p class="addr _ellipsis">{{activityInfo.courtName}}</p>
        </div>
      </div>
    </header>
    <nav class="page-nav border-bottom">
      <a href="javascript:;" class="nav-item" :class="{active: nav===0}" @click="nav=0">详情</a>
      <a href="javascript:;" class="nav-item" :class="{active: nav===1}" @click="nav=1">名单</a>
      <!-- <a href="javascript:;" class="nav-item" :class="{active: nav===2}" @click="nav=2">内容</a> -->
      <!-- <a href="javascript:;" class="nav-item" :class="{active: nav===3}" @click="nav=3">评价</a> -->
    </nav>
    <div class="page-container">
      <div class="page-group" :style="{transform: 'translateX('+translateVert+')'}">
        <!-- 活动详情 -->
        <div class="page detail">
          <div class="activity-info">
            <ul class="list">
              <li class="item border-bottom">
                <div class="title">
                  天气：
                </div>
                <div class="content">
                  <weather-show :weatherInfo="weatherInfo"></weather-show>
                </div>
              </li>
              <li class="item border-bottom">
                <div class="title">
                  训练时长：
                </div>
                <div class="content">{{getTrainTotalTime}}min</div>
              </li>
              <li class="item border-bottom" v-if="activityInfo.coachInfo">
                <div class="title">
                  教练：
                </div>
                <div class="content">{{activityInfo.coachInfo[0] ? activityInfo.coachInfo[0].coachName : ''}}</div>
              </li>
              <div>
                <!-- <div class="border-bottom train-desc" v-if="activityInfo.totalTime">
                  <div>训练时长：</div>
                  <div>{{activityInfo.totalTime}}min</div>
                </div> -->
                <div class="train-desc" v-if="activityInfo.equipList">
                  <div>训练器材：</div>
                </div>
                <ul class="equip-list border-bottom" v-if="activityInfo.equipList">
                  <li class="equip-item" v-for="item in activityInfo.equipList">{{item.equipmentName}}</li>
                </ul>
              </div>
              <li class="item">
                <div class="title">
                  备注：
                </div>
                <div class="content">{{activityInfo.noteInfo}}</div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 报名名单 -->
        <div class="page name-list">
          <convene-name-list
            :registInfo="registInfo"
            :unregistInfo="unregistInfo"
            @undetermined="undetermined"
            @leave="leave"
            @enroll="enroll"></convene-name-list>
        </div>
        <!-- 内容 -->
        <div class="page content">
          <div class="gray-place-bar"></div>
          <div class="train-template" v-for="item in trainTemplateList">
            <div class="template-title" :class="{'border-bottom': item.type!=2}">
              <div class="name">{{item.name}}</div>
              <div class="duration">{{item.duration}}</div>
            </div>
            <div class="template-content">
              <!-- 训练项目 -->
              <ul class="template-item-list border-bottom" v-if="item.type===1">
                <li class="template-title" :class="{'border-bottom': i!=item.options.length-1}" v-for="(option, i) in item.options">
                  <div class="name">{{option.trainName}}</div>
                  <div class="duration">{{option.trainTime}}</div>
                </li>
              </ul>
              <!-- 比赛对抗 -->
              <div class="border-bottom" v-else-if="item.type===2">
                <div class="train-match" v-for="trainMatch in item.trainMatches">
                  <div class="match-score">{{trainMatch.scoreA}}:{{trainMatch.scoreB}}</div>
                  <div class="match-event _clearfix">
                    <ul class="event-list home _left _width50">
                      <li class="event-item home" v-for="player in trainMatch.playerListA">
                        <img class="event-icon" src="http://share.greenplayer.cn/share/img/match/jq.png" alt="">
                        <div class="event-time"></div>
                        <div class="event-player">{{player.playerName}}</div>
                      </li>
                    </ul>
                    <div class="block-split"></div>
                    <ul class="event-list away _left _width50">
                      <li class="event-item away" v-for="player in trainMatch.playerListB">
                        <img class="event-icon" src="http://share.greenplayer.cn/share/img/match/jq.png" alt="">
                        <div class="event-time"></div>
                        <div class="event-player">{{player.playerName}}</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- 测试 -->
              <div class="train-test border-bottom" v-else-if="item.type===3">
                <div v-for="test in item.trainTestList">
                  <div class="test-name">{{test.content}}</div>
                  <ul class="player-list _clearfix">
                    <li class="player _left _width50" v-for="player in test.playerList">
                      <div class="info">
                        <div class="portrait">
                          <img class="_fullimg _border-radius50" :src="player.portrait" alt="">
                        </div>
                        <div class="name _ellipsis">{{player.playerName}}</div>
                      </div>
                      <div class="grade _ellipsis">{{player.grade}}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 评价 -->
        <div class="page comment">
          <div class="gray-place-bar"></div>
          <div class="comment-container">
            <div class="comment-item border-bottom">训练作业</div>
            <ul class="homework-list">
              <li class="homework border-bottom">作业1：左右脚颠球</li>
            </ul>
          </div>
          <div class="gray-place-bar"></div>
          <div class="comment-container">
            <div class="comment-item border-bottom">球员评价</div>
            <ul class="comment-list">
              <li class="comment-content">
                <div class="player-info">
                  <img class="portrait _border-radius50" src="http://share.greenplayer.cn/uploadfile/standard/Portrait/toux0005.png" alt="">
                  <span class="name _ellipsis">球员名字球员名字球员名字球员名字球员名字</span>
                </div>
                <div class="text">评语</div>
                <div class="text">作业</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <transition name="fadein">
      <div class="select-popup" v-show="selectPopupShow" @click="selectPopupShow=false">
        <div class="select-container">
          <i class="close-popup" @click="selectPopupShow=false"></i>
          <div class="popup-title" v-if="playerInfo.length>0">请选择要反馈的球员</div>
          <ul class="select-list" v-if="playerInfo.length>0">
            <li class="select-item" v-for="item in playerInfo" @click="register(item.playerId)">
              <div class="select-portrait">
                <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
              </div>
              <div class="select-name">{{item.name}}</div>
            </li>
          </ul>
          <div class="no-select-tip" v-else>
            没有球员
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import ConveneNameList from './common/ConveneNameList'
  import WeatherShow from './tools/WeatherShow'

  export default {
    name: 'TrainConvene',
    data () {
      return {
        nav: 1,
        activityId: this.getQueryString('activityId'),
        templateId: '',
        teamId: '',
        activityInfo: '',
        registerType: '',
        trainTemplate: '',
        trainTemplateList: [],
        selectPopupShow: false,
        weatherInfo: '',
        playerInfo: '',
        registInfo: {
          enroll: [],
          leave: [],
          undetermined: []
        },
        unregistInfo: ''
      }
    },
    computed: {
      apiAddress () {
        return this.$store.state.apiAddress
      },
      uid () { return this.$store.state.uid },
      translateVert () {
        return -this.nav * 100 + '%'
      },
      getActivityTime () {
        return this.activityInfo.activityTime ? this.activityInfo.activityTime.replace(/:\d+$/, '') : this.activityInfo.activityTime
      },
      getTrainTotalTime () {
        if (this.activityInfo.totalTime) {
          return this.activityInfo.totalTime
        }
        let time = 0
        let arr = [].slice.call(this.trainTemplate)
        arr.forEach(item => {
          if (item.options.length > 0) {
            item.options.forEach(opt => {
              time += (+opt.trainTime)
            })
          }
        })
        return time
      }
    },
    watch: {
      uid (val, oldVal) {
        if (val) {
          this.loadUserPlayerList()
        }
      }
    },
    mounted () {
      document.title = '训练召集'
      document.documentElement.style.height = document.body.style.height = '100%'
      document.querySelector('#app').style.height = '100%'
      this.$store.commit('setUserList', true)   // 显示用户登录状态
      if (this.activityId) {
        this.loadTrainDetailInfo()
        this.loadPlayerTrainCommentList()
      } else {
        this.$store.commit('showToast', '没有活动id，请确认训练被正确创建')
      }
    },
    methods: {
      loadTrainDetailInfo () {   // 535 加载训练详情
        let url = `${this.apiAddress}/api/team/trainManagement/loadTrainDetailInfo.php`
        let param = {
          json: `{"activityId":"${this.activityId}","uid":"${this.uid || 250}","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.activityInfo = res.data.returndata
            this.teamId = res.data.returndata.teamId
            this.templateId = res.data.returndata.templateId
            this.loadTrainTemplateContentById()
            // 设置微信分享
            this.$store.commit('setWxShareTitle', `${res.data.returndata.teamName}训练召集`)
            this.$store.commit('setWxShareDesc', `${res.data.returndata.teamName}召集大家一起来参加${res.data.returndata.activityTime.replace(/\s[\d:]$/, '')}的训练，快来报名吧~`)
            this.$store.commit('setWxShareImgUrl', res.data.returndata.portrait)
            let cityId = res.data.returndata.areaId
            let matchDate = res.data.returndata.activityTime
            let urlOfWeather = `${this.apiAddress}/api/common/getWeatherByCityId.php`
            this.$axios.get(urlOfWeather + '?cityId=' + cityId + '&date=' + matchDate).then(res => {   // 获取天气
              if (res.data.returndata.length > 0) {
                this.weatherInfo = res.data.returndata[0]
              }
            })
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadTrainTemplateContentById () {   // 531通过模板ID加载模板内容
        let url = `${this.apiAddress}/api/team/trainManagement/loadTrainTemplateContentById.php`
        let param = {
          json: `{"templateId":"${this.templateId}","uid":"${this.uid || 250}","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.trainTemplate = res.data.returndata
            let list = res.data.returndata.filter(item => {
              return item.options.length > 0
            })
            this.trainTemplateList = list.map(item => {
              return {
                type: 1,
                name: item.trainName,
                duration: `${item.options.reduce((pre, cur) => pre + (+cur.trainTime), 0)}min`,
                options: item.options.map(opt => {
                  return {
                    trainItemId: opt.trainItemId,
                    trainName: opt.trainName,
                    trainTime: `${opt.trainTime}min`
                  }
                })
              }
            })
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.getTrainMatchDetailInfoList()    // 加载完训练模板后加载训练比赛对抗
        }).catch(err => {
          console.log(err)
        })
      },
      loadPlayerTrainCommentList () {    // 539 加载球员训练评价详情
        let url = `${this.apiAddress}/api/team/trainManagement/loadPlayerTrainCommentList.php`
        let param = {
          json: `{"activityId":"${this.activityId}","uid":"${this.uid || 250}","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.registInfo = {
              enroll: [],
              leave: [],
              undetermined: []
            }
            res.data.returndata.registerInfo_a.forEach(item => {
              let obj = {
                playerId: item.uid,
                portrait: item.portrait,
                name: item.username,
                memberNumber: item.memberNumber
              }
              if (+item.registerType === 100) {
                this.registInfo.enroll.push(obj)
              } else if (+item.registerType === -1) {
                this.registInfo.leave.push(obj)
              } else if (+item.registerType === 0) {
                this.registInfo.undetermined.push(obj)
              }
            })
            this.unregistInfo = res.data.returndata.unRegisterInfo_a
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getTrainMatchDetailInfoList () {    // 932获取单场训练比赛对抗数据列表
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method": "common_train_getTrainMatchDetailInfoList","uid": 500,"activityId":"${this.activityId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            if (res.data.returndata.length > 0) {
              this.trainTemplateList.push({
                type: 2,
                name: '比赛对抗',
                duration: '',
                trainMatches: res.data.returndata.map(item => {
                  return {
                    scoreA: item.scoreA,
                    scoreB: item.scoreB,
                    colorA: item.colorCodeA && item.colorCodeA.replace('0x', '#'),
                    colorB: item.colorCodeB && item.colorCodeB.replace('0x', '#'),
                    playerListA: item.playerListA,
                    playerListB: item.playerListB
                  }
                })
              })
            }
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.getTrainTestDetailInfoList()   // 加载完比赛对抗后加载训练测试
        })
      },
      getTrainTestDetailInfoList () {   // 942  根据活动id获取训练测试内容
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method": "common_train_getTrainTestDetailInfoList","uid": 500,"activityId":"${this.activityId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata
            if (data.trainInfo.length > 0) {
              this.trainTemplateList = this.trainTemplateList.concat(data.trainInfo.map(item => {
                return {
                  type: 3,
                  name: item.trainName,
                  trainTestList: item.trainTestList
                }
              }))
            }
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      undetermined () {     // 选择待定
        this.handleClick(0)
      },
      leave () {    // 选择请假
        this.handleClick(-1)
      },
      enroll () {   // 选择报名
        this.handleClick(100)
      },
      handleClick (type) {
        if (!this.uid) {
          this.$store.commit('showLogin')
          return
        }
        if (this.playerInfo === '') {
          this.loadUserPlayerList()
        }
        this.registerType = type
        if (this.playerInfo.length === 1) {
          this.register(this.playerInfo[0].playerId)
          return
        }
        this.selectPopupShow = true
      },
      register (playerId) {
        this.$store.commit('setLoading', true)
        let url = `${this.apiAddress}/api/team/activities/registerForActivity.php`
        let param = {
          json: `{"activityId":"${this.activityId}","isManager":"0","participateNumbers":"1","participateType":"${this.registerType}","playerId":"${playerId}","teamId":"${this.teamId}","uid":"${this.uid}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let successText = +this.registerType === 0 ? '反馈成功'
                            : +this.registerType === -1 ? '请假成功'
                            : +this.registerType === 100 ? '报名成功'
                            : ''
            this.$store.commit('showToast', successText)
            this.loadPlayerTrainCommentList()
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.$store.commit('setLoading', false)
        }).catch(err => {
          console.log(err)
          this.$store.commit('setLoading', false)
        })
      },
      loadUserPlayerList () {
        let url = `${this.apiAddress}/api/user/loadUserPlayerList.php`
        let param = {
          json: `{"uid":"${this.uid}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.playerInfo = res.data.returndata
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    components: { ConveneNameList, WeatherShow }
  }
</script>
