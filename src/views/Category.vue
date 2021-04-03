<template>
  <div id="category">
      <h2 :style="{color: Color}">~点击已存在的标签搜索对应的内容</h2>
      <div class="lables">
        <div v-for="(item, index) in tagList" :key="index" style="margin-right:1rem; margin-bottom:.8rem; margin-left:1rem">
            <el-tag class="tag" @click="getArticle(item)">{{item}}</el-tag>
        </div>
      </div>
      <h3 :style="{color: Color}">以下为搜索结果~~~</h3>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span><i class="iconfont icon-wenzhang"></i>文章列表</span>
            <span style="float:right">共{{count}}篇</span>
        </div>
        <div class="content" v-for="item in List" :key="item.article_id">
            <div class="img">
                <img :src="item.img" @click="detailPage(item.article_id)" alt="图片">
            </div>   
            <div class="text">
                <h2 class="title"><i class="iconfont icon-biezhen"></i> {{item.title}}</h2>
                <p class="desc"><span style="font-size:16px;font-weight:bold">文章简介：</span>{{item.brief}}</p>
                <div class="text-bottom">
                    <div class="creater">
                        <img 
                        :src="item.avatar" 
                        alt="">
                        <span class="name">{{item.name}}</span>
                        <span class="time">{{item.create_time | formateDate}}</span>
                        <!-- <span @click="changeLike(item.like_Star, item.id, index)"><i class="iconfont icon-dianzan"></i>{{item.like_Star}}</span> -->
                        <span><i class="iconfont icon-pinglun"></i>{{item.replyCount}}</span>
                        <span><i class="iconfont icon-zhiboguankanshu"></i>{{item.visited}}</span>
                    </div>
                    <div class="tag">
                        <el-tag><i class="iconfont icon-biaoqian" style="font-size:.8rem;margin-right:.5rem;"></i>{{item.label}}</el-tag>
                    </div>
                </div>
            </div>
        </div>
        <div class="paginationWrap">
            <el-pagination
                class="pagination"
                background
                layout="total, prev, pager, next"
                :current-page='page'
                :page-size='pageSize'
                @current-change='handlePageChange'
                :total="count">
            </el-pagination>
        </div>
    </el-card>
  </div>
</template>

<script>
export default {
    name: 'category',
    data () {
        return {
            tagList: [],
            // 总文章数
            count: 0,
            // 页数
            page: 1,
            // 每页数量
            pageSize: 3,
            // 当前标签
            label: '',
            // 文章列表
            List: [],
        }
    },
    computed: {
        Color() {
            return this.$store.state.Color;
        }
    },
    mounted() {
        this.getTags()
    },
    methods: {
        // 获取文章标签
        async getTags() {
            try {
                const res = await this.$api.getLabel()
            if (res.code === 200) {
                let arr = []
                res.data.forEach(element => {
                    arr.push(element.label)
                });
                this.tagList = new Set(arr)
            } else {
                this.$message.error(res.msg)
            }
            } catch (error) {
                this.$message.error(error)
            }
        },
        async getArticle(item) {
            try {
                this.label = item;
                const res = await this.$api.getLabelInfo({
                    label: item,
                    page: this.page,
                    pageSize: this.pageSize
                })
                if (res.code == 200) {
                    this.$message.success('为您找到以下内容喔~');
                    this.List = res.data.data
                    this.count = res.data.count
                } else {
                    this.$message.error('您的网络不太好呢，请刷新后重试~')
                }
            } catch (error) {
                this.$message.error(error)
            }
        },
        handlePageChange(val) {
            this.page = val;
            this.getArticle(this.label)
        }
    }
}
</script>

<style lang='scss'>
#category {
    // width: 100%;
    margin: 0 auto;
    h2 {
        text-align: center;
        padding: 28px;
        padding-bottom: 30px;
        font-size: 18px;
    }
    .lables{
      display: flex;
      flex-wrap: wrap;
      padding: 0 32px;
      margin-bottom: 24px;
    }
    h3 {
        text-align: center;
        font-size: 18px;
        margin-bottom: 1.5rem;
    }
      .box-card {
    width: 100%;
    margin: 32px 0;
    .content{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding-bottom: 20px;
        border-bottom: 1px solid #f3f3f3;
        margin-bottom: 20px;
        .img{
            width:15.625rem;
            margin-right: 1.875rem;
            border-radius: .5rem;
            overflow: hidden;
            cursor: pointer;
            // transition: all 1s;
            :hover{
                transition: all .3s;
                position: relative;
                top: -0.1875rem;
                left: -0.09375rem;
                box-shadow: 0rem 5px 10px 3px #ccc;
            }
            img{
                width: 100%;
            }
        }
        .text{
            width: 32rem;
            min-height: 14rem;
            position: relative;
            .title{
                display: block;
                margin-bottom: 1.25rem;
            }
            .desc{
                height: 6.25rem;
                font-size: 16px;
            }
            .text-bottom{
                width: 100%;
                position: absolute;
                bottom: 0;
                .creater{
                    margin-bottom: 1rem;
                    display: flex;
                    // justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                    font-size: 14px;
                    i{
                        margin-right: 8px;
                    }
                    span{
                        font-size: 16px;
                        font-weight: bold;
                        margin-left: .5rem;
                        margin-right: .5rem;
                    }
                    img{
                        // display: block;
                        width: 3rem;
                        height: 3rem;
                        border-radius: 50%;
                    }
                    .time{
                        display: block;
                        // flex: 1;
                        // width: 13.5rem;
                    }
                }   
            }

        }
    }
    @media screen and (max-width: 768px) {
        .content{
            .img{
                width: 100%;
                margin-right: 0;
                margin: .8rem;
            }
            .text{
                .text-bottom{
                    position: relative;
                }
            }
        }
    }
  }
}
@media screen and (max-width: 768px) {
    #category{
        width: 100%;
        margin: 0 auto;
    }
}
</style>