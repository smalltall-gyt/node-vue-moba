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
import { getCategory } from '@/api/api'

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
    },
    handleEdit (index) {
      console.log('修改', index)
    },
    handleDelete (index) {
      console.log('删除', index)
    }
  }
}
</script>

<style>

</style>
