<template>
  <div id="Logined">
      <img src="../../assets/images/logined.gif" alt="你已经登陆过啦！">
      <p :style="{color: Color}">你已经登陆过了，如果需要可以先去退出登录！</p>
  </div>
</template>
<script>
  export default {
    name:'logined',
    props:{},
    data () {
      return {

      };
    },
    computed: {
      Color() {
        return this.$store.state.Color
      }
    }
  }

</script>
<style lang="scss" scoped>
#Logined {
    padding-top: 10rem;
    text-align: center;
    img {
      margin-bottom: 1rem;
    }
    p {
      // font-weight: bold;
    }
}
@media screen and(max-width:992px) {
  #Logined {
    padding-top: 5rem;
  }
}
</style>