<template>
  <div id="Header" class="shadow">
    <el-row class="row">
      <el-col :xs="24" :sm="24" :md="24" :lg="5">
        <LogoContent/>
      </el-col>
      <el-col :xs="0" :sm="0" :md="0" :lg="22">
        <TabbarLink v-if="showSome"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LogoContent from './HeaderComponents/LogoContent'
import TabbarLink from './HeaderComponents/TabbarLink'
export default {
    name: 'Header',
    props: {
      showSome:{
        type: Boolean,
        default: true
      }
    },
    data() {
        return {
            
        }
    },
    computed: {
        
    },
    methods: {
        
    },
    mounted() {
        
    },
    components: {
      LogoContent,
      TabbarLink
    }
}
</script>

<style lang='scss'>
.shadow {background-color: #FFFFFF;box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);}

#Header{
  height: 52px;
  border-bottom: 1px solid #f3f3f3;
  background-color: #414753;
  // background-color: rgba($color: #414753, $alpha: 0.8);
  margin: 0 auto;
  width: 1380px;
  position: fixed;
  // margin-bottom: 20px;
  z-index: 2000;
  .row{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}

@media screen and (max-width:1200px) {
  #Header{
    width: 100%;
  }
}

@media only screen and (min-width: 992px) {
  .el-col-lg-22{
    display: block;
  }
  .el-col-md-0{
    display: block;
  }
}
</style>