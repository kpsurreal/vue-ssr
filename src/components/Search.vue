<template>
  <div class="content">
    <div class="top-bar">
      <img class="top-img position-left" src="./../asset/icon_back.png" height="16" width="16" alt="" @click="backAction">
      <input
        class="top-input"
        type="text"
        placeholder="搜索币种快速预警"
        v-model="searchStr"
      >
      <img v-show="!searchStr" class="top-img position-right" src="./../asset/icon_search.png" height="18" width="18" alt="">
      <img v-show="searchStr" class="top-img position-right" src="./../asset/icon_search_delete.png" height="18" width="18" alt="">
    </div>
    <div class="search-list" v-show="list.length === 0">
      <ul>
        <template v-for="(coins, index) in coinNames">
          <li v-for="(coin,symbol) in coins"  :key="coinName" @click="showList(coin.symbol)">
            <i class="serch-icon">
              <img src="./../asset/icon_search.png" height="18" width="18" alt="">
            </i>
            <span>{{symbol}}</span>
          </li>
        </template>
      </ul>
    </div>
    <home-list
      :total="total"
      :list="list"
      :loadAction="'Search/getSearchList'"
      :loadingAction="'Search/setLoading'"
      v-show="list.length !== 0"
    ></home-list>
  </div>
</template>
<script>
import HomeList from './Home/home-list.vue'
import {mapState} from 'vuex'
export default {
  name: 'search',
  components: {
    HomeList
  },
  props: {},
  data () {
    return {
      searchStr: '',
      timer: null
    }
  },
  computed: {
    ...mapState('Search', ['coinNames', 'total', 'list'])
  },
  watch: {
    searchStr (searchStr) {
      let self = this
      this.$store.commit('Search/resetList')
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (searchStr) {
        this.timer = setTimeout(() => {
          self.getCoinNames()
        }, 500)
      }
    }
  },
  methods: {
    backAction () {
      if (this.list.length) {
        this.$store.commit('Search/resetList')
      } else {
        this.$router.push('/')
      }
    },
    getCoinNames () {
      this.$store.dispatch('Search/getCoinNames', this.searchStr)
    },
    showList (coinName) {
      // this.$store.commit('Search/resetList')
      this.$store.dispatch('Search/showList', coinName)
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
      right: 2rem;
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
.search-list {
  li{
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    color: #9A9A9A;
    .serch-icon{
      vertical-align: middle;
      margin-right: .5rem;
    }
  }
}
</style>




[bt:[],bc:[]]
