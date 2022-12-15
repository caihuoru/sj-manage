import { post } from '@/plugins/axios'
// 獲取統計
export const getStatistics = (data: any) => {
    return post('/ag/app/statistics', data, {})
}
// 獲取用戶統計
export const getUserSum = (data: any) => {
    return post('/ag/report/userSum', data, {})
}
// 獲取在綫用戶統計
export const getuserOnline = (data: any) => {
    return post('/ag/report/userOnline', data, {})
}