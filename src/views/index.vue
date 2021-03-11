<template>
  <div id="index">
    <Header v-if="!$route.path.includes('admin')"/>
    <div v-show="!TypeChange" class="moon"></div>
    <div v-show="TypeChange"  class="night"></div>
    <Light @changeBackground="changeBG"/>
    <keep-alive>
      <router-view class="router" :class="{router_content: $route.name !== 'home'}"/>
    </keep-alive>
    <Loading class="LoadingStyle" v-show="$store.state.LoadingShow"/>
    <TabControler/>
  </div>
</template>

<script>
import Header from '../components/Header'
import Light from '../components/highlight/light'
import TabControler from '../components/Tabcontroler'
import Loading from '../components/Loading/Loading'
export default {
  data() {
    return {

    }
  },
  mounted() {
    document.onclick = (e) => {
      if(e.target.className=='menu iconfont icon-caidan') {
        this.$store.commit('updateShow',true)
      }else if(
        e.target.className=='MenuTab' || 
        e.target.tagName.toLowerCase()=='img' || 
        e.target.className=='ivu-list-item' || 
        e.target.className == 'profile'
        ) {
        return
      } else {
        this.$store.commit('updateShow',false)
      }
    }
  },
  methods:{
    changeBG() {
     this.$store.commit('updatefont', !this.$store.state.fontColor)
    }
  },
  computed: {
    TypeChange() {
      return this.$store.state.fontColor
    }
  },
  components:{
    Header,
    Light,
    TabControler,
    Loading
  }

}
</script>

<style lang='scss'>
body,html {
  width: 100%;
  height: 100%;
}
#index {
  display: flex;
  flex-direction: column;
  width: 100%;
  .moon,.night {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
  }
  .night {
    background: url('../assets/images/night.gif') center;
  }
  .moon {
    background: url('../assets/images/light.jpg') center;
  }
  .router_content {
    animation: animate 2s;
  }
  // .active,
  .current {
    position: sticky;
    background: linear-gradient(#333, #456);
    animation: animate 1s;
  }
  @keyframes animate {
    0% { opacity: 0; transform: translateY(-50px);}
    100% { opacity: 1; transform: translateY(0);}
  }
}

</style>