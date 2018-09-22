<template>
  <div>
    <div class="me-info">
      <div class="info-title">个人信息</div>
      <ul class="info-list">
        <li><span class="info-label">id:</span><span class="info-text">{{userId}}</span></li>
        <li><span class="info-label">手机:</span><span class="info-text">{{phoneNum}}</span></li>
        <li><span class="info-label">昵称:</span><span class="info-text">{{userName || ''}}</span></li>
      </ul>
      <div class="info-title">关于</div>
      <ul class="info-list">
        <li><span class="info-label">关于撸币小超人</span></li>
        <li><span class="info-label">加入社区一起玩</span></li>
      </ul>
    </div>
    <div class="me-bottom__tool" @click="logout">
      退出登陆
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      phoneNum: '',
      sex: 1,
      userId: '',
      userName: null
    }
  },
  methods: {
    logout () {
      console.log('out')
      this.$store.dispatch('Login/userLogout').then((data) => {
        if (data.cmd === '0') {
          window.localStorage.removeItem('user')
          this.$router.push('/')
        } else {
          this.$toast("账号登出失败")
        }
      })
    }
  },
  mounted () {
    let user = JSON.parse(localStorage.getItem('user'))
    this.$store.dispatch('Login/getUserInfo').then((data)=>{
      console.log()
      if (data.cmd === '0') {
        this.userId = data.data.userId
        this.sex = data.data.sex
        this.phoneNum = data.data.phoneNum
        this.userName = data.data.userName
      } else {
        this.$toast("没有获取到用户信息")
      }
    })
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
      .info-text{
        color: #B6B6B6;
        float: right;
      }
      .info-label{

      }
    }
  }
}
.me-bottom__tool{
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  color: #F19B40;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
