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
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Table,
  TableColumn,
  Image,
  Form,
  FormItem,
  Dialog,
  Input,
  Button,
  Message,
  MessageBox,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Slider,
  Upload,
  Badge,
  Tag
} from 'element-ui';
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Upload);
Vue.use(Badge);
Vue.use(Tag);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Avatar);
Vue.use(Pagination);
Vue.use(Image);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Dialog);
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

Vue.filter('formateDate',(time)=>{
  // console.log(time)
  var date = new Date(parseInt(time));
  // console.log(date)
  var y = date.getFullYear();
  var m = date.getMonth()+1;
  var d = date.getDate();
  return (y < 10 ? ('0'+y):y) + '-' + (m < 10 ? ('0'+m):m) + '-' + (d < 10 ? ('0'+d):d);
})

Vue.filter('formateDateDetail',(time)=>{
  // console.log(time)
  var date = new Date(parseInt(time));
  // console.log(date)
  var Y = date.getFullYear();
  var M = date.getMonth()+1;
  var D = date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  return (Y < 10 ? ('0'+Y):Y) + '-' + (M < 10 ? ('0'+M):M) + '-' + (D < 10 ? ('0'+D):D) + ' ' + (h < 10 ? ('0'+h):h) + ':' + (m < 10 ? ('0'+m):m) + ':' + (s < 10 ? ('0'+s):s);
})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
