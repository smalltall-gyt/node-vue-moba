const mongoose = require('mongoose')

const heroSchema = mongoose.Schema({
  name: {
    type: String
  },
  icon: {
    type: String
  },
  title: {
    type: String
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  ],
  scores: {
    difficult: { type: Number },
    skill: { type: Number },
    attack: { type: Number},
    survive: { type: Number }
  },
  // 英雄技能
  skills: [
    {
      // 每个值又有多个内容的时候
      icon: {type: String},
      name: {type: String},
      description: {type: String},
      tips: {type: String}
    }
  ],
  // 顺风出装
  equips1: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equip'
  }],
  // 逆风出装
  equips2: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equip'
  }],
  // 使用技巧
  usageTips: {
    type: String
  },
  // 对抗技巧
  battleTips: { type: String },
  // 团战思路
  teamTips: { type: String },
  // 最佳搭档
  partners: [
    {
      hero: { type: mongoose.Schema.Types.ObjectId},
      description: { type: String }
    }
  ]
})
module.exports = mongoose.model('Hero', heroSchema, 'heroes')