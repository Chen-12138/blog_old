<template>
<el-card id="Contact">
  <div slot="header" class="clearfix">
    <span><i class="iconfont icon-wenzhang"></i> 联系方式</span>
  </div>
  <div class="ItemList">
    <span class="left">
      <img src="https://imgs.bwmelon.com/20190506153933.png" alt="">
    </span>
    <div>
      <p>QQ</p>
      <p>1482409829</p>
    </div>
  </div>
  <div class="ItemList">
    <span class="left">
      <img src="https://imgs.bwmelon.com/20190506153935.png" alt="">
    </span>
    <div>
      <p>邮箱</p>
      <p>1482409829@qq.com</p>
    </div>
  </div>
  <div class="ItemList">
    <span class="left">
      <img src="https://imgs.bwmelon.com/20190506153934.png" alt="">
    </span>
    <div>
      <p>网易云音乐</p>
      <p>你的网易云账号</p>
    </div>
  </div>
</el-card>
</template>

<script>
export default {
    name: 'Blog',
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style lang='scss' scoped>
#Contact {
    width: 100%;
    margin-bottom: 1.25rem;
    background-color: rgba($color: #f2f2f2, $alpha: 0.6);
    i{
      margin-right: 8px;
      font-size: 19px;
    }
    .ItemList {
      padding: 0.8rem 0.5rem;
      color: #555;
      border-bottom: 1px solid #ccc;
      transition: all 0.6s;
      font-size: 13px;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      span {
        font-size: 14px;
        color: black;
        font-weight: bold;
        white-space: nowrap;
      }
      img{
        width: 40px;
        margin-right: 10px;
        transition: all 1s;
      }
      .left{
        img:hover{
          transform: rotate(360deg);
        }
      }
    }
    .ItemList:last-child {
      border-bottom: none;
    }
}
</style>