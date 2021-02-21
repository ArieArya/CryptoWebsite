import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import VueApexCharts from 'vue-apexcharts'

import 'buefy/dist/buefy.css'

Vue.config.productionTip = false

import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import { faPlus, faCaretUp, faCaretDown, faArrowUp, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add( faCaretUp, faCaretDown, faPlus, faArrowUp, faAngleLeft, faAngleRight );
Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
});

Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

new Vue({
  render: h => h(App),
}).$mount('#app')
