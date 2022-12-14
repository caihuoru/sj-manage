import { post } from '@/plugins/axios'
// 獲取統計
export const getStatistics = (data:any) => {
    return post('/ag/app/statistics', data, {})
}
