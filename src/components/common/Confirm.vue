<!-- Confirm.vue 询问弹窗 -->
<style lang="less" scoped>
  .green-confirm {    /* 绿茵场样式的弹窗*/
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,.3);
    z-index: 100;
    .green-confirm-container {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      margin: auto;
      width: 270px;
      transform: translateY(-50%);
      background: #fff;
      box-shadow: 0 -1px 1px #aaa;
      font-size: 14px;
      border-top: 20px solid #6bd993;
      border-radius: 3px;
      text-align: center;
      .confirm-text {
        padding: 30px 20px;
        color: #282828;
        font-size: 13px;
        line-height: 15px;
      }
      .confirm-button {
        display: flex;
        justify-content: space-around;
        padding-bottom: 20px;
        .btn {
          display: block;
          flex: 0 0 60px;
          padding: 5px;
          border-radius: 3px;
          border: 1px solid #6bd993;
          &.no {
            color: #6bd993;
            background: #fff;
          }
          &.yes {
            color: #fff;
            background: #6bd993;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="green-confirm">
    <div class="green-confirm-container" @click.stop>
      <div class="confirm-text" v-html="confirm.confirmText"></div>
      <div class="confirm-button">
        <a class="btn no"
           href="javascript:;"
           @click="closeConfirm"
           v-if="+confirm.cancelBtnShow===1">{{confirm.confirmCancelText}}</a>
        <a class="btn yes" href="javascript:;" @click="ensure">{{confirm.confirmSureText}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
      confirm () {
        return this.$store.state.confirm
      }
    },
    methods: {
      closeConfirm () {
        this.$store.commit('setConfirmShow', false)
      },
      ensure () {
        this.confirm.ensure()
      }
    }
  }
</script>
