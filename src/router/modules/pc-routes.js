export default [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/main/index.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          user: true
        }
      },
      {
        path: '/member',
        name: 'member',
        component: () => import('@/views/member/index.vue'),
        meta: {
          user: true
        }
      }
    ]
  },
  {
    path: '/pins/:id',
    name: 'pins',
    component: () => import('@/views/pins/index.vue')
  },
  {
    path: '/login-register',
    name: 'login-register',
    component: () => import('@/views/login-register/index.vue')
  }
]
