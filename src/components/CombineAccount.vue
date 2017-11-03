<!-- CombineAccount.vue 合并账号 -->
<style lang="less" scoped>
  .combine-account {
    font-size: .26rem;
    color: #282828;
    .userinfo-container {
      text-align: center;
      padding: .3rem 0;
      .user-portrait {
        margin: 0 auto;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        overflow: hidden;
      }
      .user-name {
        margin: .2rem 0;
        line-height: .3rem;
      }
      .check-acount {}
    }
    .identity-container {
      .identity {
        display: flex;
        align-items: center;
        padding: .15rem .2rem;
      }
      .identity-portrait {
        margin-right: .1rem;
        flex: 0 0 .8rem;
        height: .8rem;
        border-radius: 50%;
        overflow: hidden;
      }
      .identity-info {
        flex: 1;
        overflow: hidden;
        .identity-name {
          line-height: .5rem;
        }
      }
    }
    .check-container {
      display: flex;
      align-items: center;
      &.center {
        justify-content: center;
      }
      .check-btn {
        flex: 0 0 .32rem;
        height: .32rem;
        border-radius: 50%;
        margin: 0 .1rem;
        background-image: url(//share.greenplayer.cn/share/img/icon/content_tingsai_xuanze_off@2x.png);
        background-size: 100% 100%;
        &.on {
          background-image: url(//share.greenplayer.cn/share/img/icon/content_tingsai_xuanze_on@2x.png);
        }
      }
      .check-text {
        color: #646464;
        font-size: .18rem;
      }
    }
    .tip {
      height: .6rem;
      line-height: .6rem;
      background: #f0f0f0;
      text-align: center;
    }
  }
</style>

<template>
  <div class="combine-account">
    <div v-if="accountA.userInfo || accountB.userInfo">
      <div class="userinfo-container">
        <!-- <div class="tip">选择一个主账号</div> -->
        <div class="userinfos _clearfix center-line">
          <div class="userinfo _left _width50" @click.stop="mainUid=uids[0]">
            <div class="user-portrait">
              <img class="_fullimg" :src="accountA.userInfo.portrait" alt="">
            </div>
            <div class="user-name _ellipsis">{{accountA.userInfo.username}}</div>
            <div class="check-container center">
              <div class="check-btn" :class="{'on': +mainUid===+uids[0]}"></div>
              <p class="check-text">合并到此账号</p>
            </div>
          </div>
          <div class="userinfo _right _width50" @click.stop="mainUid=uids[1]">
            <div class="user-portrait">
              <img class="_fullimg" :src="accountB.userInfo.portrait" alt="">
            </div>
            <div class="user-name _ellipsis">{{accountB.userInfo.username}}</div>
            <div class="check-container center">
              <div class="check-btn" :class="{'on': +mainUid===+uids[1]}"></div>
              <p class="check-text">合并到此账号</p>
            </div>
          </div>
        </div>
      </div>
      <div class="identity-container">
        <div class="tip" v-if="accountA.refereeList.length>0 || accountB.refereeList.length>0">裁判（只能保留一个）</div>
        <div class="identitys referee _clearfix center-line">
          <div class="_left _width50">
            <div class="identity" v-for="item in accountA.refereeList" @click.stop="refereeId=item.id">
              <div class="identity-portrait">
                <img class="_fullimg" :src="item.portrait" alt="">
              </div>
              <div class="identity-info">
                <div class="identity-name _ellipsis">{{item.refereeName}}</div>
                <div class="check-container">
                  <p class="check-text">保留此裁判</p>
                  <div class="check-btn" :class="{'on':+refereeId===+item.id}"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="_right _width50">
            <div class="identity" v-for="item in accountB.refereeList" @click.stop="refereeId=item.id">
              <div class="identity-portrait">
                <img class="_fullimg" :src="item.portrait" alt="">
              </div>
              <div class="identity-info">
                <div class="identity-name _ellipsis">{{item.refereeName}}</div>
                <div class="check-container">
                  <p class="check-text">保留此裁判</p>
                  <div class="check-btn" :class="{'on':+refereeId===+item.id}"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tip" v-if="accountA.coachList.length>0 || accountB.coachList.length>0">教练（只能保留一个）</div>
        <div class="identitys coach _clearfix center-line">
          <div class="_left _width50">
            <div class="identity" v-for="item in accountA.coachList" @click.stop="coachId=item.id">
              <div class="identity-portrait">
                <img class="_fullimg" :src="item.portrait" alt="">
              </div>
              <div class="identity-info">
                <div class="identity-name _ellipsis">{{item.coachName}}</div>
                <div class="check-container">
                  <p class="check-text">保留此教练</p>
                  <div class="check-btn" :class="{'on': +coachId===+item.id}"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="_right _width50">
            <div class="identity" v-for="item in accountB.coachList" @click.stop="coachId=item.id">
              <div class="identity-portrait">
                <img class="_fullimg" :src="item.portrait" alt="">
              </div>
              <div class="identity-info">
                <div class="identity-name _ellipsis">{{item.coachName}}</div>
                <div class="check-container">
                  <p class="check-text">保留此教练</p>
                  <div class="check-btn" :class="{'on': +coachId===+item.id}"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tip" v-if="accountA.players.length>0 || accountB.players.length>0">球员</div>
        <div class="identitys _clearfix center-line">
          <div class="_left _width50">
            <div class="identity" v-for="item in accountA.players">
              <div class="identity-portrait">
                <img class="_fullimg" :src="item.playerPortrait" alt="">
              </div>
              <div class="identity-info">
                <div class="identity-name">{{item.playerName}}</div>
              </div>
            </div>
          </div>
          <div class="_right _width50">
            <div class="identity" v-for="item in accountB.players">
              <div class="identity-portrait">
                <img class="_fullimg" :src="item.playerPortrait" alt="">
              </div>
              <div class="identity-info">
                <div class="identity-name">{{item.playerName}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="tip" v-if="accountA.teams.length>0 || accountB.teams.length>0">球队</div>
        <div class="identitys _clearfix center-line">
          <div class="_left _width50">
            <div class="identity" v-for="item in accountA.teams">
              <div class="identity-portrait">
                <img class="_fullimg" :src="item.portrait" alt="">
              </div>
              <div class="identity-info">
                <div class="identity-name">{{item.teamname}}</div>
              </div>
            </div>
          </div>
          <div class="_right _width50">
            <div class="identity" v-for="item in accountB.teams">
              <div class="identity-portrait">
                <img class="_fullimg" :src="item.portrait" alt="">
              </div>
              <div class="identity-info">
                <div class="identity-name">{{item.teamname}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="tip" v-if="accountA.associations.length>0 || accountB.associations.length>0">协会</div>
        <div class="identitys _clearfix center-line">
          <div class="_left _width50">
            <div class="identity" v-for="item in accountA.associations">
              <div class="identity-portrait">
                <img class="_fullimg" :src="item.icon" alt="">
              </div>
              <div class="identity-info">
                <div class="identity-name">{{item.name}}</div>
              </div>
            </div>
          </div>
          <div class="_right _width50">
            <div class="identity" v-for="item in accountB.associations">
              <div class="identity-portrait">
                <img class="_fullimg" :src="item.icon" alt="">
              </div>
              <div class="identity-info">
                <div class="identity-name">{{item.name}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <bottom-button :buttonText="'确认合并'" @bindClick="combineSubmit"></bottom-button>
    </div>
  </div>
</template>

<script>
  import BottomButton from '@/components/common/BottomButton'

  export default {
    name: 'CombineAccount',
    data () {
      return {
        uids: '',
        accountA: '',
        accountB: '',
        mainUid: '',
        sourceUid: '',
        coachId: '',
        refereeId: ''
      }
    },
    computed: {
      clientData () {
        return this.$store.state.clientData
      },
      apiAddress () {
        return this.$store.state.apiAddress
      }
    },
    watch: {
      clientData (val, old) {
        if (val) {
          this.uids = val.uids
                    ? val.uids
                    : JSON.parse(val).uids
                    ? JSON.parse(val).uids
                    : JSON.parse(JSON.parse(val)).uids
          this.$store.commit('setLoading', true)
          this.loadAllMyRoles(this.uids[0], 0)
          this.loadAllMyRoles(this.uids[1], 1)
        }
      }
    },
    mounted () {
      document.title = '用户账号合并'
      this.$store.commit('setUserList', false)
      this.$store.commit('setTopBar', false)
      this.$sendDataToClient({
        type: 'getDataFromClient',
        contentType: 'uidsForCombine'
      })
    },
    methods: {
      loadAllMyRoles (uid, index) {
        let url = `${this.apiAddress}/api/common/loadAllMyRoles.php`  // 269 【角色切换】显示自己的球队和比赛
        let param = {
          json: `{"uid":"${uid}","opeUid":"${uid}","token":""}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            if (+index === 0) {
              this.accountA = res.data.returndata
            } else if (+index === 1) {
              this.accountB = res.data.returndata
            }
          }
          this.$store.commit('setLoading', false)
        })
      },
      combineSubmit () {
        if (!this.mainUid) {
          this.$store.commit('showToast', '请选择一个要并入的账号')
          return
        } else {
          this.sourceUid = +this.mainUid === +this.uids[0]
                         ? this.uids[1]
                         : +this.mainUid === +this.uids[1]
                         ? this.uids[0]
                         : ''
        }
        if (!this.mainUid || !this.sourceUid) {
          this.$store.commit('showToast', '需要两个uid')
          return
        }
        if ((this.accountA.refereeList.length > 0 || this.accountB.refereeList.length > 0) && !this.refereeId) {
          this.$store.commit('showToast', '您的身份中有裁判，请选择要保留的裁判')
          return
        }
        if ((this.accountA.coachList.length > 0 || this.accountB.coachList.length > 0) && !this.coachId) {
          this.$store.commit('showToast', '您的身份中有教练，请选择要保留的教练')
          return
        }
        let data = {
          method: 'user_user_combineUser',
          uid: this.mainUid,    // 合并保留账号uid
          sourceUid: this.sourceUid,    // 被合并的uid
          coachId: this.coachId,    // 保留的教练ID  没有为空
          refereeId: this.refereeId   // 保留的裁判ID  没有为空
        }
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`    // 1001 合并用户 (手机和第三方（微信QQ微博）)
        let param = { json: JSON.stringify(data) }
        this.$store.commit('setLoading', true)
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let status = +this.mainUid === +this.uids[0]
                       ? 'combineToThisAccount'
                       : 'combineToOtherAccount'
            let confirmText = +this.mainUid === +this.uids[0]
                            ? '合并成功'
                            : '当前账号成功被合并到新账号，请重新登录'
            this.$store.commit('setConfirmShow', true)
            this.$store.commit('setConfirm', {
              confirmText: confirmText,
              cancelBtnShow: false,
              ensure: () => {
                this.$sendDataToClient({
                  type: 'combineResponse',
                  status: status
                })
                this.$store.commit('setConfirmShow', false)
              }
            })
          } else {
            this.$store.commit('setConfirmShow', true)
            this.$store.commit('setConfirm', {
              confirmText: res.data.errMsg,
              cancelBtnShow: false,
              ensure: () => {
                this.$sendDataToClient({
                  type: 'combineResponse',
                  status: 'fail'
                })
                this.$store.commit('setConfirmShow', false)
              }
            })
          }
          this.$store.commit('setLoading', false)
        })
      },
      response (code) {
        let sendData = {
          type: 'combineResponse',
          status: code
        }
        this.$sendDataToClient(sendData)
      }
    },
    components: { BottomButton }
  }
</script>
