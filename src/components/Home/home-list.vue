<template>
  <div class="home-list">
      <ul class="clearfix list-head">
        <li class="first" @click="topShow=!topShow"><span>市值/净流入</span></li>
        <li 
          :class="{flex:true,desc:params.sort==3&&params.order=='1',asc:params.sort==3&&params.order=='2'}" 
          @click="setSort('3')"
        ><span>价格</span>
        </li>
        <li 
          :class="{flex:true,desc:params.sort==4&&params.order=='1',asc:params.sort==4&&params.order=='2'}"
          @click="setSort('4')"
        ><span>涨跌幅</span></li>
        <li class="last"><span>预警设置</span></li>
      </ul>
      <div class="sortlist" v-show="topShow">
        <p>市值：
          <button :class="{active: params.top == '1'}" @click="setTop(-1)">all</button>
          <button :class="{active: params.top == '200'}" @click="setTop(200)">top 200</button>
          <button :class="{active: params.top == '100'}" @click="setTop(100)">top 100 </button>
          <button :class="{active: params.top == '50'}" @click="setTop(50)">top 50</button>
        </p>
      </div>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
        >
          <div class="list-row" v-for="(item, index) in list" :key="index" @click="goToDetails(item)">
            <div class="row-default clearfix">
              <div class="list-cell first">
                <h2 class="black">{{item.symbol}}</h2>
                <h3 class="gray">{{item.costData[currentCointType].marketValue | valueFilter}}/{{item.costData[currentCointType].inOutValue | valueFilter}}</h3>
              </div>
              <div class="list-cell flex">
                <h2  class="black">{{item.costData['CNY'].coinCost | priceFilter}}</h2>
                <h3  class="gray">¥ {{item.costData['USD'].coinCost | priceFilter}}</h3>
              </div>
              <div class="list-cell flex">
                <template v-if="item.costChange>0">
                  <h2  class="green">+{{item.costData[currentCointType].costChange | costChangeFilter}}%</h2>
                </template>
                <template v-else>
                  <h2  class="red">{{item.costData[currentCointType].costChange | costChangeFilter}}%</h2>
                </template>
              </div>
              <div class="list-cell last" @click.stop="changeOpenIndex(index)">
                <template v-if="openIndex === index">
                  <button class="fastsetting">确认</button>
                </template>
                <template v-else>
                  <button :class="item.isWarn?'fastsetting':'fastwarning'" v-if="item.isWarn">修改</button>
                  <button :class="item.isWarn?'fastsetting':'fastwarning'" v-else>快速预警</button> 
                </template>

              </div>
            </div>
            <div class="row-set" v-if="openIndex === index">
              <p class="gray set-top">
                最高价：{{item.costData['CNY'].coinCost*(warningData.highScale/100+1) | priceFilter}}（¥{{item.costData[currentCointType].inOutValue*(warningData.highScale/100+1) | valueFilter}}）
              </p>
              <div class="row-slider__content">
                <div class="slider-bar">
                  <van-slider v-model="warningData.highScale" @change="onChange" />
                </div>
                <span>{{warningData.highScale}}%</span>
              </div>
              <p class="gray set-top">
                最低价：{{item.costData['CNY'].coinCost*(1-warningData.lowScale/100) | priceFilter}}（¥{{item.costData[currentCointType].inOutValue*(1-warningData.lowScale/100) | valueFilter}}）
              </p>
              <div class="row-slider__content">
                <div class="slider-bar">
                  <van-slider v-model="warningData.lowScale" @change="onChange" />
                </div>
                <span>{{warningData.lowScale}}%</span>
              </div>
              <p class="gray set-top">
                剧烈波动：十五分钟内突然上涨或下跌幅度
              </p>
              <div class="row-slider__content">
                <div class="slider-bar">
                  <van-slider v-model="warningData.volatility" @change="onChange" />
                </div>
                <span>{{warningData.volatility}}%</span>
              </div>
              <span class="set-jump" @click="goToDetails(item)">更详细设置></span>
<!--               <span class="set-jump" @click="clearAlarm(item)">取消预警></span> -->
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isLoading: false,
      finished: false,
      openIndex: '',
      warningData: {
        coinId: 0,
        highScale: 0,
        lowScale: 0,
        volatility: 0,
        baseCost: 0,
        costType: 'CNY',
        alarmTime: '15'
      },
      tempCoin: {},
      currentCointType: 'CNY',
      topShow: false,
      stopLoading: false
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    total: {
      type: Number,
      default: 0
    },
    loadAction: {
      type: String,
      default: ''
    },
    loadingAction: {
      type: String,
      default: ''
    }
  },
  computed: {
    loading: {
      get () {
        return this.$store.state.Home.loading
      },
      set (val) {
        if (this.loadingAction) {
          this.$store.commit(this.loadingAction, val)
        }
      }
    },
    params () {
      return this.$store.state.Home.params
    },
    tabIndex () {
      return this.$store.state.Home.tabIndex
    }
  },
  watch: {
    openIndex (newValue, oldValue) {
    },
    tabIndex () {
      this.openIndex = ''
      this.stopLoading = false
      this.$store.commit('Home/resetList')
      this.$store.dispatch('Home/getList')
    }
  },
  filters: {
    valueFilter (val) {
      val = val || 0
      if (val > 10000 && val < 100000000) {
        return parseInt(val / 10000) + '万'
      } else if (val > 100000000) {
        return parseInt(val / 100000000) + '亿'
      } else {
        return parseInt(val)
      }
    },
    costChangeFilter (val) {
      return val.toFixed(2)
    },
    priceFilter (val) {
      let temp = '' + val
      return temp.slice(0, 8)
    }
  },
  methods: {
    onLoad () {
      if (this.stopLoading) {
        return
      }
      if (this.list.length >= this.total) {
        this.loading = false
        this.finished = true
        this.$toast('没有更多数据')
      } else {
        if (this.loadAction) {
          this.$store.dispatch('Home/getList')
        }
      }
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    changeOpenIndex (index) {
      console.log('change', index)
      let User = localStorage.getItem('user') || ''
      if (!User) {
        this.$router.push('/login/enter')
        return
      }

      if (this.warningData.coinId) {
        let warningData = Object.assign({},this.warningData)
        this.$store.dispatch('Home/setCoinAlarm', this.warningData).then((data) => {
          if (data.cmd === '0') {
            this.tempCoin.isWarn = true
            this.tempCoin.warning = warningData
            this.$toast('设置预警成功')
          } else {
            this.$toast('设置预警失败')
          }
        })
      }
      this.$nextTick(() => {
        if (this.openIndex === index) {
          this.resetWarning()
        } else {
          this.tempCoin = this.list[index]
          this.openIndex = index
          this.warningData.coinId = this.list[index].coinId
          this.warningData.baseCost = this.list[index].costData.CNY.coinCost
          if (!this.list[index].isWarn) {
            this.warningData.highScale = 0
            this.warningData.lowScale = 0
            this.warningData.volatility = 0
          } else {
            this.warningData.highScale = this.list[index].warning.highScale
            this.warningData.lowScale = this.list[index].warning.lowScale
            this.warningData.volatility = this.list[index].warning.volatility
          }
        }
      })
    },
    resetWarning () {
      this.openIndex = ''
      this.warningData.coinId = 0
      this.warningData.highScale = 0
      this.warningData.lowScale = 0
      this.warningData.volatility = 0
      this.warningData.baseCost = 0
    },
    clearAlarm (item) {
      this.$store.dispatch('Home/setCancelAlarm', {
        coinId: item.coinId
      }).then((data) => {
        console.log(data)
        if (data.cmd === '0') {
          item.isWarn = false
          this.resetWarning()
        } else {
          this.$toast('取消预警失败')
        }
      })
    },
    onChange () {

    },
    goToDetails (item) {
      this.$store.commit('Details/setCoinBase', item)
      this.$router.push('details')
    },
    setSort (sort) {
      this.$store.commit('Home/setSort', sort)
      this.$store.commit('Home/resetList')
      this.$nextTick(() => {
        this.onLoad()
      })
    },
    setTop (top) {
      this.$store.commit('Home/setTop', top)
      this.$store.commit('Home/resetList')
      this.$nextTick(() => {
        this.onLoad()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.home-list{
  padding-top: .5rem;
  height: calc(100% - 8rem);
  .list-head{
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    li{
      float: left;
      width: calc(100%/4);
      color: #B6B6B6;
      font-size: .5rem;
      text-align: center;
      &.first{
        width: 7rem;
        position: relative;
        &::before{
          position: absolute;
          content: '';
          width: 1rem;
          height: 1rem;
          left:0;
          background-image: url('./../../asset/ic_choose@2x.png');
          background-size: 100% 100%;
        }
      }
      &.last{
        width: 4.5rem;
        align-items: flex-end;
      }
      &.flex{
        flex: 1;
        position: relative;
        &::before{
          position: absolute;
          content: '';
          width: 0;
          height: 0;
          top: .2rem;
          right: .8rem;
          color: #B6B6B6;
          border-left:.25rem solid transparent;
          border-top:.25rem solid transparent;
          border-bottom:.25rem solid #B6B6B6;
          border-right:.25rem solid transparent;     
        }
        &::after{
          position: absolute;
          content: '';
          width: 0;
          height: 0;
          right: .8rem;
          bottom: 0;
          top: .8rem;
          color: #B6B6B6;
          border-left:.25rem solid transparent;
          border-top:.25rem solid #B6B6B6;
          border-bottom:.25rem solid transparent;
          border-right:.25rem solid transparent; 
        }
      }
      &.desc{
        &::before{
          border-bottom:.25rem solid #333333;
        }
        
      }
      &.asc{
        &::after{
          border-top:.25rem solid #333333;
        }
      }
    }
    height:1.5rem;
    line-height:1.5rem;
    border-bottom: 1px solid #DEDBDC;
  }
  .van-pull-refresh{
    height: calc(100% - 1.5rem);
    overflow: auto;
  }
  .list-row{
    .row-default{
      display: flex;
      padding-left: 1rem;
      padding-right: 1rem;
    }
    .list-cell{
      &.first{
        text-align: left;
        width: 7rem;
      }
      &.last{
        width: 4.5rem;
        align-items: flex-end;
      }
      &.flex{
        flex: 1;
      }
      height: 4rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .row-slider__content{
      display: flex;
      .slider-bar{
        flex: 1;
      }
      span{
        font-size: 1rem;
        color: #666666;
        margin-left: 1.5rem;
        padding-top: 5px;
      }
    }
  }
  .fastwarning{
    width: 4.5rem;
    height: 2rem;
    border: 1px solid #F19B40;
    border-radius: 0.38rem;
    background-color: white;
    color: #F19B40;
    line-height: 2rem;
    text-align: center;
    font-size: .5rem;
  }
  .fastsetting{
    width: 4.5rem;
    height: 2rem;
    border: 1px solid #EA9944;
    border-radius: 0.38rem;
    background-color: #F4B551;
    color: #FFFFFF;
    line-height: 2rem;
    text-align: center;
    font-size: .5rem;
  }
  .modify{
    width: 4.5rem;
    height: 2rem;
    border: 1px solid #EA9944;
    border-radius: 0.38rem;
    background-color: #F4B551;
    color: #FFFFFF;
    line-height: 2rem;
    text-align: center;
    font-size: .5rem;
  }
  .row-set{
    height: 15.5rem;
    background-color: #FAFAFA;
    padding-top:1rem;
    padding-left:1.5rem;
    padding-right:1.5rem;
    h2{
      font-family:Regular;
    }
    .set-top{

    }
    .van-slider{
      margin-top: 1rem;
      margin-bottom: 1.5rem;
    }
    .set-jump{
      font-size: .5rem;
      color: #9A9A9A;
      float: right;
    }
  }
  .sortlist{
    padding-left:1rem;
    padding-right:1rem;
    p{
      background: #F7F7F7;
      height:3rem;
      line-height:3rem;
      button{
        width: 4rem;
        height: 1.37rem;
        line-height: 1.37rem;
        border-radius: 0.67rem;
        border: 0.08rem solid #979797;
        color: #B6B6B6;
        &.active{
          color: #FFFFFF;
          background-color: #F4B551;
          border-color: #EA9944;
        }
      }
    }
  }
}

</style>
