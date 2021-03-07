import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入样式
import './assets/css/common.css'

// 引入图标库
import './assets/icon/icon.css'

// axios导入(统一管理接口)
import getApi from '@/request/index'
Vue.prototype.$api = getApi

// 引入element-ui组件
import {
  Row,
  Col,
  Card,
  Avatar,
  Pagination,
  Image,
  Form,
  FormItem,
  Input,
  Button,
  Message,
  MessageBox,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Slider,
  Upload
} from 'element-ui';
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Upload);
Vue.use(Avatar);
Vue.use(Pagination);
Vue.use(Image);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Slider)
Vue.prototype.$message = Message;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
