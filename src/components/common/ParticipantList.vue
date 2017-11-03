<!-- 赛事参赛名单 ParticipantList.vue -->
<style lang="less" scoped>
  .participant-container {
    .participant-list {
      .participant-item {
        position: relative;
        display: flex;
        align-items: center;
        height: 1rem;
        padding: 0 .4rem;
        &::after {
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: #c4c4c4;
          transform: scaleY(0.5);
        }
        .team-link {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: 2;
        }
        .team-portrait {
          flex: 0 0 .7rem;
          height: .7rem;
          margin-right: .3rem;
        }
        .team-info {
          font-size: .24rem;
          color: #282828;
        }
      }
      .group-title {
        padding-left: .2rem;
        height: .6rem;
        line-height: .6rem;
        background: #f0f0f0;
      }
    }
  }
</style>

<template>
  <div class="participant-container">
    <ul class="participant-list" v-for="(item, index) in participantList">
      <p class="group-title" v-if="participantList.length>1">{{getGroupName(item)}}组</p>
      <li class="participant-item" v-for="(team, i) in getGroupTeam(item)">
        <a class="team-link" :href="`http://share.greenplayer.cn/share/sharepage/claimteam.html?teamId=${team.tid}`"></a>
        <div class="team-portrait">
          <img class="_fullimg" :src="team.icon" alt="">
        </div>
        <div class="team-info">
          {{team.teamname}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        gameId: this.getQueryString('gameId'),
        participantList: '',
        getGroupTeam: function (item) {
          for (let group in item) {
            return item[group]
          }
        },
        getGroupName: item => {
          for (let group in item) {
            return group
          }
        }
      }
    },
    props: {
      loaded: false
    },
    computed: {
      apiAddress () { return this.$store.state.apiAddress }
    },
    mounted () {
    },
    watch: {
      loaded (val, oldVal) {
        if (val) {
          this.$store.commit('setLoading', true)
          this.loadGroupPlaceForGame()
        }
      }
    },
    methods: {
      loadGroupPlaceForGame () {
        let url = `${this.apiAddress}/api/game/loadGroupPlaceForGame.php`
        let param = {
          json: `{"version":"ios3.0.1", "uid":"120","gameId":${this.gameId}}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.participantList = res.data.returndata
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.$store.commit('setLoading', false)
        }).catch(err => {
          console.log(err)
          this.$store.commit('setLoading', false)
        })
      }
    }
  }
</script>
