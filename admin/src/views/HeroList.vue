<template>
  <div class="hero-list-container">
     <el-table
      :data="heroList"
      style="width: 100%">
      <el-table-column
        prop="_id"
        label="id"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="英雄名称"
        >
      </el-table-column>
      <el-table-column
        prop="title"
        label="英雄称号"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="英雄图标"
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
import { getHero, deleteHero } from '@/api/heroApi'

export default {
  created () {
    this.getData()
  },
  data () {
    return {
      heroList: []
    }
  },
  methods: {
    async getData () {
      const res = await getHero()
      console.log(res)
      this.heroList = res.data
    },
    handleEdit (index) {
      this.$router.push(`/hero/edit/${this.heroList[index]._id}`)
      console.log('修改', index)
    },
    handleDelete (index) {
      this.$confirm(`此操作将永久删除英雄"${this.heroList[index].name}", 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送请求
        await deleteHero(this.heroList[index]._id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.categoryList = this.heroList.filter((item) => {
          return item._id !== this.heroList[index]._id
        })
      }).catch(() => {})
      console.log('删除', index)
    }
  }
}
</script>

<style>

</style>
