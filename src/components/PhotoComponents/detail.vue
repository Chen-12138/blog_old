<template>
  <div id="photos">
      <!-- <header :style="{color: Color}"> 
      当前位置: <router-link style="cursor:pointer" tag="span" to="/">首页</router-link> > 云相册
      </header> -->
        <h2 :style="{color: Color}">相册内容</h2>
        <div id="container">
          <div class="card" v-for="(item, index) in PhotoList" :key="index">
            <el-image :src="item"  :preview-src-list="PhotoList"></el-image>
            <p :style="{color: Color}">{{item.brief}}</p>
            <p :style="{color: Color}">{{item.create_time}}</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'about',
    data() {
        return {
            // 接受传进来的id
            pic_id: '',
            // 获取的数组
            PhotoList: []
        }
    },
    computed: {
        Color() {
            return this.$store.state.Color
        }
    },
    watch: {
        $route(){
            if(this.$route.params.id){
                this.pic_id = this.$route.params.id
                // console.log(this.pic_id)
                this.getPhotos(this.pic_id)
            }
        }
    },
    async mounted() {
        // console.log(this.$route.params.id);
        this.pic_id = this.$route.params.id
        await this.getPhotos(this.pic_id)
    },
    methods: {
        async getPhotos(pic_id) {
            try {
                const res = await this.$api.getPhotoById(pic_id)
                // console.log(res.data.imgsrc)
                if (res.code === 200) {
                    this.PhotoList = JSON.parse(res.data.imgsrc)
                    // console.log(this.PhotoList)
                } else {
                    this.$message.error(error)
                }
            } catch (error) {
                this.$message.error(error)
            }
        }
    }
}
</script>

<style lang='scss'>
#photos {
  width: 96%;
  margin: 0 auto;
  margin-top: 12px;
  border-radius: 4px;
  // border: 1px solid #EBEEF5;
  min-height: 95vh;
  position: relative;
  // z-index: 5;
  transition: all 1s;
  padding-top: 20px;
  h2{
    // margin-top: 20px;
    margin-left: 15px;
    margin-bottom: 25px;
  }
  #container {
    width: 100%;
    height: 100%;
    column-count: 3;
    .card {
      width: 100%;
      background: rgba($color: #fff, $alpha: 0.2);
      overflow: hidden;
      border: 1px solid #ccc;
      break-inside:avoid;
      border-radius: 4px;
      padding: 9px;
      box-shadow: 0 5px 10px 3px #ccc;
      margin-bottom: 8px;
    p:nth-child(2) {
      color:orange;
    }
    p:nth-child(3) {
      text-align: right;
      color: lightgreen;
    }
    p:nth-child(3)::before {
      // content:'From--';
    }
  }
  }
  @media screen and (max-width: 1500px){
      #container {
        column-count: 2;
      }
  }
    @media screen and (max-width: 1200px){
      #container {
        column-count: 2;
      }
  }
    @media screen and (max-width: 900px){
      #container {
        column-count: 2;
      }
  }
  header {
    padding-bottom: 2rem;
    position: relative;
    span:hover {
      color: lightblue;
    }
  }
}
</style>