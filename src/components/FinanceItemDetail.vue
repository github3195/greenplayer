<!-- FinanceItemDetail.vue -->
<style lang="less" scoped>
  .finance-detail {
    font-size: .28rem;
    color: #282828;
    overflow-x: hidden;
    .finance-item {}
    .item-desc {
      display: flex;
      justify-content: space-between;
      min-height: 1rem;
      padding: .3rem .2rem;
      line-height: .4rem;
      .item-title {
        white-space: nowrap;
      }
      .item-name {
        line-height: .4rem;
      }
    }
    .item-detail-list {
      padding-left: .5rem;
      .detail {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 1rem;
        padding: 0 .2rem;
        .detail-title {
          flex: 1;
          height: 1rem;
          line-height: 1rem;
        }
        .detail-content {
          flex: 0 0 2rem;
          text-align: right;
        }
      }
    }
    .item-player-list {
      padding-left: .5rem;
      .detail {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 1rem;
        padding: 0 .2rem;
      }
      .player-info {
        display: flex;
        flex: 1;
        min-height: 1rem;
        align-items: center;
        overflow: hidden;
      }
      .portrait {
        flex: 0 0 .8rem;
        height: .8rem;
        margin-right: .1rem;
      }
      .name {
        line-height: .42rem;
      }
      .total-team-fee {
        line-height: .38rem;
        font-size: .24rem;
      }
      .player-amount {
        flex: 0 0 2rem;
        text-align: right;
        color: #32b847;
      }
    }
    .player-pay-list {
      .pay-detail {
        padding-left: .5rem;
      }
      .player-info {
        display: flex;
        flex: 1;
        min-height: 1rem;
        padding: 0 .2rem;
        align-items: center;
        overflow: hidden;
      }
      .portrait {
        flex: 0 0 .8rem;
        height: .8rem;
        margin-right: .1rem;
      }
      .name {
        line-height: .42rem;
      }
      .pay-amount, .pay-date {
        display: flex;
        flex: 1;
        min-height: .6rem;
        align-items: center;
        padding: 0 .2rem;
        justify-content: space-between;
      }
    }
  }
  .border-right {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: .15rem;
      bottom: .15rem;
      right: 0;
      width: 1px;
      background: #c8c8c8;
      transform: scaleX(0.5);
    }
  }
</style>

<template>
  <div class="finance-detail">
    <!-- 球队收入中的球员缴费 -->
    <div v-if="+targetType===2 && +transactionInfo.transType === 1 && +transactionInfo.actType===1">
      <div class="finance-item">
        <div class="item-desc border-bottom">
          <div class="item-title">类型</div>
          <div class="item-name">{{transactionInfo.type}}</div>
        </div>
      </div>
      <div class="finance-item">
        <div class="item-desc border-bottom">
          <div class="item-title">球员缴费列表</div>
          <div class="item-name"></div>
        </div>
        <ul class="player-pay-list border-bottom"  v-if="playerList.length>0">
          <li class="pay-detail border-bottom" v-for="item in playerList">
            <div class="player-info border-bottom">
              <div class="portrait">
                <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
              </div>
              <div class="name _ellipsis">{{item.name}}</div>
            </div>
            <div class="pay-amount border-bottom">
              <div>缴费金额</div>
              <div>{{+item.amount >= 0 ? item.amount : '--'}}</div>
            </div>
            <div class="pay-date border-bottom">
              <div>缴费时间</div>
              <div>{{item.happenTime}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="finance-item">
        <div class="item-desc border-bottom">
          <div class="item-title">备注：</div>
          <div class="item-name">{{transactionInfo.note}}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="finance-item">
        <div class="item-desc border-bottom">
          <div class="item-title">类型</div>
          <div class="item-name">{{transactionInfo.type}}</div>
        </div>
      </div>
      <div class="finance-item" v-if="transactionInfo.transTitle">
        <div class="item-desc border-bottom">
          <div class="item-title">项目名称</div>
          <div class="item-name">{{transactionInfo.transTitle}}</div>
        </div>
      </div>
      <div class="finance-item" v-if="transactionInfo.itemName">
        <div class="item-desc border-bottom">
          <div class="item-title">相关事项</div>
          <div class="item-name">{{transactionInfo.itemName}}</div>
        </div>
      </div>
      <div class="finance-item">
        <div class="item-desc border-bottom">
          <div class="item-title">时间</div>
          <div class="item-name">{{transactionInfo.date}}</div>
        </div>
      </div>
      <div class="finance-item">
        <div class="item-desc border-bottom">
          <div class="item-title">金额</div>
          <div class="item-name">{{transactionInfo.amount}}</div>
        </div>
        <ul class="item-detail-list border-bottom">
          <li class="detail border-bottom" v-for="item in expenseDetailInfo">
            <div class="detail-title border-right">{{item.title}}</div>
            <div class="detail-content">{{item.amount}}</div>
          </li>
        </ul>
      </div>
      <div class="finance-item">
        <div class="item-desc border-bottom" v-if="transactionInfo.offsetItem">
          <div class="item-title">冲减款项</div>
          <div class="item-name">{{transactionInfo.offsetItem}}</div>
        </div>
      </div>
      <div class="finance-item">
        <div class="item-desc border-bottom" v-if="playerList.length>0">
          <div class="item-title">参与球员（{{transactionInfo.playerCount || playerList.length}}人）</div>
          <div class="item-name" v-if="transactionInfo.playerAverage">人均：{{transactionInfo.playerAverage}}</div>
        </div>
        <ul class="item-player-list border-bottom" v-show="playerList.length>0">
          <li class="detail border-bottom" v-for="item in playerList">
            <div class="player-info border-right">
              <div class="portrait">
                <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
              </div>
              <div class="">
                <div class="name _ellipsis">{{item.name}}</div>
                <div class="total-team-fee _ellipsis" v-if="item.totalTeamFee">队费余额：{{item.totalTeamFee}}</div>
              </div>
            </div>
            <div class="player-amount">{{+item.amount >= 0 ? item.amount : '--'}}</div>
          </li>
        </ul>
      </div>
      <div class="finance-item">
        <div class="item-desc border-bottom">
          <div class="item-title">备注：</div>
          <div class="item-name">{{transactionInfo.note}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FinanceItemDetail',
    data () {
      return {
        targetType: this.getQueryString('targetType'), // || 1,   // 1 球员  2 球队
        targetId: this.getQueryString('targetId'), // || 500,
        transId: this.getQueryString('transId'), // || 523,   // 流水id
        playerList: '',
        transactionInfo: '',
        expenseDetailInfo: ''
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
      this.loadTransactionDetail()
    },
    methods: {
      loadTransactionDetail () {
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"common_finance_loadTransactionDetail","targetId":"${this.targetId}","targetType":"${this.targetType}","transId":"${this.transId}","uid":"500","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata
            document.title = `${+this.targetType === 1 ? '球员' : '球队'}${+data.transType === 1 ? '收入' : '支出'}`
            this.transactionInfo = {
              type: this.getActType(this.targetType, data.transType, data.actType),
              actType: data.actType,
              transType: data.transType,
              amount: data.amount,
              date: data.happenTime ? data.happenTime.replace(/\s[\d:]+$/g, '') : '',
              note: data.note,
              offsetItem: +this.targetType === 2 ? this.getActType(this.targetType, 1, data.deductType) : '', // 冲减款项
              transTitle: data.transTitle,
              itemName: data.itemName,
              playerCount: data.playerCount,
              playerAverage: data.playerAverage
            }
            this.expenseDetailInfo = data.expenseDetailInfo ? data.expenseDetailInfo.map(item => {
              return {
                title: item.title,
                amount: item.amount
              }
            }) : ''
            this.playerList = data.playerList ? data.playerList.map(item => {
              return {
                id: item.playerId,
                name: item.playerName,
                portrait: item.playerPortrait,
                totalTeamFee: item.totalTeamFee || 0,
                happenTime: item.happenTime ? item.happenTime.replace(/\s[\d:]+$/g, '') : '',
                amount: item.amount
              }
            }) : ''
            if (+this.targetType === 1 && +data.transType === 2) {   // 球员比赛支出的时候加载详情
              this.getAllPlayerExpenseInOneTeamTrans()
            }
            this.$store.commit('setWxShareTitle', '财务详情')
            this.$store.commit('setWxShareDesc', '财务详情\n--来自绿茵场')
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      /*
        target =1球员  =2球队
        trans  =1收入  =2支出
        act    财务款项类型
      */
      getActType (target, trans, act) {
        if (+target === 1) {  // 球员
          if (+trans === 1) { // 收入
            return +act === 1 ? '奖金'
                 : +act === 2 ? '补助'
                 : +act === 3 ? '其他'
                 : ''
          } else if (+trans === 2) {  // 支出
            return +act === 1 ? '比赛支出'
                 : +act === 2 ? '活动支出'
                 : +act === 3 ? '赛事报名费'
                 : +act === 4 ? '赛事保证金'
                 : +act === 5 ? '队费'
                 : +act === 6 ? '其他'
                 : +act === 7 ? '缴费退回'
                 : +act === 8 ? '训练'
                 : ''
          }
        } else if (+target === 2) {   // 球队
          if (+trans === 1) {   // 收入
            return +act === 1 ? '球员缴费'
                 : +act === 2 ? '赞助商赞助'
                 : +act === 3 ? '赛事奖金'
                 : +act === 4 ? '其他额外收入'
                 : +act === 5 ? '保证金退回'
                 : ''
          } else if (+trans === 2) {  // 支出
            return +act === 1 ? '比赛支出'
                 : +act === 2 ? '活动支出'
                 : +act === 3 ? '赛事报名费'
                 : +act === 4 ? '赛事保证金'
                 : +act === 5 ? '保证金扣费'
                 : +act === 6 ? '其他'
                 : +act === 7 ? '缴费退回'
                 : +act === 8 ? '训练'
                 : ''
          }
        }
      },
      getAllPlayerExpenseInOneTeamTrans () {
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"common_finance_getAllPlayerExpenseInOneTeamTrans","transId":"${this.transId}","uid":"500","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata
            this.expenseDetailInfo = data.expenseDetail ? data.expenseDetail.map(item => {
              return {
                title: item.title,
                amount: item.amount
              }
            }) : ''
            this.playerList = data.playerList ? data.playerList.map(item => {
              return {
                id: item.playerId,
                name: item.playerName,
                portrait: item.playerPortrait,
                amount: item.amount
              }
            }) : ''
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
