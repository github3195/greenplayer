<!-- ThirdPartyHome.vue 第三方主页 -->
<style lang="less" scoped>
  @mainColor: #32b847;
  .third-party-home {
    height: 100%;
    max-width: 750px;
    margin: 0 auto;
    font-size: .28rem;
    // 页面顶部
    .page-head {
      position: relative;
      width: 100%;
      height: 5rem;
      margin: auto;
    }
    // 顶部的轮播
    .page-swiper {
      height: 3.8rem;
      overflow: hidden;
    }
    // 顶部基本信息
    .basic-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1.5rem;
      padding: .2rem;
      display: flex;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      box-shadow: 0 -1px 1px #a0a0a0;
      background: #fff;
      z-index: 1;
      &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: .2rem;
        right: .2rem;
        height: 1px;
        background: #a0a0a0;
        transform: scaleY(0.5);
      }
      .portrait {
        position: relative;
        width: 1.1rem;
        height: 1.1rem;
        overflow: hidden;
        margin-right: .2rem;
        .gender-icon {
          position: absolute;
          right: 0;
          bottom: 0;
          height: .3rem;
          width: .3rem;
        }
      }
      .info {
        flex: 1;
        flex-shrink: 0;
        height: 1.1rem;
        position: relative;
        .name {
          position: absolute;
          left: 0;
          right: 0;
          font-size: .3rem;
          color: #282828;
          max-width: 4.5rem;
          max-height: .7rem;
          line-height: .36rem;
          overflow: hidden;
        }
        .status-icon {
          margin-left: .1rem;
          vertical-align: middle;
          width: .3rem;
          height: .3rem;
        }
        .comment {
          position: absolute;
          left: 0;
          bottom: 0;
          font-size: .22rem;
          color: #505050;
          max-width: 4.5rem;
          line-height: .3rem;
          // white-space: pre;
        }
        .court-list {
          position: absolute;
          left: 0;
          bottom: 0;
          height: .5rem;
          line-height: .35rem;
          width: 4.5rem;
          color: #646464;
          font-size: .22rem;
          display: flex;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          .court-item {
            flex-shrink: 0;
            padding: .1rem;
            &.active {
              color: #32b847;
              border-bottom: 1px solid #32b847;
            }
          }
        }
        .follow {
          position: absolute;
          right: 0;
          bottom: 0;
          display: block;
          width: 1rem;
          height: .44rem;
          line-height: .44rem;
          color: @mainColor;
          font-size: .22rem;
          text-align: center;
          border: 1px solid @mainColor;
          border-radius: 3px;
          &.unfollow {
            color: #5e81be;
            border-color: #5e81be;
          }
        }
      }
    }
    // 页面主内容，固定大小为屏幕宽高
    .page-container {
      // margin-top: 5rem;
      width: 100%;
      height: 100%;
      // background: #fafafa;
      overflow: hidden;
    }
    // 页面主内容内部，nav栏和主显示的可滚动区域
    .container-inner {
      position: relative;
      height: 100%;
      // 导航条
      .nav {
        display: flex;
        align-items: center;
        height: .9rem;
        background: #f0f0f0;
        padding-bottom: .1rem;
        .nav-item {
          flex: 1 0 25%;
          // width: 25%;
          height: .8rem;
          line-height: .8rem;
          font-size: .3rem;
          color: #646464;
          background: #fff;
          text-align: center;
          -webkit-tap-highlight-color: transparent;
          &.active {
            color: @mainColor;
            border-bottom: 1.5px solid @mainColor;
          }
        }
      }
      // 页面主内容
      .page-group {
        position: absolute;
        left: 0;
        right: 0;
        top: .9rem;
        bottom: 0;
        .page-inner {
          display: flex;
          width: 100%;
          height: 100%;
          transition: all .2s;
        }
        .pages {
          flex: 0 0 100%;
          width: 100%;
          max-width: 100%;
          min-width: 100%;
          height: 100%;
          overflow: hidden;
          -webkit-overflow-scrolling: touch;
        }
      }
    }
  }
</style>
<style lang="less">
  .third-party-home{
    .swiper-container {
      height: 100%;
    }
  }
</style>

<template>
  <div class="third-party-home">
    <div class="page-head">
      <div class="page-swiper" >
        <!-- v-if 防止异步数据未加载完组件已渲染造成无法滑动到除第一屏外的轮播 -->
        <wc-swiper class="swiper-container" v-if="coverPic.length>0" :pagination="false" :autoplay="false">
          <wc-slide v-for="(item, index) in coverPic" :key="index">
            <img class="_fullimg" :src="item.replace('!small', '')" alt="">
          </wc-slide>
        </wc-swiper>
      </div>
      <div class="basic-info">
        <div class="portrait">
          <img class="_fullimg"
               :class="{'_border-radius50': pageType == 4 || pageType == 1 || pageType == 7}"
               :src="portrait"
               @click="showImage(portrait)"
               alt="">
          <img v-if="gender" class="gender-icon" :src="+gender===1?manIcon:womenIcon" alt="">
        </div>
        <div class="info">
          <p class="name">{{name}}<img v-if="+pageType===1&&statusIcon" class="status-icon" :src="statusIcon" alt=""></p>
          <div class="court-list" v-if="+pageType === 8 && courtList.length > 0">
            <div class="court-item"
                 :class="{active: index==currentCourt}"
                 v-for="(item, index) in courtList"
                 @click="switchCourt(item.id, index)">{{item.name}}</div>
          </div>
          <p class="comment _ellipsis" v-else>{{signature}}</p>
          <a class="follow"
             :class="{unfollow:+isFollow===1}"
             href="javascript:;"
             v-if="fromApp && +pageType!==8"
             @click="toggleFansForTarget">{{+isFollow===1?'取消':'+关注'}}</a>
        </div>
      </div>
    </div> 
    <div class="page-container">
      <div class="container-inner">
        <nav class="nav" v-if="+pageType!==8">
          <!-- 导航栏，根据不同的主页显示不同内容 -->
          <div class="nav-item" :class="{active: nav===0}" @click="nav = 0">资料</div>
          <div class="nav-item" :class="{active: nav===1}" @click="nav = 1" v-if="+pageType!==7">
            {{+pageType===1||+pageType===4||+pageType===6?'球队':+pageType===2?'成员':+pageType===3?'名单':'赛事'}}
          </div>
          <div class="nav-item" :class="{active: nav===2}" @click="nav = 2">
            {{+pageType===1||+pageType===2||+pageType===4||+pageType===6?'战绩':+pageType===3?'数据':+pageType===7?'执法':'球队'}}
          </div>
          <div class="nav-item" :class="{active: nav===3}" @click="nav = 3">动态</div>
        </nav>
        <div class="gray-place-bar" v-else></div>
        <div class="page-group" :style="{top: +pageType===8?'0':'.9rem'}">
          <div class="page-inner" :style="{transform: 'translateX('+translateX+')'}">
            <!-- 第一屏 资料 较简单，都用同一个组件-->
            <div class="pages" :style="{overflow: +bodyScrollTop === +containerOffsetTop ? 'auto' : 'hidden'}">
              <material :material="material"></material>
            </div>
            <!-- 第二屏 球队、名单 需要判断主页类型并展示相应内容-->
            <div class="pages" :style="{overflow: +bodyScrollTop === +containerOffsetTop ? 'auto' : 'hidden'}">
              <column-four-list v-if="+pageType===1"
                                :type="1"
                                :data="playerTeamList"></column-four-list><!-- 球员主页 -->
              <member-list v-else-if="+pageType===2 || +pageType===3"
                           :memberList="memberList"></member-list><!-- 球队主页 成员、赛事主页 名单 -->
              <team-list v-else-if="+pageType===4" :data="coachTeamList"></team-list><!-- 教练主页 执教球队 -->
              <div v-else-if="+pageType===5"><!-- 协会主页 赛事列表 -->
                <association-game-list v-for="(item, index) in associationGame"
                                       :data="item"
                                       :type="5"
                                       :key="index">
                </association-game-list>
              </div>
              <column-four-list v-if="+pageType===6"
                                :type="6"
                                :data="clubTeamlist"></column-four-list>
            </div>
            <!-- 第三屏 战绩 需要判断主页类型并展示相应内容-->
            <div class="pages" :style="{overflow: +bodyScrollTop === +containerOffsetTop ? 'auto' : 'hidden'}">
              <div v-if="+pageType===1||+pageType===2||+pageType===4||+pageType===6||+pageType===7"><!-- 球员、球队、教练、俱乐部、裁判 战绩 -->
                <div v-if="honorsList.length>0">
                  <home-honor-list :honorsList="honorsList"></home-honor-list>
                </div>
                <div v-if="matchesList.length>0"
                     class="matches-list border-bottom"
                     v-for="item in matchesList">
                  <match-against :matchInfo="item"></match-against>
                </div>
                <div v-if="matchesList.length>0">
                  <div v-if="recordCanLoadMore"
                       style="line-height:1rem;"
                       class="_txt-center"
                       @click="loadMoreRecord">点击加载更多</div>
                  <div v-else style="line-height:1rem;" class="_txt-center">没有更多内容了</div>
                </div>
                <!-- 没有数据时显示 -->
                <div v-if="matchesList.length<=0" style="line-height:2rem;" class="_txt-center">暂无数据</div>
              </div>
              <div v-if="+pageType===3" style="height:100%;"><!-- 赛事主页 赛事数据 -->
                <game-data-list :showCredit="true"
                                :gameBasicInfo="gameBasicInfo"
                                :scrollable="+bodyScrollTop === +containerOffsetTop">
                </game-data-list>
              </div>
              <column-four-list v-if="+pageType===5"
                                :type="5"
                                :data="associationTeams"><!-- 协会主页 协会下的球队 -->
              </column-four-list>
            </div>
            <!-- 第四屏 动态 较简单，都用同一个组件-->
            <div class="pages" :style="{overflow: +bodyScrollTop === +containerOffsetTop ? 'auto' : 'hidden'}">
              <div v-if="articleList.length>0">
                <article-list :articleList="articleList"></article-list>
                <div v-if="articleCanLoadMore"
                     style="line-height:1rem;"
                     class="_txt-center"
                     @click="loadMoreArticles">点击加载更多</div>
                <div v-else style="line-height:1rem;" class="_txt-center">没有更多内容了</div>
              </div>
              <div v-else style="line-height:2rem;" class="_txt-center">暂无数据</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Material from './common/Material'    // 资料卡
  import MatchAgainst from './common/MatchAgainst'    // 战绩卡
  import TeamList from './common/TeamList'    // 球队卡
  import MemberList from './common/MemberList'    // 成员
  import GameDataList from './common/GameDataList'    // 赛事数据
  import ArticleList from './common/ArticleList'    // 动态列表
  import ColumnFourList from './common/ColumnFourList'    // 球员加入球队列表、协会下球队列表
  import HomeHonorList from './common/HomeHonorList'    // 荣誉列表
  import AssociationGameList from './common/AssociationGameList'    // 协会赛事列表

  export default {
    name: 'ThirdPartyHome',
    data () {
      return {
        nav: 0,   // tab
        fromApp: this.getQueryString('fromApp'),    // 在APP内的页面
        bodyScrollTop: document.body.scrollTop,    // 页面滚动距离
        containerOffsetTop: -1,     // 内容区距离页面顶部，与bodyScrollTop计算得出内容区是否滚动
        pageType: this.getQueryString('pageType'),    // 页面类型，1是球员，2是球队，3是赛事，4是教练，5是协会
        coachId: this.getQueryString('coachId'),    // 教练id
        associationId: this.getQueryString('associationId'),    // 协会id
        playerId: this.getQueryString('playerId'),    // 球员id
        teamId: this.getQueryString('teamId'),    // 球队id
        gameId: this.getQueryString('gameId'),    // 赛事id
        clubId: this.getQueryString('clubId'),    // 俱乐部id
        refereeId: this.getQueryString('refereeId'),   // 裁判id
        courtId: this.getQueryString('courtId'),    // 球场id
        name: '',   // 名称
        signature: '',    // 签名
        portrait: '',   // 头像
        statusIcon: '',   // 状态图标
        coverPic: [],   // 背景图
        gender: '',    // 性别
        isFollow: 0,
        gameBasicInfo: '',
        manIcon: 'http://share.greenplayer.cn/share/img/playerData/man.png',    // 男性
        womenIcon: 'http://share.greenplayer.cn/share/img/playerData/women.png',    // 女性
        material: {
          age: '',    // 设置资料对象的时候，似乎要默认一个属性，才可以正常赋上响应的值
          foundingTime: '',
          gameDate: '',
          area: '',
          telephone: '',
          courtService: ''
        },
        memberList: [],    // 球队成员，赛事名单
        coachTeamList: '',    // 教练的执教球队
        honorsList: [],   // 荣誉列表
        matchesList: [],    // 战绩列表
        recordCanLoadMore: true,    // 战绩可加载更多
        recordPage: 1,      // 战绩加载的页数
        playerTeamList: [],   // 球员所在球队列表
        associationTeams: '',   // 协会所有球队
        associationGame: '',    // 协会所有赛事
        clubTeamlist: '',     // 俱乐部下所有梯队
        courtList: '',      // 球场的场地
        currentCourt: 0,
        articleList: [],   // 文章动态列表
        articleCanLoadMore: true,   // 文章可以加载更多
        articlePage: 1     // 文章的加载页数
      }
    },
    computed: {
      translateX () {
        return `-${this.nav * 100}%`
      },
      apiAddress () {
        return this.$store.state.apiAddress
      },
      uid () {
        return this.getQueryString('uid') || this.$store.state.uid
      }
    },
    mounted () {
      document.documentElement.style.height = document.body.style.height = '100%'
      document.body.scrollTop = 0
      document.querySelector('#app').style.height = '100%'
      document.body.onscroll = this.bodyScroll    // 绑定滚动事件
      if (this.fromApp) {
        this.$store.commit('setTopBar', false)
        this.$store.commit('setUserList', false)
      } else {
        this.$store.commit('setTopBar', true)
        this.$store.commit('setUserList', false)
      }
      this.handlePage()   // 根据参数处理页面显示的内容
      let sendData = {
        type: 'showShareButton',
        show: 1
      }
      this.$sendDataToClient(sendData)
    },
    watch: {
      $route (val, oldVal) {
        // 因为可能是同个路由跳转，所以路由变化时初始化数据
        if (val.name !== oldVal.name) {
          return
        }
        document.body.scrollTop = 0
        this.nav = 0   // tab
        this.fromApp = this.getQueryString('fromApp')    // 在APP内的页面
        if (this.fromApp) {
          this.$store.commit('setTopBar', false)
          this.$store.commit('setUserList', false)
        } else {
          this.$store.commit('setTopBar', true)
          this.$store.commit('setUserList', false)
        }
        this.bodyScrollTop = document.body.scrollTop    // 页面滚动距离
        this.containerOffsetTop = -1    // 内容区距离页面顶部，与bodyScrollTop计算得出内容区是否滚动
        this.pageType = this.getQueryString('pageType')    // 页面类型，1是球员，2是球队，3是赛事，4是教练，5是协会
        this.coachId = this.getQueryString('coachId')    // 教练id
        this.associationId = this.getQueryString('associationId')    // 协会id
        this.playerId = this.getQueryString('playerId')    // 球员id
        this.teamId = this.getQueryString('teamId')   // 球队id
        this.gameId = this.getQueryString('gameId')    // 赛事id
        this.clubId = this.getQueryString('clubId')   // 俱乐部id
        this.refereeId = this.getQueryString('refereeId')
        this.courtId = this.getQueryString('courtId')
        this.name = ''   // 名称
        this.signature = ''    // 签名
        this.portrait = ''   // 头像
        this.statusIcon = ''   // 状态图标
        this.coverPic = []   // 背景图
        this.gender = ''    // 性别
        this.isFollow = 0
        this.material = {
          age: '',    // 设置资料对象的时候，似乎要默认一个属性，才可以正常赋上响应的值
          foundingTime: '',
          gameDate: '',
          area: ''
        }
        this.memberList = []    // 球队成员，赛事名单
        this.coachTeamList = ''    // 教练的执教球队
        this.honorsList = []   // 荣誉列表
        this.matchesList = []    // 战绩列表
        this.recordCanLoadMore = true    // 战绩可加载更多
        this.recordPage = 1      // 战绩加载的页数
        this.playerTeamList = []   // 球员所在球队列表
        this.associationTeams = ''   // 协会所有球队
        this.associationGame = ''    // 协会所有赛事
        this.clubTeamlist = ''      // 俱乐部下所有梯队
        this.courtList = []       // 球场的场地
        this.articleList = []   // 文章动态列表
        this.articleCanLoadMore = true   // 文章可以加载更多
        this.articlePage = 1     // 文章的加载页数
        this.handlePage()
      }
    },
    methods: {
      handlePage () {   // 处理页面的类型，并加载相应的数据
        if (this.pageType === '1') {   // 球员主页
          document.title = '球员主页'
          this.loadPlayerBasicInfoNew()   // 加载球员基本信息
          this.loadSliderBackgroundList(1, this.playerId)   // 加载轮播图
          this.loadAllTeamsOfPlayer()   // 加载球员所在球队
          this.loadPlayerMatchHistory()   // 加载球员的历史战绩
          this.loadArticlesByTypeAndId(1, this.playerId)    // 加载球员动态
          this.identityPopularity(1, this.playerId)   // 记录点击数
        } else if (this.pageType === '2') {    // 球队主页
          document.title = '球队主页'
          this.loadTeamBasicInfo()    // 加载球队基本信息
          this.loadSliderBackgroundList(2, this.teamId)   // 加载轮播图
          this.loadTeamMatchHistory()   // 加载球队荣誉
          this.getTeamDataInfo()    // 加载球队战绩
          this.loadArticlesByTypeAndId(0, this.teamId)    // 加载球队动态
          this.identityPopularity(0, this.teamId)   // 记录点击数
        } else if (this.pageType === '3') {   // 赛事主页
          document.title = '赛事主页'
          this.loadGameBasicInfo()    // 加载赛事基本信息
          // this.loadSliderBackgroundList(4, this.gameId)   // 加载轮播图
          this.loadArticlesByTypeAndId(2, this.gameId)    // 加载赛事动态
          this.identityPopularity(2, this.gameId)   // 记录点击数
        } else if (this.pageType === '4') {   // 教练主页
          document.title = '教练主页'
          this.loadCoachBasicInfo()   // 加载教练基本信息
          this.loadSliderBackgroundList(4, this.coachId)   // 加载轮播图
          this.loadCoachingTeamList()   // 加载教练执教球队列表
          this.loadCoachingRecord()   // 加载教练的执教战绩
          this.identityPopularity(5, this.coachId)   // 记录点击数
        } else if (this.pageType === '5') {   // 协会主页
          document.title = '协会主页'
          this.loadAssociationBasicInfo()   // 加载
          this.loadAllTeamInAssociation()   // 加载协会下的球队
          this.loadAllGamesCreatedByAssociation()   // 加载协会所有赛事
          this.loadArticlesByTypeAndId(3, this.associationId)   // 加载协会动态
          this.identityPopularity(3, this.associationId)   // 记录点击数
        } else if (this.pageType === '6') {   // 俱乐部主页
          document.title = '俱乐部主页'
          this.loadClubHomePage()   // 加载俱乐部基本信息
          this.loadTeamListOfClub()   // 加载俱乐部球队
          this.loadMatchListOfClubTeam()    // 加载俱乐部梯队的比赛记录
          this.loadArticlesByTypeAndId(6, this.clubId)    // 加载俱乐部动态
          this.identityPopularity(6, this.clubId)   // 记录点击数
        } else if (this.pageType === '7') {   // 裁判主页
          document.title = '裁判主页'
          this.loadRefereeMainPageInfo()   // 加载裁判基本信息
          this.loadGameMatchListByRefereeRole()   // 加载裁判执法比赛
          this.loadArticlesByTypeAndId(4, this.refereeId)   // 加载裁判动态
          this.identityPopularity(4, this.refereeId)   // 记录点击数
        } else if (this.pageType === '8') {   // 球场主页
          document.title = '球场主页'
          this.getCourtInfo()
          this.getChildrenCourtList()
          this.identityPopularity(7, this.courtId)   // 记录点击数
        } else {
          document.title = '未知主页'
        }
      },
      bodyScroll (e) {    // 滚动的时候获得滚动距离
        this.bodyScrollTop = document.body.scrollTop
        if (document.querySelector('.page-container')) {
          this.containerOffsetTop = document.querySelector('.page-container').offsetTop
        }
      },
      toggleFansForTarget () {    // 关注或取消关注,0:球队1:球员 2:比赛;3裁判;4协会;5教练;6俱乐部;7球迷会
        if (!this.uid || +this.uid <= 0) {
          if (this.fromApp) {
            let sendData = {
              type: 'goLogin'
            }
            if (this.$sendDataToClient(sendData)) {
              return
            }
          }
          return
        }
        let url = +this.isFollow === 0 ? `${this.apiAddress}/api/common/addFansForTarget.php`
                                       : `${this.apiAddress}/api/common/removeFansForTarget.php`
        let targetId = ''
        let targetGroup = ''
        if (+this.pageType === 1) {
          targetId = this.playerId
          targetGroup = 1
        } else if (+this.pageType === 2) {
          targetId = this.teamId
          targetGroup = 0
        } else if (+this.pageType === 3) {
          targetId = this.gameId
          targetGroup = 2
        } else if (+this.pageType === 4) {
          targetId = this.coachId
          targetGroup = 5
        } else if (+this.pageType === 5) {
          targetId = this.associationId
          targetGroup = 4
        } else if (+this.pageType === 6) {
          targetId = this.clubId
          targetGroup = 6
        } else if (+this.pageType === 7) {
          targetId = this.refereeId
          targetGroup = 3
        } else {
          this.$store.commit('showToast', '无效的id和类型')
          return
        }
        let param = {
          json: `{"targetGroup":"${targetGroup}","targetId":"${targetId}","uid":"${this.uid}","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.isFollow = +this.isFollow === 0 ? 1 : 0
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadPlayerBasicInfoNew () {   // 获取球员基本信息
        let url = `${this.apiAddress}/api/player/loadPlayerBasicInfoNew.php`
        let param = {
          json: `{"uid":"${this.uid || 250}","targetPlayerId":"${this.playerId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata
            this.name = data.username
            this.portrait = data.portrait
            this.signature = data.signature
            this.statusIcon = data.statusIcon
            this.gender = data.gender
            this.isFollow = data.isFans
            // 设置微信分享
            this.$store.commit('setWxShareTitle', `${this.name} 球员主页`)
            this.$store.commit('setWxShareDesc', `${this.signature || data.introduction || data.area || ''}`)
            this.$store.commit('setWxShareImgUrl', this.portrait)
            this.$store.commit('setWxShareLink', location.href)
            // 设置APP内的分享
            window.shareConfig.title = `${this.name} 球员主页`
            window.shareConfig.imgUrl = this.portrait
            window.shareConfig.desc = `${this.signature || data.introduction || data.area || ''}`
            window.shareConfig.url = `http://share.greenplayer.cn/share/green/#/thirdpartyhome?pageType=1&playerId=${this.playerId}`
            // 设置资料卡内容
            this.material.age = this.getAge(data.birthday)
            this.material.height = data.height ? `${data.height}cm` : '未知'
            this.material.weight = data.weight ? `${data.weight}kg` : '未知'
            this.material.area = data.area || '未知'
            this.material.position = +data.position === 1
                                   ? '门将'
                                   : +data.position === 2
                                   ? '后卫'
                                   : +data.position === 3
                                   ? '中场'
                                   : +data.position === 4
                                   ? '前锋'
                                   : '未知'
            this.material.intro = data.introduction
            this.material.combat = data.SkillCredit
            let sendData = {
              type: 'message',
              msgType: 'playerStatus',
              msgContent: data.isActive,
              superManager: data.superManager,
              playerId: this.playerId,
              playerInfo: data,
              targetType: '1',
              targetId: this.playerId
            }
            this.$sendDataToClient(sendData)
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadAllTeamsOfPlayer () {   // 加载球员所在的球队
        let url = `${this.apiAddress}/api/team/loadAllTeamsOfPlayer.php`
        let param = {
          json: `{"playerId":"${this.playerId}","uid":"${this.uid || 250}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let captain = res.data.returndata.captain
            let enrolled = res.data.returndata.enrolled
            let posRef = res.data.returndata.posRef
            let arr1 = captain.map(item => {
              return {
                id: item.teamid,
                name: item.teamname,
                portrait: item.portrait,
                memberNumber: +item.memberNumber >= 0 ? item.memberNumber : 'N',
                acceptTime: item.accepttime ? item.accepttime.replace(/\s[:\d]+$/, '') : '未知',
                position: item.position.length > 0 ? this.getPosition(item.position, posRef) : '未知'
              }
            })
            let arr2 = enrolled.map(item => {
              return {
                id: item.teamid,
                name: item.teamname,
                portrait: item.portrait,
                memberNumber: +item.memberNumber >= 0 ? item.memberNumber : 'N',
                acceptTime: item.accepttime ? item.accepttime.replace(/\s[:\d]+$/, '') : '未知',
                position: item.position.length > 0 ? this.getPosition(item.position, posRef) : '未知'
              }
            })
            this.playerTeamList = arr1.concat(arr2)
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadPlayerMatchHistory (page) {   // 加载球员的历史战绩
        let url = `${this.apiAddress}/api/player/loadPlayerMatchHistory.php`
        let param = {
          json: `{"page":"${this.recordPage}","playerId":"${this.playerId}","uid":"${this.uid || 250}","numberPerPage":"20"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let matches = res.data.returndata
            if (matches.length < 20) {
              this.recordCanLoadMore = false
            }
            this.matchesList = this.matchesList.concat(matches.map(item => {
              return {
                matchId: item.matchId,
                homeIcon: item.a_picture,
                awayIcon: item.b_picture,
                homeName: item.party_a,
                awayName: item.party_b,
                homeScore: item.Score,
                awayScore: item.Lose,
                gameResult: item.gameResult,
                matchTime: item.time ? item.time.replace(/:\d+$/, '') : '未知',
                courtName: item.courtName || '未知'
              }
            }))
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.$store.commit('setLoading', false)
        }).catch(err => {
          console.log(err)
          this.$store.commit('setLoading', false)
        })
      },
      loadTeamBasicInfo () {    // 获取球队基本信息以及球队成员
        let url = `${this.apiAddress}/api/team/teamBasicInfo.php`
        let param = {
          json: `{"uid":"${this.uid || 250}","teamId":${this.teamId}}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata
            this.name = data.teamname
            this.portrait = data.portrait
            this.signature = data.signature
            this.isFollow = data.isfans
            // 设置微信分享
            this.$store.commit('setWxShareTitle', `${this.name} 球队主页`)
            this.$store.commit('setWxShareDesc', `${this.signature || data.teamIntro || data.area || ''}`)
            this.$store.commit('setWxShareImgUrl', this.portrait)
            this.$store.commit('setWxShareLink', location.href)
            // 设置APP内的分享
            window.shareConfig.title = `${this.name} 球队主页`
            window.shareConfig.imgUrl = this.portrait
            window.shareConfig.desc = `${this.signature || data.teamIntro || data.area || ''}`
            window.shareConfig.url = `http://share.greenplayer.cn/share/green/#/thirdpartyhome?pageType=2&teamId=${this.teamId}`
            // 设置资料卡内容
            this.material.foundingTime = data.createTime ? data.createTime.replace(/\s[\d:]+$/, '') : '未知'
            this.material.area = data.area || '未知'
            this.material.combat = data.combat || '未知'
            this.material.court = data.courtAddress || '未知'
            this.material.intro = data.teamIntro
            this.material.uniform = {
              homeUniform: {
                coat: data.homeCoatColor ? data.homeCoatColor.replace('0x', '#') : '',
                pant: data.homePantsColor ? data.homePantsColor.replace('0x', '#') : '',
                sock: data.homeSocksColor ? data.homeSocksColor.replace('0x', '#') : ''
              },
              awayUniform: {
                coat: data.awayCoatColor ? data.awayCoatColor.replace('0x', '#') : '',
                pant: data.awayPantsColor ? data.awayPantsColor.replace('0x', '#') : '',
                sock: data.awaySocksColor ? data.awaySocksColor.replace('0x', '#') : ''
              }
            }
            // 设置球队成员
            this.memberList.push({
              title: '管理员',
              type: 2,
              list: data.administrators.map(item => {
                return {
                  id: item.id,
                  name: item.userName,
                  portrait: item.portrait
                }
              })
            })
            this.memberList.push({
              title: '教练',
              type: 4,
              list: data.coachList.map(item => {
                return {
                  id: item.coachId,
                  name: item.coachName,
                  portrait: item.portrait
                }
              })
            })
            this.memberList.push({
              title: '领队',
              type: 2,
              list: data.leaderList.map(item => {
                return {
                  id: item.userid,
                  name: item.userName,
                  portrait: item.portrait
                }
              })
            })
            this.memberList.push({
              title: '球员',
              type: 2,
              list: data.playerList.map(item => {
                return {
                  id: item.userid,
                  name: item.userName,
                  portrait: item.portrait,
                  position: item.position.length > 0 && this.getPosition(item.position, data.posRef),
                  number: item.memberNumber
                }
              })
            })
            let isActivated = +data.isActivated === 1 ? '1' : '0'
            let sendData = {
              type: 'message',
              msgType: 'teamStatus',
              msgContent: isActivated,
              teamId: this.teamId,
              teamInfo: data,
              targetType: '2',
              targetId: this.teamId
            }
            this.$sendDataToClient(sendData)
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadTeamMatchHistory (page) {   // 加载球队荣誉历史战绩
        let url = `${this.apiAddress}/api/team/loadTeamMatchHistory.php`
        let param = {
          json: `{"page":"1","uid":"${this.uid || 127}","numberPerPage":"0","teamId":"${this.teamId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let honors = res.data.returndata.honors
            this.honorsList = honors.map(item => {
              return {
                gameId: item.gameId,
                portrait: +item.rank === 1 ? 'http://share.greenplayer.cn/share/img/honors/champion.png'
                          : +item.rank === 2 ? 'http://share.greenplayer.cn/share/img/honors/second.png'
                          : +item.rank === 3 ? 'http://share.greenplayer.cn/share/img/honors/third.png'
                          : 'http://share.greenplayer.cn/share/img/honors/fourth.png',
                name: +item.rank === 1 ? '冠军' : +item.rank === 2 ? '亚军' : +item.rank === 3 ? '季军' : '其他',
                game: item.name
              }
            })
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.$store.commit('setLoading', false)
        }).catch(err => {
          console.log(err)
          this.$store.commit('setLoading', false)
        })
      },
      getTeamDataInfo () {    // 加载球队历史战绩
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"team_match_getTeamDataInfo","numberPage":20,"page":"${this.recordPage}","teamId":"${this.teamId}","uid":"${this.uid || 250}","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let matches = res.data.returndata.matchData
            if (matches.length < 20) {
              this.recordCanLoadMore = false
            }
            this.matchesList = this.matchesList.concat(matches.map(item => {
              return {
                matchId: item.id,
                homeIcon: item.portraitA,
                awayIcon: item.portraitB,
                homeName: item.teamNameA,
                awayName: item.teamNameB,
                homeScore: item.scoreA,
                awayScore: item.scoreB,
                gameResult: item.gameResult,
                matchTime: item.matchTime ? item.matchTime.replace(/:\d+$/, '') : '未知',
                courtName: item.courtName || '未知'
              }
            }))
          }
          this.$store.commit('setLoading', false)
        })
      },
      loadGameBasicInfo () {    // 获取赛事基本信息
        let url = `${this.apiAddress}/api/game/gameBasicInfo.php`
        let param = {
          json: `{"uid":"${this.uid || 250}","gameId":${this.gameId}}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata
            this.gameBasicInfo = data
            this.name = data.gamename
            this.portrait = data.portrait
            this.signature = `${data.rule_name}制${+data.gametype === 2 && +data.roundRobin === 1 ? '单循环联赛' : +data.gametype === 2 && +data.roundRobin === 2 ? '双循环联赛' : +data.gametype === 3 ? '杯赛' : ''}    ${data.teamNumber}支球队`
            this.isFollow = data.isFans
            if (data.coverPic) {    // 设置轮播图
              this.coverPic.push(data.coverPic)
            } else {
              this.coverPic.push('//share.greenplayer.cn/share/img/association.png')
            }
            // 设置微信分享
            this.$store.commit('setWxShareTitle', `${this.name} 赛事主页`)
            this.$store.commit('setWxShareDesc', `${this.signature || data.comments}`)
            this.$store.commit('setWxShareImgUrl', this.portrait)
            this.$store.commit('setWxShareLink', location.href)
            // 设置APP内的分享
            window.shareConfig.title = `${this.name} 赛事主页`
            window.shareConfig.imgUrl = this.portrait
            window.shareConfig.desc = `${this.signature || data.comments}`
            window.shareConfig.url = `http://share.greenplayer.cn/share/green/#/thirdpartyhome?pageType=3&gameId=${this.gameId}`
            // 设置资料卡内容
            this.material.gameDate = `${data.starttime ? data.starttime.replace(/\s[\d:]+$/, '') : '未知'} 至 
                                      ${data.endtime ? data.endtime.replace(/\s[\d:]+$/, '') : '未知'}`
            this.material.hostCity = data.area
            this.material.field = (data.possibleCourtList.map(item => item.name)).join('、')
            this.material.contact = data.contactName
            this.material.deadline = data.enrollmentDeadline ? data.enrollmentDeadline.replace(/:\d\d$/, '') : '未知'
            this.material.company = data.associationName
            this.material.sponsor = data.sponsorList.length > 0 ? data.sponsorList : ''
            this.material.intro = data.comments
            this.material.contactId = data.contactId
            if (+data.gametype === 3) {   // 杯赛另行加载球队名单
              this.loadGroupPlaceForGame()
            } else {
              this.memberList.push({
                title: ``,
                type: 3,
                list: data.enrollmentList.map(item => {
                  return {
                    id: item.teamId,
                    name: item.teamName,
                    portrait: item.icon
                  }
                })
              })
            }
            let gameStatus = +data.gameStatus === 1 ? '1' : '0'
            let sendData = {
              type: 'message',
              msgType: 'gameStatus',
              msgContent: gameStatus,
              gameId: this.gameId,
              gameInfo: data,
              targetType: '30',
              targetId: this.gameId
            }
            this.$sendDataToClient(sendData)
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadGroupPlaceForGame () {    // 加载杯赛的名单
        let url = `${this.apiAddress}/api/game/loadGroupPlaceForGame.php`
        let param = {
          json: `{"gameId":"${this.gameId}","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          res.data.returndata.forEach(data => {
            let title = ''
            for (let p in data) {
              title = p
            }
            this.memberList.push({
              title: title ? `${title}组` : '',
              type: 3,
              list: data[title].map(item => {
                return {
                  id: item.tid,
                  name: item.teamname,
                  portrait: item.icon
                }
              })
            })
          })
        }).catch(err => {
          console.log(err)
        })
      },
      loadCoachBasicInfo () {   // 加载教练基本信息
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"user_coach_getCoachInfo","uid":"${this.uid || 250}","coachId":"${this.coachId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata
            this.name = data.coachName
            this.portrait = data.portrait
            this.signature = data.signature
            this.gender = data.gender
            this.isFollow = data.isFans
            this.material.age = this.getAge(data.birthday)
            this.material.height = data.height
            this.material.weight = data.weight
            this.material.area = data.areaName
            this.material.intro = data.introduction
            let sendData = {
              type: 'message',
              msgType: 'coachStatus',
              msgContent: data,
              targetType: '5',
              targetId: this.coachId
            }
            this.$sendDataToClient(sendData)
            // 设置微信分享
            this.$store.commit('setWxShareTitle', `${this.name} 教练主页`)
            this.$store.commit('setWxShareDesc', `${this.signature || data.introduction || data.areaName || ''}`)
            this.$store.commit('setWxShareImgUrl', this.portrait)
            this.$store.commit('setWxShareLink', location.href)
            // 设置APP内的分享
            window.shareConfig.title = `${data.coachName} 教练主页`
            window.shareConfig.desc = `${this.signature || data.introduction || data.areaName || ''}`
            window.shareConfig.imgUrl = data.portrait
            window.shareConfig.url = `http://share.greenplayer.cn/share/green/#/thirdpartyhome?pageType=4&coachId=${this.coachId}`
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      loadCoachingTeamList () {   // 加载教练执教球队列表
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"user_coach_loadHonourInfoOfCoach","coachId":"${this.coachId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.coachTeamList = res.data.returndata.teamHonourInfo.map(item => {
              return {
                teamId: item.teamId,
                portrait: item.portrait,
                name: item.teamName,
                startTime: item.startTime,
                endTime: item.endTime || '今',
                honourList: item.honourList
              }
            })
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      loadCoachingRecord () {   // 加载教练的执教战绩
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"user_coach_loadCoachingRecord","coachId":"${this.coachId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.matchesList = res.data.returndata.matchData.map(item => {
              return {
                matchId: item.id,
                homeIcon: item.portraitA,
                awayIcon: item.portraitB,
                homeName: item.teamNameA,
                awayName: item.teamNameB,
                homeScore: item.scoreA,
                awayScore: item.scoreB,
                gameResult: item.gameResult,
                matchTime: item.matchTime ? item.matchTime.replace(/:\d+$/, '') : '未知',
                courtName: item.courtName || '未知',
                homeCoat: item.homeUniform.coatColor ? item.homeUniform.coatColor.replace('0x', '#') : '',
                homePant: item.homeUniform.pantsColor ? item.homeUniform.pantsColor.replace('0x', '#') : '',
                homeSock: item.homeUniform.socksColor ? item.homeUniform.socksColor.replace('0x', '#') : '',
                awayCoat: item.awayUniform.coatColor ? item.awayUniform.coatColor.replace('0x', '#') : '',
                awayPant: item.awayUniform.pantsColor ? item.awayUniform.pantsColor.replace('0x', '#') : '',
                awaySock: item.awayUniform.socksColor ? item.awayUniform.socksColor.replace('0x', '#') : ''
              }
            })
            this.recordCanLoadMore = false
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
          this.$store.commit('setLoading', false)
        })
      },
      loadAssociationBasicInfo () {   // 加载协会的基本信息
        let url = `${this.apiAddress}/api/association/loadAssocationInfoById.php`
        let param = {
          json: `{"associationId":"${this.associationId}","reportAgenda":"0","uid":"${this.uid || 250}","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata.associationInfo
            this.name = data.name
            this.portrait = data.portrait
            this.signature = `下属球队${data.teamMemberNumber || 0}支`
            this.isFollow = data.isFans
            // 设置微信分享
            this.$store.commit('setWxShareTitle', `${this.name} 协会主页`)
            this.$store.commit('setWxShareDesc', this.signature)
            this.$store.commit('setWxShareImgUrl', this.portrait)
            this.$store.commit('setWxShareLink', location.href)
            // 设置APP内的分享
            window.shareConfig.title = `${this.name} 协会主页`
            window.shareConfig.desc = `${this.signature}`
            window.shareConfig.imgUrl = data.portrait
            window.shareConfig.url = `http://share.greenplayer.cn/share/green/#/thirdpartyhome?pageType=5&associationId=${this.associationId}`
            // 设置资料卡内容
            this.material.foundingTime = data.createDate ? data.createDate.replace(/:\d\d$/, '') : '未知'
            this.material.area = data.areaName
            this.material.intro = data.intro
            if (data.coverList.length > 0) {
              this.coverPic = data.coverList.map(item => item.imgUrl)
            } else {
              this.coverPic.push('//share.greenplayer.cn/share/img/association.png')
            }
            let sendData = {
              type: 'message',
              msgType: 'associationStatus',
              msgContent: data,
              associationId: this.associationId,
              targetType: '4',
              targetId: this.associationId
            }
            this.$sendDataToClient(sendData)
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        })
      },
      loadAllGamesCreatedByAssociation () {   // 加载协会下所有赛事
        let url = `${this.apiAddress}/api/association/loadAllGamesCreatedByAssociation.php`
        let param = {
          json: `{"uid":"${this.uid || 250}","associationId":"${this.associationId}","areaId":"","isOver":"1/0","fetchAll":"1/0"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.associationGame = res.data.returndata.map(item => {
              let gameType = +item.gametype === 1 ? '单循环联赛'
                           : +item.gametype === 2 ? '双循环联赛'
                           : +item.gametype === 3 ? '杯赛'
                           : ''
              return {
                id: item.gameId,
                portrait: item.portrait,
                status: item.statusCode,
                name: item.gamename,
                desc: `${item.ruleName}制${gameType}  ${item.teamNumber || 0}支球队`
              }
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadAllTeamInAssociation () {   // 加载协会下所有球队
        let url = `${this.apiAddress}/api/association/loadAllTeamInAssociation.php`
        let param = {
          json: `{"associationId":"${this.associationId}","uid":"${this.uid || 250}","version":"wap"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.associationTeams = res.data.returndata.map(item => {
              return {
                id: item.teamId,
                name: item.teamName,
                portrait: item.portrait,
                memberNumber: item.credit,
                acceptTime: item.registerTime ? item.registerTime.replace(/\s[\d:]+/, '') : '未知',
                position: item.memberNumber
              }
            })
          } else {
            this.$store.commit('showToast', res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadClubHomePage () {   // 加载俱乐部基本信息
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"club_club_clubHomePage","clubId":"${this.clubId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata.basicInfo
            this.name = data.clubName
            this.portrait = data.portrait
            this.signature = data.signature
            this.isFollow = data.isFans
            // 设置微信分享
            this.$store.commit('setWxShareTitle', `${this.name} 俱乐部主页`)
            this.$store.commit('setWxShareDesc', `${this.signature || data.intro || data.areaName || ''}`)
            this.$store.commit('setWxShareImgUrl', this.portrait)
            this.$store.commit('setWxShareLink', location.href)
            // 设置APP内的分享
            window.shareConfig.title = `${this.name} 俱乐部主页`
            window.shareConfig.desc = `${this.signature || data.intro || data.areaName || ''}`
            window.shareConfig.imgUrl = data.portrait
            window.shareConfig.url = `http://share.greenplayer.cn/share/green/#/thirdpartyhome?pageType=6&clubId=${this.clubId}`
            // 设置资料卡内容
            this.material.area = data.areaName
            this.material.intro = data.intro
            if (data.coverList.length > 0) {
              this.coverPic = data.coverList.map(item => item.imgUrl)
            } else {
              this.coverPic.push('//share.greenplayer.cn/share/img/association.png')
            }
            let sendData = {
              type: 'message',
              msgType: 'clubStatus',
              msgContent: data,
              targetType: '6',
              targetId: this.clubId
            }
            this.$sendDataToClient(sendData)
          }
        })
      },
      loadTeamListOfClub () {   // 加载俱乐部球队列表 http://mall.greenplayer.cn/view.php?id=927
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"club_club_loadTeamListOfClub","clubId":"${this.clubId}","page":1,"limit":100}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.clubTeamlist = res.data.returndata.map(item => {
              return {
                id: item.teamId,
                name: item.teamName,
                portrait: item.portrait,
                memberNumber: item.teamCredit,
                acceptTime: item.echelon,
                position: item.playerNum
              }
            })
          }
        })
      },
      loadMatchListOfClubTeam () {    // 加载俱乐部梯队的比赛列表 http://120.76.27.54/view.php?id=1085
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"club_club_loadMatchListOfClubTeam","clubId":"${this.clubId}","page":"${this.recordPage}","limit":20}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let matches = res.data.returndata
            if (matches.length < 20) {
              this.recordCanLoadMore = false
            }
            this.matchesList = this.matchesList.concat(matches.map(item => {
              return {
                matchId: item.id,
                homeIcon: item.portraitA,
                awayIcon: item.portraitB,
                homeName: item.teamNameA,
                awayName: item.teamNameB,
                homeScore: item.scoreA,
                awayScore: item.scoreB,
                gameResult: item.gameResult,
                matchTime: item.matchTime ? item.matchTime.replace(/:\d+$/, '') : '未知',
                courtName: item.courtName || '未知',
                homeCoat: item.homeUniform.coatColor ? item.homeUniform.coatColor.replace('0x', '#') : '',
                homePant: item.homeUniform.pantsColor ? item.homeUniform.pantsColor.replace('0x', '#') : '',
                homeSock: item.homeUniform.socksColor ? item.homeUniform.socksColor.replace('0x', '#') : '',
                awayCoat: item.awayUniform.coatColor ? item.awayUniform.coatColor.replace('0x', '#') : '',
                awayPant: item.awayUniform.pantsColor ? item.awayUniform.pantsColor.replace('0x', '#') : '',
                awaySock: item.awayUniform.socksColor ? item.awayUniform.socksColor.replace('0x', '#') : ''
              }
            }))
          }
        })
      },
      loadRefereeMainPageInfo () {    // 加载裁判基本信息
        let url = `${this.apiAddress}/api/service/referee/loadRefereeBasicInfo.php`
        let param = {
          json: `{"uid":${this.uid || 300},"refereeId":"${this.refereeId}"}`
        }
        this.$axios.post(url, param).then(res => {
          let data = res.data.returndata.basicInfo
          this.name = data.refereeName
          this.portrait = data.portrait
          this.signature = data.signature
          this.material.area = data.areaName || '未知'
          this.material.age = this.getAge(data.birthday)
          this.material.height = data.height ? `${data.height}cm` : '未知'
          this.material.weight = data.weight ? `${data.weight}kg` : '未知'
          this.isFollow = data.isFans
          if (data.coverList && data.coverList.length > 0) {
            this.coverPic = data.coverList.map(item => item.imgUrl)
          } else {
            this.coverPic.push('//share.greenplayer.cn/share/img/player-cover.png')
          }
          let sendData = {
            type: 'message',
            msgType: 'refereeStatus',
            msgContent: data,
            targetType: '3',
            targetId: this.refereeId
          }
          this.$sendDataToClient(sendData)
          // 设置微信分享
          this.$store.commit('setWxShareTitle', `${this.name} 裁判主页`)
          this.$store.commit('setWxShareDesc', `${this.signature || data.areaName || ''}`)
          this.$store.commit('setWxShareImgUrl', this.portrait)
          this.$store.commit('setWxShareLink', `http://share.greenplayer.cn/share/green/#/thirdpartyhome?pageType=7&refereeId=${this.refereeId}`)
          // 设置APP内的分享
          window.shareConfig.title = `${this.name} 裁判主页`
          window.shareConfig.desc = `${this.signature || data.areaName || ''}`
          window.shareConfig.imgUrl = data.portrait
          window.shareConfig.url = `http://share.greenplayer.cn/share/green/#/thirdpartyhome?pageType=7&refereeId=${this.refereeId}`
        })
      },
      loadGameMatchListByRefereeRole () {   // 加载裁判的执法比赛
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"user_referee_loadMatchListInGame","refereeId":"${this.refereeId}","gameId":0,"page":"${this.recordPage}","limit":20}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let matches = res.data.returndata.matchList
            if (matches.length < 20) {
              this.recordCanLoadMore = false
            }
            this.matchesList = this.matchesList.concat(matches.map(item => {
              return {
                matchId: item.id,
                homeIcon: item.portraitA,
                awayIcon: item.portraitB,
                homeName: item.teamNameA,
                awayName: item.teamNameB,
                homeScore: item.scoreA,
                awayScore: item.scoreB,
                matchTime: item.matchTime ? item.matchTime.replace(/:\d+$/, '') : '未知',
                courtName: item.courtName || '未知',
                refereeRoleId: item.roleId
              }
            }))
          }
          this.$store.commit('setLoading', false)
        })
      },
      getCourtInfo (type) {       // 加载球场信息  http://120.76.27.54/view.php?id=1026
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"user_court_getCourtInfo","uid":"${this.uid || 300}","courtId":"${this.courtId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let data = res.data.returndata.basicInfo
            this.name = data.courtName
            this.portrait = data.portrait
            this.material = {
              courtService: ''
            }
            this.material.telephone = data.telephone
            this.material.address = data.address
            this.material.mapConfig = {
              latitude: data.latitude,
              longitude: data.longitude
            }
            this.coverPic = []
            if (data.courtImg) {
              this.coverPic.push(data.courtImg)
            } else {
              this.coverPic.push('//share.greenplayer.cn/share/img/playerData/backg.png')
            }
            this.getCourtServiceInfoById()
            if (type === 1) {   // 点击球场总览，不再发送数据给客户端以及配置分享
              return
            }
            let sendData = {
              type: 'message',
              msgType: 'courtStatus',
              msgContent: data,
              targetType: '7',
              targetId: this.courtId
            }
            this.$sendDataToClient(sendData)
            // 设置微信分享
            this.$store.commit('setWxShareTitle', `${this.name} 球场主页`)
            this.$store.commit('setWxShareDesc', ``)
            this.$store.commit('setWxShareImgUrl', this.portrait)
            this.$store.commit('setWxShareLink', `http://share.greenplayer.cn/share/green/#/thirdpartyhome?pageType=8&refereeId=${this.courtId}`)
            // 设置APP内的分享
            window.shareConfig.title = `${this.name} 球场主页`
            window.shareConfig.desc = ``
            window.shareConfig.imgUrl = data.portrait
            window.shareConfig.url = `http://share.greenplayer.cn/share/green/#/thirdpartyhome?pageType=8&refereeId=${this.courtId}`
          }
        })
      },
      getCourtServiceInfoById () {    // 加载球场服务信息 http://120.76.27.54/view.php?id=1027
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"user_court_getCourtServiceInfoById","uid":"${this.uid}","courtId":"${this.courtId}"}`
        }
        this.$axios.post(url, param).then(res => {
          this.material.courtService = res.data.returndata.filter(item => +item.isProvide === 1)
        })
      },
      getChildrenCourtList () {   // 获取子球场信息列表 http://120.76.27.54/view.php?id=803
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"common_court_getChildrenCourtList","uid":"${this.uid}","courtId":"${this.courtId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.courtList = res.data.returndata.map(item => {
              return {
                id: item.childrenCourtId,
                name: item.courtName
              }
            })
            this.courtList.unshift({
              id: 0,
              name: '球场总览'
            })
          }
        })
      },
      switchCourt (id, index) {   // 切换查看子球场
        if (+index === +this.currentCourt) {
          return
        }
        this.currentCourt = index
        if (+id === 0) {
          this.getCourtInfo(1)
          return
        }
        this.getCourtGroundInfo(id)
      },
      getCourtGroundInfo (courtNumberId) {    // 获取子球场信息 http://120.76.27.54/view.php?id=1039
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"user_court_getCourtGroundInfo","uid":"${this.uid || 300}","courtNumberId":"${courtNumberId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            let info = res.data.returndata.courtNumberInfo
            this.material = {}
            this.material.scale = info.scale
            this.material.courtSize = info.size
            this.material.sodType = info.materialName
            this.coverPic = []
            if (info.backGround) {
              this.coverPic.push(info.backGround.replace(/\s+|(!small)/ig, ''))
            } else {
              this.coverPic.push('//share.greenplayer.cn/share/img/playerData/backg.png')
            }
          }
        })
      },
      loadSliderBackgroundList (targetType, targetId) {   // 加载轮播图
        let url = `${this.apiAddress}/api/common/baseApiEntry.php`
        let param = {
          json: `{"method":"common_album_loadSliderBackgroundList","targetType":"${targetType}","targetId":"${targetId}"}`
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            if (res.data.returndata.length > 0) {
              this.coverPic = res.data.returndata.map(item => item.imgUrl)
            } else {
              this.pageType === '1' && this.coverPic.push('//share.greenplayer.cn/share/img/player-cover.png')
              this.pageType === '2' && this.coverPic.push('//share.greenplayer.cn/share/img/team-cover.jpg')
              // this.pageType === '3' && this.coverPic.push('//share.greenplayer.cn/share/img/association.png')
              this.pageType === '4' && this.coverPic.push('//share.greenplayer.cn/share/img/player-cover.png')
            }
          } else {
            console.log(res.data.errMsg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadMoreRecord () {   // 加载更多战绩
        if (+this.pageType === 1) {
          this.recordPage++
          this.$store.commit('setLoading', true)
          this.loadPlayerMatchHistory()
        } else if (+this.pageType === 2) {
          this.recordPage++
          this.$store.commit('setLoading', true)
          this.getTeamDataInfo()
        } else if (+this.pageType === 4) {
        } else if (+this.pageType === 7) {
          this.recordPage++
          this.$store.commit('setLoading', true)
          this.loadGameMatchListByRefereeRole()
        }
      },
      loadArticlesByTypeAndId (placeType, placeId, page) {    // 根据类型和id获取主页的动态，placetype =0球队 =1球员 =2赛事
        let url = `${this.apiAddress}/api/common/loadArticlesByTypeAndId.php`
        let param = {
          json: `{"numberPerPage":10,"pageId":${this.articlePage},"placeId":"${placeId}","placeType":"${placeType}","uid":"${this.uid || 250}"}`
        }
        if (+placeType === 1) {   // 球员的动态
          url = `${this.apiAddress}/api/bbs/loadAllArticlesById.php`
          param = {
            json: `{"matchId":null,"numberPerPage":"10","page":"${this.articlePage}","scope":"2","uid":"${this.playerId || 250}"}`
          }
        }
        this.$axios.post(url, param).then(res => {
          if (res.data.status === 'success') {
            this.articleList = this.articleList.concat(res.data.returndata)
            if (res.data.returndata.length < 10) {
              this.articleCanLoadMore = false
            }
            this.$store.commit('setLoading', false)
          } else {
            this.$store.commit('showToast', res.data.errMsg)
            this.$store.commit('setLoading', false)
          }
        })
      },
      loadMoreArticles () {   // 动态加载更多
        this.$store.commit('setLoading', true)
        this.articlePage++
        if (+this.pageType === 1) {
          this.loadArticlesByTypeAndId(1)
        } else if (+this.pageType === 2) {
          this.loadArticlesByTypeAndId(0, this.teamId)
        } else if (+this.pageType === 3) {
          this.loadArticlesByTypeAndId(2, this.gameId)
        } else if (+this.pageType === 7) {
          this.loadArticlesByTypeAndId(4, this.refereeId)
        }
      },
      identityPopularity (targetType, targetId) {   // 统计点击数
        let url = `${this.apiAddress}/api/utils/identityPopularity.php?targetType=${targetType}&targetId=${targetId}`
        this.$axios.get(url).then(res => {
          console.log(res.data)
        })
      },
      getAge (birthday) {   // 根据生日计算年龄
        if (!birthday) {
          return '未知'
        }
        let now = new Date()
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        let date = now.getDate()
        let bir = birthday.split('-')
        if (+bir[1] < +month) {
          return year - bir[0] + '岁'
        } else if (+bir[1] > +month) {
          return year - bir[0] + '岁'
        } else if (+bir[1] === +month) {
          return +bir[2] >= +date ? year - bir[0] + '岁' : year - bir[0] - 1 + '岁'
        }
      },
      getPosition (position, posRef) {    // 根据球员坐标获取球员位置
        let reArr = position.map(item => {
          if (+item.pid < 0) {
            return '--'
          }
          return posRef[item.pid - 1].pName
        })
        return reArr.join('/')
      },
      showImage (img) {   // 大图显示头像
        img = img.replace('!small', '')
        let sendData = {
          type: 'callImageSwiper',
          currentIndex: '0',
          imageList: [img]
        }
        this.$sendDataToClient(sendData)
      },
      imageLoaded (e) {   // 图片加载完处理显示，不挤压尽量居中显示
        let img = e.target || e.srcElement
        let diff = Math.abs(img.width - img.height) > 0 ? Math.abs(img.width - img.height) : 200
        let min = Math.min(img.width, img.height)
        let trans = diff / 3 / min * 100
        if (img.width > img.height && img.width / img.height > 1.5) {
          img.style.width = '100%'
          img.style.height = '100%'
        } else {
          img.style.width = '100%'
          img.style.transform = `translateY(-${trans}%)`
        }
      }
    },
    components: { Material, MatchAgainst, TeamList, MemberList, GameDataList, ArticleList, ColumnFourList, HomeHonorList, AssociationGameList }
  }
</script>
