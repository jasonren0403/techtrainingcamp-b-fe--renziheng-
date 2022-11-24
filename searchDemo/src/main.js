import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import smoothscroll from 'smoothscroll-polyfill'

Vue.prototype.$axios = axios.create({
	baseURL: '',
	timeout: 30 * 1000
});
Vue.prototype.$smoothscroll = smoothscroll;
Vue.config.productionTip = false

smoothscroll.polyfill()

new Vue({
	router,
	render: h => h(App)
}).$mount("#app")

require('vue2-animate/dist/vue2-animate.min.css')
