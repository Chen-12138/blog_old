<template>
  <div id="right">
      <Search/>
      <Category/>
      <Tag/>
      <Recent/>
  </div>
</template>

<script>
import Search from './Search'
import Category from './Category'
import Tag from './Tag'
import Recent from './Recent'
export default {
    data() {
        return {

        }
    },
    components:{
        Search,
        Category,
        Tag,
        Recent
    }
}
</script>

<style>
#right{
    width: 100%;
    margin: 2rem 0;
}
</style>