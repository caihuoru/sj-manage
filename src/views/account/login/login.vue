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
    // 初始化時為window綁定一個方法
    const win = window as any
    win.vueDefinedMyProp = (receiveParams:any) => {
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
    // 接收參數方法
    receiveParamsFromHtml(res:any) {
      this.username = res.username;
      this.password = res.password;
      this.usernameSelect = res.usernameSelect;
      this.passwordSelect = res.passwordSelect;
      this.submits();
    },
    handleOk() {
      const that = this as any
      if (that.pwd === "") {
        return message.error(
          that.$t("common.dtsryzm_placeholder") + that.$t("not empty")
        );
      }
      that.confirmLoading = true
      that.authGoogle(that.username, that.pwd);
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
    // 提交數據方法
    submits() {
      const username = this.username;
      let password = this.password;
      const that = this as any
      console.log("submits", username, password);
      const udid = UtilSystem.getUdid();
      if (username === "") {
        message.error(this.$t("The account cannot be empty"));
        setTimeout(() => {
          // 恢復登錄按鈕效果
          (window as any).frames.iframeMap.resetLoginStyle();
        }, 300);
        return false;
      }
      if (password === "") {
        message.error(this.$t("The password cannot be empty"));
        setTimeout(() => {
          // 恢復登錄按鈕效果
          (window as any).frames.iframeMap.resetLoginStyle();
        }, 300);
        return false;
      }
      // 讀取加密密碼
      password = decodepwd(password);
      console.log('login ========',username, password, udid);
      that.Login({
        user_acc:username,
        user_pwd:password,
        udid:udid,
      }).then(
        (data:any)=>{
          that.cookies.set("userId", data.userId, -1);
          that.cookies.set("userNickname", data.userNickname, -1);
          this.loginDown(data);
        },
        (error:any)=>{
          this.resetLoginUi();
          console.log(error);
          // message.error(this.$t(error.msg));
        }
      ) 
    }, 
    resetLoginUi() {
      // 恢復登錄按鈕效果
      (window as any).frames.iframeMap.resetLoginStyle();
    },
    // 登錄跳轉
    loginDown(data:any) {
      const that = this as any
      if (that.authGoogled == false) {
        if (data && data.qrcode && data.qrcode.length) {
          that.$AppCore.Logout();
          that.resetLoginUi();
          that.visibleQR = true;
          that.codeUrl = data.qrcode
          return;
        }
        if (data && data.isAuth == 1) {
          that.$AppCore.Logout();
          that.resetLoginUi();
          that.visible = true;
          return;
        }
      }
      that.resetLoginUi();
      (user as any).state.isFirstCome = true;
      that.$router.push("/");
      that.authGoogled = false;
    },
    // google驗證
    authGoogle(userAcc:string, code:any) {
      const that = this as any
      that.$AppCore.user.authGoogle(userAcc, code).then(
        (result:any) => {
          if (result.code != 0) {
            message.error("驗證失敗,請重試!");
          } else{
            that.authGoogled = true;
            that.submits(); //重新登錄
          }
            that.confirmLoading = false
          console.log("authGoogle", result);
        },
        (error:any) => {
          that.confirmLoading = false
          message.error("驗證失敗!");
        }
      );
    },
    // 在登錄完成後，如果系統有開機提示，彈出提示資訊。
    getFirstModal() {
      const that = this as any
      const h = that.$createElement;
      that.$XModal
        .confirm({
          resize: true,
          title: that.$t("The system prompt"),           
        })
        .then((type:any) => {
          if (type === "confirm") {
            // 確定按鈕回調
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
