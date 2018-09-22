<template>
  <div class="content">
    <div class="top-bar">
      <img class="top-img position-left" src="./../asset/icon_48px.png" height="16" width="16" alt="" @click="goToLogin">
      <input class="top-input" type="text" placeholder="搜索币种快速预警" readonly="readonly" @click="goToSearch">
      <img class="top-img position-right" src="./../asset/icon_search.png" height="18" width="18" alt="">
    </div>
    <van-notice-bar
      text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
      :left-icon="noticeUrl"
    />
    <div class="tab-bar">
      <ul class="clearfix">
        <li v-for="(label, index) in tabList" :key="index" @click="changeTab(index)">
          <span :class="{active: index===tabIndex}">{{label}}</span>
        </li>
      </ul>
    </div>
    <home-list
      :total="total"
      :list="list"
      :loadAction="'Home/getList'"
      :loadingAction="'Home/setLoading'"
    ></home-list>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import HomeList from './Home/home-list.vue'
export default {
  // asyncData ({ store, route }) {
  //   return store.dispatch('Home/getHomeList')
  // },
  data () {
    return {
      tittle: 'Home.vue',
      noticeUrl: 'public/fill.png'
    }
  },
  components: {
    HomeList
  },
  computed: {
    ...mapState('Home', ['tabList', 'tabIndex', 'total', 'list'])
  },
  watch: {
    tabIndex (val) {
      // this.$store.commit('Home/resetList')
      // debugger
      // this.$store.dispatch('Home/getList').then((data) => {
      //   if (data.cmd !== '0') {
      //     this.$toast(data.msg)
      //     this.stopLoading = true
      //   }
      // })
    }
  },
  methods: {
    changeTab (index) {
      this.$store.commit('Home/changeTab', index)
    },
    goToSearch () {
      console.log('goTosearch')
      this.$router.push('search')
    },
    goToLogin () {
      if (localStorage.getItem('user')) {
        this.$router.push('login/result')
      } else {
        this.$router.push('login/enter')
      }
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
  height:4rem;
  line-height: 2rem;
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
    margin-left: 1.5rem;
    padding-left:1rem;
    border:none;
  }
}
.van-notice-bar{
  background: white;
  padding-left: 1rem;
  height: 2rem;
}
.tab-bar>ul{
  height: 2rem;
  line-height: 2rem;
  font-size: 1rem;
  li{
    float: left;
    text-align: center;

    width: calc(100%/3);
    color: #B6B6B6;
    span{
      position: relative;
      &:after{
        display: block;
        content: '';
        position: absolute;
        bottom: -.125rem;
        left: 0;
        right: 0;
        height: .125rem;
        background: white;
      }
      &.active{
        color: #333333;
        &:after{
         background: #F19B40;
        }
      }
    }
  }
}

</style>
