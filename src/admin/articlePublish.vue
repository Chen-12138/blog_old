<template>
  <div id="articlePublish">
      <div class="container">
            <h2>文章发布</h2>
            <p>文章标题：</p>
        <el-input v-if="isShow" v-model="publishDate.title" style="width:80%" placeholder="请输入内容"></el-input>
        <el-input v-else v-model="updateData.title" style="width:80%" placeholder="请输入内容"></el-input>
            <p><img v-show="imageUrl" :src="imageUrl" alt="笔记中的图片"></p>
        <el-upload
        :action="articleImageUpload"
        :on-success="handleSuccess"
        :show-file-list="false"
        >
        <el-button type="primary">选择文章封面图片</el-button>
        </el-upload>
        <p>文章简介：</p>
        <el-input v-if="isShow" type="textarea" :rows="4" style="width:80%" placeholder="请输入文章简介..." v-model="publishDate.brief"></el-input>
        <el-input v-else type="textarea" :rows="4" style="width:80%" placeholder="请输入文章简介..." v-model="updateData.article_brief"></el-input>
        <p>文章主体内容：</p>
        <el-input v-if="isShow" type="textarea" :rows="16" style="width:80%" placeholder="请输入文章主体内容..." v-model="publishDate.content"></el-input>
        <el-input v-else type="textarea" :rows="16" style="width:80%" placeholder="请输入文章主体内容..." v-model="updateData.content"></el-input>
        <p>文章标签：</p>
        <el-input v-if="isShow" v-model="publishDate.lable" style="width:200px" placeholder="请输入内容"></el-input>
        <el-input v-else v-model="updateData.lable" style="width:200px" placeholder="请输入内容"></el-input>
        <p>文章分类：</p>
        <el-input v-if="isShow" v-model="publishDate.categroy" style="width:200px" placeholder="请输入内容"></el-input>
        <el-input v-else v-model="updateData.article_categroy" style="width:200px" placeholder="请输入内容"></el-input>
        <div class="event-Button">
            <el-button @click="handeleClick" type="primary">{{btntext}}</el-button>
            <el-button v-show="!isShow" @click="handleCancel" type="default">取消</el-button>
        </div>
      </div>
      
  </div>
</template>

<script>
export default {
    name: 'articlePublish',
    data() {
        return {
            publishDate:{
                src:'',
                title:'',
                brief:'',
                content:'',
                lable:'',
                categroy:''
            },
            updateData: {
                article_img: '',
                content: '',
                title: '',
                article_brief: '',
                lable: ''
            },
            imageUrl: '',
            // 控制更新的显示
            isShow: true,
            // 发布或更新
            btntext: '发布'
        }
    },
    computed: {
        articleImageUpload() {
            return `${this.$store.state.baseURL}/upload/imageUpload`
        }
    },
    mounted() {
        const id = this.$route.query.article_id
        console.log(id)
        if (id) {
            this.isShow = false
            this.btntext = "更新"
            this.getArticleInfo(id)
        }
    },
    methods: {
        // 获取文章内容
        async getArticleInfo(id) {
            const res = await this.$api.getDetail(id)
            if (res.err === 0) {
                this.updateData = res.message[0]
                this.imageUrl = res.message[0].article_img
            } else {
                this.$message.error(res.error)
            }
        },
        // 上传成功的回调函数
        handleSuccess(res, file) {
            // console.log(res, file)
            this.publishDate.src = res.url
            this.updateData.article_img = res.url
            this.imageUrl = URL.createObjectURL(file.raw)
        },
        // 处理按钮为更新或发表
        handeleClick() {
            if(this.isShow) {
                this.handlePublish()
            } else {
                this.handleUpdate()
            }
        },
        // 更新文章
        async handleUpdate() {
            if (
                !this.updateData.article_img ||
                !this.updateData.content ||
                !this.updateData.title ||
                !this.updateData.article_brief ||
                !this.updateData.lable
            ) return this.$message.error("请输入完整的文章信息!");
            const res = await this.$api.articleUpdate(this.updateData)
            if (res.err == 0) {
                this.$message.success(res.message)
            } else {
                this.$message.error(res.error)
            }
            this.$router.back()
        },
        // 发表文章
        async handlePublish() {
            if(
                !this.publishDate.src ||
                !this.publishDate.content ||  
                !this.publishDate.title ||  
                !this.publishDate.brief ||  
                !this.publishDate.categroy ||
                !this.publishDate.lable 
            ) return this.$message.error('请输入完整的文章信息!')
            const obj = this.publishDate
            const path = this.publishDate.lable + Math.floor(Math.random()*2000000)
            obj.articlePath = path
            const res = await this.$api.articlePublish(obj)
            if (res.err == 0) {
                this.$message.success(res.message)
            } else {
                this.$message.error(res.message)
            }
            this.$router.back()
        },
        // 更新页返回
        handleCancel() {
            this.$router.back()
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