<template>
  <div id="Header" class="shadow">
    <el-row class="row">
      <el-col :xs="24" :sm="22" :md="4" :lg="4">
        <LogoContent/>
      </el-col>
      <el-col :xs="0" :sm="0" :md="14" :lg="10">
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

<style lang='scss'>
.shadow {background-color: #FFFFFF;box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);}

#Header{
  height: 3.125rem;
  border-bottom: 1px solid #f3f3f3;
  // background-color: #161616;
  // margin-bottom: 20px;
  .row{
    display: flex;
    justify-content: space-between;
  }
}

@media only screen and (min-width: 992px) {
  .el-col-md-14{
    display: block;
  }
}
</style>