<template>
  <div id="left" class="shadow">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>文章列表</span>
            <span style="float:right">共100篇</span>
        </div>
        <div class="content">
            <img src="@/assets/images/美女.jpg" alt="美女" class="img">
            <div class="text">
                <span class="title">标题</span>
                <p class="desc">描述</p>
                <div class="tag">
                    <span>标签</span>
                </div>
            </div>
        </div>
        <div class="content">
            <img src="@/assets/images/5.jpg" alt="美女" class="img">
            <div class="text">
                <span class="title">标题</span>
                <p class="desc">描述</p>
                <div class="tag">
                    <span>标签</span>
                </div>
            </div>
        </div>
    </el-card>
  </div>
</template>

<script>
export default {

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
</style>