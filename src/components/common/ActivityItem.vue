<!-- ActivityItem.vue 单个日程 -->
<style lang="less" scoped>
  .activity-item {
    overflow: hidden;
    text-align: center;
    font-size: .24rem;
    padding: .2rem 0;
    .activity-basic {
      float: left;
      width: 35%;
      padding: .3rem .2rem;
      line-height: .4rem;
    }
    .team-info {
      float: left;
      width: 30%;
      .portrait {
        width: .9rem;
        height: .9rem;
      }
      .name {
        line-height: .3rem;
        margin-top: .2rem;
      }
    }
    .activity-status {
      float: left;
      width: 35%;
      padding: .3rem .2rem;
    }
  }
</style>

<template>
  <div class="activity-item" @click.stop="jump(data.id, data.type)">
    <div class="activity-basic">
      <div class="time _ellipsis">{{data.time}}</div>
      <div class="place _ellipsis">{{data.place}}</div>
    </div>
    <div class="team-info">
      <img class="portrait" :src="data.teamPortrait" alt="">
      <div class="name _ellipsis">{{data.teamName}}</div>
    </div>
    <div class="activity-status">
      <!-- <div>未反馈</div> -->
      <p class="act-exp">{{data.name}}</p>
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
    methods: {
      jump (id, type) {
        window.open(`/#/trainconvene?activityId=${id}`)
      }
    }
  }
</script>
