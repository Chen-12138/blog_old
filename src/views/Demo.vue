<template>
  <div id="demo">
      <h2 :style="{color: Color}">Demo内容</h2>
      <div v-for="(item, index) in demoList" :key="index" class="demoItem">
          <video id="video" controls :poster="item.video_pic" style="width: 100%; object-fit: cover">
              <source :src="item.video_url" type="video/mp4" />
          </video>
          <footer>
              <p :style="{color: Color}">{{item.brief}}</p>
              <span :style="{color: Color}">{{item.create_time | formateDate}}</span>
              <!-- <el-button type="primary" @click="CheckCode(item.code_path)">前往Github观看源码</el-button> -->
          </footer>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="count"
        style="margin-bottom:15px;position:absolute;bottom:10px;right:20px"
        @current-change="handleChange"
        >
      </el-pagination>
  </div>
</template>

<script>
export default {
    name: 'demo',
    data() {
        return {
            demoList: [],
            page: 1,
            pageSize: 6,
            count: 0
        }
    },
    computed: {
      Color() {
            return this.$store.state.Color;
        }
    },
    mounted() {
        this.getDemo(1)
    },
    methods: {
      async getDemo(index) {
          try {
              const res = await this.$api.getDemo(index, this.pageSize);
              // console.log(res)
              if (res.code == 200) {
                  this.demoList = res.data.data
                  this.count = res.data.count
              } else {
                  this.$message.error(res.msg)
              }
          } catch (error) {
              this.$message.error(error)
          }
      },
      PageChange(page) {
          this.getPage(page);
      },
      // CheckCode(path) {
      //     window.location.href = path;
      // },
      handleChange(page) {
        this.page = page
        this.getPage(page)
      }
    }
}
</script>

<style lang='scss'>
#demo {
  width: 96%;
  margin: 0 auto;
  margin-top: 12px;
  border-radius: 4px;
  // border: 1px solid #EBEEF5;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding: 0 10px;
  padding-bottom: 70px;
  background-color: rgba($color: #f2f2f2, $alpha: 0.6);
  // margin-top: 50px;
  h2{
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 25px;
  }
  .demoItem {
    width: 95%;
    margin: 1rem auto;
    // padding: 0.8rem;
    height: 420px;
    // background: rgb(34, 34, 34,.8);
    border-radius: 10px;
    box-shadow:0 0 3px #333;
    position: relative;
    overflow: hidden;
    // color: black;
    #video {
      // border-radius: 10px;
      position: relative;
      width: 100%;
      height: 72%;
      outline: none;
      z-index: 2;
      object-fit:fill
    }
    footer {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0.4rem;
      p {
        font-size: 18px;
        margin-bottom: 5px;
      }
      button {
        position: relative;
        z-index: 5;
        flex:1;
      }
      span {
        // color:lightgreen;
        margin-bottom: 10px;
      }
    }
  }
  .demoItem:hover{
        transition: all .3s;
        position: relative;
        top: -0.1875rem;
        left: -0.09375rem;
        box-shadow: 0rem 5px 10px 3px #ccc;
    }
  @media screen and(max-width: 992px) {
    .demoItem {
      // width: 95%;
      height: 20rem;
    }
  }
  @media screen and(max-width: 568px) {
    .demoItem {
      // width: 100%;
      height: 16rem;
    }
  }
  .page {
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
  }
}
@media screen and(max-width:992px) {
  #demo{
    padding: 1rem 0;
    width: 100%;
    margin: 0;
  }
}
</style>