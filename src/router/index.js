import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/Hello'
import Login from '@/components/Login'    // 登录
import TrainConvene from '@/components/TrainConvene'    // 训练
import MatchDetail from '@/components/MatchDetail'    // 单场比赛详情
import Post from '@/components/Post'    // 帖子、新闻
import TeamAttend from '@/components/TeamAttend'    // 球队考勤信息
import FinanceAccount from '@/components/FinanceAccount'    // 财务报表
import FinanceItemDetail from '@/components/FinanceItemDetail'    // 财务详情
import TeamRecord from '@/components/TeamRecord'    // 球队战绩
import ProfessionalLeague from '@/components/ProfessionalLeague'    // 专业赛事
import SimpleCycle from '@/components/SimpleCycle'    // 赛事小循环
import GameDataStatistics from '@/components/GameDataStatistics'    // 协会赛事统计
import GameConvene from '@/components/GameConvene'    // 赛事召集
import ThirdPartyHome from '@/components/ThirdPartyHome'    // 第三方主页
import InvitePlayer from '@/components/InvitePlayer'    // 邀请入队
import MatchConvene from '@/components/MatchConvene'    // 比赛召集
import ActivityConvene from '@/components/ActivityConvene'    // 活动分享、召集
import GameVote from '@/components/GameVote'    // 赛事评选
import TeamGameInfo from '@/components/TeamGameInfo'    // 球队参赛信息表
import InsuranceList from '@/components/InsuranceList'    // 保险列表
import InsuranceDetail from '@/components/InsuranceDetail'   // 保险详情
import ApplyIntoTeam from '@/components/ApplyIntoTeam'    // 申请入队
import EditEntryInfo from '@/components/EditEntryInfo'      // 填写资料
import CoachingTeam from '@/components/CoachingTeam'    // 教练执教球队
import ballBillChangeDetail from '@/components/ballBillChangeDetail'    // 球币收支详情
import ViewPicture from '@/components/ViewPicture'    // 查看照片
import CombineAccount from '@/components/CombineAccount'    // 合并账号
import QuizSquare from '@/components/QuizSquare'    // 竞猜广场
import QuizList from '@/components/QuizList'    // 竞猜榜单
import HandleTodoList from '@/components/HandleTodoList'    // 处理待办
import CourtConvene from '@/components/CourtConvene'    // 球场召集

Vue.use(Router)

let componentsList = [
  Login,
  TrainConvene,
  MatchDetail,
  Post,
  TeamAttend,
  FinanceAccount,
  FinanceItemDetail,
  TeamRecord,
  ProfessionalLeague,
  SimpleCycle,
  GameDataStatistics,
  GameConvene,
  ThirdPartyHome,
  InvitePlayer,
  MatchConvene,
  ActivityConvene,
  GameVote,
  TeamGameInfo,
  InsuranceList,
  InsuranceDetail,
  ApplyIntoTeam,
  EditEntryInfo,
  CoachingTeam,
  ballBillChangeDetail,
  ViewPicture,
  CombineAccount,
  QuizSquare,
  QuizList,
  HandleTodoList,
  CourtConvene
]

let routerList = componentsList.map(item => {
  return {
    path: `/${item.name.toLowerCase()}`,  // 要求pege级的组件必须返回组件名
    name: item.name,
    component: item
  }
})
routerList.unshift({
  path: '/',
  name: 'Hello',
  component: Hello
})

export default new Router({
  routes: routerList
})

// let arr = [
//   {
//     path: '/',
//     name: 'Hello',
//     component: Hello
//   }
// ]
