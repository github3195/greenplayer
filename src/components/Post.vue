<!-- 帖子、新闻 -->
<style lang="less" scoped>
  .post-container {
    max-width: 750px;
    margin: 0 auto;
  }
  .news-content {
    font-size: 16px;
    line-height: 28px;
    padding: .2rem;
    img {
      max-width: 100%;
    }
    iframe {
      display: block;
    }
  }
  .article-content {
    font-size: .28rem;
    color: #282828;
  }
  .source-target {
    font-size: 12px;
    padding-left: .2rem;
  }
</style>

<template>
  <div class="post-container">    
    <div class="news-content"
         v-html="newsContent"
         v-if="newsId"></div>
    <article-list class="article-content"
                  :articleList="articleContent"
                  :isDetail="true"
                  v-else-if="topicId"></article-list>
    <div class="source-target">{{sourceTarget}}</div>
    <comment></comment>
  </div>
</template>

<script>
  import Comment from './common/Comment'    // 评论点赞
  import ArticleList from './common/ArticleList'

  export default {
    name: 'Post',
    data () {
      return {
        newsId: this.getQueryString('newsId'),    // 新闻、战报的id
        isMatchReport: this.getQueryString('isMatchReport'),    // 标识是否是战报
        topicId: this.getQueryString('topicId'),    // 动态帖子的id
        newsContent: '',
        articleContent: [],
        sourceTarget: ''
      }
    },
    computed: {
      uid () { return this.$store.state.uid },
      apiAddress () { return this.$store.state.apiAddress }
    },
    created () {
      // 创建一个不发送访问来源的meta标签，以便图片请求能够跨过防盗链
      let node = document.createElement('meta')
      node.name = 'referrer'
      node.content = 'never'
      document.head.appendChild(node)
    },
    mounted () {
      this.$store.commit('setTopBar', true)
      this.$store.commit('setUserList', true)
      if (this.isMatchReport) {   // 战报
        this.getMatchReportById()
      } else if (this.newsId) {    // 普通新闻
        this.loadNewsContentById()
      }
      if (this.topicId) {   // 动态帖子
        this.loadArticleByTopicId()
      }
      window.jump = matchId => {    // 注册一个全局跳转方法，处理比赛链接跳转，因为content里的脚本似乎不会加载执行
        window.open(`http://share.greenplayer.cn/share/green/#/matchdetail?matchId=${matchId}`)
      }
      window.jumpGame = gameId => {   // 跳转赛事榜单
        let url = `${this.apiAddress}/api/game/gameBasicInfo.php`
        let param = {
          json: `{"uid":"${this.uid || 250}","gameId":"${gameId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let isCup = 'false'
            if (+res.data.returndata.gametype === 3) {
              isCup = 'true'
            }
            location.href = `http://share.greenplayer.cn/share/MHMenuScoreResult.html?gameId=${gameId}&isBeiSai=${isCup}`
            // window.open 打不开链接，有毒， 解药不知道
            // window.open(`http://share.greenplayer.cn/share/MHMenuScoreResult.html?gameId=${gameId}&isBeiSai=${isCup}`)
          }
        })
      }
    },
    methods: {
      loadNewsContentById () {    // 加载抓取的新闻内容
        let url = `${this.apiAddress}/api/news/loadNewsContentById.php`
        let uid = this.uid || 250
        let param = {
          json: '{"uid":' + uid + ',"newsId":' + this.newsId + '}'
        }
        this.$axios.post(url, param).then(res => {
          document.title = res.data.returndata[0].title
          this.newsContent = res.data.returndata[0].newsContent
          this.sourceTarget = res.data.returndata[0].sourceTag
          this.$store.commit('setWxShareTitle', document.title)
          this.$store.commit('setWxShareDesc', document.title)
          this.$store.commit('setWxShareImgUrl', res.data.returndata[0].newsCoverImage)
          this.$nextTick(this.handleImage)
          this.$nextTick(this.handleFont)
        }).catch(err => {
          console.log(err)
        })
      },
      getMatchReportById () {   // 加载APP编辑的赛后战报
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"match_match_getMatchReportById","topicId":${this.newsId}}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            document.title = res.data.returndata.title
            this.newsContent = res.data.returndata.content
            this.$store.commit('setWxShareTitle', document.title)
            this.$store.commit('setWxShareDesc', document.title)
            this.$store.commit('setWxShareImgUrl', res.data.returndata.image)
            this.$nextTick(this.handleImage)
            this.$nextTick(this.handleFont)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadArticleByTopicId () {   // 251 获取帖子详情
        document.title = '帖子详情'
        let url = `${this.apiAddress}/api/bbs/loadArticleByTopicId.php`
        let param = {
          json: `{"uid":"${this.uid || 127}","topicId":"${this.topicId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata.article
            this.articleContent.push(data)
            this.$store.commit('setWxShareTitle', data.content)
            this.$store.commit('setWxShareDesc', `来自 ${data.nickName || '绿茵场APP'}`)
            this.$store.commit('setWxShareImgUrl', data.placePortrait || data.portrait)
            this.$nextTick(this.handleVideo)
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      handleImage () {    // 处理文章内图片大小，因为抓取的新闻图片大小显示不可控
        var img = document.querySelectorAll('.news-content img')
        Array.prototype.slice.call(img).forEach(item => {
          item.style.maxWidth = '100%'
        })
        this.handleVideo()
      },
      handleVideo () {    // 视频加上封面和封底
        let videos = document.querySelectorAll('video')
        videos = Array.prototype.slice.call(videos)
        let videoSrc = []
        let playStatus = []   // 每个视频的播放状态，0 初始状态，1 播放目标视频，2 播放开头，3 播放结尾
        if (videos.length > 0) {
          videos.forEach((item, index) => {
            videoSrc.push(item.src)
            playStatus.push(0)
            item.addEventListener('play', e => {    // 视频开始播放
              let el = e.target || e.srcElement
              if (playStatus[index] === 0) {    // 初始
                el.src = 'http://share.greenplayer.cn/share/img/video/start.mp4'
                el.controls = false
                playStatus[index] = 2
                el.play()
              } else if (playStatus[index] === 1) {   // 正在播放目标视频
                return
              }
            })
            item.addEventListener('ended', e => {   // 视频结束播放
              let el = e.target || e.srcElement
              if (playStatus[index] === 2) {        // 播放的是开头部分，替换成目标视频
                el.src = videoSrc[index]
                playStatus[index] = 1
                el.play()
                el.controls = true
              } else if (playStatus[index] === 1) { // 播放的是目标视频，替换成结束部分
                el.src = 'http://share.greenplayer.cn/share/img/video/end.mp4'
                playStatus[index] = 3
                el.play()
                el.controls = false
              } else if (playStatus[index] === 3) { // 播放的是结束部分，回归初始状态
                el.src = videoSrc[index]
                playStatus[index] = 0
                el.controls = true
              }
            })
          })
        }
      },
      handleFont () {   // 处理抓取的文章帖子标签设置了rem属性，导致与页面rem计算冲突而造成的显示不正确
        var elems = document.querySelectorAll('.report-content *')
        Array.prototype.slice.call(elems).forEach(item => {
          if (/rem/.test(item.style.fontSize)) {
            item.style.fontSize = '16px'  // item.style.fontSize.replace('rem', 'em')
          }
          if (!item.src) {
            item.style.fontSize = '16px'
            item.style.color = '#282828'
            item.style.textAlign = 'left'
          }
        })
      }
    },
    components: { Comment, ArticleList }
  }
</script>
