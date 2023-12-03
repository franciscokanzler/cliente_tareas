import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/bootstrap.min.css'
import '@/assets/bootstrap.bundle.min.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faUser, faKey, faAt, faPen, faTrash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons'
import alertService from './alertService';


library.add(faTwitter, faUser, faKey, faCalendarCheck, faAt, faPen, faTrash, faMagnifyingGlass)

const app = createApp(App).use(store)
app.use(VueAxios, axios)
app.config.globalProperties.$alert = alertService;
app.use(router)
app.use(VueAxios, axios)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
