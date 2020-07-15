// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import animate from 'animate.css'

Vue.use(animate)

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {App},
	template: '<App/>'
})

require('vue2-animate/dist/vue2-animate.min.css')

// optimization - throttling and debouncing function is going to be extracted from Vue components
