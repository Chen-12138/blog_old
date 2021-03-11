<template>
  <div id="photos">
      <header :style="{color: Color}"> 
      当前位置: <router-link style="cursor:pointer" tag="span" to="/">首页</router-link> > 云相册
      </header>
        <div id="container">
          <div class="card" v-for="(item, index) in PhotoList" :key="index">
            <el-image :src="item.imgsrc"></el-image>
            <p>{{item.content}}</p>
            <p>{{item.datetime}}</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'about',
    data() {
        return {
            PhotoList: []
        }
    },
    computed: {
        Color() {
            return this.$store.state.Color
        }
    },
    mounted() {
        this.getPhotos()
    },
    methods: {
        async getPhotos() {
            try {
                const res = await this.$api.getPhotos()
                if (res.err === 0) {
                    this.$message.success("获取相册成功")
                    this.PhotoList = res.data
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