<template>
  <div id="music">
      <div class="img" ref="img" :class="playing?'rotate':''">
          <img :src="musicInfo.img" alt="" ref="img1" :class="playing?'rotate':''">
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
        }
    }
    
}
</script>

<style lang='scss' scoped>
#music{
    display: flex;
    justify-content: center;
    align-items: center;
    .img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 15px;
        box-shadow: 0 0 5px #ccc;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .main{
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