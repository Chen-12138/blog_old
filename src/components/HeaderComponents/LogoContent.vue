<template>
  <div id="logocontent">
    <div class="logo_name">
      <i class="menu iconfont icon-caidan" @click="showNav"></i>
      <!-- <img v-show="$route.name !== 'home'" src="../../assets/images/logo.jpg" alt /> -->
      <p v-show="$route.name !== 'home'">Heartless</p>
      <i @click="$router.push('/category')" class="search iconfont icon-sousuo"></i>
    </div>
  </div>
</template>
<script>
import eventBus from '../../utils/eventBus'
export default {
  name: "logo",
  data() {
    return {
      isShowNav: false
    }
  },
  methods:{
    showNav() {
      const that = this
      this.isShowNav = !this.isShowNav
      eventBus.$emit('eventFromHeader', that.isShowNav)
    }
  }
};
</script>
<style lang="scss" scoped>
/* @font-face {
  font-family: "../../assets/font/Oh-Chewy-2.ttf";
  src: url("../../assets/font/Oh-Chewy-2.ttf");
} */
#logocontent {
  width: 100%;
  line-height: 52px;
  .logo_name {
    display: flex;
    justify-content: center;
    align-items: center;
    // padding-top: 0.4rem;
    position: relative;
    user-select: none;
    p {
      font-size: 24px;
      // margin-bottom: 2rem;
      font-weight: bold;
      color: #d4d4d4;
      animation: triggerColor 7s infinite alternate;
      font-family: "../../assets/font/Oh-Chewy-2.ttf";
    }
  }
  @media screen and(max-width:1200px) {
    .menu,
    .search {
      color: black;
      display: block !important;
    }
  }
  .menu,
  .search {
    position: absolute;
    font-size: 1.6rem;
    cursor: pointer;
    color: #d4d4d4;
    display: none;
    // top: 1rem;
  }
  .menu {
    left: 2rem;
  }
  .search {
    right: 2rem;
  }
  .menu:hover,
  .search:hover {
    color: rgb(100, 177, 240);
  }
}
</style>