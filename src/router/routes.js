/**
 * 路由配置文件
 */

const RouterView = {
  template: '<router-view />'
}
export default [
  { path: '/', component: () => import('@/views/dashboard/Home.vue') },
  {
    path: '/js',
    component: RouterView,
    children: [
      {
        path: '/js/array',
        component: () => import('@/views/js/Array.vue')
      }
    ]
  }
]