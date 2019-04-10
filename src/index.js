//css
import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/icon.css';
import './assets/css/index.css';
import './assets/css/color-dark.css';
import 'mavon-editor/dist/css/index.css';


import ElementUI from 'element-ui'
Vue.use(ElementUI)

import VueTree from 'vue-simple-tree';
Vue.use(VueTree);

import mavonEditor from 'mavon-editor';


Vue.use(mavonEditor);

Vue.use(VueRouter)

import { post,get ,put} from "./util/http.js";
import { success } from "./util/notify.js";
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$put = put;
Vue.prototype.$success = success;


const container = () =>import('./container.vue');
const edit = () =>import('./edit.vue');
const directory = () => import('./directory.vue');
//const container = () => import('./container.vue');
const routes =[
    {
        name:'container',
        path:'/',
        component:container
    },
    {
        path:'/edit',
        component:edit
    },
    {
        path: '/directory',
        component: directory
    }
]

const router = new VueRouter({
    mode:'history',
    routes:routes
});

import App from './app.vue';
new Vue({
    el: '#app',
    router:router,
    components: { App },
})