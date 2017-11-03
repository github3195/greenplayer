<!-- 导航列表 -->
<style lang='less' scoped>
  .nav-item {
    display: block;
    height: .7rem;
    line-height: .7rem;
    color: #646464;
    font-size: .28rem;
    background: #fff;
    border-bottom: 1px solid #cdcdcd;
    &.active {
      color: #fff;
      background: rgb(50, 184, 71);
      border-color: transparent;
    }
  }
</style>

<template>
  <div>
  	<nav class="_flex">
	   <a v-for="(item, index) in navList" class="_flex-item _txt-center nav-item" href="javascript:;" @click="toggleActive(index)" :class="{'active': index === curIndex}">{{item}}</a>
	   </nav>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // navList: ['详情', '名单', '评价'],
        curIndex: 0
      }
    },
    props: {
      navList: Array
    },
    methods: {
      toggleActive: (i) => {
        this.curIndex = i
      }
    }
  }
</script>
