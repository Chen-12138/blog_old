<template>
  <div id="Article">
    <el-row :gutter="20">
        <el-col :xs="24" :sm={span:13,offset:3}>
            <Left/>
        </el-col>
        <el-col :xs="0" :sm="6">
            <Right/>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import Left from '../components/ArticleComponents/Left/Left'
import Right from '../components/ArticleComponents/Right/Right'
export default {
    components:{
        Left,
        Right
    },
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {
      // 获取文章
    },

}
</script>

<style lang='scss' scoped>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>