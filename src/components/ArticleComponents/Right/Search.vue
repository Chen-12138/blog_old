<template>
  <div id="search" class="shadow">
      <input v-model="searchValue" type="text">
      <button @click="emitToLeft">search</button>
  </div>
</template>

<script>
import eventBus from '../../../utils/eventBus'
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
                if (res.err === 0) {
                    this.$message.success("为您搜索到左边的内容~")
                    this.searchValue = ''
                    this.searchList = res.message
                } else {
                    this.$message.error(res.message)
                }
            } catch (error) {
                this.$message.error(error)
            }
        },
        async emitToLeft() {
            await this.searchLike()
            eventBus.$emit('eventFromRight', this.searchList)
        }
    }
}
</script>

<style lang="scss">
.shadow {background-color: #FFFFFF;box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);}
#search{
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    input{
        width: 76%;
        height: 2.25rem;
        border: 1px solid #ccc;
        border-right: none;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        padding: 6px 0;
        text-indent: 5px;
        outline: none;
    }
    button{
        cursor: pointer;
        width: 24%;
        border: 1px solid #ccc;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        background: deepskyblue;
        color: white;
        // height: 32px;
        font-size: .875rem;
        outline: none;
    }
}
</style>