<template>
  <div class="content">
    <div class="top-bar text__center">
      <img class="top-img position-left" src="./../asset/icon_back.png" height="16" width="16" alt="" @click="back">
      <span>{{coinBase.symbol}}/{{coinBase.market.quateType}}</span>
      <img
        v-if="!coinExtend.isCollect"
        class="top-img position-right" 
        src="./../asset/icon_typecancel copy@2x.png" 
        height="18" width="18" alt=""
        @click="setCollectCoin"
      >
      <img
        v-if="coinExtend.isCollect"
        class="top-img position-right" 
        src="./../asset/fill.png" 
        height="18" width="18" alt=""
        @click="setCollectCoin"
      >
    </div>
    <div class="coin-info">
      <div class="coin-info__left">
        <p><span class="green big">{{coinInfo.last}}</span> USDT</p>
        <p><span class="gray_value">=60112</span> CNY <span class="green">+{{coinInfo.change_daily * 100}}%</span></p>
        <p>量(24h) {{coinInfo.vol}}，额(24h){{coinInfo.base_volume}}</p>
      </div>
      <div class="coin-info__right">
        <p>高：<span class="gray_value">{{coinInfo.high}}</span></p>
        <p>低：<span class="gray_value">{{coinInfo.low}}</span></p>
        <p>净流入：<span class="green">+34亿</span></p>
      </div>
    </div>
    <ul class="line-sort" v-if="coinInfo.has_kline">
      <li :class="{active:'5min'===kSort}" @click="kSort='5min'">分时</li>
      <li :class="{active:'15min'===kSort}" @click="kSort='15min'">15min</li>
      <li :class="{active:'1H'===kSort}" @click="kSort='1H'">1H</li>
      <li :class="{active:'6H'===kSort}" @click="kSort='6H'">4H</li>
      <li :class="{active:'日线'===kSort}" @click="kSort='日线'">日线</li>
    </ul>
    <div class="k-line" ref="kLine" v-if="coinInfo.has_kline">
    </div>
    <div class="warning-set">
      <h2>预警设置<span class="clear" @click="resetWarning">清除</span><span class="submit" @click="setWarning">确认</span></h2>
      <div class="warning-slider__content">
        <h4>最高价:</h4>
        <div class="row-slider__content">
          <div class="slider-bar">
            <van-slider v-model="warningData.highScale"/>
          </div>
          <span>{{warningData.highScale}}%</span>
        </div>
        <div class="warning-set__row">
          <div class="warning-set__input"><span>价格:</span>{{warningData.highScale * warningData.baseCost}}</div>
          <div class="warning-set__btn">+</div>
          <div class="warning-set__btn">-</div>
        </div>
        <div class="warning-set__row">
          <div class="warning-set__input"><span>比率(%)：</span>{{warningData.highScale}}</div>
          <div class="warning-set__btn">+</div>
          <div class="warning-set__btn">-</div>
        </div>
      </div>
      <div class="warning-slider__content">
        <h4>最低价:</h4>
        <div class="row-slider__content">
          <div class="slider-bar">
            <van-slider v-model="warningData.lowScale"/>
          </div>
          <span>{{warningData.lowScale}}%</span>
        </div>
        <div class="warning-set__row">
          <div class="warning-set__input"><span>价格:</span>{{warningData.lowScale * warningData.baseCost}}</div>
          <div class="warning-set__btn">+</div>
          <div class="warning-set__btn">-</div>
        </div>
        <div class="warning-set__row">
          <div class="warning-set__input"><span>比率(%)：</span>{{warningData.lowScale}}</div>
          <div class="warning-set__btn">+</div>
          <div class="warning-set__btn">-</div>
        </div>
      </div>
      <div class="warning-slider__content">
        <h4>价格波动:</h4>
        <div class="row-slider__content">
          <div class="slider-bar">
            <van-slider v-model="warningData.volatility"/>
          </div>
          <span>{{warningData.volatility}}%</span>
        </div>
        <div class="warning-set__row">
          <div class="warning-set__input"><span>幅度(%):</span>{{warningData.volatility}}</div>
          <div class="warning-set__btn">+</div>
          <div class="warning-set__btn">-</div>
        </div>
        <div class="warning-set__row">
          <div class="warning-set__input"><span>间隔时间(min):</span>{{warningData.volatility}}</div>
          <div class="warning-set__btn">+</div>
          <div class="warning-set__btn">-</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import HomeList from './Home/home-list.vue'
import echarts from 'echarts'
export default {
  data () {
    return {
      myEcharts: null,
      labelFont: 'bold 12px Sans-serif',
      colorList: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
      kSort: '日线',
      oSort: {
        '日线': '1d',
        '15min': '15m',
        '1H': '1h',
        '6H': '6h',
        '5min': '5m'
      },
      warningData: {
        coinId: 0,
        highScale: 0,
        lowScale: 0,
        volatility: 0,
        baseCost: 0,
        costType: 'CNY',
        alarmTime: '15'
      }
    }
  },
  components: {
    HomeList
  },
  computed: {
    ...mapState('Details', ['coinData', 'coinBase', 'coinInfo', 'coinExtend']),
    option () {
      return {
        animation: false,
        color: this.colorList,
        axisPointer: {
          link: [{
            xAxisIndex: [0, 1]
          }]
        },
        xAxis: [{
          type: 'category',
          data: this.dates,
          boundaryGap: false,
          axisLine: { lineStyle: { color: '#777' } },
          axisLabel: {
            formatter: function (value) {
              return echarts.format.formatTime('MM-dd', value)
            }
          },
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            show: true
          }
        }, {
          type: 'category',
          gridIndex: 1,
          data: this.dates,
          scale: true,
          boundaryGap: false,
          splitLine: {show: false},
          axisLabel: {show: false},
          axisTick: {show: false},
          axisLine: { lineStyle: { color: '#777' } },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax'
        }],
        yAxis: [{
          scale: true,
          splitNumber: 2,
          axisLine: { lineStyle: { color: '#777' } },
          splitLine: { show: true },
          axisTick: { show: false },
          axisLabel: {
            formatter: '{value}\n',
            inside: false
          },
          position: 'right'
        }, {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: {
            inside: false,
            formatter: '{value}\n'
          },
          position: 'right',
          axisLine: {show: false},
          axisTick: {show: false},
          splitLine: {show: false}
        }],
        grid: [{
          left: 2,
          right: 20,
          top: 20,
          height: 120
        }, {
          left: 2,
          right: 20,
          height: 40,
          top: 180
        }],
        graphic: [{
          type: 'group',
          left: 'center',
          top: 70,
          width: 300,
          bounding: 'raw',
          children: [{
            id: 'MA5',
            type: 'text',
            style: {fill: this.colorList[1], font: this.labelFont},
            left: 0
          }, {
            id: 'MA10',
            type: 'text',
            style: {fill: this.colorList[2], font: this.labelFont},
            left: 'center'
          }, {
            id: 'MA20',
            type: 'text',
            style: {fill: this.colorList[3], font: this.labelFont},
            right: 0
          }]
        }],
        series: [{
          name: 'Volume',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#7fbe9e'
            },
            emphasis: {
              color: '#140'
            }
          },
          data: this.volumes
        }, {
          type: 'candlestick',
          name: '日线',
          data: this.data,
          itemStyle: {
            normal: {
              color: '#ef232a',
              color0: '#14b143',
              borderColor: '#ef232a',
              borderColor0: '#14b143'
            },
            emphasis: {
              color: 'black',
              color0: '#444',
              borderColor: 'black',
              borderColor0: '#444'
            }
          }
        }, {
          name: 'MA5',
          type: 'line',
          data: this.calculateMA(5, this.data),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          }
        }, {
          name: 'MA10',
          type: 'line',
          data: this.calculateMA(10, this.data),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          }
        }, {
          name: 'MA20',
          type: 'line',
          data: this.calculateMA(20, this.data),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          }
        }]
      }
    },
    dates () {
      if (this.coinData.length !== 0) {
        let temp = this.coinData.map(ele => {
          let date = new Date(ele[0])
          return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        })
        return temp || []
      }
    },
    volumes () {
      if (this.coinData.length !== 0) {
        let temp = this.coinData.map(ele => {
          return ele[ele.length - 1]
        })
        return temp || []
      }
    },
    data () {
      if (this.coinData.length !== 0) {
        let temp = this.coinData.map(ele => {
          return ele.slice(1, ele.length)
        })
        return temp || []
      }
    },
    sourceDate () {
      return this.coinData.price_usd
    }
  },
  watch: {
    kSort () {
      if (this.coinInfo.has_kline) {
        this.$store.dispatch('Details/getCoinQuotation', {
          market: this.coinBase.market.marketName,
          symbol_pair: this.coinBase.symbol + '_' + this.coinBase.market.quateType,
          type: this.oSort[this.kSort],
          limit: 500
        }).then(() => {
          if (!this.myEcharts) {
            this.myEcharts = echarts.init(this.$refs.kLine)
            this.setEchartsOption()
          }
        })
      }
    },
    coinExtend () {
      this.warningData = Object.assign(this.warningData, this.coinExtend.warning)
      this.warningData.coinId = this.coinBase.coinId
      this.warningData.baseCost = this.coinBase.costData.CNY.coinCost
    }
  },
  methods: {
    setEchartsOption () {
      this.myEcharts.setOption(this.option)
    },
    calculateMA (dayCount, data) {
      var result = []
      for (var i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-')
          continue
        }
        var sum = 0
        for (var j = 0; j < dayCount; j++) {
          sum += data[i - j][1]
        }
        result.push((sum / dayCount).toFixed(2))
      }
      return result
    },
    back () {
      this.$router.back()
    },
    resetWarning () {
      this.warningData = Object.assign({
        highScale: 0,
        lowScale: 0,
        volatility: 0,
        baseCost: 0,
        costType: 'CNY',
        alarmTime: '15'
      })
      this.$store.dispatch('Details/setCancelAlarm', {coinId: this.coinBase.coinId})
    },
    setWarning () {
      this.$store.dispatch('Details/setCoinAlarm', this.warningData)
    },
    setCollectCoin () {
      if (!this.coinExtend.isCollect) {
        this.$store.dispatch('Details/setCollectCoin', {coinId: this.coinBase.coinId})
      }
      if (this.coinExtend.isCollect) {
        this.$store.dispatch('Details/setCancelCollect', {coinId: this.coinBase.coinId})
      } 
    }
  },
  mounted () {
    if (!this.coinBase.market) {
      return
    }
    // this.$store.dispatch('Details/getCoinQuotation',)
    this.$store.dispatch('Details/getCoinInfo', {
      market: this.coinBase.market.marketName,
      symbol_pair: this.coinBase.symbol + '_' + this.coinBase.market.quateType
    }).then((ele) => {
      if (this.coinInfo.has_kline) {
        this.$store.dispatch('Details/getCoinQuotation', {
          market: this.coinBase.market.marketName,
          symbol_pair: this.coinBase.symbol + '_' + this.coinBase.market.quateType,
          type: this.oSort[this.kSort],
          limit: 500
        }).then(() => {
          if (!this.myEcharts) {
            this.myEcharts = echarts.init(this.$refs.kLine)
            this.setEchartsOption()
          }
        })
      }
      this.$store.dispatch('Details/getCoinInfoExtend', {
        coinId: this.coinBase.coinId,
        baseCost: this.coinInfo.last
      }).then(() => {
        if (this.coinInfoisWarn) {
          this.warningData = this.coinExtend.warningData
          this.warningData = this.coinInfo.last
        }
      })
    })
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
    margin-left: 1rem;
    padding-left:1rem;
    border:none;
  }
}
.line-sort{
  display: flex;
  height: 1.5rem;
  line-height: 1.5rem;
  li{
    flex: 1;
    color: #9A9A9A;
    text-align: center;
    border: 1px solid #DEDBDC;
    &.active{
      color: #686868;
    }
  }
}
.k-line{
  height: 20rem;
}
.coin-info{
  color: #9A9A9A;
  display: flex;
  padding-left: 2rem;
  padding-right: .5rem;
  margin-top: 2rem;
  margin-bottom: .5rem;
  line-height: 2rem;
  .coin-info__left{
    flex:2;
  }
  .coin-info__right{
    flex:1;
  }
  .big{
    font-size: 1.5rem;
  }
}
.warning-set{
  padding:1rem;
  h2{
    color: #333333;
    font-size: 1.2rem;
  }
  h4{
    color: #686868;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  .clear{
    color: #9A9A9A;
    font-size: 1rem;
    float: right;
    font-weight:100;
    line-height:1.5rem;
    margin-left: .5rem;
  }
  .submit{
    color: #F19B40;
    font-size: 1rem;
    float: right;
    font-weight:100;
    line-height:1.5rem;
  }
  .warning-slider__content{
    padding-left: 1rem;
    padding-right: 1rem;
    .warning-set__row{
      border:1px solid #B6B6B6;
      height:2.5rem;
      line-height:2.5rem;
      display: flex;
      text-align: center;
      margin-bottom: 1rem;
      .warning-set__input{
        flex: 1;
        span{
          float: left;
          color: #9A9A9A;
          margin-left: .5rem;
        }
      }
      .warning-set__btn{
        color: #979797;
        width:2.5rem;
        border-left: 1px solid #b6b6b6;
        font-size:2rem;
        line-height: 2.2rem;
      }
    }
  }
  .row-slider__content{
      display: flex;
      margin-bottom: 1rem;
      .slider-bar{
        flex: 1;
      }
      span{
        font-size: 1rem;
        color: #666666;
        margin-left: 1.5rem;
        margin-top: -10px;
      }
    }
}
</style>
