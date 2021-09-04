<template>
  <div class="category-edit-container">
    <h1 class="title">{{$route.params.id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="80px" @submit.native.prevent="submit">
      <el-form-item label="上级分类">
        <el-select v-model="parentId">
          <el-option
            v-for="item in parentCategory"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="categoryName"></el-input>
      </el-form-item>
      <el-form-item class="submit">
        <el-button type="primary" class="add-btn" native-type="submit">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  addCategory,
  getCategoryById,
  updateCategory,
  getCategory
} from '@/api/api'

export default {
  data () {
    return {
      categoryName: '',
      parentId: '',
      parentCategory: []
    }
  },
  methods: {
    async submit () {
      try {
        let res = null
        if (this.$route.params.id) {
          res = await updateCategory(this.$route.params.id, {
            name: this.categoryName,
            parent: this.parentId
          })
        } else {
          res = await addCategory({
            name: this.categoryName,
            parent: this.parentId
          })
        }
        if (res.status === 200) {
          this.categoryName = ''
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.$router.push('/category/list')
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getCategoryDetail () {
      const data = await getCategoryById(this.$route.params.id)
      this.categoryName = data.data.name
      this.parentId = data.data.parent
    },
    async getAllCategories () {
      const res = await getCategory()
      this.parentCategory = res.data
    }
  },
  created () {
    this.getAllCategories()
    this.$route.params.id && this.getCategoryDetail()
  },
  watch: {
    $route () {
      this.categoryName = ''
    }
  }
}
</script>

<style lang="less" scoped>
  .category-edit-container {
    .title {
      margin-bottom: 30px;
    }
    .submit {
      /deep/ .el-form-item__content {
        margin-left: 0 !important;
        text-align: center;
      }
    }
    .add-btn {
      margin: 0 auto;
    }
  }
</style>
