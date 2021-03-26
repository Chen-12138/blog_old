<template>
  <div id="photos">
      <header :style="{color: Color}"> 
      当前位置: <router-link style="cursor:pointer" tag="span" to="/">首页</router-link> > 云相册
      </header>
        <h2>相册内容</h2>
        <div id="container">
          <div class="card" v-for="(item, index) in PhotoList" :key="index">
            <el-image :src="item"></el-image>
            <p>{{item.brief}}</p>
            <p>{{item.create_time}}</p>
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
  width: 90%;
  margin:2rem auto;
  position: relative;
  z-index: 5;
  transition: all 1s;
  h2{
      margin-bottom: 2rem;
  }
  #container {
    width: 100%;
    columns: 5;
    .card {
      width: 100%;
      background: #f2f2f2;
      overflow: hidden;
      position: relative;
      border: 1px solid #ccc;
      break-inside:avoid;
      padding: 0.6rem;
      margin-bottom: .8rem;
    img {
      max-width: 100%;
    }
    p:nth-child(2) {
      color:orange;
    }
    p:nth-child(3) {
      text-align: right;
      color: lightgreen;
    }
    p:nth-child(3)::before {
      content:'From--';
    }
  }
  }
  @media screen and (max-width: 1500px){
      #container {
        columns:4 ;
      }
  }
    @media screen and (max-width: 1200px){
      #container {
        columns:3 ;
      }
  }
    @media screen and (max-width: 900px){
      #container {
        columns:2 ;
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