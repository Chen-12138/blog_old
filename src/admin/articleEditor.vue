<template>
  <div class="articleEditor">
      <div class="navigation">
          <el-row style="height:100%">
            <el-col :span="12" style="height:100%;width:260px;background:#515a6e">
                <el-menu
                :default-active="openIndex"
                class="el-menu-vertical-demo"
                background-color="#515a6e"
                text-color="#cbced4"
                active-text-color="#fff"
                :default-openeds="['1','2','3']"
                >
                <el-submenu index="1">
                    <template slot="title" style="background:#515a6e">
                    <i class="el-icon-location"></i>
                    <span>内容管理</span>
                    </template>
                    <el-menu-item @click.native="$router.push('/admin/article/upload/articlePublish')" index="1-1">文章发表</el-menu-item>
                    <el-menu-item @click.native="$router.push('/admin/article/upload/articleManage')" index="1-2">文章管理</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">用户管理</span>
                    </template>
                    <el-menu-item @click.native="$router.push('/admin/article/upload/users')" index="2-1">用户列表管理</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">其他内容</span>
                    </template>
                    <el-menu-item @click.native="$router.push('/admin/article/upload/photos')" index="3-1">上传相册</el-menu-item>
                    <!-- <el-menu-item @click.native="$router.push('/admin/article/upload/images')" index="3-2">上传图片</el-menu-item> -->
                    <el-menu-item @click.native="$router.push('/admin/article/upload/demo')" index="3-3">发表demo</el-menu-item>
                </el-submenu>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title" @click="exitSys">退出管理系统</span>
                </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
      </div>
      <div class="childrenRouter">
          <router-view/>
      </div>
  </div>
</template>

<script>
export default {
    name: 'articleEditor',
    data() {
        return {
            List: {
                '/admin/article/upload/articlePublish' : '1-1',
                '/admin/article/upload/articleManage' : '1-2',
                '/admin/article/upload/users' : '2-1',
                '/admin/article/upload/photos' : '3-1',
                '/admin/article/upload/demo' : '3-3'
            },
            openIndex: ''
        }
    },
    mounted() {
        // console.log(this.$route)
        const path = this.$route.path
        this.openIndex = this.List[path]
    },
    methods: {
      exitSys() {
        this.$confirm('确定要退出登陆吗？(✿◕‿◕✿)', '退出登录提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            }).then(async () => {
            const res = await this.$api.Exit()
            this.$message.success(res.message)
            location.reload()
            this.$message({
                type: 'success',
                message: '退出成功!'
            });
            }).catch(() => {
            this.$message({
                type: 'success',
                message: '不想退出可以多看看噢！(●ˇ∀ˇ●)'
            });          
        });
      }
    }
}
</script>

<style lang='scss'>
.articleEditor {
    width: 100vw;
    height: 100vh;
    display: flex;
    position: relative;
    .navigation {
        width: 100%;
        height: 100%;
        display: flex;
        // padding-right: 100px;
        position: fixed;
        top: 0;
        left: 0;
    }
    // flex-direction: row;
    .childrenRouter {
        flex: 1;
        z-index: 99;
        width: calc(100%-260px);
        margin-left: 240px;
        padding-left: 50px;
    }
}
.el-submenu .el-menu-item{
    background-color: #363e4f !important;
}
.el-menu-item.is-active {
    background-color: #2d8cf0 !important;
}
.el-menu-item:hover {
    color: #fff !important;
}
</style>