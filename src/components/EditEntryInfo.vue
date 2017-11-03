<!-- EditEntryInfo.vue 编辑资料的页面 -->
<style lang="less" scpoed>
  .edit-data {
    max-width: 750px;
    margin: 0 auto;
    font-size: .28rem;
    color: #505050;
    .data-fill {
      .data-item {
        font-size: .28rem;
        color: #505050;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1rem;
        padding: 0 .2rem;
      }
      .portrait-show {
        width: .8rem;
        height: .8rem;
        background: #ddd;
        border-radius: 50%;
        overflow: hidden;
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
        overflow-x: auto;
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
      .data-mark {
        height: 1rem;
        line-height: 1rem;
        padding: 0 .2rem;
      }
      .mark-input {
        display: block;
        margin: 0 auto;
        width: 6.8rem;
        height: 1.5rem;
        &:focus {
          outline: 0;
        }
      }
    }
  }
  .portrait-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    text-align: center;
    font-size: .26rem;
    .default-portrait {
      max-height: 6rem;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      padding: .2rem;
      box-shadow: 0 0 1px #a0a0a0;
      .def-por-item {
        float: left;
        width: 25%;
        margin: .2rem 0;
      }
      .def-por {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
      }
    }
    .portrait-file {
      position: relative;
      .file-input {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 2;
        opacity: 0;
      }
    }
    .cancel-slide, .portrait-file {
      margin: .2rem auto;
      width: 6rem;
      height: .7rem;
      line-height: .7rem;
      border: 1px solid #ddd;
    }
  }
  .page-foot {
    position: fixed;
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
</style>

<template>
  <div class="edit-data">
    <div class="data-fill">
      <div class="data-item border-bottom" @click="showPortraitSelect=!showPortraitSelect">
        <div class="item-title">头像(必填)：</div>
        <div class="portrait-show">
          <img class="_fullimg" :src="userPortrait" alt="">
        </div>
      </div>
      <div class="data-item border-bottom">
        <div class="item-title">姓名(必填)：</div>
        <input type="text" class="data-input" v-model="playerName" placeholder="请输入您的姓名">
      </div>
      <div class="data-item border-bottom">
        <div class="item-title">球衣号码(最多两位)：</div>
        <input type="number" class="data-input" v-model="playerNumber" placeholder="请输入球衣号码" @input="numberInput">
      </div>
      <div class="data-item border-bottom">
        <div class="item-title">手机号：</div>
        <input type="number" class="data-input" v-model="telephone" placeholder="请输入您的手机号">
      </div>
      <div class="data-item border-bottom">
        <div class="item-title">身份证号：</div>
        <input type="number" class="data-input" v-model="identityNumber" placeholder="请输入您的身份证号码">
      </div>
      <div class="data-item border-bottom">
        <div class="item-title">位置：</div>
        <ul class="position-list">
          <li class="position-item"
              v-for="(item, index) in positions"
              :class="{active: positionType===index}"
              @click.stop="positionType=index">{{item}}</li>
        </ul>
      </div>
      <div v-show="false">
        <div class="data-mark">备注(选填)：</div>
        <textarea class="mark-input" placeholder="点击输入备注" v-model="markMsg"></textarea>
      </div>
    </div>
    <div class="page-foot">
      <div class="apply-btn" @click="submitData">确认提交</div>
    </div>
    <transition name="slidebottom">
      <div class="portrait-select-slide overlay" v-show="showPortraitSelect" @click="showPortraitSelect=false">
        <div class="portrait-container" @click.stop>
          <ul class="default-portrait" @click="showPortraitSelect=false">
            <li class="def-por-item" v-for="item in defaultPortraitList">
              <img class="def-por" :src="item.Portrait" @click="userPortrait=item.Portrait" alt="">
            </li>
          </ul>
          <div class="portrait-file">
            拍照/相册
            <input type="file" id="selectimage" class="file-input" accept="image/*, video/*" @change="fileChange">
          </div>
          <div class="cancel-slide" @click="showPortraitSelect=false">取消</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'EditData',
    data () {
      return {
        userPortrait: 'http://120.24.236.54/uploadfile/standard/Portrait/toux0002.png',
        playerName: '',
        playerNumber: '',
        telephone: '',
        identityNumber: '',
        positionType: -1,
        positions: ['门将', '后卫', '中场', '前锋'],
        markMsg: '',
        showPortraitSelect: false,
        defaultPortraitList: ''
      }
    },
    computed: {
      apiAddress () {
        return this.$store.state.apiAddress
      },
      uid () {
        return this.$store.state.uid
      },
      transData () {
        return this.$store.state.transData
      }
    },
    watch: {
      showPortraitSelect (val, old) {
        if (val && !this.defaultPortraitList) {
          this.loadStardardImageByType()
        }
      }
    },
    mounted () {
      document.title = '填写参赛信息'
      this.$store.commit('setTopBar', false)
      this.$store.commit('setUserList', false)
      this.getPlayerGameInfo()
      if (!this.transData.playerId && !this.transData.gameId && !this.transData.teamId) {   // 如果不是从需求页带数据跳进来的，则回退或者去下载页
        this.$store.commit('showToast', '非正常流程进入此页面，即将跳转')
        setTimeout(() => {
          history.back()
          location.replace('http://www.greenplayer.cn/download/')
        }, 2500)
      }
    },
    methods: {
      loadStardardImageByType () {    // 获取系统默认头像
        let url = `${this.apiAddress}/api/common/loadStardardImageByType.php`
        let param = {
          json: `{"uid":"${this.uid || 250}","ImageType":"0"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.defaultPortraitList = res.data.returndata
          }
        })
      },
      getPlayerGameInfo () {    // 716  获取球员参赛信息
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let paramJson = {
          'method': 'game_player_getPlayerGameInfo',
          'gameId': this.transData.gameId,
          'teamId': this.transData.teamId,
          'playerId': this.transData.playerId,
          'isAssociation': 0
        }
        let param = { json: JSON.stringify(paramJson) }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata
            if (data) {
              this.userPortrait = data.portrait
              this.playerName = data.playerName
              this.playerNumber = +data.playerNumber >= 0 ? data.playerNumber : ''
              this.positionType = this.positions.indexOf(data.position)
              this.telephone = data.telephone
              this.identityNumber = data.cardId
            } else {
              this.loadPlayerAuthenticateInfo()
            }
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      loadPlayerAuthenticateInfo () {   // 571  球员认证信息列表，，如果球员没有赛事信息,加载这个
        let url = `${this.apiAddress}/api/player/loadPlayerAuthenticateInfo.php`
        let param = {
          json: `{"uid":"${this.uid}","playerId":"${this.playerId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata.playerInfo
            if (data) {
              this.userPortrait = data.portrait
              this.playerName = data.playerName
            }
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      fileChange (e) {    // 上传头像文件
        let _vm = this
        this.$store.commit('setLoading', true)
        this.showPortraitSelect = false
        let file = e.target.files || e.srcElement.files
        this.$uploadFile(file, 0, res => {
          _vm.userPortrait = `http://photoes.greenplayer.cn/${res.data.url}!small`
          _vm.$store.commit('setLoading', false)
          document.getElementById('selectimage').value = ''
        }, err => {
          _vm.$store.commit('setLoading', false)
          if (err.code) {
            _vm.$store.commit('showToast', `${err.code}:${err.msg}`)
          } else if (err.data) {
            _vm.$store.commit('showToast', `${err.data.code}:${err.data.msg}`)
          } else {
            _vm.$store.commit('showToast', `上传失败`)
          }
        })
      },
      submitData () {   // 点击提交
        if (!this.userPortrait) {
          this.$store.commit('showToast', '头像不能为空')
          return
        }
        if (!this.playerName) {
          this.$store.commit('showToast', '姓名不能为空')
          return
        }
        this.playerAgreeTeamGameInvite()
      },
      playerAgreeTeamGameInvite () {    // 993 球员同意球队邀请赛事的征战
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let paramJson = {
          'method': 'user_player_playerAgreeTeamGameInvite',
          'uid': this.uid,
          'gameId': this.transData.gameId,
          'teamId': this.transData.teamId,
          'playerId': this.transData.playerId,
          'playerName': this.playerName,
          'portrait': this.userPortrait,
          'playerNumber': this.playerNumber.toString(),
          'position': this.positions[this.positionType],
          'telephone': this.telephone,
          'identityNumber': this.identityNumber
        }
        let param = { json: JSON.stringify(paramJson) }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.$store.commit('showToast', '修改成功，即将返回')
            setTimeout(() => {
              history.back()
            }, 2500)
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      numberInput (e) {   // 控制球衣号码的输入
        if (!(+this.playerNumber)) {
          this.playerNumber = 0
        } else if (+this.playerNumber < 0) {
          this.playerNumber = Math.abs(this.playerNumber)
        } else if (+this.playerNumber > 99) {
          this.playerNumber %= 100
        }
      }
    }
  }
</script>
