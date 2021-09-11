<template>
  <div class="category-list-container">
     <el-table
      :data="articleList"
      style="width: 100%">
      <el-table-column
        prop="_id"
        label="id"
        >
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题"
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
import { getArticle, deleteArticle } from '@/api/articleApi'

export default {
  created () {
    this.getData()
  },
  data () {
    return {
      articleList: []
    }
  },
  methods: {
    async getData () {
      const res = await getArticle()
      this.articleList = res.data
    },
    handleEdit (index) {
      this.$router.push(`/article/edit/${this.articleList[index]._id}`)
    },
    handleDelete (index) {
      this.$confirm(`此操作将永久删除分类"${this.articleList[index].title}", 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送请求
        await deleteArticle(this.articleList[index]._id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.articleList = this.articleList.filter((item) => {
          return item._id !== this.articleList[index]._id
        })
      }).catch(() => {})
      console.log('删除', index)
    }
  }
}
</script>

<style>

</style>
