<!-- WeatherShow.vue 天气显示 -->
<style lang="less" scoped>
  .weather-container {
    .weather-icon {
      width: .45rem;
      height: .45rem;
      vertical-align: bottom;
      font-size: 0;
    }
  }
</style>

<template>
  <div class="weather-container">
    <span>{{weatherInfo.lowTemp}}℃-{{weatherInfo.highTemp}}℃</span>
    <img :src="getWeatherIco" class="weather-icon" />
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      weatherInfo: ''
    },
    computed: {
      getWeatherIco () {
        let icoSrc = ''
        switch (parseInt(this.weatherInfo.weather)) {
          case 0:
            icoSrc = 'http://share.greenplayer.cn/share/img/match/icon_weather_sunny.png'
            break
          case 1:
          case 2:
            icoSrc = 'http://share.greenplayer.cn/share/img/match/icon_weather_cloudy.png'
            break
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 19:
          case 21:
          case 22:
          case 23:
          case 24:
          case 25:
            icoSrc = 'http://share.greenplayer.cn/share/img/match/icon_weather_rain.png'
            break
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 26:
          case 27:
          case 28:
            icoSrc = 'http://share.greenplayer.cn/share/img/match/icon_weather_snow.png'
            break
          case 18:
            icoSrc = 'http://share.greenplayer.cn/share/img/match/icon_weather_fog.png'
            break
          case 20:
          case 29:
          case 30:
            icoSrc = 'http://share.greenplayer.cn/share/img/match/icon_weather_stand.png'
            break
          case 53:
            icoSrc = 'http://share.greenplayer.cn/share/img/match/icon_weather_haze.png'
            break
          default: icoSrc = 'http://share.greenplayer.cn/share/img/match/icon_weather_sunny.png'
        }
        return icoSrc
      }
    }
  }
</script>
