<template>
  <div class="category-edit-container">
    <h1 class="title">{{$route.params.id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="80px" @submit.native.prevent="submit">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" :multiple="true">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <vue-editor v-model="model.body" useCustomImageHandler
      @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item class="submit">
        <el-button type="primary" class="add-btn" native-type="submit">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  addArticle,
  updateArticle,
  getArticleById,
  uploadImages
} from '@/api/articleApi'
import { getCategory } from '@/api/api'
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    VueEditor
  },
  data () {
    return {
      model: {
        categories: [], // 当前选中的分类
        title: '', // 文章标题
        body: ''
      },
      categories: [] // 存储所有的分类
    }
  },
  methods: {
    async submit () {
      try {
        let res = null
        if (this.$route.params.id) {
          res = await updateArticle(this.$route.params.id, this.model)
        } else {
          res = await addArticle(this.model)
        }
        if (res.status === 200) {
          this.model = {
            categories: [], // 当前选中的分类
            title: '', // 文章标题
            body: ''
          }
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.$router.push('/article/list')
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getArticleDetail () {
      const data = await getArticleById(this.$route.params.id)
      this.model = data.data
    },
    async getAllCategories () {
      const res = await getCategory()
      this.categories = res.data
    },
    // 处理文章编辑时图片上传
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData()
      formData.append('file', file)
      const res = await uploadImages(formData)
      const url = res.data.url
      Editor.insertEmbed(cursorLocation, 'image', url)
      resetUploader()
    }
  },
  created () {
    this.getAllCategories()
    this.$route.params.id && this.getArticleDetail()
  },
  watch: {
    $route () {
      this.model = {
        categories: [], // 当前选中的分类
        title: '', // 文章标题
        body: ''
      }
      this.categories = []
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
