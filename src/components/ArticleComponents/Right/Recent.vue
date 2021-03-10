<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span><i class="iconfont icon-wenzhang"></i> 最近文章</span>
    <el-button style="float: right; padding: 3px 0" type="text">more</el-button>
  </div>
  <div
    class="ItemList"
    v-for="(item, index) in recentList"
    @click="timeArticle(item.article_id)"
    :key="index"
    :title="item.title"
  >
    <span class="left">
      {{item.title}}
    </span>
    <span>
      <!-- <Icon type="ios-clock-outline" /> -->
      {{item.time | dateFilter}}
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

      }
    },
    filters: {
      dateFilter(V) {
        return moment(V).format("YYYY-MM-DD");
      }
    },
}
</script>

<style lang='scss'>
.box-card {
    width: 100%;
    margin-bottom: 20px;
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
        color: purple;
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