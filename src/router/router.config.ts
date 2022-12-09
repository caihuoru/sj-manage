import { RouteView,AccountLayout,AdminLayout , BlankLayout, } from '@/layouts'

export const asyncRouterMap = [
    // {
    //     path: '/',
    //     name: 'index',
    //     component: AdminLayout,
    //     meta: { title: '首页' },
    //     redirect: '/dashboard/workplace',
    //     children: []
    // },
    {
        path: '/',
        name: 'index',
        component: AdminLayout,
        meta: { title: '接口管理' },
        redirect: '/dashboard/workplace',
        children: [
            // dashboard
            {
                path: '/dashboard',
                name: 'dashboard',
                redirect: '/dashboard/workplace',
                component: RouteView,
                meta: { title: '接口管理', keepAlive: true, permission: [ 'dashboard' ] },
                children: [
                    {
                        path: '/dashboard/analysis',
                        name: 'Analysis',
                        component: () => import('@/views/dashboard/demo.vue'),
                        meta: { title: 'API游戲管理', keepAlive: false, permission: [ 'dashboard' ] }
                    },
                    {
                        path: '/dashboard/workplace',
                        name: 'Workplace',
                        component: () => import('@/views/dashboard/monitor.vue'),
                        meta: { title: 'API熱門游戲廳管理', keepAlive: true, permission: [ 'dashboard' ] }
                    },
                    {
                        path: '/dashboard/table-list',
                        name: 'able-list',
                        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
                        component: () => import('@/views/table/List.vue'),
                        meta: { title: '手機游戲分類圖標', keepAlive: true, permission: ['table'] }
                    },
                    {
                        path: '/dashboard/table-list1',
                        name: 'able-list1',
                        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
                        component: () => import('@/views/table/List.vue'),
                        meta: { title: '電子-棋牌游戲管理', keepAlive: true, permission: ['table'] }
                      },
                ]
            },
        ]
    },
    {
        path: '*', redirect: '/account/login', hidden: true
    }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap:any = [
    {
        path: '/account',
        component: AccountLayout,
        hidden: true,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import(/* webpackChunkName: "user" */ '@/views/account/login/login.vue')
            },
        ]
    },

    {
        path: '/404',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/404.vue')
    },
    ...asyncRouterMap

]

// constantRouterMap.push(asyncRouterMap)