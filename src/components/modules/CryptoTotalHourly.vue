<template>
  <div class="chart_wrapper">
    <section class="chart_header">
      <b-field id="multiplier_filter">
        <b-radio-button v-model="combineMultiplier"
          size="is-small"
          native-value="1">
          <span>1x</span>
        </b-radio-button>

        <b-radio-button v-model="combineMultiplier"
          size="is-small"
          native-value="2">
          <span>2x</span>
        </b-radio-button>

        <b-radio-button v-model="combineMultiplier"
          size="is-small"
          native-value="4">
          <span>3x</span>

        </b-radio-button>

        <b-radio-button v-model="combineMultiplier"
          size="is-small"
          native-value="8">
          <span>4x</span>
        </b-radio-button>
      </b-field>

      <b-field id="period_filter">
        <b-radio-button v-model="timePeriod"
          size="is-small"
          native-value="24H">
          <span>24h</span>
        </b-radio-button>

        <b-radio-button v-model="timePeriod"
          size="is-small"
          native-value="3D">
          <span>3d</span>

        </b-radio-button>

        <b-radio-button v-model="timePeriod"
          size="is-small"
          native-value="1W">
          <span>1w</span>
        </b-radio-button>

        <b-radio-button v-model="timePeriod"
          size="is-small"
          native-value="1M">
          <span>1m</span>
        </b-radio-button>

        <b-radio-button v-model="timePeriod"
          size="is-small"
          native-value="1Y">
          <span>1y</span>
        </b-radio-button>
      </b-field>
    </section>
    <apexchart type="area" height="340" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import { userService } from '@/_services';

export default {
  name: 'CryptoTotalHourly',
  data(){
    return {
      data: [],
      series: [],
      combineMultiplier: null,
      timePeriod: null,
      chartOptions: {
            chart: {
              type: 'area',
              stacked: false,
              background: '#131924',
              foreColor: '#fff',
              height: 320,
              zoom: {
                type: 'x',
                enabled: false,
                autoScaleYaxis: true
              },
              toolbar: {
                show: false,
                autoSelected: 'zoom',
                tools: {
                  download: false,
                }
              }
            },
            dataLabels: {
              enabled: false,
              formatter: function (val) {
                  return val.toFixed(2)
              },
            },
            markers: {
              size: 0,
            },
            title: {
              text: 'Cryptocurrency Performance Score',
              align: 'left'
            },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
              },
            },
            yaxis: {
              labels: {
                formatter: function (val) {
                  return val.toFixed(2);
                },
              },
              title: {
                text: 'Score'
              },
            },
            xaxis: {
              type: 'datetime',
            },
            tooltip: {
              shared: false,
              onDatasetHover: {
                  highlightDataSeries: true,
              },
              y: {
                formatter: function (val) {
                  return val.toFixed(4)
                }
              },
              x: {
                format: 'dd MMM, HH:mm',
              }
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
          },
    }
  },
  methods: {
    loadAsyncData(combine_multiplier, timePeriod) {
      this.loading = true

      userService.getTopHourly(combine_multiplier != null? combine_multiplier : 1, timePeriod != null? timePeriod : "24H")
        .then(({ data }) => {
          this.data = []
          this.series = []

          data.forEach((field) => {
            var table_arr = []

            this.data.push(field)
            
            field.crypto_info.forEach((item) => {
              var table_obj = {
                x: item.date,
                y: item.score
              }
              table_arr.push(table_obj)
            })

            var temp = {
              name: field.symbol,
              data: table_arr
            }
            this.series.push(temp)
          })
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.data = []
          this.loading = false
          throw error
        })
    },
  },
  watch: {
    combineMultiplier: function(val) {
      this.loadAsyncData(val, this.timePeriod)
    },
    timePeriod: function(val) {
      this.loadAsyncData(this.combineMultiplier, val)
    }
  },
  mounted() {
      this.loadAsyncData()
  }
}
</script>

<style lang="scss" scoped>

.chart_wrapper {
  padding: 5px;
  background: #131924;
  border-radius: 10px;

  .chart_header {
    width: 100%;
    min-height: 30px;
    .field {
      display: inline-block;
      
      &#multiplier_filter { float: left; }
      &#period_filter { float: right; }
    }
  }
}
</style>

<style lang="scss">
.control {
  .b-radio {
    background-color: #12161c;
    border: none;
    color: #c5dcf7;
    
    span {
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
  &:first-child:not(:only-child) .button{
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  &:last-child:not(:only-child) .button {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}
</style>