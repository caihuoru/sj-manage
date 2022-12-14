/*
 * @Descripttion: 
 * @version: 0.0.1
 * @Author: Jvan
 * @Date: 2020-05-15 09:26:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-12 11:51:00
 */ 

import { Vue, Component } from 'vue-property-decorator';
declare module 'vue/types/vue' {
    interface Vue {
        UserQualitys: any;
        accountType: any;
        noticeType: any;
        getAccountType(type:string): void;
        getNoticeType(type:string): void
    }
}
@Component
export default class Global extends Vue {
    UserQualitys = {
        '2': { value: 2, label: "優質", color: 'green' },
        '1': { value: 1, label: "良好", color: 'rgb(28, 255, 2)' },
        '0': { value: 0, label: "普通", color: '' },
        '-1': { value: -1, label: "警告", color: 'yellow' },
        '-2': { value: -2, label: "危險", color: 'red' },
    }
    accountType = {
        '1': { key: 1, value: '會員' },
        '2': { key: 2, value: '代理' },
        '3': { key: 3, value: '所有人' }
    }
    noticeType = {
        '1': { key: 1, value: '系統公告' },
        '2': { key: 2, value: '活動公告' },
        '3': { key: 3, value: '游戲公告' },
        '999': { key: 999, value: '關鍵公告' }
    }
    getAccountType (type: string) {
        return this.accountType[type].value || ''
    }
    getNoticeType (type: string){
        return this.noticeType[type].value || ''
    }
}