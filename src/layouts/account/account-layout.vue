<template>
  <route-view></route-view>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import AccountLayoutComponent from './account-layout.component';

  @Component({
    components:{},
  })
  export default  class AccountLayout extends AccountLayoutComponent {
    constructor(){
      super();
    }
  }


</script>

<style scoped lang="less">
  @import "account-layout";
</style>