<template>
  <div class="ad-edit-container">
    <h1 class="title">{{$route.params.id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="80px" @submit.native.prevent="submit">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="addItems"><i class="el-icon-plus"></i>添加图片</el-button>
        <el-row type="flex" class="el-row-flex">
          <el-col :md="12" v-for="(item, index) in model.items" :key="index" class="el-cols">
            <el-form-item class="el-form-item-difficult" label="链接地址">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item class="el-form-item-difficult" label="图标">
              <el-upload
                class="avatar-uploader"
                :action="http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)"
                :headers="{Authorization: 'Bearer ' + $store.state.userInfo.user_token}"
              >
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item class="el-form-item-difficult" label="操作">
              <el-button type="danger" @click="deleteItem(index)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="submit">
        <el-button type="primary" class="add-btn" native-type="submit">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  addAd,
  updateAd,
  getAdById
} from '@/api/adApi'
import http from '@/api/index'

export default {
  data () {
    return {
      model: {
        items: [] // 存储广告位的图片
      },
      http: http
    }
  },
  methods: {
    async submit () {
      try {
        let res = null
        if (this.$route.params.id) {
          res = await updateAd(this.$route.params.id, this.model)
        } else {
          res = await addAd(this.model)
        }
        if (res.status === 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.$router.push('/advertisement/list')
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getAdDetail () {
      const res = await getAdById(this.$route.params.id)
      this.model = Object.assign({}, this.model, res.data)
    },
    // 删除广告图
    deleteItem (index) {
      this.model.items.splice(index, 1)
    },
    // 添加广告图
    addItems () {
      this.model.items.push({})
    }
  },
  created () {
    this.$route.params.id && this.getAdDetail()
  },
  watch: {
    $route () {
      this.model = {
        items: []
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .ad-edit-container {
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
    width: 200px;
    height: 88px;
    line-height: 88px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 88px;
    display: block;
  }
  .el-form-item-difficult {
    display: flex;
    align-items: center;
    &:nth-of-type(2) {
      margin-top: 20px;
    }
    /deep/ .el-form-item__content {
      margin-left: 0 !important;
    }
  }
  .el-icon-plus {
    margin-right: 5px;
  }
  .el-row-flex {
    flex-wrap: wrap;
    /deep/ .el-col {
      flex-shrink: 0;
      flex-basis: 50%;
    }
  }
  .el-cols {
    margin-bottom: 60px;
  }
</style>
