<template>
  <div id="left" class="shadow">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span><i class="iconfont icon-wenzhang"></i>文章列表</span>
            <span style="float:right">共{{count}}篇</span>
        </div>
        <div class="content" v-for="(item) in List" :key="item.id">
            <div class="img">
                <img :src="item.article_img" @click="detailPage(item.article_id)" alt="图片">
            </div>   
            <div class="text">
                <span class="title">{{item.title}}</span>
                <p class="desc">{{item.article_brief}}</p>
                <div class="tag">
                    <span>{{item.lable}}</span>
                </div>
            </div>
        </div>
        <div class="paginationWrap">
            <!-- <span>共 {{count}} 篇</span> -->
            <el-pagination
                class="pagination"
                background
                layout="total, prev, pager, next"
                :page-size='pageSize'
                @current-change='handlePageChange'
                :total="count">
            </el-pagination>
        </div>

    </el-card>
  </div>
</template>

<script>
import eventBus from '../../../utils/eventBus'
export default {
    data() {
        return {
            // 总文章数
            count: 0,
            // 文章列表
            List: [],
            // 每页数量
            pageSize: 3
        }
    },
    mounted() {
        this.PageChange(1)
    },
    beforeUpdate() {
        // 这里的this是项目vue实例，用that接受，与eventBus的vue区分
        const that = this
        eventBus.$on('eventFromRight', function(val) {
            that.List = val || []
            that.count = val.length
            that.pageSize = val.length
        })
    },
    methods: {
        // 跳转详情页
        detailPage(article_id) {
            this.$router.push(`/detail/${article_id}`)
        },
        // 换页的回调
        handlePageChange(val) {
            this.PageChange(val)
        },
        // 获取文章列表
        async PageChange(index) {
            try {
                const res = await this.$api.getArticle(index)
                if (res.err === 0) {
                    this.List = res.message.data
                    this.count = res.message.count
                }
            } catch (error) {
                this.$message.error(error)
            }
        },
    }
}
</script>

<style lang='scss' scoped>
#left{
    width: 100%;
  .box-card {
    width: 100%;
    margin: 2rem 0;
    .content{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding-bottom: 20px;
        border-bottom: 1px solid #f3f3f3;
        margin-bottom: 20px;
        .img{
            width:250px;
            margin-right: 30px;
            border-radius: 8px;
            cursor: pointer;
            // transition: all 1s;
            :hover{
                transition: all .3s;
                position: relative;
                top: -3px;
                left: -1.5px;
                box-shadow: 0px 5px 10px 3px #ccc;
            }
            img{
                width: 100%;
            }
        }
        .text{
            width: 300px;
            .title{
                display: block;
                margin-bottom: 20px;
            }
            .desc{
                height: 100px;
            }

        }
    }
  }
}
.paginationWrap{
    
    .pagination{
        float: right;
        margin-bottom: 1rem;
    }

}

</style>