<!-- ApplyIntoTeam.vue 申请入队 -->
<style lang="less" scoped>
  .apply-team {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: #282828;
    overflow-x: hidden;
    font-size: .28rem;
    .page-content {
      position: absolute;
      top: 0;
      bottom: 1rem;
      width: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .apply-type {
      width: 100%;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: .3rem;
      padding: 0 .2rem;
      .radio {
        width: .4rem;
        height: .4rem;
        border: 1px solid #a0a0a0;
        border-radius: 50%;
        .radio-sel {
          width: 100%;
          height: 100%;
          background: #32b847;
          border: 2px solid #fff;
          border-radius: 50%;
        }
      }
    }
    .code-title {
      font-size: .24rem;
      color: #646464;
      text-align: center;
      font-weight: normal;
    }
    .invite-code-list {
      display: flex;
      justify-content: space-around;
      padding: .2rem 1rem .4rem;
      .code-input {
        display: block;
        width: .72rem;
        height: .72rem;
        border-radius: 4px;
        border: 1px solid #a0a0a0;
        text-align: center;
      }
    }
    .data-fill {
      padding-left: .3rem;
      .data-item {
        font-size: .28rem;
        color: #505050;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1rem;
        padding-right: .2rem;
      }
      .data-input {
        text-align: right;
        border: 0;
        &:focus {
          outline: 0;
        }
      }
      .position-list {
        flex: 0 0 5.4rem;
        display: flex;
        justify-content: space-between;
        overflow-x: scroll;
        .position-item {
          flex: 0 0 1.1rem;
          height: .44rem;
          line-height: .44rem;
          font-size: .24rem;
          color: #646464;
          text-align: center;
          background: #e6e6e6;
          border-radius: 2px;
          &.active {
            background: #32b847;
            color: #fff;
          }
        }
      }
      .mark-input {
        border: 0;
        width: 6.8rem;
        &:focus {
          outline: 0;
        }
      }
    }
    .question-list {
      padding-left: .4rem;
      .stem {
        padding: .2rem 0;
        color: #505050;
        line-height: .32rem;
      }
      .opt-sel {
        color: #32b847;
        .portrait img {
          border: 1px solid #32b847
        }
      }
      .portrait {
        width: .7rem;
        height: .7rem;
        margin: 0 auto;
      }
      .name {
        font-size: .24rem;
        line-height: .6rem;
        text-align: center;
      }
    }
    .page-foot {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1rem;
      background: #fff;
      z-index: 2;
      padding: .15rem .3rem;
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
      .apply-btn {
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
</style>

<template>
  <div class="apply-team" :style="{top: fromApp ? '0' : '.7rem'}">
    <div class="page-content"> 
      <div class="apply-with-code border-bottom">
        <div class="apply-type" @click.stop="applyType=1">
          <div>邀请码入队</div>
          <div class="radio">
            <div :class="{'radio-sel': applyType===1}"></div>
          </div>
        </div>
        <div v-show="applyType===1">
          <h3 class="code-title">输入四位邀请码</h3>
          <div class="invite-code-list">
            <input type="number" v-model="inviteCode[0]" class="code-input" @keydown="checkInput" @keyup="inputFinish">
            <input type="number" v-model="inviteCode[1]" class="code-input" @keydown="checkInput" @keyup="inputFinish">
            <input type="number" v-model="inviteCode[2]" class="code-input" @keydown="checkInput" @keyup="inputFinish">
            <input type="number" v-model="inviteCode[3]" class="code-input" @keydown="checkInput" @keyup="inputFinish">
          </div>
        </div>
      </div>
      <div class="apply-with-data border-bottom">
        <div class="apply-type border-bottom" @click.stop="applyType=2">
          <div>填写申请入队</div>
          <div class="radio">
            <div :class="{'radio-sel': applyType===2}"></div>
          </div>
        </div>
        <div v-show="applyType===2">
          <div class="data-fill">
            <div class="data-item border-bottom" v-show="false">
              <div class="item-title">姓名(可选)：</div>
              <input type="text" class="data-input" placeholder="请输入您的姓名">
            </div>
            <div class="data-item border-bottom" v-show="false">
              <div class="item-title">手机(可选)：</div>
              <input type="number" class="data-input" placeholder="请输入您的手机号">
            </div>
            <div class="data-item border-bottom" v-show="false">
              <div class="item-title">位置：</div>
              <ul class="position-list">
                <li class="position-item" :class="{active: positionType===1}" @click.stop="positionType=1">门将</li>
                <li class="position-item" :class="{active: positionType===2}" @click.stop="positionType=2">后卫</li>
                <li class="position-item" :class="{active: positionType===3}" @click.stop="positionType=3">中场</li>
                <li class="position-item" :class="{active: positionType===4}" @click.stop="positionType=4">前锋</li>
              </ul>
            </div>
            <div class="data-item">
              <div class="item-title">备注：</div>
            </div>
            <textarea class="mark-input" placeholder="点击输入备注" v-model="markMsg"></textarea>
          </div>
        </div>
      </div>
      <div class="apply-with-self border-bottom" v-show="true">
        <div class="apply-type" @click.stop="applyType=3">
          <div>自助入队</div>
          <div class="radio">
            <div :class="{'radio-sel': applyType===3}"></div>
          </div>
        </div>
        <div v-show="applyType===3">
          <ul class="question-list">
            <li class="question border-bottom" v-if="joinTeamCheckInfo.adminList">
              <p class="stem"  v-if="joinTeamCheckInfo.adminList.length>0">从下方四名用户中选出该球队的管理员(单选)</p>
              <ul class="_clearfix">
                <li class="_left _width25"
                    v-for="opt in joinTeamCheckInfo.adminList"
                    :class="{'opt-sel': +selectUid === +opt.uid}"
                    @click="selectUid = +selectUid === +opt.uid ? '' : opt.uid">
                  <div class="portrait">
                    <img class="_fullimg _border-radius50" :src="opt.portrait" alt="">
                  </div>
                  <div class="name _ellipsis">{{opt.username}}</div>
                </li>
              </ul>
            </li>
            <li class="question border-bottom" v-if="joinTeamCheckInfo.playerList">
              <p class="stem" v-if="joinTeamCheckInfo.playerList.length>0">从下方选项中选出所有属于该球队的球员(多选)</p>
              <ul class="_clearfix">
                <li class="_left _width25"
                    v-for="opt in joinTeamCheckInfo.playerList"
                    :class="{'opt-sel': selectPlayerIds.indexOf(opt.playerId) >= 0}"
                    @click="setSelectPlayerIds(opt.playerId)">
                  <div class="portrait">
                    <img class="_fullimg _border-radius50" :src="opt.portrait" alt="">
                  </div>
                  <div class="name _ellipsis">{{opt.playerName}}</div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="page-foot">
      <div class="apply-btn" @click="applySubmit">确认提交</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ApplyIntoTeam',
    data () {
      return {
        fromApp: this.getQueryString('fromApp'),
        teamId: this.getQueryString('teamId'),
        playerId: this.getQueryString('playerId'),
        applyType: 0,
        positionType: 0,
        inviteCode: [],
        markMsg: '',
        joinTeamCheckInfo: '',
        selectUid: '',
        selectPlayerIds: []
      }
    },
    computed: {
      apiAddress () {
        return this.$store.state.apiAddress
      },
      uid () {
        return this.$store.state.uid || this.getQueryString('uid')
      }
    },
    watch: {
      applyType (val, old) {
        if (+val === 3 && !this.joinTeamCheckInfo) {
          this.getJoinTeamCheckInfo()
        }
      }
    },
    mounted () {
      document.documentElement.style.height = document.body.style.height = document.querySelector('#app').style.height = '100%'
      document.title = '加入球队'
      if (this.fromApp) {
        this.$store.commit('setUserList', false)
        this.$store.commit('setTopBar', false)
        this.loginInApp()
      } else {
        this.$store.commit('setUserList', true)
      }
    },
    methods: {
      loginInApp () {   // app内的用户登录
        let uid = this.getQueryString('uid')
        let token = this.getQueryString('token')
        if (uid && token) {
          let url = `${this.apiAddress}/api/login/loginWithToken.php`
          let param = {
            json: `{"uid":"${uid}","version":"1.0","token":"${token}","source":"wap"}`
          }
          this.$axios.post(url, param).then(res => {
            let data = res.data
            let userinfo = data.userinfo
            if (data.status === 'success') {
              this.$store.commit('setLogined', userinfo)
            } else {
              // this.$store.commit('showToast', data.errMsg)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      checkInput (e) {    // 每个输入框只能输入一个 0~9 的数字
        let target = e.target || e.srcElement
        if (!(+e.key >= 0 && +e.key <= 9) || target.value >= 0) {
          target.value = ''
        }
      },
      inputFinish (e) {   // 控制邀请码输入
        let target = e.target || e.srcElement
        if (target.value === '') {
          return
        }
        let nextSibling = target.nextSibling && target.nextSibling.nextSibling
        if (nextSibling) {
          target.blur()
          nextSibling.focus()
        }
      },
      getJoinTeamCheckInfo () {   // 1003 球员申请获取自主入队提供的信息
        this.joinTeamCheckInfo = ''
        this.selectUid = ''
        this.selectPlayerIds = []
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let data = {
          method: 'team_team_getJoinTeamCheckInfo',
          uid: this.uid || 127,
          teamId: this.teamId
        }
        let param = { json: JSON.stringify(data) }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.joinTeamCheckInfo = res.data.returndata
          }
        })
      },
      setSelectPlayerIds (id) {   // 多选的球员选择控制
        let index = this.selectPlayerIds.indexOf(id)
        if (index >= 0) {
          this.selectPlayerIds.splice(index, 1)
        } else {
          this.selectPlayerIds.push(id)
        }
      },
      sortFormat (a, b) {
        return a - b
      },
      checkTeamInfo () {    // 校验自助入队选择是否正确
        if (!this.selectUid) {
          this.$store.commit('showToast', '请选出该球队管理员')
          return
        }
        if (this.joinTeamCheckInfo.playerList && this.joinTeamCheckInfo.playerList.length > 0 && this.selectPlayerIds.length < 1) {
          this.$store.commit('showToast', '请选出所有该球队的球员')
          return
        }
        let index = this.joinTeamCheckInfo.adminList.map(item => item.uid).indexOf(this.selectUid)
        if (+this.joinTeamCheckInfo.adminList[index].isReally !== 1) {  // 检查所选管理员是否正确
          this.$store.commit('setConfirmShow', true)
          this.$store.commit('setConfirm', {
            confirmText: `所选管理员不是该球队管理员，请重新选择`,
            cancelBtnShow: false,
            ensure: () => {
              this.getJoinTeamCheckInfo()
              this.$store.commit('setConfirmShow', false)
            }
          })
          return
        }
        if (this.joinTeamCheckInfo.playerList && this.joinTeamCheckInfo.playerList.length > 0) {  // 检查所选球员是否正确
          let reallyPlayerIds = this.joinTeamCheckInfo.playerList.filter(item => +item.isReally === 1)
          reallyPlayerIds = reallyPlayerIds.map(item => item.playerId)
          let str1 = JSON.stringify(reallyPlayerIds.sort(this.sortFormat))
          let str2 = JSON.stringify(Array.prototype.slice.call(this.selectPlayerIds.sort(this.sortFormat)))
          if (str1 !== str2) {
            this.$store.commit('setConfirmShow', true)
            this.$store.commit('setConfirm', {
              confirmText: `没有选对所有球队球员，请重新选择`,
              cancelBtnShow: false,
              ensure: () => {
                this.getJoinTeamCheckInfo()
                this.$store.commit('setConfirmShow', false)
              }
            })
            return
          }
        }
        this.joinTeam()
      },
      applySubmit () {    // 提交申请
        if (!this.uid) {
          if (this.fromApp) {
            this.$store.commit('showToast', '验证登录失败')
          }
          this.$store.commit('showLogin')
          return
        }
        if (this.applyType === 1) {
          this.joinTeamApplicationWithInvitationCode()
        } else if (this.applyType === 2) {
          this.joinTeamApplication()
        } else if (this.applyType === 3) {
          this.checkTeamInfo()
        } else {
          this.$store.commit('showToast', '请选择一种入队方式')
        }
      },
      joinTeamApplicationWithInvitationCode () {    // 球队邀请码加入球队
        this.$store.commit('setLoading', true)
        let url = `${this.apiAddress}/api/team/joinTeamApplicationWithInvitationCode.php`
        let param = {
          json: `{"uid":"${this.uid}","playerId":"${this.playerId}","teamId":"${this.teamId}","invitationCode":"${this.inviteCode.join('')}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.$store.commit('setConfirmShow', true)
            this.$store.commit('setConfirm', {
              confirmText: `加入球队成功`,
              cancelBtnShow: false,
              ensure: () => {
                if (this.fromApp) {
                  this.$sendDataToClient({
                    type: 'back'
                  })
                } else {
                  history.back()
                }
                this.$store.commit('setConfirmShow', false)
              }
            })
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.$store.commit('setLoading', false)
        })
      },
      joinTeamApplication () {    // 填写资料申请加入球队
        this.$store.commit('setLoading', true)
        let url = `${this.apiAddress}/api/team/joinTeamApplication.php`
        let param = {
          json: `{"msg":"${this.markMsg}","playerId":"${this.playerId}","teamid":"${this.teamId}","userid":"${this.uid}","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.$store.commit('setConfirmShow', true)
            this.$store.commit('setConfirm', {
              confirmText: `申请成功，请等待球队管理员处理`,
              cancelBtnShow: false,
              ensure: () => {
                if (this.fromApp) {
                  this.$sendDataToClient({
                    type: 'back'
                  })
                } else {
                  history.back()
                }
                this.$store.commit('setConfirmShow', false)
              }
            })
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.$store.commit('setLoading', false)
        })
      },
      joinTeam () {   // 直接入队，在验证自助入队成功后调用
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"team_player_playerJoinTeam","uid":${this.uid},"playerId":${this.playerId},"teamId":"${this.teamId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.$store.commit('setConfirmShow', true)
            this.$store.commit('setConfirm', {
              confirmText: `加入球队成功`,
              cancelBtnShow: false,
              ensure: () => {
                if (this.fromApp) {
                  this.$sendDataToClient({
                    type: 'back'
                  })
                } else {
                  history.back()
                }
                this.$store.commit('setConfirmShow', false)
              }
            })
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.$store.commit('setLoading', false)
        })
      }
    }
  }
</script>
