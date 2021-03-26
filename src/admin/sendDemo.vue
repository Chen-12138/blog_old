<template>
  <div class="sendDemo">
      <h2>demo视频+源码发布</h2>
      <div class="demoItem">
          <p><img v-show="video_pic" style="width:240px" :src="video_pic" alt="图片"></p>
          <el-upload
            style="margin-bottom:2rem"
            :action="baseURL"
            :on-success="handleImgSuccess"
            :show-file-list="false"
            >
            <el-button type="primary"><i class="el-icon-upload" style="margin-right:.5rem"></i>选择Demo封面图片</el-button>
            </el-upload>
          <video v-show="video_path" style="width:240px" controls>
            <source :src="video_path" type="video/mp4" />
          </video>
          <el-upload
            style="margin-bottom:2rem"
            :action="baseURL"
            :on-success="handleVideoSuccess"
            :show-file-list="false"
            >
          <el-button type="primary"><i class="el-icon-upload" style="margin-right:.5rem"></i>选择Demo视频</el-button>
          <div slot="tip" class="el-upload__tip">只能上传mp4格式文件</div>
          </el-upload>
          <el-upload
            style="margin-bottom:2rem"
            class="upload-demo"
            :action="baseURL"
            :on-success="handleCodeSuccess"
            :file-list="fileList">
          <el-button type="primary"><i class="el-icon-upload" style="margin-right:.5rem"></i>点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-input
            style="margin-bottom:2rem"
            type="textarea"
            :rows="4"
            placeholder="请输入Demo描述"
            v-model="content">
          </el-input>
          <el-button type="primary" @click="publish">
              发表
          </el-button>

      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            video_pic: "",
            video_path: "",
            code_path: "",
            fileList: [],
            content: "",
        }
    },
    computed: {
        baseURL() {
        return `${this.$store.state.baseURL}/video/upload`;
        },
    },
    methods: {
        handleImgSuccess(res, file) {
            // console.log(res,file)
            this.video_pic = res.file.url
        },
        handleVideoSuccess(res) {
            this.video_path = res.file.url
        },
        handleCodeSuccess(res) {
            this.code_path = res.file.url
        },
        handeleChange() {

        },
        async publish() {
            try {
                const admin_id = JSON.parse(localStorage.getItem('admin')).admin_id;
                const res = await this.$api.sendDemo({
                    admin_id: admin_id,
                    brief: this.content,
                    video_pic: this.video_pic,
                    video_url: this.video_path,
                    // codePath: this.code_path
                })
                console.log(res)
                if (res.code === 200) {
                    this.$message.success(res.msg)
                    setTimeout(() => {
                        this.$router.replace('/demo')
                    },1000)
                } else {
                    this.$message.error(res.msg)
                }
            } catch (error) {
                this.$message.error(error)
            }
        }
    }
}
</script>

<style lang='scss'>
.sendDemo {
  padding: 2rem;
  h2 {
    margin-bottom: 1rem;
  }
  .demoItem {
    position: relative;
    z-index: 99;
    el-upload{
        margin-bottom: 2rem;
    }
  }
}
</style>