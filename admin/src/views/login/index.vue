<template>
  <div class="login-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>请先登录</span>
      </div>
      <el-form label-width="60px" @submit.native.prevent="handleSubmit">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from '@/api/loginApi'

export default {
  data () {
    return {
      model: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleSubmit () {
      const res = await login(this.model)
      if (res.status === 200) {
        this.$store.dispatch('userInfo/asyncSetUserToken', res.data.token)
        this.$message({
          type: 'success',
          message: '登录成功'
        })
        console.log(this.$route.query.returnPath)
        this.$router.push(this.$route.query.returnPath || '/')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container {
    .box-card {
      width: 500px;
      margin: 100px auto;
    }
  }
</style>
