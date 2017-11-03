<!-- 登录弹窗 -->
<style lang="less" scoped>
  @lineColor: #aaa;
  ::-webkit-input-placeholder {
    color: #aaa;
  }
  .login-popup {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 80;
    text-align: center;
    .login-popup-container {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%;);
      margin: auto;
      width: 6.2rem;
      background: #fff;
      border-radius: 6px;
      .title {
        margin: .3rem 0;
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
      }
      .close-popup {
        position: absolute;
        top: .1rem;
        right: .1rem;
        width: .4rem;
        height: .4rem;
        background: url(http://share.greenplayer.cn/share/img/icon/close.png);
        background-size: 100% 100%;
        border-radius: 50%;
      }
      .account {
        width: 100%;
        padding: 0 .4rem;
        .account-form {
          .input-block {
            position: relative;
            display: flex;
            margin: .3rem auto;
            font-size: .28rem;
            color: #282828;
            width: 5.4rem;
            height: .7rem;
            line-height: .7rem;
            &::after {
              content: '';
              display: block;
              position: absolute;
              left: -50%;
              right: -50%;
              top: -50%;
              bottom: -50%;
              border: 1px solid #787878;
              border-radius: 6px;
              transform: scale(0.5);
              z-index: -1;
            }
            .input-icon {
              width: .7rem;
              padding: .1rem;
              img {
                vertical-align: baseline;
              }
            }
            .area-code {
              width: .7rem;
              line-height: .7rem;
            }
            input {
              font-size: .28rem;
              color: #282828;
              border: 0;
              background: transparent;
              &:focus {
                outline: 0;
              }
            }
          }
          .forget-password {
            text-align: left;
            width: 5.4rem;
            font-size: 0;
            a {
              font-size: .2rem;
              color: #646464;
            }
          }
          .button-block {
            margin: .3rem 0;
            display: flex;
            justify-content: space-between;
            .button {
              display: block;
              width: 2rem;
              height: .6rem;
              line-height: .6rem;
              font-size: .28rem;
              border-radius: 6px;
              box-sizing: border-box;
              &.signup {
                color: #32b847;
                border: 1px solid #32b847;
              }
              &#login-btn {
                background: #32b847;
                color: #fff;
                border: 0;
              }
            }
          }
        }
      }
      .third-party {
        position: relative;
        &::before {
          content: '';
          display: block;
          position: absolute;
          top: .12rem;
          width: 100%;
          height: 1px;
          background: #a0a0a0;
          transform: scaleY(0.5);
          z-index: -1;
        }
        .third-party-title {
          color: #282828;
          font-size: .24rem;
          span {
            display: inline-block;
            padding: 0 .2rem;
            background: #fff;
          }
        }
        .third-part-list {
          font-size: 0;
          padding: .3rem;
          .third-party-item {
            a {
              display: block;
              margin: 0 auto;
              width: 30px;
              height: 30px;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div class="login-popup" @click="hideLogin" @touchmove.prevent>
    <div class="login-popup-container" @click.stop>
      <div class="close-popup" @click="hideLogin"></div>
      <p class="title">
        <img src="http://share.greenplayer.cn/share/img/icon/icon_logo.png" alt="">
      </p>
      <div class="account">
        <form class="account-form">
          <div class="input-block">
            <div class="input-icon phone-ico">
              <img class="_fullimg" src="http://share.greenplayer.cn/share/img/icon/phone.png" alt="">
            </div>
            <div class="area-code">+86</div>
            <input id="phone-number" type="number" placeholder="输入手机号码" v-model="phone">
          </div>
          <div class="input-block">
            <div class="input-icon phone-ico">
              <img class="_fullimg" src="http://share.greenplayer.cn/share/img/icon/password.png" alt="">
            </div>
            <input id="password" type="password" placeholder="输入登录密码" v-model="password">
          </div>
          <p class="forget-password"><a href="http://share.greenplayer.cn/share/sharepage/resetpwd.html">忘记密码?</a></p>
          <div class="button-block">
            <a class="button signup" href="http://share.greenplayer.cn/share/sharepage/signup.html">注册</a>
            <a class="button" id="login-btn" href="javascript:;" @click="accountLogin">登录</a>
          </div>
        </form>
      </div>
      <div class="third-party">
        <p class="third-party-title">
          <span>第三方登录</span>
        </p>
        <div class="third-party-container">
          <ul class="third-part-list _flex">
            <!-- <li class="third-party-item _flex-item">
              <a href="javascript:;" @click="QQLogin"><img class="_fullimg" src="http://share.greenplayer.cn/share/img/icon/qq.png" alt=""></a>
            </li> -->
            <!-- <li class="third-party-item _flex-item">
              <a href="javascript:;" @click="weiboLogin"><img class="_fullimg" src="http://share.greenplayer.cn/share/img/icon/weibo.png" alt=""></a>
            </li> -->
            <li class="third-party-item _flex-item">
              <a href="javascript:;" @click="wechatLogin"><img class="_fullimg" src="http://share.greenplayer.cn/share/img/icon/wechat.png" alt=""></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        phone: '',
        password: '',
        redirectUri: encodeURIComponent(location.href)
      }
    },
    computed: {
      apiAddress () {
        return this.$store.state.apiAddress
      }
    },
    methods: {
      hideLogin () {
        this.$store.commit('hideLogin')
      },
      accountLogin () {   // 手机号密码登录
        if (!this.phone || !this.password) {
          this.$store.commit('showToast', '请输入有效的手机号和密码')
          return false
        }
        this.$store.commit('setLoading', true)
        let url = `${this.apiAddress}/api/login/userLogin.php`
        let param = {
          json: '{"telephone":"' + this.phone + '","password":"' + this.password + '","version":"1.0","source":"wap"}'
        }
        this.$axios.post(url, param).then(res => {
          res = res.data
          if (res.status === 'success') {
            this.$store.commit('setLogined', res.userinfo)  // 设置登录信息
            this.$store.commit('hideLogin')   // 隐藏登录弹窗
            this.$store.commit('showToast', '登录成功')
            this.phone = this.password = ''
          } else {
            this.$store.commit('showToast', res.errMsg)
          }
          this.$store.commit('setLoading', false)
        }).catch(err => {
          this.$store.commit('showToast', err)
          this.$store.commit('setLoading', false)
        })
      },
      wechatLogin () {  // 微信登录
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxab004ca60bc0d6ce&redirect_uri=' + this.redirectUri + '&response_type=code&scope=snsapi_userinfo&state=2&connect_redirect=1#wechat_redirect'
        location.assign(url)
      },
      QQLogin () {  // QQ登录
        let url = 'https://graph.qq.com/oauth2.0/authorize?client_id=101407566&redirect_uri=' + this.redirectUri + '&response_type=code&scope=snsapi_userinfo&state=1&display=mobile'
        location.assign(url)
      },
      weiboLogin () { // 微博登录
        this.$store.commit('showToast', '暂不支持网页端微博登录')
        return false
        // let url = 'https://api.weibo.com/oauth2/authorize?scope=email&redirect_uri=' + this.redirectUri + '&response_type=code&client_id=2252550247&display=mobile&state=3'
        // location.assign(url)
      },
      goSignup () { // 去注册
        let url = 'http://share.greenplayer.cn/share/sharepage/signup.html?redirect_uri=' + this.redirectUri
        location.assign(url)
      },
      goResetpwd () {   // 找回密码
        let url = 'http://share.greenplayer.cn/share/sharepage/resetpwd.html?redirect_uri=' + this.redirectUri
        location.assign(url)
      }
    }
  }
</script>
