<template>
  <div class="category-edit-container">
    <h1 class="title">新建分类</h1>
    <el-form label-width="80px" @submit.native.prevent="submit">
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
import { addCategory } from '@/api/api'

export default {
  data () {
    return {
      categoryName: ''
    }
  },
  methods: {
    async submit () {
      try {
        const res = await addCategory({
          name: this.categoryName
        })
        console.log(res)
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
