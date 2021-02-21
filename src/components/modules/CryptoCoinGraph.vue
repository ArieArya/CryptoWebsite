<template>
  <div class="card" id="chart">
    <apexchart type="line" height="240" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import { userService } from '@/_services';

export default {
  name: 'CryptoCoinGraph',
  data(){
    return {
      data: [],
      series: [],
      chartOptions: {
        chart: {
          type: 'area',
          height: 180,
          sparkline: {
            enabled: true
          },
        },
        stroke: {
          curve: 'straight'
        },
        fill: {
          opacity: 0.3,
        },
        yaxis: {
          min: 0
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

      userService.getCoinHourly('BTC', "24H")
        .then(({ data }) => {
          this.data = []
          this.series = []

          data.forEach((field) => {
            var table_arr = []

            this.data.push(field)
            
            field.crypto_info.forEach((item) => {
              var table_obj = {
                x: item.date,
                y: item.count
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
