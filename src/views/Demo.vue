<template>
  <div id="demo">
      <div v-for="(item, index) in demoList" :key="index" class="demoItem">
          <video id="video" controls :poster="item.video_pic">
              <source :src="item.video_url" type="video/mp4" />
          </video>
          <footer>
              <p :style="{color: Color}">{{item.desc}}</p>
              <span :style="{color: Color}">{{item.create_time | dateFilter}}</span>
              <el-button type="primary" @click="CheckCode(item.code_path)">查看源码</el-button>
          </footer>
      </div>
      <!-- <el-pagination
        background
        layout="prev, pager, next"
        :page-size="12"
        @current-change="handleChange"
        >
      </el-pagination> -->
  </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'demo',
    data() {
        return {
            demoList: [],
            page: 1,
            pageSize: 6
        }
    },
    filters:{
      dateFilter(val) {
         return moment(val).format('YYYY-MM-DD HH:mm:ss')
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
                console.log(res)
                if (res.code == 200) {
                    this.demoList = res.data.data
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
        CheckCode(path) {
            window.location.href = path;
        },
        handleChange(page) {
            this.getPage(page)
        }
    }
}
</script>

<style lang='scss'>
#demo {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding: 3rem 0;
  .demoItem {
    width: 30%;
    margin: 1rem;
    // padding: 0.8rem;
    height: 22rem;
    // background: rgb(34, 34, 34,.8);
    border-radius: 0.5rem;
    box-shadow:0 0 3px #333;
    position: relative;
    // color: black;
    #video {
      border-radius: 0.5rem;
      position: relative;
      width: 100%;
      height: 66%;
      outline: none;
      z-index: 2;
    }
    footer {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0.4rem;
      p {
        font-size: 16px;
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
  @media screen and(max-width: 955px) {
    .demoItem {
      width: 45%;
      height: 18rem;
    }
  }
  @media screen and(max-width: 568px) {
    .demoItem {
      width: 100%;
      height: 25rem;
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
  }
}
</style>