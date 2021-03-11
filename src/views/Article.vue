<template>
  <div id="Article">
    <el-row :gutter="22" style="width:100%">
        <el-col :xs="24" :sm={span:12,offset:1} :md={span:12,offset:2} :lg={span:11,offset:3}>
            <Left/>
        </el-col>
        <el-col :xs="0" :sm="10" :md="7" :lg="6">
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

}
</script>

<style lang='scss' scoped>
@media screen and (max-width: 768px) {
  #Article{
    width: 100vw;
    overflow: hidden;
  }
}
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