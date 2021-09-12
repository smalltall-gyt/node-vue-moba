<template>
  <div class="admin-edit-container">
    <h1 class="title">{{$route.params.id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="80px" @submit.native.prevent="handleSubmit">
      <el-form-item label="账号">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit" type="primary">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAdminById, addAdmin, updateAdmin } from '@/api/adminApi'

export default {
  data () {
    return {
      model: {
        username: '',
        password: ''
      },
      isEdit: this.$route.params.id ? true : false
    }
  },
  created () {
    this.$route.params.id && this.fetchAdminData()
  },
  methods: {
    async handleSubmit () {
      let res = null
      if (this.isEdit) {
        // 说明是修改
        res = await updateAdmin(this.$route.params.id, this.model)
      } else {
        // 说明是新增
        res = await addAdmin (this.model)
      }
      if (res.status === 200) {
        this.model = {
          username: '',
          password: ''
        }
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.$router.push('/admin/list')
      }
    },
    async fetchAdminData () {
      const res = await getAdminById(this.$route.params.id)
      this.model = Object.assign({}, this.model, res.data)
    }
  },
  watch: {
    $route () {
      this.model = {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .admin-edit-container {
    h1.title {
      margin-bottom: 30px;
    }
    .el-input {
      width: 300px;
    }
  }
</style>
