<template>
  <div>
    <div class="me-info">
      <div class="info-title">请登入</div>
      <ul class="info-list">
        <li><span class="info-label">账号/手机号码:</span><input type="text" placeholder="您的昵称或者手机号" v-model="params.phoneNum"></li>
        <li><span class="info-label">密码:</span><input type="password" placeholder="您的密码" v-model="params.password"></li>
        <div class="clearfix"><span class="info-text">忘记密码?</span></div>
      </ul>
    </div>
    <div class="me-bottom__tool" @click="logout">
      <button @click="enter">登陆</button>
      <div class="clearfix"><span class="info-text" @click="goToRegister">手机注册></span></div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {Utils} from './../../Utils'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState('Login', ['params'])
  },
  methods: {
    logout () {
      console.log('out')
    },
    goToRegister () {
      this.$router.push('/login/register')
    },
    enter () {
      this.$store.dispatch('Login/userLogin').then((data) => {
        if (data.cmd === '0') {
          debugger
          Utils.setAxiosConfig({userId: data.data.userId})
          this.$router.push('/')
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
