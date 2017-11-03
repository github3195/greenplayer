<!-- 竞猜，预测比赛 -->
<style lang="less" scoped>
  .prediction-match {
    font-size: .32rem;
    .prediction-match-container {
      position: relative;
      .section-title {
        padding-left: .2rem;
        height: .6rem;
        line-height: .6rem;
        font-size: .26rem;
        color: #282828;
        background: #f0f0f0;
      }
      .prediction-status {  // 竞猜状态
        width: 100%;
        padding-top: .3rem;
        overflow: hidden;
        .prediction-section {
          display: flex;
          padding: .1rem;
          overflow-x: auto;
          .prediction-option {
            flex: 1;
            flex-shrink: 0;
            padding: 0 .05rem;
            .option-container {
              width: 1.35rem;
              margin: 0 auto;
              .jackpot-ball {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 1.35rem;
                height: 1.35rem;
                font-size: .22rem;
                color: #646464;
                text-align: center;
                overflow: hidden;
                border: 1px solid #dcdcdc;
                border-radius: 50%;
                .jackpot-content {
                  p {
                    display: flex;
                    align-items: center;
                    height: .34rem;
                    line-height: .34rem;
                  }
                }
                .jackpot-percent {
                  position: absolute;
                  z-index: -2;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  height: 0;
                  background: #32b847;
                  &.statusGray {
                    background: #c8c8c8;
                  }
                }
              }
              .odds {
                margin-top: .2rem;
                text-align: center;
                font-size: .22rem;
                color: #646464;
              }
              .prediction-item {
                margin: .2rem auto 0;
                width: 1rem;
                height: .4rem;
                line-height: .4rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: .22rem;
                text-align: center;
                color: #fff;
                background: #32b847;
                border-radius: 3px;
                white-space: pre;
                &.statusGray {
                  background: #c8c8c8;
                }
              }
            }
          }
        }
        .prediction-explain {
          font-size: .24rem;
          color: #282828;
          padding: .5rem .2rem .3rem;
        }
      }
      .change-tab {   // 切换查看
        padding: .2rem;
        background: #f0f0f0;
        .desc {
          float: left;
          width: 70%;
          font-size: .28rem;
          color: #282828;
        }
        .action {
          float: right;
          width: 30%;
          text-align: right;
          font-size: .22rem;
          a {
            color: #32b847;
          }
        }
      }
      .prediction-record {  // 竞猜记录
        .record-container {
          text-align: center;
          .record-list {
            padding: 0 .2rem;
            .record-item {
              position: relative;
              height: 1.1rem;
              line-height: 1.1rem;
              font-size: .28rem;
              color: #282828;
              display: flex;
              width: 100%;
              align-items: center;
              &::after {
                position: absolute;
                content: '';
                display: block;
                bottom: 0;
                left: 0;
                right: 0;
                height: 1px;
                background: #c8c8c8;
                transform: scaleY(0.5);
              }
              &.count {
                color: #36c94d;
                height: .9rem;
                line-height: .9rem;
                &::after {
                  height: 0;
                }
              }
              p {
                flex: 0 0 25%;
                display: flex;
                align-items: center;
                justify-content: center;
                white-space: pre;
              }
              &.result {
                p {
                  flex: 0 0 35%;
                  &:first-child {
                    flex: 0 0 25%;
                  }
                }
              }
              .Additional-btn {
                display: inline-block;
                height: .5rem;
                width: 1.2rem;
                line-height: .5rem;
                border-radius: 4px;
                background: #32b847;
                color: #fff;
                &.statusGray {
                  background: #a0a0a0;
                }
              }
            }
          }
          .record-count {
            font-size: .28rem;
            color: #282828;
            text-align: right;
            padding: .2rem;
          }
        }
        .not-participate {
          text-align: center;
          font-size: .28rem;
          color: #282828;
          height: 1rem;
          line-height: 1rem;
        }
      }
      .prediction-result {  // 获奖名单
        .result-container {
          .winning-list {
            padding: 0 .2rem;
            .winning-item {
              margin: .2rem 0;
              .winning-detail {
                height: .6rem;
                line-height: .6rem;
                font-size: .24rem;
                color: #282828;
                &.list-index {
                  width: .6rem;
                  text-align: right;
                  font-size: .24rem;
                  padding-right: .2rem;
                }
                &.user-portrait {
                  width: .6rem;
                  background: #ccc;
                  border-radius: 50%;
                }
                &.username {
                  padding-left: .2rem;
                  width: 3rem;
                }
                &.get {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  max-width: 2.6rem;
                  min-width: 2.4rem;
                  padding-left: .1rem;
                  box-sizing: border-box;
                  span {
                    display: flex;
                    align-items: center;
                  }
                }
              }
              // &:nth-child(1) .winning-detail.list-index {
              //   color: #32b847;
              // }
              // &:nth-child(2) .winning-detail.list-index {
              //   color: #32b847;
              // }
              // &:nth-child(3) .winning-detail.list-index {
              //   color: #32b847;
              // }
            }
          }
        }
      }
    }
    .prediction-confirm {   // 确认弹窗
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 22;
      .confirm-container {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        margin: auto;
        transform: translateY(-50%);
        width: 5.5rem;
        // height: 6.5rem;
        background: #fff;
        border-radius: 12px;
        &.simple {
          // height: 2.5rem;
        }
        .confirm-info {
          padding: .25rem;
          .info-container {
            font-size: .3rem;
            color: #282828;
            .info-item {
              height: .52rem;
              line-height: .52rem;
              font-size: 0;
              p {
                font-size: .3rem;
              }
              .num-qb {
                display: inline-block;
                width: 2.2rem;
                height: .52rem;
                border: 1px solid #a0a0a0;
                border-radius: 6px;
                color: #282828;
                padding-left: .2rem;
                box-sizing: border-box;
                box-sizing: border-box;
                vertical-align: bottom;
                position: relative;
              }
            }
            .useable-qb {
              font-size: .22rem;
              span {
                color: #32b847;
              }
            }
            .rule-title {
              font-size: .26rem;
              color: #282828;
              font-weight: normal;
              text-align: center;
              margin: .2rem 0;
            }
            .rule-content {
              font-size: .22rem;
              width: 100%;
              height: 3rem;
              line-height: .4rem;
              overflow-y: auto;
            }
          }
        }
        .confirm-btn {
          position: relative;
          &::before {
            content: '';
            display: block;
            width: 100%;
            height: 0;
            border-top: 1px dashed #282828;
            transform: scaleY(0.5);
          }
          .btn-container {
            padding: .3rem 0;
            display: flex;
            justify-content: space-around;
            .btn {
              display: block;
              width: 1.6rem;
              height: .54rem;
              line-height: .54rem;
              border-radius: 6px;
              text-align: center;
              font-size: .3rem;
              box-sizing: border-box;
              &.cancel {
                color: #32b847;
                border: 1px solid #66d993;
              }
              &.ensure {
                color: #fff;
                background: #32b847;
              }
            }
          }
        }
      }
    }
    .fadein-enter-active, .fadein-leave-active {
      transition: all .3s;
    }
    .fadein-enter, .fadein-leave-active {
      opacity: 0;
    }
    .bill-icon {
      width: .2rem;
      height: .2rem;
      margin-right: .05rem;
      margin-top: -.08rem;
      vertical-align: middle;
    }
  }
</style>

<template>
  <div class="prediction-match">
    <div class="prediction-match-container">
      <!-- 竞猜状态 -->
      <div class="prediction-status">
        <ul class="prediction-section">
          <li class="prediction-option" v-for="(item, index) in quizDetailInfo.quizItemInfo">
            <div class="option-container" @click="showConfirm(index)">
              <div class="jackpot-ball">
                <div class="jackpot-content">
                  <p class="_ellipsis" v-if="+launcherType===0"><img class="bill-icon" src="http://share.greenplayer.cn/share/img/icon/bill-icon.png" alt="">{{parseInt(item.itemBill)}}</p>
                  <p class="_ellipsis" v-else>{{item.userNum}}人</p>
                </div>
                <div class="jackpot-percent" :style="{height: quizPercent(item.userNum, item.itemBill)}" :class="{'statusGray': +quizDetailInfo.status>=3 && !(+quizDetailInfo.finalItem-index===0)}"></div>
              </div>
              <p class="_ellipsis odds" v-if="+launcherType===0">1：{{item.odds}}</p>
              <div class="prediction-item _ellipsis" :class="{'statusGray': +quizDetailInfo.status>=3 && !(+quizDetailInfo.finalItem-index===0)}">{{quizItem[index-1]}}</div>
            </div>
          </li>
        </ul>
        <p class="prediction-explain">说明：净胜球3球及以上为大胜，净胜球1-2球为小胜</p>
      </div>
      <!-- 我的竞猜记录 -->
      <div class="prediction-record">
        <div class="change-tab _clearfix">
          <p class="desc">我的竞猜</p>
        </div>
        <!-- 个人竞猜记录 -->
        <div v-if="selfQuizInfo.length > 0">
          <div class="record-container" v-if="quizDetailInfo.status<2">
            <ul class="record-list">
              <li class="_clearfix record-item" v-for="(item, index) in selfQuizInfo">
                <p class="_left _width25 _ellipsis">{{quizItem[+item.itemId-1]}}</p>
                <p class="_left _width25 _ellipsis" v-if="+launcherType===0"><img class="bill-icon" src="http://share.greenplayer.cn/share/img/icon/bill-icon.png" alt="">{{item.itemBill}}</p>
                <p class="_left _width25 _ellipsis" v-if="+launcherType===0">1：{{changeTwoDecimal(item.odds)}}</p>
                <p class="_left _width25 _ellipsis" v-if="+launcherType===0">
                  <a class="Additional-btn" :class="{statusGray: +quizDetailInfo.status>=3 || !canAdditional}" href="javascript:;" @click="showConfirm(+item. itemId)">追加</a>
                </p>
                <p class="_left _width75 _ellipsis" v-else>1票</p>
              </li>
            </ul>
            <p class="record-count" v-if="+launcherType===0">合计：<img class="bill-icon" src="http://share.greenplayer.cn/share/img/icon/bill-icon.png" alt="">{{getSelfUseBill}}</p>
          </div>
          <div class="record-container" v-else>
            <ul class="record-list">
              <li class="_clearfix record-item result" v-for="(item, index) in selfQuizInfo">
                <p class="_left _width33 _ellipsis">{{quizItem[+item.itemId-1]}}</p>
                <p class="_left _width33 _ellipsis">使用：<img class="bill-icon" src="http://share.greenplayer.cn/share/img/icon/bill-icon.png" alt="">{{+item.itemBill}}</p>
                <p class="_left _width33 _ellipsis">获得：<img class="bill-icon" src="http://share.greenplayer.cn/share/img/icon/bill-icon.png" alt="">{{getGetBill(item.itemId, item.itemBill, item.odds)}}</p>
              </li>
              <li class="_clearfix record-item count result">
                <p class="_left _width33 _ellipsis">&nbsp</p>
                <p class="_left _width33 _ellipsis">使用：<img class="bill-icon" src="http://share.greenplayer.cn/share/img/icon/content_shouye_qiubi_nor@3x.png" alt="">{{getSelfUseBill}}</p>
                <p class="_left _width33 _ellipsis">获得：<img class="bill-icon" src="http://share.greenplayer.cn/share/img/icon/content_shouye_qiubi_nor@3x.png" alt="">{{changeTwoDecimal(totalGetBill)}}</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 未参与时显示 -->
        <div v-else class="not-participate">
          未参与
        </div>
      </div>
      <!-- 获奖名单 -->
      <div class="prediction-result" v-if="quizDetailInfo.status>2">
        <div class="change-tab _clearfix">
          <p class="desc">获奖名单</p>
        </div>
        <div class="result-container">
          <ul class="winning-list">
            <li class="winning-item _clearfix" v-for="(item, index) in finalAwardPlayerList">
              <p class="winning-detail list-index _left _ellipsis">{{index+1}}</p>
              <p class="winning-detail _ellipsis _left user-portrait">
                <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
              </p>
              <p class="winning-detail _ellipsis _left username">{{item.username}}</p>
              <!-- <p class="winning-detail _ellipsis _left bet">使用球币：{{+item.billTotal}}</p> -->
              <p class="winning-detail _ellipsis _right get"><span>获得：<img class="bill-icon" src="http://share.greenplayer.cn/share/img/icon/bill-icon.png" alt=""></span>{{changeTwoDecimal(+item.awardBillTotal)}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="overlay" v-show="isConfirmShow || isSimpleConfirmShow"></div>
    <!-- 使用球币的弹窗 -->
    <transition name="fadein" mode="in-out">
      <div class="prediction-confirm" v-show="isConfirmShow" @click="hideConfirm" @touchmove.stop>
        <div class="confirm-container" @click.stop>
          <div class="confirm-info">
            <div class="info-container">
              <div class="info-item _clearfix">
                <p class="_left _width50">您的选择：</p>
                <p class="_left _width50 _txt-right">{{selectItemText}}</p>
              </div>
              <div class="info-item _clearfix">
                <p class="_left _width50">使用球币：</p>
                <p class="_left _width50 _txt-right"><input class="num-qb" placeholder="请输入球币数" type="number" v-model="billNumber"></p>
              </div>
              <p class="useable-qb">可使用球币：<span>{{(+userBill).toFixed(2)}}</span></p>
              <h3 class="rule-title">——竞猜说明——</h3>
              <div class="rule-content">
                <p>1. 本竞猜以球赛的常规时间（包含伤停补时）为准，不计加时赛和点球大战成绩；</p>
                <p>2. 本竞猜所设奖项为用户之间的游戏行为，所有用户使用的球币自动形成奖池。猜中者按比例分享奖池中的球币，若无人猜中，则该次竞猜奖池中的球币将自动滚存，并用于后期竞猜场次的奖励；</p>
                <p>3. 本竞猜按用户参与情况动态计算各项比率，最终在比赛开始前锁定；</p>
                <p>4. 对于赛事发生场地变更，延期，弃赛等不可控因素，该竞猜将自动失效并将所使用球币返还用户；</p>
                <p>5. 绿茵场平台对本竞猜规则拥有最终解释权。</p>
              </div>
            </div>
          </div>
          <div class="confirm-btn">
            <div class="btn-container">
              <a class="btn cancel" href="javascript:;" @click="hideConfirm">取消</a>
              <a class="btn ensure" href="javascript:;" @click="confirmQuiz">确认</a>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 不使用球币的普通弹窗 -->
    <transition name="fadein" mode="in-out">
      <div class="prediction-confirm" v-show="isSimpleConfirmShow" @click="hideConfirm">
        <div class="confirm-container simple" @click.stop @touchmove.prevent>
          <div class="confirm-info">
            <div class="info-container">
              <div class="info-item _clearfix">
                <p class="_left _width50">您的选择：</p>
                <p class="_left _width50 _txt-right">{{selectItemText}}</p>
              </div>
            </div>
          </div>
          <div class="confirm-btn">
            <div class="btn-container">
              <a class="btn cancel" href="javascript:;" @click="hideConfirm">取消</a>
              <a class="btn ensure" href="javascript:;" @click="confirmQuiz">确认</a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        quizItem: ['主大胜', '主小胜', '平    局', '客大胜', '客小胜'],
        billNumber: '',
        isConfirmShow: false,
        isSimpleConfirmShow: false,
        selectQuizItem: '',
        selectItemText: '',
        showTabList: this.quizDetailInfo.status <= 2 ? 1 : 2,
        launcherType: this.quizDetailInfo.launcherType,   // 竞猜的类型，0可以投球币，1仅仅是支持
        selfQuizInfo: [],
        canAdditional: true,
        finalAwardPlayerList: [],
        quizing: false,    // 正在下注，防止重复点击
        totalGetBill: 0,    // 获得的球币总数
        userBill: '0.00'    // 用户可用球币数量
      }
    },
    props: {
      quizDetailInfo: '',
      matchId: '',
      quizId: '',
      userId: '',
      matchTime: ''
    },
    computed: {
      isLoginShow () { return this.$store.state.isLoginShow },
      uid () { return this.$store.state.uid || this.getQueryString('uid') },
      playerId () {
        let playerId = this.getQueryString('playerId')
        if (!playerId || playerId === 'null') {
          return this.$store.state.uid ? this.$store.state.uid : this.getQueryString('uid')
        }
        return playerId
      },
      apiAddress () {
        return this.$store.state.apiAddress
      },
      getSelfUseBill () {   // 获取个人下注总计
        let r = 0
        this.selfQuizInfo.forEach((item, i) => {
          r += parseFloat(item.itemBill)
        })
        return r
      }
    },
    mounted () {
      // this.getUserBill()
      if (this.quizDetailInfo.status > 2) {  // 如果竞猜结果出了，加载竞猜获奖名单
        this.getFinalAwardPlayerList()
      }
      if (this.uid) {
        this.loadSelfQuizInfo()
        this.getUserBill()
      }
      // 对调下客小胜和客大胜的位置，后台给的数组是 4是客大胜， 5是客小胜，前端要客小胜显示在前
      let node = document.querySelectorAll('.prediction-option')[3]
      let container = document.querySelector('.prediction-section')
      container.appendChild(node)
    },
    watch: {
      uid (val, oldVal) {
        if (val) {  // uid有值的时候
          this.loadSelfQuizInfo()
          this.getUserBill()
        } else {
          this.selfQuizInfo = []
          this.userBill = 0
        }
      }
    },
    methods: {
      getFinalAwardPlayerList () {   // 加载最终获奖名单
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: '{"method":"match_quiz_getFinalAwardPlayerList","quizId":' + this.quizId + ',"matchId":' + this.matchId + '}'
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.finalAwardPlayerList = res.data.returndata
          } else {
            // this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      quizPercent (userNum, bill) {   // 计算竞猜项目占比
        if (+this.launcherType === 0) {
          return (bill / this.quizDetailInfo.totalBill * 100) + '%'
        } else if (+this.launcherType === 1) {
          return (userNum / this.quizDetailInfo.totalUserNum * 100) + '%'
        }
      },
      showConfirm (item) {  // 根据当前竞猜状态及登录状态判断是否显示下注弹窗
        this.selectQuizItem = item
        this.selectItemText = this.quizItem[+item - 1]
        if (!this.canAdditional) {
          this.$store.commit('showToast', `您的投注额度 ${this.quizDetailInfo.topBetAmount} 已用完`)
          return false
        }
        if (+this.quizDetailInfo.status === 2) {   // 状态=2 竞猜停止，结果未知
          this.$store.commit('showToast', '本场竞猜已停止')
          return false
        } else if (+this.quizDetailInfo.status === 3) {   // 状态=3，竞猜结果揭晓
          this.$store.commit('showToast', '本场竞猜已结束')
          return false
        } else if (+this.quizDetailInfo.status === 4) {   // 状态=4，竞猜失效
          this.$store.commit('showToast', '本场竞猜已失效')
          return false
        } else if (+this.quizDetailInfo.status === 1 || +this.quizDetailInfo.status === 0) {   // 状态=1，竞猜进行中
          let matchTime = new Date(this.matchTime.replace(/-/g, '/'))
          let now = new Date()
          if (now > matchTime) {    // 如果比赛已经开始，不让下注
            this.$store.commit('showToast', '比赛已经开始，不能下注了~')
            return
          }
          if (+this.uid > 0) {
            if (+this.launcherType === 0) {
              this.isConfirmShow = true
            } else if (+this.launcherType === 1) {
              this.billNumber = 0
              this.isSimpleConfirmShow = true
            }
          } else {
            if (this.getQueryString('fromApp')) {
              // this.$store.commit('showToast', '请登录后再参与~~')
              let sendData = {
                type: 'goLogin'
              }
              if (this.$sendDataToClient(sendData)) {
                return
              }
            }
            this.$store.commit('showLogin')
          }
        } else {
          this.$store.commit('showToast', '未知状态')
        }
      },
      hideConfirm () {  // 隐藏下注弹窗
        this.isConfirmShow = false
        this.isSimpleConfirmShow = false
      },
      loadQuizDetailInfo () {   // 加载竞猜详情
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: '{"method":"match_quiz_loadQuizDetailInfo","quizId":' + this.quizId + ',"matchId":' + this.matchId + '}'
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.quizDetailInfo = res.data.returndata
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadSelfQuizInfo () {   // 加载个人竞猜记录
        let uid = this.playerId || this.uid || this.getQueryString('uid')
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: '{"method":"match_quiz_getSelfQuizInfo","playerId":' + uid + ',"quizId":' + this.quizId + ',"matchId":' + this.matchId + '}'
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.selfQuizInfo = res.data.returndata.filter(item => {    // 过滤掉itemid=0的记录，后台逻辑加上的（邀请竞猜）
              return +item.itemId > 0
            })
            this.selfQuizInfo = this.selfQuizInfo.sort((a, b) => {
              if ((+a.itemId === 4 && +b.itemId === 5) || (+a.itemId === 5 && +b.itemId === 4)) {
                return b.itemId - a.itemId
              }
              return a.itemId - b.itemId
            })
            this.compareUseBill()
          } else {
            // this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      confirmQuiz (e) {  // 确认下注
        if (this.quizing) {
          this.$store.commit('showToast', '正在下注，请稍后')
          return false
        }
        if (this.launcherType === '0' && this.billNumber === '') {
          this.$store.commit('showToast', '请输入您要使用的球币(可为0)')
          return false
        }
        if (this.launcherType === '0' && (+this.billNumber < 0 || isNaN(+this.billNumber))) {
          this.$store.commit('showToast', '请输入正确的球币数量，最小为 0 球币')
          return false
        }
        if (this.launcherType === '0' && this.billNumber % 1 !== 0) {
          this.$store.commit('showToast', '投注最小单位为 1 球币，请不要输入小数')
          return false
        }
        if (this.launcherType === '0' && +this.billNumber > +this.userBill) {
          this.$store.commit('showToast', '您的球币不足')
          return false
        }
        let matchTime = new Date(this.matchTime.replace(/-/g, '/'))
        let now = new Date()
        if (now > matchTime) {    // 如果比赛已经开始，不让下注
          this.$store.commit('showToast', '比赛已经开始，不能下注了~')
          return
        }
        this.quizing = true
        let uid = this.uid
        let playerId = this.playerId || this.uid
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: '{"method":"match_quiz_addQuizOfPlayer","uid":"' + uid + '","playerId":"' + playerId + '","quizId":' + this.quizId + ',"quizItem":' + this.selectQuizItem + ',"betAmount":' + this.billNumber + '}'
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.$store.commit('showToast', '参与成功')
            this.loadSelfQuizInfo()   // 加载最新个人参与情况
            this.loadQuizDetailInfo()   // 下注成功后加载最新状态
            this.hideConfirm()
            this.userBill = +(this.userBill - this.billNumber).toFixed(2)
            this.billNumber = ''
            this.quizing = false
            this.compareUseBill()
          } else {
            this.$store.commit('showToast', res.data.errMsg)
            this.loadSelfQuizInfo()   // 加载最新个人参与情况
            this.quizing = false
            this.compareUseBill()
          }
        }).catch(err => {
          console.log(err)
          this.quizing = false
        })
      },
      compareUseBill () {   // 判断用户使用的球币是否超过限额
        if (this.getSelfUseBill >= this.quizDetailInfo.topBetAmount) {
          this.canAdditional = false   // 超过竞猜限额，不可继续投注
        }
      },
      getGetBill (itemId, itemBill, odds) {   // 竞猜结束后获得的球币
        if (+this.quizDetailInfo.finalItem !== +itemId) {
          return 0
        } else if (+this.quizDetailInfo.finalItem === +itemId) {
          this.totalGetBill = itemBill * odds
          return +(itemBill * odds).toFixed(2)
        }
      },
      getUserBill () {    // 获取用户可用球币
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let playerId = this.playerId || this.uid
        let param = {
          json: '{"method":"mall_ballbill_getTotalBallBillOfUser","playerId":"' + playerId + '"}'
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.userBill = (+res.data.returndata.totalBill).toFixed(2)
          } else {
            // this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      changeTwoDecimal (x) {    // 把数字转化为小数点后两位
        var fx = parseFloat(x)
        if (isNaN(fx)) {
          return 0
        }
        fx = Math.round(x * 100) / 100
        var sx = fx.toString()
        var posDecimal = sx.indexOf('.')
        if (posDecimal < 0) {
          posDecimal = sx.length
          sx += '.'
        }
        while (sx.length <= posDecimal + 2) {
          sx += '0'
        }
        return sx
      }
    }
  }
</script>
