<!-- UserList.vue 用户信息 -->
<style lang="less" scoped>
  .user-ball {
    position: fixed;
    right: .3rem;
    top: .8rem;
    z-index: 12;
    .user-info {
      display: flex;
      width: 2.2rem;
      height: .8rem;
      border-radius: .4rem;
      overflow: hidden;
      background: rgba(0, 0, 0, .5);
      font-size: 0;
      .user-portrait {
        flex: 0 0 .8rem;
        height: .8rem;
        padding: .05rem;
      }
      .user-nickname {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: .24rem;
        line-height: .8rem;
        color: #fff;
      }
      .userinfo-list {
        position: absolute;
        top: 100%;
        left: .4rem;
        right: .4rem;
        font-size: .24rem;
        text-align: center;
        color: #fff;
        background: rgba(0, 0, 0, .5);
        .userinfo-list-item {
          margin: .2rem 0;
        }
      }
    }
  }
  .scaledown-enter-active, .scaledown-leave-active {
    transition: transform .2s;
    transform-origin: 0 0;
  }
  .scaledown-enter, .scaledown-leave-active {
    transform: scaleY(0);
    transform-origin: 0 0;
  }
</style>

<template>
  <div class="user-ball"
       @click="userlistShow=false"
       :style="{left: ballX, top: ballY}">
    <div class="user-info" @click.stop="showUserInfo">
      <div class="user-portrait">
        <img class="_fullimg _border-radius50" :src="portrait" alt="">
      </div>
      <div class="user-nickname">{{nickname}}</div>
      <transition name="scaledown" mode="in-out">
        <ul class="userinfo-list" v-show="userlistShow">
          <li class="userinfo-list-item _ellipsis" @click.stop="logout">退出登录</li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userlistShow: false,
        ballX: '',
        ballY: ''
      }
    },
    computed: {
      uid () { return this.$store.state.uid },
      nickname () {
        return this.$store.state.nickname || '未登录'
      },
      portrait () {
        return this.$store.state.portrait || 'http://share.greenplayer.cn/share/img/球员默认40.png'
      }
    },
    methods: {
      showUserInfo () {
        if (!this.uid) {
          this.$store.commit('showLogin')
        } else {
          this.userlistShow = !this.userlistShow
        }
      },
      logout () {
        this.$store.commit('setLogouted')
        this.userlistShow = false
        this.$store.commit('showToast', '退出成功')
      },
      moveBall (e) {
        let touches = e.touches[0]
        let pageX = touches.pageX
        let pageY = touches.pageY
        if (+pageX < 0) {
          pageX = 0
        }
        if (+pageX > window.innerWidth) {
          pageX = window.innerWidth
        }
        if (+pageY < 0) {
          pageY = 0
        }
        if (+pageY > window.innerHeight) {
          pageY = window.innerHeight
        }
        this.ballX = `${+pageX - 50 > 0 ? +pageX - 50 : 0}px`
        this.ballY = `${+pageY - 20 > 0 ? +pageY - 20 : 0}px`
      }
    }
  }
</script>
