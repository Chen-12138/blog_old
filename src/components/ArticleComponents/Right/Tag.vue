<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span><i class="iconfont icon-biaoqian"></i> 文章标签</span>
    <el-button style="float: right; padding: 3px 0" type="text">more</el-button>
  </div>
  <div class="wrap">
    <div v-for="(item, index) in tagList" :key="index" style="margin-right:1rem">
      <el-tag class="tag" @click="emitToLeft(item.lable)">{{item.lable}}</el-tag>
    </div>
  </div>
</el-card>
</template>

<script>
import eventBus from '../../../utils/eventBus'
export default {
    name: 'Tag',
    props: {
      tagList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        bgColor: [
          "magenta",
          "blue",
          "red",
          "cyan",
          "volcano",
          "yellow",
          "magenta",
          "blue",
          "red",
          "cyan",
          "volcano",
          "yellow"
        ],
        List: []
      }
    },
    methods: {
      // 点击分类显示文章
      async handleClick(category) {
        const res = await this.$api.getCategorynIfo(category)
        if (res.err === 0) {
          this.List = res.message
          this.$message.success('为您查找到左侧内容!')
        } else {
          this.$message.error(res.message)
        }
      },
      // 传值给Left
      async emitToLeft(category) {
          await this.handleClick(category)
          eventBus.$emit('eventFromRight', this.List)
      }
    }
}
</script>

<style lang='scss'>
.el-card__body{
  padding: 10px;
}
.box-card {
    width: 100%;
    margin-bottom: 20px;
    .wrap{
      display: flex;
      .tag{
        padding: 0 16px;
        cursor: pointer;
        margin-bottom: .5rem;
        // opacity: .6;
      }
    }
}
</style>