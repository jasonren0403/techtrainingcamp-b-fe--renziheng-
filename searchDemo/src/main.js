// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import smoothscroll from 'smoothscroll-polyfill';

Vue.prototype.$axios = axios;
Vue.prototype.$smoothscroll = smoothscroll;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {App},
	template: '<App/>'
})

require('vue2-animate/dist/vue2-animate.min.css')
