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
            // console.log(res)
            if (res.code === 200) {
                // let arr = []
                // res.data.forEach(element => {
                //     arr.push(element.category)
                // })
                // this.categoryList = Array.from(new Set(arr))
                this.categoryList = res.data
            } else {
                this.$message.error(res.msg)
            }
            } catch (error) {
            this.$message.error(error)
            }
        },
        // 获取文章标签
        async getTags() {
            try {
            const res = await this.$api.getLabel();
            // console.log(res);
            if (res.code === 200) {
                let arr = []
                res.data.forEach(element => {
                    arr.push(element.label)
                });
                this.tagList = Array.from(new Set(arr))
            } else {
                this.$message.error(res.msg)
            }
            } catch (error) {
            this.$message.error(error)
            }
        },
        // 获取最近文章
        async getRecent() {
            try {
            const res = await this.$api.getRecentArticle()
            // console.log(res)
            this.recentList = res.data
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