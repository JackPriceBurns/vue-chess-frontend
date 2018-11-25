import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/App';
import { Drag, Drop } from 'vue-drag-drop';

// Components
import Home from './components/views/pages/Home.vue';
import Game from './components/views/pages/Game.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.component('drag', Drag);
Vue.component('drop', Drop);

Vue.mixin({
    data() {
        return {
            backendUrl: 'http://localhost:4000/'
        };
    },
});

const router = new VueRouter({
    routes: [
        {path: '/', component: Home, name: 'home'},
        {path: '/game/:id', component: Game, name: 'game'}
    ]
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
