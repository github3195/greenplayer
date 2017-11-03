<style lang="less"></style>

<template>
  <div id="app">
    <!-- 顶部下载 -->
    <top-download-bar v-if="!fromApp && showTopBar"></top-download-bar>
    <div>
      <!-- 吐司 -->
      <transition name="fadein">
        <toast v-show="isToastShow"></toast>
      </transition>
      <!-- 确认弹窗 -->
      <transition name="fadein">
        <confirm v-show="confirm.isConfirmShow"></confirm>
      </transition>
      <!-- 加载动画 -->
      <loading v-show="isLoading"></loading>
      <!-- 登录弹窗 -->
      <transition name="scalein">
        <login-popup v-show="isLoginShow" v-if="!fromApp"></login-popup>
      </transition>
      <!-- 用户列表 -->
      <user-list v-if="isUserListShow && !fromApp"></user-list>
      <!-- 覆盖层 -->
      <div class="overlay" v-show="isLoginShow"  v-if="!fromApp"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import TopDownloadBar from './components/common/TopDownloadBar'    // 顶部下载条
  import toast from './components/common/toast'   // 吐司提示，根组件注册方便调用
  import loading from './components/common/loading'   // 加载loading
  import LoginPopup from './components/common/LoginPopup'   // 登录弹窗
  import UserList from './components/common/UserList'   // 用户信息
  import Confirm from './components/common/Confirm'    // 确认弹窗

  export default {
    data () {
      return {
        redirectUri: encodeURIComponent(location.href)
      }
    },
    computed: {
      fromApp        () { return this.getQueryString('fromApp') },
      apiAddress     () { return this.$store.state.apiAddress },
      isToastShow    () { return this.$store.state.isToastShow },
      isLoading      () { return this.$store.state.isLoading },
      isLoginShow    () { return this.$store.state.isLoginShow },
      isUserListShow () { return this.$store.state.isUserListShow },
      wxShareConfig  () { return this.$store.state.wxShareConfig },
      showTopBar     () { return this.$store.state.showTopBar },
      confirm        () { return this.$store.state.confirm }
    },
    mounted () {
      if ((/microMessenger/i).test(navigator.userAgent.toLowerCase())) {  // 微信浏览器的时候配置分享
        this.configWxShare()
      }
      if (!this.fromApp) {    // 验证登录状态
        this.loginValidate()
      }
    },
    methods: {
      configWxShare () {    // 微信分享配置
        let href = encodeURIComponent(location.href.split('#')[0])
        let url = '//share.greenplayer.cn/share/app/team/getSignPackage.php?url=' + href
        let jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
        this.$axios.get(url).then(res => {
          res = JSON.parse(res.data.trim())
          window.wx.config({
            // debug: true,
            appId: res.appId,
            nonceStr: res.nonceStr,
            timestamp: res.timestamp,
            signature: res.signature,
            jsApiList: jsApiList
          })
          window.wx.ready(() => {
            window.wx.onMenuShareTimeline(this.wxShareConfig)
            window.wx.onMenuShareAppMessage(this.wxShareConfig)
            window.wx.onMenuShareQQ(this.wxShareConfig)
            window.wx.onMenuShareWeibo(this.wxShareConfig)
            window.wx.onMenuShareQZone(this.wxShareConfig)
          })
        })
      },
      loginValidate () {
        // 根据保存的token获取用户信息
        let uid = localStorage.getItem('u_id')
        let token = localStorage.getItem('greenPlayerToken')
        if (uid && token) {
          let url = `${this.apiAddress}/api/login/loginWithToken.php`
          let param = {
            json: '{"uid":"' + uid + '","version":"1.0","token":"' + token + '","source":"wap"}'
          }
          this.$axios.post(url, param).then(res => {
            let data = res.data
            if (data.status === 'success') {
              let userinfo = data.userinfo
              this.$store.commit('setLogined', userinfo)
            } else {
              this.$store.commit('setLogouted')
            }
          }).catch(err => {
            console.log(err)
          })
        }
        // 第三方授权登录获取的code处理
        let code = this.getQueryString('code')
        let state = this.getQueryString('state')
        if (code) {
          if (state.substr(0, 1) === '2') {  // 微信授权code处理
            let query = 'code=' + code + '&state=' + state.substr(0, 1) + '&type=2'
            let url = '//share.greenplayer.cn/share/app/team/getUserInfo.php?' + query
            this.$axios.get(url).then(res => {
              let data = JSON.parse(res.data.trim())
              let userinfo = data.userinfo
              if (data.status === 'success') {
                this.$store.commit('setLogined', userinfo)
                this.$store.commit('showToast', '微信授权登录成功')
              } else {
                console.log(data.errMsg)
              }
            }).catch(err => {
              console.log(err)
            })
          } else if (state === '1') {   // QQ授权code处理
            let query = 'code=' + code + '&state=' + state + '&type=1' + '&redirectUri=' + this.redirectUri
            let url = '//share.greenplayer.cn/share/app/team/getUserInfo.php?' + query
            console.log(url)
            this.$axios.get(url).then(res => {
              let data = JSON.parse(res.data.trim())
              let userinfo = data.userinfo
              if (data.status === 'success') {
                this.$store.commit('setLogined', userinfo)
                this.$store.commit('showToast', 'QQ授权登录成功')
              } else {
                console.log(data.errMsg)
              }
            }).catch(err => {
              console.log(err)
            })
          } else if (state === '3') {   // 微博授权code处理
            let query = 'code=' + code + '&state=' + state + '&type=3'
            let url = '//share.greenplayer.cn/share/app/team/getUserInfo.php?' + query
            console.log(url)
          }
        }
      }
    },
    components: { TopDownloadBar, toast, loading, LoginPopup, UserList, Confirm }
  }
</script>
