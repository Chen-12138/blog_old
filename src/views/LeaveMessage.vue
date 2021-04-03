<template>
  <div id="message">
      <h3 style="margin-bottom:25px" :style="{color: Color}">可以给博主大大留言，他回来的时候就可以看见啦  (｡･∀･)ﾉﾞ嗨 ~</h3>
      <!-- <el-form :model="formInline">
          <el-form-item>
              <el-input placeholder="请输入留言内容" v-model="message"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" style="position:absolute; right:0">发表</el-button>
          </el-form-item>
      </el-form> -->
        <replyOrpublish
        :messageData='messageList' publishURL="/message/leaveMessage"
        replyURL='/message/messageReply'
        style="margin-bottom:30px"
        />
        <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        @current-change="handleCurrentChange"
        style="margin-bottom:30px"
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
            pageSize: 10,
            messageList: [],
            count: 0
        }
    },
    components: {
        replyOrpublish
    },
    computed: {
        Color() {
            return this.$store.state.Color
        }
    },
    mounted() {
        this.Pagechange(1,this.pageSize)
    },
    methods: {
        // 换页的回调函数
        handleCurrentChange(val) {
            this.Pagechange(val)
        },
        async Pagechange(index) {
            /* 发起请求 */
            const res = await this.$api.getComment(index, this.pageSize)
            console.log(res)
            if (res.code === 200) {
                this.count = res.data.count
                this.messageList = res.data.data
            } else {
                this.$message.error("网络出错了,(ノへ￣、)！")
            }
        }
    }

}
</script>

<style lang='scss'>
#message {
    height: 100%;
    width: 96%;
    margin: 0 auto;
    margin-top: 12px;
    border-radius: 4px;
    text-align: center;
    padding-top:2rem;
    .page {
      margin:2rem 0;
      position: relative;
      z-index: 99;
    }
}
@media screen and (max-width:992px) {
  #message{
      width: 100%;
      margin: 0;
  }
}
</style>