<!-- InsuranceList.vue 保险列表 -->
<style lang="less" scoped>
  .insurance-container {
    min-height: 100%;
    max-width: 750px;
    margin: 0 auto;
    overflow-x: hidden;
    background: #f0f0f0;
    color: #282828;
    .insurance-list {
      padding: .1rem .2rem;
    }
    .insurance-item {
      margin-bottom: .1rem;
      background: #fff;
      border-radius: 5px;
    }
    .head {
      display: flex;
      height: .7rem;
      overflow: hidden;
      padding: 0 .2rem;
      align-items: center;
      justify-content: space-between;
      font-size: .24rem;
    }
    .foot {
      display: flex;
      height: .7rem;
      overflow: hidden;
      padding: 0 .2rem;
      align-items: center;
      font-size: .26rem;
      .portrait {
        flex: 0 0 .46rem;
        height: .46rem;
        margin-right: .1rem;
      }
    }
    .content {
      display: flex;
      align-items: center;
      // height: 1.7rem;
      padding: .2rem;
      font-size: .26rem;
      border-top: 1px dashed #a0a0a0;
      border-bottom: 1px dashed #a0a0a0;
      .detail {
        flex: 1;
        overflow: hidden;
        margin-right: .2rem;
        .insurance-name {
          line-height: .4rem;
        }
        .insurance-duration {
          display: flex;
          text-align: center;
          .date {
            line-height: .5rem;
          }
        }
      }
      .status {
        flex: 0 0 1.2rem;
        height: .4rem;
        line-height: .4rem;
        text-align: center;
        border-radius: .2rem;
        color: #fff;
        background: #32b847;
      }
    }
    .load-more {
      font-size: .3rem;
      line-height: .8rem;
      text-align: center;
    }
  }
</style>

<template>
  <div class="insurance-container">
    <ul class="insurance-list">
      <li class="insurance-item"
          v-for="item in insuranceList"
          @click="goDetail(item)">
        <div class="head">
          <div>保险单号：{{item.orderNumber}}</div>
          <div>被保人数：{{item.memberNum}}</div>
        </div>
        <div class="content">
          <div class="detail">
            <div class="insurance-name">{{item.insuranceName}}</div>
            <div class="insurance-duration">
              <div>
                <p class="date">{{item.startTime}}</p>
                <span style="font-size: .22rem;">保险起期</span>
              </div>
              <div style="margin: 0 .1rem;line-height: 1rem;">~</div>
              <div>
                <p class="date">{{item.endTime}}</p>
                <span style="font-size: .22rem;">保险止期</span>
              </div>
            </div>
          </div>
          <div class="status" :style="getStatus(item.status).style">{{getStatus(item.status).text}}</div>
        </div>
        <div class="foot">
          <div class="portrait" v-if="item.portrait">
            <img class="_fullimg" :src="item.portrait" alt="">
          </div>
          <div>{{item.policyHolder}}</div>
        </div>
      </li>
    </ul>
    <div class="load-more">
      <div v-if="canLoadMore" @click.stop="loadMore">加载更多</div>
      <div v-else>没有更多内容了</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InsuranceList',
    data () {
      return {
        targetId: this.getQueryString('targetId'),
        targetType: this.getQueryString('targetType'),
        currentPage: 1,
        canLoadMore: true,
        insuranceList: []
      }
    },
    computed: {
      apiAddress () {
        return this.$store.state.apiAddress
      },
      uid () {
        return this.$store.state.uid
      }
    },
    mounted () {
      document.title = '保险'
      document.documentElement.style.height = document.body.style.height = document.querySelector('#app').style.height = '100%'
      this.$store.commit('setTopBar', false)    // 隐藏顶部下载
      this.$store.commit('setUserList', false)
      this.getInsuranceListByType()
      window.backListener = () => {
        try {
          window.eventListener.onEvent(`{"type":"finish"}`)
        } catch (e) {}
      }
    },
    methods: {
      getInsuranceListByType () {
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"common_insurance_getInsuranceListByType","uid":"${this.uid}","targetId":${this.targetId},"targetType":"${this.targetType}","page":"${this.currentPage}","numberPage":10}`
        }
        this.$store.commit('setLoading', true)
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata.insuranceList
            if (data.length < 10) {
              this.canLoadMore = false
            }
            this.insuranceList = this.insuranceList.concat(data)
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.$store.commit('setLoading', false)
        })
      },
      loadMore () {
        this.currentPage++
        this.getInsuranceListByType()
      },
      getStatus (status) {    // 保险状态
        if (+status === 0) {
          return {
            text: '已失效',
            style: {
              background: '#c4c4c4'
            }
          }
        } else if (+status === 1) {
          return {
            text: '生效中',
            style: {
              background: '#32b847'
            }
          }
        }
      },
      goDetail (item) {
        let sendData = {
          type: 'goInsuranceDetail',
          insuranceId: item.id
        }
        if (this.$sendDataToClient(sendData)) {
          return
        }
        window.open(`/#/insurancedetail?insuranceId=${item.id}`)
      }
    },
    components: {}
  }
</script>
