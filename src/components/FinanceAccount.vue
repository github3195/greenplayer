<!-- 财务报表 -->
<style lang="less" scoped>
  .team-info {
    position: relative;
    display: flex;
    align-items: center;
    height: 1.5rem;
    padding: .2rem .3rem;
    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: .2rem;
      right: .2rem;
      height: 1px;
      background: #c4c4c4;
      transform: scaleY(0.5);
    }
    .team-portrait {
      flex: 0 0 1.1rem;
      height: 1.1rem;
      margin-right: .2rem;
    }
    .team-name {
      font-size: .32rem;
      color: #282828;
      max-height: 1.1rem;
      overflow: hidden;
    }
  }
  .finance-account {
    .select-time-container {
      position: relative;
      height: .7rem;
      line-height: .7rem;
      color: #282828;
      .time-select {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        font-size: 0;
        .show-select {
          display: inline-block;
          margin: 0 .4rem;
          font-size: .28rem;
          max-width: 3.6rem;
        }
        .select-icon {
          font-size: 0;
          width: .7rem;
          height: .7rem;
          padding: .24rem .2rem;
          i {
            display: block;
            width: 100%;
            height: 0;
          }
          .left {
            border-right: .1rem solid #696969;
            border-top: .1rem solid transparent;
            border-bottom: .1rem solid transparent;
          }
          .right {
            border-left: .1rem solid #696969;
            border-top: .1rem solid transparent;
            border-bottom: .1rem solid transparent;
          }
        }
      }
      .item-select {
        position: absolute;
        right: .2rem;
        top: 0;
        bottom: 0;
        line-height: .7rem;
        font-size: .26rem;
        .item-select-text {
          display: flex;
          align-items: center;
          .more-icon {
            display: block;
            width: .2rem;
            height: .2rem;
            margin: -.1rem .15rem 0;
            border-left: 1px solid #696969;
            border-bottom: 1px solid #696969;
            transform: rotate(-45deg);
          }
        }
        .drop-container {
          position: absolute;
          top: 100%;
          right: .1rem;
          width: 1.2rem;
          text-align: center;
          z-index: 10;
          .top-angle {
            margin: 0 auto;
            width: .25rem;
            height: .25rem;
            background: #fff;
            box-shadow: 0 0 1px #999;
            transform: rotate(45deg);
          }
          .drop-list {
            position: absolute;
            top: .15rem;
            width: 100%;
            background: #fff;
            color: #282828;
            font-size: .24rem;
            border-radius: 5px;
            box-shadow: 0 0 1px #999;
            li.active {
              color: #32b847;
              background: #f5f5f5;
            }
          }
        }
      }
    }
    .account-container {
      background: #f0f0f0;
      padding: .1rem .15rem;
      font-size: .26rem;
      .account-list {
        .account-item {
          background: #fff;
          box-shadow: 0 0 1px #c8c8c8;
          border-radius: 5px;
          margin-bottom: .1rem;
          overflow: hidden;
          &.last-balance .money { color: #32b847; }
          &.current-income .money { color: #24bfb9; }
          &.current-expend .money { color: #fd5f46; }
          &.current-balance .money { color: #32b847; }
          .account-title {
            height: .8rem;
            line-height: .8rem;
            padding: 0 .2rem;
            overflow: hidden;
            .title-name {
              display: flex;
              align-items: center;
              font-size: .28rem;
              img {
                font-size: 0;
                width: .4rem;
                height: .4rem;
                margin-right: .1rem;
              }
            }
          }
          .account-detail-list {
            position: relative;
            padding: 0 .5rem 0 1rem;
            &::after {
              content: '';
              display: block;
              position: absolute;
              left: 0;
              right: 0;
              top: -50%;
              bottom: -50%;
              border-top: 1px solid #c8c8c8;
              border-bottom: 1px solid #c8c8c8;
              transform: scaleY(0.5);
            }
            .detail-item {
              padding-top: .4rem;
              &:last-child {
                padding-bottom: .4rem;
              }
            }
          }
          .account-foot {
            height: .8rem;
            line-height: .8rem;
            padding: 0 .2rem;
            overflow: hidden;
          }
        }
      }
    }
  }
  .scaledown-enter-active, .scaledown-leave {
    transition: transform .1s;
    transform: scaleY(1);
    transform-origin: 0 0;
  }
  .scaledown-enter, .scaledown-leave-active {
    transition: transform .1s;
    transform: scaleY(0);
    transform-origin: 0 0;
  }
</style>

<template>
  <div class="finance-account" @click="itemSelectShow=false" @touchstart="itemSelectShow=false">
    <div class="team-info">
      <div class="team-portrait">
        <img class="_fullimg" :src="teamPortrait" alt="">
      </div>
      <div class="team-name">{{teamName}}</div>
    </div>
    <div class="select-time-container">
      <div class="time-select">
        <div class="select-icon" @click="prevDate"><i class="left"></i></div>
        <span class="show-select _ellipsis">{{selectText}}</span>
        <div class="select-icon" @click="nextDate"><i class="right"></i></div>
      </div>
      <div class="item-select" @click.stop="itemSelectShow=!itemSelectShow" @touchstart.stop>
        <div class="item-select-text">
          <span>{{selectItemText}}</span><i class="more-icon"></i>
        </div>
        <transition name="scaledown">
          <div class="drop-container" v-show="itemSelectShow" @click.stop>
            <div class="top-angle"></div>
            <ul class="drop-list">
              <li :class="{active: selectItem === 0}" @click="changeItem(0)">月度</li>
              <li :class="{active: selectItem === 1}" @click="changeItem(1)">季度</li>
              <li :class="{active: selectItem === 2}" @click="changeItem(2)">年度</li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
    <div class="account-container">
      <!-- 球队财务报表 -->
      <div class="account-list" v-if="+targetType===2">
        <!-- 上期现金余额 -->
        <div class="account-item last-balance">
          <div class="account-title _clearfix">
            <div class="title-name _left _width50">
              <img src="http://share.greenplayer.cn/share/img/icon/content_icon_xianjin_mpr@3x.png" alt="">
              <span>上期现金余额</span>
            </div>
            <div class="money _left _width50 _txt-right">{{accountData.lastFinanceInfo[0]}}</div>
          </div>
          <ul class="account-detail-list">
            <li class="detail-item _clearfix">
              <div class="_left _width50 ">球员缴费</div>
              <div class="_left _width50 _txt-right">{{accountData.lastFinanceInfo[1]}}</div>
            </li>
            <li class="detail-item _clearfix">
              <div class="_left _width50 ">赞助费</div>
              <div class="_left _width50 _txt-right">{{accountData.lastFinanceInfo[2]}}</div>
            </li>
            <li class="detail-item _clearfix">
              <div class="_left _width50 ">赛事奖金</div>
              <div class="_left _width50 _txt-right">{{accountData.lastFinanceInfo[3]}}</div>
            </li>
            <li class="detail-item _clearfix">
              <div class="_left _width50 ">其他</div>
              <div class="_left _width50 _txt-right">{{accountData.lastFinanceInfo[4]}}</div>
            </li>
          </ul>
          <div class="account-foot _clearfix">
            <div class="_left _width50">待收回押金</div>
            <div class="_left _width50 _txt-right">{{accountData.lastDepositTotal}}</div>
          </div>
        </div>
        <!-- 本期收入 -->
        <div class="account-item current-income">
          <div class="account-title _clearfix">
            <div class="title-name _left _width50">
              <img src="http://share.greenplayer.cn/share/img/icon/content_icon_shoukuan_mpr@3x.png" alt="">
              <span>本期收款</span>
            </div>
            <div class="money _left _width50 _txt-right">{{accountData.newIncome[0]}}</div>
          </div>
          <ul class="account-detail-list">
            <li class="detail-item _clearfix" v-if="+accountData.newIncome[1]>0">
              <div class="_left _width50 ">队员缴费</div>
              <div class="_left _width50 _txt-right">{{accountData.newIncome[1]}}</div>
            </li>
            <li class="detail-item _clearfix" v-if="+accountData.newIncome[2]>0">
              <div class="_left _width50 ">赞助费</div>
              <div class="_left _width50 _txt-right">{{accountData.newIncome[2]}}</div>
            </li>
            <li class="detail-item _clearfix" v-if="+accountData.newIncome[3]>0">
              <div class="_left _width50 ">赛事奖金</div>
              <div class="_left _width50 _txt-right">{{accountData.newIncome[3]}}</div>
            </li>
            <li class="detail-item _clearfix" v-if="+accountData.newIncome[5]>0">
              <div class="_left _width50 ">保证金退回</div>
              <div class="_left _width50 _txt-right">{{accountData.newIncome[5]}}</div>
            </li>
            <li class="detail-item _clearfix" v-if="+accountData.newIncome[4]>0">
              <div class="_left _width50 ">其他</div>
              <div class="_left _width50 _txt-right">{{accountData.newIncome[4]}}</div>
            </li>
          </ul>
        </div>
        <!-- 本期支出 -->
        <div class="account-item current-expend">
          <div class="account-title _clearfix">
            <div class="title-name _left _width50">
              <img src="http://share.greenplayer.cn/share/img/icon/content_icon_zhichu_mpr@3x.png" alt="">
              <span>本期支出</span>
            </div>
            <div class="money _left _width50 _txt-right">{{accountData.newExpense[0]}}</div>
          </div>
          <ul class="account-detail-list">
            <li class="detail-item _clearfix" v-if="+accountData.newExpense[2]>0">
              <div class="_left _width50 ">活动支出</div>
              <div class="_left _width50 _txt-right">{{accountData.newExpense[2]}}</div>
            </li>
            <li class="detail-item _clearfix" v-if="+accountData.newExpense[1]>0">
              <div class="_left _width50 ">比赛支出</div>
              <div class="_left _width50 _txt-right">{{accountData.newExpense[1]}}</div>
            </li>
            <li class="detail-item _clearfix" v-if="+accountData.newExpense[8]>0">
              <div class="_left _width50 ">训练支出</div>
              <div class="_left _width50 _txt-right">{{accountData.newExpense[8]}}</div>
            </li>
            <li class="detail-item _clearfix" v-if="+accountData.newExpense[3]>0">
              <div class="_left _width50 ">赛事报名费</div>
              <div class="_left _width50 _txt-right">{{accountData.newExpense[3]}}</div>
            </li>
            <li class="detail-item _clearfix" v-if="+accountData.newExpense[4]>0">
              <div class="_left _width50 ">赛事保证金</div>
              <div class="_left _width50 _txt-right">{{accountData.newExpense[4]}}</div>
            </li>
            <li class="detail-item _clearfix" v-if="+accountData.newExpense[7]>0">
              <div class="_left _width50 ">队费退回</div>
              <div class="_left _width50 _txt-right">{{accountData.newExpense[7]}}</div>
            </li>
            <li class="detail-item _clearfix" v-if="+accountData.newExpense[6]>0">
              <div class="_left _width50 ">其他</div>
              <div class="_left _width50 _txt-right">{{accountData.newExpense[6]}}</div>
            </li>
          </ul>
          <div class="account-foot _clearfix" v-if="+accountData.newExpense[5]>0">
            <div class="_left _width50">保证金扣费</div>
            <div class="_left _width50 _txt-right">{{accountData.newExpense[5]}}</div>
          </div>
        </div>
        <!-- 本期现金余额 -->
        <div class="account-item current-balance">
          <div class="account-title _clearfix">
            <div class="title-name _left _width50">
              <img src="http://share.greenplayer.cn/share/img/icon/content_icon_xianjin_mpr@3x.png" alt="">
              <span>本期现金余额</span>
            </div>
            <div class="money _left _width50 _txt-right">{{accountData.newFinanceInfo[0]}}</div>
          </div>
          <ul class="account-detail-list">
            <li class="detail-item _clearfix">
              <div class="_left _width50 ">球员缴费</div>
              <div class="_left _width50 _txt-right">{{accountData.newFinanceInfo[1]}}</div>
            </li>
            <li class="detail-item _clearfix">
              <div class="_left _width50 ">赞助费</div>
              <div class="_left _width50 _txt-right">{{accountData.newFinanceInfo[2]}}</div>
            </li>
            <li class="detail-item _clearfix">
              <div class="_left _width50 ">赛事奖金</div>
              <div class="_left _width50 _txt-right">{{accountData.newFinanceInfo[3]}}</div>
            </li>
            <li class="detail-item _clearfix">
              <div class="_left _width50 ">其他</div>
              <div class="_left _width50 _txt-right">{{accountData.newFinanceInfo[4]}}</div>
            </li>
          </ul>
          <div class="account-foot _clearfix">
            <div class="_left _width50">待收回押金</div>
            <div class="_left _width50 _txt-right">{{accountData.newDepositTotal}}</div>
          </div>
        </div>
      </div>
      <!-- 球员财务报表 -->
      <div class="account-list" v-else-if="+targetType===1">
        <!-- 上期现金余额 -->
        <div class="account-item last-balance">
          <div class="account-title _clearfix">
            <div class="title-name _left _width50">
              <img src="http://share.greenplayer.cn/share/img/icon/content_icon_xianjin_mpr@3x.png" alt="">
              <span>上期现金余额</span>
            </div>
            <div class="money _left _width50 _txt-right">{{accountData.lastTeamFeeTotal}}</div>
          </div>
        </div>
        <!-- 本期收入 -->
        <div class="account-item current-income">
          <div class="account-title _clearfix">
            <div class="title-name _left _width50">
              <img src="http://share.greenplayer.cn/share/img/icon/content_icon_shoukuan_mpr@3x.png" alt="">
              <span>本期收款</span>
            </div>
            <div class="money _left _width50 _txt-right">{{accountData.newIncome[0]}}</div>
          </div>
          <ul class="account-detail-list">
            <li class="detail-item _clearfix" v-if="+accountData.newIncome[1]>0">
              <div class="_left _width50 ">奖金</div>
              <div class="_left _width50 _txt-right">{{accountData.newIncome[1]}}</div>
            </li>
            <li class="detail-item _clearfix" v-if="+accountData.newIncome[2]>0">
              <div class="_left _width50 ">补助</div>
              <div class="_left _width50 _txt-right">{{accountData.newIncome[2]}}</div>
            </li>
            <li class="detail-item _clearfix" v-if="+accountData.newIncome[3]>0">
              <div class="_left _width50 ">其他</div>
              <div class="_left _width50 _txt-right">{{accountData.newIncome[3]}}</div>
            </li>
          </ul>
        </div>
        <!-- 本期支出 -->
        <div class="account-item current-expend">
          <div class="account-title _clearfix">
            <div class="title-name _left _width50">
              <img src="http://share.greenplayer.cn/share/img/icon/content_icon_zhichu_mpr@3x.png" alt="">
              <span>本期支出</span>
            </div>
            <div class="money _left _width50 _txt-right">{{accountData.newExpense[0]}}</div>
          </div>
          <ul class="account-detail-list">
            <li class="detail-item _clearfix" v-if="+accountData.newExpense[5]>0">
              <div class="_left _width50 ">队费</div>
              <div class="_left _width50 _txt-right">{{accountData.newExpense[5]}}</div>
            </li>
            <li class="detail-item _clearfix" v-if="+accountData.newExpense[6]>0">
              <div class="_left _width50 ">其他</div>
              <div class="_left _width50 _txt-right">{{accountData.newExpense[6]}}</div>
            </li>
          </ul>
        </div>
        <!-- 本期现金余额 -->
        <div class="account-item current-balance">
          <div class="account-title _clearfix">
            <div class="title-name _left _width50">
              <img src="http://share.greenplayer.cn/share/img/icon/content_icon_xianjin_mpr@3x.png" alt="">
              <span>本期队费余额</span>
            </div>
            <div class="money _left _width50 _txt-right">{{accountData.newTeamFeeTotal}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FinanceAccount',
    data () {
      return {
        targetType: this.getQueryString('targetType'),   // 1球员 2球队
        targetId: this.getQueryString('targetId'),
        startDate: this.getQueryString('startDate'),
        endDate: this.getQueryString('endDate'),
        accountData: '',
        selectItem: 0,
        selectItemText: '月度',
        selectText: '',
        selectYear: '',
        selectQuarter: '',
        selectMonth: '',
        itemSelectShow: false,
        teamName: '',
        teamPortrait: ''
      }
    },
    computed: {
      apiAddress () {
        return this.$store.state.apiAddress
      }
    },
    mounted () {
      this.getBasicInfoById()   // 获取球队信息
      this.initSelectItem()   // 初始化最新报表时间
    },
    methods: {
      initSelectItem () {
        let now = new Date()
        this.selectYear = now.getFullYear()
        this.selectMonth = now.getMonth() + 1
        this.selectQuarter = this.selectMonth / 3 + 1
        this.selectText = `${this.selectYear}年${this.selectMonth}月`
        let endYear = +this.selectMonth + 1 > 12 ? this.selectYear + 1 : this.selectYear
        let endMonth = +this.selectMonth + 1 > 12 ? '01' : +this.selectMonth + 1
        this.startDate = `${this.selectYear}-${this.selectMonth}-01`
        this.endDate = `${endYear}-${endMonth}-01`
        this.loadTransactionStatics()
      },
      getBasicInfoById () {
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {   // targetType 要 +1 ，因为本接口 1用户 2球员 3球队 4裁判 5 赛事 6协会
          json: `{"method":"common_share_getBasicInfoById","targetId":${this.targetId},"type":${+this.targetType + 1}}`
        }
        this.$axios.post(url, param).then(res => {
          this.teamName = res.data.returndata.name
          this.teamPortrait = res.data.returndata.portrait
          document.title = `${+this.targetType === 1 ? '球员' : '球队'}财务报表`
          this.$store.commit('setWxShareTitle', `${this.teamName}财务报表`)
          this.$store.commit('setWxShareDesc', '亲兄弟，明算账')
          this.$store.commit('setWxShareImgUrl', this.teamPortrait)
        }).catch(err => {
          console.log(err)
        })
      },
      loadTransactionStatics () {
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"common_finance_loadTransactionStatics","targetType":${this.targetType},"targetId":${this.targetId},"startDate":"${this.startDate}","endDate":"${this.endDate}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.accountData = res.data.returndata
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      changeItem (type) {   // 选择月度季度年度
        this.itemSelectShow = false
        if (type === this.selectItem) {
          this.$store.commit('showToast', '选重了')
          return
        } else if (type === 0) {
          this.selectItem = 0
          this.selectItemText = '月度'
          let now = new Date()
          this.selectYear = now.getFullYear()
          this.selectMonth = now.getMonth() + 1
          let endYear = +this.selectMonth + 1 > 12 ? this.selectYear + 1 : this.selectYear
          let endMonth = +this.selectMonth + 1 > 12 ? '01' : +this.selectMonth + 1
          this.startDate = `${this.selectYear}-${this.selectMonth}-01`
          this.endDate = `${endYear}-${endMonth}-01`
          this.selectText = `${this.selectYear}年${this.selectMonth}月`
          this.loadTransactionStatics()
        } else if (type === 1) {
          this.selectItem = 1
          this.selectItemText = '季度'
          let now = new Date()
          this.selectYear = now.getFullYear()
          this.selectMonth = now.getMonth()
          this.selectQuarter = parseInt(this.selectMonth / 3) + 1
          this.startDate = `${this.selectYear}-${this.selectQuarter * 3 - 2}-01`
          this.endDate = this.selectQuarter < 4 ? `${this.selectYear}-${+this.selectQuarter * 3 + 1}-01`
                                                : `${+this.selectYear + 1}-01-01`
          this.selectText = `${this.selectYear}第${this.selectQuarter}季度`
          this.loadTransactionStatics()
        } else if (type === 2) {
          this.selectItem = 2
          this.selectItemText = '年度'
          let now = new Date()
          this.selectYear = now.getFullYear()
          this.startDate = `${this.selectYear}-01-01`
          this.endDate = `${+this.selectYear + 1}-01-01`
          this.selectText = `${this.selectYear}年`
          this.loadTransactionStatics()
        } else {}
      },
      prevDate () {   // 日期向前
        if (this.selectItem === 0) {
          this.selectMonth = this.selectMonth > 1 ? this.selectMonth - 1 : 12
          this.selectYear = this.selectMonth === 12 ? this.selectYear - 1 : this.selectYear
          let endYear = +this.selectMonth + 1 > 12 ? this.selectYear + 1 : this.selectYear
          let endMonth = +this.selectMonth + 1 > 12 ? '01' : +this.selectMonth + 1
          this.startDate = `${this.selectYear}-${this.selectMonth}-01`
          this.endDate = `${endYear}-${endMonth}-01`
          this.selectText = `${this.selectYear}年${this.selectMonth}月`
          this.loadTransactionStatics()
        } else if (this.selectItem === 1) {
          this.selectQuarter = this.selectQuarter > 1 ? this.selectQuarter - 1 : 4
          this.selectYear = this.selectQuarter === 4 ? this.selectYear - 1 : this.selectYear
          this.startDate = `${this.selectYear}-${this.selectQuarter * 3 - 2}-01`
          this.endDate = this.selectQuarter < 4 ? `${this.selectYear}-${+this.selectQuarter * 3 + 1}-01`
                                                : `${+this.selectYear + 1}-01-01`
          this.selectText = `${this.selectYear}第${this.selectQuarter}季度`
          this.loadTransactionStatics()
        } else if (this.selectItem === 2) {
          this.selectYear--
          this.startDate = `${this.selectYear}-01-01`
          this.endDate = `${+this.selectYear + 1}-01-01`
          this.selectText = `${this.selectYear}年`
          this.loadTransactionStatics()
        } else {
          this.$store.commit('showToast', '没选item')
        }
      },
      nextDate () {   // 日期向后
        if (this.selectItem === 0) {
          let now = new Date()
          if (now.getMonth() + 1 === this.selectMonth && now.getFullYear() === this.selectYear) {
            this.$store.commit('showToast', '选择的月份不能大于当前月份')
            return
          }
          this.selectMonth = +this.selectMonth + 1 > 12 ? 1 : +this.selectMonth + 1
          this.selectYear = this.selectMonth === 1 ? +this.selectYear + 1 : this.selectYear
          let endYear = +this.selectMonth + 1 > 12 ? this.selectYear + 1 : this.selectYear
          let endMonth = +this.selectMonth + 1 > 12 ? '01' : +this.selectMonth + 1
          this.startDate = `${this.selectYear}-${this.selectMonth}-01`
          this.endDate = `${endYear}-${endMonth}-01`
          this.selectText = `${this.selectYear}年${this.selectMonth}月`
          this.loadTransactionStatics()
        } else if (this.selectItem === 1) {
          let now = new Date()
          if (parseInt(now.getMonth() / 3) + 1 === this.selectQuarter && now.getFullYear() === this.selectYear) {
            this.$store.commit('showToast', '选择的季度不能大于当前季度')
            return
          }
          this.selectQuarter = this.selectQuarter < 4 ? this.selectQuarter + 1 : 1
          this.selectYear = this.selectQuarter === 1 ? this.selectYear + 1 : this.selectYear
          this.startDate = `${this.selectYear}-${this.selectQuarter * 3 - 2}-01`
          this.endDate = this.selectQuarter < 4 ? `${this.selectYear}-${+this.selectQuarter * 3 + 1}-01`
                                                : `${+this.selectYear + 1}-01-01`
          this.selectText = `${this.selectYear}第${this.selectQuarter}季度`
          this.loadTransactionStatics()
        } else if (this.selectItem === 2) {
          if (this.selectYear === (new Date()).getFullYear()) {
            this.$store.commit('showToast', '选择的年份不能大于当前年份')
            return
          }
          this.selectYear++
          this.startDate = `${this.selectYear}-01-01`
          this.endDate = `${+this.selectYear + 1}-01-01`
          this.selectText = `${this.selectYear}年`
          this.loadTransactionStatics()
        } else {
          this.$store.commit('showToast', '没选item')
        }
      }
    }
  }
</script>
