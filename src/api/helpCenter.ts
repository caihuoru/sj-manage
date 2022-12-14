import { post } from '@/plugins/axios'
// 獲取
export const helpList = (data:any) => {
    return post('/help/list', data, {})
}
// 詳情
export const helpDetail = (data:any) => {
    return post('/help/detail', data, {})
}

// 修改
export const helpModify = (data:any) => {
    return post('/help/modify', data, {})
}