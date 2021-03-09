<template>
  <div id="articlePublish">
      <div class="container">
            <h2>文章发布</h2>
            <p>文章标题：</p>
        <el-input v-model="articleDate.title" style="width:80%" placeholder="请输入内容"></el-input>
            <p><img v-show="imageUrl" :src="imageUrl" alt="笔记中的图片"></p>
        <el-upload
        :action="articleImageUpload"
        :on-success="handleSuccess"
        :show-file-list="false"
        >
        <el-button type="primary">选择文章封面图片</el-button>
        </el-upload>
        <p>文章简介：</p>
        <el-input type="textarea" :rows="4" style="width:80%" placeholder="请输入文章简介..." v-model="articleDate.brief"></el-input>
        <p>文章主体内容：</p>
        <el-input type="textarea" :rows="16" style="width:80%" placeholder="请输入文章主体内容..." v-model="articleDate.content"></el-input>
        <p>文章标签：</p>
        <el-input v-model="articleDate.lable" style="width:200px" placeholder="请输入内容"></el-input>
        <p>文章分类：</p>
        <el-input v-model="articleDate.categroy" style="width:200px%" placeholder="请输入内容"></el-input>
        <div class="event-Button">
            <el-button @click="handlePublish" type="primary">发布</el-button>
            <el-button type="default">取消</el-button>
        </div>
      </div>
      
  </div>
</template>

<script>
export default {
    name: 'articlePublish',
    data() {
        return {
            articleDate:{
                src:'',
                title:'',
                brief:'',
                content:'',
                lable:'',
                categroy:''
          },
          imageUrl: ''
        }
    },
    computed: {
        articleImageUpload() {
            return `${this.$store.state.baseURL}/upload/imageUpload`
        }
    },
    mounted() {
        const id = this.$route.params.id
        if (id) {
            this.getArticleInfo(id)
        }
    },
    methods: {
        // 获取文章内容
        async getArticleInfo(id) {
            const res = await this.$api.getArticleInfo(id)
            if (res.err === 0) {
                this.articleDate = res.message.content
            } else {
                this.$message.error(res.error)
            }
        },
        // 上传成功的回调函数
        handleSuccess(res, file) {
            // console.log(res, file)
            this.articleDate.src = res.url
            this.imageUrl = URL.createObjectURL(file.raw)
        },
        // 发表文章
        async handlePublish() {
            if(
                !this.articleDate.src ||
                !this.articleDate.content ||  
                !this.articleDate.title ||  
                !this.articleDate.brief ||  
                !this.articleDate.categroy ||
                !this.articleDate.lable 
            ) return this.$message.error('请输入完整的文章信息!')
            const obj = this.articleDate
            const path = this.articleDate.lable + Math.floor(Math.random()*2000000)
            obj.articlePath = path
            const res = await this.$api.articlePublish(obj)
            if (res.err == 0) {
                this.$message.success(res.message)
            } else {
                this.$message.error(res.message)
            }
        }
    }
}
</script>

<style lang="scss">
#articlePublish{
    padding-top: 2rem;
    padding-right: 15rem;
    position: relative;
    z-index: 99;
    h2{
        margin-bottom: 2rem;
    }
    .container {
            position: relative;
            z-index: 99;
            img {
                width: 400px;
                // height: 300px;
            }
            p {
                color: #333;
                font-weight: bold;
                margin: 1rem 0;
            }
            .event-Button {
                margin-top: 1rem;
                button {
                    margin-right: 1rem;
                }
            }
        }
}
</style>