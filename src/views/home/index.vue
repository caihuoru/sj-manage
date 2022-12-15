<template>
  <div class="main-wrap">
    <div class="main-wrap-title">
      今日數據
      <div class="main-wrap-title-tip">
        數據有延遲，實際數據以每日過賬后爲準
      </div>
    </div>
    <div class="main-wrap-statistics">
      <div class="main-wrap-statistics-item" v-for="(item, key) in statistics" :key="key">
        <img :src="item.bg"/>
        <div class="main-wrap-statistics-item-content">
          <div class="main-wrap-statistics-item-name">{{ item.label }}</div>
          <div class="main-wrap-statistics-item-num">
            <template v-if="loading[item.loading]">
              <a-icon type="loading"/>
            </template>
            <template v-else>
               {{ item.value }}
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="main-wrap-table">
      <div class="main-wrap-table-header">
        公告
        <a-select
          v-model="type"
          class="main-wrap-table-header-select"
          @change="getNoticeList"
        >
          <a-select-option value="">全部</a-select-option>
          <a-select-option
            :value="item.key"
            v-for="(item, key) in noticeType"
            :key="key"
            >{{ item.value }}</a-select-option
          >
        </a-select>
      </div>
      <div class="main-wrap-table-content">
        <a-table
          class="notice"
          :columns="columns"
          :data-source="noticeList"
          :pagination="pagination"
          :rowKey="
            (record, index) => {
              return index;
            }
          "
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
import moment from "moment";
import { getStatistics, getUserSum, getuserOnline } from "@/api/home"
import { noticeList } from "@/api/notice";
import { i18n } from "@/plugins/i18n";
import Global from "@/shared/mixins/global";
@Component({
  components: {},
  mixins: [Global],
  filters: {
    timeFormate(value: any) {
      return moment(value * 1000).format("YYYY-MM-DD HH:mm:ss");
    },
  },
})
export default class Home1 extends Vue {
  loading:any = {
    getStatistics: true,
    getUserSum: true,
    getuserOnline: true
  }
  pagination: any = {
    pageNo: 1,
    pageSize: 10, //每页中显示10条数据
    total: 0,
    showQuickJumper: true,
    showTotal: (total: any) => `共 ${total} 条`, // 显示总数
  };
  dataTypes: any = {
    register: { key: "register", label: i18n.t("common.zcrs") },
    login: { key: "login", label: i18n.t("common.drrs") },
    recharge: { key: "recharge", label: i18n.t("common.recharge") },
    withdraw: { key: "withdraw", label: i18n.t("common.withdraw") },
    bet: { key: "bet", label: i18n.t("common.bet") },
  };
  columns: Array<any> = [
    {
      title: i18n.t("common.publish-time"),
      dataIndex: "update_at",
      checked: true,
      scopedSlots: { customRender: "update_at" },
      width: 200,
      align: "center",
    },
    {
      title: i18n.t("common.notice-type"),
      dataIndex: "type",
      checked: true,
      scopedSlots: { customRender: "type" },
      width: 150,
      align: "center",
    },
    {
      title: i18n.t("common.content"),
      dataIndex: "content",
      checked: true,
      align: "center",
    },
  ];
  noticeList: Array<any> = [];
  statistics: Object = {
    reg_sum: {
      loading: 'getStatistics',
      bg: 'img/team/team1.png',
      label: '注冊會員',
      value: 0

    },
    login_sum:  {
      loading: 'getStatistics',
      bg: 'img/team/team2.png',
      label: '登錄',
      value: 0

    },
    bet_sum:  {
      loading: 'getStatistics',
      bg: 'img/team/team3.png',
      label: '總投注',
      value: 0

    },
    profit_sum:  {
      loading: 'getStatistics',
      bg: 'img/team/team4.png',
      label: '總輸贏',
      value: 0

    },
    count_all:  {
      loading: 'getUserSum',
      bg: 'img/team/team4.png',
      label: '旗下總人數',
      value: 0

    },
    count_agent:  {
      loading: 'getUserSum',
      bg: 'img/team/team3.png',
      label: '旗下代理',
      value: 0

    },
    count_member:  {
      loading: 'getUserSum',
      bg: 'img/team/team2.png',
      label: '旗下會員',
      value: 0

    },
    count_user_online:  {
      loading: 'getuserOnline',
      bg: 'img/team/team1.png',
      label: '在綫會員',
      value: 0

    },
  }
  type = "";
  created() {
    console.log(this.columns);
  }
  mounted() {
    this.getNoticeList()
    this.reload()
  }
  async reload() {
    this.loading = {
      getStatistics: true,
      getUserSum: true,
      getuserOnline: true
    }
    this.getStatistics()
    this.getUserSum()
    this.getuserOnline()

  }
  async getNoticeList() {
    const res = await noticeList({
      page_size: this.pagination.pageSize,
      page: this.pagination.pageNo,
      notice_type: this.type || undefined,
    });
    const data = res.data;
    console.log(res.data);
    this.noticeList = data.list || [];
    this.pagination.total = data.total;
  }
  async getuserOnline() {
      const res = await getuserOnline({})
      const data = res.data || {}
      const statistics = { ...this.statistics }
      statistics['count_user_online']['value'] = data?.count_user_online || 0
      this.statistics = statistics
      this.loading['getuserOnline'] = false
      return data
  }
  async getUserSum() {
    const res = await getUserSum({})
    const data = res.data || {}
    const statistics = { ...this.statistics }
    for(const k in data) {
      statistics[k].value = data[k]
    }
    this.statistics = statistics
    this.loading['getUserSum'] = false
    return data
  }
  async getStatistics() {
    const res = await getStatistics({ date: 1 })
    const data = res.data || {}
    const statistics = { ...this.statistics }
    for(const k in data) {
      statistics[k].value = data[k]
    }
    this.statistics = statistics
    this.loading['getStatistics'] = false
    return data
  }
  handleTableChange(pagination: any, filters: any, sorter: any) {
    // console.log(pagination)
    this.pagination = {
      ...this.pagination,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    };
    this.getNoticeList();
  }
}
</script>

<style lang="less" scoped>
@import url("./home");
</style>
