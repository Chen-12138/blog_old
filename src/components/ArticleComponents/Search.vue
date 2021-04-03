<template>
  <div id="search">
      <input v-model="searchValue" type="text" v-on:keyup.enter="emitToArticle" placeholder="输入关键词搜索...">
      <i class="el-icon-search" @click="emitToArticle"></i>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
    data() {
        return {
            searchValue: '',
            searchList: []
        }
    },
    methods: {
        /* 防抖 */
        async searchLike() {
            if (!this.searchValue) return this.$message.error("搜索内容不能为空的呀~");
            await this.search()
        },
        // 搜索方法
        async search() {
            try {
                const res = await this.$api.getSearch(this.searchValue)
                if (res.code === 200) {
                    this.$message.success("为您搜索到以下内容~")
                    this.searchValue = ''
                    this.searchList = res.data
                } else {
                    this.$message.error(res.msg)
                }
            } catch (error) {
                this.$message.error(error)
            }
        },
        async emitToArticle() {
            await this.searchLike()
            eventBus.$emit('eventFromSearch', {
                List: this.searchList,
                count: this.searchList.length
            })
        }
    }
}
</script>

<style lang="scss">
.shadow {background-color: #FFFFFF;box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);}
#search{
    display: flex;
    align-items: center;
    position: relative;
    width: 20%;
    // margin-bottom: 20px;
    input{
        width: 100%;
        height: 32px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 20px;
        padding: 6px 0;
        text-indent: 10px;
        outline: none;
    }
    i{
        cursor: pointer;
        font-size: 20px;
        position: absolute;
        right: 16px;
    }
}
</style>