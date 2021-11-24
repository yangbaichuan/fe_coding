import { createApp } from 'vue'
import router from './router';
import store from './store';
import App from './App.vue';

// 创建实例
const app = createApp(App)

// 挂载路由
app.use(router)

// 挂载store
app.use(store)

// 渲染实例
app.mount('#app')