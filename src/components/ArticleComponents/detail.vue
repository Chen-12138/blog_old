<template>
  <div id="detail">
    <!-- 标题 -->
    <header class="detail_header" :style="{color: Color}">
      <h1 style="font-size:1.6rem">
        <i class="iconfont icon-lianjie"></i>
        {{detail.title}}
      </h1>
      <!-- 时间 -->
      <h3 style="padding-top:1rem;">
        <p>作者：{{detail.name}} {{detail.create_time | formateDateDetail}}发布</p>
        <p>于{{detail.update_time | formateDateDetail}}更新</p>
      </h3>
      <!-- 标签 -->
      <div class="tags">
        <!-- <Tag :color="bgColor[index]" v-for="(item,index) in lablesList" :key="index">{{item}}</Tag> -->
      </div>
    </header>
    <!-- 内容区 -->
    <div class="content">
        <markdown ref="md" :toolbarsFlag="false" :subfield="false" :defaultOpen="'preview'"/>
        <replyOrpublish
            :messageData="messageList"
            publishURL="/article/leaveMessage"
            replyURL="/article/messageReply"
        />
    </div>
  </div>
</template>

<script>
import markdown from '../../admin/markdownEdit'
import replyOrpublish from '../ReplyOrPublish/ReplyOrPublish'
export default {
    name: 'detail',
    components: {
        markdown,
        replyOrpublish
    },
    data() {
        return {
            // 文章对象
            detail: {},
            // 留言回复
            messageList: [],
            // 页数
            page: 1,
            // 每页数量
            pageSize: 5,
            // 总数量
            count: 0,
            title: '',
            bgColor: ["magenta", "blue", "red", "cyan", "volcano", "yellow"],
            // 转化后的html代码
            html: ''
        }
    },
    watch: {
        $route(){
            if(this.$route.params.id){
                this.getDetail()
            }
        }
    },
    computed: {
        Color() {
            return this.$store.state.Color;
        }
    },
    mounted() {
        this.getDetail()
        this.getArticleMessage()
    },
    methods: {
        /* 获取文章详情 */
        async getDetail() {
            const res = await this.$api.getDetail(this.$route.params.id)
            // console.log(res)
            if (res.code === 200) {
                this.detail =  res.data
                // this.messageList = res.message.data
                this.title = this.detail.title
                this.$refs.md.content = this.detail.content
            }
        },
        /* 获取文章留言 */
        async getArticleMessage() {
            const res = await this.$api.getArticleMessage({
                article_id: this.$route.params.id, 
                page: this.page, 
                pageSize: this.pageSize
            })
            if (res.code == 200) {
                this.messageList = res.data.data
            } else {
                // this.$message.error(res);
            }
            // console.log(res)
        }
    }
}
</script>

<style lang='scss'>
#detail {
    padding-left: 24rem;
    padding-right: 24rem;
    .detail_header {
        padding-top: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        h1{
            width: 100%;
            text-align: left;
            display: block;
        }
        h3{
            width: 100%;
            text-align: left;
            display: block;
            margin-bottom: 1rem;
        }
        .tags {
        margin-top: 0.5rem;
        }
    }
    .content{
        .article-box{
            border: 1px solid #2d8cf0;
            border-radius: 5px;
            min-height: 180px;
            margin-bottom: 40px;
            padding: 2rem;
        }
    }
}
@media screen and(max-width:992px) {
    #detail{
        .detail_header{
            height: 10rem;
        }
        .content{
            padding: 0 1rem;
            .article-box{
                padding: 1rem;
            }
        }
    }
}
</style>