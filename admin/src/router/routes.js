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
      }
    ]
  }
]
