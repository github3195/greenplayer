<!-- InsuranceDetail.vue 保险详情 -->
<style lang="less" scoped>
  .insurance-detail {
    position: relative;
    height: 100%;
    max-width: 750px;
    margin: 0 auto;
    color: #282828;
    overflow: hidden;
    .page-head {
      height: 1.2rem;
      line-height: .5rem;
      padding: .1rem;
      color: #fff;
      font-size: .3rem;
      text-align: center;
      background: #32b847;
      .odd-number {
        font-size: .26rem;
        color: #d2ffd7;
      }
    }
    .page-content {
      position: absolute;
      top: 1.2rem;
      bottom: 1rem;
      left: 0;
      right: 0;
      font-size: .28rem;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .block-title {
        padding: .3rem .2rem;
        font-size: .3rem;
        color: #32b847;
      }
      .basic-info {
        padding-left: .4rem;
      }
      .insured-info {
        padding-left: .4rem;
      }
      .insurance-item {
        display: flex;
        justify-content: space-between;
        line-height: .8rem;
        padding-right: .2rem;
        color: #a0a0a0;
        font-size: .22rem;
      }
      .insurance-item-title {
        display: flex;
        align-items: center;
      }
      .small-point {
        display: block;
        width: .16rem;
        height: .16rem;
        margin-right: .1rem;
        border-radius: 50%;
        background: #a0a0a0;
      }
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: .7rem;
        overflow: hidden;
        padding-right: .2rem;
        .title {
          flex: 1;
          white-space: nowrap;
          margin-right: .2rem;
        }
        .text {
          color: #32b847;
          flex: 1;
          white-space: nowrap;
          text-align: right;
        }
      }
    }
    .page-foot {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1rem;
      padding: .15rem .3rem;
      display: flex;
      justify-content: center;
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: #c8c8c8;
        transform: scaleY(0.5);
      }
      .buy-btn, .download-e-policy {
        flex: 1;
        margin: 0 .2rem;
        background: #32b847;
        font-size: .28rem;
        height: .7rem;
        line-height: .7rem;
        color: #fff;
        text-align: center;
        border-radius: 3px;
      }
    }
  }
  .place-bar {
    height: .2rem;
    background: #f0f0f0;
  }
</style>

<template>
  <div class="insurance-detail">
    <div class="page-head">
      <div>{{insuranceInfo.name}}</div>
      <div class="odd-number">单号：{{insuranceInfo.orderNumber}}</div>
    </div>
    <div class="page-content" :style="{bottom: showBuyAgain || insuranceInfo.electronicUrl ? '1rem' : '0'}">
      <div>
        <div class="block-title">基本信息</div>
        <div class="basic-info">
          <div class="item border-bottom">
            <div class="title">保险类型</div>
            <div class="text">{{insuranceInfo.typeName}}</div>
          </div>
          <div class="item border-bottom">
            <div class="title">投保起期</div>
            <div class="text">{{insuranceInfo.startTime}}</div>
          </div>
          <div class="item border-bottom">
            <div class="title">投保止期</div>
            <div class="text">{{insuranceInfo.endTime}}</div>
          </div>
          <div class="item border-bottom">
            <div class="title">保险计划</div>
            <div class="text">{{planInfo.planName}}</div>
          </div>
        </div>
        <div class="basic-info">
          <div class="insurance-item">
            <div class="insurance-item-title"><i class="small-point"></i><span>保障范围</span></div>
            <div>保险金额</div>
          </div>
          <div class="item border-bottom" v-for="item in planInfo.duty">
            <div class="title">{{item.dutyName}}</div>
            <div class="text">{{item.dutyMoney}}</div>
          </div>
        </div>
      </div>
      <div class="place-bar"></div>
      <div>
        <div class="block-title">被保人信息</div>
        <div class="insured-info" v-for="(item, index) in insuredList">
          <div class="place-bar" v-show="index !== 0"></div>
          <div class="item border-bottom">
            <div class="title">姓名</div>
            <div class="text ">{{item.name}}</div>
          </div>
          <div class="item border-bottom">
            <div class="title">证件类型</div>
            <div class="text">{{item.certType | getCertText}}</div>
          </div>
          <div class="item border-bottom">
            <div class="title">证件号码</div>
            <div class="text">{{format(item)}}</div>
          </div>
          <div class="item">
            <div class="title">手机号码</div>
            <div class="text">{{item.phone}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-foot" v-if="showBuyAgain || insuranceInfo.electronicUrl">
      <div class="buy-btn" @click="buyAgain" v-if="showBuyAgain">再次购买</div>
      <a class="download-e-policy"
         href="javascript:;"
         @click="getEPolicy(insuranceInfo.electronicUrl)"
         v-if="insuranceInfo.electronicUrl">电子保单</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InsuranceDetail',
    data () {
      return {
        fromApp: this.getQueryString('fromApp'),
        insuranceId: this.getQueryString('insuranceId'),
        insuredList: '',
        insuranceInfo: '',
        planInfo: '',
        applicantInfo: ''
      }
    },
    computed: {
      apiAddress () {
        return this.$store.state.apiAddress
      },
      showBuyAgain () {
        if (!this.fromApp) {
          return false
        }
        // if (!(/(iPhone|iPad|iPod|iOS)/i).test(navigator.userAgent)) { // 不影响线上的android
        //   return true
        // }
        let targetId = this.getQueryString('targetId')
        let targetType = this.getQueryString('targetType')
        if (+targetType === +this.applicantInfo.targetType && +targetId === +this.applicantInfo.targetId) {
          return true
        }
        return false
      }
    },
    filters: {
      getCertText (code) {    // 通过certType判断证件类型
        if (+code === 1) {
          return '身份证'
        } else if (+code === 2) {
          return '护照'
        } else if (+code === 3) {
          return '军官证'
        } else if (+code === 5) {
          return '驾驶证'
        } else if (+code === 6) {
          return '港澳回乡证或台胞证'
        } else if (+code === 99) {
          return '其他'
        }
      }
    },
    mounted () {
      document.documentElement.style.height = document.body.style.height = document.querySelector('#app').style.height = '100%'
      document.title = '保险详情'
      this.$store.commit('setTopBar', false)    // 隐藏顶部下载
      this.$store.commit('setUserList', false)
      this.getDetailInsuranceInfo()
    },
    methods: {
      getDetailInsuranceInfo () {   // 获取保险详情
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"common_insurance_getDetailInsuranceInfo","insuranceId":"${this.insuranceId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata
            this.insuranceInfo = data.insuranceInfo
            this.planInfo = data.planInfo
            this.insuredList = data.insurantInfo
            this.applicantInfo = data.applicantInfo
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      buyAgain () {   // 再次购买保险
        let sendData = {
          type: 'buyInsuranceAgain',
          insuranceId: this.insuranceId,
          cid: this.insuranceInfo.cid
        }
        if (this.$sendDataToClient(sendData)) {
          return
        }
      },
      getEPolicy (url) {    // 用浏览器打开链接
        let data = {
          type: 'openUrlWithBrowser',
          url: url
        }
        if (this.$sendDataToClient(data)) {
          return
        }
        window.open(url)
      },
      format (item) {
        if (+item.certType === 1) {
          let no = item.certNo
          return no.replace(no.substr(6, 6), 'xxxxxx')
        }
        return item.certNo
      }
    },
    components: {}
  }
</script>
