<!-- 比赛事件时间轴 -->
<style lang="less" scoped>
  @maincolor: #32b847;
  .event-axis {
    font-size: 0;
    .event-list {
      .event-item {
        margin: .3rem 0;
        .event-button {
          span {
            display: inline-block;
            padding: .1rem .3rem;
            font-size: .26rem;
            color: #fff;
            background: @maincolor;
            border-radius: 20px;
          }
        }
        .event-process {
          min-height: .5rem;
          .event-section {
            margin: .2rem 0;
            font-size: .24rem;
            .team-event {
              position: relative;
              &.home {
                text-align: right;
                .event-content {
                  position: relative;
                  right: .5rem;
                }
              }
              &.away {
                .event-content {
                  position: relative;
                  left: .5rem;
                }
              }
              .event-content {
                position: relative;
                display: inline-block;
                padding: 0 .15rem;
                border-radius: 5px;
                width: 2.5rem;
                &::after {
                  content: '';
                  display: block;
                  position: absolute;
                  left: -50%;
                  right: -50%;
                  top: -50%;
                  bottom: -50%;
                  border: 1px solid #b4b4b4;
                  border-radius: 5px;
                  transform: scale(0.5);
                }
                .event-entry {
                  margin: .15rem 0;
                  display: flex;
                  align-items: center;
                  .event-player {
                    flex: 1;
                  }
                  .event-icon {
                    margin: 0 .1rem;
                    width: .36rem;
                    height: .36rem;
                    vertical-align: middle;
                  }
                }
                .arrow {
                  position: absolute;
                  top: .16rem;
                  width: .15rem;
                  height: .15rem;
                  z-index: 3;
                  &::after {
                    content: '';
                    display: block;
                    width: 200%;
                    height: 200%;
                    background: #fff;
                    border-left: 1px solid #b4b4b4;
                    border-top: 1px solid #b4b4b4;
                    transform: scale(0.5);
                  }
                  &.left {
                    transform: rotate(135deg);
                    right: -.2rem;
                  }
                  &.right {
                    transform: rotate(-45deg);
                    left: -.2rem;
                  }
                }
              }
            }
            .event-time {
              margin: auto;
              left: 0;
              right: 0;
              text-align: center;
              z-index: 3;
              span {
                display: inline-block;
                width: .45rem;
                height: .45rem;
                line-height: .45rem;
                border-radius: 50%;
                color: #fff;
                background: @maincolor;
              }
            }
          }
        }
        .event-line {
          margin: auto;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background: @maincolor;
        }
      }
    }
  }
</style>

<template>
  <div>
    <div class="event-axis">
      <ul class="event-list">
        <li class="event-item _rel" v-for="(item, index) in eventList">
          <div class="event-button start _txt-center">
            <span>{{getStartText(item.isPenalty, item.startTime)}}</span>
          </div>
          <ul class="event-process">
            <li class="event-section _rel _clearfix" v-for="(item, index) in item.eventInfo">
              <div class="team-event home _left _width50">
                <div class="event-content" v-if="item.teamId === matchResult.party_a">
                  <p class="event-entry" v-for="(event, i) in item.playerList">
                    <span class="event-player">{{getPlayerInfo(item.eventType, event.playerName, event.memberNumber, event.playerId, 1)}}</span>
                    <img :src="getEventIcon(item.eventType, item)" class="event-icon" alt="">
                  </p>
                  <p class="event-entry" v-for="(event, i) in item.additional">
                    <span class="event-player">{{getPlayerInfo(item.eventType, event.playerName, event.memberNumber, event.playerId, 1)}}</span>
                    <img :src="getEventIcon(+item.eventType+1, item)" class="event-icon" alt="">
                  </p>
                  <div class="arrow left"></div>
                </div>
              </div>
              <div class="team-event away _right _width50">
                <div class="event-content" v-if="item.teamId === matchResult.party_b">
                  <p class="event-entry" v-for="(event, i) in item.playerList">
                    <img :src="getEventIcon(item.eventType, item)" class="event-icon" alt="">
                    <span class="event-player">{{getPlayerInfo(item.eventType, event.playerName, event.memberNumber, event.playerId, 2)}}</span>
                  </p>
                  <p class="event-entry" v-for="(event, i) in item.additional">
                    <img :src="getEventIcon(+item.eventType+1, item)" class="event-icon" alt="">
                    <span class="event-player">{{getPlayerInfo(item.eventType, event.playerName, event.memberNumber, event.playerId, 2)}}</span>
                  </p>
                  <div class="arrow right"></div>
                </div>
              </div>
              <div class="event-time _abs"><span>{{item.HappenTime}}</span></div>
            </li>
          </ul>
          <div class="event-button end _txt-center">
            <span>{{item.endTime ? item.endTime.replace(/(\d+-\d+-\d+\s)|(:\d+)$/g, '') : "结束"}}</span>
          </div>
          <div class="event-line _abs"></div>   <!-- 中轴线 -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        gameover: true
      }
    },
    props: {
      events: '',
      eventList: '',
      matchResult: ''
    },
    mounted () {
    },
    watch: {
      matchResult (val, oldVal) {
        if (val && this.events && this.eventList) {
          this.markupGoal()
        }
      },
      eventList (val, oldVal) {
        if (val && this.events && this.matchResult) {
          this.markupGoal()
        }
      }
    },
    methods: {
      getEventIcon (eventType, eventInfo) {  // 获取事件图标
        let res = ''
        switch (+eventType) {
          case -1:
            res = 'http://share.greenplayer.cn/share/img/match/jq.png'
            break
          case 1:
            res = 'http://share.greenplayer.cn/share/img/match/jq.png'
            break
          case 2:
            res = 'http://share.greenplayer.cn/share/img/match/ex_zg.png'
            break
          case 3:
            res = 'http://share.greenplayer.cn/share/img/match/ex_zg.png'
            break
          case 5:
            res = +eventInfo.isYellowToRed === 1
                ? 'http://share.greenplayer.cn/share/img/match/yellowtored.png'
                : 'http://share.greenplayer.cn/share/img/match/ex_rp.png'
            break
          case 6:
            res = +eventInfo.isYellowToRed === 1
                ? 'http://share.greenplayer.cn/share/img/match/dotyellow.png'
                : 'http://share.greenplayer.cn/share/img/match/ex_hp.png'
            break
          case 9:
            res = 'http://share.greenplayer.cn/share/img/match/ex_sc.png'
            break
          case 10:
            res = 'http://share.greenplayer.cn/share/img/match/ex_xc.png'
            break
          case 11:
            res = 'http://share.greenplayer.cn/share/img/match/dq.png'
            break
          case 12:
            res = 'http://share.greenplayer.cn/share/img/match/wl.png'
            break
          case 17:
            res = 'http://share.greenplayer.cn/share/img/match/dq.png'
            break
          default:
            res = ''
        }
        return res
      },
      getPlayerInfo (eventType, name, number, playerId, type) {   // 格式化事件内容
        number = parseInt(number) >= 0 ? number : 'N'
        name = name || ''
        // let r = type === 1 ? name + ' ' + number + '号' : number + '号 ' + name
        let r = number + '号 ' + name
        if (+playerId < 0) {
          if (+eventType === 12) {
            return '乌龙球'
          } else if (+eventType === 6) {
            return '黄牌'
          } else if (+eventType === 5) {
            return '红牌'
          }
          return '进球'
        }
        if (+eventType === 12) {
          return '乌龙球'
        } else if (+eventType === 17) {
          return name ? r : '点球'
        } else if (+eventType === -1) {
          return '进球'
        }
        return r
      },
      getStartText (isPenalty, start) {   // 格式化开始结束球
        let res = ''
        res = +isPenalty === 1 ? '点球大战' : !start ? '开始' : start.replace(/(\d+-\d+-\d+\s)|(:\d+)$/g, '')
        return res
      },
      markupGoal () {   // 补录未记录的进球
        let needMarkupA = this.matchResult.cur_score_a - this.events.filledScoresOfA  // 主队需要补录的进球
        let needMarkupB = this.matchResult.cur_score_b - this.events.filledScoresOfB  // 客队需要补录的进球
        while (needMarkupA > 0) {
          let eventItem = {
            HappenTime: 0,
            playerList: [{
              memberNumber: '',
              playerId: '',
              playerName: '进球'
            }],
            additional: [],
            eventId: '',
            eventType: -1,
            playerStr: '',
            teamId: this.events.party_a
          }
          this.eventList[0].eventInfo.push(eventItem)
          needMarkupA--
        }
        while (needMarkupB > 0) {
          let eventItem = {
            HappenTime: 0,
            playerList: [{
              memberNumber: '',
              playerId: '',
              playerName: '进球'
            }],
            additional: [],
            eventId: '',
            eventType: -1,
            playerStr: '',
            teamId: this.events.party_b
          }
          this.eventList[0].eventInfo.push(eventItem)
          needMarkupB--
        }
      }
    }
  }
</script>
