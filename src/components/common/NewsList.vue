<!-- 新闻列表 NewsList.vue -->
<style lang="less" scoped>
  .news-container {
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .news-list {
      .news-item {
        position: relative;
        display: flex;
        height: 1.36rem;
        padding: .18rem;
        &::after {
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: #c8c8c8;
          transform: scaleY(0.5);
        }
        .news-link {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: 2;
        }
        .news-image {
          flex: 0 0 1.1rem;
          height: 1rem;
          margin-right: .18rem;
          overflow: hidden;
        }
        .news-desc {
          position: relative;
          .news-title {
            line-height: .3rem;
            max-height: .6rem;
            overflow: hidden;
            font-size: .24rem;
            color: #282828;
          }
          .news-date {
            position: absolute;
            bottom: 0;
            font-size: .2rem;
            color: #505050;
          }
          .news-read {
            position: absolute;
            bottom: 0;
            right: 0;
            font-size: .2rem;
            color: #505050;
          }
        }
      }
    }
    .load-more {
      text-align: center;
      line-height: 1rem;
    }
  }
</style>

<template>
  <div class="news-container">
    <ul class="news-list">
      <li class="news-item" v-for="(item, index) in newsList">
        <a class="news-link" target="_blank" :href="`http://share.greenplayer.cn/share/green/#/post?newsId=${item.id}`"></a>
        <div class="news-image">
          <img class="_fullimg" :src="item.newsCoverImage" alt="">
        </div>
        <div class="news-desc">
          <p class="news-title">{{item.title}}</p>
          <p class="news-date">{{item.addTime}}</p>
          <p class="news-read" v-show="">{{item.browserNumber}}</p>
        </div>
      </li>
    </ul>
    <div class="load-more" @click="loadMore">
      <p v-show="true">{{loadText}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        gameId: this.getQueryString('gameId'),
        newsList: [],
        pageId: 1,
        loadText: '点击加载更多内容',
        loadable: true,   // 是否还有数据可加载
        loading: false    // 是否正在加载中
      }
    },
    props: {},
    computed: {
      apiAddress () { return this.$store.state.apiAddress }
    },
    mounted () {
      this.$store.commit('setLoading', true)
      this.loadAllNewsByGameId()
    },
    methods: {
      loadAllNewsByGameId (pageId, numberPerPage) {
        let url = `${this.apiAddress}/api/news/loadAllNewsByGameId.php`
        let param = {
          json: `{"uid":127,"newsTypeId":"101","pageId":"${this.pageId}","numberPerPage":15,"gameId":${this.gameId}}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.newsList = this.newsList ? this.newsList.concat(res.data.returndata) : res.data.returndata
            if (res.data.returndata.length < 15) {
              this.loadText = '没有更多内容了'
              this.loadable = false
            }
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.loading = false
          this.$store.commit('setLoading', false)
        }).catch(err => {
          console.log(err)
          this.$store.commit('setLoading', false)
        })
      },
      loadMore (e) {
        if (!this.loadable || this.loading) {
          return
        }
        this.pageId++
        this.loading = true
        this.$store.commit('setLoading', true)
        this.loadAllNewsByGameId()
      }
    }
  }
</script>
