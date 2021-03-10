<template>
      <div :class="{show:$store.state.isShow}" class="MenuTab">
        <div class="profile">
            <img width="100" height="100" src="../assets/images/xiaomai.jpg" alt="">
            <div class="profile">Heartless</div>
        </div>
        <ul class="nav">
          <li><router-link :to="{ name: 'home' }" tag="a">首页</router-link></li>
          <li><router-link :to="{ name: 'Demo' }" tag="a">Demo</router-link></li>
          <li><router-link :to="{ name: 'photos' }" tag="a">云相册</router-link></li>
          <li><router-link :to="{ name: 'message' }" tag="a">留言板</router-link></li>
          <li><router-link :to="{ name: 'article' }" tag="a">文章列表</router-link></li>
          <li><router-link :to="{ name: 'profile' }" tag="a">个人信息</router-link></li>
          <li><router-link :to="{ name: 'login' }" tag="a">登录/注册</router-link></li>
          <li><router-link :to="{ name: 'home' }" tag="a">Github</router-link></li>
        </ul>
     </div>
</template>
<script>

  export default {
    name:'tabcontorle',
    data () {
      return {
          flag:false
      };
    },
    methods: {
        skip() {
          if(localStorage.getItem('username')) {
              this.$router.push('/logined')
              return
            }
            this.$router.push('/login')
        },
        Gogithub() {
          location.href='https://github.com/Acmenlei'
        }
    },
  }

</script>
<style lang="scss" scoped>
    .MenuTab {
      width:23rem;
      height: 100vh;
      // background: url('../assets/images/wetherSon.jpg') no-repeat center;
      background-color: blanchedalmond;
      background-size: cover;
      position: fixed;
      left: -35rem;
      top: 3rem;
      z-index: 998;
      border-right: 1px solid lightblue;
      transition: all .5s ease-in-out;
      i,span{
        font-size: 1.2rem;
        font-style:normal;
        margin-left: 1rem;
        color: rgb(255, 0, 106);
      }
      .nav{
        li{
          display: flex;
          align-items: center;
          padding-left: 2rem;
          height: 60px;
          a{
            font-size: 16px;
            text-decoration: none;
            color: #fff;
          }
        }
      }
      @media screen and (min-width:992px) {
        i,span{
          font-size: 1rem;
          font-style:normal;
          margin-left: 1rem;
        }
  }
      i:hover{
        cursor: pointer;
        color: rgb(56, 255, 6);
      }
      .profile{
        text-align: center;
       div{
        text-align: center;
        color: white;
        font-size: 25px;
        position: relative;
         background: linear-gradient(yellow,red );
         -webkit-background-clip: text;
        -moz-background-clip: text;
        color: transparent;
    }
        img {
          width: 100px;height: 100px;
           border-radius: 50%;
           transition: all 2s;
           box-shadow: 0 0 5px #fff;
           margin: 1rem;
       }
       img:hover {
           transform: rotate(360deg);
       }
      }
    }
    .show {
      left: 0;
      animation: borderFlex .9s;
    }
    @keyframes borderFlex {
      0%{ border-top-right-radius:500px;height: 0;}
      100%{ border-top-right-radius:0;height: 100vh;}
    }
</style>