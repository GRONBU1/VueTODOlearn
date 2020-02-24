import Vue from 'vue'
import App from './app.vue'

const root = document.createElement('div')
document.body.appendChild(root)
// 引入全局CSS样式
import './assets/styles/global.styl'

new Vue({
  render: h => h(App)
}).$mount(root)
