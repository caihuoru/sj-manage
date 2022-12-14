
import { post } from '@/plugins/axios'
// 獲取公告


export const getPlatformSetList = (data:any) => {
    return post('/ag/game/apis', data, {})
}

/**全部列表
 * @description: 
 * @param {*} data
 * @return {*}
 */
export const getAllGameList = (data:any)=>{
	return post('/ag/game/list', data, {})
}



/**修改遊戲
 * @description: 
 * @param {*} data
 * @return {*}
 */
 export const changeGame = (data:any)=>{
	return post('ag/game/modify',data,{})
}