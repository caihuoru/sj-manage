import { AdminLayout, AccountLayout, BlankLayout, } from '@/layouts'

export const asyncRouterMap:any = [
  // {
  //   data: 'mainApp',
  //   path: '/Home',
  //   name: 'Home',
  //   title: 'menu.home',
  //   icon: 'rise_aside_home',
  //   component: () => import('@/views/table/List.vue'),
  //   meta: {
  //     data: 'mainApp',
  //     requireAuth: true
  //   }
  // },
  {
    path: '/',
    name: 'index',
    component: AdminLayout,
    meta: { title: '首页' },
    redirect: '/Report/bbgl_xttjb',
  },
  {
    data: 'MenuBBGL',
    path: '/Report',
    name: 'Report',
    title: 'menu.report-manage',
    icon: 'rise_icon_profit',
    component: AdminLayout,
    meta: {
      requireAuth: true,
      data: 'MenuBBGL',
      title: 'menu.report-manage',
    },
    children: [   
      {
        // 統計信息
        data: 'bbgl_xttjb',
        path: '/Report/bbgl_xttjb',
        name: 'bbgl_xttjb',
        title: 'menu.bbgl_xttjb',
        icon: 'rise_icon_m_all_account',
        component: () => import('@/views/table/List.vue'),
        meta: {
          requireAuth: true,
          data: 'bbgl_xttjb',
          title: 'menu.bbgl_xttjb',
        }
      },
      {
        // 通路損益表
        data: 'bbgl_tlsyb',
        path: '/Report/bbgl_tlsyb',
        name: 'bbgl_tlsyb',
        title: 'menu.bbgl_tlsyb',
        icon: 'rise_icon_m_all_account',
        component: () => import('@/views/table/List.vue'),
        meta: {
          requireAuth: true,
          data: 'bbgl_tlsyb',
          title: 'menu.bbgl_tlsyb',
        }
      },
      {
        // 會員損益表
        data: 'bbgl_hysyb',
        path: '/Report/bbgl_hysyb',
        name: 'bbgl_hysyb',
        title: 'menu.bbgl_hysyb',
        icon: 'rise_icon_m_member_profit',
        component: () => import('@/views/table/List.vue'),
        meta: {
          requireAuth: true,
          data: 'bbgl_hysyb',
          title: 'menu.bbgl_hysyb',
        }
      },
      {
        // 平臺遊戲記錄
        data: 'bbgl_pttzjl',
        path: '/Report/bbgl_pttzjl',
        name: 'bbgl_pttzjl',
        title: 'menu.bbgl_pttzjl',
        icon: 'rise_icon_m_channel_profit',
        component: () => import('@/views/table/List.vue'),
        meta: {
          requireAuth: true,
          data: 'bbgl_pttzjl',
          title: 'menu.bbgl_pttzjl',
        }
      },
      {
        // 平臺轉帳記錄
        data: 'bbgl_ptzzjl',
        path: '/Report/bbgl_ptzzjl',
        name: 'bbgl_ptzzjl',
        title: 'menu.bbgl_ptzzjl',
        icon: 'rise_icon_m_qhsyb',
        component: () => import('@/views/table/List.vue'),
        meta: {
          requireAuth: true,
          data: 'bbgl_ptzzjl',
          title: 'menu.bbgl_ptzzjl',
        }
      },
      {
        // 返水日報表
        data: 'bbgl_hsrbb',
        path: '/Report/bbgl_hsrbb',
        name: 'bbgl_hsrbb',
        title: 'menu.bbgl_hsrbb',
        icon: 'rise_icon_m_qhsyb',
        component: () => import('@/views/table/List.vue'),
        meta: {
          requireAuth: true,
          data: 'bbgl_hsrbb',
          title: 'menu.bbgl_hsrbb',
        }
      },
    ]
  },
  {
    data: 'MenuHYGL',
    path: '/Member',
    name: 'Member',
    icon: 'rise_icon_aside_user',
    title: 'menu.member-manage',
    component: AdminLayout,
    meta: {
      requireAuth: true,
      data: 'MenuHYGL',
      title: 'menu.member-manage',
    },
    children: [
      {
        // 會員總覽
        data: 'hygl_hyzl',
        path: '/Member/hygl_hyzl',
        name: 'hygl_hyzl',
        title: 'menu.all-member-manage',
        icon: 'rise_icon_m_member_all',
        component: () => import('@/views/table/List.vue'),
        meta: {
          requireAuth: true,
          data: 'hygl_hyzl',
          title: 'menu.all-member-manage',
        }
      },
      {
        // 子帳號管理
        data: 'hygl_zzhgl',
        path: '/Member/hygl_zzhgl',
        name: 'hygl_zzhgl',
        title: 'menu.sub-account-manage',
        icon: 'rise_icon_m_subaccount',
        component: () => import('@/views/table/List.vue'),
        meta: {
          requireAuth: true,
          data: 'hygl_zzhgl',
          title: 'menu.sub-account-manage',
        }
      },
      // {
      //   // 遊戲記錄
      //   data: 'hygl_yxjl',
      //   path: '/Member/hygl_yxjl',
      //   name: 'hygl_yxjl',
      //   title: 'menu.hygl_yxjl',
      //   icon: 'rise_icon_m_product_profit',
      //   component: YXJL,
      //   meta: {
      //     requireAuth: true,
      //     data: 'hygl_yxjl'
      //   }
      // },
      {
        // 金流日誌
        data: 'hygl_zjbh',
        path: '/Member/hygl_zjbh',
        name: 'hygl_zjbh',
        title: 'menu.jlrz',
        icon: 'rise_icon_m_all_account',
        component: () => import('@/views/table/List.vue'),
        meta: {
          requireAuth: true,
          data: 'hygl_zjbh',
          title: 'menu.jlrz',
        }
      },
      {
        // 通路活動日誌
        data: 'hygl_tldzrz',
        path: '/Member/channel-action-log',
        name: 'ChannelActionLog',
        title: 'menu.agent-activity-log',
        icon: 'rise_icon_m_channel_active',
        component: () => import('@/views/table/List.vue'),
        meta: {
          requireAuth: true,
          data: 'hygl_tldzrz',
          title: 'menu.agent-activity-log',
        }
      },
      {
        // 會員活動日誌
        data: 'hygl_hydzrz',
        path: '/Member/member-action-log',
        name: 'MemberActionLog',
        title: 'menu.member-activity-log',
        icon: 'rise_icon_m_member_active',
        component: () => import('@/views/table/List.vue'),
        meta: {
          requireAuth: true,
          data: 'hygl_hydzrz',
          title: 'menu.member-activity-log',
        }
      }
    ]
  },
  {
    data: 'MenuXDJK',
    path: '/Monitor',
    name: 'Monitor',
    title: 'menu.order-monitoring',
    icon: 'rise_report2',
    component: AdminLayout,
    meta: {
      requireAuth: true,
      data: 'MenuXDJK',
      title: 'menu.order-monitoring',
    },
    children: [
      {
        // 當前期信息
        data: 'xdjk_dqqxx',
        path: '/Monitor/xdjk_dqqxx',
        name: 'xdjk_dqqxx',
        title: 'menu.xdjk_dqqxx',
        icon: 'rise_icon_m_montior',
        component: () => import('@/views/table/List.vue'),
        meta: {
          requireAuth: true,
          data: 'xdjk_dqqxx',
          title: 'menu.xdjk_dqqxx',
        }
      },
    ]
  },
  {
    data: 'MenuJBXG',
    path: '/JBXG',
    name: 'JBXG',
    title: 'menu.jbxg',
    icon: 'rise_product',
    component: AdminLayout,
    meta: {
      requireAuth: true,
      data: 'MenuJBXG',
      title: 'menu.jbxg',
    },
    children: [
      {
        // 提現管理
        data: 'jbgl_txgl',
        path: '/JBXG/jbgl_txgl',
        name: 'jbgl_txgl',
        title: 'menu.jbgl_txgl',
        icon: 'rise_icon_m_exchange',
        component: () => import('@/views/table/List.vue'),
        meta: {
          requireAuth: true,
          data: 'jbgl_txgl',
          title: 'menu.jbgl_txgl',
        }
      },
      {
        // 充值管理
        data: 'jbgl_czgl',
        path: '/JBXG/jbgl_czgl',
        name: 'jbgl_czgl',
        title: 'menu.jbgl_czgl',
        icon: 'rise_icon_m_exchange',
        component: () => import('@/views/table/List.vue'),
        meta: {
          requireAuth: true,
          data: 'jbgl_czgl',
          title: 'menu.jbgl_czgl',
        }
      },
      {
        // 返水記錄
        data: 'jbgl_rebate',
        path: '/JBXG/jbgl_rebate',
        name: 'jbgl_rebate',
        title: 'menu.jbgl_rebate',
        icon: 'rise_icon_m_montior',
        component: () => import('@/views/table/List.vue'),
        meta: {
          requireAuth: true,
          data: 'jbgl_rebate',
          title: 'menu.jbgl_rebate',
        }
      }
    ]
  },
  {
    data: 'MenuQTCZ',
    path: '/Other',
    name: 'Other',
    title: 'menu.other-operations',
    icon: 'rise_prompt4',
    component: AdminLayout,
    meta: {
      data: 'MenuQTCZ',
      requireAuth: true,
      title: 'menu.other-operations',
    },
    children: [    
      // 我的訊息
      {
        data: 'qtcz_wdxx',
        path: '/Other/qtcz_wdxx',
        name: 'qtcz_wdxx',
        title: 'menu.qtcz_wdxx',
        icon: 'rise_icon_m_change_password',
        component: () => import('@/views/table/List.vue'),
        meta: {
          data: 'qtcz_wdxx',
          requireAuth: true,
          title: 'menu.qtcz_wdxx',
        }
      },
      // 變更密碼
      {
        data: 'qtcz_bgmm',
        path: '/Other/change-password',
        name: 'ChangePassword',
        title: 'menu.change-password',
        icon: 'rise_icon_m_change_password',
        component: () => import('@/views/table/List.vue'),
        meta: {
          data: 'qtcz_bgmm',
          requireAuth: true,
          title: 'menu.change-password',
        }
      },
    ]
  },
  {
    data: 'MenuXTSZ',
    path: '/System',
    name: 'System',
    title: 'menu.system-setting',
    icon: 'rise_product1',
    component: AdminLayout,
    meta: {
      data: 'MenuXTSZ',
      requireAuth: true,
      title: 'menu.system-setting',
    },
    children: [
      {
        // 通道管理
        data: 'xtsz_tdgl',
        path: '/System/xtsz_tdgl',
        name: 'xtsz_tdgl',
        title: 'menu.xtsz_tdgl',
        component: () => import('@/views/table/List.vue'),
        meta: {
          data: 'xtsz_tdgl',
          requireAuth: true,
          title: 'menu.xtsz_tdgl',
        }
      },
      {
        // 我的公告
        data: 'xtsz_xtgg',
        path: '/Other/my-noticw',
        name: 'MyNotice',
        title: 'menu.my-notices',
        icon: 'rise_icon_my_notice',
        component: () => import('@/views/table/List.vue'),
        meta: {
          data: 'xtsz_xtgg',
          requireAuth: true,
          title: 'menu.my-notices',
        }
      },
      {
        // 房间管理
        data: 'xtsz_hjgl',
        path: '/Other/xtsz_hjgl',
        name: 'xtsz_hjgl',
        title: 'menu.xtsz_hjgl',
        icon: 'rise_icon_my_notice',
        component: () => import('@/views/table/List.vue'),
        meta: {
          data: 'xtsz_hjgl',
          requireAuth: true,
          title: 'menu.xtsz_hjgl',
        }
      },
      {
        // 即時消息
        data: 'xtsz_jsxx',
        path: '/Other/Instant',
        name: 'Instant',
        title: 'menu.xtsz_jsxx',
        icon: 'rise_icon_my_notice',
        component: () => import('@/views/table/List.vue'),
        meta: {
          data: 'xtsz_jsxx',
          requireAuth: true,
          title: 'menu.xtsz_jsxx',
        }
      },
    ]
  },
  {
    data: 'MenuPTGL',
    path: '/platform',
    name: 'Platform',
    title: 'menu.platform-manage',
    icon: 'rise_product1',
    component: AdminLayout,
    meta: {
      data: 'MenuPTGL',
      requireAuth: true,
      title: 'menu.platform-manage',
    },
    children: [
      {
        // 平臺列表
        data: 'ptgl_list',
        path: '/platform/ptgl_list',
        name: 'ptgl_list',
        title: 'menu.ptgl_list',
        icon: 'rise_icon_m_channel_profit',
        component: () => import('@/views/table/List.vue'),
        meta: {
          requireAuth: true,
          data: 'ptgl_list',
          title: 'menu.ptgl_list',
        }
      },
      {
        // 平臺管理
        data: 'ptgl_setting',
        path: '/platform/ptgl_setting',
        name: 'ptgl_setting',
        title: 'menu.ptgl_setting',
        icon: 'rise_icon_m_channel_profit',
        component: () => import('@/views/table/List.vue'),
        meta: {
          requireAuth: true,
          data: 'ptgl_setting',
          title: 'menu.ptgl_setting',
        }
      },
      {
        // 遊戲列表
        data: 'ptgl_games',
        path: '/platform/ptgl_games',
        name: 'ptgl_games',
        title: 'menu.ptgl_games',
        icon: 'rise_icon_m_channel_profit',
        component: () => import('@/views/table/List.vue'),
        meta: {
          requireAuth: true,
          data: 'ptgl_games',
          title: 'menu.ptgl_games',
        }
      },
    
    ]
  },
  {
    name: 'test',
    path: '/test',
    component: () => import('@/views/table/List.vue'),
    meta: {
      requireAuth: false
    }
  },
  {
    name: 'none',
    path: '/none',
    component: () => import('@/views/table/List.vue'),
    meta: {
      requireAuth: true
    }
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