<template>
  <div class="login">
    <div class="iframestyleset">
      <iframe
        name="iframeMap"
        id="iframeMapViewComponent"
        :src="loginUrl"
        width="100%"
        height="100%"
        frameborder="0"
        scrolling="no"
        ref="iframeDom"
      ></iframe>
    </div>
    <a-modal
      :title="$t('common.dtsryzm_title')"
      :okText="$t('common.login')"
      :visible="visible"
      centered
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>{{ $t("common.dtsryzm_tip") }}</p>
      <a-input
        v-model="pwd"
        :placeholder="$t('common.dtsryzm_placeholder')"
        style="background: #fff; color: #333"
      />
    </a-modal>
    <a-modal
      :title="$t('common.ggyzbd_title')"
      :visible="visibleQR"
      :width="320"
      centered
    >
      <template slot="footer">
        <div key="back" @click="handleCancelQR"></div>
        <div key="submit" @click="handleOkQR"></div>
      </template>
      <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
        <img width="200" height="200" style="margin-bottom: 20px" :src="codeUrl" />
        <a-button key="submit" @click="handleOkQR" type="primary">
          {{$t('common.ysewm')}}
        </a-button>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { message } from "ant-design-vue";
import { mapActions } from "vuex";
import user from "@/store/modules/user";
import { decodepwd } from "@/utils/util";
import UtilSystem from "@/utils/tool/UtilSystem";

export default {
  data() {
    return {
      username: "",
      password: "",
      usernameSelect: false,
      passwordSelect: false,
      userPwdSelectList: localStorage.getItem("userPwdSelectList") || [],
      showUserPwdSelectList: [],
      showSelectList: false,
      loginUrl: "",
      isGetLocal: false,
      visible: false,
      visibleQR: false,
      pwd: "",
      authGoogled: false,
      codeUrl: '',
      confirmLoading: false
    };
  },
  computed: {
  },
  created() {
    // ???????????????window??????????????????
    const win = window as any
    win.vueDefinedMyProp = (receiveParams) => {
      this.receiveParamsFromHtml(receiveParams);
    };
    const data = new Date() as any
    this.loginUrl = win.siteConfigs.loginUrl + "?" + Date.parse(data);
  },
  mounted() {},
  methods: {
    ...mapActions({
      Login: "user/Login",
    }),
    // ??????????????????
    receiveParamsFromHtml(res) {
      this.username = res.username;
      this.password = res.password;
      this.usernameSelect = res.usernameSelect;
      this.passwordSelect = res.passwordSelect;
      this.submits();
    },
    handleOk() {
      if (this.pwd === "") {
        return message.error(
          this.$t("common.dtsryzm_placeholder") + this.$t("not empty")
        );
      }
      this.confirmLoading = true
      this.authGoogle(this.username, this.pwd);
    },
    handleCancel() {
      this.visible = false;
      this.confirmLoading = false
    },
    handleCancelQR(){
      this.visibleQR = false;
    }, 
    handleOkQR() {
      this.visibleQR = false;
      this.visible = true;
    },
    // ??????????????????
    submits() {
      const username = this.username;
      let password = this.password;
      console.log("submits", username, password);
      const udid = UtilSystem.getUdid();
      if (username === "") {
        message.error(this.$t("The account cannot be empty"));
        setTimeout(() => {
          // ????????????????????????
          (window as any).frames.iframeMap.resetLoginStyle();
        }, 300);
        return false;
      }
      if (password === "") {
        message.error(this.$t("The password cannot be empty"));
        setTimeout(() => {
          // ????????????????????????
          (window as any).frames.iframeMap.resetLoginStyle();
        }, 300);
        return false;
      }
      // ??????????????????
      password = decodepwd(password);
      console.log('login ========',username, password, udid);
      this.Login({
        user_acc:username,
        user_pwd:password,
        udid:udid,
      }).then(
        data=>{
          this.cookies.set("userId", data.userId, -1);
          this.cookies.set("userNickname", data.userNickname, -1);
          this.loginDown(data);
        },
        error=>{
          this.resetLoginUi();
          console.log(error);
          // message.error(this.$t(error.msg));
        }
      ) 
    }, 
    resetLoginUi() {
      // ????????????????????????
      (window as any).frames.iframeMap.resetLoginStyle();
    },
    // ????????????
    loginDown(data) {
      if (this.authGoogled == false) {
        if (data && data.qrcode && data.qrcode.length) {
          this.$AppCore.Logout();
          this.resetLoginUi();
          this.visibleQR = true;
          this.codeUrl = data.qrcode
          return;
        }
        if (data && data.isAuth == 1) {
          this.$AppCore.Logout();
          this.resetLoginUi();
          this.visible = true;
          return;
        }
      }
      this.resetLoginUi();
      (user as any).state.isFirstCome = true;
      this.$router.push("/");
      this.authGoogled = false;
    },
    // google??????
    authGoogle(userAcc, code) {
      this.$AppCore.user.authGoogle(userAcc, code).then(
        (result) => {
          if (result.code != 0) {
            message.error("????????????,?????????!");
          } else{
            this.authGoogled = true;
            this.submits(); //????????????
          }
            this.confirmLoading = false
          console.log("authGoogle", result);
        },
        (error) => {
          this.confirmLoading = false
          message.error("????????????!");
        }
      );
    },
    // ????????????????????????????????????????????????????????????????????????
    getFirstModal() {
      const h = this.$createElement;
      this.$XModal
        .confirm({
          resize: true,
          title: this.$t("The system prompt"),           
        })
        .then((type) => {
          if (type === "confirm") {
            // ??????????????????
          }
        });
    }    
  },
};
</script>
<style lang="less" scoped>
.login {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  .testBtn {
    position: absolute;
    top: 0;
    left: 0;
    color: #333333;
  }
  .iframestyleset {
    width: 100%;
    height: 100vh;
  }
}
</style>
