<template>
  <div id="Info">
      <div v-if="!token" style="text-align:center;padding-top:8rem;" :style="{color: Color}">
        糟糕，您还没有登陆检测不到信息! ~§(*￣▽￣*)§~
        <p>如果已登录，刷新页面即可看到个人信息~</p>
      </div>
      <div v-if="token" class="SuccessInfo">
          <h4 style="color:orange;margin-bottom:1rem;" :style="{color: Color}">下面这些就是您的个人信息啦(●ˇ∀ˇ●)~</h4>
          <img :src="MyInfo.avatar" alt="这是头像啦啦啦~">
          <el-upload
            v-show="flag"
            class="avatar-uploader"
            :action="ImageUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button type="primary" class="back_out" @click="open">退出登录</el-button>    
          <p><span>昵称:</span><input :class="{active:!flag}" :disabled="!flag" class="name" type="text" v-model="MyInfo.name"></p>
          <p><span>介绍:</span><input :class="{active:!flag}" :disabled="!flag" class="info" type="text" v-model="MyInfo.introduction"></p>
          <p>
          <el-button class="editor_Info" @click="updateInfo" type="default">编辑信息</el-button>
          <el-button class="primary" v-show="flag" @click="submit" type="primary">提交</el-button>
          </p>
          <p :style="{color: Color}">温馨提示:如果点错了,再次点击编辑信息可以取消编辑哦(。・∀・)ノ</p>
      </div>
  </div>
</template>

<script>
export default {
    name: 'profile',
    props: {},
    data () {
        return {
            token: '',
            MyInfo: {},
            flag: false,
            modal1:false,
            imageUrl: ''
        }
    },
    computed: {
        ImageUpload() {
            return `${this.$store.state.baseURL}/users/editAvatar`
        },
        Color() {
            return this.$store.state.Color;
        }
    },
    mounted() {
        // location.reload();
        if(!localStorage.getItem('token')){
            this.$router.push('/login')
        } else {
            this.token = localStorage.getItem('token')
        }
        this.getInfo()
    },
    methods: {
        // 获取用户信息
        async getInfo() {
            this.token = localStorage.getItem('token')
            if(this.token) {
                const res = await this.$api.getInfo(this.token)
                // console.log(res);
                if (res.code === 200) {
                    this.MyInfo = res.Info
                } else if (res.code === 401) {
                    this.$message.error('对不起，您的登录信息已过期，请重新登陆。')
                    localStorage.clear()
                    setTimeout(() => {
                        location.reload()
                    })
                } else {
                    this.$message.error(res.msg)
                }
            }
        },
        // 确认是否退出登录
        open() {
            this.$confirm('确定要退出登陆吗？(✿◕‿◕✿)', '退出登录提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            }).then(() => {
            localStorage.clear()
            this.MyInfo = {}
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
        },
        // 打开编辑框
        updateInfo() {
            this.flag = !this.flag;
        },
        // 提交
        async submit() {
            /* 更改长度不能大于12 */
            if(this.MyInfo.name.length > 12) return this.$message.error('昵称长度不能大于12')
            const res = await this.$api.updateInfo({
                token: this.token,
                introduction: this.MyInfo.introduction,
                name: this.MyInfo.name,
                avatar: this.MyInfo.avatar
            })
            // console.log(res)
            if (res.code == 200) {
                this.flag = false
                this.$store.commit('saveUser', res.data);
                localStorage.setItem("user", JSON.stringify(res.data));
                this.$message.success(res.msg)
            } else {
                this.$message.error(res.msg)
            }
        },
        handleAvatarSuccess(res, file) {
            // console.log(file)
            this.imageUrl = file.response.file.url
            this.MyInfo.avatar = file.response.file.url
        },
        /* beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        } */
    }
}
</script>

<style lang='scss' scoped>
#Info{
    height: 100%;
    width: 96%;
    margin: 0 auto;
    margin-top: 12px;
    position: relative;
    // z-index: 5;
    display: flex;
    justify-content: center;
    // align-items: center;
    // background-color: rgba($color: #f2f2f2, $alpha: 0.6);
    .SuccessInfo {
        padding-top: 150px;
        padding-left: 20px;
        min-height: 700px;
        img {
              width: 128px;
              height: 128px;
              border-radius: 50%;
              box-shadow: 0 0 5px #ccc;
              margin: 16px 0 0 16px;
              position: relative;
              z-index: 3;
        }
        p{
            text-align: left;
            font-size: 19.2px;
            margin:8px;
            font-weight: bold;
            span {
            color: lightblue;
            font-weight: bold;
            }
        }
        .name,
        .info {
            font-size: 14px;
            border: 0;
            outline: none;
            padding: 3.2px;
            transition: all .5s;
            font-weight: bold;
            border-radius: 3.2px;
            margin-left: 3.2px;
            margin-bottom: 6px;
            height: 48px;
            background: #f2f2f2;
            padding-left: 16px;
        }
        .info {
            width:80%;
        }
        .active {
            background: transparent!important;
        }
        .editor_Info,
        .primary,
        .back_out {
            margin:16px;
            position: relative;
            z-index: 3;
        }
        .back_out {
            font-size:8px;margin:0 0 24px 32px;
        }
    }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
    // cursor: pointer;
}
</style>