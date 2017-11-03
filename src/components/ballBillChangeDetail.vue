<!-- ballBillChangeDetail.vue -->
<style lang="less" scoped>
  .change-detail {
    max-width: 750px;
    margin: 0 auto;
    font-size: .28rem;
    color: #282828;
    overflow-x: hidden;
    .fixed-head {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 10;
      margin: auto;
      max-width: 750px;
      height: .8rem;
      line-height: .8rem;
      overflow: hidden;
      font-size: .3rem;
      background: #fff;
    }
    .nofull-border-right {
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: .1rem;
        bottom: .1rem;
        right: 0;
        width: 1px;
        background: #a0a0a0;
        transform: scaleX(0.5);
      }
    }
    .detail-container {
      margin-top: .8rem;
    }
    .date {
      position: relative;
      height: .6rem;
      line-height: .6rem;
      background: #f0f0f0;
      text-align: center;
      .total-amount {
        position: absolute;
        margin: auto;
        right: .2rem;
        top: 0;
        bottom: 0;
        text-align: right;
        font-size: .22rem;
        left: 5rem;
      }
    }
    .change-item {
      display: flex;
      justify-content: space-between;
      height: .8rem;
      line-height: .4rem;
      padding: 0 .2rem;
      font-size: .26rem;
      align-items: center;
      &.expend .amount {
        color: #fd5f46;
      }
      &.income .amount {
        color: #32b847;
      }
    }
  }
  .load-more {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
  }
</style>

<template>
  <div class="change-detail">
    <nav class="fixed-head border-bottom">
      <div class="_left _width50 _txt-center nofull-border-right">支出</div>
      <div class="_left _width50 _txt-center">收入</div>
    </nav>
    <div class="detail-container">
      <ul class="">
        <li class="" v-for="item in changeDetail">
          <div class="date">
            {{formatDate(item.date)}}
            <span class="total-amount _ellipsis">余额:{{item.totalAmount}}</span>
          </div>
          <div class="border-center _clearfix _rel">
            <div class="_left _width50 _txt-center">
              <div class="change-item expend border-bottom nofull-border-right" v-for="item in item.expend">
                <div class="_ellipsis">{{item.type ? item.type+':' : ''}}</div>
                <div class="amount">{{item.amount}}</div>
              </div>
            </div>
            <div class="_right _width50 _txt-center">
              <div class="change-item income border-bottom" v-for="item in item.income">
                <div class="_ellipsis">{{item.type ? item.type+':' : ''}}</div>
                <div class="amount">{{item.amount ? '+'+item.amount : ''}}</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="load-more">
        <div v-if="loadable" @click="getBallBillChangeDetail(0)">点击加载更多</div>
        <div v-else>没有更多内容了</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ballBillChangeDetail',
    data () {
      return {
        nav: 1,
        targetType: this.getQueryString('targetType'),
        targetId: this.getQueryString('targetId'),
        loadPage: 1,
        loadable: true,
        changeDetail: []
      }
    },
    computed: {
      apiAddress () {
        return this.$store.state.apiAddress
      }
    },
    mounted () {
      document.title = '球币收支记录'
      this.$store.commit('setTopBar', false)
      this.$store.commit('setUserList', false)
      this.getBallBillChangeDetail(0)
    },
    methods: {
      getBallBillChangeDetail (changeType) {    // 992 获取球币交易明细
        if (!this.loadable) {
          return
        }
        this.$store.commit('setLoading', true)
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let limit = 30
        let page = this.loadPage
        let paramJson = {
          method: 'mall_ballbill_getBallBillChangeDetail',
          targetType: this.targetType,
          targetId: this.targetId,
          changeType: changeType,
          page: page,
          limit: limit
        }
        let param = { json: JSON.stringify(paramJson) }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            if (res.data.returndata.length < limit) {
              this.loadable = false
            }
            this.loadPage++
            res.data.returndata.forEach(item => {
              let date = this.formatDate(item.addTime)
              let i = this.checkItemIndex(this.changeDetail, date)
              if (i >= 0) {
                item.amount > 0 ? this.changeDetail[i].income.push({ type: item.changeType, amount: item.amount })
                                 : this.changeDetail[i].expend.push({ type: item.changeType, amount: item.amount })
              } else {
                this.changeDetail.push({
                  date: date,
                  totalAmount: item.totalAmount,
                  income: +item.amount > 0 ? [{
                    type: item.changeType,
                    amount: item.amount
                  }] : [],
                  expend: +item.amount < 0 ? [{
                    type: item.changeType,
                    amount: item.amount
                  }] : []
                })
              }
            })
            this.changeDetail = this.changeDetail.map(item => {
              let differ = item.income.length - item.expend.length
              let income = item.income
              let expend = item.expend
              if (differ > 0) {   // 收入项比较多， 填补支出项
                for (let i = 0; i < differ; i++) {
                  expend.push({})
                }
              } else if (differ < 0) {    // 支出项比较多， 填补收入项
                for (let i = 0; i < -differ; i++) {
                  income.push({})
                }
              } else if (differ === 0) {
                return item
              }
              return {
                date: item.date,
                totalAmount: item.totalAmount,
                income: income,
                expend: expend
              }
            })
          }
          this.$store.commit('setLoading', false)
        }).catch(err => {
          console.log(err)
          this.$store.commit('setLoading', false)
        })
      },
      formatDate (val) {
        if (val) {
          return val.replace(/\s[:\d]+$/, '')
        }
        return '未知日期'
      },
      checkItemIndex (array, item) {
        for (let i = 0; i < array.length; i++) {
          if (array[i].date === item) {
            return i
          }
        }
        return -1
      }
    }
  }
</script>
