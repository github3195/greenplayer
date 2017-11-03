<!-- ColumnFourList.vue 四列的组件 -->
<style lang="less" scoped>
  .list-container {
    text-align: center;
    color: #282828;
    .head {
      display: flex;
      align-items: center;
      height: .6rem;
      font-size: .24rem;
    }
    .list-item {
      display: flex;
      height: 1.2rem;
      align-items: center;
      font-size: .28rem;
    }
    .info {
      display: flex;
      align-items: center;
      overflow: hidden;
      .portrait {
        flex: 0 0 .8rem;
        width: .8rem;
        height: .8rem;
        margin: 0 .1rem 0 .2rem;
      }
      .name {
        line-height: .4rem;
      }
    }
    .col-1 {
      flex: 1;
    }
    .col-2 {
      flex: 2;
    }
    .col-3 {
      flex: 3;
    }
  }
</style>

<template>
  <div class="list-container">
    <div class="head border-bottom">
      <div class="head-item col-3">
        {{+type===1?'效力球队':'球队名字'}}
      </div>
      <div class="head-item col-1">
        {{+type===1?'位置':'球员数'}}
      </div>
      <div class="head-item col-1">
        {{+type===1?'号码':'战斗力'}}
      </div>
      <div class="head-item col-2">
        {{+type===1?'加入时间':+type===6?'所属梯队':'注册时间'}}
      </div>
    </div>
    <ul class="list">
      <li class="list-item border-bottom" v-for="item in data" @click="jump(item.id)">
        <div class="col-3 info">
          <div class="portrait">
            <img class="_fullimg" :src="item.portrait" alt="">
          </div>
          <div class="name _ellipsis">{{item.name}}</div>
        </div>
        <div class="col-1">{{item.position}}</div>
        <div class="col-1">{{item.memberNumber}}</div>
        <div class="col-2">{{item.acceptTime}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    props: {
      type: '',
      data: ''
    },
    methods: {
      jump (id) {
        let sendData = {
          type: 'goThirdParty',
          targetType: 2,
          targetId: id
        }
        if (this.$sendDataToClient(sendData)) {
          return
        }
        if (+this.type === 1 || +this.type === 5 || +this.type === 6) {
          this.$router.push({
            path: 'thirdpartyhome',
            query: {
              pageType: 2,
              teamId: id
            }
          })
        }
      }
    }
  }
</script>
