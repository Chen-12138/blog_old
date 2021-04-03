<template>
  <div id="tabbarLink">
    <!-- <a v-for="(item, index) in LinkList" :key="index" @click="triggerPage(item.path)" ref="navigators">
      {{item.name}}
    </a> -->
    <Search/>
    <Music/>
    <!-- 用户信息 -->
    <div class="userbox">
        <div class="is-login" v-if="loginStatus">
            <el-avatar class="avatar" :src="user.avatar"></el-avatar>
            <span>{{user.name}}</span>
        </div>
        <div class="no-login" v-else @click="handleLogin">
            登录
        </div>
    </div>
  </div>
</template>
<script>
import Search from '../ArticleComponents/Search'
import Music from './Music'
import { mapGetters } from 'vuex'
 export default {
    name:'tablink',
    components: {
      Search,
      Music
    },
    data () {
      return {
        userInfo: {}
      }
    },
    computed: {
      ...mapGetters(['user', 'loginStatus'])
    },
    mounted(){
      if(localStorage.getItem('user')){
        this.userInfo = JSON.parse(localStorage.getItem('user'));
      }
    },
    methods: {
        // 点击登录跳转
        handleLogin (){
            this.$router.push('/login')
        },
        // 下拉框点击事件
        handleCommand (command){
            if (command == 'profile') {
                this.$router.push('/profile')
            } else {
                localStorage.clear();
                location.reload();
            }
        },
    },
  }
</script>
<style lang="scss" scoped>
/* @font-face {
  font-family: 'codeleilei';
  src: url('../../assets/font/2012DingYongKangYingBiKaiShuXinBan-2.ttf');
} */
#tabbarLink {
  display: flex;
  height: 100%;
  padding: 0 20px;
  white-space: nowrap;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  // line-height: 50px;
  .userbox{
    display: flex;
    flex-direction: row;
    color: #d4d4d4;
    // margin-right: 22px;
    float: right;
    .is-login{
      font-size: 14px;
      width: 120px;
      display: flex;
      align-items: center;
      .avatar{
        margin-right: 20px;
        transition: all 1s;
      }
      :hover{
        transform: rotate(360deg);
      }
    }
    .no-login{
      font-size: 14px;
      cursor: pointer;
      :hover{
          color: #2b2c28;
      }
    }
  }
  a {
    font-family: '微软雅黑';
    color: #d4d4d4;
    margin: 0 1rem;
    padding: .3rem;
    font-size: 1rem;
    transition: all .5s;
    cursor: pointer;
  }
  a:hover {
    background: #222;
    border-radius: .1rem;
    color: white;
  }
}
@media screen and (max-width:1200px) {
  #tabbarLink{
    display: none;
  }
}
</style>