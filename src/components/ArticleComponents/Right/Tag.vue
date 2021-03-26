<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span><i class="iconfont icon-biaoqian"></i> 文章标签</span>
    <el-button style="float: right; padding: 3px 0" type="text">more</el-button>
  </div>
  <div class="wrap">
    <div v-for="(item, index) in tagList" :key="index" style="margin-right:1rem">
      <el-tag class="tag" @click="handleClick(item)">{{item}}</el-tag>
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
        List: [],
        // 总数
        count: 0,
        // 页数
        page: 1,
        // 每页数量
        pageSize: 3,
        // 当前点击标签
        label: ''
      }
    },
    beforeUpdate() {
      // 这里的this是项目vue实例，用that接受，与eventBus的vue区分
      const that = this
      eventBus.$on('eventToTag', function(val) {
          // console.log("tag被触发了")
          that.page = val.page
          that.pageSize = val.pageSize
          that.toLeft(that.label)
          // that.pageSize = val.length
      })
    },
    methods: {
      // 点击分类显示文章
      async handleClick(label) {
        this.label = label
        this.page = 1
        const res = await this.$api.getLableInfo({
          label: this.label,
          page: 1,
          pageSize: this.pageSize
        });
        if (res.code === 200) {
          this.List = res.data.data
          this.count = res.data.count
          this.emitToLeft()
          this.$message.success('为您查找到左侧内容!')
        } else {
          this.$message.error(res.msg)
        }
      },
      // 左边变化时调用
      async toLeft(label) {
        this.label = label
        const res = await this.$api.getLableInfo({
          label: this.label,
          page: this.page,
          pageSize: this.pageSize
        });
        if (res.code === 200) {
          this.List = res.data.data
          this.count = res.data.count
          this.emitToLeft()
          this.$message.success('为您查找到左侧内容!')
        } else {
          this.$message.error(res.msg)
        }
      },
      // 传值给Left
      async emitToLeft(label) {
          eventBus.$emit('eventFromTag',{
            List: this.List,
            count: this.count,
            page: this.page
          })
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