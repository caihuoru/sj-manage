<!--
<template>
  <div :class="[prefixCls]">
    <ul>
      <slot></slot>
      <template v-for="item in filterEmpty($slots.default).slice(0, 3)"></template>

      <template v-if="maxLength > 0 && filterEmpty($slots.default).length > maxLength">
        <avatar-item :size="size">
          <avatar :size="size !== 'mini' && size || 20" :style="excessItemsStyle">{{ `+${maxLength}` }}</avatar>
        </avatar-item>
      </template>
    </ul>
  </div>
</template>
-->

<script lang="tsx">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import Avatar from "ant-design-vue/es/avatar";
    import AvatarItem from "./item.vue";
    import {filterEmpty} from "@/components/_util/util";

    @Component({
        components: {
            Avatar,
            AvatarItem,
        },
    })
    export default class AvatarList extends Vue {
        @Prop({type: String, default: "ant-pro-avatar-list"})
        public prefixCls: string;

        @Prop({type: String , default: "default"})
        public size: string;

        @Prop({type: Number, default: 0})
        public maxLength: number;
        @Prop({type: Object, default: () =>{ return {color: "#f56a00", backgroundColor: "#fde3cf"}}})
        public excessItemsStyle: any;

        constructor() {
            super();
        }

        public getItems(items) {
            const classString = {
                [`${this.prefixCls}-item`]: true,
                [`${this.size}`]: true,
            };
            if (this.maxLength > 0) {
                items = items.slice(0, this.maxLength);
                items.push((<Avatar size={this.size} style={this.excessItemsStyle}>{`+${this.maxLength}`}</Avatar>));
            }
            const itemList = items.map((item) => (
                <li class={classString}>{item}</li>
            ));
            return itemList;
        }

        render() {
            const {prefixCls, size} = this.$props;
            const classString = {
                [`${prefixCls}`]: true,
                [`${size}`]: true
            };
            const items = filterEmpty(this.$slots.default);
            const itemsDom = items && items.length ? <ul class={`${prefixCls}-items`}>{this.getItems(items)}</ul> : null;

            return (
                <div class={classString}>
                    {itemsDom}
                </div>
            );
        }
    }

    // export default {
    //   AvatarItem,
    //   name: 'AvatarList',
    //   components: {
    //     Avatar,
    //     AvatarItem
    //   },
    //   props: {
    //     prefixCls: {
    //       type: String,
    //       default: 'ant-pro-avatar-list'
    //     },
    //     /**
    //        * ???????????? ??????: large???small ???mini, default
    //        * ?????????: default
    //        */
    //     size: {
    //       type: [String, Number],
    //       default: 'default'
    //     },
    //     /**
    //        * ????????????????????????
    //        */
    //     maxLength: {
    //       type: Number,
    //       default: 0
    //     },
    //     /**
    //        * ?????????????????????
    //        */
    //     excessItemsStyle: {
    //       type: Object,
    //       default: () => {
    //         return {
    //           color: '#f56a00',
    //           backgroundColor: '#fde3cf'
    //         }
    //       }
    //     }
    //   },
    //   data () {
    //     return {}
    //   },
    //   methods: {
    //     getItems (items) {
    //       const classString = {
    //         [`${this.prefixCls}-item`]: true,
    //         [`${this.size}`]: true
    //       }

    //       if (this.maxLength > 0) {
    //         items = items.slice(0, this.maxLength)
    //         items.push((<Avatar size={ this.size } style={ this.excessItemsStyle }>{`+${this.maxLength}`}</Avatar>))
    //       }
    //       const itemList = items.map((item) => (
    //         <li class={ classString }>{ item }</li>
    //       ))
    //       return itemList
    //     }
    //   },
    //   render () {
    //     const { prefixCls, size } = this.$props
    //     const classString = {
    //       [`${prefixCls}`]: true,
    //       [`${size}`]: true
    //     }
    //     const items = filterEmpty(this.$slots.default)
    //     const itemsDom = items && items.length ? <ul class={`${prefixCls}-items`}>{ this.getItems(items) }</ul> : null

    //     return (
    //       <div class={ classString }>
    //         { itemsDom }
    //       </div>
    //     )
    //   }
    // }
</script>
