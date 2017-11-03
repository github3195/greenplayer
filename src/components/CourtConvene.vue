<!-- 球场召集 CourtConvene.vue -->
<style lang="less" scoped>
  .court-convene {
    font-size: .28rem;
    color: #282828;
    .court-image {
      width: 100%;
      height: 4.5rem;
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
    .enroll-item {
      display: flex;
      text-align: center;
      margin: .2rem 0;
      line-height: .6rem;
      &.list-head {
        background: #f0f0f0;
        line-height: .5rem;
        margin: 0;
        font-size: .24rem;
      }
    }
    .item-player {
      flex: 0 0 40%;
    }
    .item-phone {
      flex: 0 0 35%;
    }
    .item-number {
      flex: 0 0 25%;
    }
    .player-info {
      display: flex;
      align-items: center;
      padding-left: .2rem;
      overflow: hidden;
    }
    .player-portrait {
      flex: 0 0 .6rem;
      height: .6rem;
      margin-right: .1rem;
      background: #a0a0a0;
      border-radius: 50%;
    }
  }
</style>

<template>
  <div class="court-convene">
    <div class="details-container">
      <div class="court-image">
        <img class="_fullimg" :src="courtImage" alt="">
      </div>
      <nav class="page-nav border-bottom" v-if="published">
        <a href="javascript:;" class="nav-item" :class="{active: nav===0}" @click="nav=0">详情</a>
        <a href="javascript:;" class="nav-item" :class="{active: nav===1}" @click="nav=1">名单</a>
      </nav>
      <div v-if="nav===0">
        <details-item :editable="editable" :data="details"></details-item>
      </div>
      <div v-else-if="nav===1">
        <div class="enroll-item list-head">
          <div class="item-player">客户</div>
          <div class="item-phone">联系电话</div>
          <div class="item-number">人数(9)</div>
        </div>
        <ul class="name-list">
          <li class="enroll-item" v-for="item in [1,2,3]">
            <div class="item-player player-info">
              <img class="player-portrait" src="" alt="">
              <span class="player-name _ellipsis">绿茵场哈哈</span>
            </div>
            <div class="item-phone">13654789635</div>
            <div class="item-number">5人</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="">
      <bottom-button v-if="editable" :buttonText="'发布召集'" @bindClick="publishConvene"></bottom-button>
      <bottom-button v-else-if="scheduleId" :buttonText="'报    名'" @bindClick="enroll"></bottom-button>
    </div>
  </div>
</template>

<script>
  import DetailsItem from './common/DetailsItem'
  import BottomButton from './common/BottomButton'

  export default {
    name: 'courtconvene',
    data () {
      return {
        scheduleId: this.getQueryString('scheduleId'),
        courtNumberId: this.getQueryString('courtNumberId'),
        courtId: this.getQueryString('courtId'),
        courtImage: '//share.greenplayer.cn/share/img/playerData/backg.png',
        nav: 0,
        editable: false,
        published: false,
        details: {
          courtName: '',
          scheduleDate: '',
          scaleName: '',
          callTargetId: 4,
          duration: '',
          minAllowNumber: '',
          comment: ''
        },
        registerList: []
      }
    },
    computed: {
      apiAddress () { return this.$store.state.apiAddress },
      uid () { return this.getQueryString('uid') || this.$store.state.uid },
      clientData () { return this.$store.state.clientData }
    },
    watch: {
      clientData (val, old) {
        if (val) {
          this.editable = +val.editable === 1
          this.$nextTick(() => {
            this.details.scheduleDate = val.scheduleDate ? `${val.scheduleDate} ${val.startTime}` : this.details.scheduleDate
            this.details.duration = val.duration ? val.duration : this.details.duration
            // this.details.comment = JSON.stringify(val)
          })
        }
      }
    },
    mounted () {
      document.title = '球场召集'
      this.published = this.scheduleId > 0  // 有召集的id 设置已发布为true
      this.getCourtCallInfo()
    },
    methods: {
      getCourtCallInfo () {   // http://120.76.27.54/view.php?id=1069
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"user_court_getCourtCallInfo","courtNumberId":"${this.courtNumberId}","scheduleId":"${this.scheduleId || ''}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let courtNumberInfo = res.data.returndata.courtNumberInfo
            this.courtImage = courtNumberInfo.backGround ? courtNumberInfo.backGround.replace('!small', '') : '//share.greenplayer.cn/share/img/playerData/backg.png'
            this.details.courtName = courtNumberInfo.courtName || ''
            this.details.scheduleDate = courtNumberInfo.scheduledDate ? `${courtNumberInfo.scheduledDate} ${courtNumberInfo.startTime}-${courtNumberInfo.endTime}` : ' '
            this.details.scaleName = courtNumberInfo.scale
            this.details.duration = courtNumberInfo.duration
            this.details.callTargetId = +courtNumberInfo.status === 3 || +courtNumberInfo.status === 4 ? +courtNumberInfo.status : 4
            this.details.minAllowNumber = courtNumberInfo.memberNumber
            this.details.comment = courtNumberInfo.note || ''
            // this.registerList = res.data.returndata.registerList.map(item => {
            //   return {
            //     portrait: item.portrait
            //   }
            // })
            if (this.scheduleId > 0) {    // 如果是创建完成的召集，设置分享
              this.$sendDataToClient({
                type: 'showShareButton',
                show: 1
              })
              // 设置微信分享
              this.$store.commit('setWxShareTitle', `${courtNumberInfo.courtName} 开始召集啦，快来踢球吧~`)
              this.$store.commit('setWxShareDesc', `踢球时间：${this.details.scheduleDate}`)
              this.$store.commit('setWxShareImgUrl', this.courtImage)
              this.$store.commit('setWxShareLink', `${location.host}${location.pathname}#/courtconvene?courtId=${this.courtId}&courtNumberId=${this.courtNumberId}&scheduleId=${this.scheduleId}`)
              // 设置APP内的分享
              window.shareConfig.title = `${courtNumberInfo.courtName} 开始召集啦，快来踢球吧~`
              window.shareConfig.imgUrl = this.courtImage
              window.shareConfig.desc = `踢球时间：${this.details.scheduleDate}`
              window.shareConfig.url = `${location.host}${location.pathname}#/courtconvene?courtId=${this.courtId}&courtNumberId=${this.courtNumberId}&scheduleId=${this.scheduleId}`
            }
          }
        })
      },
      publishConvene () {   // 点击发布召集
        if (!this.uid) {
          if (this.$sendDataToClient({
            type: 'goLogin'
          })) {
            return
          }
          this.$store.commit('showLogin')
          return
        }
        if (!this.details.callTargetId) {
          this.$store.commit('showToast', '请选择召集对象')
          return
        }
        if (!this.details.minAllowNumber) {
          this.$store.commit('showToast', '请输入最低成行人数')
          return
        }
        this.courtStartCall()
      },
      courtStartCall () {   // http://120.76.27.54/view.php?id=1070
        this.$store.commit('setLoading', true)
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let data = {
          method: 'user_court_courtStartCall',
          uid: this.uid,
          scheduleId: this.scheduleId || '',
          courtId: this.courtId,
          courtNumberId: this.courtNumberId,
          startTime: this.details.scheduleDate,
          duration: this.details.duration,
          status: this.details.callTargetId,
          memberNumber: this.details.minAllowNumber,
          note: this.details.comment
        }
        let param = { json: JSON.stringify(data) }
        this.$axios.post(url, param).then(res => {
          this.$store.commit('setLoading', false)
          if (res.data.status === 'success') {
            let scheduleId = res.data.returndata.scheduleId
            this.$sendDataToClient({
              type: 'courtCallStatus',
              scheduleId: scheduleId,
              callTargetId: this.details.callTargetId
            })
            this.published = true
            this.scheduleId = scheduleId
            this.getCourtCallInfo()
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      enroll () {
        this.$store.commit('showToast', '报名')
      }
    },
    components: { BottomButton, DetailsItem }
  }
</script>
