<template>
  <b-field>
    <b-autocomplete
        size="is-small"
        clearable
        :data="filteredDataArray"
        placeholder="e.g. BTC"
        field="symbol"
        icon="search"
        v-model="symbol"
        :loading="isFetching"
        @typing="getAsyncData"
        @select="option => addComponent(option)">

        <template slot-scope="props">
            <div class="media">
                <div class="media-left">
                    <h1>{{ props.option.symbol }}/ {{ props.option.slug }}</h1>
                </div>
                <div class="media-content">
                      ${{ parseFloat(props.option.price).toPrecision(6) }}
                    <br>
                    <small v-bind:class="[props.option.percent_change_24h >= 0 ? 'is-positive' : 'is-negative']">
                      {{ parseFloat(props.option.percent_change_24h).toFixed(2) }} %
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
    getAsyncData() {
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
    },
    addComponent(opt) {
      this.$emit('createComponentEvent', opt.symbol)
    },
  },
  computed: {
    filteredDataArray() {
      return this.data.filter((option) => {
          return option.symbol
              .toString()
              .toLowerCase()
              .indexOf(this.symbol.toLowerCase()) >= 0
      })
    },
  },

}
</script>

<style lang="scss">
.autocomplete {
  width: 350px;
  
  .control > input {
    padding-left: 20px;
  }
  .dropdown-content {
    width: 400px;
    text-align: right;
    position: absolute;
    right: -20px;
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */

    .dropdown-item .media .media-content {
      font-size: 0.8rem;
      font-weight: 400;
      small {
        font-size: 1rem;
        font-weight: 600;
      }
    }
  }
  .dropdown-content::-webkit-scrollbar { /* WebKit */
    width: 5px;
    height: 0;
  }

}

.autocomplete 
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

.is-positive {
  color: #088a64;
}

.is-negative {
  color: #ff4560;
}
</style>