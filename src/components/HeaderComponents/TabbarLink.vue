<template>
  <div id="tabbarLink">
    <a v-for="(item, index) in LinkList" :key="index" @click="triggerPage(item.path)" ref="navigators">
      {{item.name}}
    </a>
  </div>
</template>
<script>
 export default {
    name:'tablink',
    data () {
      return {
          LinkList:[{name:"首页",path:'/'},{name:"文章列表",path:'/article'},
                    {name:"Demo",path:'/demo'},{name:"云相册",path:'/photos'},
                    {name:"个人信息",path:'/profile'},{name:"留言板",path:'/message'},
                    {name:"GitHub",path:'https://github.com/Chen-12138'},
                    {name:"登陆 / 注册",path:'/login'}
          ]
      };
    },
    mounted(){
      // if(localStorage.getItem('username')) {
      //   this.$refs.navigators[this.$refs.navigators.length-1].innerHTML
      //    = this.$refs.navigators[this.$refs.navigators.length-1].innerHTML.replace('登陆 / 注册', '已登录')
      // }
    },
    methods: {
        triggerPage(path) {
          if(path == '/login') {
            if(localStorage.getItem('username')) {
              this.$router.push('/logined')
              return
            }
          } else if(path == 'https://github.com/Chen-12138') {
            return window.open(path)
          }
          this.$router.push(path)
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
  height: 50px;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  // line-height: 50px;
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
</style>