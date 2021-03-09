<template>
  <div class="articleEditor">
      <div class="navgation">
          <el-row style="height:100%">
            <el-col :span="10" style="height:100%;background:#545c64;width:100%">
                <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :default-openeds="['1','2','3']"
                >
                <el-submenu index="1">
                    <template slot="title">
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
                    <el-menu-item @click.native="$router.push('/admin/article/upload/images')" index="3-2">上传图片</el-menu-item>
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

        }
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

<style lang='scss' scoped>
.articleEditor {
    width: 100vw;
    height: 100vh;
    display: flex;
    .navigation {
        width: 100%;
        display: flex;
        padding-right: 100px;
        position: fixed;
        top: 0;
        left: 0;
    }
    // flex-direction: row;
    .childrenRouter {
        flex: 1;
        z-index: 99;
        width: calc(100%-260px);
        // margin-left: 260px;
        padding-left: 50px;
    }
}
</style>