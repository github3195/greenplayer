<!-- MemberList.vue 成员列表 -->
<style lang="less" scoped>
  .member-container {
    font-size: .28rem;
    color: #282828;
    .group-title {
      width: 100%;
      height: .5rem;
      line-height: .5rem;
      background: #f0f0f0;
      padding: 0 .2rem;
    }
    .member {
      position: relative;
      display: flex;
      align-items: center;
      height: 1.4rem;
      padding: 0 .2rem;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background: #a0a0a0;
        transform: scaleY(0.5);
      }
      .portrait {
        flex: 0 0 1rem;
        width: 1rem;
        height: 1rem;
        margin-right: .1rem;
        overflow: hidden;
      }
      .info {
        flex: 1;
        overflow: hidden;
        .name {
          line-height: .6rem;
        }
        .position {
          line-height: .4rem;
          font-size: .22rem;
          color: #646464;
        }
      }
      .number {
        flex: 0 0 .8rem;
        width: .8rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        font-size: .22rem;
        margin-left: .1rem;
        background-image: url(http://share.greenplayer.cn/share/img/icon/uniform.png);
        background-size: 100% 100%;
      }
    }
  }
</style>

<template>
  <div class="member-container">
    <div class="member-group" v-for="(item, index) in data" v-if="item.list.length>0">
      <div class="group-title" v-if="item.title">{{item.title}}</div>
      <ul class="group-list">
        <li class="member" v-for="member in item.list" @click="jump(item.type, member.id)">
          <div class="portrait">
            <img class="_fullimg" :class="{'_border-radius50': +item.type===2 || +item.type===4}" :src="member.portrait" alt="">
          </div>
          <div class="info">
            <div class="name _ellipsis">{{member.name}}</div>
            <div class="position _ellipsis" v-if="member.position">{{member.position}}</div>
          </div>
          <div class="number" v-if="member.number">{{member.number}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        data: ''
      }
    },
    props: {
      memberList: ''
    },
    watch: {
      memberList (val, oldVal) {
        if (val) {
          this.data = val
        }
      }
    },
    mounted () {
      this.data = this.memberList
    },
    methods: {
      jump (type, id) {
        if (+type === 2) {    // 球队成员，跳球员主页
          let sendData = {
            type: 'goThirdParty',
            targetType: 1,
            targetId: id
          }
          if (this.$sendDataToClient(sendData)) {
            return
          }
          this.$router.push({
            path: 'thirdpartyhome',
            query: {
              pageType: 1,
              playerId: id
            }
          })
        } else if (+type === 3) {   // 赛事名单，跳球队主页
          let sendData = {
            type: 'goThirdParty',
            targetType: 2,
            targetId: id
          }
          if (this.$sendDataToClient(sendData)) {
            return
          }
          // this.$router.push({
          //   path: 'thirdpartyhome',
          //   query: {
          //     pageType: 2,
          //     teamId: id
          //   }
          // })
          this.$router.push({
            path: 'teamgameinfo',
            query: {
              gameId: this.getQueryString('gameId'),
              teamId: id
            }
          })
        } else if (+type === 4) {   // 球队教练，跳转教练主页
          let sendData = {
            type: 'goThirdParty',
            targetType: '4',
            targetId: id
          }
          if (this.$sendDataToClient(sendData)) {
            return
          }
          this.$router.push({
            path: 'thirdpartyhome',
            query: {
              pageType: 4,
              coachId: id
            }
          })
        }
      }
    }
  }
</script>
