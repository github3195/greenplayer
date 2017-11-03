<!-- 登录页面 -->
<style lang="less" scoped>
  @lineColor: #aaa;
  ::-webkit-input-placeholder {
    color: #aaa;
  }
  .login {
    font-size: .36rem;
    text-align: center;
    width: 100%;
    height: 100%;
    .login-container {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      h1 {
        color: #36b847;
        height: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .account {
        width: 6rem;
        margin: 0 auto;
        padding-top: .6rem;
        min-height: 75%;
        padding-bottom: 35%;
        .account-form {
          .input-block {
            position: relative;
            display: flex;
            margin: 0 auto .3rem;
            font-size: .32rem;
            color: #282828;
            height: .8rem;
            line-height: .8rem;
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
              width: .8rem;
              padding: .15rem;
            }
            .area-code {
              width: .8rem;
              line-height: .8rem;
            }
            input {
              border: 0;
              font-size: .32rem;
              color: #a0a0a0;
              background: transparent;
              &:focus {
                outline: 0;
              }
            }
          }
          .verification-block {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0;
            .verification {
              width: 3.6rem;
              height: .8rem;
              line-height: .8rem;
              position: relative;
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
              input {
                display: block;
                padding-left: .8rem;
                width: 100%;
                height: 100%;
                font-size: .32rem;
                color: #a0a0a0;
                margin: 0 auto;
                border: 0;
                box-sizing: border-box;
                background: transparent;
                &:focus {
                  outline: 0;
                }
              }
            }
            .get-verification {
              width: 2.2rem;
              height: .7rem;
              line-height: .7rem;
              font-size: .3rem;
              color: #fff;
              text-align: center;
              background: #32b847;
              border-radius: .35rem;
              &.disable {
                background: #a2dca2;
              }
            }
          }
          .button-block {
            margin-top: .6rem;
            a {
              margin: .3rem 0;
              color: #aaa;
              font-size: .14rem;
            }
            #signup {
              background: #fff;
              color: #282828;
              border: 1px solid #aaa;
            }
            .button {
              display: block;
              width: 100%;
              height: .9rem;
              line-height: .9rem;
              font-size: .3rem;
              text-align: center;
              border-radius: 6px;
              box-sizing: border-box;
              background: #32b847;
              color: #fff;
              border: 0;
              &.disable {
                background: #a2dca2;
              }
            }
          }
        }
      }
      .third-party {
        margin-top: -30%;
        .third-party-title {
          color: #aaa;
          font-size: .3rem;
        }
        .third-part-list {
          padding: .6rem;
          .third-party-item {
            a {
              display: block;
              margin: 0 auto;
              width: .8rem;
              height: .8rem;
              // overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
</style>

<template>
    <div class="login" @scroll.stop="">
      <div class="login-container">
        <div class="login-container signup">
      <h1 class="">绿茵场</h1>
      <!-- 用户名密码登录 -->
      <div class="account">
        <form class="account-form">
          <div class="input-block">
            <div class="input-icon phone-ico">
              <img class="_fullimg" src="http://share.greenplayer.cn/share/img/icon/phone.png" alt="">
            </div>
            <div class="area-code">+86</div>
            <input id="phone-number" type="number" placeholder="输入手机号码">
          </div>
          <div class="input-block">
            <div class="input-icon phone-ico">
              <img class="_fullimg" src="http://share.greenplayer.cn/share/img/icon/password.png" alt="">
            </div>
            <input id="password" type="password" placeholder="输入登录密码">
          </div>
          <div class="button-block">
            <a class="button" id="login" href="javascript:;">登&nbsp&nbsp&nbsp&nbsp录</a>
            <a class="button" id="signup" href="signup.html">注&nbsp&nbsp&nbsp&nbsp册</a>
            <a href="resetpwd.html">忘记密码？</a>
          </div>
        </form>
      </div>
      <!-- 第三方授权登录 -->
      <div class="third-party">
        <p class="third-party-title">
          <span>—— 第三方账号登录 ——</span>
        </p>
        <div class="third-party-container">
          <ul class="third-part-list _flex">
            <li class="third-party-item _flex-item">
              <a id="QQLogin" href="javascript:;"><img class="_fullimg" src="http://share.greenplayer.cn/share/img/icon/qq.png" alt=""></a>
            </li>
            <!-- <li class="third-party-item _flex-item">
              <a id="weiboLogin" hidden href="javascript:;"><img class="_fullimg _border-radius50" src="http://share.greenplayer.cn/share/img/icon/weibo.png" alt=""></a>
            </li> -->
            <li class="third-party-item _flex-item">
              <a id="wechatLogin" href="javascript:;"><img class="_fullimg" src="http://share.greenplayer.cn/share/img/icon/wechat.png" alt=""></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {}
    },
    mounted () {
      document.title = '登录'
      document.documentElement.style.height = document.body.style.height = '100%'
      document.getElementById('app').style.height = '100%'
    },
    methods: {
    }
  }
</script>
