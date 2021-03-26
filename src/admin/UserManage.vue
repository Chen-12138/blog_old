<template>
  <div class="articleManage">
      <h2>后台用户管理界面</h2>
        <el-table
        :data="tableData"
        style="width: 100%"
        border
        >
        <el-table-column
        label="用户名"
        style="width: 15%"
        width="240">
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="昵称"
        style="width: 15%"
        width="240">
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="邮箱"
        style="width: 20%"
        width="240">
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.email }}@qq.com</span>
        </template>
        </el-table-column>
        <el-table-column
        label="简介"
        style="width: 40%">
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.introduction }}</span>
        </template>
        </el-table-column>
        <el-table-column 
        label="操作"
        style="width: 10%"
        width="180"
        >
        <template slot-scope="scope">
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.username)">删除用户</el-button>
        </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: []
        }
    },
    mounted() {
        this.getUser()
    },
    methods: {
        // 获取用户列表
        async getUser() {
            try {
                const res = await this.$api.getUser()
                if (res.code == 200) {
                    this.tableData = res.data
                } else {
                    this.$message.error(res.msg)
                }
            } catch (error) {
                this.$message.error(error)
            }
        },
        // 删除用户
        async handleDelete(username) {
            const res = await this.$api.deleteUser(username);
            if(res.code == 200){
                this.$message.success(res.msg)
                location.reload();
            } else {
                this.$message.error(res.msg)
            }
        }
    },
}
</script>

<style lang='scss'>
.articleManage {
    padding-top: 5rem;
    padding-right: 15rem;
    position: relative;
    z-index: 99;
    h2 {
        margin-bottom: 1rem;
    }
}
</style>