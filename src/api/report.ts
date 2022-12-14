import { post } from '@/plugins/axios'
// 獲取
export const getUserLogs = (data:any) => {
    return post('/ag/report/userLogs', data, {})
}