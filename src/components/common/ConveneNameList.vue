<!-- ConveneNameList.vue 召集的名单 -->
<style lang="less" scoped>
  .convene-list {
    position: relative;
    height: 100%;
    font-size: .28rem;
    color: #282828;
    .no-feedback {
      position: relative;
      height: .7rem;
      line-height: .7rem;
      padding: 0 .3rem;
      &::after {
        content: '';
        display: block;
        position: absolute;
        left: .2rem;
        right: .2rem;
        bottom: 0;
        height: 1px;
        background: #c8c8c8;
        transform: scaleY(0.5);
      }
      span { color: #32b847; }
    }
    .name-list {
      position: absolute;
      left: 0;
      right: 0;
      top: .7rem;
      bottom: .98rem;
      display: flex;
      padding: .2rem 0;
      overflow: hidden;
      .feed-type {
        position: relative;
        flex: 0 0 33%;
        &::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: 1px;
          background: #c8c8c8;
          transform: scaleX(0.5);
        }
        &:last-child::after {
          width: 0;
          background: transparent;
        }
        .feed-title {
          height: .4rem;
          line-height: .4rem;
          font-size: .26rem;
          text-align: center;
          span {
            color: #32b847;
          }
        }
        .player-list {
          position: absolute;
          left: 0;
          right: 0;
          top: .4rem;
          bottom: 0;
          padding: 0 .1rem 0 .2rem;
          overflow-x: hidden;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
          .player {
            display: flex;
            align-items: center;
            margin: .1rem 0;
            .portrait {
              flex: 0 0 .5rem;
              height: .5rem;
              margin-right: .1rem;
              border-radius: 50%;
            }
            .name {
              font-size: .24rem;
              line-height: .4rem;
            }
          }
        }
      }
    }
    .select-btn {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: .98rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 1px;
        background: #c8c8c8;
        transform: scaleY(0.5);
      }
      .btn {
        flex: 0 0 1.8rem;
        height: .6rem;
        line-height: .6rem;
        color: #fff;
        background: #32b847;
        text-align: center;
        border-radius: 3px;
        &:nth-child(2) {
          background: #59bfb9;
        }
        &:nth-child(1) {
          background: #fd5f46;
        }
      }
    }
  }
</style>

<template>
  <div class="convene-list">
    <div class="no-feedback">未反馈<span>{{unregistInfo.length}}</span>人</div>
    <div class="name-list">
      <div class="feed-type">
        <div class="feed-title">请假<span style="color:#fd5f46;">{{registInfo.leave.length}}</span>人</div>
        <ul class="player-list">
          <li class="player" v-for="item in registInfo.leave" @click.stop="goThirdPartyHome(item.playerId)">
            <div class="portrait">
              <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
            </div>
            <div class="name _ellipsis">{{item.name}}</div>
          </li>
        </ul>
      </div>
      <div class="feed-type">
        <div class="feed-title">待定<span style="color:#59bfb9;">{{registInfo.undetermined.length}}</span>人</div>
        <ul class="player-list">
          <li class="player" v-for="item in registInfo.undetermined" @click.stop="goThirdPartyHome(item.playerId)">
            <div class="portrait">
              <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
            </div>
            <div class="name _ellipsis">{{item.name}}</div>
          </li>
        </ul>
      </div>
      <div class="feed-type">
        <div class="feed-title">报名<span>{{registInfo.enroll.length}}</span>人</div>
        <ul class="player-list">
          <li class="player" v-for="item in registInfo.enroll" @click.stop="goThirdPartyHome(item.playerId)">
            <div class="portrait">
              <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
            </div>
            <div class="name _ellipsis">{{item.name}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="select-btn" v-if="showBtn">
      <div class="btn" @click="leave">请假</div>
      <div class="btn" @click="undetermined">待定</div>
      <div class="btn" @click="enroll">报名</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      registInfo: '',
      unregistInfo: '',
      showBtn: {
        default: true
      }
    },
    methods: {
      undetermined () {
        this.$emit('undetermined')
      },
      leave () {
        this.$emit('leave')
      },
      enroll () {
        this.$emit('enroll')
      },
      goThirdPartyHome (playerId) {
        window.open(`//share.greenplayer.cn/share/green/#/thirdpartyhome?pageType=1&playerId=${playerId}`)
      }
    }
  }
</script>
