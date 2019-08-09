import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import qs from 'qs'

Vue.prototype.$qs = qs;
//引入重置样式
import '@/assets/css/reset.css'

//引入vant相关
//引入移动端适配
import '@/assets/js/flexible.js'
//toast轻提示
import 'vant/lib/toast/style';
// import {List} from 'vant';
// import 'vant/lib/list/style';
// Vue.use(List)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
