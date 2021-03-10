<template>
  <div class="send_content">
      <h2>上传照片到相册</h2>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="输入图片描述..."
        v-model="content"
        style="width:500px"
        >
      </el-input>
      <p><img v-show="imageUrl" :src="imageUrl" alt="图片"></p>
        <el-upload
        :action="baseURL"
        :on-success="handleSuccess"
        :show-file-list="false"
        >
        <el-button type="primary">选择文章封面图片</el-button>
        </el-upload>
        <el-button @click="send" type="primary">发表</el-button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            content: '',
            imageUrl: '',
            src: ''
        }
    },
    computed: {
        baseURL() {
            return `${this.$store.state.baseURL}/upload/sendcontent`;
        }
    },
    methods: {
        // 上传图片回调
        handleSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw)
            this.src = res.url
        },
        // 发表
        async send() {
            try {
                const res = await this.$api.sendPhoto({
                    contents: this.content,
                    imgsrc: this.src
                })
                if (res.err == 0) {
                    this.$message.success(res.data)
                } else {
                    this.$message.error(res.data)
                }
                location.reload()
            } catch (error) {
                this.$message.error(error)
            }
        }
    }
}
</script>

<style lang='scss'>
.send_content {
  padding-top: 5rem;
  position: relative;
  z-index: 5;
  h2{
      margin-bottom: 1.5rem;
  }
  button {
    margin-top: 1rem;
  }
  img {
    margin-top: 2rem;
    width: 380px;
  }
}
</style>