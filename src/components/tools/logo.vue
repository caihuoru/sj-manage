<template>
    <div>
        <div class="logo"><img :src="logo"/></div>
        <div class="appname">{{ appname }}</div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import { namespace } from "vuex-class";
const systemModule = namespace("system");
@Component({
    components: {
        //LogoSvg
    },
})
export default class Logo extends Vue {
  @systemModule.Getter("appname") appname: any;
  @systemModule.Getter("logo") logo: any;
}
</script>
<style scoped lang="less">
.logo {
    text-align: center;
    img{
        width: 150px;
        margin: 10px 0;
    }
}
.appname {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    color: #fff;
}
</style>