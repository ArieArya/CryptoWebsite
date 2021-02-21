<template>
  <b-field>
    <b-autocomplete
        size="is-small"
        clearable
        :data="filteredDataArray"
        placeholder="e.g. BTC"
        field="title"
        v-model="symbol"
        :loading="isFetching"
        @typing="getAsyncData"
        @select="option => selected = option">

        <template slot-scope="props">
            <div class="media">
                <div class="media-left">
                    <h1>{{ props.option.symbol }}</h1>
                </div>
                <div class="media-content">
                    {{ props.option.slug }}
                    <br>
                    <small>
                        Price {{ props.option.price }},
                    </small>
                </div>
            </div>
        </template>
    </b-autocomplete>
</b-field>
</template>

<script>
import { userService } from '@/_services';

export default {
  name: 'search-bar',
  data() {
    return {
      data: [],
      symbol: '',
      isFetching: false,
    }
  },
  methods: {
    getAsyncData(name) {
      if (!name.length) {
          this.data = []
          return
      }
      this.isFetching = true

      userService.getAllCoin()
        .then(({ data }) => {
          this.data = []
          data.forEach((item) => this.data.push(item))
        })
        .catch((error) => {
            this.data = []
            throw error
        })
        .finally(() => {
            this.isFetching = false
        })
    }
  },
  computed: {
    filteredDataArray() {
      return this.data.filter((option) => {
          return option.symbol
              .toString()
              .toLowerCase()
              .indexOf(this.symbol.toLowerCase()) >= 0
      })
    }
  }

}
</script>

<style>
.autocomplete .dropdown-content {
  width: 300px;
  text-align: right;
  position: absolute;
  right: 0;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
}

.autocomplete .dropdown-content::-webkit-scrollbar { /* WebKit */
  width: 5px;
  height: 0;
}

.autocomplete .dropdown-content::-webkit-scrollbar-thumb
{
	border-radius: 20px;
	background-color: #333;
}

.autocomplete .dropdown-content::-webkit-scrollbar-track
{
	border-radius: 10px;
	background-color: #F5F5F5;
}
</style>