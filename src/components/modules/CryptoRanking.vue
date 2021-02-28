<template>
  <div class="top-panel">
    <div class="ranking-table">
      <b-table 
        class="tile is-child main-table" 
        striped
        :data="data" 
        :loading="loading"
        paginated
        backend-pagination
        :total="total"
        :per-page="perPage"
        @page-change="onPageChange"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"

        backend-sorting
        :default-sort-direction="defaultSortOrder"
        :default-sort="[sortField, sortOrder]"
        @sort="onSort"
        >
          <b-table-column field="ranking" label="Ranking" sortable v-slot="props" width="60px">
            {{ props.row.rank }}
          </b-table-column>
          <b-table-column field="symbol" label="Symbol" sortable v-slot="props">
            {{ props.row.symbol }} 
          </b-table-column>
        </b-table>
    </div>

    <div class="crypto-info">
      
    </div>
  </div>
</template>

<script>
import { userService } from '@/_services';

export default {
  name: 'CryptoRanking',
  data(){
    return {
      data: [],
      total: 0,
      loading: false,
      sortField: 'vote_count',
      sortOrder: 'desc',
      defaultSortOrder: 'desc',
      page: 1,
      perPage: 10,
      expandOnHover: false,
      mobile: "reduce",
      reduce: false
    }
  },
  methods: {
    loadAsyncData() {
      this.loading = true
      userService.getTopCoin(50, "24H")
        .then(({ data }) => {
          this.data = []
          var iterator = 0;

          let currentTotal = data.length
          if (data.length / this.perPage > 1000) {
              currentTotal = this.perPage * 1000
          }
          this.total = currentTotal
          data.forEach((item) => {
            item.rank = iterator + 1;
            this.data.push(item)
            iterator++;
          })
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.data = []
          this.total = 0
          this.loading = false
          throw error
        })
    },
    onPageChange(page) {
        this.page = page
        this.loadAsyncData()
    },
    onSort(field, order) {
        this.sortField = field
        this.sortOrder = order
        this.loadAsyncData()
    },
    
  },
  mounted() {
      this.loadAsyncData()
  }
}
</script>

<style lang="scss">
.b-table .table-wrapper .table{
  background-color: #12161c;
  border: none;

  tr:first-child td:first-child{
    background-color: #f7d000;
    color: #333;
    font-weight: 700;
  }
  tr:nth-child(2) td:first-child{
    background-color: #bec2cb;
    color: #333;
    font-weight: 700;
  }
  tr, td, th {
    border: none;
    font-size: 0.8rem;
    color: #c5dcf7;
    line-height: 20px;
  }
  th .th-wrap span {
    left: 50%;
    transform: translateX(-50%);
  }
  &.table.is-striped tbody tr:not(.is-selected):nth-child(even){
    background-color: #131924;
  }

  .top.level .level-right .level-item .pagination {
    background-color: red !important;
  }
}
</style>

<style lang="scss" scoped>
.top-panel {
  > * {
    width: 50%;
    padding: 15px;
    display: inline-block;
  }
}
</style>
