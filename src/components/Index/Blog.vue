<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span><i class="el-icon-coffee"></i>博客信息</span>
  </div>
  <div class="ItemList">
    <span class="left">
      <i class="el-icon-coffee-cup"></i>
      文章总数
    </span>
    <span>
        {{this.count}}
    </span>
  </div>
  <div class="ItemList">
    <span class="left">
      <i class="el-icon-goblet"></i>
      运行天数
    </span>
    <span>
        {{runDays}}天
    </span>
  </div>
</el-card>
</template>

<script>
export default {
    name: 'Blog',
    data() {
      return {
        count: 0,
        runDays: 0
      }
    },
    mounted() {
      this.getCount()
      let now = (new Date()).valueOf();
      let nTime = now - 1617374874293;
      this.runDays = Math.floor(nTime / 86400000);
    },
    methods: {
      // 获取文章数量
      async getCount() {
        const res = await this.$api.getArticleCount();
        // console.log(res)
        if(res.code == 200){
          this.count = res.count
        }
      }
    }
}
</script>

<style lang='scss'>
.box-card {
    width: 100%;
    margin-bottom: 1.25rem;
    background-color: rgba($color: #f2f2f2, $alpha: 0.6);
    i{
      margin-right: 8px;
      font-size: 19px;
    }
    .ItemList {
      padding: 0.8rem 0.5rem;
      cursor: pointer;
      color: #555;
      border-bottom: 1px solid #ccc;
      transition: all 0.6s;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 14px;
        color: black;
        font-weight: bold;
        white-space: nowrap;
      }
      .left {
        display: block;
        width: 68%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .ItemList:hover {
      background: #f2f2f2;
      color: lightgreen;
      padding-left: 0.8rem;
    }
    .ItemList:last-child {
      border-bottom: none;
    }
}
</style>