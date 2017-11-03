<!-- 评论、点赞 -->
<style lang="less" scoped>
  .comment-container {
    .comment-summary {
      padding: 0 .2rem;
      border-bottom: 1px solid #dcdcdc;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: .6rem;
      font-size: .28rem;
      img {
        width: .4rem;
        height: .4rem;
        margin-right: .1rem;
        vertical-align: middle;
      }
    }
    .praise-content {
      padding: .2rem;
      word-break: keep-all;
      line-height: .4rem;
      font-size: .24rem;
      color: #646464;
      .praise-number {
        color: #32b847;
      }
      .praise-item {
        float: left;
        color: #5E81bE;
      }
      .praise-item-portrait {
        width: .66rem;
        height: .66rem;
        margin-right: .2rem;
        margin-top: .2rem;
      }
    }
    .comment-content {
      .comment-header {
        height: .5rem;
        line-height: .5rem;
        font-size: .24rem;
        color: #282828;
        padding-left: .1rem;
        border-left: .1rem solid #32b847;
        border-bottom: 1px solid #ccc;
      }
      .comment-list {
        .comment-item {
          margin: 0;
          padding: .2rem;
          border-bottom: 1px solid #ccc;
          .user-info {
            display: flex;
            height: 1rem;
            .user-portrait {
              flex-shrink: 0;
              margin: .1rem;
              width: .66rem;
              height: .66rem;
            }
            .user-desc {
              width: 5rem;
              height: .5rem;
              line-height: .5rem;
              .user-name {
                font-size: .26rem;
                color: #5E81bE;
              }
              .comment-time {
                font-size: .20rem;
                color: #646464;
              }
            }
          }
          .comment-text {
            padding: 0 .2rem 0 .8rem;
            line-height: .4rem;
            font-size: .26rem;
          }
        }
      }
      .load-more {
        height: .7rem;
        line-height: .7rem;
        text-align: center;
        font-size: .24rem;
        color: #32b847;
      }
    }
    .comment-editor {
      .editor-container {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: .98rem;
        transition: height .2s;
        background: #f0f0f0;
        z-index: 10;
        .editor-content {
          position: absolute;
          bottom: 100%;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          min-height: .98rem;
          background: #f0f0f0;
          .editor-area {
            display: flex;
            flex: 1;
            min-height: .68rem;
            margin: .15rem;
            margin-right: 0;
            align-items: center;
            background: #fff;
            .editor-icon {
              font-size: 0;
              flex-shrink: 0;
              width: .4rem;
              padding: .14rem 0;
            }
            .editor-input {
              flex: 1;
              padding: .14rem;
              border: 0;
              width: 1rem;
              min-height: .68rem;
              line-height: .4rem;
              font-size: .26rem;
            }
            .emoji {
              font-size: 0;
              flex-shrink: 0;
              width: .68rem;
              padding: .1rem;
            }
          }
          .send-btn {
            flex-basis: 1.5rem;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .button {
              display: block;
              text-align: center;
              font-size: .28rem;
              width: 1rem;
              height: .6rem;
              line-height: .6rem;
              background: #32b847;
              color: #fff;
              border-radius: 2px;
            }
          }
        }
        .emoji-container {
          height: 3.4rem;
          .swiper-container {
            width: 100%;
            height: 100%;
            .emoji-list {
              min-width: 100%;
              height: 100%;
              padding: 0 1%;
              background: #fff;
              .emoji-item {
                font-size: 0;
                width: 14%;
                height: 1rem;
                padding: .2rem;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div class="comment-container">
    <div class="comment-summary">
      <div @click="praiseNews" v-if="!hasPraise"><img src="//share.greenplayer.cn/share/img/icon/content_icon_dianzan_off@2x.png.jpg" alt="">{{praiseList.length}}</div>
      <div @click="hasPraiseNews" v-else><img src="//share.greenplayer.cn/share/img/icon/content_elect_blue_nor@2x.png" alt="">{{praiseList.length}}</div>
    </div>
    <div class="praise-content" v-show="true">
      已有 <span class="praise-number">{{praiseList.length}}</span> 人赞过这个帖子
      <ul class="praise-list _clearfix">
        <li class="praise-item" v-for="(item, index) in praiseList">
          <div class="praise-item-portrait">
            <img class="_fullimg _border-radius50" :src="item.portrait" alt="">
          </div>
          <!-- <span v-if="index>0">、</span><span>{{item.userName || item.nickName}}</span> -->
        </li>
      </ul>
    </div>
    <div style="height:.1rem;background:#eaeaea;"></div>
    <div class="comment-content">
      <p class="comment-header"> 评论（{{commentList.length}}）</p>
      <ul class="comment-list">
        <li class="comment-item" v-for="(item, index) in commentList">
          <div class="user-info">
            <div class="user-portrait">
              <img class="_fullimg _border-radius50 _block" :src="item.portrait" alt="">
            </div>
            <div class="user-desc">
              <p class="user-name _ellipsis">{{item.userName || item.nickName}}</p>
              <p class="comment-time _ellipsis">{{item.addTime}}</p>
            </div>
          </div>
          <div class="comment-text" v-html="formatContent(item.content)"></div>
        </li>
      </ul>
      <!-- <p class="load-more">没有更多评论了</p> -->
    </div>
    <div class="comment-editor">
      <div class="editor-container" :style="{height: editorContainerHeight}">
        <div class="editor-content">
          <div class="editor-area">
            <div class="editor-icon">
              <img class="_fullimg" src="//share.greenplayer.cn/share/img/icon/content_icon_pinglun_nor@2x.png.jpg" alt="">
            </div>
            <div class="editor-input" contenteditable="true" id="editor" @focus="editorFocus"></div>
            <div class="emoji" @click.stop="showEmoji">
              <img class="_fullimg" src="//share.greenplayer.cn/share/img/icon/footbar_icon_emoticon_nor@2x.png" alt="">
            </div>
          </div>
          <div class="send-btn">
            <a href="javascript:;" class="button" @click="comment">发送</a>
          </div>
        </div>
        <div class="emoji-container">
          <wc-swiper class="swiper-container" :autoplay="false">
            <wc-slide v-for="(item, index) in emojiList" :key="index">
              <ul class="emoji-list _clearfix">
                <li class="emoji-item _left" v-for="(emoji, i) in item">
                  <img width="25"
                       height="25"
                       @click.stop="addEmoji"
                       :data-code="emoji.customCode"
                       style="vertical-align:middle"
                       :src="emoji.imgUrl" alt="">
                </li>
              </ul>
            </wc-slide>
          </wc-swiper>
        </div>
      </div>
      <div :style="{height: placeholderHeight}"></div>
    </div>
  </div>
</template>

<script>
  let qqface = require('@/assets/js/emojiCode.js')

  export default {
    data () {
      return {
        newsId: this.getQueryString('newsId'),
        isMatchReport: this.getQueryString('isMatchReport'),
        topicId: this.getQueryString('topicId'),
        editorContainerHeight: '0',   // 编辑区的高度，点击表情的时候加高以显示表情
        placeholderHeight: '.98rem',
        praiseList: [],
        commentList: ''
      }
    },
    computed: {
      uid () {
        return this.$store.state.uid
      },
      apiAddress () {
        return this.$store.state.apiAddress
      },
      emojiList () {
        let arr = []
        let res = []
        qqface.forEach((item, index) => {
          arr.push({
            imgUrl: item.imgSrc,
            customCode: item.customCode
          })
          if (++index % 21 === 0 || index === qqface.length) {
            res.push(arr)
            arr = []
          }
        })
        return res
      },
      hasPraise () {
        if (!this.uid) {
          return false
        }
        let praiseUserIdList = this.praiseList.map(item => item.userId || item.uid)
        return praiseUserIdList.indexOf(this.uid) >= 0
      }
    },
    mounted () {
      if (this.isMatchReport) {   // 如果是战报
        this.showArticleDetailedInfo()
        this.loadArticlePraisers()
      } else if (this.newsId) {   // 欣慰、技术贴
        this.loadNewsContentById()
      }
      if (this.topicId) {   // 用户发帖
        this.loadArticlePraisers()
        this.loadArticleByTopicId()
      }
    },
    methods: {
      showEmoji () {    // 显示表情
        if (!this.uid) {
          this.$store.commit('showLogin')
          return false
        }
        if (this.editorContainerHeight === '0') {
          this.editorContainerHeight = '3.4rem'
          this.placeholderHeight = '4.38rem'
        } else {
          this.editorContainerHeight = '0'
          this.placeholderHeight = '.98rem'
        }
      },
      insertHtml (html) {    // 要插入的html代码
        let sel, range
        let editor = document.querySelector('#editor')
        if (window.getSelection) {
          sel = window.getSelection()
          if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0)
            if (range.startContainer !== editor &&
                [].slice.call(editor.childNodes).indexOf(range.startContainer) < 0) {  // 如果当前选中的不是编辑区，就退出
              editor.innerHTML += html
              return
            }
            range.deleteContents()
            let el = document.createElement('div')
            el.innerHTML = html
            let fragment = document.createDocumentFragment()
            let node
            let lastNode
            node = el.firstChild
            lastNode = fragment.appendChild(node)
            range.insertNode(fragment)
            if (lastNode) {
              range = range.cloneRange()
              range.setStartAfter(lastNode)
              range.collapse(true)
              sel.removeAllRanges()
              sel.addRange(range)
              editor.blur()
            }
          } else {
            editor.innerHTML += html
          }
        } else {    // 不支持getSelection的时候只能直接在文本尾插入
          editor.innerHTML += html
        }
      },
      addEmoji (e) {    // 点击表情并添加到评论中
        let target = e.srcElement || e.target
        this.insertHtml(target.outerHTML.replace(/"25"/g, '"20"'))
      },
      editorFocus (e) {    // ios下fixed bug ，先设置滚动到底部
        if (!this.uid) {
          e.preventDefault()
          this.$store.commit('showLogin')
          document.querySelector('#editor').blur()
          return false
        }
        this.editorContainerHeight = '0'    // 手机上聚焦要收起表情面板
        this.placeholderHeight = '.98rem'
        if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
          document.body.scrollTop = document.body.scrollHeight + 50
        }
      },
      praiseNews () {   // 点赞
        if (!this.uid) {
          this.$store.commit('showLogin')
          return false
        }
        if (this.isMatchReport || this.topicId) {   // 战报、帖子的点赞
          let url = `${this.apiAddress}/api/bbs/thumbUpForArticleAndReply.php`
          let articleId = this.newsId || this.topicId
          let param = {
            json: `{"articleType":0,"articleId":${articleId},"uid":${this.uid}}`
          }
          this.$axios.post(url, param).then(res => {
            if (res.data.status === 'success') {
              this.$store.commit('showToast', '点赞成功')
              this.loadArticlePraisers()
            } else {
              this.$store.commit('showToast', res.data.errMsg)
            }
          })
          return
        }
        let url = `${this.apiAddress}/api/news/userNewsClickPraise.php`
        let param = {
          json: `{"uid":${this.uid},"newsId":${this.newsId}}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.$store.commit('showToast', '点赞成功')
            this.loadNewsContentById()
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      hasPraiseNews () {
        this.$store.commit('showToast', '你已经赞过该帖子，不能重复点赞了！！！')
      },
      comment () {    // 发表评论
        if (!this.uid) {
          this.$store.commit('showLogin')
          return false
        }
        let editor = document.querySelector('#editor')
        if (!editor.innerHTML) {
          this.$store.commit('showToast', '评论不能为空')
          return false
        }
        let content = editor.innerHTML.replace(/<img[^>]+>/ig, (m) => {    // 把img标签替换成后台存储的表情code ，以便与客户端兼容
          return m.match(/\[.+?\]/)[0]
        })
        let url = `${this.apiAddress}/api/news/userNewsComment.php`
        let param = {
          json: `{"uid":${this.uid},"toUid":"","newsId":${this.newsId},"content":"${content}"}`
        }
        if (this.isMatchReport || this.topicId) {   // 战报或用户发帖的评论
          url = `${this.apiAddress}/api/bbs/replyToTopics.php`
          let topicId = this.newsId || this.topicId
          param = {
            json: `{"topicId":${topicId},"uid":${this.uid},"toUid":"0","content":"${content}"}`
          }
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.$store.commit('showToast', '评论成功')
            editor.innerHTML = ''
            if (this.isMatchReport) {
              this.showArticleDetailedInfo()
            } else if (this.newsId) {
              this.loadNewsContentById()
            } else if (this.topicId) {
              this.loadArticleByTopicId()
            }
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
        this.editorContainerHeight = '0'
        this.placeholderHeight = '.98rem'
      },
      loadNewsContentById () {    // 获取普通新闻的评论和点赞
        let url = `${this.apiAddress}/api/news/loadNewsContentById.php`
        let uid = this.uid || 250
        let param = {
          json: '{"uid":' + uid + ',"newsId":' + this.newsId + '}'
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            if (res.data.returndata[0].praiseUserList.length > 0 || res.data.returndata[0].commentUserList.length > 0) {
              this.praiseList = res.data.returndata[0].praiseUserList
              this.commentList = res.data.returndata[0].commentUserList
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      showArticleDetailedInfo () {    // 加载战报的评论列表
        let url = `${this.apiAddress}/api/bbs/showArticleDetailedInfo.php?topicid=${this.newsId}&uid=${this.uid}&pageId=1&numberPerPage=30`
        this.$axios.get(url).then(res => {
          if (res.data.status === 'success') {
            this.commentList = res.data.returndata
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      loadArticlePraisers () {    // 186 加载战报、帖子的点赞列表
        let url = `${this.apiAddress}/api/bbs/loadArticlePraisers.php`
        let articleId = this.newsId || this.topicId
        let param = {
          json: `{"articleId":${articleId}}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.praiseList = res.data.returndata
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      loadArticleByTopicId () {   // 251 获取用户发帖的评论详情
        let url = `${this.apiAddress}/api/bbs/loadArticleByTopicId.php`
        let param = {
          json: `{"uid":"${this.uid || 127}","topicId":"${this.topicId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.commentList = res.data.returndata.replies
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      formatContent (val) {   // 处理评论的显示转换为用img标签
        let res = val.replace(/\[(.)+?\]/g, (m) => {
          let index = qqface.map(item => item.customCode).indexOf(m)
          if (index >= 0) {
            let img = `<img width="20" height="20" style="vertical-align:middle" src="${qqface[index].imgSrc}" alt="">`
            return img
          } else {
            return m
          }
        })
        return res
      }
    }
  }
</script>
