<style scoped lang="less">
  #map {
    width: 100%;
    height: 100%;
  }
</style>

<template>
  <div id="map"></div>
</template>

<script>
  import AMap from 'AMap'

  export default {
    data () {
      return {
      }
    },
    props: {
      mapConfig: ''
    },
    mounted () {
      let map = new AMap.Map('map', {
        center: [113.9490365982, 22.5317537158],
        resizeEnable: true,
        zoom: 14
      })
      AMap.plugin(['AMap.ToolBar', 'AMap.Geolocation'], () => {
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Geolocation())
      })
    }
  }
</script>
