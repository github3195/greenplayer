import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let apiAddress = ((code) => {
  if (+code === 1) {          // 正式库 '//120.77.127.168/E453370F24B0F5A'
    return '//120.77.127.168/E602925F24B0F5A'
  } else if (+code === 2) {   // 伪正式库
    return '//dev.greenplayer.cn'
  } else if (+code === 3) {   // 测试库
    // let VConsole = require('vconsole')
    /* eslint-disable no-new */
    // new VConsole()
    return '//120.76.27.54'
  }
})(3)

export default new Vuex.Store({
  state: {
    apiAddress: apiAddress,   // 接口地址
    isToastShow: false, // 控制吐司提示显示
    timeout: null,    // 吐司定时器
    toastText: '',  // 吐司内容
    isLoading: false, // 加载动画
    confirm: {
      isConfirmShow: false, // 控制显示隐藏确认弹窗
      confirmText: '确认操作',
      confirmSureText: '确定',
      confirmCancelText: '取消',
      cancelBtnShow: true,
      ensure: ''
    },
    isUserListShow: false,    // 显示用户小球
    isLoginShow: false, // 登录弹窗是否显示
    showTopBar: true, // 是否显示顶部下载条
    topBarText: '赛事数据由绿茵场提供', // 顶部下载条的文字描述
    uid: null,   // 存储登录后获得的用户id
    nickname: null,   // 存储登录后获得的用户昵称
    portrait: null,    // 存储登录后获得的用户头像
    playerId: '',   // 球员id
    wxShareConfig: {    // 微信分享的配置
      title: '',
      desc: '本页面来自绿茵场',
      link: location.href,
      imgUrl: 'http://share.greenplayer.cn/share/img/pic300.jpg'
    },
    transData: '',   // 页面互传的数据
    clientData: ''    // 客户端发送过来的数据
  },
  mutations: {
    // 吐司提示，现设置时长2+1(动画)秒，暂不支持自定义时长
    showToast: (state, text) => {
      if (!text) return
      state.toastText = ''
      clearTimeout(state.timeout)
      state.toastText = text
      state.isToastShow = true
      state.timeout = setTimeout(() => {
        state.isToastShow = false
      }, 2000)
    },
    // 设置确认弹窗的提示文字及点击操作，目前实现较简单
    setConfirm: (state, val) => {
      state.confirm.confirmText = val.confirmText || '确认操作'
      state.confirm.confirmSureText = val.confirmSureText || '确定'
      state.confirm.confirmCancelText = val.confirmCancelText || '取消'
      state.confirm.cancelBtnShow = val.cancelBtnShow === false ? 0 : 1
      state.confirm.ensure = val.ensure || function () {
        state.confirm.isConfirmShow = false
      }
    },
    // 设置登录信息
    setLogined: (state, userinfo) => {
      state.uid = userinfo.uid
      state.nickname = userinfo.nickname
      state.portrait = userinfo.portrait
      localStorage.setItem('u_id', userinfo.uid)
      localStorage.setItem('greenPlayerToken', userinfo.token)
    },
    // 设置退出登录
    setLogouted: (state) => {
      state.uid = null
      state.nickname = null
      state.portrait = null
      localStorage.removeItem('u_id')
      localStorage.removeItem('greenPlayerToken')
    },
    // 显示登录弹窗
    showLogin: (state) => { state.isLoginShow = true },
    // 隐藏登录弹窗
    hideLogin: (state) => { state.isLoginShow = false },
    // 设置确认弹窗显示隐藏
    setConfirmShow: (state, val) => { state.confirm.isConfirmShow = val },
    // 设置页面之间互相传输的数据
    setTransData: (state, val) => { state.transData = val },
    // 设置客户端发送过来的数据
    setClientData: (state, val) => { state.clientData = val },
    // 设置顶部下载条显不显示
    setTopBar: (state, val) => { state.showTopBar = val },
    // 设置顶部下载条的文字信息
    setTopBarText: (state, val) => { state.topBarText = val },
    // 设置是否显示加载动画
    setLoading: (state, val) => { state.isLoading = val },
    // 设置是否显示用户信息列表
    setUserList: (state, val) => { state.isUserListShow = val },
    // 设置微信分享title
    setWxShareTitle: (state, title) => { state.wxShareConfig.title = title },
    // 设置微信分享描述
    setWxShareDesc: (state, desc) => { state.wxShareConfig.desc = desc },
    // 设置微信分享图标
    setWxShareImgUrl: (state, imgUrl) => { state.wxShareConfig.imgUrl = imgUrl },
    // 设置微信分享链接
    setWxShareLink: (state, link) => { state.wxShareConfig.link = link }
  },
  getters: {},
  actions: {}
})
