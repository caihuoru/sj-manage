import { post } from '@/plugins/axios'
// 添加公告
export const addNotice = (data:any) => {
    return post('/ag/notice/add', data, {})
}
// 修改公告
export const modifyNotice = (data:any) => {
    return post('ag/notice/modify', data, {})
}
// 公告列表
export const noticeList = (data:any) => {
    return post('/ag/notice/list', data, {})
}
// 刪除公告
export const delNotice = (data:any) => {
    return post('/ag/notice/del', data, {})
}