<template>
  <div class="replyOrpublish">
      <div class="compile">
          <el-input
          v-model="value"
          maxlength="100"
          placeholder="你想说些什么呢"
          style="width: 80%;margin-right:10px;margin-bottom:.8rem"
          ></el-input>
          <el-button type="primary" @click="publish">发表</el-button>
      </div>
        <div class="leaveContent">
            <!-- <div v-for="(item,index) in messageData" :key="index">
                <div ref="contentItem" class="contentItem" :style="{color: Color}">
                    <div class="head">
                        <p v-show="publishURL == '/note/accessPulish'" class="number_id">{{index+1}} 楼</p>
                        <p v-show="publishURL == '/message/leavemessage'" class="number_id">{{item.id}} 楼</p>
                        <img style="width: 2rem;height: 2rem;border-radius: 50%;" :src="item.Imgsrc">
                        <a>{{item.name}}<span v-show="item.username === 'Heartless'" class="chief">站长</span></a>
                    </div>
                    <span>{{item.value}}</span>
                    <p>{{item.date | dateFilter}}</p>
                    <p @click="SetReplyInfo(item, index)">回复</p>
                </div>
            </div> -->
            <div v-for="(item,index) in messageData" :key="item.id" class="Content">
                <div class="contentItem">
                    <img :src="item.imgsrc" alt="用户头像">
                    <div class="info">
                        <div class="head">
                            <span class="name">{{item.name}}<span v-show="item.name === '123456'" style="color: #2d8cf0">站长</span></span>
                            <div class="right">
                                <span class="time" :style="{color: Color}">{{item.date | dateFilter}}</span>
                                <span class="number_id" :style="{color: Color}">{{item.id}} 楼</span>
                            </div>
                        </div>
                        <div class="content">
                            <p class="message" :style="{color: Color}">{{item.content}}</p>
                            <p class="reply" @click='SetReplyInfo(item, index)'>回复</p>
                        </div>
                    </div>
                </div>
                <!-- 回复 -->
                <div class="replyContent" v-for="(replyItem, j) in item.replyAccess" :key="replyItem.id">
                    <img :src="replyItem.user_imgsrc" alt="用户头像">
                    <div class="info">
                        <div class="head">
                            <div  class="left">
                            <span class="name">{{replyItem.name}}<span v-show="replyItem.name === '123456'" style="color: #2d8cf0">站长</span></span>
                            <span class="time">{{replyItem.date | dateFilter}}</span>
                            </div>
                            <div class="right">
                                <span class="number_id">{{replyItem.id}} 楼</span>
                            </div>
                        </div>
                        <div class="content">
                            <div class="left">
                                <span>回复</span>
                                <span class="name">@{{replyItem.reply_name}}</span>
                                <span class="message">{{replyItem.content}}</span>
                            </div>
                            <p class="reply" @click="SetPaddingReply(replyItem, item, j)">回复</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'replyOrpublish',
    props:{
      messageData:{
        type:Array,
        default(){
          return []
        }
      },
      publishURL:{
        type:String,
        default:''
      },
      replyURL:{
        type:String,
        default:''
      }
    },
    data() {
        return {
            // 留言
            value: '',
            isShow: false,
            // 参数对象
            obj: {},
            // 留言id
            message_id: '',
            // 回复id
            reply_id: '',
            replyInfo: {},
            // replyValue: ''
        }
    },
    mounted() {
        // console.log(this.$route.params.id)
    },
    filters: {
        dateFilter(val) {
            return moment(val).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    computed: {
        Color() {
            return this.$store.state.Color
        },
        bgColor() {
            return this.$store.state.Color == '#333' ? "#f2f2f2" : 'transparent'
        }
    },
    methods: {
        // 回复留言
        SetReplyInfo(item, index) {
            this.message_id = item.id;
            this.reply_id = '';
            // 打开输入框
            this.open()
        },
        // 发表
        async publish() {
            if(localStorage.getItem("username")){
                if (this.value) {
                    const username = localStorage.getItem('username')
                    /* detail start */
                    const article_id = this.$route.params.id
                    // let that = this
                    if (this.publishURL == '/article/leaveMessage') {
                        this.obj = {
                            token: username,
                            article_id: article_id,
                            content: this.value
                        }
                    }
                    /* detail end */
                    /* leave message start */
                    if (this.publishURL == '/message/leaveMessage') {
                        this.obj = {
                            token:username,
                            content:this.value
                        }
                    }
                    /* leave message end */
                    try {
                        const res = await this.$api.publish(this.publishURL,this.obj)
                        if (res.code == 200) {
                            this.$message.success(res.msg)
                            setTimeout(()=>{
                                location.reload()
                            }, 1000)
                        } else {
                            this.$message.error(res.msg)
                        }
                    } catch (error) {
                        this.$message.error(error)
                    }
                    
                } else {
                    this.$message.error(res.msg)
                }
            } else {
                this.$message.error("请先去登陆再来留言哦,(ノへ￣、)！")
            }
        },
        // 回复留言
        async handleInputContent(value) {
            const token = localStorage.getItem('username')
            if (!token) return this.$message.error('您还没有登录呢！')
            try {
                const res = await this.$api.reply(this.replyURL, {
                    message_id: this.message_id,
                    reply_id: this.reply_id,
                    content: value,
                    token
                })
                // console.log(res)
                if (res.code === 200) {
                    this.$message.success(res.msg)
                    setTimeout(() => {
                        location.reload()
                    }, 1500)
                } else {
                    this.$message.error(res.msg)
                }
            } catch (error) {
                this.$message.error(error)
            }
        },
        // 打开回复框
        open() {
            // 打开输入框
            this.$prompt('请输入回复内容。。。', '回复内容', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValidator: (val) => {
                if (val === null) {
                    return '内容不能为空呀，请输入内容~';//初始化的值为null，不做处理的话，刚打开MessageBox就会校验出错，影响用户体验
                }
            },
            inputErrorMessage: '内容不能为空呀，请输入内容~'
            }).then(({ value }) => {
                this.handleInputContent(value)
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消输入'
            });       
            });
        },
        // 回复留言的回复
        async SetPaddingReply(selfItem, parentItem, index) {
            this.reply_id = selfItem.id;
            this.message_id = '';
            this.open()
        }
    }
}
</script>

<style lang='scss'>
.replyOrpublish {
    .btn {
        margin:1rem;
        z-index: 5;
        position: relative;
    }
    .compile {
        margin:2rem;
        position: relative;
        z-index: 5;
    }
    .leaveContent {
        font-size: 14px;
        .contentItem {
            display: flex;
            border-bottom: 1px solid #d0d0d0;
            padding-top: 5px;
            padding-right: 8px;
            img{
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 50%;
                margin-right: 1rem;
            }
            .info{
                width: 100%;
                margin-bottom: 6px;
                .head{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px;
                    .name{
                        display: block;
                        width: 100px;
                        color: red;
                    }
                    .right{
                        .number_id{
                            float: right;
                        }
                        .time{
                            margin-left: 10px;
                            float: right;
                        }
                    }
                }
                .content{
                    display: flex;
                    justify-content: space-between;
                    .reply{
                        color: #2d8cf0;
                        cursor: pointer;
                    }
                }
            }
        }
        .replyContent{
            font-size: 13px;
            display: flex;
            margin-left: 28px;
            background-color: #f2f2f2;
            border-bottom: 1px solid #bbb9b9;
            padding: 5px;
            padding-right: 8px;
            padding-top: 5px;
            img{
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                margin: .4rem;
                margin-right: .6rem;
            }
            .info{
                width: 100%;
                margin-bottom: 6px;
                .head{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px;
                    .left{
                        display: flex;
                    }
                    .name{
                        color: red;
                        margin-right: 16px;
                    }
                    .right{
                        // width: 26px;
                        .number_id{
                            float: right;
                        }
                        .time{
                            margin-left: 10px;
                            float: right;
                        }
                    }
                }
                .content{
                    display: flex;
                    justify-content: space-between;
                    .reply{
                        color: #2d8cf0;
                        cursor: pointer;
                    }
                    .name{
                        margin-left: 6px;
                        margin-right: 6px;
                        color:#2d8cf0;
                    }
                }
            }
        }
    }
    
}
</style>