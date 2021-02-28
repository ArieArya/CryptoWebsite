<template>
  <div class="column is-one-third card" id="chart">
    {{ symbol }}
    <apexchart type="line" height="240" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import { userService } from '@/_services';

export default {
  name: 'CryptoCoinGraph',
  props: {
    coinSymbol: String
  },
  data(){
    return {
      data: [],
      series: [],
      symbol: this.coinSymbol,
      chartOptions: {
        chart: {
          type: 'area',
          height: 180,
          toolbar: {
            show: false,
          },
        },
        stroke: {
          curve: 'smooth'
        },
        fill: {
          opacity: 0.3,
        },
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          min: 0,
          labels: {
            formatter: function (val) {
              return val.toFixed(2);
            },
          },
        },
        colors: ['#7957D5'],
        title: {
          text: this.totalCount,
          offsetX: 0,
          style: {
            fontSize: '24px',
          }
        },
        subtitle: {
          text: 'Total Score',
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: '14px',
          }
        }
      },
    }
  },

  methods: {
    loadAsyncData() {
      this.loading = true

      userService.getCoinHourly(this.symbol, "24H")
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
    }
  },
  computed: {
    totalCount: function () {
      return this.series[0].data.slice(-1).pop().y
    }
  },
  mounted() {
      this.loadAsyncData()
  }
}
</script>

