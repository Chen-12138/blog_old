<template>
  <div id="left" class="shadow">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span><i class="iconfont icon-wenzhang"></i>文章列表</span>
            <span style="float:right">共{{count}}篇</span>
        </div>
        <div class="content" v-for="(item,index) in List" :key="item.id">
            <div class="img">
                <img :src="item.article_img" @click="detailPage(item.article_id)" alt="图片">
            </div>   
            <div class="text">
                <h2 class="title"><i class="iconfont icon-biezhen"></i> {{item.title}}</h2>
                <p class="desc"><span style="font-size:16px;font-weight:bold">文章简介：</span>{{item.article_brief}}</p>
                <div class="text-bottom">
                    <div class="creater">
                        <img 
                        src="http://localhost:3000/images/24c086f340a40b49ed53d02f6416b0b4.jpg" 
                        alt="">
                        <span class="name">Heartless</span>
                        <span class="time">2021年3月10日13:05:35</span>
                        <span @click="changeLike(item.like_Star, item.id, index)"><i class="iconfont icon-dianzan"></i>{{item.like_Star}}</span>
                        <span><i class="iconfont icon-pinglun"></i>{{item.accessPulish_count}}</span>
                        <span><i class="iconfont icon-zhiboguankanshu"></i>{{item.visited}}</span>
                    </div>
                    <div class="tag">
                        <el-tag><i class="iconfont icon-biaoqian" style="font-size:.8rem;margin-right:.5rem;"></i>{{item.lable}}</el-tag>
                    </div>
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
            pageSize: 3,
            // 点赞数量数组
            likes: []
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
                    this.List.map((item) => {
                        this.likes.push(item.like_Star)
                    })
                }
            } catch (error) {
                this.$message.error(error)
            }
        },
        // 点赞
        async changeLike(like_Star, id, index) {
            try {
                if (localStorage.getItem('username')) {
                    if (localStorage.getItem(`like${id}`)) {
                        this.$message.error("你已经为这篇文章点过赞了噢~o(*￣▽￣*)o")
                    } else {
                        localStorage.setItem(`like${id}`, id)
                        this.List.forEach(async (item) => {
                            if(item.id == id) {
                                item.like_Star +=1;
                                const res = await this.$api.getLike({
                                    likestar: item.like_Star,
                                    id: id
                                })
                                if (res.err === 0) {
                                    this.$message.success("你为这篇文章增加了一个star谢谢你的支持鸭！(●ˇ∀ˇ●)")
                                } else {
                                    this.$message.error("网络好像有点差劲呢！小主稍后再来咱们不急！(ノへ￣、)")
                                }
                            }
                        })
                    }
                } else {
                    this.$message.error("请先去登陆再来点赞噢小主！(ノへ￣、)")
                }
            } catch (error) {
                this.$message.error(error)
            }
            
        }
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
            overflow: hidden;
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
            width: 500px;
            position: relative;
            .title{
                display: block;
                margin-bottom: 20px;
            }
            .desc{
                height: 100px;
                font-size: 16px;
            }
            .text-bottom{
                width: 100%;
                position: absolute;
                bottom: 0;
                .creater{
                    margin-bottom: 1rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                    span{
                        font-size: 14px;
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
                        width: 200px;
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
    #left{
        width: 100%;
        margin: 1rem;
    }
}
.paginationWrap{
    
    .pagination{
        float: right;
        margin-bottom: 1rem;
    }

}

</style>