<template>
  <div>
    <div class="me-info">
      <div class="info-title">请登入</div>
      <ul class="info-list">
        <li><span class="info-label">手机号码:</span><input type="text" placeholder="您的手机号" v-model="params.phoneNum"></li>
        <li><span class="info-label">验证码:</span><input type="text" placeholder="输入验证吗"><button class="info-send">发送</button></li>
        <li><span class="info-label">密码:</span><input type="password" placeholder="您的密码" v-model="params.password"></li>
      </ul>
    </div>
    <div class="me-bottom__tool">
      <button @click="userReg">提交</button>
      <div class="clearfix"><span class="info-text" @click="goToEnter">已有账号登陆></span></div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState('Login', ['params'])
  },
  methods: {
    goToEnter () {
      this.$router.push('/login/enter')
    },
    userReg () {
      this.$store.dispatch('Login/userReg').then((data) => {
        if (data.cmd === "0") {
          this.$router.push('/login/enter')
        } else {
          this.$toast(data.msg)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.me-info{
  line-height: 1.5rem;
  .info-title{
    padding-left: 1rem;
    color: #9A9A9A;
    height: 3rem;
    line-height: 3rem;
    border-bottom: 1px solid #E4E4E4;
  }
  .info-list{
    li{
      padding-left: 2rem;
      padding-right: 1rem;
      color: #333333;
      height: 3rem;
      line-height: 3rem;
      border-bottom: 1px solid #E4E4E4;
      .info-label{

      }
      input{
        background: transparent;
        border: none;
        box-shadow: none;
        padding-left: 1rem;
      }
      .info-send{
        width: 4.5rem;
        height: 2rem;
        border: 1px solid #F19B40;
        color: #F19B40;
        line-height: 2rem;
        background-color: white;
      }
    }
    div{
      padding-right:2rem;
      .info-text{
        color: #F4B551;
        float: right;
      }
    }

  }
}
.me-bottom__tool{
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  color: #F19B40;
  margin-top: 1rem;
  button{
    width: 20rem;
    height: 3rem;
    border: 1px solid #EA9944;
    color: #FFFFFF;
    background-color: #F4B551;
    border-radius: 3rem;
  }
  div{
    padding-right:2rem;
    .info-text{
      color: #B6B6B6;
      float: right;
    }
  }

}
</style>
