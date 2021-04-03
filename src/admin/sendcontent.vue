<template>
  <div class="send_content">
      <h2>上传照片到相册</h2>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="输入图片描述..."
        v-model="content"
        style="width:500px;margin-bottom:2rem"
        >
      </el-input>
      <!-- <p><img v-show="imageUrl" :src="imageUrl" alt="图片"></p> -->
        <el-upload
        :action="baseURL"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-change="handleChange"
        >
        <i class="el-icon-plus"></i>
        <!-- <el-button type="primary">选择文章封面图片</el-button> -->
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-button @click="send" type="primary">发表</el-button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            content: '',
            // imageUrl: '',
            // 存放图片的数组
            fileList: [],
            // src: '',
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    computed: {
        baseURL() {
            return `${this.$store.state.baseURL}/photo/uploadPhotos`;
        }
    },
    methods: {
        // 上传图片回调
        handleSuccess(res, file) {
            // console.log(res,file)
            // this.imageUrl = URL.createObjectURL(file.raw)
            // this.src = res.url
        },
        // 发表
        async send() {
            try {
                // 去重
                const admin_id = JSON.parse(localStorage.getItem('admin')).admin_id;
                this.fileList = Array.from(new Set(this.fileList))
                console.log(admin_id, this.fileList[0])
                const res = await this.$api.sendPhoto({
                    brief: this.content,
                    imgsrc: JSON.stringify(this.fileList),
                    admin_id
                })        
                if (res.code == 200) {
                    this.$message.success(res.msg)
                } else {
                    this.$message.error(res.msg)
                }
                location.reload()
            } catch (error) {
                this.$message.error(error)
            }
        },
        handleRemove(file, fileList) {
            // console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleChange(file, fileList) {
            // console.log(fileList)
            let arr = [];
            fileList.forEach(item => {
                setTimeout(()=>{
                    console.log(item.response)
                    this.fileList = [...this.fileList,item.response.file.url];
                    // console.log(item.response.file.url)
                },120)
            })
            // 提交时再处理重复吧，这里可能异步了
            this.fileList = Array.from(new Set(arr))
            // console.log(this.fileList)
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
    object-fit: cover;
  }
}
// .el-upload-list--picture-card .el-upload-list__item-actions{
//     img{
//         // width: 100%;
//         object-fit: cover;
//     }
// }
</style>