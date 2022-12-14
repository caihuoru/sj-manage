import { post } from '@/plugins/axios'
// 添加消息
export const addMessage = (data:any) => {
    return post('/sys/message/add', data, {})
}