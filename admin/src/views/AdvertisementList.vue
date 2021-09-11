<template>
  <div class="category-list-container">
     <el-table
      :data="adList"
      style="width: 100%">
      <el-table-column
        prop="_id"
        label="id"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="广告位名"
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
import { getAd, deleteAd } from '@/api/adApi'

export default {
  created () {
    this.getData()
  },
  data () {
    return {
      adList: []
    }
  },
  methods: {
    async getData () {
      const res = await getAd()
      this.adList = res.data
    },
    handleEdit (index) {
      this.$router.push(`/advertisement/edit/${this.adList[index]._id}`)
    },
    handleDelete (index) {
      this.$confirm(`此操作将永久删除分类"${this.adList[index].name}", 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送请求
        await deleteAd(this.adList[index]._id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.adList = this.adList.filter((item) => {
          return item._id !== this.adList[index]._id
        })
      }).catch(() => {})
    }
  }
}
</script>

<style>

</style>
