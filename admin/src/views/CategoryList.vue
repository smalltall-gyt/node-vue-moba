<template>
  <div class="category-list-container">
     <el-table
      :data="categoryList"
      style="width: 100%">
      <el-table-column
        prop="_id"
        label="id"
        >
      </el-table-column>
      <el-table-column
        prop="parent.name"
        label="上级分类"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名"
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
import { getCategory, deleteCategory } from '@/api/api'

export default {
  created () {
    this.getData()
  },
  data () {
    return {
      categoryList: []
    }
  },
  methods: {
    async getData () {
      const res = await getCategory()
      this.categoryList = res.data
      console.log(this.categoryList)
    },
    handleEdit (index) {
      this.$router.push(`/category/edit/${this.categoryList[index]._id}`)
      console.log('修改', index)
    },
    handleDelete (index) {
      this.$confirm(`此操作将永久删除分类"${this.categoryList[index].name}", 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送请求
        await deleteCategory(this.categoryList[index]._id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.categoryList = this.categoryList.filter((item) => {
          return item._id !== this.categoryList[index]._id
        })
      }).catch(() => {})
      console.log('删除', index)
    }
  }
}
</script>

<style>

</style>
