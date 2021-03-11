<template>
  <div id="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item>
        <div class="logintitle" :style="{color: Color}">欢迎加入Heartless的小家庭！</div>
      </el-form-item>
      <el-form-item prop="user">
        <el-input v-model="ruleForm.user">
          <template slot="prepend"><i class="el-icon-user"></i></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        >
          <template slot="prepend"><i class="el-icon-lock"></i></template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="isShow" prop="email">
        <el-input
          placeholder="Email"
          v-model="ruleForm.email"
          style="margin-bottom: 10px"
        >
          <template slot="append">.com</template>
        </el-input>
        <el-button
          style="padding: 10px 20px"
          :disabled="showBtn"
          type="primary"
          @click="sendMail"
          >{{ btntext }}</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-input
          v-if="isShow"
          placeholder="请输入验证码"
          v-model="ruleForm.code"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          style="padding: 10px 20px"
          type="primary"
          @click="submitForm('ruleForm')"
          >登录</el-button
        >
        <el-button style="padding: 10px 20px" @click="register"
          >我是新人</el-button
        >
      </el-form-item>
      <el-form-item>
        <p style="font-size: 1rem" :style="{color: Color}">
          提示:
          没有账号可以点击我是新人进行注册,只需要验证邮箱就可以了,欢迎你的加入！
        </p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        password: "",
        user: "",
        email: "",
        code: "",
      },
      // 显示注册项
      isShow: false,
      // 发送验证码按钮是否可选
      showBtn: false,
      // 验证码倒计时
      count: 60,
      // 发送验证码按钮文本
      btntext: "发送验证码",
      // 定时器
      timer: null,
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          // { min: 3, max: 5, message:'密码长度最少为8位,最多16位哦,（＞人＜；）', trigger: 'blur' }
        ],
        user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      },
    };
  },
  mounted() {
    if (localStorage.getItem("dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk")) {
      this.showBtn = true;
      this.count = parseInt(
        localStorage.getItem("dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk")
      );
      this.timer = setInterval(() => {
        this.count -= 1;
        if (this.count == 0) {
          clearInterval(this.timer);
          localStorage.removeItem(
            "dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk"
          );
          this.btntext = "发送验证码";
          this.showBtn = false;
        } else {
          this.btntext = `${this.count}秒后重新发送`;
          localStorage.setItem(
            "dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk",
            this.count
          );
        }
      }, 1000);
    } else {
      clearInterval(this.timer);
    }
  },
  computed: {
    Color() {
        return this.$store.state.Color;
    }
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          /* 登录失败走注册模式 */
          if (this.isShow) {
            /* this.$store.commit('LoadingTitle',{
                    isShow: true,
                    title: '正在注册您的账号请稍等...'
                }) */
            try {
              const res = await this.$api.Login(this.ruleForm);
            //   console.log(res);
              if (res.err == 0) {
                this.$message.success(
                  "注册成功啦小主人,3秒后为您跳转到首页(❤ ω ❤)!"
                );
                /* 保存token */
                localStorage.setItem("username", res.token);
                clearInterval(this.timer);
                localStorage.removeItem(
                  "dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk"
                );
                setTimeout(() => {
                  this.$router.back();
                }, 1000);
              } else {
                this.$message.error(res.message);
              }
              /* this.$store.commit("LoadingTitleChange",{
                        isShow: false,
                        title: ''
                    }) */
            } catch (error) {
              this.$message.error(error);
            }
          } else {
            /* 默认走登录模式 */
            this.$store.commit("LoadingTitleChange", {
              isShow: true,
              title: "正在登录请稍等片刻...",
            });
            try {
              const res = await this.$api.userLogin(this.ruleForm);
              console.log(res.data);
              if (res.err == 0) {
                this.$message.success("登录成功啦，马上带您去浏览我的小站！");
                /* 保存token */
                localStorage.setItem("username", res.token);
                setTimeout(() => {
                  this.$router.back();
                }, 1000);
              } else if (res.err == -998) {
                /* 报错找不到用户，进行注册 */
                this.$message.error(res.data);
              } else {
                this.$message.error(res.data);
              }
            } catch (error) {
              this.$message.error(error);
            }
          }
        } else {
          this.$message.error("请输入完整信息,o(*￣▽￣*)o!");
        }
      });
    },
    // 显示注册项
    register() {
      this.isShow = !this.isShow;
    },
    // 发送邮箱
    async sendMail() {
      /* 发送邮箱验证码 */
      if (this.ruleForm.email != "") {
        /* 验证邮箱是正确的的 */
        var reg = /^\d{5,10}$/;
        if (reg.test(this.ruleForm.email) == true) {
          try {
            /* 发起验证码请求 */
            const res = await this.$api.sendEmail({
              email: this.ruleForm.email + "@qq.com",
            });
            if (res.err == 0) {
              /* 发送成功 */
              this.$message.success("验证码已经发送到小主的邮箱了,(●ˇ∀ˇ●)");
              /* 进行倒计时 设置定时一分钟后可访问 */
              localStorage.setItem(
                "dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk",
                60
              );
              this.showBtn = true;
              this.count = 60;
              this.timer = setInterval(() => {
                this.count -= 1;
                if (this.count == 0) {
                  clearInterval(this.timer);
                  localStorage.removeItem(
                    "dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk"
                  );
                  this.btntext = "发送验证码";
                  this.showBtn = false;
                } else {
                  this.btntext = `${this.count}秒后重新发送`;
                  localStorage.setItem(
                    "dlsjalkjdkljaslfjldjgltlfgdoeiroeiotgjfkdjk",
                    this.count
                  );
                }
              }, 1000);
            } else {
              this.$message.error(res.message);
            }
          } catch (error) {
            this.$message.error(error);
          }
        } else {
          this.$message.error("输入正确的邮箱噢，太马虎啦！");
        }
      } else {
        this.$message.error("邮箱不能空着呢！");
      }
    },
  },
};
</script>

<style lang='scss' scoped>
#login {
  width: 80%;
  height: 80vh;
  margin: 0 auto;
  margin-top: 4.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .demo-ruleForm {
    width: 42%;
  }
  .logintitle {
    font-size: 2rem;
  }
}
@media screen and (max-width:992px) {
  #login {
    width: 95%;
    margin-top: 2rem;
    .demo-ruleForm {
      width: 80%;
    }
    .logintitle {
      font-size: 1.45rem;
    }
  }
}
</style>