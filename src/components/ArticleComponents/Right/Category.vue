<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span><i class="iconfont icon-fenlei"></i> 文章分类</span>
    <el-button style="float: right; padding: 3px 0" type="text">more</el-button>
  </div>
  <div class="wrap">
    <div v-for="(item, index) in categoryList" :key="index" style="margin-right:1rem" @click="emitToLeft(item.article_categroy)">
      <el-badge :value="item['COUNT(article_categroy)']" class="item" :type="categroyColor[index]">
        <el-button size="small">{{item.article_categroy}}</el-button>
      </el-badge>
    </div>
  </div>

</el-card>
</template>

<script>
import eventBus from '../../../utils/eventBus'
export default {
    name: 'Category',
    props: {
      categoryList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        categroyColor: [
          "primary",
          "success",
          "warning",
          "danger",
          "primary",
          "info",
          "primary",
          "success",
          "warning",
          "danger",
          "primary",
          "info",
        ],
        List: []
      }
    },
    methods: {
      // 点击分类显示文章
      async handleClick(label) {
        const res = await this.$api.getLableInfo(label)
        if (res.err === 0) {
          this.List = res.message
          this.$message.success('为您查找到左侧内容!')
        } else {
          this.$message.error(res.message)
        }
      },
      async emitToLeft(label) {
          await this.handleClick(label)
          eventBus.$emit('eventFromRight', this.List)
      }
    }
}
</script>

<style lang='scss'>
.box-card {
    width: 100%;
    margin-bottom: 1.25rem;
    .wrap{
      display: flex;
      flex-wrap: wrap;
    }
}
</style>