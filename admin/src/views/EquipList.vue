<template>
  <div class="equip-list-container">
     <el-table
      :data="equipList"
      style="width: 100%">
      <el-table-column
        prop="_id"
        label="id"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="装备名称"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="装备图标"
        >
        <template slot-scope="scope">
          <img :src="scope.row.icon" height="50px" alt="">
        </template>
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
import { getEquip, deleteEquip } from '@/api/equipApi'

export default {
  created () {
    this.getData()
  },
  data () {
    return {
      equipList: []
    }
  },
  methods: {
    async getData () {
      const res = await getEquip()
      console.log(res)
      this.equipList = res.data
    },
    handleEdit (index) {
      this.$router.push(`/equip/edit/${this.equipList[index]._id}`)
      console.log('修改', index)
    },
    handleDelete (index) {
      this.$confirm(`此操作将永久删除分类"${this.equipList[index].name}", 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送请求
        await deleteEquip(this.equipList[index]._id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.categoryList = this.equipList.filter((item) => {
          return item._id !== this.equipList[index]._id
        })
      }).catch(() => {})
      console.log('删除', index)
    }
  }
}
</script>

<style>

</style>
