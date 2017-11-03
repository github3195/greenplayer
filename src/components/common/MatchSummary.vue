<!-- 赛事概述 -->
<style lang="less" scoped>
  .match-summary {
    color: #282828;
    font-size: .3rem;
    .match-summary-container {
      .summary-list {
        .summary-item {
          line-height: .44rem;
          &::after {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background: #b4b4b4;
            transform: scaleY(0.5);
          }
          .summary-wrap {
            padding: .3rem .2rem;
            .summary-title {
              .title-icon {
                display: inline-block;
                width: .4rem;
                height: .4rem;
                background-size: 100% 100%;
                vertical-align: text-top;
                &.game {background-image: url(http://share.greenplayer.cn/share/img/match/competition.png);}
                &.format {background-image: url(http://share.greenplayer.cn/share/img/match/competitionsystem.png);}
                &.city {background-image: url(http://share.greenplayer.cn/share/img/match/area.png);}
                &.weather {background-image: url(http://share.greenplayer.cn/share/img/match/weather.png);}
                &.uniform {background-image: url(http://share.greenplayer.cn/share/img/match/uniform.png);}
                &.poster {background-image: url(http://share.greenplayer.cn/share/img/match/poster.png);}
                &.referee {background-image: url(http://share.greenplayer.cn/share/img/match/referee.png);}
                &.mark {background-image: url(http://share.greenplayer.cn/share/img/match/comment.png);}
              }
            }
            .summary-content {
              max-width: 5rem;
              .uniform-info {
                margin-top: .1rem;
                height: .8rem;
                font-size: 0;
                span {
                  display: inline-block;
                  width: 4rem;
                  height: .8rem;
                  line-height: .8rem;
                  font-size: .26rem;
                  text-align: right;
                }
                .uniform-container {
                  width: 4rem;
                  height: .8rem;
                  line-height: .8rem;
                  font-size: .26rem;
                  text-align: right;
                }
                .uniform-show {
                  margin-left: .1rem;
                  font-size: 0;
                  width: .8rem;
                  height: .8rem;
                }
                .uniform-img {
                  display: block;
                  width: .8rem;
                  height: .8rem;
                }
                .uniform-cover {
                  position: absolute;
                  left: 0;
                  right: 0;
                  top: 0;
                  bottom: 0;
                  width: .8rem;
                  height: .8rem;
                  line-height: .8rem;
                  font-size: .2rem;
                  font-weight: 100;
                  text-align: center;
                  color: #a0a0a0;
                  background: url(//share.greenplayer.cn/share/img/icon/uniform-trans.png);
                  background-size: 100% 100%;
                }
              }
            }
            .referee {
              width: 100%;
              padding-top: .3rem;
              .referee-list {
                align-items: flex-start;
                .referee-item {
                  .referee-portrait {
                    margin: 0 auto;
                    width: .8rem;
                    height: .8rem;
                  }
                  p {
                    text-align: center;
                    font-size: .26rem;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div class="match-summary">
    <div class="match-summary-container">
      <ul class="summary-list">
        <li class="summary-item _clearfix">
          <div class="summary-wrap _clearfix">
            <div class="summary-title _left">
              <i class="title-icon game"></i>
              <span>赛事：</span>
            </div>
            <div class="summary-content _right">{{matchResult.gameName}}</div>
          </div>
        </li>
        <li class="summary-item _clearfix">
          <div class="summary-wrap _clearfix">
            <div class="summary-title _left">
              <i class="title-icon format"></i>
              <span>赛制：</span>
            </div>
            <div class="summary-content _right">{{matchResult.scale}}人制</div>
          </div>
        </li>
        <li class="summary-item _clearfix">
          <div class="summary-wrap _clearfix">
            <div class="summary-title _left">
              <i class="title-icon city"></i>
              <span>城市：</span>
            </div>
            <div class="summary-content _right">{{matchResult.areaName}}</div>
          </div>
        </li>
        <li class="summary-item _clearfix">
          <div class="summary-wrap _clearfix">
            <div class="summary-title _left">
              <i class="title-icon weather"></i>
              <span>天气：</span>
            </div>
            <div class="summary-content _right" v-show="weatherInfo.lowTemp && weatherInfo.highTemp">
              <weather-show :weatherInfo="weatherInfo"></weather-show>
            </div>
          </div>
        </li>
        <li class="summary-item _clearfix">
          <div class="summary-wrap _clearfix">
            <div class="summary-title _left">
              <i class="title-icon uniform"></i>
              <span>队服：</span>
            </div>
            <div class="summary-content _right">
              <div class="uniform-info _clearfix">
                <p class="_ellipsis _left uniform-container">{{matchResult.a_name}}</p>
                <div class="_left _rel uniform-show">
                  <img class="uniform-img"
                       :style="{background:String(homeUniform.coatColor).replace(/0x/, '#')}"
                       :src="homeUniform.coatImg || ''" alt="">
                  <div class="uniform-cover" v-if="!homeUniform.coatImg"><b v-if="!homeUniform.coatColor">未设</b></div>
                </div>
              </div>
              <div class="uniform-info _clearfix">
                <p class="_ellipsis _left uniform-container">{{matchResult.b_name}}</p>
                <div class="_left _rel uniform-show">
                  <img class="uniform-img"
                       :style="{background:String(awayUniform.coatColor).replace(/0x/, '#')}"
                       :src="awayUniform.coatImg || ''" alt="">
                  <div class="uniform-cover" v-if="!awayUniform.coatImg"><b v-if="!awayUniform.coatColor">未设</b></div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="summary-item _clearfix">
          <div class="summary-wrap _clearfix">
            <div class="summary-title _left">
              <i class="title-icon poster"></i>
              <span>海报：</span>
            </div>
            <div class="summary-content _right">
              <div class="uniform-info _clearfix">
                <p class="_ellipsis _left uniform-container">{{matchResult.a_name}}</p>
                <div class="_left _rel uniform-show">
                  <img class="uniform-img"
                       :src="matchResult.posterA || ''"
                       alt=""
                       @click="showPost(matchResult.posterA)">
                </div>
              </div>
              <div class="uniform-info _clearfix">
                <p class="_ellipsis _left uniform-container">{{matchResult.b_name}}</p>
                <div class="_left _rel uniform-show">
                  <img class="uniform-img"
                       :src="matchResult.posterB || ''"
                       alt=""
                       @click="showPost(matchResult.posterB)">
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="summary-item _clearfix">
          <div class="summary-wrap _clearfix">
            <div class="summary-title ">
              <i class="title-icon referee"></i>
              <span>裁判：</span>
            </div>
            <div class="referee" v-if="refereeList.length > 0">
              <ul class="referee-list _flex">
                <li class="referee-item _flex-item" v-for="(item, index) in refereeList">
                  <div class="referee-portrait">
                    <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
                  </div>
                  <p>{{item.refereeName}}</p>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li class="summary-item _clearfix">
          <div class="summary-wrap _clearfix">
            <div class="summary-title _left">
              <i class="title-icon mark"></i>
              <span>备注：</span>
            </div>
            <div class="summary-content _right">{{matchResult.noteInfo}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import WeatherShow from '@/components/tools/WeatherShow'

  export default {
    data () {
      return {
      }
    },
    props: {
      matchResult: Object,
      homeUniform: Object,
      awayUniform: Object,
      refereeList: Array,
      weatherInfo: ''
    },
    computed: {
    },
    methods: {
      showPost (img) {
        if (!img) {
          return
        }
        let sendData = {
          type: 'callImageSwiper',
          currentIndex: 0,
          imageList: [img]
        }
        if (this.$sendDataToClient(sendData)) {
          return
        }
        this.$store.commit('setTransData', sendData)
        this.$router.push({
          path: 'viewpicture'
        })
      }
    },
    components: { WeatherShow }
  }
</script>
