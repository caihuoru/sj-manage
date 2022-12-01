<template>
    <span @click="open=true">
      <a-range-picker 
      @openChange=handleEndOpenChange 
      v-model="data"
      :open="open"
      ref="range"
      :placeholder="['開始時間', '結束時間']"
      >
          <div class="renderExtraFooter" slot="renderExtraFooter">
              <a-button type="text" @click="today">今天</a-button>
              <a-button type="text" @click="yesterday">昨日</a-button>
              <a-button type="text" @click="nowWeek">本周</a-button>
              <a-button type="text" @click="lastWeek">上周</a-button>
              <a-button type="text" @click="nowMonth">本月</a-button>
              <a-button type="text" @click="lastMonth">上月</a-button>
          </div>
      </a-range-picker>
    </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import moment from 'moment'
@Component({
    components: {},
    mixins: [] 
})
export default class RangePicker extends Vue {
  @Prop({
      type: Array,
      default: () => {
          return []
      }
  })value!: [];
  moment:any = moment
  open:boolean = false
  dateFormat: 'YYYY/MM/DD';
  monthFormat: 'YYYY/MM';
  dateFormatList: ['DD/MM/YYYY', 'DD/MM/YY'];
  data: Array<any> = [];
  @Watch('value')
  valueChange() {
    const that = this as any
    that.data =[moment(that.value[0], that.dateFormat), moment(that.value[1], that.dateFormat)]
    // this.$emit('input', this.data)
  }
  inputMethods() {
    console.log(this.data)
    this.emitVal()
  }
  created() {
    const that = this as any
    that.data =[moment(that.value[0], that.dateFormat), moment(that.value[1], that.dateFormat)]
  }
  emitVal() {
    const that = this as any
    const startTime = moment(that.data[0]).format(this.dateFormat)
    const endTime = moment(that.data[1]).format(this.dateFormat)
    this.$emit('input', [ startTime, endTime ])
  }
  handleEndOpenChange(open) {
    this.open = open;
  }
  today() {
    const tampToTime = (Date as any).parse(new Date())
    this.data = [moment(tampToTime), moment(tampToTime)]
    this.emitVal()
    this.open = false
  }
  yesterday() {
    const tampToTime = (Date as any).parse(new Date()) - 86400 * 1000
    this.data = [moment(tampToTime), moment(tampToTime)]
    this.emitVal()
    this.open = false
  }
  nowWeek() {
    this.data = [moment().weekday(0), moment().weekday(6)]
    this.emitVal()
    this.open = false
  }
  lastWeek() {
    this.data = [moment().weekday(-7), moment().weekday(-1)]
    this.emitVal()
    this.open = false
  }
  nowMonth() {
    const date: any = new Date();
    const year = date.getFullYear()
    const month = date.getMonth() + 1;
    const day = moment(`${year}-${month}`, "YYYY-MM").daysInMonth()
    const startTime = moment(`${year}-${month}-1`).format(this.dateFormat)
    const endTime = moment(`${year}-${month}-${day}`).format(this.dateFormat)
    this.data = [startTime, endTime]
    this.emitVal()
    this.open = false
  }
  lastMonth() {
    const date: any = new Date();
    let year = date.getFullYear()
    let month = date.getMonth();
    if (month == 0) {
      month = 12
      year--
    }
    const day = moment(`${year}-${month}`, "YYYY-MM").daysInMonth()
    const startTime = moment(`${year}-${month}-1`).format(this.dateFormat)
    const endTime = moment(`${year}-${month}-${day}`).format(this.dateFormat)
    this.data = [startTime, endTime]
    this.emitVal()
    this.open = false
  }

  
}
</script>
<style lang="less" scoped>
.renderExtraFooter {
  button {
    border: none;
  }
}

</style>