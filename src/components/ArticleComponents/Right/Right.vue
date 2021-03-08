<template>
  <div id="right">
      <Search/>
      <Category :categoryList='categoryList'/>
      <Tag :tagList='tagList'/>
      <Recent :recentList='recentList'/>
  </div>
</template>

<script>
import Search from './Search'
import Category from './Category'
import Tag from './Tag'
import Recent from './Recent'
export default {
    components:{
        Search,
        Category,
        Tag,
        Recent
    },
    data() {
        return {
            categoryList: [],
            tagList: [],
            recentList: []
        }
    },
    mounted() {
        this.getCategorys()
        this.getTags()
        this.getRecent()
    },
    methods: {
        // 获取文章分类
        async getCategorys() {
            try {
            const res = await this.$api.getCategory()
            if (res.err === 0) {
                this.categoryList = res.message
            } else {
                this.$message.error(res.message)
            }
            } catch (error) {
            this.$message.error(erro)
            }
        },
        // 获取文章标签
        async getTags() {
            try {
            const res = await this.$api.getLable()
            if (res.err === 0) {
                this.tagList = res.message
            } else {
                this.$message.error(res.message)
            }
            } catch (error) {
            this.$message.error(error)
            }
        },
        // 获取最近文章
        async getRecent() {
            try {
            const res = await this.$api.getTimenoteList()
            this.recentList = res
            } catch (error) {
            this.$message.error(error)
            }
        }
    },
}
</script>

<style>
#right{
    width: 100%;
    margin: 2rem 0;
}
</style>