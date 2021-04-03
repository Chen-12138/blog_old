<template>
  <div id="music" ref="music">
      <div class="img" ref="img" @click="showControl">
          <img :src="musicInfo.img" alt="图片" ref="img1" :class="playing?'rotate':''">
      </div>
      <div class="main">
          <div class="text">
              <span class="name">{{musicInfo.name}}</span>
              <span class="artist">- {{musicInfo.artist}}</span>
          </div>
          <div class="font">
              <i @click="lastSong" class="iconfont icon-shangyishou"></i>
              <i v-if="playing" @click="changeState" class="el-icon-video-pause"></i>
              <i v-else @click="changeState" class="el-icon-video-play"></i>
              <i @click="nextSong" class="iconfont icon-xiayishou"></i>
          </div>
      </div>
      <audio 
      :src="musicInfo.url"
        ref="audio"
        @ended="audioEnd"
        ></audio>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            // isPlaying: false,
            count: 0,
            id: 1,
            musicInfo: {},
            // 控制显示
            isShow: false
        }
    },
    watch:{
        playing(isPlaying) {
            this.$nextTick(() => {
                const audio = this.$refs.audio;
                if (audio) {
                    isPlaying ? audio.play() : audio.pause()
                }
            })
        }
    },
    computed: {
        ...mapGetters(['playing'])
    },
    async mounted() {
        await this.getMusic();
    },
    methods: {
        async getMusic(){
            const res = await this.$api.getMusic(this.id);
            // console.log(res);
            if(res.code == 200) {
                this.count = res.data.count;
                this.musicInfo = res.data.data;
            }
        },
        async nextSong() {
            this.id+=1;
            if (this.id > this.count) {
                this.id = 1;
            }
            await this.getMusic();
            this.$refs.audio.play()
            this.$store.commit("setPlaying", true);
        },
        async lastSong() {
            this.id-=1;
            if (this.id <= 0) {
                this.id = this.count;
            }
            await this.getMusic();
            this.$store.commit("setPlaying", true);
            this.$refs.audio.play()
        },
        changeState() {
            // this.isPlaying = !this.isPlaying;
            this.$store.commit("setPlaying", !this.playing);
        },
        // 歌曲播放完成回调
        audioEnd() {
            this.nextSong()
        },
        showControl() {
            this.isShow = !this.isShow;
            if(this.isShow){
                this.$refs.music.style.right = '0';
            } else {
                this.$refs.music.style.right = '-150px'
            }
        }
    }
    
}
</script>

<style lang='scss' scoped>
#music{
    position: fixed;
    bottom: 50px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    transition: all 1.2s;
    .img{
        width: 50px;
        height: 50px;
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
        overflow: hidden;
        padding: 5px;
        // margin-right: 15px;
        box-shadow: 0 0 5px #ccc;
        // background-color: rgba($color: #2b2c28, $alpha: 0.6);
        background-color: #2b2c28;
        img{
            border-radius: 50%;
            width: 100%;
            // height: 100%;
        }
    }
    .main{
        height: 100%;
        padding-right: 8px;
        width: 150px;
        // background-color: rgba($color: #2b2c28, $alpha: 0.6);
        background-color: #2b2c28;
        .text{
            margin-bottom: 5px;
            text-align: center;
        }
        .name{
            margin-right: 8px;
            font-size: 14px;
            color: #A6A8B1;
        }
        .artist{
            font-size: 12px;
            color: #666;
        }
    }
    .font{
        i{
            cursor: pointer;
            font-size: 20px;
            margin: 0 6px;
            color: #A6A8B1;
        }
        .el-icon-video-play, .el-icon-video-pause{
            font-size: 22px;
        }
    }
}
@keyframes myRotate {
    0% { transform: rotate(0deg);}
    100% { transform: rotate(360deg);}
}
@-webkit-keyframes myRotate {
    0% { transform: rotate(0deg);}
    100% { transform: rotate(360deg);}
}
// 旋转类
.rotate{
    animation: myRotate 8s infinite linear;
}
</style>