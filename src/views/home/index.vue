<template>
  <div class="main-wrap">
    <div class="main-wrap-title">
      今日數據
      <div class="main-wrap-title-tip">
        數據有延遲，實際數據以每日過賬后爲準
      </div>
    </div>
    <div class="main-wrap-statistics">
      <div class="main-wrap-statistics-item">
        <img src="/img/team/team1.png"/>
        <div class="main-wrap-statistics-item-content">
          <div class="main-wrap-statistics-item-name">注冊會員</div>
          <div class="main-wrap-statistics-item-num">{{ statistics.reg_sum }}</div>
        </div>
      </div>
      <div class="main-wrap-statistics-item">
        <img src="/img/team/team2.png"/>
        <div class="main-wrap-statistics-item-content">
          <div class="main-wrap-statistics-item-name">登錄</div>
          <div class="main-wrap-statistics-item-num">{{ statistics.login_sum }}</div>
        </div>
      </div>
      <div class="main-wrap-statistics-item">
        <img src="/img/team/team3.png"/>
        <div class="main-wrap-statistics-item-content">
          <div class="main-wrap-statistics-item-name">總投注</div>
          <div class="main-wrap-statistics-item-num">{{ statistics.bet_sum}}</div>
        </div>
      </div>
      <div class="main-wrap-statistics-item">
        <img src="/img/team/team4.png"/>
        <div class="main-wrap-statistics-item-content">
          <div class="main-wrap-statistics-item-name">總輸贏</div>
          <div class="main-wrap-statistics-item-num">{{ statistics.profit_sum}}</div>
        </div>
        
      </div>
    </div>
    <div class="main-wrap-table">
      <div class="main-wrap-table-header">
        公告
        <a-select v-model="type" class="main-wrap-table-header-select" @change="getNoticeList">
          <a-select-option :value="0">全部</a-select-option>
          <a-select-option :value="item.key" v-for="(item, key) in noticeType" :key="key">{{ item.value }}</a-select-option>
        </a-select>
      </div>
      <div class="main-wrap-table-content">
        <a-table
          class="notice"
          :columns="columns"
          :data-source="noticeList"
          :pagination="pagination"
          :rowKey="(record, index) => { return index }" 
          @change="handleTableChange"
        >
          <span slot="update_at" slot-scope="text, record">
            {{ record.update_at | timeFormate }}
          </span>
          <span slot="type" slot-scope="text, record">
            {{ getNoticeType(record.notice_type) }}
          </span>
        </a-table>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from 'moment'
import { getStatistics } from "@/api/home"
import { noticeList } from "@/api/notice"
// import { noticeType, getNoticeType } from "@/utils/labelFunctionUtil"
import Global from "@/shared/mixins/global";
@Component({
    components: {},
    mixins: [Global],
    filters: {
        timeFormate(value:any) {
            return moment(value * 1000).format("YYYY-MM-DD HH:mm:ss");
        },
    },
})
export default class Home extends Vue {
    dataTypes:any = {
        register: { key: "register", label: this.$t('common.zcrs') },
        login: { key: "login", label: this.$t('common.drrs') },
        recharge: { key: "recharge", label: this.$t('common.recharge') },
        withdraw: { key: "withdraw", label: this.$t('common.withdraw') },
        bet: { key: "bet", label: this.$t('common.bet') },
    }
    columns:Array<any> = [
        {
            title: this.$t('common.publish-time'),
            dataIndex: 'update_at',
            checked: true,
            scopedSlots: { customRender: "update_at" },
            width: 200,
            align: 'center',
        },
        {
            title: this.$t('common.notice-type'),
            dataIndex: 'type',
            checked: true,
            scopedSlots: { customRender: "type" },
            width: 150,
            align: 'center',
        },
        {
            title: this.$t('common.content'),
            dataIndex: 'content',
            checked: true,
            align: 'center',
        }
    ]
    pagination: any = {
        pageNo: 1,
        pageSize: 10, //每页中显示10条数据
        total: 0,
        showQuickJumper: true,
        showTotal: (total:any) => `共 ${total} 条`, // 显示总数
    }
    noticeList: Array<any> = []
    statistics: any = {}
    type = 0
    created() {
        console.log(this.columns)
    }
    mounted() {
        
        this.getNoticeList()
        this.getStatistics()
        
    }
    async getNoticeList() {
        const res = await noticeList({
            page_size: this.pagination.pageSize,
            page: this.pagination.pageNo,
            notice_type: this.type || undefined
        })
        const data = res.data
        console.log(res.data)
        this.noticeList = data.list || []
        this.pagination.total = data.total
    }
    async getStatistics() {
        const res = await getStatistics({ date: 1 })
        console.log(res.data)
        const data = res.data
        this.statistics = { ...data }
    }
    handleTableChange(pagination:any, filters:any, sorter:any) {
        // console.log(pagination)
        this.pagination = { ...this.pagination, pageNo: pagination.current, pageSize: pagination.pageSize };
        this.getNoticeList()
    }
  
};
</script>

<style lang="less" scoped>
@import url("./home");
</style>
