<!-- TeamList.vue 球队列表 -->
<style lang="less" scoped>
  .team-container {
    .item {
      padding: .2rem;
      font-size: .28rem;
      color: #282828;
      .basic-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .basic {
          flex: 1;
          display: flex;
          white-space: nowrap;
          align-items: center;
          overflow: hidden;
        }
        .portrait {
          flex: 0 0 .5rem;
          height: .5rem;
          margin-right: .1rem;
        }
        .name {
          line-height: .4rem;
        }
        .time {
          flex: 1;
          white-space: nowrap;
          text-align: right;
          line-height: .36rem;
          overflow: hidden;
        }
      }
    }
    .honor {
      padding: 0 .2rem;
      text-align: center;
      color: #282828;
      .honor-item {
        float: left;
        width: 33.333333%;
      }
      .honor-portrait {
        margin: 0 auto;
        width: 1rem;
        height: 1rem;
      }
      .honor-name {
        line-height: .36rem;
        font-size: .24rem;
      }
      .honor-game {
        font-size: .22rem;
        line-height: .3rem;
      }
      .honor-date {
        font-size: .22rem;
      }
    }
  }
</style>
 
<template>
  <div class="team-container">
    <ul class="list">
      <li class="item border-bottom" v-for="item in data">
        <div class="basic-info" @click.stop="jump(item)">
          <div class="basic">
            <div class="portrait">
              <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
            </div>
            <div class="name _ellipsis">{{item.name}}</div>
          </div>
          <div class="time" v-if="item.startTime&&item.endTime">{{item.startTime.replace(/\s[\d:]+$/g, '')}} 至 {{item.endTime.replace(/\s[\d:]+$/g, '')}}</div>
        </div>
        <div class="honor" v-if="item.honourList">
          <ul class="honor-list _clearfix">
            <li class="honor-item" v-for="honor in item.honourList">
              <div class="honor-portrait">
                <img class="_fullimg" :src="honor.icon" alt="">
              </div>
              <div class="honor-name">{{honor.name}}</div>
              <div class="honor-game">{{honor.gameName}}</div>
              <div class="honor-date">{{honor.honourDate ? honor.honourDate.replace(/\s[\d:]+$/, '') : '未知'}}</div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
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
    methods: {
      jump (obj) {
        let sendData = {
          type: 'goThirdParty',
          targetType: 2,
          targetId: obj.teamId
        }
        if (this.$sendDataToClient(sendData)) {
          return
        }
        this.$router.push({
          path: 'thirdpartyhome',
          query: {
            pageType: 2,
            teamId: obj.teamId
          }
        })
      }
    }
  }
</script>
