<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="规则编号">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="日期区间选择">
              <rangePicker v-model="times" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="使用状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="调用次数">
                <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="更新日期">
                <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus">新建</a-button>
      <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
      <a-popover
        trigger="click"
        placement="bottom"
        v-model="editColvisible"
      >
        <template slot="content">
            <div style="width: 110px" class="editColList">
                <a-checkbox-group
                    v-model="checkboxValue"
                    :options="plainOptions"
                    @change="onChangeCheckbox"
                />
            </div>
        </template>
        <a-button
            class="reds"
            type="primary"
            style="float:right;"
        >
            编辑列
        </a-button>
      </a-popover>
    </div>

    <a-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="showColumns"
      :data-source="data"
      :rowSelection="options.rowSelection"
      :pagination="pagination"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
        </template>
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">详情</a>
            </a-menu-item>
            <a-menu-item v-if="$auth('table.disable')">
              <a href="javascript:;">禁用</a>
            </a-menu-item>
            <a-menu-item v-if="$auth('table.delete')">
              <a href="javascript:;">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </a-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import moment from 'moment'
import rangePicker from './rangePicker.vue'
@Component({
    components: {rangePicker},
    mixins: [] 
})
export default class TableList extends Vue {
  mdl:any = {}
  // 高级搜索 展开/关闭
  advanced:boolean = false
  editColvisible:boolean = false
  checkboxValue: Array<any> = [];
  plainOptions: Array<any> = [];
  // 查询参数
  queryParam:any = {}
  pagination = {
      // current: "10",
      // size: "small",
      pageSize: 10, //每页中显示10条数据
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "50", "100"], //每页中显示的数据
      showQuickJumper: true,
      showTotal: (total: any) => `共 ${total} 条`, // 显示总数
  };
  showColumns: Array<any> = [];
  times:any = ['2022/1/1', '2022/3/1']
  // 表头
  columns:any = [
    {
      title: '#',
      scopedSlots: { customRender: 'serial' },
      selected: true
    },
    {
      title: '规则编号',
      dataIndex: 'no',
      selected: true
    },
    {
      title: '描述',
      dataIndex: 'description',
      selected: true
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      needTotal: true,
      customRender: (text) => text + ' 次'
    },
    {
      title: '状态',
      dataIndex: 'status',
      needTotal: true
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      sorter: true
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '150px',
      scopedSlots: { customRender: 'action' }
    }
  ]
  // 加载数据方法 必须为 Promise 对象
  data:any = [
  {
    no: 'a',
    description: 'b',
    callNo: 'c',
    status: 'd',
  },
  {
    no: 'a',
    description: 'b',
    callNo: 'c',
    status: 'd',
  }]
  selectedRowKeys = []
  selectedRows = []

  // custom table alert & rowSelection
  options = {
    alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
    rowSelection: {
      selectedRowKeys: this.selectedRowKeys,
      onChange: this.onSelectChange
    }
  }
  optionAlertShow:boolean = false
  toggleAdvanced() {
    this.advanced = !this.advanced
  }
  handleEdit(e:any) {
    console.log(e)
  }
  @Watch('times')
  timesChange() {
    console.log(this.times)
    // this.$emit('input', this.data)
  }
  async onChangeCheckbox(checkedValues: any) {
      const showColumns:any = []
      console.log(checkedValues)
      this.columns.map((item:any) => {
          if(checkedValues.includes(item.title)) {
            showColumns.push(item)
          }
      })
      this.showColumns = JSON.parse(JSON.stringify(showColumns));
  }
  created () {
    const self = this as any;
    for (let k in self.columns) {
        if (self.columns[k].title !== "操作") {
            self.plainOptions.push(self.columns[k].title);
            if (self.columns[k].selected) {
                self.showColumns.push(self.columns[k])
                self.checkboxValue.push(self.columns[k].title);
            }
        }
    }
  }
  onSelectChange (selectedRowKeys:any, selectedRows:any) {
    this.selectedRowKeys = selectedRowKeys
    this.selectedRows = selectedRows
  }
  
}
</script>
<style lang="less" scoped>
.ant-table-wrapper {
  height: 500px;
  overflow: auto;
}
.renderExtraFooter {
  button {
    border: none;
  }
}

</style>