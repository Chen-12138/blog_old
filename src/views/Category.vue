<template>
  <div id="category">
      <h2>~点击已存在的标签搜索对应的内容</h2>
      <div class="lables">
        <div v-for="(item, index) in tagList" :key="index" style="margin-right:1rem; margin-bottom:.8rem; margin-left:1rem">
            <el-tag class="tag" @click="getArticle(item)">{{item}}</el-tag>
        </div>
      </div>
      <h3>以下为搜索结果~~~</h3>
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
                        <span class="time">{{item.time | timeFilter}}</span>
                        <div>
                            <span @click="changeLike(item.like_Star, item.id, index)"><i class="iconfont icon-dianzan"></i>{{item.like_Star}}</span>
                            <span><i class="iconfont icon-pinglun"></i>{{item.accessPulish_count}}</span>
                            <span><i class="iconfont icon-zhiboguankanshu"></i>{{item.visited}}</span>
                        </div>

                    </div>
                    <div class="tag">
                        <el-tag><i class="iconfont icon-biaoqian" style="font-size:.8rem;margin-right:.5rem;"></i>{{item.lable}}</el-tag>
                    </div>
                </div>
            </div>
        </div>
        <div class="paginationWrap">
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
            // 文章列表
            List: [],
        }
    },
    mounted() {
        this.getTags()
    },
    methods: {
        // 获取文章标签
        async getTags() {
            try {
                const res = await this.$api.getLable()
            if (res.err === 0) {
                let arr = []
                res.message.forEach(element => {
                    arr.push(element.lable)
                });
                this.tagList = new Set(arr)
            } else {
                this.$message.error(res.message)
            }
            } catch (error) {
                this.$message.error(error)
            }
        },
        async getArticle(item) {
            try {
                const res = await this.$api.getLableInfo(item)
                if (res.err == 0) {
                    this.$message.success('为您找到以下内容喔~');
                    this.List = res.message
                    this.count = res.message.length
                } else {
                    this.$message.error('您的网络不太好呢，请刷新后重试~')
                }
            } catch (error) {
                this.$message.error(error)
            }
        }
    },
    filters:{
      timeFilter(V) {
        return V.toString().slice(0,10)
      }
    },
}
</script>

<style lang='scss'>
#category {
    width: 100%;
    margin: 0 auto;
    h2 {
        text-align: center;
        padding: 2rem;
        font-size: 20px;
    }
    .lables{
      display: flex;
      flex-wrap: wrap;
      padding: 0 2rem;
      margin-bottom: 1.5rem;
    }
    h3 {
        text-align: center;
        margin-bottom: 1.5rem;
    }
      .box-card {
    width: 100%;
    margin: 2rem 0;
    .content{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding-bottom: 1.25rem;
        border-bottom: 1px solid #f3f3f3;
        margin-bottom: 1.25rem;
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
                        width: 13.5rem;
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
        width: 95%;
        margin: 0 auto;
    }
}
</style>