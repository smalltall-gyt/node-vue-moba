export default [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'category/add',
        name: 'addCategory',
        component: () => import('@/views/CategoryEdit.vue')
      },
      {
        path: 'category/list',
        name: 'CategoryList',
        component: () => import('@/views/CategoryList.vue')
      },
      {
        path: 'category/edit/:id',
        name: 'editCategory',
        component: () => import('@/views/CategoryEdit.vue')
      },
      {
        path: 'equip/add',
        name: 'addEquip',
        component: () => import('@/views/EquipEdit.vue')
      },
      {
        path: 'equip/list',
        name: 'equipList',
        component: () => import('@/views/EquipList.vue')
      },
      {
        path: 'equip/edit/:id',
        name: 'editEquip',
        component: () => import('@/views/EquipEdit.vue')
      },
      {
        path: '/hero/list',
        name: 'heroList',
        component: () => import('@/views/HeroList.vue')
      },
      {
        path: '/hero/add',
        name: 'addHero',
        component: () => import('@/views/HeroEdit.vue')
      },
      {
        path: '/hero/edit/:id',
        name: 'editHero',
        component: () => import('@/views/HeroEdit.vue')
      }
    ]
  }
]
