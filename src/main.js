import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 引入swiper插件  https://github.com/helicopters/wc-swiper
import wcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'
Vue.use(wcSwiper)

require('./assets/less/class.less')
require('./assets/less/common.less')

let axios = require('axios')
let qs = require('qs')
let Base64 = require('js-base64').Base64
let md5 = require('js-md5')
let wx = require('weixin-js-sdk')

// 处理300ms点击延迟，针对ios，android处理会导致input标签点击难聚焦，并且android并没有延迟
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
  let FastClick = require('fastclick')
  FastClick.attach(document.body)
}

window.wx = wx

Vue.config.productionTip = false

// 配置axios的data，Content-Type='application/x-www-form-urlencoded' 需要qs.stringify转换才能正常传值
axios.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
})
axios.defaults.withCredentials = false
Vue.prototype.$axios = axios

Vue.prototype.$base64 = Base64

// 获取加密与不加密的参数
Vue.prototype.getQueryString = (name) => {
  let search = location.href.substr(location.href.indexOf('?') + 1)
  if (!search) return null
  // 加#判断，因为vue-router链接hash(#)特性
  let reg = new RegExp('(^|&)' + name + '=([^&^#]*)(&|#|$)', 'i')
  let r = search.match(reg) ||
          Base64.decode(search.match(/[a-zA-Z0-9+/]+/)[0]).match(reg)
  if (r != null) return unescape(decodeURI(r[2]))
  // 添加另一段参数获取，因为微信授权登录后会把code、state插入 vue-router 链接hash('#')之前
  // url?code=code&state=state#/customQuery
  let searchOther = search.substr(search.indexOf('?') + 1, search.length)
  if (!searchOther) return null
  r = searchOther.match(reg) ||
      Base64.decode(searchOther.match(/[a-zA-Z0-9+/]+/)[0]).match(reg)
  if (r != null) return unescape(decodeURI(r[2]))
  return null
}

// 上传文件的方法
Vue.prototype.$uploadFile = (file, index, callBack, fail) => {
  let options = {   // 又拍云的配置
    'bucket': 'greenplayerapp',
    'save-key': `h5/vue/${(new Date()).toLocaleDateString()}/${Date.parse(new Date()) + Math.floor(Math.random() * 10000)}.{.suffix}`,
    'expiration': Math.floor(new Date().getTime() / 1000) + 86400
  }
  let policy = window.btoa(JSON.stringify(options))
  let formApiSecret = 'SKijeb0F8DwrtpC+RAYk7aYtdTw='
  let signature = md5.hex(policy + '&' + formApiSecret)
  let reqData = ''
  let url = `http://v0.api.upyun.com/${options.bucket}`
  axios.post(url, reqData, {
    headers: {    // 设置请求头contentType为表单数据
      'Content-Type': 'multipart/form-data;'
    },
    transformRequest: [function (data) {    // 发送的数据需要转换为 form-data 格式
      data = new FormData()
      data.append('policy', policy)
      data.append('signature', signature)
      data.append('file', file[index])
      return data
    }]
  }).then(res => {
    callBack(res)
  }).catch(err => {
    fail(err)
  })
}

// 发送数据给客户端
Vue.prototype.$sendDataToClient = (data, type) => {
  try {   // Android
    window.eventListener.onEvent(JSON.stringify(data))
    return true
  } catch (e) { console.log() }
  try {   // ios
    window.webkit.messageHandlers.eventListener.postMessage(data)
    return true
  } catch (e) { console.log(data) }
  return false    // 如果是跳转，返回 false 的话就执行网页跳转
}

// 原生调用以获取分享的显示
window.shareConfig = {
  imgUrl: '',
  title: '',
  desc: '',
  url: ''
}
window.getShareConfig = () => {
  let data = {
    type: 'getShareConfig',
    content: window.shareConfig
  }
  if (window.eventListener) {   // android
    window.eventListener.onEvent(JSON.stringify(data))
  } else if (window.webkit) {   // ios
    return window.shareConfig
  } else {
    return window.shareConfig
  }
}

// 客户端发送数据给网页
window.sendDataToWeb = function (data) {
  store.commit('setClientData', data)
}

//  限制APP内的页面不能长按选择
if (window.eventListener || window.webkit) {
  let all = document.querySelectorAll('*')
  Array.prototype.slice.call(all).forEach(item => {
    item.style.userSelect = 'none'
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  methods: {}
})
