'use strict';

import Vue from 'vue';
import wysiwyg from "vue-wysiwyg";
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';

Vue.config.productionTip = false

new Vue({
	vuetify,
	router,
	render: h => h(App)
}).$mount('#app');

Vue.use(wysiwyg, {});
