<template>
  <div id="Header" class="shadow">
    <el-row class="row">
      <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="2">
        <LogoContent/>
      </el-col>
      <el-col :xs="0" :sm="10">
        <TabbarLink/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LogoContent from './HeaderComponents/LogoContent'
import TabbarLink from './HeaderComponents/TabbarLink'
export default {
    name: 'Header',
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

<style lang='scss' scoped>
.shadow {background-color: #FFFFFF;box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);}

#Header{
  height: 50px;
  border-bottom: 1px solid #f3f3f3;
  // background-color: #161616;
  // margin-bottom: 20px;
  .row{
    display: flex;
    justify-content: space-between;
  }
}
</style>