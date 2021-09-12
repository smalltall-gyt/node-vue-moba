<template>
  <div class="admin-list-container">
    <el-table
      :data="adminList"
      style="width: 100%">
      <el-table-column
        prop="_id"
        label="id"
        >
      </el-table-column>
      <el-table-column
        prop="username"
        label="管理员名称"
        >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index)">删除</el-button>
        </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAdmin, deleteAdmin } from '@/api/adminApi'

export default {
  created () {
    this.getData()
  },
  data () {
    return {
      adminList: []
    }
  },
  methods: {
    async getData () {
      const res = await getAdmin()
      this.adminList = res.data
    },
    handleEdit (index) {
      this.$router.push(`/admin/edit/${this.adminList[index]._id}`)
    },
    handleDelete (index) {
      this.$confirm(`此操作将永久删除分类"${this.adminList[index].name}", 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送请求
        await deleteAdmin(this.adminList[index]._id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.adminList = this.adminList.filter((item) => {
          return item._id !== this.adminList[index]._id
        })
      }).catch(() => {})
    }
  }
}
</script>

<style>

</style>
