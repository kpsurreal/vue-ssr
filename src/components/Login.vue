<template>
  <div class="content">
    <div class="top-bar text__center">
      <img class="top-img position-left" src="./../asset/Fill-1-white.png" height="16" width="16" alt="" @click="back">
      <span>天生我的爆脾气</span>
    </div>
    <router-view></router-view>
  </div>  
</template>
<script>
export default {
  name: 'Login',
  components: {},
  filters: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  height: 100%;
}
.top-bar{
  position:relative;
  padding-left: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  height:11.5rem;
  line-height: 2rem;
  color: #FFFFFF;
  background: url('./../asset/me_bgtop.png');
  background-size: 100% 100%;
  .top-img{
    vertical-align: middle;
    &.position-right{
      position: absolute;
      right: 1.5rem;
      top: 1.5rem;
    }
    &.position-left{
      position: absolute;
      left: 1rem;
      top: 1.5rem;
    }
  }
  .top-input{
    width: calc(100% - (1rem) * 3);
    height: 2rem;
    background:rgba(244,244,244,1);
    border-radius: 2rem ;
    margin-left: 1rem;
    padding-left:1rem;
    border:none;
  }
}
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
