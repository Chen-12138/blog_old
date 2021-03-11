<template>
  <div id="message">
      <h3 style="margin-bottom:25px">可以给博主大大留言，他回来的时候就可以看见啦  (｡･∀･)ﾉﾞ嗨 ~</h3>
      <!-- <el-form :model="formInline">
          <el-form-item>
              <el-input placeholder="请输入留言内容" v-model="message"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" style="position:absolute; right:0">发表</el-button>
          </el-form-item>
      </el-form> -->
        <replyOrpublish
        :messageData='messageList' publishURL="/message/leavemessage"
        replyURL='/message/replyInfo'
        style="margin-bottom:30px"
        />
        <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
         @current-change="handleCurrentChange"
        >
        </el-pagination>
  </div>
</template>

<script>
import replyOrpublish from '../components/ReplyOrPublish/ReplyOrPublish'
export default {    
    name: 'LeaveMessage',
    data() {
        return {
            messageList: [],
            count: 0
        }
    },
    components: {
        replyOrpublish
    },
    mounted() {
        this.Pagechange(1)
    },
    methods: {
        // 换页的回调函数
        handleCurrentChange(val) {
            this.Pagechange(val)
        },
        async Pagechange(index) {
            /* 发起请求 */
            this.$store.commit('LoadingTitleChange', {isShow: true, title: '正在获取留言信息~'})
            const res = await this.$api.getComment(index)
            if (res.err === 0) {
                this.count = res.message.count
                this.messageList = res.message.data
            } else {
                this.$message.error("网络出错了,(ノへ￣、)！")
            }
            this.$store.commit('LoadingTitleChange', {isshow: false, title: ''})
        }
    }

}
</script>

<style lang='scss'>
#message {
    width: 85%;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    padding-top:2rem;
    .page {
      margin:2rem 0;
      position: relative;
      z-index: 99;
    }
}
</style>