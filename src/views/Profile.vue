<template>
  <div id="Info">
      <div v-if="!username" style="text-align:center;padding-top:8rem;">
        糟糕，您还没有登陆检测不到信息! ~§(*￣▽￣*)§~
      </div>
      <div v-if="username" class="SuccessInfo">
          <h4 style="color:orange;margin-bottom:1rem;">下面这些就是您的个人信息啦(●ˇ∀ˇ●)~</h4>
          <img :src="MyInfo.uploadimg" alt="这是头像啦啦啦~">
          <el-upload
            v-show="flag"
            class="avatar-uploader"
            action="http://localhost:3000/upload/headPortraitUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button type="primary" class="back_out" @click="open">退出登录</el-button>    
          <p><span>昵称:</span><input :class="{active:!flag}" :disabled="!flag" class="name" type="text" v-model="MyInfo.name"></p>
          <p><span>介绍:</span><input :class="{active:!flag}" :disabled="!flag" class="info" type="text" v-model="MyInfo.info"></p>
          <p>
          <el-button class="editor_Info" @click="updateInfo" type="default">编辑信息</el-button>
          <el-button class="primary" v-show="flag" @click="submit" type="primary">提交</el-button>
          </p>
          <p>温馨提示:如果点错了,再次点击编辑信息可以取消编辑哦(。・∀・)ノ</p>
      </div>
  </div>
</template>

<script>
export default {
    name: 'profile',
    props: {},
    data () {
        return {
            username: '',
            MyInfo: {},
            flag: false,
            modal1:false,
            imageUrl: ''
        }
    },
    mounted() {
        this.getInfo()
    },
    methods: {
        // 获取用户信息
        async getInfo() {
            this.username = localStorage.getItem('username')
            if(this.username) {
                const res = await this.$api.getInfo(this.username)
                if (res.err === 0) {
                    this.MyInfo = res.Info[0]
                } else if (res.err === -999) {
                    this.$message.error('对不起，您的登录信息已过期，请重新登陆。')
                    localStorage.removeItem('username')
                    setTimeout(() => {
                        location.reload()
                    })
                } else {
                    this.$message.error(res.message)
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
                token: this.username,
                Info: this.MyInfo.info,
                name: this.MyInfo.name,
                Imgsrc: this.MyInfo.uploadimg
            })
            if (res.err == 0) {
                this.flag = false
                this.$message.success(res.message)
            } else {
                this.$message.error(res.message)
            }
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.MyInfo.uploadimg = file.response.url
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
    width: 70%;height: 28rem;
    border-radius: 1rem;
    margin: 6rem auto ;
    position: relative;
    z-index: 5;
    .SuccessInfo {
        img {
              width: 8rem;
              height: 8rem;
              border-radius: 50%;
              box-shadow: 0 0 5px #ccc;
              margin: 1rem 0 0 1rem;
              position: relative;
              z-index: 3;
        }
        p{
            text-align: left;
            font-size: 1.2rem;
            margin:1rem;
            font-weight: bold;
            span {
            color: lightblue;
            font-weight: bold;
            }
        }
        .name,
        .info {
            border: 0;
            outline: none;
            padding: 0.2rem;
            transition: all .5s;
            font-weight: bold;
            border-radius: 0.2rem;
            margin-left: 0.2rem;
            background: #f2f2f2;
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
            margin:1rem;
            position: relative;
            z-index: 3;
        }
        .back_out {
            font-size:0.5rem;margin:0 0 1.5rem 2rem;
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