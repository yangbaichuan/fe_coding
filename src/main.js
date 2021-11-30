import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import router from './router';
import store from './store';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';

// 创建实例
const app = createApp(App)

// 挂载组件库
app.use(Antd);

// 挂载路由
app.use(router)

// 挂载store
app.use(store)

// 渲染实例
app.mount('#app')