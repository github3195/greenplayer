<!-- ArticleList.vue -->
<style lang="less" scoped>
  .article-container {
    color: #282828;
    width: 100%;
    .article-list {
      background: #f0f0f0;
    }
    .article-item {
      padding: .2rem;
      background: #fff;
      margin-bottom: .1rem;
    }
    .article-origin {
      display: flex;
      .portrait {
        flex: 0 0 .8rem;
        width: .8rem;
        height: .8rem;
        box-shadow: 0 0 1px #a0a0a0;
        border-radius: 50%;
        margin-right: .1rem;
      }
      .desc {
        flex: 1;
        line-height: .4rem;
        overflow: hidden;
        .name {
        }
        .date {
          font-size: .2rem;
          color: #646464;
          white-space: pre;
          span {
            font-size: .22rem;
          }
          .author {
            font-size: .24rem;
            color: #282828;
          }
        }
      }
    }
    .article-content {
      position: relative;
      margin: .1rem 0;
      line-height: .4rem;
      white-space: pre-line;
      word-break: break-word;
      overflow: hidden;
    }
    .article-show {
      .photo-list {
        .photo {
          float: left;
          width: 2.3rem;
          height: 2.3rem;
          margin-right: .1rem;
          margin-bottom: .1rem;
          overflow: hidden;
          &:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
      .video {
        background: #000;
        height: 4rem;
        margin-bottom: .2rem;
      }
      .match-result {
        background: #f0f0f0;
      }
      .place-content {
        background: #f0f0f0;
        height: 1.5rem;
        padding: .1rem;
        display: flex;
        overflow: hidden;
        .portrait {
          flex: 0 0 1.3rem;
          width: 1.3rem;
          height: 1.3rem;
          margin-right: .2rem;
        }
        .name {
          line-height: .36rem;
          height: 1.08rem;
          overflow: hidden;
        }
        .type {
          font-size: .2rem;
          line-height: .22rem;
        }
      }
    }
    .article-tool {
      display: flex;
      justify-content: space-between;
      margin-top: .2rem;
      .share {
        flex: 0 0 .44rem;
        width: .44rem;
        height: .44rem;
      }
      .comment {
        display: flex;
        vertical-align: middle;
        .praise {
          display: flex;
          align-items: center;
          margin-right: .2rem;
        }
        .reply {
          display: flex;
          align-items: center;
        }
        img {
          width: .4rem;
          height: .4rem;
          margin-right: .1rem;
        }
      }
    }
  }
</style>

<template>
  <div class="article-container">
    <ul class="article-list">
      <li class="article-item" v-for="item in articleList" @click="jump(item.TopicType, item.topicId)">
        <div class="article-origin">
          <div class="portrait">
            <img class="_fullimg _border-radius50" :src="formatPortrait(item)" alt="">
          </div>
          <div class="desc">
            <div class="name _ellipsis">{{formatNickName(item)}}</div>
            <div class="date">{{item.addTime?item.addTime.replace(/:\d+$/, ''):'未知'}}<span v-if="item.nickName && pageType!=6">    来自  </span><span class="author" v-if="item.nickName && pageType!=6">{{item.nickName}}</span>
            </div>
          </div>
        </div>
        <div class="article-content" :style="{'max-height': isDetail ? 'none': '2rem'}" v-html="getContent(item)"></div>
        <div class="article-show">
          <!-- 文章类型为0 图片集，或者有图片就显示 -->
          <div v-if="item.photolist">
            <ul class="photo-list _clearfix">   <!-- 图片 -->
              <li class="photo" v-for="photo in item.photolist" v-if="+photo.type===0">
                <img class=""
                     :src="photo.photo.replace(/(!\/rotate\/auto)|(!small)|(!big)/, '') + '!static'"
                     @click.stop="showImage"
                     @load.stop="imageLoaded">
              </li>
            </ul>
            <ul class="video-list" @click.stop>   <!-- 视频 -->
              <li class="video" v-for="photo in item.photolist" v-if="+photo.type===2">
                <video :src="photo.photo"
                       class="_fullimg"
                       controls>不支持视频</video></li>
            </ul>
          </div>
          <!-- 文章类型为 10 赛后战报，如果有比赛id和内容，则显示 -->
          <div class="match-result" v-if="+item.MatchId > 0 && item.matchInfo.a_name">
            <match-against :matchInfo="formatMatchInfo(item.matchInfo, item.MatchId, item.quizId)"
                            @click.stop
                            :isQuiz="!!item.quizId"></match-against>
          </div>
          <!-- 文章类型为1~7，11~13的显示 -->
          <div v-else-if="+item.TopicType>=1 && +item.TopicType<=7" @click.stop="goOtherTopicDetail(item)">
            <div class="place-content">
              <div class="portrait">
                <img class="_fullimg" :src="getLinkType(item).portrait" alt="">
              </div>
              <div class="desc">
                <div class="name">{{item.placeName}}</div>
                <div class="type">{{getLinkType(item).desc}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="article-tool" v-if="!isDetail">
          <div class="share" @click.stop="callShare(item.TopicType, item)" v-if="fromApp">
            <img class="_fullimg" src="//share.greenplayer.cn/share/img/icon/content_icon_zhuanfa_off@2x.png.jpg" alt="">
          </div>
          <div class="comment">
            <div class="praise">
              <img src="//share.greenplayer.cn/share/img/icon/content_icon_dianzan_off@2x.png.jpg" alt="">
              <span>{{item.praisenum || '0'}}</span>
            </div>
            <div class="reply">
              <img src="//share.greenplayer.cn/share/img/icon/content_icon_pinglun1_nor@2x.png.png" alt="">
              <span>{{item.replynum || '0'}}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import MatchAgainst from './MatchAgainst'
  let qqface = require('@/assets/js/emojiCode.js')

  export default {
    data () {
      return {
        fromApp: this.getQueryString('fromApp'),
        pageType: this.getQueryString('pageType')
      }
    },
    props: {
      articleList: '',
      isDetail: ''    // 标识是点进来查看帖子详情
    },
    methods: {
      getContent (obj) {    // 格式化content 内容
        if (+obj.TopicType === 0 || +obj.TopicType === 14) {
          return this.formatContent(obj.content)
        } else if (+obj.TopicType === 15) {
          return `<span style="color:#32b847;">【比赛战报】</span>${obj.comment}`
        } else if (+obj.TopicType === 16) {
          return `<span style="color:#32b847;">【赛事战报】</span>${obj.comment}`
        } else {
          return this.formatContent(obj.comment)
        }
      },
      formatMatchInfo (item, matchId, quizId) {   // 格式化比赛内容
        let obj = {
          matchId: matchId,
          quizId: quizId,
          homeIcon: item.a_icon,
          awayIcon: item.b_icon,
          homeName: item.a_name,
          awayName: item.b_name,
          homeCoat: item.homeUniform.coatColor ? item.homeUniform.coatColor.replace(/0x/, '#') : '',
          homePant: item.homeUniform.pantsColor ? item.homeUniform.pantsColor.replace(/0x/, '#') : '',
          homeSock: item.homeUniform.socksColor ? item.homeUniform.socksColor.replace(/0x/, '#') : '',
          awayCoat: item.awayUniform.coatColor ? item.awayUniform.coatColor.replace(/0x/, '#') : '',
          awayPant: item.awayUniform.pantsColor ? item.awayUniform.pantsColor.replace(/0x/, '#') : '',
          awaySock: item.awayUniform.socksColor ? item.awayUniform.socksColor.replace(/0x/, '#') : '',
          homeScore: item.cur_score_a,
          awayScore: item.cur_score_b,
          matchTime: item.matchTime ? item.matchTime.replace(/:\d+$/, '') : '未知',
          courtName: item.courtName || '未知'
        }
        return obj
      },
      goOtherTopicDetail (content) {    // 跳转其他的详情
        let sendData = {
          type: 'goOtherTopicType',
          topicContent: content
        }
        if (this.$sendDataToClient(sendData)) {
          return
        }
      },
      getLinkType (obj) {   // 获取类型为1-7,11-13的显示内容
        if (+obj.TopicType === 1) {
          return {
            portrait: '//share.greenplayer.cn/share/img/topicicon/icon1.png',
            desc: '参赛球队名单'
          }
        } else if (+obj.TopicType === 2) {
          return {
            portrait: '//share.greenplayer.cn/share/img/topicicon/icon2.png',
            desc: '球队分组'
          }
        } else if (+obj.TopicType === 3) {
          return {
            portrait: '//share.greenplayer.cn/share/img/topicicon/icon3.png',
            desc: '赛程'
          }
        } else if (+obj.TopicType === 4) {
          return {
            portrait: '//share.greenplayer.cn/share/img/topicicon/icon4.png',
            desc: '比赛榜单'
          }
        } else if (+obj.TopicType === 5) {
          return {
            portrait: '//share.greenplayer.cn/share/img/topicicon/icon5.png',
            desc: '数据'
          }
        } else if (+obj.TopicType === 6) {
          return {
            portrait: '//share.greenplayer.cn/share/img/topicicon/icon6.png',
            desc: '比赛事件'
          }
        } else if (+obj.TopicType === 7) {
          return {
            portrait: '//share.greenplayer.cn/share/img/topicicon/icon4.png',
            desc: '数据'
          }
        } else if (+obj.TopicType === 11) {
          return {
            portrait: '//share.greenplayer.cn/share/img/topicicon/icon11.png',
            desc: '数据'
          }
        } else if (+obj.TopicType === 12) {
          return {
            portrait: '//share.greenplayer.cn/share/img/topicicon/icon12.png',
            desc: '数据'
          }
        } else if (+obj.TopicType === 13) {
          return {
            portrait: '//share.greenplayer.cn/share/img/topicicon/icon13.png',
            desc: '数据'
          }
        }
        return {
          portrait: '//share.greenplayer.cn/share/img/topicicon/icon4.png',
          desc: '数据'
        }
      },
      showImage (e) {   // 调用图片轮播
        let target = e.srcElement || e.target
        let i = 0
        let imageNodes = target.parentNode.parentNode.childNodes
        let imageList = ([].slice.call(imageNodes)).map((item, index) => {
          if (item.firstChild === target) {
            i = index
          }
          let res = item.firstChild.src.replace('!small', '').replace('!static', '')
          return res
        })
        let data = `{"type":"callImageSwiper","currentIndex":${i},"imageList":${JSON.stringify(imageList)}}`
        let sendData = {
          type: 'callImageSwiper',
          currentIndex: i,
          imageList: imageList
        }
        if (this.$sendDataToClient(sendData)) {
          return
        }
        // 打开照片查看页面
        if (this.isDetail) {
          this.$store.commit('setTransData', JSON.parse(data))
          this.$router.push({
            path: 'viewpicture'
          })
        }
      },
      jump (type, id) {   // 页面跳转
        let sendData = {
          type: 'goTopic',
          topicType: type,
          topicId: id
        }
        if (this.$sendDataToClient(sendData)) {
          return
        }
      },
      callShare (type, content) {   // 调用分享
        let sendData = {
          type: 'callShare',
          shareType: 'shareTopic',
          topicContent: content
        }
        if (this.$sendDataToClient(sendData)) {
          return
        }
      },
      formatContent (val) {   // 处理评论的显示转换为用img标签
        let res = val.replace(/\[(.)+?\]/g, (m) => {
          let index = qqface.map(item => item.customCode).indexOf(m)
          if (index >= 0) {
            let img = `<img width="18" height="18" style="vertical-align:middle" src="${qqface[index].imgSrc}" alt="">`
            return img
          } else {
            return m
          }
        })
        return res
      },
      imageLoaded (e) {   // 图片加载完处理显示，不挤压尽量居中显示
        let img = e.target || e.srcElement
        let diff = Math.abs(img.width - img.height)
        let min = Math.min(img.width, img.height)
        let trans = diff / 3 / min * 100
        if (img.width > img.height) {
          img.style.height = '100%'
          img.style.transform = `translateX(-${trans}%)`
        } else {
          img.style.width = '100%'
          img.style.transform = `translateY(-${trans}%)`
        }
      },
      formatNickName (item) {
        if (this.pageType && +this.pageType === 6) {
          return item.nickName
        }
        return item.placeName || item.nickName
      },
      formatPortrait (item) {
        if (this.pageType && +this.pageType === 6) {
          return item.portrait
        }
        return item.placePortrait || item.portrait
      }
    },
    components: { MatchAgainst }
  }
</script>
