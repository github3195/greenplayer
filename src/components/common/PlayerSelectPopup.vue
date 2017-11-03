<!-- PlayerSelectPopup.vue 球员选择列表弹窗 -->
<style lang="less" scoped>
  .select-popup {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 6;
    color: #282828;
    background: rgba(0, 0, 0, 0.3);
    .select-container {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      width: 5rem;
      margin: auto;
      transform: translateY(-50%);
      background: #fff;
      border-radius: 5px;
      .close-popup {
        position: absolute;
        display: block;
        right: 0;
        top: 0;
        width: .6rem;
        height: .6rem;
        padding: .1rem;
        background: url(//share.greenplayer.cn/share/img/icon/close.png) no-repeat;
        background-size: 80% 80%;
        background-position: 50% 50%;
        z-index: 22;
      }
      .popup-title {
        font-size: .28rem;
        padding-left: .2rem;
        line-height: .8rem;
      }
    }
    .no-select-tip {
      padding: .8rem .3rem;
      font-size: .26rem;
      color: #646464;
    }
    .select-list {
      max-height: 7rem;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .select-item {
      display: flex;
      align-items: center;
      padding: .1rem .2rem;
      font-size: .26rem;
      .select-portrait {
        flex: 0 0 .8rem;
        height: .8rem;
        margin-right: .1rem;
      }
      .select-name {
        flex: 1;
        max-height: .8rem;
        line-height: .4rem;
        overflow: hidden;
      }
    }
  }
</style>

<template>
  <div class="select-popup" v-show="selectPopupShow" @click="selectPopupShow=false">
    <div class="select-container">
      <i class="close-popup" @click="selectPopupShow=false"></i>
      <div class="popup-title" v-if="playerInfo.length>0">请选择要反馈的球员</div>
      <ul class="select-list" v-if="playerInfo.length>0">
        <li class="select-item border-top" v-for="item in playerInfo" @click="register(item.playerId)">
          <div class="select-portrait">
            <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
          </div>
          <div class="select-name">{{item.name}}</div>
        </li>
      </ul>
      <div class="no-select-tip" v-else>
        没有球员
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      data: ''
    },
    methods: {}
  }
</script>
