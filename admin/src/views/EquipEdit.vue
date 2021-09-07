<template>
  <div class="equip-edit-container">
    <h1 class="title">{{$route.params.id ? '编辑' : '新建'}}装备</h1>
    <el-form label-width="80px" @submit.native.prevent="submit">
      <el-form-item label="装备名称">
        <el-input v-model="equipName"></el-input>
      </el-form-item>
      <el-form-item label="装备图标">
        <el-upload
          class="avatar-uploader"
          :action="http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item class="submit">
        <el-button type="primary" class="add-btn" native-type="submit">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  addEquip,
  getEquipById,
  updateEquip
} from '@/api/equipApi'
import axios from '@/api/index'

export default {
  data () {
    return {
      equipName: '',
      imageUrl: '',
      http: axios
    }
  },
  methods: {
    async submit () {
      try {
        let res = null
        if (this.$route.params.id) {
          res = await updateEquip(this.$route.params.id, {
            name: this.equipName,
            icon: this.imageUrl
          })
        } else {
          res = await addEquip({
            name: this.equipName,
            icon: this.imageUrl
          })
        }
        if (res.status === 200) {
          this.equipName = ''
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.$router.push('/equip/list')
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getEquipDetail () {
      const data = await getEquipById(this.$route.params.id)
      this.equipName = data.data.name
      this.imageUrl = data.data.icon
    },
    // 处理文件上传成功
    handleAvatarSuccess (res, file) {
      console.log(file)
      this.imageUrl = window.URL.createObjectURL(file.raw)
    }
  },
  created () {
    // this.getAllCategories()
    this.$route.params.id && this.getEquipDetail()
  },
  watch: {
    $route () {
      this.equipName = ''
      this.imageUrl = ''
    }
  }
}
</script>

<style lang="less" scoped>
  .equip-edit-container {
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
  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background-color: #fff;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 88px;
    height: 88px;
    line-height: 88px;
    text-align: center;
  }
  .avatar {
    width: 88px;
    height: 88px;
    display: block;
  }
</style>
