<template>
  <div id="detail">
    <!-- 标题 -->
    <header class="detail_header" :style="{color: Color}">
      <h2 style="font-size:1.3rem">
        <i class="iconfont icon-lianjie"></i>
        {{detail.title}}
      </h2>
      <!-- 时间 -->
      <h3 style="padding-top:1rem;">
        <!-- <Icon type="ios-timer" /> -->
        {{detail.time | dateFilter}}
      </h3>
      <!-- 标签 -->
      <div class="tags">
        <!-- <Tag :color="bgColor[index]" v-for="(item,index) in lablesList" :key="index">{{item}}</Tag> -->
      </div>
    </header>
    <!-- 内容区 -->
    <div class="content">
        <div class="article-box">
            <div class="render">
                {{detail.content}}
            </div>
        </div>
        <replyOrpublish
            :messageData="messageList"
            publishURL="/note/accessPulish"
            replyURL="/note/replyInfo"
        />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import replyOrpublish from '../ReplyOrPublish/ReplyOrPublish'
export default {
    name: 'detail',
    components: {
        replyOrpublish
    },
    data() {
        return {
            // 文章对象
            detail: {},
            // 留言回复
            messageList: [],
            title: '',
            bgColor: ["magenta", "blue", "red", "cyan", "volcano", "yellow"],
            
        }
    },
    filters: {
        dateFilter(val) {
        return moment(val).format("YYYY-MM-DD");
        }
    },
    computed: {
        lablesList() {
            const regExep = /\w\w*/g;
            return this.title.match(regExep);
        },
        Color() {
            return this.$store.state.Color;
        }
    },
    mounted() {
        this.getDetail()
    },
    methods: {
        async getDetail() {
            const res = await this.$api.getDetail(this.$route.params.id)
            console.log(res)
            if (res.err === 0) {
                this.detail =  res.message.content[0]
                this.messageList = res.message.data
                this.title = this.detail.title
            }
        }
    }
}
</script>

<style lang='scss'>
#detail {
    .detail_header {
        height: 15rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .ball {
            margin-top: 1rem;
            span {
            display: inline-block;
            width: 12px;height: 12px;
            border-radius: 50%;
            margin: 0 0.2rem;
            }
        }
        .tags {
        margin-top: 0.5rem;
        }
    }
    .content{
        padding-left: 12rem;
        padding-right: 12rem;
        .article-box{
            border: 1px solid #2d8cf0;
            border-radius: 5px;
            min-height: 180px;
            margin-bottom: 40px;
            padding: 2rem;
        }
    }
}
</style>