<template>
  <div id="index">
      <div class="container" v-if="!isAdmin">
        <Header :showSome="showSome"></Header>
        <div v-show="!TypeChange" class="moon"></div>
        <div v-show="TypeChange"  class="night"></div>
        <Light @changeBackground="changeBG"/>
        <div class="content">
            <div class="left" ref="left">
                <div class="info">
                    <div class="img">
                        <img src="@/assets/images/baby.jpg">
                    </div>
                    <div class="intro">
                        <p class="name">Heartless</p>
                        <p class="desc">A handsome man</p>
                    </div>
                </div>
                <div class="scroll">
                    <div class="nav">
                    <el-row style="height:100%">
                        <el-col :span="8" style="height:100%;width:232px;background:rgba($color: #2b2c28, $alpha: 0.6)">
                            <el-menu
                            class="el-menu-vertical-demo"
                            text-color="#cbced4"
                            active-text-color="#fff"
                            >
                            <div class="navTitle">
                                <span>导航</span>
                            </div>
                            <el-menu-item index="1" @click="$router.push('/article')">
                                <i class="el-icon-menu"></i>
                                <span slot="title">首页</span>
                            </el-menu-item>
                            <el-menu-item index="2" @click="$router.push('/demo')">
                                <i class="el-icon-video-camera"></i>
                                <span slot="title">Demo</span>
                            </el-menu-item>
                            <el-menu-item index="3" @click="$router.push('/photos')">
                                <i class="el-icon-picture-outline"></i>
                                <span slot="title">云相册</span>
                            </el-menu-item>
                            <el-menu-item index="4" @click="$router.push('/message')">
                                <i class="el-icon-chat-dot-round"></i>
                                <span slot="title">留言板</span>
                            </el-menu-item>
                            <el-menu-item index="5" @click="$router.push('/profile')">
                                <i class="el-icon-user"></i>
                                <span slot="title">个人信息</span>
                            </el-menu-item>
                            <div class="navTitle">
                                <span>其他</span>
                            </div>
                            <!-- <el-submenu index="4">
                                <template slot="title">
                                <i class="el-icon-menu"></i>
                                    <span slot="title">文章分类</span>
                                </template>
                                <el-menu-item @click.native="$router.push('/admin/article/upload/users')" index="2-1">用户列表管理</el-menu-item>
                            </el-submenu> -->
                            <Category/>
                            <el-menu-item index="7" @click="goAdmin" v-if="showSome">
                                <i class="el-icon-setting"></i>
                                <span slot="title">后台管理</span>
                            </el-menu-item>
                            <el-menu-item index="7" @click="goGithub">
                                <i class="iconfont icon-github" style="padding: 5px;padding-right:8px"></i>
                                <span slot="title">Github</span>
                            </el-menu-item>
                            </el-menu>
                        </el-col>
                    </el-row>
                    </div>
                </div>
                <!-- <div class="bottom">
                    <i class="el-icon-setting"></i>管理后台
                </div> -->
            </div>
            <div class="main" :style="{backgroundColor: bgColor}" ref="main">
                <!-- <div class="header">
                    <h1>Heartless</h1>
                    <h3>迷失的人迷失了，相逢的人会再相逢</h3>
                </div> -->
                <keep-alive>
                    <router-view class="router" :style="{backgroundColor: bgColor}"/>
                </keep-alive>
                <div class="foot">
                    粤ICP备2021032727号
                </div>
            </div>
            <div v-if="showSome" class="right" :style="{backgroundColor: bgColor}">
                <div class="recent">
                    <!-- <div class="title">最近文章</div> -->
                    <Recent/>
                </div>
                <div class="aboutBlog">
                    <Blog/>
                </div>
                <div class="contact">
                    <Contact/>
                </div>
            </div>
        </div>
        <Music v-if="!showSome"/>
      </div>
      <div v-if="isAdmin">
            <div class="moon"></div>
            <keep-alive>
                <router-view class="router_content"></router-view>
            </keep-alive>
      </div>
  </div>
</template>

<script>
import eventBus from '../utils/eventBus'
import Header from '../components/Header'
import Light from '../components/highlight/light'
import Category from '../components/ArticleComponents/Category'
import Recent from '../components/ArticleComponents/Recent'
import Blog from '../components/Index/Blog'
import Contact from '../components/Index/Contact'
import Music from '../components/Index/Music'
export default {
    components: {
        Header,
        Light,
        Category,
        Recent,
        Blog,
        Contact,
        Music
    },
    data() {
        return {
            screenWidth: document.documentElement.clientWidth,//屏幕宽度
            showSome: true,
            isAdmin: false
        }
    },
    watch: {
        'screenWidth':function(val){
            if(val>1200){
                this.$refs.left.style.left = "";
                this.$refs.main.style.marginLeft = "232px"
                this.showSome = true
            } else {
                this.$refs.left.style.left = '0px'
                this.$refs.main.style.marginLeft = "232px"
                this.showSome = false
            }
        }
    },
    computed: {
        Color() {
            return this.$store.state.Color
        },
        TypeChange() {
            return this.$store.state.fontColor
        },
        bgColor() {
            return this.$store.state.bgColor
        }
    },
    async beforeMount() {
        if(!window.location.href.includes('admin')){
            this.isAdmin = false
        } else {
            this.isAdmin = true
        }
        if(this.screenWidth<1200){
            this.showSome = false
        } else {
            this.showSome = true
        }
    },
    async mounted() {
        let that = this;
        if(this.screenWidth<1200){
            this.$refs.left.style.left = '-232px'
        }
        window.onresize = function(){
            that.screenWidth = document.documentElement.clientWidth;
        }
    },
    beforeUpdate() {
        if(!this.$route.path.includes('admin')){
            this.isAdmin = false
        } else {
            this.isAdmin = true
        }
        // 接受Header的控制参数
        const that = this
        eventBus.$on('eventFromHeader', function(val) {
            if (val) {
                that.$refs.left.style.left = '0'
                that.$refs.main.style.marginLeft = "232px"
            } else {
                that.$refs.left.style.left = '-232px'
                that.$refs.main.style.marginLeft = "0"
            }
        })
    },
    methods: {
        changeBG() {
            this.$store.commit('updatefont', !this.$store.state.fontColor)
            // console.log(this.$store.state.backgroundColor)
            // console.log(this.$store.state.bgColor)
            this.$store.commit('updateBgColor', !this.$store.state.backgroundColor)
        },
        // 跳转到github
        goGithub() {
          window.open='https://github.com/Chen-12138'
        },
        // 跳转到后台管理
        goAdmin() {
            this.$router.push('/admin');
        }
    }
}
</script>

<style lang='scss' scoped>
body,html{
    width: 100%;
    height: 100%;
}
#index{
    display: flex;
    flex-direction: column;
    width: 100%;
    .moon,.night {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: -1;
    }
    .night {
        background: url('../assets/images/night.gif') center;
    }
    .moon {
        background: url('../assets/images/meinv.jpg') no-repeat;
        background-size: 100% 100%;
    }
}
.container{
    width: 1380px;
    margin: 0 auto;
    .content{
        display: flex;
        flex-direction: row;
        .left{
            position: fixed;
            transition: all 1s;
            margin-top: 50px;
            width: 232px;
            height: 100%;
            min-height: 100vh;
            background-color: rgba($color: #2b2c28, $alpha: 0.6);
            .info{  
                height: 96px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 15px;
                border-bottom: 2px solid #dae0de;
                .img{
                    margin-right: 15px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    box-shadow: 0 0 5px #ccc;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                        transition: all 1s;
                    }
                    :hover{
                        transform: rotate(360deg);
                    }

                }
                .intro{
                    .name{
                        font-size: 14px;
                        margin-bottom: 5px;
                        color: lightblue;
                        font-weight: bold;
                    }
                    .desc{
                        color: #a0a0a0;
                        font-size: 12px;
                    }
                }
            }
            .scroll{
                top: 148px;
                bottom: 0;
                position: fixed;
                height: 100%;
                overflow-y: scroll;
                overflow-x: scroll;
            }
            .nav{
                position: relative;
                .navTitle{
                    height: 18px;
                    padding: 0 15px;
                    margin-top: 10px;
                    margin-bottom: 15px;
                    color: #a0a0a0;
                }
            }
            ::-webkit-scrollbar { 
                display: none;
            }
            ::-webkit-scrollbar-thumb{ 
                display: none;
            }
        }
        .main{
            margin-top: 50px;
            margin-left: 232px;
            width: 900px;
            min-height: 100vh;
            position: relative;
            transition: all 1s;
            background-color: rgba($color: #f2f2f2, $alpha: 0.6);
            .header{
                height: 102px;
                width: 900px;
                padding: 20px;
                // background-color: #edeeea;
                h1{
                    font-weight: 700;
                }
                h3{
                    font-weight: 600;
                }
            }
            .router{
                width: 100%;
                padding: 10px;
                min-height: 95vh;
                box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
                background-color: rgba($color: #f2f2f2, $alpha: 0.6);
                animation: animate 2s;
            }
            .foot{
                // width: 96%;
                height: 36px;
                line-height: 36px;
                margin: 0 auto;
                text-align: center;
                background-color: rgba($color: #f2f2f2, $alpha: 0.6);
            }
        }
        .right{
            margin-top: 50px;
            // padding: 15px;
            background-color: rgba($color: #edeeea, $alpha: 0.6);
            width: 250px;
            font-size: 17px;
            ul{
                list-style: none;
            }
            .title{
                margin-bottom: 10px;
            }
            .recent{
                padding-top: 12px;
            }
            .aboutBlog{
                padding-top: 12px;
            }
            .contact{
                padding-top: 12px;
            }
        }
    }
}

/* @media screen and (max-width:992px) {
    #index{
        overflow: hidden;
    }
} */

@media screen and (max-width:1200px) {
  .container{
    width: 100%;
    // overflow: hidden;
    position: relative;
    .content{
        height: 100%;
        .left{
            height: calc(100% - 52px);
            min-height: 100vh;
            position: fixed;
            .scroll{
                height: auto;
            }
        }
        .main{
            min-width: 100%;
            margin-left: 0;
        }
    }
    // .right{
    //     display: none;
    // }
  }
}

.el-menu-vertical-demo{
    background-color: rgba($color: #2b2c28, $alpha: 0.6);
    el-menu-item{
        background-color: rgba($color: #2b2c28, $alpha: 0.6);
    }
    el-menu-item:hover{
        background-color: rgba($color: #2b2c28, $alpha: 0.6);
    }
    .el-menu-item:focus, .el-menu-item:hover{
        background-color: rgba($color: #2b2c28, $alpha: 0.6);
    }
}

.router_content {
    animation: animate 2s;
}

@keyframes animate {
    0% { opacity: 0; transform: translateY(-50px);}
    100% { opacity: 1; transform: translateY(0);}
}

</style>