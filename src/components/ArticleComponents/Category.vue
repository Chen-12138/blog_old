<template>
<!-- <el-card class="box-card"> -->
  <!-- <div slot="header" class="clearfix">
    <span><i class="iconfont icon-fenlei"></i> 文章分类</span>
    <el-button style="float: right; padding: 3px 0" type="text">more</el-button>
  </div>
  <div class="wrap">
    <div v-for="(item, index) in categoryList" :key="index" style="margin-right:1rem" @click="handleClick(item.category)">
      <el-badge :value="item['COUNT(category)']" class="item" :type="categroyColor[index]">
        <el-button size="small">{{item.category}}</el-button>
      </el-badge>
    </div>
  </div> -->
  <el-submenu index="6">
      <template slot="title">
      <i class="el-icon-menu"></i>
          <span slot="title">文章分类</span>
      </template>
      <el-menu-item v-for="(item, index) in categoryList" :key="index" 
      @click.native="handleClick(item.category)"
      >{{item.category}}
      <span style="float:right">{{item["COUNT(category)"]}}</span>
      </el-menu-item>
  </el-submenu>
<!-- </el-card> -->
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
    name: 'Category',
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
        List: [],
        // 数量
        count: 0,
        // 页数
        page: 1,
        // 页码大小
        pageSize: 3,
        // 当前点击分类
        category: '',
        // 数组
        categoryList: []
      }
    },
    mounted() {
      this.getCategorys()
    },
    beforeUpdate() {
      // 这里的this是项目vue实例，用that接受，与eventBus的vue区分
      const that = this
      eventBus.$on('eventToCategory', function(val) {
          that.page = val.page
          that.pageSize = val.pageSize
          that.toLeft(that.category)
          // that.pageSize = val.length
      })
    },
    methods: {
      // 获取文章分类
      async getCategorys() {
          try {
          const res = await this.$api.getCategory()
          // console.log(res)
          if (res.code === 200) {
              // let arr = []
              // res.data.forEach(element => {
              //     arr.push(element.category)
              // })
              // this.categoryList = Array.from(new Set(arr))
              this.categoryList = res.data
          } else {
              this.$message.error(res.msg)
          }
          } catch (error) {
          this.$message.error(error)
          }
      },
      // 点击分类显示文章
      async handleClick(category) {
        this.$router.push('/article');
        this.category = category
        this.page = 1
        const res = await this.$api.getCategorynIfo({
          category: this.category,
          page: 1,
          pageSize: this.pageSize
        });
        // console.log(res)
        if (res.code === 200) {
          this.List = res.data.data
          this.count = res.data.count
          this.emitToLeft()
          // this.$message.success('为您查找到左侧内容!')
        } else {
          this.$message.error(res.msg)
        }
      },
      // 左边变化时调用
      async toLeft(category) {
        this.category = category
        const res = await this.$api.getCategorynIfo({
          category: this.category,
          page: this.page,
          pageSize: this.pageSize
        });
        // console.log(res)
        if (res.code === 200) {
          this.List = res.data.data
          this.count = res.data.count
          this.emitToLeft()
          // this.$message.success('为您查找到右侧内容!')
        } else {
          this.$message.error(res.msg)
        }
      },
      async emitToLeft(category) {
          // await this.toLeft(category)
          eventBus.$emit('eventFromCategory', {
            List: this.List,
            count: this.count,
            page: this.page
          })
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
.el-submenu__title:hover{
  background-color: rgba($color: #2b2c28, $alpha: 0.6);
}
.el-submenu .el-menu-item{
  background-color: rgba($color: #2b2c28, $alpha: 0.6);
}
.el-menu-item:focus, .el-menu-item:hover{
    background-color: rgba($color: #2b2c28, $alpha: 0.8);
}
</style>