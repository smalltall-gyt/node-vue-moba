<template>
  <div class="hero-edit-container">
    <h1 class="title">{{$route.params.id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="80px" @submit.native.prevent="submit">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基础信息" name="base">
          <el-form-item label="英雄名称">
        <el-input v-model="heroName"></el-input>
      </el-form-item>
      <el-form-item label="英雄称号">
        <el-input v-model="heroTitle"></el-input>
      </el-form-item>
      <el-form-item label="英雄分类">
        <el-select v-model="categories" multiple placeholder="请选择" :clearable="true">
          <el-option
            v-for="item in categoriesOptions"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="难度" class="el-form-item-difficult">
        <el-rate v-model="scores.difficult" :max="10" :show-score="true"></el-rate>
      </el-form-item>
      <el-form-item label="技能" class="el-form-item-difficult">
        <el-rate v-model="scores.skill" :max="10" :show-score="true"></el-rate>
      </el-form-item>
      <el-form-item label="攻击" class="el-form-item-difficult">
        <el-rate v-model="scores.attack" :max="10" :show-score="true"></el-rate>
      </el-form-item>
      <el-form-item label="生存" class="el-form-item-difficult">
        <el-rate v-model="scores.survive" :max="10" :show-score="true"></el-rate>
      </el-form-item>
      <el-form-item label="顺风出装">
        <el-select v-model="equips1" multiple placeholder="请选择" :clearable="true">
          <el-option
            v-for="item in equipOptions"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="逆风出装">
        <el-select v-model="equips2" multiple placeholder="请选择" :clearable="true">
          <el-option
            v-for="item in equipOptions"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="使用技巧">
        <el-input type="textarea" v-model="usageTips"></el-input>
      </el-form-item>
      <el-form-item label="对抗技巧">
        <el-input type="textarea" v-model="battleTips"></el-input>
      </el-form-item>
      <el-form-item label="团战思路">
        <el-input type="textarea" v-model="teamTips"></el-input>
      </el-form-item>
      <el-form-item label="英雄图标">
        <el-upload
          class="avatar-uploader"
          :action="http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :headers="{Authorization: 'Bearer ' + $store.state.userInfo.user_token}"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button type="text" @click="addSkills"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" class="el-row-flex">
            <el-col :md="12" v-for="(item, index) in skills" :key="index" class="el-cols">
              <el-form-item label="技能名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="技能描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item label="操作">
                <el-button type="danger" @click="deleteSkill(index)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item class="submit">
        <el-button type="primary" class="add-btn" native-type="submit">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  addHero,
  getHeroById,
  updateHero,
  getHeroCategories
} from '@/api/heroApi'
import { getEquip } from '@/api/equipApi'
import axios from '@/api/index'

export default {
  data () {
    return {
      heroName: '',
      imageUrl: '',
      heroTitle: '', // 英雄称号
      categories: [], // 当前选中分类
      categoriesOptions: [], // 可选英雄分类
      scores: { // 存储英雄操作难度等
        difficult: 0,
        skill: 0,
        attack: 0,
        survive: 0
      },
      equipOptions: [], // 存储所有的装备
      equips1: [], // 顺风出装
      equips2: [], // 逆风出装
      usageTips: '', // 使用技巧
      battleTips: '', // 对抗技巧
      teamTips: '', // 团战思路
      skills: [], // 技能列表
      http: axios,
      activeName: 'base'
    }
  },
  methods: {
    async submit () {
      try {
        let res = null
        if (this.$route.params.id) {
          res = await updateHero(this.$route.params.id, {
            name: this.heroName,
            icon: this.imageUrl,
            title: this.heroTitle,
            categories: this.categories,
            scores: this.scores,
            equips1: this.equips1,
            equips2: this.equips2,
            usageTips: this.usageTips,
            battleTips: this.battleTips,
            teamTips: this.teamTips,
            skills: this.skills
          })
        } else {
          res = await addHero({
            name: this.heroName,
            icon: this.imageUrl,
            title: this.heroTitle,
            categories: this.categories,
            scores: this.scores,
            equips1: this.equips1,
            equips2: this.equips2,
            usageTips: this.usageTips,
            battleTips: this.battleTips,
            teamTips: this.teamTips,
            skills: this.skills
          })
        }
        console.log(res)
        if (res.status === 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.$router.push('/hero/list')
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getHeroDetail () {
      const data = await getHeroById(this.$route.params.id)
      this.heroName = data.data.name
      this.imageUrl = data.data.icon
      this.scores = data.data.scores
      this.heroTitle = data.data.title
      this.categories = data.data.categories
      this.equips1 = data.data.equips1
      this.equips2 = data.data.equips2
      this.usageTips = data.data.usageTips
      this.battleTips = data.data.battleTips
      this.teamTips = data.data.teamTips
      this.skills = data.data.skills
    },
    // 处理文件上传成功
    handleAvatarSuccess (res, file) {
      this.imageUrl = file.response.url
    },
    // 获取英雄分类
    async fetchHeroCategories () {
      const res = await getHeroCategories()
      this.categoriesOptions = res.data
    },
    // 获取所有装备
    async fetchEquips () {
      const res = await getEquip()
      this.equipOptions = res.data
    },
    // 添加英雄技能
    addSkills () {
      this.skills.push({})
    },
    // 删除英雄技能
    deleteSkill (index) {
      this.$confirm('此操作将永久删除该技能, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.skills.splice(index, 1)
      }).catch(() => {})
    }
  },
  created () {
    this.fetchHeroCategories()
    this.fetchEquips()
    this.$route.params.id && this.getHeroDetail()
  },
  watch: {
    $route () {
      this.heroName = ''
      this.imageUrl = ''
      this.scores = {
        difficult: 0,
        skill: 0,
        attack: 0,
        survive: 0
      }
      this.categories = []
      this.heroTitle = ''
      this.equips1 = []
      this.equips2 = []
      this.usageTips = ''
      this.battleTips = ''
      this.teamTips = ''
      this.skills = []
    }
  }
}
</script>

<style lang="less" scoped>
  .hero-edit-container {
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
  .el-form-item-difficult {
    display: flex;
    align-items: center;
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
