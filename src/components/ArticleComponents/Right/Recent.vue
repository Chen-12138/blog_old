<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span><i class="iconfont icon-wenzhang"></i> 最近文章</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="more">more</el-button>
  </div>
  <div
    class="ItemList"
    v-for="(item, index) in showList"
    @click="handleToDetail(item.article_id)"
    :key="index"
    :title="item.title"
  >
    <span class="left">
      {{item.title}}
    </span>
    <span>
      <!-- <Icon type="ios-clock-outline" /> -->
      {{item.create_time | formateDate}}
    </span>
  </div>
</el-card>
</template>

<script>
import moment from "moment";
export default {
    name: 'Recent',
    props: {
      recentList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        showList: []
      }
    },
    mounted() {
      setTimeout(()=>{
        this.some()
      },200)
    },
    methods: {
      // 截取部分文章
      some() {
        // console.log(this.recentList)
        var storeList = [...this.recentList];
        this.showList = storeList.splice(0,6)
      },
      more() {
        this.showList = this.recentList
      },
      // 跳转详情页
      handleToDetail(article_id) {
        this.$router.push(`/detail/${article_id}`)
      }
    }
}
</script>

<style lang='scss'>
.box-card {
    width: 100%;
    margin-bottom: 1.25rem;
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